import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';
import {ETitleType} from '../model/gameModel';

export default class MenuMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'menuMediator';
		
    public getRandomTitle(): string {
        return this.gameModel.generateTitle();
    }
    
    public getRandomShipTitle(): string {
        return this.gameModel.generateShipName();
    }
    
    public requestTTSAudio(readText: string): void {
        this.sendNotification(Notifications.REQUEST_TTS_AUDIO, readText);
    }

    public get audioSpriteData(): any {
        return this.gameModel.getData()['audiosprite'];
    }

    // getter / setter
    public get name():string {
        return MenuMediator.MEDIATOR_NAME;
    }
}