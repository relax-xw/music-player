/*
 * @Author: xw
 * @Date:   2016-08-27 20:15:07
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-27 22:22:57
 */

'use strict';

const express = require('express')
const router = module.exports = express.Router()
router.prefix = '/'
  /**
   * GET /
   */
router.get('/', (req, res) => {
  res.redirect('/music/list')
})
