const Koa = require('koa');
const WebSocket = require('koa-websocket');
const app = WebSocket(new Koa());
let ctxs = [];
app.ws.use((ctx) => {
    /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
    ctxs.push(ctx);
    ctx.websocket.on("message", (message) => {
        for (let i = 0; i < ctxs.length; i++) {
            if (ctx != ctxs[i]) continue;
            ctxs[i].websocket.send(message);
        }
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        let index = ctxs.indexOf(ctx);
        ctxs.splice(index, 1);
    });
})

app.listen(3001, function () {
    console.log('success, start-quick is starting at port 3001')
})

