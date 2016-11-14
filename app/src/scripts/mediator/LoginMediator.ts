import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';
import Login from '../state/Login';

export default class LoginMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'loginmediator';

    public get saveData(): any {
        return this.gameModel.saveData;
    }    

    public updateSaveData(snapshot: any): void {
        this.gameModel.updateSaveData(snapshot);
    }
    
    // getter / setter
    public get name():string {
        return LoginMediator.MEDIATOR_NAME;
    }

    public get login(): Login {
        return <Login>this._viewComponent;
    }
}