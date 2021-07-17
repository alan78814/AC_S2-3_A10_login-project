const mongoose = require('mongoose')
// 設定連線到 mongo check-mechanism DB
mongoose.connect('mongodb://localhost/check-mechanism', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
module.exports = db
