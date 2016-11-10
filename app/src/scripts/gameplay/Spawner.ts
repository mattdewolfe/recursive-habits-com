import { Group } from 'dijon/display';
import FruitCuttable from './FruitCuttable';
import { ISpawnerData } from '../utils/Interfaces';

export default class Spawner extends Group {
    protected _data: ISpawnerData;
    protected _spawnPoint: { x: number, y: number };
    
    constructor(name: string, position: { x: number, y: number }, data: ISpawnerData) {
        super(0, 0, data.name);
        this._data = data;
        this._spawnPoint = position;

        for (let i = 0; i < data.spawn.poolSize; i++) {
            let cuttable = new FruitCuttable("cuttable" + this._data.cuttable.prop.cuttableType, this._spawnPoint, data.cuttable);
            cuttable.kill();
            this.addChild(cuttable);
        }
    }

    public queueNextSpawn(): void {
        this.game.time.events.add(this._nextSpawnTime, this._spawnObject, this);
    }

    protected _spawnObject(): void {
        console.log('spawning object');
        let cuttable = <FruitCuttable>this.getFirstDead();
        if (cuttable !== null) {
            cuttable.setSpawnVelocity(this._newXVelocity, this._newYVelocity);
            cuttable.revive(50);
            cuttable.reset(this._spawnPoint.x, this._spawnPoint.y);
        }
        this.queueNextSpawn();
    }
    
    protected get _newXVelocity(): number {
        return this.game.rnd.between(this._data.spawn.velX.min, this._data.spawn.velX.max);
    }

    protected get _newYVelocity(): number {
        return this.game.rnd.between(this._data.spawn.velY.min, this._data.spawn.velY.max);
    }

    protected get _nextSpawnTime(): number {
        return this.game.rnd.between(this._data.spawn.timeRange.min, this._data.spawn.timeRange.max);
    }
}