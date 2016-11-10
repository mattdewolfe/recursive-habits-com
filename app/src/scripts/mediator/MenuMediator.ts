import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';
import Menu from '../state/Menu';

export default class MenuMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'menuMediator';
		
    public get audioSpriteData(): any {
        return this.gameModel.getData()['audiosprite'];
    }  
    
    // getter / setter
    public get name():string {
        return MenuMediator.MEDIATOR_NAME;
    }

    public get menu(): Menu {
        return <Menu>this._viewComponent;
    }
}