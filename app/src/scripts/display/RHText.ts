import { Text } from 'dijon/display';
import { ITextData } from '../utils/Interfaces';

export default class Prefab extends Text {
    constructor(name: string, position: { x: number, y: number }, data: ITextData) {
        super(position.x,
            position.y,
            data.prop.copy,
            data.prop.fontName,
            data.prop.fontSize,
            data.prop.fontColour,
            data.prop.align ? data.prop.align : 'center',
            data.prop.wrapWidth !== undefined,
            data.prop.wrapWidth ? data.prop.wrapWidth : 0);
        this.name = name;
        if (data.prop.anchor) {
            this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
        }   
        if (data.prop.shadow) {
            this.setShadow(data.prop.shadow.x, data.prop.shadow.y, data.prop.shadow.colour);
        }
    }
}