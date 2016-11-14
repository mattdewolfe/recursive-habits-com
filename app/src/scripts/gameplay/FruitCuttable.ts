import RHPrefab from '../display/RHPrefab';
import { ICuttableData } from '../utils/Interfaces';

export default class FruitCuttable extends RHPrefab {
    public static DEFAULT_GRAVITY: number;

    public static TYPES: {bomb: string, fruit: string, special: string} = {
        bomb: "bomb",
        fruit: "fruit",
        special: "special"
    }

    protected _cutType: string;
    protected _velocity: Phaser.Point;
    
    constructor(name: string, position: {x: number, y: number}, data: ICuttableData) {
        super(name, position, data);

        if (FruitCuttable.TYPES.hasOwnProperty(data.prop.cuttableType)) {
            this._cutType = data.prop.cuttableType;
        }   
        else {
            this._cutType = FruitCuttable.TYPES.fruit;
        }
                
        this.game.physics.arcade.enableBody(this);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this._velocity = new Phaser.Point(1, 1);
        this.body.velocity.y = -this._velocity.y;
        this.body.velocity.x = this._velocity.x;
        this.body.gravity.y = FruitCuttable.DEFAULT_GRAVITY;
    }

    public setSpawnVelocity(newX: number, newY: number): void {
        this._velocity.x = newX;
        this._velocity.y = -newY;
        this.body.gravity.y = FruitCuttable.DEFAULT_GRAVITY;
    }   
    
    public reset(newX: number, newY: number): Phaser.Sprite {
        super.reset(newX, newY);
        this.body.velocity.x = this._velocity.x;
        this.body.velocity.y = this._velocity.y;
        return this;
    }

    public cutObject(): string {
        let emitter = this.game.add.emitter(this.x, this.y);
        emitter.makeParticles(this.key, 'particle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 700, null, 500);
        if (this._cutType === FruitCuttable.TYPES.special) {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.body.gravity.y = 0;
            this.game.time.events.add(1000, this.kill, this);
        }
        else {
            this.kill();
        }
        return this._cutType;
    }

    public get objectType(): string {
        return this._cutType;
    }
}