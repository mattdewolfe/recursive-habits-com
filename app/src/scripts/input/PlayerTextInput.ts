import RHButton from '../display/RHButton';
import { IButtonData } from '../utils/Interfaces';

export default class PlayerTextInput extends RHButton {

    protected _baseText: string;
    protected _baseSize: number;

    constructor(name: string, position: { x: number, y: number }, data: IButtonData) {
        super(name, position, data);
        if (this._label !== null) {
            this._baseText = this._label.text;
        }
        else {
            this._baseText = "";
        }
        this._baseSize = data.prop.text.fontSize;
    }

    public clearField(): void {
        this._label.text = "";
        this._updateInput();
    }    

    public updateLabel(character: string): void {
        if (this._label.text === this._baseText) {
            this._label.text = "";
        }
        this._label.text += character;
        this._updateInput();
    }

    public removeLastCharacter(): void {
        if (this._label.text.length > 0) {
            this._label.text.slice(this._label.text.length - 1, this._label.text.length);
        }
        this._updateInput();
    }

    public get inputText(): string {
        return this._label.text;
    }    
    
    protected _updateInput(): void {
        if (this._label.text.length > 32) {
            this._label.fontSize = this._baseSize / (this._label.text.length / 32);
        }
        else {
            this._label.fontSize = this._baseSize;
        }
        this._label.centerPivot();
    }
}