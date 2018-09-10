export default class ccExtend {
    static fillCount(sp: cc.Sprite, count: number) {
        const size = sp.spriteFrame.getOriginalSize();
        sp.node.width = size.width * count;
    }

    static createLabel()
    {
        
    }
}