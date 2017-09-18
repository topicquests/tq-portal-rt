require('dotenv').config();
const debug = require('debug')('tq-portal-rt:server');
const next = require('next');
const Koa = require('koa');
const BodyParser = require('koa-body');
const Router = require('koa-router');
const jwt = require('koa-jwt');
const sign = require('jsonwebtoken').sign;
const resolve = require('path').resolve;
const routes = require('../lib/routes');
const auths = require('./backside/AuthDriver');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const dir = resolve('./lib');
debug('next', dev, dir);
const app = next({dev, dir, quiet: true});
const handle = routes.getRequestHandler(app);

debug('compiling');
app.prepare()
.then(() => {
  const server = new Koa();
  const router = new Router();
  const bodyParser = new BodyParser();

  router.post('/signup', async (ctx) => {
    debug('/signup', ctx);
    // if success
    // ctx.redirect('/')
    // else
    await app.render(ctx.req, ctx.res, '/signup', ctx.query);
    ctx.respond = false;
  });

  router.post('/login', bodyParser, async (ctx) => {
    const {email, password} = ctx.request.body;
    const errors = ctx.res.errors = {};
    if (!email) errors.email = 'email is required';
    if (!password) errors.password = 'password is required';
    if (email && password) {
      const [token, user] = await auths.login(email, password);
      if (token) {
        const authorization = sign({token, ...user}, 'shared secret');
        ctx.cookies.set('jwt', authorization);
        return ctx.redirect('/');
      }
      errors.header = 'Authentication Error';
      errors.content = 'invalid email/password combination';
      ctx.res.fields = {email};
    } else {
      ctx.res.fields = {email, password};
    }
    await app.render(ctx.req, ctx.res, '/login', ctx.query);
    ctx.respond = false;
  });

  router.post('/logout', bodyParser, async (ctx) => {
    ctx.cookies.set('jwt', null);
    return ctx.redirect('/');
  });

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(jwt({
    secret: 'shared secret',
    cookie: 'jwt',
    passthrough: true,
  }));

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  // expose whitelisted usr attrs to client
  server.use(async (ctx, next) => {
    if (ctx.state.user) {
      const {id, email, handle, name, roles} = ctx.state.user;
      ctx.res.user = {id, email, handle, name, roles};
    }
    await next();
  });

  server.use(router.routes());

  debug('launching');
  server.listen(port, (err) => {
    if (err) throw err;
    debug('serving on', port);
  });
});
