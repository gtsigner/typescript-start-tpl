import {objectToArray} from "../modules/common/utils/arr";

const consola = require('consola');
export module Socket {
    export const events = {
        PONG: 'pong',
        broadcast: 'broadcast',
        DISCONNECT: 'disconnect',
        CONNECT: 'connect',
    };

    export enum ClientTypes {
        wechat = 'wechat',
        wework = 'wework',
        iqiyi = "iqiyi",
        client = 'client',
    }

    export class SocketManager {
        public readonly clients: any = {};
        public readonly io: any;
        public readonly socket: any;
        public readonly app: any;

        constructor(io: any) {
            this.io = io;
            this.app = io.app;
            this.socket = io.socket;
            io.on('connection', (context: any) => {
                context.socket.on('fuck.pong', async (res) => {
                    console.log('fuck.pong', res);
                });
                const manager = new ClientManager(context, this);
                this.clients[manager.id] = manager;
            });
        }

        public removeClient(id) {
            this.clients[id] && delete this.clients[id]
        }

        /**
         * 添加一个客户端
         * @param id
         * @param manager
         */
        public addClient(id: string, manager: ClientManager) {
            this.clients[id] = manager
        }


        /**
         * 获取账户信息
         * @param accountId
         * @param type
         */
        public getClient(accountId: string, type: ClientTypes = ClientTypes.wework): ClientManager {
            const clients = this.getClientList();
            for (let i = 0; i < clients.length; i++) {
                const client = clients[i];
                if (client.accountId == accountId && client.clientType === type) {
                    return client;
                }
            }
            return null;
        }

        /**
         * 获取账户信息
         * @param accountId
         * @param type
         */
        public getClientsByAcTp(accountId: string, type: ClientTypes): ClientManager[] {
            const clients = this.getClientList();
            const list: ClientManager[] = [];
            clients.forEach((client) => {
                if (client.accountId == accountId && client.clientType === type) {
                    return list.push(client);
                }
            });
            return list;
        }


        public getClients(): any {
            return this.clients;
        }

        /**
         *获取客户端列表
         */
        public getClientList(): ClientManager[] {
            return objectToArray(this.clients);
        }

        /**
         * 获取客户端管理器
         * @param id socket_id
         */
        public getClientManager(id: string): ClientManager {
            return this.clients[id] ? this.clients[id] : null;
        }
    }


    export class ClientManager {
        public readonly context: any;
        public readonly socket: any;
        public readonly client: any;
        public readonly query: any;
        public readonly clientType: ClientTypes;
        public readonly id: string;
        public readonly server: SocketManager;
        public accountId: string = "";
        public readonly app: any;
        //会话的群
        public conversation: any = null;

        constructor(context: any, server: SocketManager) {
            this.app = server.app;
            const client = context.socket;
            const handshake = client.handshake;
            const {query, headers} = handshake;
            this.clientType = query.client_type;
            this.socket = client;
            this.client = client;
            context.manager = this;
            this.context = context;
            this.query = query;
            this.id = client.id;
            this.server = server;
            switch (this.clientType) {
                case ClientTypes.client:
                    consola.info(`游戏客户端: ${client.id} 进入了服务器，信息：${JSON.stringify(query)} `);
                    break;
                default:
                    consola.info(`None客户端: ${client.id} 进入了服务器，信息：${JSON.stringify(query)} `);
                    break;
            }
            this.init();
        }

        init() {
            const client = this.socket;
            client.on('disconnect', () => {
                this.server.removeClient(this.id)
            });

            client.on('broadcast', () => {
                consola.info("收到广播");
            });

            client.on(events.PONG, () => {

            });
            client.broadcast.emit('client.in', {client: client.id});
        }
    }
}
