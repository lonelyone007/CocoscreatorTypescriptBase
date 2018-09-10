import ConfigManager from "./Config/ConfigManager";
import Tools from "./Tools/Tools";
import { lg } from "./i18n/interface";
import { Config } from "./Config/Config";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu('scene/InitScene')
export default class InitScene extends cc.Component {
    @property(cc.Label)
    hintLabel: cc.Label = null;
    @property(cc.Slider)
    progress: cc.Slider = null;
    @property(Config)
    config: Config = null;

    onLoad() {
        ConfigManager.InitSync(this.config);
        // cc.loader.onProgress = (completedCount, totalCount, item) => { //进度回调
        //     this.hintLabel.string ="努力加载中"+Math.ceil(completedCount / totalCount*100)+"%";
        //     this.progress.progress=(completedCount / totalCount);
        //     if(Math.ceil(completedCount / totalCount*100)==100)
        //     {
        //         this.hintLabel.string ="请点击屏幕进入游戏";
        //     }
        // };
        cc.director.preloadScene('gameScene', (error: Error) => {
            cc.log(error);
        });
        cc.director.loadScene('gameScene', () => {

        });
    }
}