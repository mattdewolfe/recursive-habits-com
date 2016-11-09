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
        this._mediator = new MenuMediator();
    }

    public preload(): void {
        this.game.asset.loadAssets('required');
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

    // private methods
    private _addVisuals(): void {
        this._title = this.game.add.dText(this.realWidth * 0.5, this.realHeight * 0.1, 'FRUIT NINJA', Constants.FONT_RALEWAY, 30, Constants.STR_BLUE);
        this._title.centerPivot();
    }  

    private _onPlayPressed(): void {
        console.log("Play Pressed");
    }   
    
    private _onStorePressed(): void {
        console.log("Store Pressed");
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
  