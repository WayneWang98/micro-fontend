import * as appInfo from '../store'

// 子应用信息
export const subNavList = [
  {
    name: 'react15', // 唯一标识
    activeRule: '/react15', // 激活路由
    container: '#micro-container', // 子应用的挂载容器
    entry: '//localhost:9002', // 子应用的入口
    appInfo
  },
  {
    name: 'react16',
    activeRule: '/react16',
    container: '#micro-container',
    entry: '//localhost:9003',
    appInfo
  },
  {
    name: 'vue2',
    activeRule: '/vue2',
    container: '#micro-container',
    entry: '//localhost:9004',
    appInfo
  },
  {
    name: 'vue3',
    activeRule: '/vue3',
    container: '#micro-container',
    entry: '//localhost:9005',
    appInfo
  }
]
