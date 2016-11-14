import { Sprite } from 'dijon/display';
import { IPrefabData } from '../utils/Interfaces';

export default class RHPrefab extends Sprite {
    constructor(name: string, position: { x: number, y: number }, data: IPrefabData) {
        super(position.x, position.y, data.prop.key, data.prop.frame);
        this.name = name;
        if (data.prop.anchor) {
            this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
        }   
        if (data.prop.pivot) {
            this.setPivot(data.prop.pivot);
        }
        if (data.prop.scale) {
            this.scale.setTo(data.prop.scale.x, data.prop.scale.y);
        }
        if (data.prop.angle) {
            this.angle = data.prop.angle;
        }
    }
}