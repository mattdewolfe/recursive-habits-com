import { ISceneData } from './Interfaces';
import { Group } from 'dijon/display';
import RHPrefab from '../display/RHPrefab';
import RHText from '../display/RHText';
import RHButton from '../display/RHButton';
import BaseState from '../state/BaseState';
import FruitLife from '../gameplay/FruitLife';
import FruitScore from '../gameplay/FruitScore';
import Spawner from '../gameplay/Spawner';

export default class PrefabBuilder {

    // All classes you intended to instantiate need to exist with this object.
    // If there type here does not match the type parem from the import file, 
    // then the Builder will skip over that class.
    public static prefabClasses: {} = {
        prefab: RHPrefab,
        text: RHText,
        button: RHButton,
        lives: FruitLife, 
        score: FruitScore,
        spawner: Spawner
    }; 
    
    public static game: Phaser.Game = null;

    // Creates all objects for a given scene, on that scene.    
    public static createSceneFrom(data: ISceneData, scene: BaseState): void {
        if (scene === null)
            return;
        
        let groupName, prefabName;
        scene.prefabs = [];
        scene.groups = {};

        if (data !== null) {
            // Iterate over group data.
            data.groups.forEach(function (groupName) {
                if (!scene.groups.hasOwnProperty(groupName)) {
                    scene.groups[groupName] = scene.add.dGroup(0, 0, groupName);
                }
            }, this);

            // Iterate over prefab data.
            for (let i = 0; i < data.prefabs.length; i++) {
                if (PrefabBuilder.prefabClasses.hasOwnProperty(data.prefabs[i].type)) {
                    // create prefab
                    let prefab = this.createPrefab(data.prefabs[i]);
                    if (data.prefabs[i].hasOwnProperty("group") && scene.groups.hasOwnProperty(data.prefabs[i].group)) {
                        scene.groups[data.prefabs[i].group].addChild(prefab);
                    }
                    else {
                        scene.add.existing(prefab);
                    }
                    scene.prefabs[prefab.name] = prefab;
                }
            }
        }
    }
    
    // Create all prefabs from a given data object.
    // Returns a group with them in it.
    public static createPrefabsFrom(data: ISceneData): Group {
        let groupName, prefabName;
        let groups = {};
        let root = new Group(0, 0, 'root');

        if (data !== null) {
            groups['basic'] = new Group(0, 0, groupName);
            // Iterate over group data.
            data.groups.forEach(function (groupName) {
                groups[groupName] = new Group(0, 0, groupName);
                root.addChild(groups[groupName]);
            }, this);

            // Iterate over prefab data.
            for (let i = 0; i < data.prefabs.length; i++) {
                if (PrefabBuilder.prefabClasses.hasOwnProperty(data.prefabs[i].type)) {
                    // create prefab
                    let prefab = this.createPrefab(data.prefabs[i]);
                    if (data.prefabs[i].hasOwnProperty("group") && groups.hasOwnProperty(data.prefabs[i].group)) {
                        groups[data.prefabs[i].group].addChild(prefab);
                    }
                    else {
                        root.addChild(prefab);
                    }
                }
            }
        }
        return root;
    }

    public static createPrefab(data: any, parent: any = null): any {
        let prefabPosition: { x: number, y: number } = { x: 0, y: 0 };
        let prefab: any;
        // create object according to its type
        if (this.prefabClasses.hasOwnProperty(data.type)) {
            // If position is greater than 0 and less than 1, we assume this is a floating
            // point value to be interpreted as a % based position.
            if (data.position.x > 0 && data.position.x <= 1) {
                // position as percentage, dependent on parent.
                if (parent === null) {
                    prefabPosition.x = data.position.x * PrefabBuilder.game.width;
                    prefabPosition.y = data.position.y * PrefabBuilder.game.height;
                }
                else {
                    prefabPosition.x = data.position.x * parent.realWidth;
                    prefabPosition.y = data.position.y * parent.realHeight;
                }
            }
            else {
                if (parent === null) {
                    prefabPosition = data.position;
                }
                else {
                    prefabPosition.x = data.position.x - parent.x;
                    prefabPosition.y = data.position.y - parent.y;
                }
            }
            prefab = new this.prefabClasses[data.type](data.name, prefabPosition, data);
            
            if (data.hasOwnProperty("components")) {
                for (let i = 0; i < data.components.length; i++) {
                    let comp = PrefabBuilder.createPrefab(data.components[i], prefab);
                    prefab.addChild(comp);
                }  
            }
        }
        return prefab;
    }
}