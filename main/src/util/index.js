import { registerMicroApps, start } from '../../micro'
import { loading } from '../store'

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