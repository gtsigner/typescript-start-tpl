export default class KoaService {
    protected readonly app;
    protected readonly models;
    protected readonly services;

    constructor(app: any) {
        this.app = app;
    }
}

