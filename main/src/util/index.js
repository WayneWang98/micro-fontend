import { registerMicroApps, start, createStore } from '../../micro'
import { loading } from '../store'

const store = createStore()
window.store = store
const storeData = store.getStore()
store.subscribe((newValue, oldValue) => {
  console.log('newValue -- oldValue', newValue, oldValue)
})
store.update({
  ...storeData,
  a: 1
})

export const registerApp = (list) => {
  // 注册到微前端框架中
  registerMicroApps(list, { // 主应用的生命周期
    beforeLoad: [
      () => {
        console.log('开始加载')
      }
    ],
    mounted: [
      () => {
        loading.changeLoading(false)
        console.log('渲染完成')
      }
    ],
    destroyed: [
      () => {
        console.log('卸载完成')
      }
    ]
  })

  start()
}