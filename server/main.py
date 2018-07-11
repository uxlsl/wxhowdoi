from flask import Flask, request, jsonify
from howdoi.howdoi import howdoi

app = Flask(__name__)


@app.route('/hello')
def query():
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
    return jsonify({'result': '```\n\n{}\n\n```'.format(result)})

