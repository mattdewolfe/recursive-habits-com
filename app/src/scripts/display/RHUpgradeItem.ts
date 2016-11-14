import RHButton from './RHButton';
import {IUpgradeButtonData, IUpgradeData} from '../utils/Interfaces';
import { Text } from 'dijon/display';

export default class RHUpgradeItem extends RHButton {

    protected _cost: Text;
    protected _desc: Text;
    protected _data: IUpgradeData;

    constructor(name: string, position: { x: number, y: number }, data: IUpgradeButtonData) {
        super(name, position, data);

        let descPos: { x: number, y: number } = { x: this.realWidth + 10, y: this.realHeight * 0.5};
        this._desc = new Text(descPos.x, descPos.y, data.upgrade.description, data.prop.text.fontName, data.prop.text.fontSize * 0.6, data.prop.text.fontColour ? data.prop.text.fontColour : '#ffffff', 'left');
        this.addChild(this._desc);

        let costPos: { x: number, y: number } = { x: this.realWidth + 10, y: 0};
        this._cost = new Text(costPos.x, costPos.y, data.upgrade.price.toString() + "g", data.prop.text.fontName, data.prop.text.fontSize * 0.6, data.prop.text.fontColour ? data.prop.text.fontColour : '#ffffff', 'left');
        this.addChild(this._cost);

        this._data = data.upgrade;
    }

    public disableButton(): void {
        this._cost.text = "Sold Out";
        this.input.enabled = false;
        this._label.setColor(this._hoverCopyColour);
        this.tint = 0xbfbfbf;
        this._desc.setColor("#bfbfbf");
        this._cost.setColor("#bfbfbf");
    }  

    public flashCost(): void {
        this._cost.setColor('#bf0000');
    }   
    
    public get baseCost(): number {
        return this._data.price;
    }   
    
    public get upgradeType(): string {
        return this._data.upgradeType;
    }

    public get upgradeData(): IUpgradeData {
        return this._data;
    }
}