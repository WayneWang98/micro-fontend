import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let instance = null // vue实例

const render = () => {
  instance = createApp(App)
  instance.use(router).mount('#app')
}

if (!window.__MICRO_WEB__) {
  render() // 不在微前端的环境下，直接render即可
}


// 向外暴露生命周期钩子
export const bootstrap = () => {
  console.log('bootstrap')
}

export const mount = () => {
  render()
  console.log('mount')
}

export const unmount = () => {
  console.log('unmount', instance)
}