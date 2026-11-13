import csv
import io
import json
import unittest
from app import Handler, MODEL

class FeatureTests(unittest.TestCase):
    def handler(self, path, body=None):
        handler=Handler.__new__(Handler)
        handler.path=path
        payload=json.dumps(body, ensure_ascii=False).encode() if body is not None else b''
        handler.headers={'Content-Length':str(len(payload))}
        handler.rfile=io.BytesIO(payload)
        handler.wfile=io.BytesIO()
        handler.send_response=lambda status: None
        handler.send_header=lambda key,value: None
        handler.end_headers=lambda: None
        return handler
    def test_classification_and_unknown_input(self):
        handler=self.handler('/api/classify',{'text':'проектор қосылмай тұр'})
        handler.do_POST()
        result=json.loads(handler.wfile.getvalue())
        self.assertEqual(result['category'],'Техника')
        self.assertIn('проектор',result['known_words'])
        handler=self.handler('/api/classify',{'text':'абыржытпай'})
        handler.do_POST()
        result=json.loads(handler.wfile.getvalue())
        self.assertIsNone(result['category'])
        self.assertEqual(result['known_words'],[])
    def test_downloads_keep_sets_separate(self):
        rows=[]
        for path in ('/data/train.csv','/data/challenge.csv'):
            handler=self.handler(path)
            handler.do_GET()
            content=handler.wfile.getvalue(); self.assertTrue(content.startswith(b'\xef\xbb\xbf'))
            stream=io.StringIO(content.decode('utf-8-sig')); self.assertEqual(stream.readline().strip(),'sep=;')
            rows.append(list(csv.DictReader(stream,delimiter=';')))
        self.assertEqual([len(part) for part in rows],[160,25])
        self.assertTrue(all(next((c for c in row['Мәтін'] if c.isalpha()),'').isupper() for row in rows[0]))
        self.assertEqual(set(rows[1][0]),{'Мәтін','Санат'})
        self.assertFalse({r['Мәтін'].lower().strip() for r in rows[0]} & {r['Мәтін'].lower().strip() for r in rows[1]})

if __name__=='__main__':
    unittest.main()
