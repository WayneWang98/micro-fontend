import { setList } from './const/subApps'
import { rewriteRouter } from './router/rewriteRouter'

// 实现路由拦截
rewriteRouter()

// 注册子应用
export const registerMicroApps = (appList) => {
  setList(appList)
}