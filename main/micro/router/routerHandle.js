import { isTurnChild } from '../utils'

export const turnApp = () => {
  if (isTurnChild()) {
    console.log('路由切换了')
  }
}