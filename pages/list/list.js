var app = getApp()
Page({
  data: {
    locallist: [
      {
        PraiseNum:"3",
        cookbookcode:"C32909584",
        cookbookid:"37",
        cookbookname: "香蕉巧克力冷燕麦",
        coverpicpath:"../../image/list/list.jpg"
      },
      {
        PraiseNum: "3",
        cookbookcode: "C32909584",
        cookbookid: "37",
        cookbookname: "香蕉巧克力冷燕麦",
        coverpicpath: "../../image/list/list.jpg"
      },
      {
        PraiseNum: "3",
        cookbookcode: "C32909584",
        cookbookid: "37",
        cookbookname: "香蕉巧克力冷燕麦",
        coverpicpath: "../../image/list/list.jpg"
      },
    ],//模拟网络访问数据
    searchSongList: [], //放置返回数据的数组  
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },
  // 首次加载
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    that.fetchSearchList();
    that.setData({
      searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  

    });
  },
  // 搜索，访问网络  
  fetchSearchList: function () {
    let that = this;
    let searchPageNum = that.data.searchPageNum//把第几次加载次数作为参数 
    console.log(searchPageNum)
    let getdata = []; 
    if (searchPageNum !== 8){
       getdata = that.data.locallist;//模拟ajax拉取到的数据 发送至第7次止数组为空数组
    }
    
    if (getdata.length != 0) {
      let searchList = [];
      //拼接数组
      searchList = that.data.searchSongList.concat(getdata);
      that.setData({
        searchSongList: searchList, //获取数据数组  
        searchLoading: true   //把"上拉加载"的变量设为true，显示  
      });

    } else {
      that.setData({
        searchLoadingComplete: true, //把“没有数据”设为true，显示  
        searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
      });
    }
    wx.hideLoading()

    
    //访问网络  
    // wx.request({
    //   url: "url", //仅为示例，并非真实的接口地址
    //   data: {
    //     page: searchPageNum //请求页数
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   dataType: "json",
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data.data)
    //     if (res.data.data.length != 0) {
    //       let searchList = [];
    //       //拼接数组
    //       searchList = that.data.searchSongList.concat(res.data.data);
    //       that.setData({
    //         searchSongList: searchList, //获取数据数组  
    //         searchLoading: true   //把"上拉加载"的变量设为true，显示  
    //       });

    //     } else {
    //       that.setData({
    //         searchLoadingComplete: true, //把“没有数据”设为true，显示  
    //         searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
    //       });
    //     }
    //     wx.hideLoading()
    //   }
    // })
  },

  //滚动到底部触发事件  
  searchScrollLower: function () {
    console.log(22)
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        searchLoading: false
      });
      that.fetchSearchList();
    }
  }
})  