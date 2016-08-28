/*
 * @Author: xw
 * @Date:   2016-08-27 15:51:29
 * @Last Modified by:   xw
 * @Last Modified time: 2016-08-28 19:38:47
 */

'use strict';

/*
音乐模型
ES6 class
 */
class Music {
  /*构造方法*/
  constructor(id, name, artist, duration, music, poster, lyric) {
    this.id = id
    this.name = name
    this.artist = artist
    this.duration = duration
    this.music = music
    this.poster = poster
    this.lyric = lyric
  }
  static find() {
      return storage
    }
    // static findOne(id) {
    //     return storage.find((s) => {
    //      return s.id === id
    //     })
    //   }
  static findOne(id) {
    return storage.find(s => s.id === id)
  }

  save() {
    storage.indexOf(this) === -1 && storage.push(this)
    return true
  }
  delete() {
    return storage.splice(storage.indexOf(this), 1)
  }
  update() {
    return true
  }

}
const storage = [
  new Music(1, 'Knockin\' On Heaven\'s Door', 'Guns N\' Roses', 342, 'Guns N\' Roses - Knockin\' On Heaven\'s Door.mp3', 'Guns N\' Roses.jpg', 'Guns N\' Roses - Knockin\' On Heaven\'s Door.lrc'),
  new Music(2, 'I Will Be Your Shelter', 'Rebecca Blaylock', 342, 'Rebecca Blaylock - I Will Be Your Shelter.mp3', 'Rebecca Blaylock.jpg', 'Rebecca Blaylock - I Will Be Your Shelter.lrc'),
  new Music(3, '我恨我痴心', '刘德华', 342, '刘德华 - 我恨我痴心.mp3', '刘德华.jpg', '刘德华 - 我恨我痴心.lrc'),
  new Music(4, '不说再见', '好妹妹乐队', 342, '好妹妹乐队 - 不说再见.mp3', '好妹妹乐队.jpg', '好妹妹乐队 - 不说再见.lrc'),
  new Music(5, '青城山下白素贞', '好妹妹乐队', 342, '好妹妹乐队 - 青城山下白素贞.mp3', '好妹妹乐队.jpg', '好妹妹乐队 - 青城山下白素贞.lrc'),
  new Music(6, '送情郎(2010.12.11 德云二队张一元晚场)', '岳云鹏', 342, '岳云鹏 - 送情郎(2010.12.11 德云二队张一元晚场).mp3', '岳云鹏.jpg', '岳云鹏 - 送情郎(2010.12.11 德云二队张一元晚场).lrc'),
  new Music(7, '往事只能回味', '岳云鹏,宋小宝', 342, '岳云鹏,宋小宝 - 往事只能回味.mp3', '岳云鹏,宋小宝.jpg', '岳云鹏,宋小宝 - 往事只能回味.lrc'),
  new Music(8, '天梯(Live) - live', '张智霖', 342, '张智霖 - 天梯(Live) - live.mp3', '张智霖.jpg', '张智霖 - 天梯(Live) - live.lrc'),
  new Music(9, '友情岁月', '李克勤', 342, '李克勤 - 友情岁月.mp3', '李克勤.jpg', '李克勤 - 友情岁月.lrc'),
  new Music(10, '合久必婚', '李克勤', 342, '李克勤 - 合久必婚.mp3', '李克勤.jpg', '李克勤 - 合久必婚.lrc'),
  new Music(11, '天梯', '李克勤', 342, '李克勤 - 天梯.mp3', '李克勤.jpg', '李克勤 - 天梯.lrc'),
  new Music(12, '爱不释手', '李克勤', 342, '李克勤 - 爱不释手.mp3', '李克勤.jpg', '李克勤 - 爱不释手.lrc'),
  new Music(13, '飞花', '李克勤', 342, '李克勤 - 飞花.mp3', '李克勤.jpg', '李克勤 - 飞花.lrc'),
  new Music(14, '充满希望', '玛莉亚', 342, '玛莉亚 - 充满希望.mp3', '玛莉亚.jpg', '玛莉亚 - 充满希望.lrc'),
  new Music(15, '友谊之光', '玛莉亚', 342, '玛莉亚 - 友谊之光.mp3', '玛莉亚.jpg', '玛莉亚 - 友谊之光.lrc'),
  new Music(16, '老中医', '花粥', 342, '花粥 - 老中医.mp3', '花粥.jpg', '花粥 - 老中医.lrc'),
  new Music(17, '静静的看着你装逼', '花粥&四四', 342, '花粥&四四 - 静静的看着你装逼.mp3', '花粥&四四.jpg', '花粥&四四 - 静静的看着你装逼.lrc'),
  new Music(18, '也曾相识', '谭咏麟', 342, '谭咏麟 - 也曾相识.mp3', '谭咏麟.jpg', '谭咏麟 - 也曾相识.lrc'),
  new Music(19, '夏日寒风', '谭咏麟', 342, '谭咏麟 - 夏日寒风.mp3', '谭咏麟.jpg', '谭咏麟 - 夏日寒风.lrc'),
  new Music(20, '雾之恋', '谭咏麟', 342, '谭咏麟 - 雾之恋.mp3', '谭咏麟.jpg', '谭咏麟 - 雾之恋.lrc'),
]

module.exports = Music
