import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import MenuMediator from '../mediator/MenuMediator';

export default class Menu extends BaseState {

    protected _isGenerating: boolean = false;
    protected _oldTitle: Phaser.Image;
    protected _newTitle: Phaser.Image;
    protected _fontSize: number;
    protected _currentPresetName: number;

    protected _presetNames: string[];

    protected _button: Phaser.Image;
    protected _button2: Phaser.Image;
    protected _title: Phaser.Text;
    protected _bg: Phaser.Image;

    // Phaser.State overrides
    public init() {
        this._mediator = new MenuMediator();
        this._oldTitle = null;
        this._newTitle = null;
        this._fontSize = ((this.game.width + this.game.height) * 0.5) * 0.065;
        this._presetNames = this.mediator.getPresetShipNames();
        this._currentPresetName = Math.floor(Math.random() * this._presetNames.length);
    }

    public preload(): void {
        this.game.asset.loadAssets('required');
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
            this._buildBorders,
            this._addVisuals
        ]
    }

    public afterBuild() {
        super.afterBuild();
    }

    public resize(width: number, height: number) {
        this.clearVisuals();
        this._buildBorders();
        this._addVisuals();
    }   
    
    public clearVisuals(): void {
        this._title.destroy();
        this._button.destroy();
        this._button2.destroy();
        this._bg.destroy();
    }

    private _buildBorders(): void {
        let gfx = this.game.add.graphics();
        gfx.beginFill(Constants.NUM_ORANGE_BORDER, 0.8);
        gfx.drawRoundedRect(5, 5, this.game.width - 10, this.game.height - 10, 10);
        gfx.endFill();
        gfx.beginFill(0x000000, 1.0);
        gfx.drawRoundedRect(10, 10, this.game.width - 20, this.game.height - 20, 10);
        gfx.endFill();

        this._bg = this.add.image(5, 5, gfx.generateTexture());
        this.game.world.remove(gfx);
    }

    // private methods
    private _addVisuals(): void {
        this._title = this.game.add.dText(this.game.width * 0.5, this.game.height * 0.1, 'AND THE SHIP WAS NAMED...', Constants.FONT_RALEWAY, this._fontSize, Constants.STR_BLUE);
        this._title.centerPivot();

        this._button = Placeholders.button(this.game.width * 0.75, this.game.height * 0.35, this.game.width * 0.35, this.game.width * 0.05, false, 'RANDOM NAME', this._generateShipName, this);
        this._button.centerPivot();
        this.add.existing(this._button);


        this._button2 = Placeholders.button(this.game.width * 0.25, this.game.height * 0.35, this.game.width * 0.35, this.game.width * 0.05, false, 'PRESET NAME', this._getPresetName, this);
        this._button2.centerPivot();
        this.add.existing(this._button2);
    }

    private _generateShipName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        this.updateAndShowNewName(this.mediator.getRandomShipTitle());
    }   
    
    private _getPresetName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        if (this._currentPresetName >= this._presetNames.length) {
            this._currentPresetName = 0;
        }
        this.updateAndShowNewName(this._presetNames[this._currentPresetName]);
        this._currentPresetName++;
    }

    private updateAndShowNewName(newName: string): void {
        let newText = new Text(0, 0, newName.toUpperCase(), Constants.FONT_RALEWAY, this._fontSize, Constants.STR_NEW_TITLE, 'center', true, this.game.width);
        newText.fontSize = this._fontSize * 0.8;
        let gfx = this.game.add.graphics(-500, 0);
        gfx.beginFill(Constants.NUM_ORANGE_BOX, 0.8);
        gfx.drawRoundedRect(0, 0, newText.width * 20, newText.height + 20, 10);
        gfx.endFill();

        this._newTitle = this.add.image(this.game.width * 0.5,  -500, gfx.generateTexture());
        this._newTitle.alpha = 0;
        this._newTitle.y = this.game.height * 0.7;
        this.game.world.remove(gfx);

        this._newTitle.setPivot('center');
        newText.setPivot('center');
        newText.x = this._newTitle.width * 0.5;
        newText.y = this._newTitle.height * 0.5;
        this._newTitle.addChild(newText);

        this.game.add.tween(this._newTitle).to({ alpha: 1 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._setCurrentAsOld, this);
        this.mediator.requestTTSAudio(newName);
    }

    private _generateNewName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        this.updateAndShowNewName(this.mediator.getRandomTitle());
    }

    private _removeOldTitle(): void {
        if (this._oldTitle !== null) {
            this.game.add.tween(this._oldTitle).to({ y: this.game.height * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);;
        }
    }

    private _clearOldTitle(): void {
        this._oldTitle.visible = false;
    }   
    
    private _setCurrentAsOld(): void {
        this._oldTitle = this._newTitle;
        this._isGenerating = false;
    }    

    private get mediator(): MenuMediator {
        return <MenuMediator>this._mediator;
    }
}
  