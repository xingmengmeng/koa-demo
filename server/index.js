const Koa = require('koa')
const Router = require('koa-router');//路由
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql');
const app = new Koa();
const router = new Router();

//post请求处理
app.use(bodyParser());
const mysqlConfig = {
    host: '10.152.18.41',
    user: 'root',
    password: 'root',
    database: 'bi_fen'
}
const sqlQueryFn = sql => {
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

//koa路由  /api/details/:id  路径例如/api/details/123  而不是/api/details?id=123  
router.get('/api/details', async (ctx) => {
    let sql = "select * from app_dash_kpi";
    ctx.body = await sqlQueryFn(sql);
})
//select * from 数据表  where 字段名 BETWEEN '2016-02-01' AND '2016-02-05' 
//select * from 数据表  where 字段名 >= '2016-02-01' AND 字段名 <= '2016-02-05  order by 字段名 升/降序' 
//select * from 数据表  where 字段名 = '2016-02-01' 
router.post('/api/list', async (ctx) => {
    console.log(ctx.request.body);
    let start = ctx.request.body.start,
        end = ctx.request.body.end;
    let sql = `select * from app_dash_kpi where month>= '${start}' and month<= '${end}' and kpi > '5000' order by month desc`;
    ctx.body = await sqlQueryFn(sql);
})

//第三方路由中间件的使用  必须放在最后  很重要
app.use(router.routes(), router.allowedMethods());
app.listen(3001, function () {
    console.log('success, start-quick is starting at port 3001')
})

