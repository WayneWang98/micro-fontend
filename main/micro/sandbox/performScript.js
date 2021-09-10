/* 
  执行js脚本
*/

// new Functin 执行
export const performScriptForFunction = (script) => {  
  new Function(script).call(window, window)
}

// eval 执行
export const performScriptForEval = (script) => {
  eval(script)
}