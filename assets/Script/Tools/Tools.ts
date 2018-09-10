import {String, StringBuilder} from 'typescript-string-operations';
import _G from '../_G';

export default class Tools {
    //********************************** cocs相关 ********************************** 
    /**
     * 用异步方法执行动作
     * @param node 运动节点
     * @param action 回调函数
     */
    static async asyncRunAction(node: cc.Node, action: cc.FiniteTimeAction) {
        return new Promise<void>((resolve, reject) => {
            node.runAction(cc.sequence(
                action,
                cc.callFunc(resolve)
            ));
        });
    }

    static getDir(vec: cc.Vec2) {
        return new cc.Vec2(vec.x == 0 ? 0 : vec.x > 0 ? 1 : -1, vec.y == 0 ? 0 : vec.y > 0 ? 1 : -1);
    }

    static setParent(node: cc.Node, parent: cc.Node, keepWorldPosition?: boolean) {
        if (node.parent == parent) return;
        if (!keepWorldPosition) {
            node.parent = parent;
            return;
        }

        const oldWorPos = node.convertToWorldSpaceAR(cc.p(0, 0));
        const newLocPos = parent.convertToNodeSpaceAR(oldWorPos);
        node.parent = parent;
        node.position = newLocPos;
        return;
    }

    static getWorldPosition(node: cc.Node) {
        return node.convertToWorldSpaceAR(cc.p(0, 0));
    }

    //********************************** end cocos相关 ********************************** 

    static deepCopy<T>(o,c = null) {
	    var c = c || {}
	    for(var i in o){
	        if(typeof o[i] === 'object') {
                //要考虑深复制问题了
                if(o[i].constructor === Array){
                    //这是数组
                    c[i] =[]
                } else {
                    //这是对象
                    c[i] = {}
                }
                Tools.deepCopy(o[i],c[i])
            } else {
                c[i] = o[i]
            }
        }
	  	return c as T;
	}

    /**
     * 新的obj,包含o1和o2的所有元素
     * @param o1 o1
     * @param o2 o2
     */
    static concatOjbect(o1: Object, o2: Object): Object {
        for (const key in o2) {
            if (o2.hasOwnProperty(key)) {
                const element = o2[key];
                o1[key] = element;
            }
        }
        return o1;
    }

    /**
     * 输出指定数量的随机数
     * @param count 数量
     */
    static randomArrs(count: number): number[] {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(Math.random());
        }
        return arr;
    }

    /**
     * 将数组元素进行乱序输出
     * @param arr 数组
     */
    static arrayShuffle<T>(arr: T[]): T[] {
        const result = arr.slice(0);
        for (let i = 1; i < arr.length; i++) {
            const random = Math.floor(Math.random() * (i + 1));
            [result[i], result[random]] = [result[random], result[i]];
        }
        return result;
    }

    static async promiseAsyncFuncs(...funcs) {
        const promises = [];
        for (const func of funcs) {
            promises.push(func);
        }
        await Promise.all(promises);
    }

    /**
     * 随机生成一个整数
     * @param src 随机起始值(闭区间)
     * @param dest 随机结束值(开区间)
     */
    static RandomBoolean() {
        return Tools.Random(0, 2) == 0;
    }

    /**
     * 随机生成一个整数
     * @param src 随机起始值(闭区间)
     * @param dest 随机结束值(开区间)
     */
    static Random(src: number, dest: number) {
        return Math.floor(Math.random() * (dest - src) + src);
    }

    /**
     * 随机生成一个浮点数
     * @param src 随机起始值(闭区间)
     * @param dest 随机结束值(开区间)
     */
    static RandomF(src: number, dest: number) {
        return Math.random() * (dest - src) + src;
    }

    /**
     * 随机生成一个浮点数
     * @param src 随机起始值(闭区间)
     * @param dest 随机结束值(开区间)
     */
    static RandomElement<T>(arr: T[]) {
        return arr[Tools.Random(0, arr.length)];
    }

    static arraySearch<T>(arr: T[], func: (t: T) => boolean) {
        for (const a of arr) {
            if (func(a)) {
                return a;
            }
        }
        return null;
    }

    static getTimeFormat(seconds: number) {
        if (seconds >= 3600)
            return String.Format("{0:00}:{1:00}:{2:00}", Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, Math.floor(seconds % 60));
        else if (seconds >= 60)
            return String.Format("{0:00}:{1:00}", Math.floor(seconds / 60), Math.floor(seconds % 60));
        else
            return String.Format("00:{0:00}", Math.floor(seconds));
    }

    /**
     * 得到当前时间
     */
    static GetNow() {
        return Math.floor(new Date().getTime() / 1000);
    }

    static getDayOffset(d1: number, d2: number) {
        const dayCount1 = Math.floor(d1 * 1000 / this.daySeconds);
        const dayCount2 = Math.floor(d2 * 1000 / this.daySeconds);
        return dayCount1 - dayCount2;
    }

    static isSameDay(d1: Date, d2: Date) {
        return d1.getDate() == d2.getDate() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getFullYear() == d2.getFullYear();
    }

    static daySeconds = 1000 * 60 * 60 * 24;

    static isSameWeek(d1: Date, d2: Date) {
        const dayCount1 = Math.floor(d1.getTime() / this.daySeconds);
        const dayCount2 = Math.floor(d2.getTime() / this.daySeconds);
        return Math.floor((dayCount1 + 4) / 7) == Math.floor((dayCount2 + 4) / 7);
    }

    static getDayCount(seconds: number) {
        return Math.floor(((Math.floor(seconds / this.daySeconds) + 4) / 7));
    }

    static wait = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };

    static formatObject(obj): string {
        const output = new StringBuilder();
        for (let key in obj) {
            const property = obj[key];
            output.AppendFormat('{0}: {1}  ', key, property);
        }
        return output.ToString();
    }

    /**
     * 1 -> '+1', -1 -> '-1', 0 -> '0'
     */
    static getNegative(num: number) {
        if (num > 0)
            return '+' + num;
        return num.toString();
    }

    static getSmbol(num: number) {
        if (num > 0)
            return '>';
        if (num < 0)
            return '<';
        return '=';
    }
}