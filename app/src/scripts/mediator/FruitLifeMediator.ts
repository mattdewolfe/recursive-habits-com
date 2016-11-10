import BaseMediator from './BaseMediator';
import {INotification} from "dijon/interfaces";
import Notifications from '../utils/Notifications';
import FruitLife from '../gameplay/FruitLife';

export default class FruitLifeMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'storemediator';

    // dijon.mvc.Mediator overrides
    public listNotificationInterests(): string[] {
        return [
            Notifications.LIFE_LOST
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.LIFE_LOST:
                this.lives.decreaseLives();
                break;    
        }
    }
    
    public notifyGameOver(): void {
        this.sendNotification(Notifications.GAME_LEVEL_FAILED);
    }
    
    // getter / setter
    public get name():string {
        return FruitLifeMediator.MEDIATOR_NAME;
    }

    public get lives(): FruitLife {
        return <FruitLife>this._viewComponent;
    }
}