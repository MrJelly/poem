const db = wx.cloud.database()
const command = db.command
const poem = db.collection('poem')
export async function getPoemList() {
  return new Promise((resolve, reject) => {
    poem.field({
      title: true
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
export async function judgeToPage(_id) {//判断跳转页面
  return new Promise((resolve, reject) => {
    poem.where({
      _id,
      paragraphs: command.exists(true)
    }).count({
      success: function (res) {
        resolve(res.total)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
export async function getPoemDetail(_id) {//判断跳转页面
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
