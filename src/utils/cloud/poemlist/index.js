export default function getPoemList() {
  const that = this
  const db = wx.cloud.database()
  const poem = db.collection('poem')
  poem.field({
    title: true
  })
    .get()
    .then(data => {

    })
    .catch(console.error)
}
