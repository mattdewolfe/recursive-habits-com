import {Application} from 'dijon/application'
import {Game} from 'dijon/core';
import { Text } from 'dijon/display';
import Constants from '../utils/Constants';
import { IButtonData, ITextComponentData } from '../utils/Interfaces';

export default class RHButton extends Phaser.Button {
    private _disabledFrame: string;
    private _enabledFrame: string;

    private _normalCopyColour: string;
    private _hoverCopyColour: string;

    private _label: Text;
    
    constructor(name: string, position: { x: number, y: number }, data: IButtonData) {
        super(Application.getInstance().game,
            position.x,
            position.y,
            data.prop.key,
            null,
            null,
            data.prop.frame + '_hover',
            data.prop.frame + '_normal',
            data.prop.frame + '_hover', 
            data.prop.frame + '_normal');
        
        this.name = name;

        this._enabledFrame = data.prop.frame;
        this._disabledFrame = data.prop.altFrame !== undefined ? data.prop.altFrame : data.prop.frame;
        this.forceOut = data.prop.forceOut ? data.prop.forceOut : false;
        this.input.useHandCursor = data.prop.useHand ? data.prop.useHand : true;

        if (data.prop.anchor) {
            this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
        }
        if (data.prop.pivot) {
            this.setPivot(data.prop.pivot);
        }
        if (data.prop.angle) {
            this.angle = data.prop.angle;
        }
        if (data.prop.text) {
            this._addLabel(data.prop.text);
        }
        else {
            this._label = null;
        }
    }

    protected _addLabel(data: ITextComponentData): void {
        let subPos: { x: number, y: number } = { x: data.position.x, y: data.position.y };
        this._normalCopyColour = data.fontColour;
        this._hoverCopyColour = data.altColour ? data.altColour : data.fontColour;
        if (data.position.x > 0 && data.position.x < 1) {
            subPos.x = this.realWidth * data.position.x;
            subPos.y = this.realHeight * data.position.y;
        }
        this._label = new Text(subPos.x, subPos.y, data.copy, data.fontName, data.fontSize, data.fontColour ? data.fontColour : '#ffffff', data.align ? data.align : 'center');
        if (data.anchor) {
            this._label.anchor.setTo(data.anchor.x, data.anchor.y);
        }
        if (data.pivot) {
            this._label.setPivot(data.pivot);
        }
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