/*
 * @Author: xw
 * @Date:   2016-08-27 15:12:54
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-27 22:40:30
 */

'use strict';

const express = require('express')
const Music = require('../models/music')
const router = module.exports = express.Router()
router.prefix = '/api'

/*
GET /api/music
 */

router.get('/music', (req, res) => {
  console.log(111)
  const list = Music.find()
  res.jsonp(list.map(item => {
    const temp = {}
    Object.assign(temp, item)
      // 属性的真实地址
    temp.music = req.app.get('url') + '/uploads/' + temp.music
    temp.poster = req.app.get('url') + '/uploads/' + temp.poster
    temp.lyric = req.app.get('url') + '/uploads/' + temp.lyric

    return temp
  }))
})

/*
GET /api/music/id
 */

router.get('/music/:id', (req, res) => {
  const id = parseInt(req.params.id | 0)
  if (!id) {
    return res.status(404).send('没有该记录')
  }
  const item = Music.findOne(id)
  if (!item) {
    return res.status(404).send('没有该记录')
  }

  /*此时，该请求合法*/
  const temp = {}
  Object.assign(temp, item)
    // 属性的真实地址
  temp.music = req.app.get('url') + '/uploads/' + temp.music
  temp.poster = req.app.get('url') + '/uploads/' + temp.poster
  temp.lyric = req.app.get('url') + '/uploads/' + temp.lyric

  return res.jsonp(temp)

})
