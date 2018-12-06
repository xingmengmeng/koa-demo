const Koa = require('koa')
const Router = require('koa-router');//路由
const views = require('koa-views');//koa模板
const path = require('path');//node核心模块
const static = require('koa-static');//静态资源中间件
const app = new Koa();
const router = new Router();

const details = require('./router/details');
const list=require('./router/list');

// 加载模板引擎
app.use(views(__dirname + '/view', {
    map: { html: 'ejs' }
}));
//静态资源
app.use(static(
    path.join(__dirname, '/static')
))

//koa路由  /api/details/:id  路径例如/api/details/123  而不是/api/details?id=123  
router.get('/api/details', async (ctx) => {
    console.log(ctx.query);
    ctx.body = await details;
});
router.get('/api/list', async (ctx) => {
    ctx.body = await list;
});


//第三方路由中间件的使用  必须放在最后  很重要
app.use(router.routes(), router.allowedMethods());
app.listen(3001, function () {
    console.log('success, start-quick is starting at port 3001')
})

