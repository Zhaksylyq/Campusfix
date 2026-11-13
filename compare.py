"""Compare both training sets on the same synthetic challenge set."""
import json
from model import Model, evaluate, read_data

base = read_data('train.csv')
extra = read_data('extra_train.csv')
challenge = read_data('challenge.csv')
def normalized(rows):
    return {r['text'].strip().casefold() for r in rows}
assert not normalized(base + extra) & normalized(challenge), 'Тест мәтіні оқытуға араласқан'
for name, data in [('Бұрынғы', base), ('Жаңартылған', base + extra)]:
    result = evaluate(Model(data))
    print(f"{name}: {len(data)} оқыту мәтіні, {result['correct']}/{result['total']} дұрыс ({result['accuracy']}%)")
    print('Қателер:')
    for row in result['examples']:
        if row['expected'] != row['predicted']:
            print(f"  {row['text']} | дұрыс: {row['expected']} | болжам: {row['predicted']}")
    print('Матрица (бағандар):', ', '.join(result['labels']))
    print(json.dumps(result['matrix'],ensure_ascii=False))
