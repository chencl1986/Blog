module.exports = function(title) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 3000
  })
}