const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const UserModel = require('./models/User');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router();

router.get('/users', async (ctx) => {
  const users = await UserModel.find().exec();
  ctx.body = users;
});

router.get('/users/:id', async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const user = await UserModel.findById(id).exec();
    if (!user) {
      emitError(ctx, 404, `No user with id ${ id }`);
    } else {
      ctx.body = user;
    }
  } catch (e) {
    emitError(ctx, 400, 'Bad request!');
  }
});

router.patch('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  let user;
  try {
    user = await UserModel.findById(id).exec();
    if (!user) {
      emitError(ctx, 404, `No user with id ${ id }`);
    } else {
      ctx.body = user;
    }
  } catch (e) {
    emitError(ctx, 400, 'Bad request!');
    return;
  }

  const { email, displayName } = ctx.request.body;
  ['email', 'displayName'].forEach(key => {
    if (ctx.request.body.hasOwnProperty(key)) {
      user[key] = ctx.request.body[key];
    }
  });
  try {
    const newUser = await user.save();
    ctx.body = newUser;
  } catch (e) {
    switch (true) {
      case e.name === 'ValidationError':
        handleDbError(e, ctx);
        break;
      default:
        emitError(ctx, 400, 'Bad request!');
    }
  }
});

router.post('/users', async (ctx) => {
  const data = ctx.request.body;
  const { email, displayName } = ctx.request.body;
  try {
    const newUser = await UserModel.create({ email, displayName });
    ctx.status = 201;
    ctx.body = newUser;
  } catch (e) {
    handleDbError(e, ctx);
  }
});

router.delete('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      emitError(ctx, 404, `No user with id ${ id }`);
    } else {
      ctx.body = result;
    }
  } catch (e) {
    emitError(ctx, 400, 'Bad request!');
  }
});

app.use(router.routes());

module.exports = app;

function emitError(ctx, status, message = '') {
  ctx.status = status;
  ctx.body = message;
}

function handleDbError(err, ctx) {
  const errors = Object
      .keys(err.errors)
      .reduce((all, current) => {
        all[current] = err.errors[current].message;
        return all;
      }, {});
  ctx.status = 400;
  ctx.body = { errors };
}