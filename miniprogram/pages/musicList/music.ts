import { $get, goToDetailPage } from "../../utils/util";

// pages/musicList/music.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
      musicList: null,
			id: '',
			detail: {}
    },
    goToDetailPage,
		getDetail () {
			$get(`/playlist/detail?id=${this.data.id}`).then((res: any) => {
				this.setData({
					detail: res.playlist
				})
			})
		},
		getList () {
			$get(`/playlist/track/all?id=${this.data.id}`).then((res: any) => {
				this.setData({
					musicList: res.songs
				})
			})
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
			this.setData({
				id: options.id
			});
			this.getList();
			this.getDetail();
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