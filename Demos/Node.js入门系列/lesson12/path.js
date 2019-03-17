const path = require('path')

const str = '/root/a/b/1.txt'

console.log(path.dirname(str))  // 获取文件目录：/root/a/b
console.log(path.basename(str)) // 获取文件名：1.txt
console.log(path.extname(str)) // 获取文件后缀：.txt
console.log(path.resolve(str, '../c', 'build', 'strict')) // 将路径解析为绝对路径：C:\root\a\b\c\build\strict
console.log(path.resolve(str, '../c', 'build', 'strict', '../..', 'assets')) // 将路径解析为绝对路径：C:\root\a\b\c\assets
console.log(path.resolve(__dirname, 'build')) // 将路径解析为绝对路径：C:\projects\nodejs-tutorial\lesson12\build
