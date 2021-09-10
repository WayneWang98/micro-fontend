import { setList, getList } from './const/subApps'
import { currentApp } from './utils'
import { rewriteRouter } from './router/rewriteRouter'
import { setMainLifeCycle } from './const/mainLifeCycle'

// 实现路由拦截
rewriteRouter()

// 注册子应用
export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList)
  setMainLifeCycle(lifeCycle)
}

// 启动微前端框架
export const start = () => {
  // 首先验证当前子应用列表是否为空
  const apps = getList()

  if (!apps.length) {
    throw Error('子应用列表为空，请正确注册')
  }

  // 有子应用的内容，查找到符合当前路由的子应用
  const app = currentApp()
  console.log('app', app)

  if (app) {
    const { pathname, hash } = window.location
    const url = pathname + hash
    window.history.pushState('', '', url)
  }

  window.__CURRENT_SUB_APP__ = app.activeRule
}