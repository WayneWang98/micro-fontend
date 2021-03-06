import { findAppByRoute } from '../utils'
import { getMainLifeCycle } from '../const/mainLifeCycle'
import { loadHtml } from '../loader'

export const lifeCycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)
  
  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)
  // console.log(prevApp, nextApp)
  if (!nextApp) {
    return
  }

  if (prevApp && prevApp.unmount) {
    // 销毁上一个子应用
    if (prevApp.proxy) { // 销毁子应用沙箱
      prevApp.proxy.inactive()
    }
    await destroyed(prevApp)
  }
  const app = await beforeLoad(nextApp) // 在beforeLoad执行完成之后，获取到新的app

  await mounted(app)
}

export const beforeLoad = async (app) => {
  // 先执行主应用的生命周期
  await runMainLifeCycle('beforeLoad')
  // 再执行子应用的生命周期
  app && app.beforeLoad && app.beforeLoad()

  const subApp = await loadHtml(app) // 获取子应用的内容
  subApp && subApp.beforeLoad && subApp.beforeLoad()
  return subApp
}

export const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })
  await runMainLifeCycle('mounted')
}

export const destroyed = async (app) => {
  app && app.unmount && app.unmount()
  // 对应的执行一下主应用的生命周期
  await runMainLifeCycle('destroyed')
}

export const runMainLifeCycle = async (type) => {
  const mainLife = getMainLifeCycle()

  // 主应用的生命周期中不仅有同步函数，还有异步函数，这里使用async/await来执行
  await Promise.all(mainLife[type].map(async item => await item()))
}