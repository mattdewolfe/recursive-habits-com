import {State} from "dijon/core";
import BaseMediator from "../mediator/BaseMediator";
import { ISceneData } from '../utils/Interfaces';
import RHPrefab from '../display/RHPrefab';
import RHText from '../display/RHText';
import RHButton from '../display/RHButton';

export default class BaseState extends State {
    public prefabClasses: {} = {
        prefab: RHPrefab,
        text: RHText,
        button: RHButton
    };
    public prefabs: {};
    public groups: {};
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
        let group_name, prefab_name;
        
        this.groups = {};
        this.prefabs = {};

        if (this._levelData !== null) {
            // Iterate over group data.
            this._levelData.groups.forEach(function (group_name) {
                this.groups[group_name] = this.game.add.dGroup();
            }, this);

            // Iterate over prefab data.
            for (let prefabName in this._levelData.prefabs) {
                if (this._levelData.prefabs.hasOwnProperty(prefabName)) {
                    // create prefab
                    this._createPrefab(prefabName, this._levelData.prefabs[prefabName]);
                }
            }
        }
        super.create();
    }

    protected _createPrefab(prefabName: string, data: any): void {
        let prefabPosition: { x: number, y: number } = { x: 0, y: 0 };
        let prefab: any;
        // create object according to its type
        if (this.prefabClasses.hasOwnProperty(data.type)) {
            // If position is greater than 0 and less than 1, we assume this is a floating
            // point value to be interpreted as a % based position.
            if (data.position.x > 0 && data.position.x <= 1) {
                // position as percentage
                prefabPosition.x = data.position.x * this.game.world.width;
                prefabPosition.y = data.position.y * this.game.world.height;
            }
            else {
                prefabPosition = data.position;
            }
            prefab = new this.prefabClasses[data.type](prefabName, prefabPosition, data);

            if (data.group && this.groups.hasOwnProperty(data.group)) {
                this.groups[data.group].addChild(prefab);
            }
            else {
                this.game.add.existing(prefab);
            }
            this.prefabs[prefabName] = prefab;
        }
    }

    protected _findPrefab(name: string): any {
        if (this.prefabs.hasOwnProperty(name)) {
            return this.prefabs[name];
        }
        else {
            return null;
        }
    }
}
