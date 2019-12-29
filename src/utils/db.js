if (!wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
} else {
  wx.cloud.init({
    env: 'poem-production'
  })
}
const db = wx.cloud.database()
const command = db.command
const $ = command.aggregate
const poem = db.collection('poem')
const images = db.collection('images')
export async function getPoemList() {
  return new Promise((resolve, reject) => {
    poem.field({
      title: true,
      bgimage: true
    }).get({
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
export async function judgeToPage(_id) { //判断跳转页面
  return new Promise((resolve, reject) => {
    poem.aggregate().match({
      _id
    })
      .project({
        section: $.ifNull(['$section', 0]),
        content: $.ifNull(['$content', 0])
      }).project({
        judgeId: $.switch({
          branches: [
            { case: $.neq(['$section', 0]), then: 2 },
            { case: $.neq(['$content', 0]), then: 3 }
          ],
          default: 1
        })
      }).end().then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
  })
}
export async function getPoemDetails(_id) { //
  return new Promise((resolve, reject) => {
    poem.where({
      _id
    }).get({
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
export async function getDirectory(_id) { //获取二级目录
  return new Promise((resolve, reject) => {
    poem.where({
      _id
    }).field({
      title: true,
      abstract: true,
      author: true,
      'content.title': true,
      'content.chapter': true,
      'content.type': true
    }).get({
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
export async function getPoemSubDetails(_id, contentId) { //
  if (contentId) {
    return new Promise((resolve, reject) => {
      poem.aggregate().match({
        _id
      }).project({
        _id: $.concat(['$_id', contentId]),
        content: $.slice(['$content', parseInt(contentId), 1]),
      }).end().then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      poem.where({
        _id
      }).get({
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}
// project({
//   content: $.slice(['$content', Math.floor(Math.random() * ($.size('$content'))), 1]),
// })
// images.aggregate()
//   .sample({
//     size: 1
//   })
//   .end().then(data => {
//     console.log("TCL: getRandomImage -> data", data)
//     resolve(data)
//   }).catch(err => {
//     console.log("TCL: getRandomImage -> err", err)
//     reject(err)
//   })
export async function getRandomImage() { //
  return new Promise((resolve, reject) => {
    images.aggregate()
      .sample({
        size: 1
      })
      .end().then(data => {
        const fileId = data.list[0].image;
        wx.cloud.getTempFileURL({
          fileList: [fileId],
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          }
        })

      }).catch(err => {
        reject(err)
      })
  })
}
