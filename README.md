
## 环境
node v10.13.0

``` 
koa2 路由、模板引擎、静态资源demo
```
## mockjs
引入mock来模拟数据，前端调用参照vuecli3，请求接口数据在目录router下

##  引用mysql 
npm install mysql
```
let mysqlConfig = {
    host: '10.188.18.18',
    user: 'root',
    password: 'root',
    database: 'bi_fen'
}
let sqlQueryFn = (sql) => {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection(mysqlConfig);
        connection.connect();
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                resolve(res);
            }
        });
        connection.end();
    })
}
```