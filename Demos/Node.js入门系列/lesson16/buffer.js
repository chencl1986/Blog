let buffer = Buffer.from('lee\r\nchen\r\ntest')

const index = buffer.indexOf('\r\n')

console.log(index)
console.log(buffer.slice(0, index).toString())
