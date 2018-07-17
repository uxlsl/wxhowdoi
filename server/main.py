import json
from bottle import route, request, run
from howdoi.howdoi import howdoi

import pygments
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import guess_lexer, get_lexer_by_name


def pre_to_div(html):
    html = html.replace('pre', 'div')
    html = html.replace('\n', '<br>')
    ret = ''
    count = 0
    for c in html:
        if c == '<' or c == '>':
            count += 1
        if c == ' ' and count % 2 == 0:
            ret += '&nbsp;'
        else:
            ret += c
    return ret


def highlight(code):
    lexer = guess_lexer(code)
    formatter = HtmlFormatter(linenos='inline', linenostart=0)
    code_hl = pygments.highlight(code, lexer, formatter)
    return pre_to_div(code_hl)


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
    run(host='0.0.0.0', port=5025)
