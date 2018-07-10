from sanic import Sanic
from sanic.response import json
from howdoi.howdoi import howdoi

app = Sanic()

@app.route('/hello')
async def query(request):
    args = {'all': False, 
            'clear_cache': False, 
            'color': False, 
            'pos': 1, 'version': False, 
            'link': False, 
            'query': ['python', 'insert', 'sort'], 
            'num_answers': 1}
    query = request.args.get('query')
    args['query'] = query.split()
    result = howdoi(args)
    return json({'result': '```\n\n{}\n\n```'.format(result)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5025, debug=True)
