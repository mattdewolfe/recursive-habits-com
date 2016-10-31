import BaseState from "./BaseState";
import Constants from "../utils/Constants";
import PreloadMediator from "../mediator/PreloadMediator";

export default class Preload extends BaseState {
    // Phaser.State overrides
    public init() {
        this._mediator = new PreloadMediator(this);
    }

    public preload(): void {
        this.game.asset.loadAssets('required');
    }
		
    public buildInterface(): void {
        this.mediator.notifyPreloadComplete();
        this.mediator.next();
    }
		
    // getter / setter
    protected get mediator(): PreloadMediator {
        return <PreloadMediator>this._mediator;
    }
}
 