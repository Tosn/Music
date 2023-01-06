import { $get } from "../../utils/util"
interface InitData {
  [propName: string]: any,
  lrcList: any[]
}
interface InitMethods {
  [propName: string]: any
}
// pages/detail/detail.ts
Page<InitData, InitMethods>({

    /**
     * 页面的初始数据
     */
    data: {
      lrcIndex: 0, // 歌词当前第几个索引
      playTime: 0,
      totalTime: 0,
      id: '',
      musicDetail: {
        name: '',
        ar: {
          name: ''
        },
        al: {
          picUrl: ''
        }
      },
      musicInfo: {
        url: ''
      },
      musicWords: {},
      // lrc: "[00:24.32]光る汗Tシャツ出会った恋\n[00:29.62]誰よりも輝く君を見て\n[00:35.07]初めての気持ちを見つけたよ\n[00:40.53]新たな旅が始まる\n[00:45.80]雨上がり気まぐれ蒼い風\n[00:51.25]強い日差し\n[00:53.00]いつか追い越して\n[00:56.61]これから描いて行く恋の色\n[01:02.09]始まりのページ彩るよ\n[01:07.39]占い雑誌ふたつの星に\n[01:12.65]二人の未来を重ねてみるの\n[01:18.11]かさぶただらけ とれない心\n[01:23.58]あなたの優しさでふさがる\n[01:31.19]いつの間にか すきま空いた\n[01:33.91]心が満たされて行く\n[01:37.04]ふとした瞬間の\n[01:39.70]さり気ない仕草\n[01:42.00]いつの日にか夢を語る\n[01:44.58]あなたの顔をずっと\n[01:47.70]見つめていたい微笑んでいたい\n[01:53.75]\n[02:04.04]大切な何かを守るとき\n[02:09.68]踏み出せる一歩が勇気なら\n[02:15.00]傷つくことから逃げ出して\n[02:20.24]いつもただ遠回りばかり\n[02:25.77]行き場なくした強がりのクセが\n[02:31.27]心の中で戸惑っているよ\n[02:36.26]初めて知ったあなたの想いに\n[02:42.00]言葉より涙あふれてくる\n[02:46.60]少し幅の違う足で\n[02:49.38]一歩ずつ歩こうね\n[02:52.56]二人で歩む道\n[02:55.21]でこぼこの道\n[02:57.53]二つ折りの白い地図に\n[03:00.15]記す小さな決意を正直に今伝えよう\n[03:09.19]\n[03:20.20]耳元で聞こえる\n[03:22.24]二人のメロディー\n[03:25.63]溢れ出す涙こらえて\n[03:31.06]ありきたりの言葉\n[03:33.00]あなたに言うよ\n[03:36.00]これからもずっと一緒だよね\n[03:40.60]抑えきれない この気持ちが\n[03:43.38]25時の空から\n[03:46.58]光る滴として 降り注いだ\n[03:51.39]気がついたら心の中\n[03:54.01]やさしい風が吹いて\n[03:57.23]明日への扉そっと開く\n[04:02.09]言葉が今時を越えて\n[04:05.00]永遠を突き抜ける\n[04:08.05]幾つもの季節を通り過ぎて\n[04:13.00]たどり着いた 二人の場所\n[04:15.89]長すぎた旅のあと\n[04:19.00]誓った愛を育てよう\n[04:24.13]\n",
      lrcList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        id: options.id
      })
      this.initPage()
      // this.data.lrcList = this.parseLrc(this.data.lrc)
      // console.log(this.data.lrcList)
    },
    parseLrc (lrc: string) {
      // { time: 2, desc: text }
      const ret: any[] = []
      const lrcList = lrc.split('\n')
      lrcList.forEach(l => {
        const item = l.split(']') // [00:24.32]光る汗Tシャツ出会った恋
        const words = item[item.length - 1].trim()
        const timeArray = item[0].substring(1, 8).split(':')
        if (timeArray && timeArray.length && words) {
          ret.push({
            time: Math.round(Number(timeArray[0]) * 60 + Number(timeArray[1]) * 1),
            desc: words
          })
        }
      })
      return ret
    },
    async getMusicInfo () {
      const ret = await $get(`/song/url/v1?id=${this.data.id}&level=exhigh`).then((res: any) => res.data[0])
      this.setData({
        musicInfo: ret
      })
    },
   async getMusicWords () {
      const ret = await $get(`/lyric?id=${this.data.id}`).then((res: any) => res.lrc.lyric)
      this.setData({
        musicWords: ret
      })
      this.setData({
        lrcList: this.parseLrc(ret)
      })
      // this.data.lrcList = this.parseLrc(ret)
    },
    async getMusicDetail () {
      const ret = await $get(`/song/detail?ids=${this.data.id}`).then((res: any) => res.songs[0])
      this.setData({
        musicDetail: ret
      })
    },
    setBackgroundAudioManager () {
      const backgroundAndioManager = wx.getBackgroundAudioManager()
      backgroundAndioManager.title = this.data.musicDetail.name
      backgroundAndioManager.epname = this.data.musicDetail.name
      backgroundAndioManager.singer = this.data.musicDetail.ar.name
      backgroundAndioManager.coverImgUrl = this.data.musicDetail.al.picUrl
      // 设置了 src 之后会自动播放
      backgroundAndioManager.src = this.data.musicInfo.url
      setInterval(() => this.listenerAudioPlay(), 1000)
    },
    setPlayTime (e: any) {
      // e.detail.value
      const backgroundAndioManager = wx.getBackgroundAudioManager()
      backgroundAndioManager.seek(e.detail.value)
      this.listenerAudioPlay()
      this.setData({
        playTime: e.detail.value
      })
    },
    listenerAudioPlay () {
      const backgroundAndioManager = wx.getBackgroundAudioManager()
      const currentTime = Math.round(backgroundAndioManager.currentTime); // 当前播放的时间
      this.setData({
        playTime: currentTime
      })
      this.setData({
          totalTime: Math.floor(backgroundAndioManager.duration)
        })
      for (let i = 0; i < this.data.lrcList.length; i++) {
        if (currentTime === this.data.lrcList[i].time) {
          this.setData({
            lrcIndex: i
          })
        }
      }
      // backgroundAndioManager.onPlay(back => {
      //   console.log(back)
      // })
    },
    async initPage () {
      await this.getMusicDetail();
      await this.getMusicInfo();
      await this.getMusicWords()
      this.setBackgroundAudioManager()
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