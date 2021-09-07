import { getList } from "../const/subApps"

// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
  return function () { // 利用闭包对event做了一次拦截处理
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}

export const currentApp = () => {
  const currentUrl = window.location.pathname

  return filterApp('activeRule', currentUrl)
}

const filterApp = (key, value) => {
  const currentApp = getList().filter(item => item[key] === value)
  // console.log(currentApp)
  return currentApp && currentApp.length ? currentApp[0]: {}
}

// 子应用是否做了切换
export const isTurnChild = () => {
  if (window.__CURRENT_SUB_APP__ === window.location.pathname) return false
  return true
}