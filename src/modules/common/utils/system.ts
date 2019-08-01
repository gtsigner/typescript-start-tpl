import * as crypto from 'crypto'

export class BaseHelper {

    public static base64Decode(str: string) {
        return Buffer.from(str, 'base64').toString('ascii');
    }

    public static base64Encode(str: string) {
        return Buffer.from(str).toString('base64');
    }

    public static md5_encode(str: string): string {
        const obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }

    public static async sleep(time: number) {
        return new Promise((resolve => {
            setTimeout(resolve, time * 1000);
        }))
    }
}