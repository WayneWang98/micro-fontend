var express = require('express')
const fs = require('fs')
var router = express.Router()
const path = require('path')
const childProcess = require('child_process')

const versionDir = path.join(__dirname, '../version')
const initVersion = '1.0.0.0'

/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.query.name
  // 确认要更新的版本号，每一个应用独立一个文件来管理版本

  // 创建一个文件，默认的版本号

  // 创建一个当前应用的路径
  const currentUrl = path.join(versionDir, name)
  let newVersion = ''
  try {
    const originVersion = fs.readFileSync(currentUrl).toString().replace(/\n/g, '') // 将buffer转换为toString
    newVersion = originVersion.replace(/\.(\d+)$/, (a, b) => {
      return `.${+b + 1}`
    })
    fs.writeFileSync(currentUrl, newVersion)
  } catch (e) {
    fs.writeFileSync(currentUrl, initVersion)
  }

  // 构建 打包 发布子应用
  const originPath = path.join(__dirname, '../../../', name)
  const originDist = path.join(originPath, 'dist') // 打包后的产物的地址
  const bagPath = path.join(__dirname, '../bag')

  // 通过运行打包命令来生成打包后的产物
  try {
    childProcess.execSync(`cd ${originPath} && npm i && npm run build`)
    childProcess.execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`) // only work on Linux
    const lastDist = path.join(bagPath, `./${name}/${newVersion}`)
    childProcess.execSync(`mv ${originDist}/* ${lastDist}`)
  } catch (error) {
    
  }
  
  res.send({
    version: newVersion
  })
})


module.exports = router;
