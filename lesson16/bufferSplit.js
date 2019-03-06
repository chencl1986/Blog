module.exports = function bufferSplit(buffer, separator) {
  let result = [];
  let index = 0;

  while ((index = buffer.indexOf(separator)) != -1) {
    result.push(buffer.slice(0, index));
    buffer = buffer.slice(index + separator.length);
  }
  result.push(buffer);

  return result;
}