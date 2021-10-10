import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null // vue实例

const render = () => {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

if (!window.__MICRO_WEB__) { // 不在微前端的环境下
  render()
}

// 向外暴露生命周期钩子
export const bootstrap = () => {
  console.log('开始加载')
}

export const mount = () => {
  window.custom.on('test2', (data) => {
    console.log('vue2 data:', data)
  })
  window.custom.emit('test1', 111)
  render()
  console.log('渲染成功')
}

export const unmount = () => {
  console.log('卸载', instance)
}