const {ccclass, menu, property} = cc._decorator;

@ccclass
@menu('Config/Config')
export class Config extends cc.Component {
	@property(cc.TextAsset)
	test: cc.TextAsset = null;

}