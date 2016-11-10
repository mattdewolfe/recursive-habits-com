import BaseMediator from './BaseMediator';
import {INotification} from "dijon/interfaces";
import Notifications from '../utils/Notifications';
import Gameplay from '../state/Gameplay';

export default class GameplayMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'gameplaymediator';
		
    // dijon.mvc.Mediator overrides
    public listNotificationInterests(): string[] {
        return [
            Notifications.GAME_LEVEL_FAILED
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.LIFE_LOST:
                this.viewComp.onGameOver();
                break;    
        }
    }

    // getter / setter
    public get name():string {
        return GameplayMediator.MEDIATOR_NAME;
    }

    public get viewComp(): Gameplay {
        return <Gameplay>this.viewComponent;
    }
}