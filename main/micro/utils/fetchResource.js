// 处理http请求
export const fectchResource = (url) => {
  return fetch(url).then(async res => {
    return await res.text()
  })
}