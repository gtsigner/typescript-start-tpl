const fs = require('fs');
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
let env = 'production';

export enum Envs {
    "local" = "local",
    "home" = "home",
    "production" = "production",
    "development" = "development",
}

const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
    env = fs.readFileSync(envPath).toString('utf8');
}

const full = {
    jwtSecret: 'qR7mRHqlVO,ERflUmBrSd7Q{w}Qgom',
    server: {
        registry: '',
        port: 8000
    },
    pager: {
        limit: 14
    },
    mongo: {
        uri: debug ? 'mongodb://192.168.10.167:27017/ticket_buy' : 'mongodb://127.0.0.1:27017/ticket_buy',
    },
    redis: {
        host: debug ? '192.168.10.167' : '127.0.0.1',
        port: 6379
    },
    app: {
        root: path.join(__dirname, '../'),
        debug: debug,
    },
    logger: {
        path: "./logs/"
    },
    env: env
};
let configs = {};
export default {...full, ...configs};
