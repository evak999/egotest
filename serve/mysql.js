// 连接数据库的方法

// 1.安装mysql 2.创建连接
const mysql = require('mysql')

// 创建数据库连接
const client = mysql.createConnection({
    host: 'localhost', //数据库域名，地址
    user: 'root', //用户和密码是默认的
    password: '',
    database: 'ego' //数据库名称
})

// 封装数据库操作语句
function sqlFn(sql, arr, callback) {
    client.query(sql, arr, function (err, res) {
        if (err) {
            console.log('数据库语句错误');
            return
        }
        // 没有错误执行传的回调函数
        callback(res)
    })
}

module.exports = sqlFn