//facebook的用户账户讯息
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const _schema = new Schema({
    //联盟ID
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    //联盟名称
    name: {
        type: String,
        default: ''
    },
    //联盟地址
    host: {
        type: String,
        default: '',
    },
    data: Object
});


// [ { id: 'tw_13',
//     s: 11,
//     n: 'CPBL 中華職棒',
//     u: 'http://www.cpbl.com.tw/' } ]
//     [ { pk: 'tw_2207',
//     aID: 'tw_13',
//     gst: 'X',
//     st: '',
//     runsA: '',
//     runsB: '',
//     ra: '-,,',
//     rb: '-,,',
//     gd: '2019-08-01T18:35:00',
//     gs: '未開賽',
//     tt: '',
//     ta: '中信兄弟',
//     tb: '富邦悍將',
//     bsob: '0,0,0,0' } ]


class TaoBaoModel {

}

_schema.loadClass(TaoBaoModel);
const model = mongoose.model('sp_league', _schema, 'sp_league');
export default model
