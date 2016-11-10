export default class FruitCut extends Phaser.Graphics {

    public static COLOR: number;
    public static WIDTH: number;
    public static LIFE_TIME: number;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public drawCut(x: number, y: number, endX: number, endY: number): void {
        this.lineStyle(FruitCut.WIDTH, FruitCut.COLOR, 0.5);
        this.drawPolygon([x, y]);
        this.lineTo(endX, endY);
        this.game.time.events.add(Phaser.Timer.SECOND * FruitCut.LIFE_TIME, this.kill, this);
    }

    public kill(): Phaser.Graphics {
        super.kill();
        this.clear();
        return null;
    }
}