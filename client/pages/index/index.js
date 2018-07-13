var wemark = require('wemark/wemark');
var WxSearch = require('../../wxSearch/wxSearch.js')

const app = getApp()


var md = '# hello, world';

Page({
  data: {
    query: null,
  },
  onLoad: function() {
    var that = this
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43, ['python flask', 'python django', 'python scrapy', 'python requests']);
    WxSearch.initMindKeys(['python flask', 'python django', 'python scrapy', 'python requests']);
  },
  onReady: function() {
    wemark.parse(md, this, {
      name: 'wemark'
    })
  },
  inputQuery: function(e) {
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
        query:that.data.wxSearchData.value
      },
      success: function(res) {
        console.log(res.data)
        var md = res.data.result
        wemark.parse(md, that, {
          name: 'wemark'
        })
      }
    })
  },
  wxSearchFn: function(e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    this.query()

  },
  wxSearchInput: function(e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function(e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function(e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function(e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function(e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function(e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})