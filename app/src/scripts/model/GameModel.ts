import {Model} from 'dijon/mvc';

export enum ETitleType {
    AdjNounPronoun = 0, // Adjective, Noun, Pronoun 
    AdjNounActionNoun, // Adjective, Noun, Verb
    AdvHowAdjPro,
    AdvHowAdjVerb,
    AdjPronoun,
    PronounOfNoun,
    PronounOfAdjNoun,
    Max
}

export interface IWordData {
    adjectives: string[];
    nouns: {single: string, plural: string}[];
    actionVerbs: string[];
    pronouns: string[];
    adverbsHow: string[];
    actionNouns: string[];
}

export class GameModel extends Model {
    public static MODEL_NAME: string = "gameModel";

    public get name(): string {
        return GameModel.MODEL_NAME;
    }

    public get randomPronoun(): string {
        return this.data.pronouns[Math.round(Math.random() * (this.data.pronouns.length - 1))];
    }

    public get randomAdjective(): string {
        return this.data.adjectives[Math.round(Math.random() * (this.data.adjectives.length - 1))];
    }

    public get randomNoun(): {single: string, plural: string} {
        return this.data.nouns[Math.round(Math.random() * (this.data.nouns.length - 1))];
    }

    public get randomActionVerb(): string {
        return this.data.actionVerbs[Math.round(Math.random() * (this.data.actionVerbs.length - 1))];
    }

    public get randomAdverbHow(): string {
        return this.data.adverbsHow[Math.round(Math.random() * (this.data.adverbsHow.length - 1))];
    }

    public get randomActionNoun(): string {
        return this.data.actionNouns[Math.round(Math.random() * (this.data.actionNouns.length - 1))];
    }

    public generateTitle(): string {
        let newTitle: string = 'You...';
        let type: ETitleType = <ETitleType>(Math.round(Math.random() * (ETitleType.Max - 1)));

        switch (type) {
            case ETitleType.AdjNounPronoun:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                break;

            case ETitleType.AdvHowAdjPro:
                newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomPronoun;
                break;    

            case ETitleType.AdjPronoun:
                newTitle = this.randomAdjective + ' ' + this.randomPronoun;
                break;

            case ETitleType.PronounOfNoun:
                newTitle = this.randomPronoun + ' of ' + this.randomNoun.plural;
                break;

            case ETitleType.PronounOfAdjNoun:
                newTitle = this.randomPronoun + ' of ' + this.randomAdjective + ' ' + this.randomNoun.plural;
                break;

            case ETitleType.AdvHowAdjVerb:
                newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomActionNoun;
                break;
            
            case ETitleType.AdjNounActionNoun:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomActionNoun;
                break;

            default:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                break;
        }
        return newTitle;
    }

    private get data(): IWordData {
        return <IWordData>this._data['main'];
    }
}