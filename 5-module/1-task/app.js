const Koa = require('koa');
const app = new Koa();
const events = require('events');

app.use(require('koa-static')('public/'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const users = [];
const newMessage = new events.EventEmitter();

newMessage.on('message', (message) => {
    users.forEach(u => {
        u.ctx.body = message;
        u.done();
    });
    users.length = 0;
});

router.get('/subscribe', async (ctx, next) => {
    ctx.req.on('close', () => {
        users.splice(users.findIndex(u => u.ctx === ctx), 1);
    });
    await new Promise((resolve, reject) => {
        users.push({ ctx, done: () => resolve() });
    });
    return next();
});

router.post('/publish', async (ctx, next) => {
    const { message } = ctx.request.body;
    if (!message) {
        ctx.status = 400;
        ctx.body = 'Bad request';
    } else {
        newMessage.emit('message', message);
        ctx.body = 'ok';
    }
    return next();
});

app.use(router.routes());

module.exports = app;
