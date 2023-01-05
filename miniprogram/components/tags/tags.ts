// components/tags/tags.ts
Component({
    /**
     * 组件的属性列表
     */
		options: {
			styleIsolation: 'shared' // 让父组件样式可以渗透子组件 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
		},
    properties: {
      list: {
				type: Array,
				default: []
			}
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
		
		ready () {

		},
    /**
     * 组件的方法列表
     */
    methods: {
			goToSheetList (e: any) {
				wx.navigateTo({
					url: `/pages/list/list?tag=${e.currentTarget.dataset.item}`
				})
			},
    }
})
