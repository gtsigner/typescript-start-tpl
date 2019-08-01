const Router = require('koa-router');
const router = new Router({
    prefix: 'passport',
});


router.get('/test', async (ctx: any) => {
    console.log("测试数据：", ctx.inputs);
    return ctx.json({message: '测试成功'})
});


export default router;
