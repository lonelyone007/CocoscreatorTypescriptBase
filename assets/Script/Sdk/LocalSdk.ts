import {SdkInfo, SdkBase} from "./SdkBase";

class TestAds {
    static getRewardedVideoAsync() {
        return new Promise<TestAds>((resolve,reject) => {
            setTimeout(() => {
                resolve(new TestAds());
                cc.log("广告拉取完毕");
            }, 1000);
            cc.log("开始拉取广告");
        });
    }
    showAsync() {
        return new Promise<void>((resolve,reject) => {
            setTimeout(() => {
                resolve();
                cc.log("广告播放完毕");
            }, 1000);
            cc.log("开始播放广告");
        });
    }
    loadAsync() {
        return new Promise<void>((resolve,reject) => {
            setTimeout(() => {
                resolve();
                cc.log("广告资源读取完毕");
            }, 3000);
            cc.log("开始读取广告资源");
        });
    }
}

export default class GameSdk implements SdkBase {
    private _info: SdkInfo = {
        playerId: (() => {
            var id = cc.sys.localStorage.getItem('id');
            if (!id)
            {
                id = Math.random();
                cc.sys.localStorage.setItem('id', id);
            }
            return 'Local-' + id;
        })(),
        playerName: '你说呢',
        sdkName: 'Local',
        language: 'zh'
    };

    sdkInfo(): SdkInfo {
        return this._info;
    }

    flushDataAsync(): Promise<void> {
        return new Promise<void>((resolve,reject) => {
            resolve();
        });
    }
    logEvent(name: string, key: string, value?: string | number) {
    }

    private _reward: TestAds;
    private _hasReward: boolean = false;
    async init() {
        try {
            this._reward = await TestAds.getRewardedVideoAsync();
            await this._reward.loadAsync();
            this._hasReward = true;
        } catch (error) {
            cc.log(error);
        }
    }
    
    quitGame() {
        cc.game.end();
    }
    onPause(func: Function) {
    }
    
    showProgress(val: number) {
    }

    purchase(obj: Object): Promise<Object> {
        return new Promise<Object>((resolve, reject) => {
            let p;
            for (const product of this.products) {
                if (product.productID == obj['productID']) {
                    p = product;
                    break;
                }
            }
            if (p != null)
                resolve(p);
            else
                reject("purchase not find");
        });
    }

    private readonly products = [
        {productID: '1', title: "6500", description: "800\nGOLD COIN", imageURI: '', price: "$0.99"},
        {productID: '2', title: "40000", description: "4500\nGOLD COIN", imageURI: '', price: "$4.99"},
        {productID: '3', title: "100000", description: "10000\nGOLD COIN", imageURI: '', price: "$9.99"}
    ];

    async getCatalogAsync(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            new cc.Node().runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
                resolve(this.products);
            })));
        });
    }

    shareGame(obj: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    showAds(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this._hasReward) {
                    reject('label.adsUnready');
                    return;
                }
                resolve(this._reward.showAsync());
                this._hasReward = false;
                await this._reward.loadAsync();
                this._hasReward = true;
            } catch (error) {
                cc.log(error);
                reject('label.adsUnsupported');
            }
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
        cc.sys.localStorage.clear();
    }

    saveData<T>(datas: Object): Promise<void> {
        return new Promise((resolve, reject) => {
            for (const key in datas) {
                if (datas.hasOwnProperty(key)) {
                    const element = datas[key];
                    cc.sys.localStorage.setItem(key, JSON.stringify(element as T));
                }
            }
            resolve();
        });
    }

    getData<T>(keys: string[]): Promise<Object> {
        return new Promise((resolve, reject) => {
            const items: { [key: string]: T } = {};
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                items[element] = JSON.parse(cc.sys.localStorage.getItem(element)) as T;
            }
            resolve(items);
        });
    }
}