import { SdkInfo, SdkBase } from "./SdkBase";

export default class GameSdk implements SdkBase {
    private _sdkInfo : SdkInfo = new SdkInfo();
    sdkInfo(): SdkInfo {
        return this._sdkInfo;
    }
    flushDataAsync(): Promise<void> {
        return new Promise<void>((resolve,reject) => {
            resolve();
        });
    }
    logEvent(name: string, key: string, value?: string | number) {
    }

    init() {
        return new Promise<void>((resolve,reject) => {
            wx.login({ 
                success: (res) =>  {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: (res) => {
                            this._sdkInfo.playerName = res.userInfo.nickName;
                            this._sdkInfo.language = res.userInfo.language;
                            resolve();
                        }
                    })
                }
            });
        });
    }

    quitGame() {
        cc.game.end();
    }
    onPause(func: Function) {
    }

    showProgress(val: number) {
    }

    purchase(obj: Object): Promise<Object> {
        throw new Error("Method not implemented.");
    }

    getCatalogAsync(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    shareGame(obj: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getPlayer() {
        throw new Error("Method not implemented.");
    }

    showAds(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    getLeadboard(name: string, index: number, count: number): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    setLeadboard(name: string, score: any): Promise<Object> {
        return new Promise(() => {
            cc.log("本地无排行榜");
        });
    }

    clearDatas() {
    }

    saveData<T>(datas: Object): Promise<void> {
        return new Promise((resolve, reject) => {
            for (const key in datas) {
                if (datas.hasOwnProperty(key)) {
                    const element = datas[key];
                    wx.setStorageSync(key, element as T);
                }
            }
            resolve();
        });
    }

    getData<T>(keys: string[]): Promise<Object> {
        return new Promise((resolve, reject) => {
            const items = {};
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                wx.getStorageSync(element);
            }
            resolve(items);
        });
    }
}