import {INotification} from 'dijon/interfaces';
import Constants from "../utils/Constants";
import BaseMediator from './BaseMediator';
import Notifications from '../utils/Notifications';

export default class PreloadMediator extends BaseMediator {
    public static MEDIATOR_NAME: string = 'preloadMediator';
		
    // public methods
    // called from Preload state

    public notifyPreloadComplete(): void {
        this.sendNotification(Notifications.PRELOAD_COMPLETE);
    }   
    
    public next(): void{
        this.requestStateChange(Constants.STATE_MENU);
    }
		
    // getter / setter
    public get name() {
        return PreloadMediator.MEDIATOR_NAME;
    }
}