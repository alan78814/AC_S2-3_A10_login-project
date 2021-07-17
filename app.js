//載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
//引用 mongoose.js檔案
require('./config/mongoose')
//樣板引擎指定為 Handlebars
const exphbs = require('express-handlebars')
// 引用路由器
const routes = require('./routes/index.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//載入靜態檔案
app.use(express.static('public'))
//載入 body-parser
app.use(express.urlencoded({ extended: true }))
// 將 request 導入路由器
app.use(routes)
// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})