"""Synthetic educational text classifier; training and test sets are separate."""
import csv, re, math
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ALIASES = {'wifi':'вайфай', 'wi':'вайфай', 'лампочка':'шам', 'стулдың':'орындық', 'сынған':'сынып', 'кітапханада':'кітапхана', 'дәретханада':'дәретхана', 'аудиториядағы':'аудиторияда', 'жарығы':'жарық'}
def tokenize(text):
    return [ALIASES.get(w,w) for w in re.findall(r'[^\W_]+', text.lower(), re.UNICODE)]
def read_data(name):
    with (ROOT / 'data' / name).open(encoding='utf-8', newline='') as file: return list(csv.DictReader(file))
class Model:
    def __init__(self, training_rows=None):
        self.docs=Counter(); self.counts=defaultdict(Counter); self.vocab=set()
        training_rows = training_rows if training_rows is not None else read_data('train.csv') + read_data('extra_train.csv')
        for row in training_rows:
            t=tokenize(row['text']); self.docs[row['label']]+=1; self.counts[row['label']].update(t); self.vocab.update(t)
    def known_words(self,text):
        # These normalized words are the actual input tokens used by predict().
        return list(dict.fromkeys(t for t in tokenize(text) if t in self.vocab))[:8]
    def predict(self,text):
        tokens=[t for t in tokenize(text) if t in self.vocab]
        if not tokens: return None
        def score(label):
            c=self.counts[label]; return math.log(self.docs[label]/sum(self.docs.values()))+sum(math.log((c[t]+1)/(sum(c.values())+len(self.vocab))) for t in tokens)
        return max(self.docs,key=score)
def evaluate(model, filename='challenge.csv'):
    cases=read_data(filename); labels=sorted(model.docs); matrix={label:Counter() for label in labels}; examples=[]
    for row in cases:
        predicted=model.predict(row['text']); matrix[row['label']][predicted or 'Белгісіз']+=1
        examples.append({'text':row['text'],'expected':row['label'],'predicted':predicted or 'Белгісіз'})
    correct=sum(matrix[l][l] for l in labels)
    return {'train_count':sum(model.docs.values()),'total':len(cases),'correct':correct,'accuracy':round(correct/len(cases)*100,1),'labels':labels+['Белгісіз'],'matrix':[[matrix[l][p] for p in labels+['Белгісіз']] for l in labels], 'examples':examples}
if __name__=='__main__':
    import json
    print(json.dumps(evaluate(Model()),ensure_ascii=False,indent=2))
