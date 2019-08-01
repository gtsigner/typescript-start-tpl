export function arrayToObject(arr: [], key: string) {
    const obj: any = {};
    arr.forEach((it) => {
        obj[it[key]] = it;
    });
    return obj;
}

export function objectToArray(obj: any) {
    const arr: any[] = [];
    Object.keys(obj).forEach((k: string) => {
        arr.push(obj[k]);
    });
    return arr;
}

