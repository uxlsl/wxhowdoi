//index.js
var wemark = require('wemark/wemark');
var md = '# hello, world\n\nI love you, wemark! \n\n## second';
//获取应用实例
const app = getApp()

Page({
  data: {
    msg: null,
  },
  onLoad: function (){
    var that = this
    wx.request({
      url: 'https://www.linsl2018.top:5023/hello', 
      success: function (res) {
        console.log(res.data)
        that.setData({
          msg: res.data.result
        })
      }
    })
  },
  onReady: function () {
    wemark.parse(md, this, {
      name: 'wemark'
    })
  }
  })
