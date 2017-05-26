interface ICache {
    clear(): void;
    get(key: string, callback: ICallback) : any;
    getSize():number;
}