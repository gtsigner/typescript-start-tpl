import {pager} from "./middlewares/pager";
import {installRoutes} from "../../routers";


const bodyParser = require('koa-bodyparser');

export function coreInit(app) {

//基础包装
    app.use(async (ctx: any, next: any) => {
        const {request, response} = ctx;
        response.set("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        response.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
        response.set("X-Powered-By", '3.2.1');
        //包装函数
        ctx.json = (data: any, status: number = 200) => {
            ctx.status = status;
            ctx.body = data;
        };
        //让options请求快速返回
        if (request.method == "OPTIONS") ctx.json({}, 200);
        else await next();
    });

    app.use(pager);

    app.use(bodyParser({
        detectJSON: function (ctx: any) {
            return /\.json$/i.test(ctx.path);
        }
    }));

    app.use(async (ctx: any, next: any) => {
        ctx.inputs = Object.assign(ctx.query, ctx.request.body);
        ctx.application = app;
        ctx.config = app.context.config;
        ctx.io = app.io;

        await next();
        const rt = ctx.response.get('X-Response-Time');
        ctx.logger.info(`${ctx.method} ${ctx.url} - ${rt}`, ctx.inputs);
    });

// x-response-time
    app.use(async (ctx: any, next: any) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });

    app.on('error', (err: any, ctx: any) => {
        console.error(err);
        ctx.body = err.message;
    });

    //安装所有的路由
    installRoutes(app);

    //末尾捕获异常
    app.use(async (ctx: any) => {
        return ctx.json({message: '404 Not Found', code: 1001}, 404);
    });
    return app;
}