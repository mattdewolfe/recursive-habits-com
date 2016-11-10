import {Logger} from "dijon/utils";
import {INotification} from "dijon/interfaces";
import BaseMediator from './BaseMediator';
import Constants from '../utils/Constants';
import Notifications from '../utils/Notifications';
import BoilerplateApplication from '../BoilerplateApplication';

export default class ApplicationMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'ApplicationMediator';

    // dijon.mvc.Mediator overrides
    public listNotificationInterests(): string[] {
        return [
            Notifications.BOOT_INIT,
            Notifications.BOOT_COMPLETE,
            Notifications.PRELOAD_COMPLETE
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.BOOT_INIT:
                Logger.log(this, 'Notifications.BOOT_INIT');
                this.viewComponent.bootComplete();
                break;
            
            case Notifications.PRELOAD_COMPLETE:
                this.viewComponent.preloadComplete();
                break;

            case Notifications.BOOT_COMPLETE:
                Logger.log(this, 'Notifications.BOOT_COMPLETE');
                this.game.asset.setData(this.game.cache.getJSON('assets'));
                this.viewComponent.registerModels();
                this.game.transition.to(Constants.STATE_PRELOAD);
                break;
        }
    }

    // getter / setter
    public get viewComponent(): BoilerplateApplication {
        return <BoilerplateApplication>this._viewComponent;
    }

    public get name():string {
        return ApplicationMediator.MEDIATOR_NAME;
    }
}