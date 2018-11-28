const Koa = require('koa')
const Router = require('koa-router');//路由
const views = require('koa-views');//koa模板
const path = require('path');
const static = require('koa-static');//静态资源中间件
const app = new Koa();
const router = new Router();

// 加载模板引擎
app.use(views(__dirname + '/view', {
    map: { html: 'ejs' }
}));
//静态资源
app.use(static(
    path.join(__dirname, '/static')
))

//koa路由
router.get('/', async (ctx) => {
    await ctx.render('index', {
        title: 'Koa2',
        num: '1',
    })
});
router.get('/hello', async (ctx) => {
    ctx.body = 'helloworld'
});
router.get('/about', async (ctx) => {
    ctx.body = 'about'
});


//第三方路由中间件的使用  必须放在最后  很重要
app.use(router.routes(), router.allowedMethods());
app.listen(3001, function () {
    console.log('success, start-quick is starting at port 3001')
})

