import RHText from '../display/RHText';
import HUDGoldMediator from '../mediator/HUDGoldMediator';
import { ITextData } from '../utils/Interfaces';

export default class HUDGold extends RHText {

    protected _mediator: HUDGoldMediator;
    
    constructor(name: string, position: { x: number, y: number }, data: ITextData) { 
        super(name, position, data);
        this._mediator = <HUDGoldMediator>HUDGoldMediator.retrieveMediator(HUDGoldMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new HUDGoldMediator(this);
        }
    } 

    public updateGoldDisplay(newAmount: string): void {
        this.text = newAmount;
    }
}