/* 
  实现预加载
*/

import { getList } from '../const/subApps'
import { parseHtml } from './index'

export const prefetch = async () => {
  // 获取所有子应用列表，但不包括当前显示的子应用
  const list = getList().filter(item => !window.location.pathname.startsWith(item.activeRule))

  // 预加载剩下的所有子应用/
  await Promise.all(list.map(async item => await parseHtml(item.entry, item.name))) // 含有异步操作，需要使用async await
}