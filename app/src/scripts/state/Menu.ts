import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import MenuMediator from '../mediator/MenuMediator';
import RHButton from '../display/RHButton';

export default class Menu extends BaseState {
    protected _buildComplete: boolean = false;
    protected _currentPresetName: number;

    protected _title: Phaser.Text;
    protected _bg: Phaser.Image;

    // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = new MenuMediator(this);
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
            this._setupInputEvents
        ]
    }

    public afterBuild() {
        super.afterBuild();
        this._buildComplete = true;
    } 
    
    public clearVisuals(): void {
        this._title.destroy();
        this._bg.destroy();
    }

    protected _setupInputEvents(): void {
        let playBtn: RHButton = this._findPrefab("game_button");
        if (playBtn !== null) {
            playBtn.onInputDown.add(this._onPlayPressed, this);
        }
        
        let storeBtn: RHButton = <RHButton>this._findPrefab("store_button");
        if (storeBtn !== null) {
            storeBtn.onInputDown.add(this._onStorePressed, this);
        }
    }

    private _onPlayPressed(): void {
        this.mediator.requestStateChange(Constants.STATE_GAME);
    }   
    
    private _onStorePressed(): void {
        this.mediator.requestStateChange(Constants.STATE_STORE);
    }

    private _toggleSFX(): void {
        Constants.SFX_ENABLED = !Constants.SFX_ENABLED;
    }       

    public get realWidth(): number {
        return this.game.width;
    }

    public get realHeight(): number {
        return this.game.height;
    }

    private get mediator(): MenuMediator {
        return <MenuMediator>this._mediator;
    }
}
  