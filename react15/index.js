import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx';
import "./index.scss"

const render = () => {
  ReactDOM.render((
    <BasicMap />
  ), document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) { // 没有在微前端的环境中
  render()
}

// 向外暴露生命周期钩子
export const bootstrap = () => {
  console.log('bootstrap')
}

export const mount = () => {
  render()
  console.log('mount')
}

export const unmount = () => {
  console.log('unmount', instance)
}