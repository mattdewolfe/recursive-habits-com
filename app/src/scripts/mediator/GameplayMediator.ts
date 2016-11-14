import BaseMediator from './BaseMediator';
import {INotification} from "dijon/interfaces";
import Notifications from '../utils/Notifications';
import Gameplay from '../state/Gameplay';
import Constants from '../utils/Constants';

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

    public increaseLives(): void {
        this.sendNotification(Notifications.LIFE_EARNED);
    }
    
    public decreaseLives(): void {
        this.sendNotification(Notifications.LIFE_LOST);
    }

    public increaseScore(score: number): void {
        this.sendNotification(Notifications.ADD_TO_SCORE, score);
    }

    public get extraLivesUpdgrade(): number {
        return this.gameModel.getUpgradeValue(Constants.UPGRADE_LIVES);
    }   
    
    public get bladeWidthUpgrade(): number {
        return this.gameModel.getUpgradeValue(Constants.UPGRADE_BLADEWIDTH);
    }   
        
    // getter / setter
    public get name():string {
        return GameplayMediator.MEDIATOR_NAME;
    }

    public get viewComp(): Gameplay {
        return <Gameplay>this.viewComponent;
    }
}