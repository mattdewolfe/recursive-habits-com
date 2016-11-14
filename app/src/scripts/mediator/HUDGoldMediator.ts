import BaseMediator from './BaseMediator';
import {INotification} from "dijon/interfaces";
import Notifications from '../utils/Notifications';
import HUDGold from '../gameplay/HUDGold';

export default class HUDGoldMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'hudgoldmediator';

    // dijon.mvc.Mediator overrides
    public listNotificationInterests(): string[] {
        return [
            Notifications.GOLD_CHANGED
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.GOLD_CHANGED:
                this.gold.updateGoldDisplay(this.gameModel.currentPlayerGold.toString());
                break;
        }
    }
    
    // getter / setter
    public get name():string {
        return HUDGoldMediator.MEDIATOR_NAME;
    }

    public get gold(): HUDGold {
        return <HUDGold>this._viewComponent;
    }
}