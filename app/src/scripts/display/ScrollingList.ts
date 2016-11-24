import { Group, Text } from 'dijon/display';

export default class ScrollingList extends Group {

    protected _timeLine: Text[];
    protected _maxHeight: number;
    protected _spacing: number;
    
    constructor(x: number, y: number, name?: string) {
        super(x, y, name ? name : 'ScollingList');
    }

    public initialize(maxHeight: number, fontSize: number, fontColor: string, fontName: string): void {
        this._spacing = Math.floor(fontSize * 1.5);
        this._timeLine = [];
        this._maxHeight = maxHeight - this.y;
        let entries: number = Math.floor(maxHeight / this._spacing);

        for (let i = 0; i < entries; i++) {
            let text = new Text(0, 0, 'emtpy', fontName, fontSize, fontColor, 'center', true, this.game.width * 0.4, -8);
            text.centerPivot();
            this.addChild(text);
            text.kill();
        }
    }

    public showNextName(name: string): void {
        let text: Text = <Text>this.getFirstDead();
        if (text === null) {
            this.killLastChild(name);
        }
        console.log("creating " + name);
        this._timeLine.push(text);
        text.text = name.toLowerCase();
        text.centerPivot();
        text.y = 0;
        text.alpha = 1;
        text.revive();
        this.forEachAlive(this._shiftDown, this);
    }

    protected _shiftDown(child: Text): void {
        child.y += this._spacing + 10;
        if (child.y > this._maxHeight) {
            this.killLastChild();
        }
    }   
    
    // Will remove the longest living child in this Group
    // And optionally create one if a string is passed in.
    public killLastChild(andCreate?: string): void {
        if (this._timeLine.length < 1) {
            if (andCreate) {
                this.showNextName(andCreate);
            }
            return;
        }

        let old = this._timeLine.shift();
        this.game.add.tween(old).to({ alpha: 0 }, 300, Phaser.Easing.Cubic.In, true).onComplete.add(() => {
            old.kill();
            if (andCreate) {
                this.showNextName(andCreate);
            }
        });

    }
}