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
            Notifications.PRELOAD_COMPLETE,
            Notifications.REQUEST_TTS_AUDIO
        ]
    }

    public handleNotification(notification: INotification) {
        switch (notification.getName()) {
            case Notifications.BOOT_INIT:
                Logger.log(this, 'Notifications.BOOT_INIT');
                this.viewComponent.adjustScaleSettings();
                this.viewComponent.adjustRendererSettings();
                this.viewComponent.addPlugins();
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

            case Notifications.REQUEST_TTS_AUDIO:
                if (this.game.sound.mute === false) {
                    let copy: string = <string>notification.getBody();
                    this.viewComponent.ttsText(copy);
                }
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