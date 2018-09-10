import ArrayTool from "../Tools/ArrayTool";
import GameAudio from "../GameAudio";

const {ccclass, menu, property} = cc._decorator;

@ccclass
@menu('Widgets/Button')
export default class Button extends cc.Button {
    private cbs = {};

    start() {
        this.on('audio', this.playAudio);
        this.node.on('click', this.onClickButton,this);
    }

    onDestroy() {
        this.off('audio');
        this.node.off('click');
    }

    private onClickButton() {
        for (const key in this.cbs) {
            if (this.cbs.hasOwnProperty(key)) {
                const cb = this.cbs[key];
                cb();
            }
        }
    }

    private playAudio() {
        GameAudio.playAudio("appear-online", false);
    }
    
    on(name, cb) {
        this.cbs[name] = cb;
    }

    off(name) {
        delete this.cbs[name];
    }
}