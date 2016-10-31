import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import MenuMediator from '../mediator/MenuMediator';

export default class Menu extends BaseState {

    protected _isGenerating: boolean = false;
    protected _oldTitle: Phaser.Image;
    protected _newTitle: Phaser.Image;
    protected _repeating: boolean = true;
    protected _fontSize: number;

    protected _spriteData: any;
    protected _lastSound: number = 0;

    // Phaser.State overrides
    public init() {
        this._mediator = new MenuMediator();
        this._oldTitle = null;
        this._newTitle = null;
        this._fontSize = ((this.game.width + this.game.height) * 0.5) * 0.065;
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
    
    private _buildBorders(): void {
        let gfx = this.game.add.graphics();
        gfx.beginFill(Constants.NUM_ORANGE_BORDER, 0.8);
        gfx.drawRoundedRect(5, 5, this.game.width - 10, this.game.height - 10, 10);
        gfx.endFill();
        gfx.beginFill(0x000000, 1.0);
        gfx.drawRoundedRect(10, 10, this.game.width - 20, this.game.height - 20, 10);
        gfx.endFill();

        let bg = this.add.image(5, 5, gfx.generateTexture());
        this.game.world.remove(gfx);
    }

    // private methods
    private _addVisuals(): void {
        this._spriteData = this.mediator.audioSpriteData;
        let buttonWidth = this.game.width * 0.35 > 400 ? 400 : this.game.width * 0.3;
        let row: number = 1;
        let column: number = 1;
        let repeat = new Phaser.Button(this.game, 125, 75 * row, 'up', this._playLast, this);
        repeat.setPivot('center');
        this.add.existing(repeat);
        let label = new Text(repeat.x, repeat.y + 60, 'REPLAY LAST', Constants.FONT_RALEWAY, 20, Constants.STR_BLUE);
        label.centerPivot();
        this.add.existing(label);
        for (let key in this._spriteData.spritemap) {
            let button = new Phaser.Button(this.game, 200 +(300 * column), 200 * row, 'up', this._playSFX, this);
            button.setPivot('center');
            button.name = key;
            this.add.existing(button);
            column++;
            if (column >= 4) { 
                row++;
                column = 0;
            }
            label = new Text(button.x, button.y + 60, key, Constants.FONT_RALEWAY, 20, Constants.STR_BLUE);
            label.centerPivot();
            this.add.existing(label);
        }
    }
    
    private _playLast(): void {
        this.game.audio.playAudio('fx_1', this._lastSound);
    }
    
    private _playSFX(button: Phaser.Sprite): void {
        this._lastSound = this.game.audio.playAudio('fx_1', button.name);
    }

    private _stop(): void {
        this._repeating = false;
    }

    private _generateNewName(): void {
        if (this._isGenerating === true) {
            return;
        }
        this._isGenerating = true;
        if (this._oldTitle !== null) {
            this.game.add.tween(this._oldTitle).to({ y: this.game.height * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);;
        }
        let newCopy = this.mediator.getRandomTitle();
        let newText = new Text(0, 0, newCopy, Constants.FONT_RALEWAY, this._fontSize, Constants.STR_NEW_TITLE, 'center', true, this.game.width);
        newText.fontSize = this._fontSize * 0.8;
        let gfx = this.game.add.graphics(-500, 0);
        gfx.beginFill(Constants.NUM_ORANGE_BOX, 0.8);
        gfx.drawRoundedRect(0, 0, newText.width * 20, newText.height + 20, 10);
        gfx.endFill();

        this._newTitle = this.add.image(this.game.width * 0.5, this.game.height - 500, gfx.generateTexture());
        this.game.world.remove(gfx);

        this._newTitle.setPivot('center');
        newText.setPivot('center');
        newText.x = this._newTitle.width * 0.5;
        newText.y = this._newTitle.height * 0.5;
        this._newTitle.addChild(newText);

        this.game.add.tween(this._newTitle).to({ y: this.game.height * 0.5 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._setCurrentAsOld, this);
        this.mediator.requestTTSAudio(newCopy);
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
  