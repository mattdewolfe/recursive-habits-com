import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';

export default class MenuMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'menuMediator';
		
    public get audioSpriteData(): any {
        return this.gameModel.getData()['audiosprite'];
    }

    public get levelData(): void {
        return this.gameModel.getLevelData('menu');
    }    
    
    // getter / setter
    public get name():string {
        return MenuMediator.MEDIATOR_NAME;
    }
}