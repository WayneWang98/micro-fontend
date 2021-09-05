let list = []

// 获取子应用列表
export const getList = () => list

// 将外部传入的appList注入list变量中
export const setList = appList => {
  list = appList
}