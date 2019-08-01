const mongoose = require('mongoose');
import config from '../config'

//#region page plugin
const mongoosePaginate = require('mongoose-paginate-v2');
const labelOptions = {
    totalDocs: 'total',
    docs: 'list',
    limit: 'limit',
    page: 'current',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'count'
};
mongoosePaginate.paginate.options = {
    customLabels: labelOptions,
};
mongoose.plugin(mongoosePaginate);
//#endregion
mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnect', () => {
    console.log('disconnect');
});
db.once('open', function () {
    console.debug('mongodb connect success');
});
export default db
