import {Application} from "dijon/application";
import {Game} from "dijon/core";
import {Device} from "dijon/utils";
import {CopyModel} from "dijon/mvc";

import ApplicationMediator from "./mediator/ApplicationMediator";
import Constants from "./utils/Constants";
import Notifications from "./utils/Notifications";
import Boot from "./state/Boot";
import Preload from "./state/Preload";
import Menu from "./state/Menu";
import {GameModel} from "./model/GameModel";

export default class BoilerplateApplication extends Application {
    public gameId: string = null;
    public responsiveVoice: any;
    
    constructor() {
        super();
    }

    // overrides
    public createGame() {
        this.game = new Game({
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

    public preloadComplete(): void {
        this.responsiveVoice = window['responsiveVoice'];
    }

    public ttsText(readText: string): void {
        if (readText === null || Constants.SFX_ENABLED === false) {
            return;
        }
        this.responsiveVoice.speak(readText);
    }

    public adjustScaleSettings(): void {
        if (Device.cocoon) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        }
        else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(256, 192, 1024, 768);
            this.game.scale.pageAlignHorizontally = true;
        }
    }

    public adjustRendererSettings(): void {
        this.game.stage.disableVisibilityChange = true;
        this.game.forceSingleUpdate = true;
        this.game.camera.roundPx = false;
        this.game.renderer.renderSession.roundPixels = false;
        this.game.antialias = true;
        this.game.renderer.clearBeforeRender = this.game.renderType === Phaser.CANVAS;
    }

    // called from the boot state as we can't initialize plugins until the game is booted
    public registerModels(): void {
        const gameModel = new GameModel('game_data');
        const copyModel = new CopyModel('copy');
    }

    // private methods
    // adds states
    private _addStates() {
        this.game.state.add(Constants.STATE_BOOT, Boot);
        this.game.state.add(Constants.STATE_PRELOAD, Preload);
        this.game.state.add(Constants.STATE_MENU, Menu);
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