import {Model} from 'dijon/mvc';

export class GameModel extends Model {
    public static MODEL_NAME: string = "gameModel";

    public get name(): string {
        return GameModel.MODEL_NAME;
    }

    public getLevelData(name: string): any {
        return this._data[name];
    }
}