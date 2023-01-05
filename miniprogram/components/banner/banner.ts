// components/banner/banner.ts
import { $get } from "../../utils/util";
interface InitData {
	bannerList: any[]
}
interface InitProperty {
	[propName: string]: any
}
interface InitMethod {
	[propName: string]: any
}
Component<InitData, InitProperty, InitMethod>({
    /**
     * 组件的属性列表
     */
    properties: {
			type: {
				type: Number,
				value: 2
			}
    },

    /**
     * 组件的初始数据
     */
    data: {
			bannerList: []
    },
		ready: function () {
			this.getBannerList()
		},
    /**
     * 组件的方法列表
     */
    methods: {
			async getBannerList () {
				const ret = <{banners: any[]}>await $get(`/banner?type=${this.properties.type}`)
				this.setData({
					bannerList: ret.banners
				})
			},
			onTapItem (e: any) {
				const targetId = e.currentTarget.dataset.item.targetId
				$get(`/song/url/v1?id=${targetId}&level=exhigh`)
			}
    }
})
