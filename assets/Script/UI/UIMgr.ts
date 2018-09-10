import UIBase from "./UIBase";
import _G from "../_G";
import ArrayTool from "../Tools/ArrayTool";

export default class UIMgr {
    private static uis : UIBase[] = [];
    private static uiRoot: cc.Node;

    static Init() {
        UIMgr.uiRoot = cc.find('Canvas/UI');
        this.uis = cc.find('Canvas').getComponentsInChildren(UIBase);
    }

    static GetUI<T extends UIBase>(name: string): T {
        for (let i = 0; i < this.uis.length; i++) {
            const element = this.uis[i];
            if (name == element.node.name) {
                return element as T;
            }
        }
        return null;
    }

    static LoadUI<T extends UIBase>(name?: string, parent?: cc.Node): T {
        for (let i = 0; i < this.uis.length; i++) {
            const element = this.uis[i];
            if (name == element.node.name) {
                element.node.active = true;
                element.node.setSiblingIndex(element.node.parent.childrenCount - 1);
                return element as T;
            }
        }

        const prefab = ArrayTool.find(_G.Instance.uis, (p: cc.Prefab) => p.name == name);
        if (prefab != null) {
            const ui = cc.instantiate(prefab).getComponent(UIBase);
            ui.node.parent = parent || UIMgr.uiRoot;
            this.uis = this.uis.concat(ui.getComponentsInChildren(UIBase));
            return ui as T;
        }
        return null;
    }

    /**
     *
     * @param name ui的名字
     * @param destroy 是否销毁掉
     */
    static UnloadUI<T extends UIBase>(name: string, destroy: boolean = false) {
        for (let i = 0; i < this.uis.length; i++) {
            const element = this.uis[i];
            if (name == element.node.name) {
                if (destroy) {
                    var uis = element.getComponentsInChildren(UIBase);
                    for (const ui of uis) {
                        var index = this.uis.indexOf(ui);
                        if (index != -1)
                            this.uis.splice(index, 1);
                    }
                    uis.forEach(ui => {
                        ui.node.destroy();
                    });
                }
                else
                    element.node.active = false;
                return;
            }
        }
    }
}