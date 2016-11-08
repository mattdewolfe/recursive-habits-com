import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import MenuMediator from '../mediator/MenuMediator';
import RHButton from '../display/RHButton';

export default class Menu extends BaseState {

    protected _isGenerating: boolean = false;
    protected _buildComplete: boolean = false;

    protected _oldTitle: Phaser.Image;
    protected _newTitle: Phaser.Image;
    protected _fontSize: number;
    protected _currentPresetName: number;

    protected _presetNames: string[];

    protected _buttons: RHButton[];
    protected _sfxButton: RHButton;

    protected _title: Phaser.Text;
    protected _bg: Phaser.Image;

    // Phaser.State overrides
    public init() {
        this._mediator = new MenuMediator();
        this._oldTitle = null;
        this._newTitle = null;
        this._fontSize = ((this.realWidth + this.realHeight) * 0.5) * 0.045;
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
            this._addVisuals,
            this._addButtons
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

    private _buildBorders(): void {
        let gfx = this.game.add.graphics();
        gfx.beginFill(Constants.NUM_ORANGE_BORDER, 0.8);
        gfx.drawRoundedRect(5, 5, this.realWidth - 10, this.realHeight - 10, 10);
        gfx.endFill();
        gfx.beginFill(0x000000, 1.0);
        gfx.drawRoundedRect(10, 10, this.realWidth - 20, this.realHeight - 20, 10);
        gfx.endFill();

        this._bg = this.add.image(5, 5, gfx.generateTexture());
        this.game.world.remove(gfx);
    }

    // private methods
    private _addVisuals(): void {
        this._title = this.game.add.dText(this.realWidth * 0.5, this.realHeight * 0.1, 'GENERATOR', Constants.FONT_RALEWAY, this._fontSize, Constants.STR_BLUE);
        this._title.centerPivot();
    }

    private _addButtons(): void {
        this._buttons = [];
        let xPos = this.realWidth * 0.5;
        let button = new RHButton(this.realWidth * 0.5, this.realHeight * 0.2, this._generateShipName, this, 'ui', 'button');
        button.addLabel('RANDOM SHIP NAME', Constants.STR_BTN_NORMAL, Constants.STR_BTN_HOVER);
        xPos -= button.realWidth * 0.5;
        button.x = xPos;
        this.add.existing(button);
        this._buttons.push(button);

        let button2 = new RHButton(xPos, this.realHeight * 0.35, this._getPresetName, this, 'ui', 'button');
        button2.addLabel('PRESET SHIP NAME', Constants.STR_BTN_NORMAL, Constants.STR_BTN_HOVER);
        this.add.existing(button2);
        this._buttons.push(button2);
        
        let button3 = new RHButton(xPos, this.realHeight * 0.5, this._generatePlayerName, this, 'ui', 'button');
        button3.addLabel('RANDOM NAME', Constants.STR_BTN_NORMAL, Constants.STR_BTN_HOVER);
        this.add.existing(button3);
        this._buttons.push(button3);

        let button4 = new RHButton(xPos, this.realHeight * 0.65, this._generateNewInsult, this, 'ui', 'button');
        button4.addLabel('RANDOM INSULT', Constants.STR_BTN_NORMAL, Constants.STR_BTN_HOVER);
        this.add.existing(button4);
        this._buttons.push(button4);

        this._sfxButton = new RHButton(this.realWidth - 100, this.realHeight - 90, this._toggleSFX, this, 'ui', 'sfx', 'sfx_off', true);
        this.add.existing(this._sfxButton);        
        this._sfxButton.bringToTop();
    }   
    
    private _repositionButtons(): void {
        this._sfxButton.x = this.realWidth - 100;
        this._sfxButton.y = this.realHeight - 90;
        for (let i = 0; i < this._buttons.length; i++) {
            
        }
    }

    private _toggleSFX(): void {
        Constants.SFX_ENABLED = !Constants.SFX_ENABLED;
        this._sfxButton.toggleEnabledFrame(Constants.SFX_ENABLED)
    }   
    
    private _generateShipName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        this.updateAndShowNewName(this.mediator.getRandomShipTitle());
    }   
    
    private _generatePlayerName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        this.updateAndShowNewName(this.mediator.getRandomPlayerName());
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

    private _generateNewInsult(): void {
         if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        this._removeOldTitle();
        this.updateAndShowNewName(this.mediator.getRandomInsult());
    }

    private updateAndShowNewName(newName: string): void {
        let newText = new Text(0, 0, newName.toUpperCase(), Constants.FONT_RALEWAY, this._fontSize, Constants.STR_NEW_TITLE, 'center', true, this.realWidth);
        newText.fontSize = this._fontSize * 0.8;
        let gfx = this.game.add.graphics(-500, 0);
        gfx.beginFill(Constants.NUM_ORANGE_BOX, 0.8);
        gfx.drawRoundedRect(0, 0, newText.realWidth * 20, newText.realHeight + 20, 10);
        gfx.endFill();

        this._newTitle = this.add.image(this.realWidth * 0.5, -500, gfx.generateTexture());
        this._newTitle.alpha = 0;
        this._newTitle.y = this.realHeight * 0.85;
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
        this.updateAndShowNewName(this.mediator.getRandomInsult());
    }

    private _removeOldTitle(): void {
        if (this._oldTitle !== null) {
            this.game.add.tween(this._oldTitle).to({ y: this.realHeight * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);;
        }
    }

    private _clearOldTitle(): void {
        this._oldTitle.visible = false;
    }   
    
    private _setCurrentAsOld(): void {
        this._oldTitle = this._newTitle;
        this._isGenerating = false;
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
  