var app = getApp()
Page({
  data:{
    userInfo: {},
    hasUserInfo:false
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  openmap:function(){
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     console.log(res)
    //   }
    // })


    


    wx.openLocation({
      latitude: Number(39.948930),
      longitude: Number(116.477630),
      scale:28,
      name: '轻厨',
      address: '体验店'
    })
  }
  

  
})  