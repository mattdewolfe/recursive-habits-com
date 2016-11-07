import {Application} from 'dijon/application'
import {Game} from 'dijon/core';

export default class RHButton extends Phaser.Button {
    private _disabledFrame: string;
    private _enabledFrame: string;

    constructor(x: number, y: number, callback: any, context: any, assetKey: string, baseFrameName: string, disabledFrame: string = null, forceOut: boolean = false) {
        super(Application.getInstance().game,
            x,
            y,
            assetKey,
            callback,
            context,
            baseFrameName + '_hover',
            baseFrameName + '_normal',
            baseFrameName + '_hover', 
            baseFrameName + '_normal');
        
        this._enabledFrame = baseFrameName;
        this._disabledFrame = disabledFrame !== null ? disabledFrame : baseFrameName;
        this.forceOut = forceOut;
        this.input.useHandCursor = true;
    }

    public toggleEnabledFrame(isEnabled: boolean): void {
        if (isEnabled) {
            this.updateBaseFrame(this._enabledFrame);
        }
        else {
            this.updateBaseFrame(this._disabledFrame);
        }
    }   
    
    public onInputDownHandler(sprite: any, pointer: any): void {
        super.onInputDownHandler(sprite, pointer);
    }

    public onInputOverHandler(sprite: any, pointer: any): void {
        super.onInputOverHandler(sprite, pointer);
    }

    public updateBaseFrame(base: string): void {
        this.setFrames(base + '_hover', base + '_normal', base + '_hover', base + '_normal');
    }  
    
    public get dgame(): Game {
        return <Game>this.game;
    }
}