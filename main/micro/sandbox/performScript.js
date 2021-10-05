/* 
  执行js脚本
*/

// new Functin 执行
export const performScriptForFunction = (script, appName, global) => {
  window.proxy = global
  const scriptText = `
    return ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  return new Function(scriptText)()
}

// eval 执行
export const performScriptForEval = (script, appName, global) => {
  window.proxy = global
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  return eval(scriptText)
}