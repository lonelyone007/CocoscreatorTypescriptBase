export class SdkInfo {
    playerId: string;
    playerName: string;
    sdkName: string;
    language: string;
}

export interface SdkBase {
    sdkInfo(): SdkInfo;
    init();

    quitGame();

    flushDataAsync(): Promise<void>;
    saveData<T>(data: Object): Promise<void>;
    getData<T>(keys: string[]): Promise<Object>;
    clearDatas();

    setLeadboard(name: string, score): Promise<Object>;
    getLeadboard(name: string, index: number, count: number): Promise<any>;
    showAds(): Promise<void>;

    purchase(obj: Object): Promise<Object>;
    getCatalogAsync(): Promise<any[]>;
    shareGame(obj): Promise<void>;

    showProgress(val: number);

    onPause(func: Function);
    logEvent<T>(name: string, key: string, value? : string | number | T);
}