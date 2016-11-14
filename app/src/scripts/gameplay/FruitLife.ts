import RHPrefab from '../display/RHPrefab';
import FruitLifeMediator from '../mediator/FruitLifeMediator';
import { Group } from 'dijon/display';
import { IPrefabData } from '../utils/Interfaces';

export default class FruitLife extends Group {

    protected _maxLives: number;
    protected _livesRemaining: number;
    protected _lifeVisuals: RHPrefab[];

    constructor(name: string, position: {x: number, y: number}, data: IPrefabData) {
        super(0, 0, name);
        this._mediator = FruitLifeMediator.retrieveMediator(FruitLifeMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new FruitLifeMediator(this);
        }

        this._livesRemaining = data.prop['lives'];
        this._maxLives = this._livesRemaining * 2;
        this._lifeVisuals = [];

        for (let i = 0; i < this._maxLives; i++) {
            let nextLife = new RHPrefab(name + '_life_' + i, { x: position.x + (data.prop['spacing'] * i), y: position.y }, data);
            this.addChild(nextLife);
            this._lifeVisuals.push(nextLife);
            if (i >= this._livesRemaining) {
                nextLife.alpha = 0;
            }
        }
    }

    public decreaseLives(): void {
        this._livesRemaining--;
        if (this._livesRemaining === 0) {
            this.mediator.notifyGameOver();
        }
        this._updateLivesDisplay();
    }

    public increaseLives(): void {
        if (this._livesRemaining < 3) {
            this._livesRemaining++;
        }
        this._updateLivesDisplay();
    }

    protected _updateLivesDisplay(): void {
        for (let i = 0; i < this._maxLives; i++) {
            this._lifeVisuals[i].alpha = i < this._livesRemaining ? 1 : 0;
        }
    }

    public get mediator(): FruitLifeMediator {
        return <FruitLifeMediator>this._mediator;
    }
}