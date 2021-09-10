/* 
  执行js脚本
*/

// new Functin 执行
export const performScriptForFunction = (script, appName) => {  
  const scriptText = `
    ${script}
    return window['${appName}']
  `
  return new Function(scriptText).call(window, window) // 通过这种方式执行js时，需要指定执行的环境
}

// eval 执行
export const performScriptForEval = (script, appName) => {
  const scriptText = `
    () => {
      ${script}
      return window['${appName}']
    }
  `
  return eval(scriptText).call(window, window)
}