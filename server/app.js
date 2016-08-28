/*
 * @Author: xw
 * @Date:   2016-08-27 14:53:19
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-27 22:32:00
 */

'use strict';
/*
业务入口
 */
const path = require('path');
const glob = require('glob');
const express = require('express')
const bodyParser = require('body-parser');

const app = module.exports = express()

// ====设置静态资源位置（可以直接被访问到）====
app.use(express.static(path.join(__dirname, 'www')))

// ====设置模板引擎====
// 位置、类型
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'xtpl')
  // parse application/x-www-form-urlencoded  (form 表单)
app.use(bodyParser.urlencoded({ extended: false }))

// ====载入所有控制器，glob模块同步处理====

const controllers = glob.sync('./controllers/**/*.js', { cwd: __dirname })

controllers.forEach(c => {
  // c :  ./controllers/abc.js

  const controller = require(c);
  // 如果没有导出，默认为 {}
  // 导出的为路由模块，将路由挂在至应用  http://www.expressjs.com.cn/guide/using-middleware.html

  controller.prefix && app.use(controller.prefix, controller)
})

// 该模块没有被载入的情况下，module.parent为 NULL，没被载入时设置监听
if (!module.parent) {
  const server = app.listen(process.env.PORT || 2080, (error) => {
    if (error) throw error
    const address = server.address()
    app.set('url', `127.0.0.1:${address.port}`)
    console.log('server is ready @http://127.0.0.1:' + address.port)
  })
}
