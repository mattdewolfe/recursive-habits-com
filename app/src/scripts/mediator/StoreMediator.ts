import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';
import Store from '../state/Store';

export default class StoreMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'storemediator';

    // getter / setter
    public get name():string {
        return StoreMediator.MEDIATOR_NAME;
    }

    public get store(): Store {
        return <Store>this._viewComponent;
    }
}