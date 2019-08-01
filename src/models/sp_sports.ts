//facebook的用户账户讯息
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const _schema = new Schema({
    id: {type: String},
    league: {type: String},
    type: {type: String},
    category: {type: String},
    group: {type: String},
    fetchTime: Date,
    gameTime: Date,
    date: String,
    home: {
        name: String,
        logo: String,
    },
    away: {
        name: String,
        logo: String,
    },
    status: {
        type: String,
    },
    records: Array,//記錄
    data: Object,//每次的最新數據
    events: Array,//事件update保存的數據
});

export enum SportMatchStatus {
    NotPlay = 'NotPlay',
    InPlay = 'In Play',
    Done = 'Done',
    Delay = 'Deplay',
}

class TaskModel {

}

_schema.loadClass(TaskModel);
const model = mongoose.model('sp_sports', _schema, 'sp_sports');
export default model
