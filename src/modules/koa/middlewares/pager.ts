import config from "../../../config";

export async function pager(ctx: any, next: any) {
    let params = ctx.request.query;//
    try {
        let p = parseInt(params.p || params.page);
        p = (isNaN(p) || p <= 0) ? 1 : p;
        let limit = params.limit ? parseInt(params.limit) : config.pager.limit;
        delete params.p;

        ctx.params = params;
        ctx.pager = {
            p: p,
            start: (p - 1) * limit,
            end: p * limit,
            limit: limit,
            skip: (p - 1) * limit,
            parse: (count) => {
                ctx.pager.count = count;
                ctx.pager.total = Math.ceil(count / ctx.pager.limit);
                return ctx.pager;
            }
        };
    } catch (ex) {
        ctx.pager = {
            p: 1,
            limit: 10,
            skip: 0
        };
        ctx.params = {};
    }
    await next();
}
