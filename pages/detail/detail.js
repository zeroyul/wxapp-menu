var app = getApp()
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localdetail: {
      browsenum: "217",
      chefrecomm: "香蕉淡淡的奶油口感点缀着巧克力的香浓丝滑，还原最真实的味蕾体验，甜，从舌尖蔓延到心田",
      collocationdetail: '<p><img src="../../image/detail/list.jpg" title="1513151260480347.jpg" alt="5934facd78dbc.jpg"/></p>',
      cookbookcode: "C32909584",
      cookbookid: "37",
      cookbookname: "香蕉巧克力冷燕麦",
      coverpicpath: "../../image/detail/list.jpg",
      materialpic: "../../image/detail/list.jpg",
      praisenum: "3",
      steps: [{
        stepdesc: "将❶号料包（即食燕麦、好时巧克力等）和❷号料包（蜂蜜）打开，倒入梅森瓶中",
        steporder: "1",
        steppicpath: "../../image/detail/list.jpg"
      }, {
        stepdesc: "将❶号料包（即食燕麦、好时巧克力等）和❷号料包（蜂蜜）打开，倒入梅森瓶中",
        steporder: "2",
        steppicpath: "../../image/detail/list.jpg"
      }, {
        stepdesc: "将❶号料包（即食燕麦、好时巧克力等）和❷号料包（蜂蜜）打开，倒入梅森瓶中",
        steporder: "3",
        steppicpath: "../../image/detail/list.jpg"
      }],
      videocover: "",
      videourl: ""
    },
    menudetail: {},//订单详情
    networkflag: false,//是否是wifi
    dianzannum: '',//点赞数
    hasdianzan: false//是否点赞
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.cookbookcode)
    let cbcode = options.cookbookcode;
    let that = this;

    that.setData({
      menudetail: that.data.localdetail,
      dianzannum: that.data.localdetail.praisenum
    })
    let article = that.data.localdetail.collocationdetail;
    WxParse.wxParse('article', 'html', article, that, 0);

    // //网络请求
    // wx.request({
    //   url: 'url', //仅为示例，并非真实的接口地址

    //   data: {
    //     CbCode: cbcode

    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   dataType: "json",
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       menudetail:res.data,
    //       dianzannum: res.data.praisenum
    //     })
    //     let article = res.data.collocationdetail;
    //     WxParse.wxParse('article', 'html', article, that, 0);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        //console.log(networkType)
        if (networkType === "wifi") {
          that.setData({
            networkflag: true
          })
        }
      }
    })
  },
  thumup: function () {
    //console.log(this.data.dianzannum)
    var dianzannum = Number(this.data.dianzannum) + 1;
    this.setData({
      hasdianzan: true,
      dianzannum: dianzannum
    })
    //ajax 发送给后台
    let cookbookid = this.data.menudetail.cookbookid
    
    // wx.request({
    //   url: 'url', //仅为示例
    //   data: {
    //     ObjID: cookbookid
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   dataType: "json",
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data);
    //   }
    // })
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let cookbookcode = this.data.menudetail.cookbookcode
    return {
      title: '欢迎品鉴',
      path: '/pages/detail/detail?cookbookcode=' + cookbookcode,
      imageUrl: this.data.menudetail.coverpicpath,
      success: function (res) {
        // 转发成功.
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})