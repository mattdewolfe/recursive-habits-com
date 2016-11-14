import {State} from "dijon/core";
import BaseMediator from "../mediator/BaseMediator";
import { ISceneData } from '../utils/Interfaces';
import PrefabBuilder from '../utils/PrefabBuilder';

export default class BaseState extends State {
    private _updateAllowed: boolean  = false;

    // This will be an array containing a reference to every Prefab built for this scene.    
    public prefabs: { [name: string]: any } = {};
    // This will be an object containing each group, added through the prefab builder, as a property on the object.
    public groups: any;
    public _levelData: ISceneData = null;

    public init(levelData: any = null) {
        this._levelData = levelData;
        super.init();
    }   
    
    public preload(): void {
        super.preload();
        if (this._levelData !== null) {
            this.game.asset.loadAssets(this._levelData.assetEntry);
        }
    }

    public create(): void {
        if (this._levelData !== null) {
            PrefabBuilder.createSceneFrom(this._levelData, this);
        }
        super.create();
    }

    public afterBuild(): void {
        super.afterBuild();
        this._updateAllowed = true;
    }    

    protected _findPrefab(name: string): any {
        if (this.prefabs.hasOwnProperty(name)) {
            return this.prefabs[name];
        }
        console.warn("Prefab " + name + " not found on State.");
        return null;
    }

    public update(): void {
        if (this._updateAllowed) {
            this.updateState();
        }
    }

    // Use me for update loops - I will only be called when updateAllowed is true.    
    public updateState(): void { }

    public get updateAllowed(): boolean {
        return this._updateAllowed;
    }

    public set updateAllowed(value: boolean) {
        this._updateAllowed = value; 
    }

    public get firebase(): any {
        return this.game['firebase'];
    }
}
