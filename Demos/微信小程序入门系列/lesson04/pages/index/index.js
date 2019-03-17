//index.js
//获取应用实例
const app = getApp()
const toast = require('../../utils/toast')

Page({
  data: {
    
  },
  showLoading() {
    wx.showLoading({
      title: 'loading'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  showToast() {
    wx.showToast({
      title: 'toast',
      icon: 'none',
      duration: 1000
    })
  },
  showActionSheet() {
    wx.showActionSheet({
      itemList: ['a', 'b', 'c'],
      success(value) {
        console.log(value)
      },
      fail(value) {
        console.log(value)
      },
      complete(value) {
        console.log(value)
      },
    })
  },
  showShareMenu() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo() {
    wx.getUserInfo({
      success(res) {
        toast(JSON.stringify(res))
      }
    })
  },
  login() {
    wx.login({
      success(res) {
        toast(JSON.stringify(res))
      }
    })
  },
  scanCode() {
    wx.scanCode({
      scanType: ['barCode', 'qrCode'],
      success(res) {
        toast(JSON.stringify(res))
      }
    })
  },
  setKeepScreenOn() {
    wx.setKeepScreenOn({
      setKeepScreenOn: true
    })
  },
  setScreenBrightness() {
    wx.setScreenBrightness({
      value: 1
    })
  },
  getBatteryInfo() {
    wx.getBatteryInfo({
      success(res) {
        toast(JSON.stringify(res))
      }
    })
  },
  connectWifi() {
    wx.connectWifi({
      SSID: '',
      password: '',
      success(res) {
        toast(JSON.stringify(res))
      }
    })
  },
  startSoterAuthentication() {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        toast(JSON.stringify(res))
      },
      fail(res) {
        toast(JSON.stringify(res))
      },
    })
  },
  getFileSystemManager() {
    const fs = wx.getFileSystemManager()

    fs.writeFile({
      filePath: 'test.txt',
      data: 'test' + Math.random(),
      success(res) {
        toast(JSON.stringify(res))
      },
      fail(res) {
        toast(JSON.stringify(res))
      },
    })
  },
  downloadFile() {
    wx.downloadFile({
      url: 'https://cn.bing.com/sa/simg/hpc26i_2x.png',
      filePath: 'hpc26i_2x.png',
      success(res) {
        toast(JSON.stringify(res))
      },
      fail(res) {
        toast(JSON.stringify(res))
      },
    })
  },
  startBluetoothDevicesDiscovery() {
    wx.startBluetoothDevicesDiscovery({
      success(res) {
        toast(JSON.stringify(res))
        wx.stopBluetoothDevicesDiscovery()
      },
      fail(res) {
        toast(JSON.stringify(res))
      },
    })
  },
  request() {
    wx.request({
      url: 'https://cn.bing.com/search',
      data: { q: 'abc', safe: 'off' },
      method: 'get',
      dataType: 'text',
      success(res) {
        toast(JSON.stringify(res))
      },
      fail(res) {
        toast(JSON.stringify(res))
      }
    })
  },
})
