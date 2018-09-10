const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu('Components/ObjectPool')
export default class ObjectPool extends cc.Component {
    private static _pools: { [key: string]: cc.NodePool } = {};

    static createPool(prefab: cc.Prefab, count: number) {
        this._pools[prefab.data.uuid] = new cc.NodePool(prefab.data.uuid);
        const pool = this._pools[prefab.data.uuid];
        for (let i = 0; i < count; i++) {
            pool.put(cc.instantiate(prefab));
        }
        return pool;
    }

    static spawn(prefab: cc.Prefab): cc.Node {
        let p = this._pools[prefab.data.uuid];
        if (!p)
            p = this.createPool(prefab, 1);
        if (p.size() <= 0)
            this.resize(prefab, 4);

        return p.get();
    }

    static recycle(node: cc.Node) {
        const p = this._pools[node.uuid];
        if (p)
            p.put(node);
    }

    static resize(prefab: cc.Prefab, count: number) {
        const p = this._pools[prefab.data.uuid];
        for (let i = 0; i < count; i++) {
            p.put(cc.instantiate(prefab));
        }
    }
}