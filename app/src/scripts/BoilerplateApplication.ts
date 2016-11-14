import {Application} from "dijon/application";
import RHGame from "./RHGame";
import {Device} from "dijon/utils";
import {CopyModel} from "dijon/mvc";

import ApplicationMediator from "./mediator/ApplicationMediator";
import Constants from "./utils/Constants";
import Notifications from "./utils/Notifications";
import Boot from "./state/Boot";
import Preload from "./state/Preload";
import Menu from "./state/Menu";
import Gameplay from './state/Gameplay';
import Store from './state/Store';
import Login from './state/Login';
import { GameModel } from "./model/GameModel";
import PrefabBuilder from './utils/PrefabBuilder';

export default class BoilerplateApplication extends Application {
    public gameId: string = null;
    
    constructor() {
        super();
    }

    // overrides
    public createGame() {
        this.game = new RHGame({
            width: this._getGameWidth(),
            height: this._getGameHeight(),
            parent: 'game-container',
            //renderer: Phaser.CANVAS,
            renderer: Phaser.AUTO,
            transparent: false,
            // use this if you want to switch between @2x and @1x graphics
            resolution: this._getResolution()
        });

        this._mediator = new ApplicationMediator(this);
        this._addStates();
    }

    // public methods
    public startGame(): void {
        this.game.state.start(Constants.STATE_BOOT);
    }

    public bootComplete(): void {
        this.adjustScaleSettings();
        this.adjustRendererSettings();
        this.addPlugins();
        PrefabBuilder.game = this.game;
    }    

    public adjustScaleSettings(): void {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setMinMax(256, 192, 1024, 768);
        this.game.scale.pageAlignHorizontally = true;
    }

    public adjustRendererSettings(): void {
        this.game.stage.disableVisibilityChange = true;
        this.game.forceSingleUpdate = true;
        this.game.camera.roundPx = false;
        this.game.renderer.renderSession.roundPixels = false;
        this.game.antialias = true;
    //    this.game.renderer.clearBeforeRender = this.game.renderType === Phaser.CANVAS;
    }

    // called from the boot state as we can't initialize plugins until the game is booted
    public registerModels(): void {
        const gameModel = new GameModel('game_data');
        const copyModel = new CopyModel('copy');
        this.gameModel.postBootLoad();
    }
    
    // private methods
    // adds states
    private _addStates() {
        this.game.state.add(Constants.STATE_BOOT, Boot);
        this.game.state.add(Constants.STATE_PRELOAD, Preload);
        this.game.state.add(Constants.STATE_MENU, Menu);
        this.game.state.add(Constants.STATE_GAME, Gameplay);
        this.game.state.add(Constants.STATE_STORE, Store);
        this.game.state.add(Constants.STATE_LOGIN, Login);
    }

    private _getGameWidth(): number {
        return window.innerWidth;
    }

    private _getGameHeight(): number {
        return window.innerHeight;
    }

    private _getResolution(): number {
        if (Application.queryVar('resolution') && !isNaN(Application.queryVar('resolution'))) {
            return Application.queryVar('resolution');
        }
        if (Device.mobile) {
            return Math.round(Device.pixelRatio);
        }
        else {
            return Math.round(window.devicePixelRatio);
        }
    }

    private _getRendererByDevice(): number {
        return Device.mobile && window.devicePixelRatio < 2 ? Phaser.CANVAS : Phaser.AUTO;
    }
    
    // getter / setter
    public get mediator(): ApplicationMediator {
        return <ApplicationMediator>this._mediator;
    }

    public get gameModel(): GameModel {
        return <GameModel>this.retrieveModel(GameModel.MODEL_NAME);
    }

    public get copyModel(): CopyModel {
        return <CopyModel>this.retrieveModel(CopyModel.MODEL_NAME);
    }
}