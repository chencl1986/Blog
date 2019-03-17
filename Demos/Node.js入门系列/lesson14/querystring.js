const querystring = require('querystring')

console.log(querystring.parse('foo=bar&abc=xyz&abc=123'))

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))
