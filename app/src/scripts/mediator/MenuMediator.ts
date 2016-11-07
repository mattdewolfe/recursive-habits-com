import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';

export default class MenuMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'menuMediator';
		
    public getRandomInsult(): string {
        return this.gameModel.generateInsult();
    }
    
    public getRandomShipTitle(): string {
        return this.gameModel.generateShipName();
    }
    
    public getPresetShipNames(): string[] {
        return this.gameModel.singleShipNames;
    }

    public getRandomPlayerName(): string {
        return this.gameModel.generatePlayerName();
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