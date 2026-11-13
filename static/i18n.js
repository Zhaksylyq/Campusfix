// Interface translations. User-submitted issue text and locations stay as written.
const translations = {
'Кіру':['Вход','Log in'],'Тіркелу':['Регистрация','Sign up'],'Әзірлену үстінде':['В разработке','Coming soon'],'Кіру және тіркелу функциясы әлі жасалып жатыр.':['Функции входа и регистрации пока находятся в разработке.','Login and registration are still being developed.'],'Түсінікті':['Понятно','Got it'],
'Мәселе, орын немесе санат':['Проблема, место или категория','Issue, location or category'],'Барлығы':['Всего','Total'],'Іздеу':['Поиск','Search'],'Мәселе немесе орын':['Проблема или место','Issue or location'],
'Басты бет':['Главная','Home'],'Өтініштер':['Обращения','Reports'],'Модель туралы':['О модели','About the model'],'Мәзір':['Меню','Menu'],
'Мәселе хабарлау':['Сообщить о проблеме','Report an issue'],'Мәселені хабарлау':['Сообщить о проблеме','Report an issue'],
'Кампусты бірге':['Вместе улучшим','Let’s improve'],'жақсартайық.':['наш кампус.','our campus together.'],
'Кампуста қандай мәселе байқадың?':['Какую проблему вы заметили в кампусе?','What issue did you notice on campus?'],
'Жалғастыру':['Продолжить','Continue'],'Жалғастыру →':['Продолжить →','Continue →'],
'Өтініш қалдыр да, оның мәртебесін осы жерден бақыла.':['Оставьте обращение и следите за его статусом здесь.','Submit a report and track its status here.'],
'Жаңа өтініш':['Новое обращение','New report'],'Бір мәселе байқадың ба?':['Заметили проблему?','Noticed an issue?'],
'Не болғанын қысқаша жаз. Сайт өтініштің санатын анықтауға тырысады.':['Кратко опишите проблему. Сайт попробует определить её категорию.','Briefly describe the issue. The site will try to identify its category.'],
'Бұл — оқу жобасы':['Это учебный проект','This is a student project'],
'Өтініш университет қызметкерлеріне жіберілмейді. Жеке деректерді енгізбе.':['Обращения не отправляются сотрудникам университета. Не вводите личные данные.','Reports are not sent to university staff. Do not enter personal information.'],
'Модель қазақша мәтінмен жұмыс істейді. Мәселені қазақша жаз.':['Модель работает с текстом на казахском языке. Опишите проблему на казахском.','The model works with Kazakh text. Please describe the issue in Kazakh.'],
'Барлық өрісті толтыр.':['Заполните все поля.','Complete all fields.'],'Мәселені сипатта':['Опишите проблему','Describe the issue'],'Қай жерде?':['Где?','Where?'],
'Санатын анықтау':['Определить категорию','Identify category'],'Алдымен мәселені жаз':['Сначала опишите проблему','Describe the issue first'],
'Алдымен мәселені жаз.':['Сначала опишите проблему.','Describe the issue first.'],
'Мәтін өзгерді — санатын қайта анықта.':['Текст изменился — определите категорию снова.','Text changed — identify the category again.'],
'Санат анықталмады. Басқа сөздермен жазып көр.':['Категория не определена. Попробуйте описать проблему другими словами на казахском.','Category not identified. Try different words in Kazakh.'],
'Модельге таныс сөз табылмады.':['Модель не распознала слов.','No words known to the model were found.'],
'Мәселені қысқаша жаз.':['Кратко опишите проблему.','Briefly describe the issue.'],
'Мәліметті тексеріп, қайта енгіз.':['Проверьте данные и попробуйте снова.','Check your input and try again.'],
'Мысалды қолданып көр:':['Попробуйте пример:','Try an example:'],'Проектор':['Проектор','Projector'],'Интернет':['Интернет','Internet'],'Жарық':['Освещение','Lighting'],
'Өтінішті қосу':['Добавить обращение','Submit report'],'Өтініштерді көру →':['Посмотреть обращения →','View reports →'],
'Үш қарапайым қадам':['Три простых шага','Three simple steps'],'Қалай жұмыс істейді':['Как это работает','How it works'],
'Бір өтініштен жақсы өзгеріс басталады.':['Изменения начинаются с одного обращения.','A positive change starts with one report.'],
'Мәселені жаз.':['Опишите проблему.','Describe the issue.'],'Не болғанын және қай жерде екенін қысқаша айт.':['Кратко укажите, что случилось и где.','Briefly explain what happened and where.'],
'Санатын анықта.':['Определите категорию.','Identify the category.'],'Модель мәтіндегі сөздерге қарап, мәселенің санатын болжайды.':['Модель определяет категорию по словам в тексте.','The model predicts a category from the words in the text.'],
'Модель болжамы':['Прогноз модели','Model prediction'],'Мәртебесін бақыла.':['Следите за статусом.','Track its status.'],
'Өтінішіңнің жағдайын тізімнен көріп отыр.':['Проверяйте статус обращения в списке.','Check your report’s status in the list.'],'Өтініш мәртебесі':['Статус обращения','Report status'],
'Кампусты бірге жақсартамыз.':['Улучшим кампус вместе.','Let’s improve campus together.'],'Байқаған мәселе туралы хабарла.':['Сообщите о замеченной проблеме.','Report an issue you noticed.'],
'Оқу прототипі · Жасанды деректер':['Учебный прототип · Синтетические данные','Student prototype · Synthetic data'],'Жоғары ↑':['Наверх ↑','Back to top ↑'],
'Соңғы өтініштер':['Последние обращения','Recent reports'],'Кампус мәселелерін бір жерден қарап, мәртебесін бақыла.':['Смотрите обращения о проблемах кампуса и следите за их статусом.','View campus issues and track their status in one place.'],
'Санат':['Категория','Category'],'Барлық санат':['Все категории','All categories'],'Техника':['Техника','Equipment'],'Жиһаз':['Мебель','Furniture'],'Су жүйесі':['Водоснабжение','Plumbing'],'Электр':['Электричество','Electrical'],
'Мәртебе':['Статус','Status'],'Мәртебесі':['Статус','Status'],'Барлық мәртебе':['Все статусы','All statuses'],'Жаңа':['Новое','New'],'Қаралуда':['В работе','In progress'],'Шешілді':['Решено','Resolved'],
'Мәселе':['Проблема','Issue'],'Орны':['Место','Location'],'Бұл бөлімде өтініш жоқ.':['Обращений нет.','No reports found.'],
'Демо: мәртебені тізімнен өзгертуге болады.':['Демо: статус можно изменить в списке.','Demo: the status can be changed in the list.'],
'Өтініштерді жүктеу мүмкін болмады.':['Не удалось загрузить обращения.','Could not load reports.'],
'Машиналық оқыту':['Машинное обучение','Machine learning'],'Мәтіннен санатқа':['От текста к категории','From text to category'],
'Модель өтініштегі сөздерге қарап, мәселенің түрін болжайды. Бұл — мәтінді жіктеу, яғни classification.':['Модель определяет тип проблемы по словам в обращении. Это классификация текста.','The model predicts the issue type from the words in the report. This is text classification.'],
'Әдіс:':['Метод:','Method:'],'Тест деректері жасанды және шағын. Нәтиже нақты өмірдегі дәлдікті көрсетпейді.':['Тестовые данные синтетические, их немного. Результат не показывает точность в реальных условиях.','The test data is synthetic and small. Results do not reflect real-world accuracy.'],
'Деректер туралы':['О данных','About the data'],
'Модель кампуста кездесетін мәселелердің жасанды мәтіндерімен оқытылған. Ол өтінішті бес санаттың біріне жатқызуға тырысады.':['Модель обучена на синтетических описаниях проблем кампуса и пытается отнести обращение к одной из пяти категорий.','The model was trained on synthetic descriptions of campus issues and tries to assign each report to one of five categories.'],
'Оқу жобасына арналған деректер:':['Данные для учебного проекта:','Data for the student project:'],'Оқыту деректері ↓':['Обучающие данные ↓','Training data ↓'],'Тексеру деректері ↓':['Тестовые данные ↓','Test data ↓'],
'Модель қателесуі мүмкін: мәселені нақты әрі түсінікті жазған дұрыс.':['Модель может ошибаться: описывайте проблему ясно и точно.','The model can make mistakes: describe the issue clearly and precisely.'],
'Мысалы, 204-аудиториядағы проектор қосылмай тұр':['Например, в аудитории 204 не включается проектор','For example, the projector in room 204 will not turn on'],
'Мысалы: 204-аудиторияда проектор қосылмай тұр':['Например: проектор в аудитории 204 не включается','For example: the projector in room 204 will not turn on'],
'Мысалы: Бас ғимарат, 204-аудитория':['Например: главный корпус, аудитория 204','For example: Main building, room 204'],
'204-аудиторияда проектор қосылмай тұр':['В аудитории 204 не включается проектор','The projector in room 204 will not turn on'],
'Проектор қосылмай тұр':['Проектор не включается','The projector will not turn on'],'Кітапханада интернет баяу':['В библиотеке медленный интернет','The library internet is slow'],
'✦   Техника':['✦   Техника','✦   Equipment']
};
let currentLanguage = localStorage.getItem('campusfix-language') || 'kk';
if (!['kk','ru','en'].includes(currentLanguage)) currentLanguage='kk';
const originalText = new WeakMap(), originalAttributes = new WeakMap();
function translateValue(value) {
  if(currentLanguage==='kk') return value;
  const index=currentLanguage==='ru'?0:1;
  if(translations[value]) return translations[value][index];
  let match=value.match(/^(\d+) өтініш$/);
  if(match) return currentLanguage==='ru'?`Обращений: ${match[1]}`:`Reports: ${match[1]}`;
  match=value.match(/^Модель болжамы: (.+)$/);
  if(match) return `${currentLanguage==='ru'?'Прогноз модели':'Model prediction'}: ${translateValue(match[1])}`;
  match=value.match(/^Өтініш қосылды\. Модель санаты: (.+)\.$/);
  if(match) return `${currentLanguage==='ru'?'Обращение добавлено. Категория модели':'Report submitted. Model category'}: ${translateValue(match[1])}. `;
  match=value.match(/^Модель таныған сөздер: (.+)\. Бұл сөздер болжамға қатысады, бірақ нәтиже қате болуы мүмкін\.$/);
  if(match) return currentLanguage==='ru'?`Распознанные слова: ${match[1]}. Они влияют на прогноз, но результат может быть ошибочным.`:`Recognized words: ${match[1]}. They affect the prediction, which may be incorrect.`;
  return value;
}
function translatePage(){
 document.documentElement.lang=currentLanguage;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode, parent=node.parentElement;
  if(!parent || parent.closest('script, style, .ghosts, .issue-main h3, .issue-location span:not(.mobile-label), .issue-id, .language-control')) continue;
  const current=node.nodeValue, saved=originalText.get(node);
  const source=saved && current===saved.rendered?saved.source:current;
  const trimmed=source.trim(); if(!trimmed) continue;
  const translated=translateValue(trimmed);
  const rendered=source.replace(trimmed,translated);
  originalText.set(node,{source,rendered}); if(current!==rendered) node.nodeValue=rendered;
 }
 document.querySelectorAll('[placeholder]').forEach(el=>{
  const source=originalAttributes.get(el) || el.getAttribute('placeholder'); originalAttributes.set(el,source);
  const translated=translateValue(source); if(el.getAttribute('placeholder')!==translated) el.setAttribute('placeholder',translated);
 });
}
const languageMenu=document.querySelector('#languageMenu');
const languageCurrent=document.querySelector('#languageCurrent');
function updateLanguageMenu(){
 languageCurrent.textContent={kk:'ҚАЗ',ru:'РУС',en:'ENG'}[currentLanguage];
 languageMenu.querySelectorAll('[data-language]').forEach(button=>{
  const selected=button.dataset.language===currentLanguage;
  button.classList.toggle('is-selected',selected);
  button.setAttribute('aria-pressed',String(selected));
 });
}
languageMenu.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{
 currentLanguage=button.dataset.language;
 localStorage.setItem('campusfix-language',currentLanguage);
 updateLanguageMenu();translatePage();languageMenu.open=false;
 languageMenu.querySelector('summary').focus();
}));
document.addEventListener('click',event=>{if(!languageMenu.contains(event.target)) languageMenu.open=false;});
languageMenu.addEventListener('keydown',event=>{if(event.key==='Escape' && languageMenu.open){languageMenu.open=false;languageMenu.querySelector('summary').focus();}});
updateLanguageMenu();
translatePage();
let translateQueued=false;
new MutationObserver(()=>{if(translateQueued)return;translateQueued=true;requestAnimationFrame(()=>{translateQueued=false;translatePage();});}).observe(document.body,{subtree:true,childList:true,characterData:true});

