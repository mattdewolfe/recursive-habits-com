import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import StoreMediator from '../mediator/StoreMediator';
import RHButton from '../display/RHButton';

export default class Store extends BaseState {

    // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = new StoreMediator();
    }

    public preload(): void {
        this.game.asset.loadAssets('required');
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
           
        ]
    }

    public afterBuild() {
        super.afterBuild();
    } 

    public get realWidth(): number {
        return this.game.width;
    }

    public get realHeight(): number {
        return this.game.height;
    }

    private get mediator(): StoreMediator {
        return <StoreMediator>this._mediator;
    }
}
  