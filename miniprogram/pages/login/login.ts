// pages/login/login.ts
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      avatarUrl: defaultAvatarUrl,
      theme: wx.getSystemInfoSync().theme,
      count: getApp().globalData.count
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      this.setData({
        avatarUrl
      })
    },
    addGlobalCount () {
      getApp().globalData.count += 1;
      // console.log(app.globalData)
    },
    submitInfo () {
      console.log(this.data.avatarUrl)
      wx.navigateTo({
        url: '../index/index'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      wx.onThemeChange((result) => {
        this.setData({
          theme: result.theme
        })
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})