import {Model} from 'dijon/mvc';
import { IPlayerSaveData, IUpgradeData } from '../utils/Interfaces';
import Constants from '../utils/Constants';

export class GameModel extends Model {
    public static MODEL_NAME: string = "gameModel";

    protected _saveData: IPlayerSaveData;
    
    public postBootLoad(): void {
        this._saveData = this.game.storage.getFromLocalStorage(Constants.PLAYER_SAVE_DATA, true);
        if (this._saveData === null) {
            this._createSaveData();
        }
        this._saveData.wealth += 200;
    }

    public saveLocalData(): void {
        this.game.storage.saveToLocalStorage(Constants.PLAYER_SAVE_DATA, this._saveData);
    }   
    
    public getUpgradeValue(type: string): number {
        let value = 0;
        for (let i = 0; i < this._saveData.upgrades.length; i++) {
            if (this._saveData.upgrades[i].upgradeType === type) {
                value += this._saveData.upgrades[i].effect;
            }
        }
        return value;
    }   
    
    protected _createSaveData(): void {
        this._saveData = <IPlayerSaveData>{};
        this._saveData.wealth = 50;
        this._saveData.bestScore = 0;
        this._saveData.lastScore = 0;
        this._saveData.upgrades = [];
    }

    public updateSaveData(newData: IPlayerSaveData): void {
        this._saveData = newData;
    }

    public addUpgrade(data: IUpgradeData): void {
        this._saveData.upgrades.push(data);
        console.log("Added Upgrade: " + data.upgradeType + " to player upgrade data");
        this.saveLocalData();
    }   
    
    public goldSpent(amount: number): boolean {
        if (amount <= this.currentPlayerGold) {
            this._saveData.wealth -= amount;
            console.log("Spent: " + amount + " gold");
            return true;
        }
        return false;
    }   
    
    public get saveData(): IPlayerSaveData {
        return this._saveData;
    }

    public get currentPlayerGold(): number {
        return this._saveData.wealth;
    }
    
    public get name(): string {
        return GameModel.MODEL_NAME;
    }

    public getLevelData(name: string): any {
        return this._data[name];
    }
}