import { fectchResource } from '../utils/fetchResource'
import { performScriptForEval } from '../sandbox/performScript'

/*
  加载HTML的方法
*/

export const loadHtml = async (app) => {
  // 子应用需要显示在哪里
  let container = app.container // #id 内容
  // 子应用的入口
  let entry = app.entry
  const [dom, scripts] = await parseHtml(entry)
  const ct = document.querySelector(container)
  if (!ct) {
    throw new Error('容器不存在，请查看')
  }
  ct.innerHTML = dom

  // 执行每一个js脚本
  scripts.forEach(item => {
    performScriptForEval(item)
  })
  return app
}

export const parseHtml = async (entry) => {
  const html = await fectchResource(entry) // 获取子应用的所有文本
  
  let allScript = []
  const div = document.createElement('div') // 创建唯一的根元素，供后续解析
  div.innerHTML = html

  // 标签、link、script

  const [dom, scriptUrl, script] = await getResources(div, entry)
  const fetchedScripts = await Promise.all(scriptUrl.map(async item => await fectchResource(item))) // 获取js资源
  allScript = script.concat(fetchedScripts)
  return [dom, allScript]
}

export const getResources = async (root, entry) => {
  const scriptUrl = []
  const script = []
  const dom = root.outerHTML // innerHTML不包含标签本身，而outerHTML包含标签本身

  // 深度解析
  function deepParse (element) {
    const children = element.children
    const parent = element.parent

    // 处理位于script中的内容
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      if (!src) { // 说明是直接在script标签中书写的内容，如： <script>console.log(123)</script>
        script.push(element.outerHTML)
      } else {
        if (src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          scriptUrl.push(`http:${entry}/${src}`) // 补充为完整的url
        }
      }

      if (parent) {
        parent.replaceChild(document.createComment('此js文件已经被微前端替换'), element)
      }
    }

    // 处理link标签中js中的内容
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
      if (href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrl.push(href)
        } else {
          scriptUrl.push(`http:${entry}/${href}`) // 补充为完整的url
        }
      }
    }

    for (let i = 0; i < children.length; i ++) {
      deepParse(children[i])
    }
  }

  deepParse(root)

  return [dom, scriptUrl, script]
}