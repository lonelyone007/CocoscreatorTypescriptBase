import UIMgr from "./UIMgr";
import Button from "../Widgets/Button";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {
    @property(Button)
    closeBtn: Button = null;

    touchMask: cc.Node;

    onEnable() {
        if (this.touchMask != null)
            this.touchMask.on(cc.Node.EventType.TOUCH_START, this.emptyTouch, this);
    }

    onDisable() {
        if (this.touchMask != null)
            this.touchMask.off(cc.Node.EventType.TOUCH_START, this.emptyTouch, this);
    }

    // 用于阻止下层触摸穿透
    protected emptyTouch() {
    }

    onLoad() {
        this.touchMask = this.node.getChildByName("TouchMask");
        if (this.closeBtn != null) {
            this.closeBtn.on('click', () => {
                UIMgr.UnloadUI(this.node.name);
            });
        }
    }
}