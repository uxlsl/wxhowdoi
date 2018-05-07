from sanic import Sanic
from sanic.response import json
from howdoi.howdoi import howdoi

app = Sanic()

@app.route('/')
async def query(request):
    args = dict(request.args)
    args.setdefault('num_answers', 1)
    args.setdefault('all', True)
    args.setdefault('pos', 1)
    args.setdefault('color', False)
    result = howdoi(args).encode('utf-8', 'ignore')
    return json({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
