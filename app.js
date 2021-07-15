//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
//引用 mongoose.js檔案
require('./config/mongoose')
//樣板引擎指定為 Handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 設定首頁路由
app.get('/', (req, res) => {
    res.render('home')
})

// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})