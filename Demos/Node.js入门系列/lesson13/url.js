const url = require('url')

const str = 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4'

console.log(url.parse(str).toString())
console.log(url.parse(str, true))

const { URL } = require('url')
const urlObj = new URL(str)

console.log(urlObj)
console.log(urlObj.toString())
