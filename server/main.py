import json
from bottle import route, request, run
from howdoi.howdoi import howdoi

import pygments
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import guess_lexer, get_lexer_by_name


def highlight(code):
    #lexer = guess_lexer(code)
    lexer = get_lexer_by_name('python')
    formatter = HtmlFormatter()
    code_hl = pygments.highlight(code, lexer, formatter)
    code_hl = code_hl.replace('\n', '<br>')
    code_hl = code_hl.replace(' ', '&nbsp;')
    return code_hl

@route('/hello')
def query():
    args = {'all': False, 
            'clear_cache': False, 
            'color': False, 
            'pos': 1, 'version': False, 
            'link': False, 
            'query': ['python', 'insert', 'sort'], 
            'num_answers': 1}

    query = request.query.get('query')
    if query:
        args['query'] = query.split()
    else:
        args['query'] = ['python', 'hello']

    result = howdoi(args)
    result = highlight(result)
    return json.dumps({'result': result})


if __name__ == '__main__':
    run(host='0.0.0.0', port=5025, server='paste')
