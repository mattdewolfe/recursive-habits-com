import {Application} from 'dijon/application'
import {Game} from 'dijon/core';
import { Text } from 'dijon/display';
import Constants from '../utils/Constants';

export default class RHButton extends Phaser.Button {
    private _disabledFrame: string;
    private _enabledFrame: string;

    private _normalCopyColour: string;
    private _hoverCopyColour: string;

    private _label: Text;
    
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
        
        this._label = null;
        this._enabledFrame = baseFrameName;
        this._disabledFrame = disabledFrame !== null ? disabledFrame : baseFrameName;
        this.forceOut = forceOut;
        this.input.useHandCursor = true;
    }

    public addLabel(copy: string, normalColor: string, hoverColor: string): void {
        this._normalCopyColour = normalColor;
        this._hoverCopyColour = hoverColor;
        this._label = new Text(this.realWidth * 0.5, this.realHeight * 0.525, copy, Constants.FONT_RALEWAY, this.realHeight * 0.35, normalColor, 'center');
        this._label.centerPivot();
        this.addChild(this._label);
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
        if (this._label !== null) {
            this._label.setColor(this._hoverCopyColour);
        }
    }

    public onInputOverHandler(sprite: any, pointer: any): void {
        super.onInputOverHandler(sprite, pointer);
        if (this._label !== null) {
            this._label.setColor(this._hoverCopyColour);
        }
    }

    public onInputOutHandler(sprite: any, pointer: any): void {
        super.onInputOutHandler(sprite, pointer);
        if (this._label !== null) {
            this._label.setColor(this._normalCopyColour);
        }
    }  
    
    public onInputUpHandler(sprite: any, pointer: any, isOver: boolean): void {
        super.onInputUpHandler(sprite, pointer, isOver);
        if (this._label !== null) {
            this._label.setColor(this._normalCopyColour);
        }
    }

    public updateBaseFrame(base: string): void {
        this.setFrames(base + '_hover', base + '_normal', base + '_hover', base + '_normal');
    }  
    
    public get dgame(): Game {
        return <Game>this.game;
    }
}