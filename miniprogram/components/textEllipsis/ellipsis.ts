// components/textEllipsis/ellipsis.ts
Component({
    /**
     * 组件的属性列表
     */
    options: {
      multipleSlots: true,
      styleIsolation: 'shared'
    },
    properties: {
      lineClamp: {
        type: Number,
        value: 2
      },
    },

    /**
     * 组件的初始数据
     */
    data: {
      showAll: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
      toggleSlide () {
        this.setData({
          showAll: !this.data.showAll
        })
      }
    }
})
