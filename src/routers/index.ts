

const Router = require('koa-router');
import passport from './home/passport';
import sport from './home/sport';

export function installRoutes(app: any) {
    //子路由
    const auth = new Router({
        prefix: '/api/',
    });
    auth.use(passport.routes());
    auth.use(sport.routes());

    //app
    app.use(auth.routes());
}
