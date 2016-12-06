import RHButton from '../display/RHButton';
import { IButtonData } from '../utils/Interfaces';

export default class PlayerTextInput extends RHButton {

    protected _baseSize: number;
    protected _input: string;
    protected _hideCharacters: boolean;
    protected _firstInput: boolean;
    
    constructor(name: string, position: { x: number, y: number }, data: IButtonData) {
        super(name, position, data);
        this._firstInput = true;
        this._input = "";
        this._hideCharacters = data.prop.hideCharacters;
        this._baseSize = data.prop.text.fontSize;
    }

    public clearField(): void {
        this._input = "";
        this._label.text = "";
        this._updateInput();
    }    

    public updateLabel(character: string): void {
        if (this._firstInput === true) {
            this._firstInput = false;
            this.clearField();
        }
        this._label.text += this._hideCharacters ? '*' : character;
        this._input += character;
        this._updateInput();
    }

    public removeLastCharacter(): void {
        if (this._firstInput === true) {
            this._firstInput = false;
            this.clearField();
            return;
        }
        if (this._label.text.length > 1) {
            this._label.text = this._label.text.slice(0, this._label.text.length - 1);
            this._input = this._input.slice(0, this._input.length - 1);
        }
        else if (this._label.text.length === 1) {
            this._label.text = "";
            this._input = "";
        }
        this._updateInput();
    }

    public get inputText(): string {
        return this._input;
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