// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入db中user資料
const User = require('./../../models/user.js')
// 設定首頁路由
router.get('/', (req, res) => {
  res.render('home')
})
// 設定送出帳密路由
router.post('/', (req, res) => {
  // https://mongoosejs.com/docs/api/query.html#query_Query-find
  // .find(必須是object)
  User.findOne({ email: req.body.email })
  // .fin()無相同回傳[],!user為flase, .fin()無相同回傳null,!user為true
    .lean()
    .then(user => {
      if (!user) {
        return res.render('home', { alert: '<h3 class="d-flex justify-content-center mt-3 ">Email尚未註冊</h3>' })
      } else if (req.body.password !== user.password) {
        return res.render('home', { alert: '<h3 class="d-flex justify-content-center mt-3 ml-4">密碼錯誤，請重新輸入</h3>' })
      } else return res.render('welcome', { name: user.firstName })
    })
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router
