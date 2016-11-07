import {Model} from 'dijon/mvc';

export enum EInsultType {
    AdjNounPronoun = 0, // Adjective, Noun, Pronoun 
    AdjNounActionNoun, // Adjective, Noun, Verb
    AdvHowAdjPro,
    AdvHowAdjVerb,
    AdjPronoun,
    PronounOfNoun,
    PronounOfAdjNoun,
    Max
}

export interface INameData {
    first: string[];
    last: string[];
    adjective: string[];
    prefix: string[];
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
    ColourShipclass,
    TitleOfEmotion,
    NounsEmotion,
    TheColourTitle,
    TitlesEvent,
    EmotionTitle,
    NounsTitle,
    EmotionsNoun,
    Max
}

export enum ENameType {
    Adjective,
    FirstAdjective,
    Standard, 
    TitleStandard,
    Max
}

export interface IShipData {
    shipclass: string[];
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
        return this.insData.pronouns[this.getRandomIndexOf(this.insData.pronouns.length)];
    }

    public get randomAdjective(): string {
        return this.insData.adjectives[this.getRandomIndexOf(this.insData.adjectives.length)];
    }

    public get randomNoun(): {single: string, plural: string} {
        return this.insData.nouns[this.getRandomIndexOf(this.insData.nouns.length)];
    }

    public get randomActionVerb(): string {
        return this.insData.actionVerbs[this.getRandomIndexOf(this.insData.actionVerbs.length)];
    }

    public get randomAdverbHow(): string {
        return this.insData.adverbsHow[this.getRandomIndexOf(this.insData.adverbsHow.length)];
    }

    public get randomActionNoun(): string {
        return this.insData.actionNouns[this.getRandomIndexOf(this.insData.actionNouns.length)];
    }

    public get randomShipNoun(): {single: string, plural: string} {
        return this.shipData.noun[this.getRandomIndexOf(this.shipData.noun.length)];
    }

    public get randomShipTitle(): {single: string, plural: string} {
        return this.shipData.title[this.getRandomIndexOf(this.shipData.title.length)];
    }

    public get randomShipColour(): string {
        return this.shipData.colour[this.getRandomIndexOf(this.shipData.colour.length)];
    }

    public get randomShipEvent(): string {
        return this.shipData.event[this.getRandomIndexOf(this.shipData.event.length)];
    }

    public get randomShipEmotion(): { adjective: string, noun: string } {
        return this.shipData.emotion[this.getRandomIndexOf(this.shipData.emotion.length)];
    }

    public get randomShipClass(): string {
        return this.shipData.shipclass[this.getRandomIndexOf(this.shipData.shipclass.length)];
    }    

    public get singleShipNames(): string[]{
        return this.shipData.solo;
    }    

    public get randomNamePrefix(): string {
        return this.nameData.prefix[this.getRandomIndexOf(this.nameData.prefix.length)];
    }

    public get randomFirstName(): string {
        return this.nameData.first[this.getRandomIndexOf(this.nameData.first.length)];
    }   
    
    public get randomLastName(): string {
        return this.nameData.last[this.getRandomIndexOf(this.nameData.last.length)];
    }

    public get randomNameAdjective(): string {
        return this.nameData.adjective[this.getRandomIndexOf(this.nameData.adjective.length)];
    }
    
    public getRandomIndexOf(length: number): number {
        return this.game.rnd.between(0, length - 1);
    }
    
    public generateShipName(): string {
        let newTitle: string;
        let type: EShipType = <EShipType>(Math.round(Math.random() * (EShipType.Max - 1)));
        switch (type) {
            case EShipType.NounsEmotion:
                newTitle = this.randomShipNoun.single + "'s " + this.randomShipEmotion.noun;
                break;
            case EShipType.TheColourEvent:
                newTitle = "The " + this.randomShipColour + " " + this.randomShipEvent;
                break;
            case EShipType.TheColourNoun:
                newTitle = "The " + this.randomShipColour + " " + this.randomShipNoun.single;
                break;
            case EShipType.TheColourTitle:
                newTitle = this.randomShipColour + " " + this.randomShipTitle.single;
                break;
            case EShipType.TitleOfEmotion:
                newTitle = this.randomShipTitle.single + " of " + this.randomShipEmotion.noun;
                break;
            case EShipType.ColourShipclass:
                newTitle = this.randomShipColour + " " + this.randomShipClass;
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
    
    public generateInsult(): string {
        let newTitle: string = 'You...';
        let type: EInsultType = <EInsultType>(Math.round(Math.random() * (EInsultType.Max - 1)));

        switch (type) {
            case EInsultType.AdjNounPronoun:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                break;

            case EInsultType.AdvHowAdjPro:
                newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomPronoun;
                break;    

            case EInsultType.AdjPronoun:
                newTitle = this.randomAdjective + ' ' + this.randomPronoun;
                break;

            case EInsultType.PronounOfNoun:
                newTitle = this.randomPronoun + ' of ' + this.randomNoun.plural;
                break;

            case EInsultType.PronounOfAdjNoun:
                newTitle = this.randomPronoun + ' of ' + this.randomAdjective + ' ' + this.randomNoun.plural;
                break;

            case EInsultType.AdvHowAdjVerb:
                newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomActionNoun;
                break;
            
            case EInsultType.AdjNounActionNoun:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomActionNoun;
                break;

            default:
                newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                break;
        }
        return newTitle;
    }

    public generatePlayerName(): string {
        let newName: string = "";
        let type: ENameType = <ENameType>(Math.round(Math.random() * (ENameType.Max - 1)));
        switch (type) {
            case ENameType.Adjective:
                newName = this.randomNameAdjective;
                break;

            case ENameType.FirstAdjective:
                newName = this.randomFirstName + " " + this.randomNameAdjective;
                break;

            case ENameType.Standard:
                newName = this.randomFirstName + " " + this.randomLastName;
                break;

            case ENameType.TitleStandard:
                newName = this.randomNamePrefix + " " + this.randomFirstName + " " + this.randomLastName;
                break;
        }
        return newName;
    }   
    
    private get shipData(): IShipData {
        return <IShipData>this._data['ships'];
    }

    private get insData(): IWordData {
        return <IWordData>this._data['insults'];
    }

    private get nameData(): INameData {
        return <INameData>this._data['names'];
    }
}