import json, tempfile, threading, unittest, urllib.request, urllib.error, gc
from pathlib import Path
from http.server import ThreadingHTTPServer
import app
from model import read_data, Model, evaluate

class CampusFixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent); cls.old=app.DB; app.DB=Path(cls.tmp.name)/'test.db'; app.init()
        cls.server=ThreadingHTTPServer(('127.0.0.1',0),app.Handler); cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True); cls.thread.start(); cls.url='http://127.0.0.1:'+str(cls.server.server_port)
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.thread.join(); cls.server.server_close(); app.DB=cls.old; gc.collect(); cls.tmp.cleanup()
    def request(self,path,data=None):
        req=urllib.request.Request(self.url+path,data=json.dumps(data).encode() if data is not None else None,headers={'Content-Type':'application/json'})
        try:
            with urllib.request.urlopen(req) as response:return response.status,json.load(response)
        except urllib.error.HTTPError as error:return error.code,json.load(error)
    def test_separate_data_and_evaluation(self):
        train=read_data('train.csv')+read_data('extra_train.csv'); test=read_data('challenge.csv'); self.assertEqual((len(train),len(test)),(160,25))
        self.assertFalse({r['text'].strip().lower() for r in train}&{r['text'].strip().lower() for r in test})
        result=evaluate(Model());self.assertEqual(result['train_count'],160);self.assertEqual(result['total'],25);self.assertEqual(sum(sum(row) for row in result['matrix']),25)
    def test_issue_workflow(self):
        status,prediction=self.request('/api/classify',{'text':'проектор қосылмай тұр'});self.assertEqual((status,prediction['category']),(200,'Техника'))
        status,created=self.request('/api/issues',{'text':'проектор қосылмай тұр','location':'Демо аудитория'});self.assertEqual(status,201)
        issue_id=created['id'];status,_=self.request(f'/api/issues/{issue_id}/status',{'status':'Шешілді'});self.assertEqual(status,200)
        _,result=self.request('/api/issues');item=next(i for i in result['issues'] if i['id']==issue_id);self.assertEqual((item['category'],item['status']),('Техника','Шешілді'))
        self.assertEqual(self.request('/api/issues',{'text':'','location':'Демо'})[0],400)
        self.assertEqual(self.request(f'/api/issues/{issue_id}/status',{'status':'қате'})[0],400)
if __name__=='__main__':unittest.main()
