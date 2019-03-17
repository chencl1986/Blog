const fs = require('fs')

// 创建一个可读流。
const readStream = fs.createReadStream('./1.txt')

// 创建一个可写流。
const writeStream = fs.createWriteStream('./2.txt')

// 将可读流读取的数据，通过管道pipe推送到写入流中，即可将1.txt的内容，写入到2.txt中。
readStream.pipe(writeStream)

// 读取出现错误时会触发error事件。
readStream.on('error', (error) => {
  console.error(error)
})

// 写入完成时，触发finish事件。
writeStream.on('finish', () => {
  console.log('finish')
})
