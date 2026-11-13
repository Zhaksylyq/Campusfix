const $=s=>document.querySelector(s);
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let issues=[],statusFilter='Барлығы',categoryFilter='Барлығы',searchQuery='',evaluated=null;
async function api(path, data) {
  const response=await fetch(path,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:undefined);
  const result=await response.json(); if(!response.ok) throw new Error(result.error||'Қате шықты.'); return result;
}
function renderStats(){
  if(!$('#statTotal')) return;
  $('#statTotal').textContent=issues.length;
  $('#statNew').textContent=issues.filter(x=>x.status==='Жаңа').length;
  $('#statProgress').textContent=issues.filter(x=>x.status==='Қаралуда').length;
  $('#statResolved').textContent=issues.filter(x=>x.status==='Шешілді').length;
}
function renderIssues() {
  const query=searchQuery.trim().toLocaleLowerCase();
  const selected=issues.filter(x=>(statusFilter==='Барлығы'||x.status===statusFilter)&&(categoryFilter==='Барлығы'||x.category===categoryFilter)&&(!query || [x.text,x.location,x.category].some(value=>String(value||'').toLocaleLowerCase().includes(query))));
  renderStats();
  $('#totalCount').textContent=`${selected.length} өтініш`;
  $('#issueList').innerHTML=selected.length?selected.map(x=>`<article class="issue-row"><div class="issue-main"><h3>${safe(x.text)}</h3><p><span class="category">${safe(x.category)}</span><span class="issue-id">${x.is_demo?'Демо · ':''}№${Number(x.id)}</span></p></div><div class="issue-location"><span class="mobile-label">Орны</span><span>${safe(x.location)}</span></div><div class="issue-status"><label for="status-${Number(x.id)}">Мәртебесі</label><select class="status-select" data-status="${safe(x.status)}" id="status-${Number(x.id)}" aria-label="${safe(x.text)}: мәртебесі" data-id="${Number(x.id)}">${['Жаңа','Қаралуда','Шешілді'].map(s=>`<option value="${s}" ${s===x.status?'selected':''}>${s}</option>`).join('')}</select></div></article>`).join(''):'<p class="empty">Бұл бөлімде өтініш жоқ.</p>';
}
async function loadIssues(){const data=await api('/api/issues');issues=data.issues;renderIssues();}
$('#classify')?.addEventListener('click',async()=>{
  const text=$('#issueText').value.trim();if(!text){$('#classification').textContent='Алдымен мәселені жаз.';$('#knownWords').textContent='';return;}
  try{const data=await api('/api/classify',{text});$('#classification').textContent=data.category?`Модель болжамы: ${data.category}`:'Санат анықталмады. Басқа сөздермен жазып көр.';$('#knownWords').textContent=data.known_words.length?`Модель таныған сөздер: ${data.known_words.join(', ')}. Бұл сөздер болжамға қатысады, бірақ нәтиже қате болуы мүмкін.`:'Модельге таныс сөз табылмады.';}catch(e){$('#classification').textContent=e.message;}
});
$('#issueText')?.addEventListener('input',()=>{$('#classification').textContent='Мәтін өзгерді — санатын қайта анықта.';$('#knownWords').textContent='';});
$('#issueForm')?.addEventListener('submit',async e=>{
 e.preventDefault();const text=$('#issueText').value.trim(),location=$('#issueLocation').value.trim();
 try{const r=await api('/api/issues',{text,location});$('#formMessage').innerHTML=`Өтініш қосылды. Модель санаты: ${safe(r.category)}. <a href="/issues">Өтініштерді көру →</a>`;$('#issueForm').reset();$('#knownWords').textContent='';$('#classification').textContent='Алдымен мәселені жаз';if($('#issueList')) await loadIssues();}catch(e){$('#formMessage').textContent=e.message;}
});
$('#issueSearch')?.addEventListener('input',e=>{searchQuery=e.target.value;renderIssues();});
$('#statusFilter')?.addEventListener('change',e=>{statusFilter=e.target.value;renderIssues();animateList();});
$('#categoryFilter')?.addEventListener('change',e=>{categoryFilter=e.target.value;renderIssues();animateList();});
document.addEventListener('change',async e=>{const s=e.target.closest('select[data-id]');if(!s)return;try{await api(`/api/issues/${Number(s.dataset.id)}/status`,{status:s.value});const item=issues.find(x=>Number(x.id)===Number(s.dataset.id));if(item)item.status=s.value;renderStats();s.dataset.status=s.value;if(statusFilter!=='Барлығы'&&statusFilter!==s.value){renderIssues();animateList();}else if(!matchMedia('(prefers-reduced-motion: reduce)').matches){s.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:280});}}catch(err){alert(err.message);await loadIssues();}});
$('#detailsToggle')?.addEventListener('click',()=>{const details=$('#details');details.hidden=!details.hidden;$('#detailsToggle').setAttribute('aria-expanded',String(!details.hidden));$('#detailsToggle span').textContent=details.hidden?'＋':'−';});
async function loadEvaluation(){
 evaluated=await api('/api/evaluation');$('#accuracy').textContent=evaluated.accuracy.toFixed(1).replace('.',',')+'%';$('#accuracyCaption').textContent=`${evaluated.correct} / ${evaluated.total} дұрыс`;$('#trainCount').textContent=`${evaluated.train_count} мәтін`;$('#testCount').textContent=`${evaluated.total} мәтін`;
 const labels=evaluated.labels;$('#matrix').innerHTML=`<thead><tr><th>Нақты / болжам</th>${labels.map(l=>`<th>${safe(l)}</th>`).join('')}</tr></thead><tbody>${evaluated.matrix.map((row,i)=>`<tr><th>${safe(labels[i])}</th>${row.map(n=>`<td>${Number(n)}</td>`).join('')}</tr>`).join('')}</tbody>`;

}
if($('#issueList')) loadIssues().catch(()=>$('#issueList').textContent='Өтініштерді жүктеу мүмкін болмады.');
if($('#accuracy')) loadEvaluation().catch(()=>$('#accuracyCaption').textContent='Нәтижені жүктеу мүмкін болмады.');

const heroText=$('#heroText'), heroError=$('#heroError');
$('#heroForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const text=heroText.value.trim();
 if(!text){heroError.textContent='Мәселені қысқаша жаз.';heroText.setAttribute('aria-invalid','true');heroText.focus();return;}
 heroError.textContent='';heroText.removeAttribute('aria-invalid');
 const target=$('#issueText');target.value=text;target.dispatchEvent(new Event('input',{bubbles:true}));
 $('#report').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 target.focus({preventScroll:true});
});
heroText?.addEventListener('input',()=>{heroError.textContent='';heroText.removeAttribute('aria-invalid');});
document.querySelectorAll('.mobile-nav a').forEach(link=>link.addEventListener('click',()=>{$('.mobile-nav').open=false;}));

function animateList(){if(!matchMedia('(prefers-reduced-motion: reduce)').matches)$('#issueList').animate([{opacity:.55,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});}
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
}

const sampleSets={
 'Проектор қосылмай тұр':['Проектор қосылмай тұр','Проектордың суреті шықпайды','Проектордың шамы жанбайды, сурет көрінбейді','Проектор кабелі жалғанса да бейне жоқ','204 аудиторияда проектор қосылмайды','Аудиториядағы проектордың бейнесі көрінбейді'],
 'Кітапханада интернет өте баяу':['Кітапханада интернет өте баяу','Вайфай интернетке қосылмайды','Wifi істемейді кітапханада','Интернет байланысы үзіліп қалды','Университеттің вайфай желісі көрінбей тұр','Кітапханада wifi сигналы өте әлсіз'],
 'Дәлізде жарық жанбайды':['Дәлізде жарық жанбайды','Аудиториядағы шам сөніп қалды','Жарық шамы жыпылықтайды','Шам жанып кеткен, ауыстыру керек','Аудиторияда бірнеше шам өшіп тұр','Дәрісханадағы жарық бірде жанып, бірде сөнеді']
};
document.querySelectorAll('[data-sample]').forEach(button=>{
 const samples=sampleSets[button.dataset.sample]; let next=0;
 button.addEventListener('click',()=>{
  const input=$('#issueText');input.value=samples[next];next=(next+1)%samples.length;
  input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();
 });
});

// Login and registration are planned; do not collect account details yet.
const authNotice=$('#authNotice');
document.querySelectorAll('.auth-trigger').forEach(button=>button.addEventListener('click',()=>authNotice.showModal()));
authNotice?.querySelectorAll('.auth-close,.auth-ok').forEach(button=>button.addEventListener('click',()=>authNotice.close()));
authNotice?.addEventListener('click',event=>{if(event.target===authNotice)authNotice.close();});
