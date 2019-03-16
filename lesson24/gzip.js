const fs = require('fs')
// 引入zlib模块，用于实现压缩功能
const zlib = require('zlib')

// 创建一个可读流。
const readStream = fs.createReadStream('./google.jpg')

// 创建一个可写流。
const writeStream = fs.createWriteStream('./google.jpg.gz')

// 创建一个Gzip对象，用于将文件压缩成.gz文件
const gzip = zlib.createGzip()

// 将可读流读取的数据，先通过管道pipe推送到gzip中，再推送到写入流中。
// 也就是先将可读流的数据压缩，再推送到可写流中。
readStream.pipe(gzip).pipe(writeStream)

// 读取出现错误时会触发error事件。
readStream.on('error', (error) => {
  console.error(error)
})

// 写入完成时，触发finish事件。
writeStream.on('finish', () => {
  console.log('finish')
})
