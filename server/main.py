import ssl
from sanic import Sanic
from sanic.response import json
from howdoi.howdoi import howdoi

app = Sanic()

@app.route('/')
async def query(request):
    args = dict(request.args)
    args.setdefault('query', 'hello')
    args.setdefault('num_answers', 1)
    args.setdefault('all', True)
    args.setdefault('pos', 1)
    args.setdefault('color', False)
    result = howdoi(args).encode('utf-8', 'ignore')
    return json({'result': result})

if __name__ == '__main__':
    context = ssl.create_default_context(purpose=ssl.Purpose.CLIENT_AUTH)
    context.load_cert_chain("./server.crt", 
            keyfile="./server.key")
    app.run(host='0.0.0.0', port=8000, ssl=context, debug=True)
