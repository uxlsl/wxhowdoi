import json
from bottle import route, request, run
from howdoi import howdoi


@route('/hello')
def query():
    args = {'all': False, 
            'clear_cache': False, 
            'color': False, 
            'pos': 1, 'version': False, 
            'link': False, 
            'query': ['python', 'insert', 'sort'], 
            'num_answers': 3}

    query = request.query.get('query')
    if query:
        args['query'] = query.split()
    else:
        args['query'] = ['python', 'hello']

    result = howdoi(args)
    return json.dumps({'result': result})


if __name__ == '__main__':
    run(host='0.0.0.0', port=5025, server='paste')
