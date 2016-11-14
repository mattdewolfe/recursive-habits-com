import BaseState from "./BaseState";
import Constants from '../utils/Constants';
import {Text} from 'dijon/display';
import {Placeholders} from 'dijon/utils';
import StoreMediator from '../mediator/StoreMediator';
import RHUpgradeItem from '../display/RHUpgradeItem';

export default class Store extends BaseState {

    protected _buildComplete: boolean = false;
    
   // Phaser.State overrides
    public init(levelData: any) {
        super.init(levelData);
        this._mediator = StoreMediator.retrieveMediator(StoreMediator.MEDIATOR_NAME, this);
        if (this._mediator === null) {
            this._mediator = new StoreMediator(this);
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

    protected _setupInputEvents(): void {
        let buttons: Phaser.Group = this.groups['store_items'];
        for (let i = 0; i < buttons.children.length; i++) {
            let upgrade = <RHUpgradeItem>buttons.getChildAt(i);
            upgrade.onInputDown.add(this.onUpgradePressed, this);
        }

        let quitBtn: Phaser.Button = <Phaser.Button>this._findPrefab('quitButton');
        console.log(quitBtn);
        if (quitBtn !== null) {
            quitBtn.onInputDown.addOnce(this._backToTitle, this);
        }
    }   
    
    protected _backToTitle(): void {
        console.log("back to menu");
        this.mediator.requestStateChange(Constants.STATE_MENU);
    }

    public onUpgradePressed(upgrade: RHUpgradeItem): void {
        if (this.mediator.attemptToSpendGold(upgrade.baseCost)) {
            upgrade.disableButton();
            this.mediator.notifyUpgradePurchased(upgrade.upgradeData);
        }
        else {
            upgrade.flashCost();
        }
    }

    public get realWidth(): number {
        return this.game.width;
    }

    public get realHeight(): number {
        return this.game.height;
    }

    private get mediator(): StoreMediator {
        return <StoreMediator>this._mediator;
    }
}
  