export interface ISceneData {
    assetEntry: string;
    groups: string[];
    prefabs: IPrefabData[];
}

export interface IPrefabData {
    type: string;
    position: { x: number, y: number };
    prop: any;
    group?: string;
}

export interface ISpriteData extends IPrefabData {
    prop: {
        key: string;
        frame: string;
        anchor?: { x: number, y: number };
        pivot?: string;
        scale?: { x: number, y: number };
        angle?: number;
    }
}

export interface ITextData extends IPrefabData {
    prop: ITextComponentData;
}

export interface IButtonData extends IPrefabData {
    prop: {
        key: string;
        frame: string;
        altFrame?: string;
        useHand?: boolean;
        forceOut?: boolean;
        text?: ITextComponentData;
        angle?: number;
        anchor?: { x: number, y: number };
        pivot?: string;
    }
}

export interface ITextComponentData {
    copy: string;
    fontName: string;
    fontSize: number;
    fontColour?: string;
    altColour?: string;
    align?: string;
    wrapWidth?: number;
    position?: { x: number, y: number };
    shadow?: { x: number, y: number, colour: string };
    anchor?: { x: number, y: number };
    pivot?: string;
}