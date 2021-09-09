import { isTurnChild } from '../utils'
import { lifeCycle } from '../lifeCycle'

export const turnApp = () => {
  if (isTurnChild()) {
    // 微前端的生命周期执行
    lifeCycle()
    // console.log('路由切换了')
  }
}