const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
//配置连接参数
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '123456',
   database: 'ai',
});
connection.connect();//连接
app.all('*', (req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By", ' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
})
app.get('/api/getData', (req, res) => {
   console.log(req.query, 111)
   let name = req.query.name;
   if (name) {
      //查询数据
      connection.query('SELECT * FROM test WHERE name="' + name + '"', function (error, results, fields) {
         if (!error) {
            // console.log('The solution is: ', results);
            res.json(results);
         }
      });
      // connection.end();//断开连接
   } else {
      connection.query('SELECT * FROM test', function (error, results, fields) {
         if (!error) {
            // console.log('The solution is: ', results);
            res.json(results);
         }
      });
   }
})
app.post("/api/addData", (req, res) => {
   console.log(req.body, 2222)
   let name = req.body.name;
   if (name) {
      connection.query('INSERT INTO test (name) VALUES ("' + name + '")', function (error, results, fields) {
         if (!error) {
            // console.log('The solution is: ', results);
            res.json(results);
         } else {
            res.json(error)
         }
      });
      // connection.end();//断开连接
   } else {
      res.json({ msg: '请输入名称!' });
   }
})

app.post("/api/deleteData", (req, res) => {
   console.log(req.body, 2222)
   let id = req.body.id;
   if (id) {
      connection.query('DELETE FROM test WHERE id=' + id, function (error, results, fields) {
         if (!error) {
            // console.log('The solution is: ', results);
            res.json(results);
         } else {
            res.json(error, 'error')
         }
      });
      // connection.end();//断开连接
   } else {
      res.json({ msg: '请选择删除的数据!' });
   }
})

let server = app.listen(3000, function () {
   console.log(server.address());
})