import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';
import Store from '../state/Store';

export default class StoreMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'storemediator';

    public get playerGold(): number {
        return this.gameModel.currentPlayerGold;
    }

    public attemptToSpendGold(amount: number): boolean {
        if (this.gameModel.goldSpent(amount)) {
            this.sendNotification(Notifications.GOLD_CHANGED);
            return true;
        }
        return false;
    }    

    public notifyUpgradePurchased(uData: any): void {
        this.gameModel.addUpgrade(uData);
    }
    
    // getter / setter
    public get name():string {
        return StoreMediator.MEDIATOR_NAME;
    }

    public get store(): Store {
        return <Store>this._viewComponent;
    }
}