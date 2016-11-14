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
    protected _cutLine: Phaser.Line;

    // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = new GameplayMediator();
        this._swipeStarted = false;
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
            this._initStatsAndUpgrades,
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
    
    protected _initStatsAndUpgrades(): void {
        FruitCut.COLOR = 0xbfbfbf;
        FruitCut.WIDTH = 3 + this.mediator.bladeWidthUpgrade;
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
            this._cutLine = new Phaser.Line(this._startSwipePt.x, this._startSwipePt.y, pointer.x, pointer.y);
            let cut: FruitCut = this._drawCut();
            let spawners: Phaser.Group = this.groups["spawners"];
            if (spawners === null) {
                return;
            }
            for (let i = 0; i < spawners.children.length; i++){
                let nextGroup = <Phaser.Group>spawners.getChildAt(i);
                nextGroup.forEachAlive(this._checkCollisions, this, cut);
            }
        }
    }

    protected _drawCut(): FruitCut {
        let cut = new FruitCut(this.game);
        this.groups["cuts"].addChild(cut);
        cut.drawCut(this._cutLine.start.x, this._cutLine.start.y, this._cutLine.end.x, this._cutLine.end.y);
        return cut;
    }   

    protected _checkCollisions(cuttable: Phaser.Sprite, cut: FruitCut): void {
        if (cuttable.body) {
            let line1 = new Phaser.Line(cuttable.left, cuttable.bottom, cuttable.left, cuttable.top);
            let line2 = new Phaser.Line(cuttable.left, cuttable.top, cuttable.right, cuttable.top);
            let line3 = new Phaser.Line(cuttable.right, cuttable.top, cuttable.right, cuttable.bottom);
            let line4 = new Phaser.Line(cuttable.right, cuttable.bottom, cuttable.left, cuttable.bottom);
            
            let intersection = this._cutLine.intersects(line1) || this._cutLine.intersects(line2) || this._cutLine.intersects(line3) || this._cutLine.intersects(line4);
            if (intersection) {
                this._onObjectCut((<FruitCuttable>cuttable).cutObject());
            }
        }
    }

    protected _onObjectCut(type: string): void {
        switch (type) {
            case FruitCuttable.TYPES.fruit:
                this.mediator.increaseScore(1);
                break;

            case FruitCuttable.TYPES.bomb:
                this.mediator.decreaseLives();
                break;

            case FruitCuttable.TYPES.special:
                this.mediator.increaseScore(1);
                break;
        }
    }   
    
    protected _startSpawners(): void {
        let spawners: Phaser.Group = this.groups['spawners'];
        spawners.callAll("queueNextSpawn", null);
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
  