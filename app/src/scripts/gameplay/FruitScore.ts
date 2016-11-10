import RHText from '../display/RHText';
import FruitScoreMediator from '../mediator/FruitScoreMediator';
import { IPrefabData } from '../utils/Interfaces';

export default class FruitScore extends RHText {
    protected _score: number;
    protected _mediator: FruitScoreMediator;

    constructor(name: string, position: {x: number, y: number}, data: IPrefabData) {
        super(name, position, data);
        this._score = 0;
        this._mediator = <FruitScoreMediator>FruitScoreMediator.retrieveMediator(FruitScoreMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new FruitScoreMediator(this);
        }
    }

    public increaseBy(amount: number): void {
        this.text = 'Fruits: ' + this._score.toString();
    }
}