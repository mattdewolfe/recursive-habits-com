import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import GameplayMediator from '../mediator/GameplayMediator';
import RHButton from '../display/RHButton';
import FruitCut from '../gameplay/FruitCut';
import FruitCuttable from '../gameplay/FruitCuttable';
import Spawner from '../gameplay/Spawner';

export default class Gameplay extends BaseState {
    
    public static MIN_SWIPE_DISTANCE: number = 10;

    protected _swipeStarted: boolean = false;    

    protected _buildComplete: boolean = false;
    protected _startSwipePt: Phaser.Point;

    // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = new GameplayMediator();
        this._swipeStarted = false;
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
            this._initCutStatics,
            this._addInputEvents
        ]
    }

    public afterBuild() {
        super.afterBuild();
        this._buildComplete = true;
        this._startSpawners();
    } 

    public onGameOver(): void {
        console.log('game over man');
    }   
    
    protected _initCutStatics(): void {
        FruitCut.COLOR = 0xff0000;
        FruitCut.WIDTH = 5;
        FruitCut.LIFE_TIME = 0.25;
    }   
    
    protected _addInputEvents(): void {
        this.game.input.onDown.add(this._onInputDown, this);
        this.game.input.onUp.add(this._onInputUp, this);
    }   
    
    protected _onInputDown(pointer: Phaser.Point): void {
        this._swipeStarted = true;
        this._startSwipePt = new Phaser.Point(pointer.x, pointer.y);
    }

    protected _onInputUp(pointer: Phaser.Point): void {
        if (this._swipeStarted === false) {
            return;
        }
        this._swipeStarted = false;
        let distance = Phaser.Point.distance(this._startSwipePt, new Phaser.Point(pointer.x, pointer.y));
        if (distance >= Gameplay.MIN_SWIPE_DISTANCE) {
            let cut: FruitCut = this._drawCut(this._startSwipePt.x, this._startSwipePt.y, pointer.x, pointer.y);
            let cuttables: Phaser.Group = this.groups["cuttables"];
            if (cuttables === null) {
                return;
            }
            cuttables.forEachAlive(this._checkCollisions, this, cut);
        }
    }

    protected _drawCut(x: number, y: number, endX: number, endY: number): FruitCut {
        let cut = new FruitCut(this.game);
        this.groups["cuts"].addChild(cut);
        cut.drawCut(x, y, endX, endY);
        return cut;
    }   

    protected _checkCollisions(cuttable: Phaser.Sprite, cut: FruitCut): void {
        if (cuttable.body.overlaps(cut)) {
            (<FruitCuttable>cuttable).cutObject();
        }
    }

    protected _startSpawners(): void {
        let normal: Spawner = this._findPrefab("fruitSpawner");
        if (normal === null) {
            return;
        }
        normal.queueNextSpawn();
    }
    
    private _toggleSFX(): void {
        Constants.SFX_ENABLED = !Constants.SFX_ENABLED;
    }       

    public get realWidth(): number {
        return this.game.width;
    }

    public get realHeight(): number {
        return this.game.height;
    }

    private get mediator(): GameplayMediator {
        return <GameplayMediator>this._mediator;
    }
}
  