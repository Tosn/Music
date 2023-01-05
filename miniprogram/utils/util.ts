import { API_PREFIX } from './constant';
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const goToDetailPage = (e: any) => {
  const id = e.currentTarget.dataset.id
  wx.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}


export const request = (url: string, data?: Record<string, any>, method='POST', options?: any) => new Promise((resolve, reject) => {
  wx.request({
    url: `${API_PREFIX}${url}`,
    data,
    method,
    ...options,
    success: function (ret) {
      resolve(ret.data)
    },
    fail: function (err) {
      reject(err)
    },
    complete: function () {}
  })
});

export const $post = (url: string, data?: Record<string, any>, options?: any) => request(url, data, 'POST', options);
export const $get = (url: string, data?: Record<string, any>, options?: any) => request(url, data, 'GET', options);