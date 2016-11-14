import { Game } from 'dijon/core';
import { IGameConfig } from 'dijon/interfaces';

export default class RHGame extends Game {
    public firebase: any;

    constructor(config: IGameConfig) {
        super(config);
        this.firebase = window['firebase'];
        console.log(this.firebase);
    }
}