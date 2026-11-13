import json, re, sqlite3, csv, io
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from model import Model, evaluate

ROOT=Path(__file__).resolve().parent; DB=ROOT/'campusfix.db'; MODEL=Model()
STATUSES={'Жаңа','Қаралуда','Шешілді'}
DEMO=[('204-аудиторияда проектор қосылмай тұр','Бас ғимарат · 204','Техника','Жаңа'),('Кітапханада интернет өте баяу','Кітапхана · 2-қабат','Интернет','Қаралуда'),('Дәлізде жарық жанбайды','Бас ғимарат · 1-қабат','Электр','Жаңа'),('Аудиторияда орындықтың аяғы сынған','Бас ғимарат · 305','Жиһаз','Шешілді'),('Дәретханада краннан су ағып тұр','Оқу корпусы · 1-қабат','Су жүйесі','Жаңа')]
def connect():
    conn=sqlite3.connect(DB); conn.row_factory=sqlite3.Row; return conn
def init():
    with connect() as db:
        new_database = db.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='issues'").fetchone() is None
        db.execute('CREATE TABLE IF NOT EXISTS issues(id INTEGER PRIMARY KEY, text TEXT NOT NULL, location TEXT NOT NULL, category TEXT NOT NULL, status TEXT NOT NULL DEFAULT "Жаңа", is_demo INTEGER NOT NULL DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP)')
        if new_database: db.executemany('INSERT INTO issues(text,location,category,status,is_demo) VALUES (?,?,?,?,1)', DEMO)
class Handler(BaseHTTPRequestHandler):
    def json(self,data,status=200):
        content=json.dumps(data,ensure_ascii=False).encode(); self.send_response(status); self.send_header('Content-Type','application/json; charset=utf-8'); self.send_header('Content-Length',str(len(content))); self.end_headers(); self.wfile.write(content)
    def do_GET(self):
        path=urlparse(self.path).path
        if path=='/api/issues':
            with connect() as db: rows=[dict(r) for r in db.execute('SELECT * FROM issues ORDER BY id DESC')]
            return self.json({'issues':rows})
        if path=='/api/evaluation': return self.json(evaluate(MODEL))
        excel_files={'/data/train.xlsx':'campusfix_train_download.xlsx','/data/challenge.xlsx':'campusfix_test_download.xlsx'}
        if path in excel_files:
            filename=excel_files[path]; content=(ROOT/'data'/filename).read_bytes()
            self.send_response(200); self.send_header('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); self.send_header('Content-Disposition',f'attachment; filename="{filename}"'); self.send_header('Content-Length',str(len(content))); self.end_headers(); self.wfile.write(content); return
        if path in ('/data/train.csv','/data/challenge.csv'):
            from model import read_data
            if path=='/data/train.csv':
                rows=read_data('train.csv')+read_data('extra_train.csv'); filename='campusfix_train.csv'
            else:
                rows=read_data('challenge.csv'); filename='campusfix_test.csv'
            # Excel recognizes both UTF-8 and the separator when the file is opened directly.
            output=io.StringIO(newline=''); output.write('sep=;\r\n')
            writer=csv.writer(output,delimiter=';'); writer.writerow(['Мәтін','Санат'])
            writer.writerows((row['text'],row['label']) for row in rows)
            content=output.getvalue().encode('utf-8-sig')
            self.send_response(200); self.send_header('Content-Type','text/csv; charset=utf-8'); self.send_header('Content-Disposition',f'attachment; filename="{filename}"'); self.send_header('Content-Length',str(len(content))); self.end_headers(); self.wfile.write(content); return
        files={'/':('index.html','text/html'),'/issues':('issues.html','text/html'),'/model':('model.html','text/html'),'/style.css':('style.css','text/css'),'/script.js':('script.js','application/javascript'),'/i18n.js':('i18n.js','application/javascript')}
        if path not in files: self.send_error(404); return
        name,mime=files[path]; content=(ROOT/'static'/name).read_bytes(); self.send_response(200); self.send_header('Content-Type',mime+'; charset=utf-8'); self.send_header('Content-Length',str(len(content))); self.end_headers(); self.wfile.write(content)
    def do_POST(self):
        try:
            length=int(self.headers.get('Content-Length','0'))
            if length>5000: raise ValueError('Мәтін тым ұзын.')
            body=json.loads(self.rfile.read(length))
            if self.path in ('/api/classify','/api/issues'):
                text=str(body.get('text','')).strip()
                if not text or len(text)>500: raise ValueError('Мәселені 1–500 таңбамен сипатта.')
                category=MODEL.predict(text)
                if self.path=='/api/classify': return self.json({'category':category,'known_words':MODEL.known_words(text)})
                location=str(body.get('location','')).strip()
                if not location or len(location)>100: raise ValueError('Орынды енгіз.')
                if not category: raise ValueError('Санатты анықтай алмадық. Мәселені басқа сөздермен жазып көр.')
                with connect() as db: new_id=db.execute('INSERT INTO issues(text,location,category) VALUES (?,?,?)',(text,location,category)).lastrowid
                return self.json({'ok':True,'id':new_id,'category':category},201)
            match=re.fullmatch(r'/api/issues/(\d+)/status',self.path)
            if match:
                status=body.get('status')
                if status not in STATUSES: raise ValueError('Күй қате.')
                with connect() as db: changed=db.execute('UPDATE issues SET status=? WHERE id=?',(status,int(match.group(1)))).rowcount
                return self.json({'ok':bool(changed)},200 if changed else 404)
            self.send_error(404)
        except (ValueError,TypeError,json.JSONDecodeError): self.json({'error':'Мәліметті тексеріп, қайта енгіз.'},400)
if __name__=='__main__':
    init(); print('CampusFix: http://127.0.0.1:8001',flush=True); ThreadingHTTPServer(('127.0.0.1',8001),Handler).serve_forever()
