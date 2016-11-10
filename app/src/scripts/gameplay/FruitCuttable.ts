import RHPrefab from '../display/RHPrefab';
import { ICuttableData } from '../utils/Interfaces';

export default class FruitCuttable extends RHPrefab {
    
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
        this.body.gravity.y = 1000;
    }

    public setSpawnVelocity(newX: number, newY: number): void {
        this._velocity.x = newX;
        this._velocity.y = -newY;
    }   
    
    public reset(newX: number, newY: number): Phaser.Sprite {
        super.reset(newX, newY);
        this.body.velocity.y = this._velocity.y;
        this.body.velocity.x = this._velocity.x;
        return this;
    }

    public cutObject(): void {
        let emitter = this.game.add.emitter(this.x, this.y);
        emitter.makeParticles(this.key, 'particle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 700, null, 500);
    }
}