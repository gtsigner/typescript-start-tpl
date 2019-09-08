import {coreInit} from "./modules/koa/framework";

const Koa = require('koa');
import models, {connection} from './models'

import config from "./config";
import logger from "./lib/logger";

import staticServer = require("koa-static");
import startTask from "./tasker";
import DemoService from "./services/DemoService";
import StoreService from "./services/StoreService";
import {Socket} from "./socket";

process.env.TZ = "Asia/Shanghai";

const path = require('path');

const app = new Koa();
const IO = require('koa-socket-v1');
const socket = new IO({});//IO

socket.attach(app);
//static
app.use(staticServer(path.join(__dirname, '/../static')));
app.use(staticServer(path.join(__dirname, '/../temp')));

//init
app.context.db = connection;
app.context.config = config;
app.context.models = models;
app.services = {
    Demo: new DemoService(app),
    Store: new StoreService(app),
};
app.logger = logger;
app.io.app = app;
app.io.manager = new Socket.SocketManager(app.io);

//初始化
app.use(async (ctx: any, next: any) => {
    ctx.models = models;
    ctx.logger = logger;
    ctx.io = app.io;
    ctx.config = config;
    return await next();
});

coreInit(app);

const LISTEN_PORT = 9000;
app.listen(LISTEN_PORT, async () => {
    console.log(`App is running at ${LISTEN_PORT} Env=${config.env} open Browser： http://127.0.0.1:${LISTEN_PORT}/api/passport/test`);
    await startTask(app)
});


export default app;
