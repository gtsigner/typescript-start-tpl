const schedule = require('node-schedule');
const consola = require('consola');
import * as dayjs from 'dayjs';

export default async function startTask(app: any) {
    const faker = require('faker');
    faker.locale = "zh_CN";

    //每小時去重啓一次，这种是防止服务器直接给你短信
    const reconnectTask = schedule.scheduleJob('1 1 */1 * * *', async () => {

    });
}
