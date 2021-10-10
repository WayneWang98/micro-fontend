/* 
  全局状态store
*/

export const createStore = (initData = {}) => (() => { // 利用闭包缓存initData
  let store = initData
  const observers = [] // 管理所有的订阅者

  // 获取store
  const getStore = () => store

  // 更新store
  const update = (value) => {
    if (value !== store) {
      // 执行store的操作
      const oldValue = store
      store = value
      // 通知所有的订阅者，去监听store的变化
      observers.forEach(async item => {
        await item(store, oldValue)
      })
    }
  }

  // 添加订阅者
  const subscribe = (fn) => {
    observers.push(fn)
  }

  return {
    getStore,
    update,
    subscribe
  }
})()