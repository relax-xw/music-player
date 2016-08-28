/*
 * @Author: xw
 * @Date:   2016-08-27 20:20:44
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-27 23:03:41
 */

'use strict';

const express = require('express')
const path = require('path')
const formidable = require('formidable')
const router = module.exports = express.Router()
const Music = require('../models/music')
router.prefix = '/music'

/*
GET /music/list
 */
router.get('/list', (req, res) => {
  res.locals.title = '音乐列表'
  res.locals.list = Music.find()
    /*渲染指定视图*/
  res.render('music/list')
})

/*
GET /music/add
 */
router.get('/add', (req, res) => {
  res.locals.title = '添加新音乐'
  res.render('music/add')
})

/*
POST /music/add
 */

router.post('/add', (req, res) => {

  const form = new formidable.IncomingForm()
  form.uploadeDir = path.join(__dirname, '../www/uploades')
  form.keepExtends = true
  form.parse(req, (error, fileds, files) => {
    if (error) throw error
      // 正常情况
    let id
    Music.find().forEach(item => {
      if (item.id > id) id = item.id
    })
    const music = new Music(
      id + 1,
      fileds.name,
      fileds.artist,
      fileds.duration,
      fileds.name,
      path.basename(files.music.path),
      path.basename(files.poster.path),
      path.basename(files.lyric.path)
    )
    music.save()
    res.redirect('/music/list')
  })
})

/**
 * GET /music/edit/:id
 */
router.get('/edit/:id', (req, res) => {
  res.locals.title = '编辑'
    // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
  const temp = Music.findOne(id)
  if (!temp) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  res.locals.item = temp
  res.render('music/edit')
})

/**
 * POST /music/edit/:id
 */
router.post('/edit/:id', (req, res) => {
  res.locals.title = '编辑'
    // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
  const temp = Music.findOne(id)
  if (!temp) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  temp.name = req.body.name
  temp.artist = req.body.artist
  if (!temp.update()) {
    res.locals.item = temp
    res.render('music/edit')
  }
  res.redirect('/music/list')
})

/**
 * GET /music/delete/:id
 */
router.get('/delete/:id', (req, res) => {
  // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
  const temp = Music.findOne(id)
  if (!temp) {
    // 不存在这个数据
    return res.status(404).send('没有该记录2')
  }
  // 数据存在，需要删除
  temp.delete()
  res.redirect('/music/list')
})
