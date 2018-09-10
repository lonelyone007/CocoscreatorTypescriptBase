import Tools from "./Tools";
import {String} from 'typescript-string-operations';

export default class Actions {
    /** 闪烁 */
    static async blink(node: cc.Node, count: number = 1, interval: number = 0.2) {
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.fadeTo(interval, 125),
                cc.fadeTo(interval, 255)
            ));
        }
    }

    /** 摇摆 */
    static async swing(node: cc.Node, count: number = 1, interval: number = 0.2) {
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.rotateTo(interval, 15),
                cc.rotateTo(interval, -15)
            ));
        }
    }

    /** 震动 */
    static async clash(node: cc.Node, pos: cc.Vec2, target: cc.Vec2, count: number = 1, interval: number = 0.2, ease: cc.ActionEase = cc.easeBackIn()) {
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.moveTo(interval, pos),
                cc.moveTo(interval, target)
            ));
        }
    }

    /** 缩放 */
    static async scale(node: cc.Node, count: number = 1, value: number, interval: number = 0.2) {
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.scaleTo(interval, value),
                cc.scaleTo(interval, 1)
            ));
        }
    }

    /** 颜色 */
    static async color(node: cc.Node, count: number = 1, color: cc.Color, interval: number = 0.2) {
        const originColor = node.color;
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.tintTo(interval, color.getR(), color.getG(), color.getB()),
                cc.tintTo(interval, originColor.getR(), originColor.getG(), originColor.getB())
            ));
        }
    }

    /** 隐现 */
    static async fade(node: cc.Node, count: number = 1, opacity: number, interval: number = 0.2) {
        for (let i = 0; i < count; i++) {
            await Tools.asyncRunAction(node, cc.sequence(
                cc.fadeTo(interval, opacity * 255),
                cc.fadeTo(interval, 255)
            ));
        }
    }

    /** 横屏插播 */
    static async intercut(label: cc.Label, content: string, duratoin: number = 0.5) {
        label.string = content;
        label.node.active = true;
        label.node.setPositionX(-720);
        label.node.runAction(cc.sequence(
            cc.moveTo(duratoin, 0, label.node.position.y),
            cc.delayTime(duratoin * 2),
            cc.moveTo(duratoin, 720, label.node.position.y),
            cc.callFunc(() => {
                label.node.active = false;
            })
        ));
    }

    /** 数字动画 */
    static async labelNumber(label: cc.RichText | cc.Label, format: string, from: number, to: number, time: number, interval: number /* ms */, delay: number = 0) {
        let current = from;
        label.string = String.Format(format, Tools.getNegative(current));
        const val = to - from;
        const step = Math.ceil(val / (time / interval));
        const compareFunc = from > to ? () => current <= to : () => current >= to;

        if (delay > 0)
            await Tools.wait(delay);
        while (true) {
            await Tools.wait(interval);
            current += step;
            if (!label.isValid) break;
            if (compareFunc()) {
                current = to;
                label.string = String.Format(format, Tools.getNegative(current));
                break;
            }
            label.string = String.Format(format, Tools.getNegative(current));
        }
    }
}