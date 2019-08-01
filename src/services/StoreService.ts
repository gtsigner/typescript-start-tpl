import KoaService from "../modules/koa/services/KoaService";
import * as dayjs from 'dayjs';

export default class StoreService extends KoaService {
    public async select() {

    }

    //存儲聯盟
    public async pushLeagues(leagues: any) {
        if (!leagues || !leagues.forEach) return [];
        const models = this.app.context.models;
        leagues.forEach(async (it) => {
            await models.sp_league.findOneAndUpdate({id: it.id}, {
                id: it.id,
                name: it.n,
                host: it.u,
                type: it.id.split('_')[0],
                data: it,
            }, {upsert: true});
        });
        return true;
    }

    //存儲
    public async pushSchedules(pushSchedules: any) {
        if (!pushSchedules || !pushSchedules.forEach) return [];
        const ps = [];
        const models = this.app.context.models;
        pushSchedules.forEach(async (it) => {
            await models.sp_sports.findOneAndUpdate({id: it.pk}, {
                //每次都需要更新的
                $set: {
                    league: it.aID,//联盟
                    fetchTime: new Date(),
                    gameTime: new Date(it.gd),
                    status: it.gs,//状态
                    home: {
                        name: it.ta,
                    },
                    away: {
                        name: it.tb
                    },
                    data: it,
                    date: dayjs(it.gd).format('YYYY-MM-DD'),
                },
                //插入的時候需要更修的
                $setOnInsert: {
                    id: it.pk,//pk
                    type: it.pk.split('_')[0],
                    records: [],
                    events: [],
                }
            }, {upsert: true});
        });
        return true;
    }

    //更新比賽信息
    public async updateSchedules(pushSchedules: any) {
        if (!pushSchedules || !pushSchedules.forEach || pushSchedules.length === 0) return [];
        const models = this.app.context.models;
        pushSchedules.forEach(async (it) => {
            const update = {
                $push: {
                    records: it,
                    events: it,
                }
            };
            await models.sp_sports.updateOne({id: it.pk}, update);
        });
    }
}