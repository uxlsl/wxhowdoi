var WxSearch = require('../../wxSearch/wxSearch.js')

const app = getApp()

var md = `*人生苦短，我用Python*`

Page({
  data: {
    md:md
  },
  onLoad: function() {
    var that = this
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43, ['python flask', 'python django', 'python scrapy', 'python requests']);
    WxSearch.initMindKeys(['python flask', 'python django', 'python scrapy', 'python requests']);
  },
  onReady: function() {
    this.data.wxSearchData.value = 'print stack trace python'
    this.query()
  },
  query: function() {
    var that = this
    wx.request({
      url: 'https://www.linsl2018.top:5023/hello',
      data: {
        query:that.data.wxSearchData.value
      },
      success: function(res) {
        console.log(res.data)
        that.setData({'md': res.data.result})
      }
    })
  },
  copy: function(){
    console.log("copy")
    var that = this
    wx.setClipboardData({
      data: that.data.md,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  wxSearchFn: function(e) {
    console.log('wxSearchFn')
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    this.query()

  },
  wxSearchInput: function(e) {
    console.log('wxSearchInput')
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function(e) {
    console.log('wxSearchFocus')
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function(e) {
 //   console.log('wxSearchBlur')
 //   var that = this
 //   WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function(e) {
    console.log('wxSearchKeyTap')
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function(e) {
    console.log('wxSearchDeleteKey')
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function(e) {
    console.log('wxSearchDeleteAll')
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    console.log('wxSearchTap')
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})