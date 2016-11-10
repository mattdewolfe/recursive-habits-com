import BaseMediator from './BaseMediator';
import {INotification} from "dijon/interfaces";
import Notifications from '../utils/Notifications';
import FruitScore from '../gameplay/FruitScore';

export default class FruitScoreMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'fruitscoremediator';

    // dijon.mvc.Mediator overrides
    public listNotificationInterests(): string[] {
        return [
            Notifications.ADD_TO_SCORE
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.ADD_TO_SCORE:
                let amount: number = <number>notification.getBody();
                if (amount !== null) {
                    this.score.increaseBy(amount);
                }
                break;    
        }
    }
    
    public notifyGameOver(): void {
        this.sendNotification(Notifications.GAME_LEVEL_FAILED);
    }
    
    // getter / setter
    public get name():string {
        return FruitScoreMediator.MEDIATOR_NAME;
    }

    public get score(): FruitScore {
        return <FruitScore>this._viewComponent;
    }
}