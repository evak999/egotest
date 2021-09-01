const express = require('express')
const app = express()

// 资源共享，上传文件不能跨域
const cors = require('cors')
app.use(cors())

//静态文件托管 ----  访问：http:localhost:4000/图片名.jpg 就是图片在线地址
app.use(express.static('upload'))

// post请求表单数据
app.use(express.urlencoded({
    extended: true
}))

// 引路由
const router = require('./router')
app.use('/', router)

// 监听
app.listen(4000, () => {
    console.log('端口4000');
})