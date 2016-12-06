export interface IPlayerSaveData {
    wealth: number;
    bestScore: number;
    lastScore: number;
    upgrades: IUpgradeData[];
}

export interface ISceneData {
    assetEntry: string;
    groups: string[];
    prefabs: IPrefabData[];
}

export interface IPrefabData {
    name: string;
    type: string;
    position: { x: number, y: number };
    prop: any;
    group?: string;
    comps?: IPrefabData[];
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

export interface IButtonData extends IPrefabData {
    prop: {
        key: string;
        frame: string;
        hideCharacters: boolean;
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
    name: string;
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

export interface ITextData extends IPrefabData {
    prop: ITextComponentData;
}

export interface ISpawnerData extends IPrefabData {
    cuttable:  ICuttableData,
    spawn: {
        poolSize: number;
        timeRange: { min: number, max: number };
        velX: { min: number, max: number };
        velY: { min: number, max: number };
    }
}

export interface ICuttableData extends IPrefabData {
    prop: {
        key: string;
        frames: string[];
        cuttableType: string;
        anims: string[];
    }
}

export interface IUpgradeButtonData extends IButtonData {
    upgrade: IUpgradeData;
}

export interface IUpgradeData {
    price: number;
    description: string;
    upgradeType: string;
    effect: number;
}