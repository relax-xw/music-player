/*
 * @Author: xw
 * @Date:   2016-08-27 14:51:11
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-27 22:14:11
 */

'use strict';
/*
分发
 */
const app = require('./server/app')

// 监听设置
const server = app.listen(process.env.PORT || 2080, (error) => {
  if (error) throw error
  const address = server.address()
  app.set('url', `127.0.0.1:${address.port}`)
  console.log('server is ready @http://127.0.0.1:' + address.port)
})
