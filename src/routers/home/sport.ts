const Router = require('koa-router');
const router = new Router({
    prefix: 'sport',
});

//
// router.get('/getScores', async (ctx: any) => {
//     console.log("测试数据：", ctx.inputs);
//     return ctx.json({message: '测试成功'})
// });

router.get('/getSchedule', async (ctx: any) => {
    const inputs = ctx.inputs;
    const $map: any = {};
    if (inputs.date && inputs.date !== '') {
        $map.date = inputs.date;
    }
    if (inputs.type && inputs.type !== '') {
        $map.type = inputs.type;
    }
    //id查询
    if (inputs.id && inputs.id !== '') {
        $map.id = inputs.id;
    }

    //1.先查询总数,如果需要拿总页数，
    //ctx.pager
    const count = await ctx.models.sp_sports.count($map);
    const pager = ctx.pager.parse(count);
    const res = await ctx.models.sp_sports.find($map).skip(pager.skip).limit(pager.limit);
    return ctx.json({message: '获取比赛数据成功', data: res, search: $map, pager: pager});
});

router.get('/getLeague', async (ctx: any) => {
    const inputs = ctx.inputs;
    const $map: any = {};
    if (inputs.type && inputs.type !== '') {
        $map.type = inputs.type;
    }
    const count = await ctx.models.sp_league.count($map);
    const pager = ctx.pager.parse(count);
    const res = await ctx.models.sp_league.find($map).skip(pager.skip).limit(pager.limit);
    return ctx.json({message: '获取联盟成功', data: res, search: $map, pager: pager});
});


export default router;
