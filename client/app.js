/*
 * @Author: xw
 * 应用的入口...
 * @Date:   2016-08-28 15:13:50
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-28 19:27:40
 */

(function (globle) {
  'use strict';
  const serverUrl = 'http://127.0.0.1:2080/api'

  // ===========辅助函数============

  function loadTemplate(id) {
    return document.getElementById(id + '_tmpl').innerHTML
  }
  const pad = (num, n) => (Array(n).join(0) + num).slice(-n)
  const convertDuration = duration => {
    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 60)
    return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
  }

  // ===========定义组件============
  /*
  根组件
   */
  var App = global.Vue.extend({})
  App.audio = new Audio()
    /*
    首页组件
     */
  var Home = global.Vue.extend({
    template: loadTemplate('home')
  })

  /*
  列表组件
   */
  var List = global.Vue.extend({
    template: loadTemplate('list'),
    data: function () {
      /*jsonp 取到api数据*/
      /*不需要写 callback参数,vue默认会处理*/
      this.$http.jsonp('http://localhost:2080/api/music').then(res => {
        console.log(res.data)
          /*this.list 为 this.data.list的简写形式*/
        this.list = res.data
      })
      return {
        list: []
      }
    },
    methods: {
      pad: pad,
      convertDuration: convertDuration
    }
  })

  /*
 播放器组件
   */
  const Player = global.Vue.extend({
    template: loadTemplate('item'),
    data: function () {
      return { item: {} }
    },
    /*通过route 对象，可以拿到具体的参数信息*/
    route: {
      data: function (transition) {
        const id = parseInt(transition.to.params.id, 10)
        if (!id) {
          return router.go({ name: 'list' })
        }
        this.$http.jsonp(`${serverUrl}/music/${id}`).then(res => {
            // console.log(res.ok)
            if (!res.ok) return router.go({ name: 'list' })
            this.item = { current: 0, playing: false, random: false }
            Object.assign(this.item, res.data)
            App.audio.src = this.item.music
            App.audio.autoplay = true
            App.audio.addEventListener('loadedmetadata', () => {
              this.item.duration = App.audio.duration
            })
            App.audio.addEventListener('timeupdate', () => {
              this.item.current = App.audio.currentTime
            })
            App.audio.addEventListener('play', () => {
              this.item.playing = true
            })
            App.audio.addEventListener('pause', () => {
              this.item.playing = false
            })
          })
          .catch(error => router.go({ name: 'list' }))
        return { item: {} }
      }
    },
    methods: {
      convert: convertDuration,
      play() {
        if (this.item.playing) {
          App.audio.pause()
        } else {
          App.audio.play()
        }
        this.item.playing = !this.item.playing
      },
      progress() {
        App.audio.currentTime = this.item.current
      },
      next() {
        this.$http.jsonp(`${serverUrl}/music`).then(res => {
          const ids = res.data.map(s => s.id)
          let targetIndex = ids.indexOf(this.item.id) + 1
          if (targetIndex >= ids.length) {
            targetIndex = 0
          }
          router.go({ name: 'item', params: { id: ids[targetIndex] } })
        })
      },
      prev() {
        this.$http.jsonp(`${serverUrl}/music`).then(res => {
          const ids = res.data.map(s => s.id)
          let targetIndex = ids.indexOf(this.item.id) - 1
          if (targetIndex < 0) {
            targetIndex = ids.length - 1
          }
          router.go({ name: 'item', params: { id: ids[targetIndex] } })
        })
      }
    }
  })

  // ===========路由器============
  /**
   * 创建路由器，配置路由规则
   * @type {global}
   */
  var router = new global.VueRouter()

  // 定义路由规则
  // 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
  // 创建的组件构造函数，也可以是一个组件选项对象。
  // 稍后我们会讲解嵌套路由
  router.map({
    '/home': {
      name: 'home',
      component: Home
    },
    '/list': {
      name: 'list',
      component: List
    },
    '/item/:id': {
      name: 'item',
      component: Player
    }
  })

  router.redirect({ '*': '/home' })

  // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
  router.start(App, '#app')
})(this)
