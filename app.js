//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
//引用 mongoose.js檔案
require('./config/mongoose')
//樣板引擎指定為 Handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//載入靜態檔案
app.use(express.static('public'))
//載入 body-parser
app.use(express.urlencoded({ extended: true }))
//載入db中user資料
const User = require('./models/user.js')
// 設定首頁路由
app.get('/', (req, res) => {
    res.render('home')
})

//首頁輸入帳密 登入
app.post('/', (req, res) => {
    // https://mongoosejs.com/docs/api/query.html#query_Query-find
    // .find(必須是object)
    User.find({})
        .lean()
        .then(user => {
            for (let i = 0; i < user.length; i++) {
                if (req.body.email === user[i].email && req.body.password === user[i].password) {
                    return res.render('welcome', { name: user[i].firstName})
                } else {
                    return res.render('home', {alert: `<h3 class="d-flex justify-content-center mt-3">Username 或 Password 錯誤，請重新輸入</h3>` })
                }
            }
        })

})

// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})