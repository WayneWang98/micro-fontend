import { fectchResource } from '../utils/fetchResource'

/*
  加载HTML的方法
*/

export const loadHtml = async (app) => {
  // 子应用需要显示在哪里
  let container = app.container // #id 内容
  // 子应用的入口
  let entry = app.entry
  const html = await parseHtml(entry)
  const ct = document.querySelector(container)
  if (!ct) {
    throw new Error('容器不存在，请查看')
  }
  ct.innerHTML = html
  return app
}

export const parseHtml = async (entry) => {
  const html = await fectchResource(entry)
  
  const div = document.createElement('div') // 创建唯一的根元素，供后续解析
  div.innerHTML = html

  // 标签、link、script

  const [dom, scriptUrl, script] = await parseJS()
  console.log(dom, scriptUrl, script)
  return html
}

export const parseJS = async () => {
  return ['', '', '']
}