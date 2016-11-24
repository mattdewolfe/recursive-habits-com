import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import LoginMediator from '../mediator/LoginMediator';
import RHButton from '../display/RHButton';
import PlayerTextInput from '../input/PlayerTextInput';

export default class Menu extends BaseState {
    protected _buildComplete: boolean = false;
    protected _currentPresetName: number;
    
    protected _title: Phaser.Text;
    protected _bg: Phaser.Image;
    protected _currentField: PlayerTextInput = null;

    protected _loginInfo: { email: string, password: string };
    
    // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = LoginMediator.retrieveMediator(LoginMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new LoginMediator(this);
        }
    }
		
    // dijon.core.State overrides
    public listBuildSequence() {
        return [
            this._setupInputEvents
        ]
    }

    public afterBuild() {
        super.afterBuild();
        this._buildComplete = true;
    } 
    
    public clearVisuals(): void {
        this._title.destroy();
        this._bg.destroy();
    }

    protected _setupInputEvents(): void {
        let playBtn: RHButton = this._findPrefab("loginButton");
        if (playBtn !== null) {
            playBtn.onInputDown.add(this._onLoginPressed, this);
        }
        
        let email: PlayerTextInput = this._findPrefab('emailInput');
        if (email !== null) {
            email.events.onInputDown.add(this._selectedField, this);
            this._currentField = email;
        }

        let passw: PlayerTextInput = this._findPrefab('passwordInput');
        if (passw !== null) {
            passw.events.onInputDown.add(this._selectedField, this);
        }

        this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeyboardInput);
    }
    
    public handleKeyboardInput(key: Phaser.KeyCode): void {
        if (this._currentField === null) {
            return;
        }
        let character: string = this.game.input.keyboard.lastChar;
        if (!character) {
            this._currentField.removeLastCharacter();
        }
        // else if (character === Phaser.Key) {
        //     this._currentField.clearField();
        // }
        else if (character !== ' ' && character !== '') {
           this._currentField.updateLabel(character);
        }
    }

    private _selectedField(inputField: PlayerTextInput): void {
        this._currentField = inputField;
    }

    private _onLoginPressed(): void {
        let email: PlayerTextInput = this._findPrefab('emailInput');
        let passw: PlayerTextInput = this._findPrefab('passwordInput');
        if (passw !== null && email !== null) {
            this._loginInfo = { email: email.inputText, password: passw.inputText };
            this.attemptLogin();
        }
    }   

    public onLoginError(error: any, authData: any): void {
        if (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                this.firebase.auth().createUserWithEmailAndPassword(this._loginInfo.email, this._loginInfo.password).catch(this.onCreateUser, this);
            }
        }
        else {
            console.log(authData);
            console.log("Login Successful");
            this.mediator.requestStateChange(Constants.STATE_MENU);
        }
    }   

    public onCreateUser(error: any, userData: any): void {
        if (!error) {
            this.attemptLogin();
        }
    }

    public savePlayerData(snapshot: any): void {
        if (snapshot) {
            this.mediator.updateSaveData(snapshot);
        }
        else {
            let playerName = this._loginInfo.email.replace(/@.*/, "");
            let initData = this.mediator.saveData;
            this.firebase("player").child(initData.key()).set({
                name: playerName,
                wealth: initData.wealth,
                bestScore: initData.bestScore,
                lastScore: initData.lastScore,
                upgrades: initData.upgrades
            });
        }
        
    }
    
    public attemptLogin(): void {
        if (this.firebase.auth().currentUser) {
            this.firebase.auth().signOut();
        }
        let loginAttempt: any = this.firebase.auth().signInWithEmailAndPassword(this._loginInfo.email, this._loginInfo.password);
        loginAttempt.catch(this.onLoginError, this);
    }

    private _toggleSFX(): void {
        Constants.SFX_ENABLED = !Constants.SFX_ENABLED;
    }       

    public get realWidth(): number {
        return this.game.width;
    }

    public get realHeight(): number {
        return this.game.height;
    }

    private get mediator(): LoginMediator {
        return <LoginMediator>this._mediator;
    }
}
  