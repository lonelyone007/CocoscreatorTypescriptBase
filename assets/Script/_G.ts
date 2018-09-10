import UIBase from "./UI/UIBase";

'use strict';


const {ccclass, property} = cc._decorator;

@ccclass
export default class _G extends cc.Component {
    private static _instance: _G;

    static get Instance(): _G {
        if (!_G._instance)
            _G._instance = cc.find('Canvas').getComponent(_G);
        return this._instance;
    }

    /** 最前层的点,在最前层的遮罩后 */
    @property(cc.Node)
    frontNode: cc.Node = null;
    /** 最前层的遮罩 */
    @property(cc.Node)
    frontMask: cc.Node = null;
    @property(cc.Prefab)
    uis: cc.Prefab[] = null;

    onLoad() {
        _G._instance = this;
    }

    init(): Promise<void> {
        return new Promise<void>((resolve,reject) => {
            resolve();
        });
    }
}