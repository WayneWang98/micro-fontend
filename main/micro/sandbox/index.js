/* 
  子应用生命周期处理，环境变量设置
*/

import { performScriptForEval } from './performScript'

const isCheckLifeCycle = (lifecycle) => {
  return lifecycle
    && lifecycle.bootstrap
    && lifecycle.mount
    && lifecycle.unmount
}

export const sandBox = (app, script) => {
  // 1.设置环境变量
  window.__MICRO_WEB__ = true
  // 2.运行js文件
  const lifecycle = performScriptForEval(script, app.name)

  console.log(lifecycle)
  // 生命周期，挂载到app上
  if (isCheckLifeCycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}