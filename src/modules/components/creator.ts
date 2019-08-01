const puppeteer = require('puppeteer-core');
const path = require('path');

export class Creator {
    static async createBrowser(): Promise<any> {
        return await puppeteer.launch({
            executablePath: path.resolve('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'),
            headless: false,
            defaultViewport: {
                height: 600,
                width: 800,
                deviceScaleFactor: 2
            },
            // const browser = await puppeteer.launch({headless:true, args:['--no-sandbox','--proxy-server=socks5://127.0.0.1:1088']});
            args: ['--window-size=800,600']
        });
    }

}
