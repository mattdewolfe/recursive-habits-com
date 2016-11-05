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

export enum EShipType {
    TheColourNoun,
    TheColourEvent,
    TitleOfNouns,
    TitleOfEmotion,
    NounsEmotion,
    TheColourTitle,
    TitlesEvent,
    EmotionTitle,
    NounsTitle,
    EmotionsNoun,
    Max
}

export interface IShipData {
    solo: string[];
    noun: { single: string, plural: string }[];
    emotion: { adjective: string, noun: string }[];
    colour: string[];
    event: string[];
    title: { single: string, plural: string }[];
}

export class GameModel extends Model {
    public static MODEL_NAME: string = "gameModel";

    public get name(): string {
        return GameModel.MODEL_NAME;
    }

    public get randomPronoun(): string {
        return this.insData.pronouns[Math.round(Math.random() * (this.insData.pronouns.length - 1))];
    }

    public get randomAdjective(): string {
        return this.insData.adjectives[Math.round(Math.random() * (this.insData.adjectives.length - 1))];
    }

    public get randomNoun(): {single: string, plural: string} {
        return this.insData.nouns[Math.round(Math.random() * (this.insData.nouns.length - 1))];
    }

    public get randomActionVerb(): string {
        return this.insData.actionVerbs[Math.round(Math.random() * (this.insData.actionVerbs.length - 1))];
    }

    public get randomAdverbHow(): string {
        return this.insData.adverbsHow[Math.round(Math.random() * (this.insData.adverbsHow.length - 1))];
    }

    public get randomActionNoun(): string {
        return this.insData.actionNouns[Math.round(Math.random() * (this.insData.actionNouns.length - 1))];
    }

    public get randomShipNoun(): {single: string, plural: string} {
        return this.shipData.noun[Math.round(Math.random() * (this.shipData.noun.length - 1))];
    }

    public get randomShipTitle(): {single: string, plural: string} {
        return this.shipData.title[Math.round(Math.random() * (this.shipData.title.length - 1))];
    }

    public get randomShipColour(): string {
        return this.shipData.colour[Math.round(Math.random() * (this.shipData.colour.length - 1))];
    }

    public get randomShipEvent(): string {
        return this.shipData.event[Math.round(Math.random() * (this.shipData.event.length - 1))];
    }

    public get randomShipEmotion(): { adjective: string, noun: string } {
        return this.shipData.emotion[Math.round(Math.random() * (this.shipData.emotion.length - 1))];
    }

    public get singleShipNames(): string[]{
        return this.shipData.solo;
    }    

    public generateShipName(): string {
        let newTitle: string;
        let type: EShipType = <EShipType>(Math.round(Math.random() * (EShipType.Max - 1)));
        switch (type) {
            case EShipType.NounsEmotion:
                newTitle = "The " + this.randomShipNoun.single + "'s " + this.randomShipEmotion.noun;
                break;
            case EShipType.TheColourEvent:
                newTitle = "The " + this.randomShipColour + " " + this.randomShipEvent;
                break;
            case EShipType.TheColourNoun:
                newTitle = "The " + this.randomShipColour + " " + this.randomShipNoun.single;
                break;
            case EShipType.TheColourTitle:
                newTitle = "The " + this.randomShipColour + " " + this.randomShipTitle.single;
                break;
            case EShipType.TitleOfEmotion:
                newTitle = this.randomShipTitle.single + " of " + this.randomShipEmotion.noun;
                break;
            case EShipType.TitleOfNouns:
                newTitle = this.randomShipTitle.single + " of " + this.randomShipNoun.plural;
                break;
            case EShipType.TitlesEvent:
                newTitle = this.randomShipTitle.single + "'s " + this.randomShipEvent;
                break;
            case EShipType.EmotionTitle:
                newTitle = "The " + this.randomShipEmotion.adjective + " " + this.randomShipTitle.single;
                break;
            case EShipType.NounsTitle:
                newTitle = "The " + this.randomShipNoun.single + "'s " + this.randomShipTitle.single;
                break;
            case EShipType.EmotionsNoun:
                newTitle = this.randomShipEmotion.adjective + " " + this.randomShipNoun.single;
                break;
        }
        return newTitle;
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

    private get shipData(): IShipData {
        return <IShipData>this._data['ships'];
    }

    private get insData(): IWordData {
        return <IWordData>this._data['insults'];
    }
}