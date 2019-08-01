const fs = require('fs-extra');

export async function fileAutoCheckDir(dir: string, clear: boolean = true) {
    if (clear) {
        await fs.remove(dir);
    }
    return await fs.ensureDir(dir);
}

export async function autoClearDirFiles(dir: string) {

}
