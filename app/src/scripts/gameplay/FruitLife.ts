import RHPrefab from '../display/RHPrefab';
import FruitLifeMediator from '../mediator/FruitLifeMediator';
import { Group } from 'dijon/display';
import { IPrefabData } from '../utils/Interfaces';

export default class FruitLife extends Group {

    protected _lifeCount: number;
    protected _livesRemaining: number;
    protected _lifeVisuals: RHPrefab[];

    constructor(name: string, position: {x: number, y: number}, data: IPrefabData) {
        super(0, 0, name);
        this._mediator = FruitLifeMediator.retrieveMediator(FruitLifeMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new FruitLifeMediator(this);
        }

        this._lifeCount = data.prop['lives'];
        this._livesRemaining = this._lifeCount;
        this._lifeVisuals = [];

        for (let i = 0; i < this._lifeCount; i++) {
            let nextLife = new RHPrefab(name + '_life_' + i, { x: position.x + (data.prop['spacing'] * i), y: position.y }, data);
            this.addChild(nextLife);
            this._lifeVisuals.push(nextLife);
        }
    }

    public decreaseLives(): void {
        this._livesRemaining--;
        if (this._livesRemaining === 0) {
            this.mediator.notifyGameOver();
        }
    }

    public get mediator(): FruitLifeMediator {
        return <FruitLifeMediator>this._mediator;
    }
}