var wemark = require('wemark/wemark');
const app = getApp()

var md = '# hello, world';

Page({
  data: {
    query: null,
  },
  onLoad: function() {},
  onReady: function() {
    wemark.parse(md, this, {
      name: 'wemark'
    })
  },
  inputQuery: function (e) {
    this.setData({
      query: e.detail.value
    })
  },
  query: function() {
    console.log(this.data.query)
    var that = this
    wx.request({
      url: 'https://www.linsl2018.top:5023/hello',
      data: {
        query:this.data.query
      },
      success: function (res) {
        console.log(res.data)
        var md = res.data.result
        wemark.parse(md, that, {
          name: 'wemark'
        })
      }
    })
  }
})