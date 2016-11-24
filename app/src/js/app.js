var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("RHGame", ['dijon/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var RHGame;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RHGame = (function (_super) {
                __extends(RHGame, _super);
                function RHGame(config) {
                    _super.call(this, config);
                    this.firebase = window['firebase'];
                    console.log(this.firebase);
                }
                return RHGame;
            }(core_1.Game));
            exports_1("default", RHGame);
        }
    }
});
System.register("utils/Interfaces", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("utils/Constants", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Constants;
    return {
        setters:[],
        execute: function() {
            Constants = (function () {
                function Constants() {
                }
                Constants.STATE_BOOT = 'boot';
                Constants.STATE_PRELOAD = 'preload';
                Constants.STATE_MENU = 'menu';
                Constants.STATE_GAME = 'gameplay';
                Constants.STATE_STORE = 'store';
                Constants.STATE_LOGIN = 'login';
                Constants.FONT_RALEWAY = 'raleway';
                Constants.PLAYER_SAVE_DATA = 'playersavedata';
                Constants.STR_BLUE = '#0099e6';
                Constants.STR_NEW_TITLE = '#ffffff';
                Constants.STR_BTN_HOVER = '#ccffcc';
                Constants.STR_BTN_NORMAL = '#666699';
                Constants.NUM_ORANGE_BORDER = 0xffb866;
                Constants.NUM_ORANGE_BOX = 0xe67a00;
                Constants.BUTTON_NORMAL = 0xe6e6e6;
                Constants.BUTTON_HOVER = 0xff941a;
                Constants.BUTTON_DOWN = 0x00aaff;
                Constants.UPGRADE_BLADEWIDTH = 'bladeWidth';
                Constants.UPGRADE_LIVES = 'extraLife';
                Constants.SFX_ENABLED = true;
                return Constants;
            }());
            exports_3("default", Constants);
        }
    }
});
System.register("model/GameModel", ['dijon/mvc', "utils/Constants"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var mvc_1, Constants_1;
    var GameModel;
    return {
        setters:[
            function (mvc_1_1) {
                mvc_1 = mvc_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }],
        execute: function() {
            GameModel = (function (_super) {
                __extends(GameModel, _super);
                function GameModel() {
                    _super.apply(this, arguments);
                }
                GameModel.prototype.postBootLoad = function () {
                    this._saveData = this.game.storage.getFromLocalStorage(Constants_1.default.PLAYER_SAVE_DATA, true);
                    if (this._saveData === null) {
                        this._createSaveData();
                    }
                    this._saveData.wealth += 200;
                };
                GameModel.prototype.saveLocalData = function () {
                    this.game.storage.saveToLocalStorage(Constants_1.default.PLAYER_SAVE_DATA, this._saveData);
                };
                GameModel.prototype.getUpgradeValue = function (type) {
                    var value = 0;
                    for (var i = 0; i < this._saveData.upgrades.length; i++) {
                        if (this._saveData.upgrades[i].upgradeType === type) {
                            value += this._saveData.upgrades[i].effect;
                        }
                    }
                    return value;
                };
                GameModel.prototype._createSaveData = function () {
                    this._saveData = {};
                    this._saveData.wealth = 50;
                    this._saveData.bestScore = 0;
                    this._saveData.lastScore = 0;
                    this._saveData.upgrades = [];
                };
                GameModel.prototype.updateSaveData = function (newData) {
                    this._saveData = newData;
                };
                GameModel.prototype.addUpgrade = function (data) {
                    this._saveData.upgrades.push(data);
                    console.log("Added Upgrade: " + data.upgradeType + " to player upgrade data");
                    this.saveLocalData();
                };
                GameModel.prototype.goldSpent = function (amount) {
                    if (amount <= this.currentPlayerGold) {
                        this._saveData.wealth -= amount;
                        console.log("Spent: " + amount + " gold");
                        return true;
                    }
                    return false;
                };
                Object.defineProperty(GameModel.prototype, "saveData", {
                    get: function () {
                        return this._saveData;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "currentPlayerGold", {
                    get: function () {
                        return this._saveData.wealth;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "name", {
                    get: function () {
                        return GameModel.MODEL_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameModel.prototype.getLevelData = function (name) {
                    return this._data[name];
                };
                GameModel.MODEL_NAME = "gameModel";
                return GameModel;
            }(mvc_1.Model));
            exports_4("GameModel", GameModel);
        }
    }
});
System.register("mediator/BaseMediator", ["dijon/mvc", "dijon/application", "model/GameModel"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var mvc_2, application_1, GameModel_1;
    var BaseMediator;
    return {
        setters:[
            function (mvc_2_1) {
                mvc_2 = mvc_2_1;
            },
            function (application_1_1) {
                application_1 = application_1_1;
            },
            function (GameModel_1_1) {
                GameModel_1 = GameModel_1_1;
            }],
        execute: function() {
            BaseMediator = (function (_super) {
                __extends(BaseMediator, _super);
                function BaseMediator() {
                    _super.apply(this, arguments);
                }
                BaseMediator.prototype.getCopy = function (groupId, textId) {
                    return this.copyModel.getCopy(groupId, textId);
                };
                Object.defineProperty(BaseMediator.prototype, "gameModel", {
                    get: function () {
                        return application_1.Application.getInstance().retrieveModel(GameModel_1.GameModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseMediator.prototype, "copyModel", {
                    get: function () {
                        return application_1.Application.getInstance().retrieveModel(mvc_2.CopyModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseMediator.prototype.requestStateChange = function (newState) {
                    this.game.transition.to(newState, this.gameModel.getLevelData(newState));
                };
                Object.defineProperty(BaseMediator.prototype, "levelData", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseMediator.prototype, "name", {
                    get: function () {
                        return "baseMediator_" + this.game.rnd.uuid();
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseMediator.retrieveMediator = function (name, viewComp) {
                    var mediator = application_1.Application.getInstance().retrieveMediator(name);
                    if (mediator !== null) {
                        mediator.viewComponent = viewComp;
                    }
                    return mediator;
                };
                return BaseMediator;
            }(mvc_2.Mediator));
            exports_5("default", BaseMediator);
        }
    }
});
System.register("utils/Notifications", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Notifications;
    return {
        setters:[],
        execute: function() {
            Notifications = (function () {
                function Notifications() {
                }
                Notifications.BOOT_INIT = 'bootInit';
                Notifications.BOOT_COMPLETE = 'bootComplete';
                Notifications.PRELOAD_COMPLETE = 'preloadComplete';
                Notifications.LIFE_LOST = 'lifelost';
                Notifications.LIFE_EARNED = 'lifeearned';
                Notifications.GAME_LEVEL_FAILED = 'gamelevelfailed';
                Notifications.ADD_TO_SCORE = 'addtoscore';
                Notifications.GOLD_CHANGED = 'goldchanged';
                return Notifications;
            }());
            exports_6("default", Notifications);
        }
    }
});
System.register("mediator/ApplicationMediator", ["dijon/utils", "mediator/BaseMediator", "utils/Constants", "utils/Notifications"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var utils_1, BaseMediator_1, Constants_2, Notifications_1;
    var ApplicationMediator;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (BaseMediator_1_1) {
                BaseMediator_1 = BaseMediator_1_1;
            },
            function (Constants_2_1) {
                Constants_2 = Constants_2_1;
            },
            function (Notifications_1_1) {
                Notifications_1 = Notifications_1_1;
            }],
        execute: function() {
            ApplicationMediator = (function (_super) {
                __extends(ApplicationMediator, _super);
                function ApplicationMediator() {
                    _super.apply(this, arguments);
                }
                ApplicationMediator.prototype.listNotificationInterests = function () {
                    return [
                        Notifications_1.default.BOOT_INIT,
                        Notifications_1.default.BOOT_COMPLETE,
                        Notifications_1.default.PRELOAD_COMPLETE
                    ];
                };
                ApplicationMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_1.default.BOOT_INIT:
                            utils_1.Logger.log(this, 'Notifications.BOOT_INIT');
                            this.viewComponent.bootComplete();
                            break;
                        case Notifications_1.default.BOOT_COMPLETE:
                            utils_1.Logger.log(this, 'Notifications.BOOT_COMPLETE');
                            this.game.asset.setData(this.game.cache.getJSON('assets'));
                            this.viewComponent.registerModels();
                            this.game.transition.to(Constants_2.default.STATE_PRELOAD);
                            break;
                    }
                };
                Object.defineProperty(ApplicationMediator.prototype, "viewComponent", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationMediator.prototype, "name", {
                    get: function () {
                        return ApplicationMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                ApplicationMediator.MEDIATOR_NAME = 'ApplicationMediator';
                return ApplicationMediator;
            }(BaseMediator_1.default));
            exports_7("default", ApplicationMediator);
        }
    }
});
System.register("display/RHPrefab", ['dijon/display'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var display_1;
    var RHPrefab;
    return {
        setters:[
            function (display_1_1) {
                display_1 = display_1_1;
            }],
        execute: function() {
            RHPrefab = (function (_super) {
                __extends(RHPrefab, _super);
                function RHPrefab(name, position, data) {
                    _super.call(this, position.x, position.y, data.prop.key, data.prop.frame);
                    this.name = name;
                    if (data.prop.anchor) {
                        this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
                    }
                    if (data.prop.pivot) {
                        this.setPivot(data.prop.pivot);
                    }
                    if (data.prop.scale) {
                        this.scale.setTo(data.prop.scale.x, data.prop.scale.y);
                    }
                    if (data.prop.angle) {
                        this.angle = data.prop.angle;
                    }
                }
                return RHPrefab;
            }(display_1.Sprite));
            exports_8("default", RHPrefab);
        }
    }
});
System.register("display/RHText", ['dijon/display'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var display_2;
    var Prefab;
    return {
        setters:[
            function (display_2_1) {
                display_2 = display_2_1;
            }],
        execute: function() {
            Prefab = (function (_super) {
                __extends(Prefab, _super);
                function Prefab(name, position, data) {
                    _super.call(this, position.x, position.y, data.prop.copy, data.prop.fontName, data.prop.fontSize, data.prop.fontColour, data.prop.align ? data.prop.align : 'center', data.prop.wrapWidth !== undefined, data.prop.wrapWidth ? data.prop.wrapWidth : 0);
                    this.name = name;
                    if (data.prop.anchor) {
                        this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
                    }
                    if (data.prop.shadow) {
                        this.setShadow(data.prop.shadow.x, data.prop.shadow.y, data.prop.shadow.colour);
                    }
                    this.x = Math.round(this.x);
                    this.y = Math.round(this.y);
                }
                return Prefab;
            }(display_2.Text));
            exports_9("default", Prefab);
        }
    }
});
System.register("display/RHButton", ['dijon/application', 'dijon/display'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var application_2, display_3;
    var RHButton;
    return {
        setters:[
            function (application_2_1) {
                application_2 = application_2_1;
            },
            function (display_3_1) {
                display_3 = display_3_1;
            }],
        execute: function() {
            RHButton = (function (_super) {
                __extends(RHButton, _super);
                function RHButton(name, position, data) {
                    _super.call(this, application_2.Application.getInstance().game, position.x, position.y, data.prop.key, null, null, data.prop.frame + '_hover', data.prop.frame + '_normal', data.prop.frame + '_hover', data.prop.frame + '_normal');
                    this.name = name;
                    this._enabledFrame = data.prop.frame;
                    this._disabledFrame = data.prop.altFrame !== undefined ? data.prop.altFrame : data.prop.frame;
                    this.forceOut = data.prop.forceOut ? data.prop.forceOut : false;
                    this.input.useHandCursor = data.prop.useHand ? data.prop.useHand : true;
                    if (data.prop.anchor) {
                        this.anchor.setTo(data.prop.anchor.x, data.prop.anchor.y);
                    }
                    if (data.prop.pivot) {
                        this.setPivot(data.prop.pivot);
                    }
                    if (data.prop.angle) {
                        this.angle = data.prop.angle;
                    }
                    if (data.prop.text) {
                        this._addLabel(data.prop.text);
                    }
                    else {
                        this._label = null;
                    }
                }
                RHButton.prototype._addLabel = function (data) {
                    var subPos = { x: data.position.x, y: data.position.y };
                    this._normalCopyColour = data.fontColour;
                    this._hoverCopyColour = data.altColour ? data.altColour : data.fontColour;
                    if (data.position.x > 0 && data.position.x < 1) {
                        subPos.x = this.realWidth * data.position.x;
                        subPos.y = this.realHeight * data.position.y;
                    }
                    this._label = new display_3.Text(subPos.x, subPos.y, data.copy, data.fontName, data.fontSize, data.fontColour ? data.fontColour : '#ffffff', data.align ? data.align : 'center');
                    if (data.anchor) {
                        this._label.anchor.setTo(data.anchor.x, data.anchor.y);
                    }
                    if (data.pivot) {
                        this._label.setPivot(data.pivot);
                    }
                    this.addChild(this._label);
                };
                RHButton.prototype.toggleEnabledFrame = function (isEnabled) {
                    if (isEnabled) {
                        this.updateBaseFrame(this._enabledFrame);
                    }
                    else {
                        this.updateBaseFrame(this._disabledFrame);
                    }
                };
                RHButton.prototype.onInputDownHandler = function (sprite, pointer) {
                    _super.prototype.onInputDownHandler.call(this, sprite, pointer);
                    if (this._label !== null) {
                        this._label.setColor(this._hoverCopyColour);
                    }
                };
                RHButton.prototype.onInputOverHandler = function (sprite, pointer) {
                    _super.prototype.onInputOverHandler.call(this, sprite, pointer);
                    if (this._label !== null) {
                        this._label.setColor(this._hoverCopyColour);
                    }
                };
                RHButton.prototype.onInputOutHandler = function (sprite, pointer) {
                    _super.prototype.onInputOutHandler.call(this, sprite, pointer);
                    if (this._label !== null) {
                        this._label.setColor(this._normalCopyColour);
                    }
                };
                RHButton.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
                    _super.prototype.onInputUpHandler.call(this, sprite, pointer, isOver);
                    if (this._label !== null) {
                        this._label.setColor(this._normalCopyColour);
                    }
                };
                RHButton.prototype.updateBaseFrame = function (base) {
                    this.setFrames(base + '_hover', base + '_normal', base + '_hover', base + '_normal');
                };
                Object.defineProperty(RHButton.prototype, "dgame", {
                    get: function () {
                        return this.game;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RHButton;
            }(Phaser.Button));
            exports_10("default", RHButton);
        }
    }
});
System.register("mediator/FruitLifeMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var BaseMediator_2, Notifications_2;
    var FruitLifeMediator;
    return {
        setters:[
            function (BaseMediator_2_1) {
                BaseMediator_2 = BaseMediator_2_1;
            },
            function (Notifications_2_1) {
                Notifications_2 = Notifications_2_1;
            }],
        execute: function() {
            FruitLifeMediator = (function (_super) {
                __extends(FruitLifeMediator, _super);
                function FruitLifeMediator() {
                    _super.apply(this, arguments);
                }
                FruitLifeMediator.prototype.listNotificationInterests = function () {
                    return [
                        Notifications_2.default.LIFE_LOST,
                        Notifications_2.default.LIFE_EARNED
                    ];
                };
                FruitLifeMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_2.default.LIFE_LOST:
                            this.lives.decreaseLives();
                            break;
                        case Notifications_2.default.LIFE_EARNED:
                            this.lives.increaseLives();
                            break;
                    }
                };
                FruitLifeMediator.prototype.notifyGameOver = function () {
                    this.sendNotification(Notifications_2.default.GAME_LEVEL_FAILED);
                };
                Object.defineProperty(FruitLifeMediator.prototype, "name", {
                    get: function () {
                        return FruitLifeMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FruitLifeMediator.prototype, "lives", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                FruitLifeMediator.MEDIATOR_NAME = 'storemediator';
                return FruitLifeMediator;
            }(BaseMediator_2.default));
            exports_11("default", FruitLifeMediator);
        }
    }
});
System.register("gameplay/FruitLife", ["display/RHPrefab", "mediator/FruitLifeMediator", 'dijon/display'], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var RHPrefab_1, FruitLifeMediator_1, display_4;
    var FruitLife;
    return {
        setters:[
            function (RHPrefab_1_1) {
                RHPrefab_1 = RHPrefab_1_1;
            },
            function (FruitLifeMediator_1_1) {
                FruitLifeMediator_1 = FruitLifeMediator_1_1;
            },
            function (display_4_1) {
                display_4 = display_4_1;
            }],
        execute: function() {
            FruitLife = (function (_super) {
                __extends(FruitLife, _super);
                function FruitLife(name, position, data) {
                    _super.call(this, 0, 0, name);
                    this._mediator = FruitLifeMediator_1.default.retrieveMediator(FruitLifeMediator_1.default.MEDIATOR_NAME, this);
                    if (this._mediator === null) {
                        this._mediator = new FruitLifeMediator_1.default(this);
                    }
                    this._livesRemaining = data.prop['lives'];
                    this._maxLives = this._livesRemaining * 2;
                    this._lifeVisuals = [];
                    for (var i = 0; i < this._maxLives; i++) {
                        var nextLife = new RHPrefab_1.default(name + '_life_' + i, { x: position.x + (data.prop['spacing'] * i), y: position.y }, data);
                        this.addChild(nextLife);
                        this._lifeVisuals.push(nextLife);
                        if (i >= this._livesRemaining) {
                            nextLife.alpha = 0;
                        }
                    }
                }
                FruitLife.prototype.decreaseLives = function () {
                    this._livesRemaining--;
                    if (this._livesRemaining === 0) {
                        this.mediator.notifyGameOver();
                    }
                    this._updateLivesDisplay();
                };
                FruitLife.prototype.increaseLives = function () {
                    if (this._livesRemaining < 3) {
                        this._livesRemaining++;
                    }
                    this._updateLivesDisplay();
                };
                FruitLife.prototype._updateLivesDisplay = function () {
                    for (var i = 0; i < this._maxLives; i++) {
                        this._lifeVisuals[i].alpha = i < this._livesRemaining ? 1 : 0;
                    }
                };
                Object.defineProperty(FruitLife.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return FruitLife;
            }(display_4.Group));
            exports_12("default", FruitLife);
        }
    }
});
System.register("mediator/FruitScoreMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var BaseMediator_3, Notifications_3;
    var FruitScoreMediator;
    return {
        setters:[
            function (BaseMediator_3_1) {
                BaseMediator_3 = BaseMediator_3_1;
            },
            function (Notifications_3_1) {
                Notifications_3 = Notifications_3_1;
            }],
        execute: function() {
            FruitScoreMediator = (function (_super) {
                __extends(FruitScoreMediator, _super);
                function FruitScoreMediator() {
                    _super.apply(this, arguments);
                }
                FruitScoreMediator.prototype.listNotificationInterests = function () {
                    return [
                        Notifications_3.default.ADD_TO_SCORE
                    ];
                };
                FruitScoreMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_3.default.ADD_TO_SCORE:
                            var amount = notification.getBody();
                            if (amount !== null) {
                                this.score.increaseBy(amount);
                            }
                            break;
                    }
                };
                FruitScoreMediator.prototype.notifyGameOver = function () {
                    this.sendNotification(Notifications_3.default.GAME_LEVEL_FAILED);
                };
                Object.defineProperty(FruitScoreMediator.prototype, "name", {
                    get: function () {
                        return FruitScoreMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FruitScoreMediator.prototype, "score", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                FruitScoreMediator.MEDIATOR_NAME = 'fruitscoremediator';
                return FruitScoreMediator;
            }(BaseMediator_3.default));
            exports_13("default", FruitScoreMediator);
        }
    }
});
System.register("gameplay/FruitScore", ["display/RHText", "mediator/FruitScoreMediator"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var RHText_1, FruitScoreMediator_1;
    var FruitScore;
    return {
        setters:[
            function (RHText_1_1) {
                RHText_1 = RHText_1_1;
            },
            function (FruitScoreMediator_1_1) {
                FruitScoreMediator_1 = FruitScoreMediator_1_1;
            }],
        execute: function() {
            FruitScore = (function (_super) {
                __extends(FruitScore, _super);
                function FruitScore(name, position, data) {
                    _super.call(this, name, position, data);
                    this._score = 0;
                    this._mediator = FruitScoreMediator_1.default.retrieveMediator(FruitScoreMediator_1.default.MEDIATOR_NAME, this);
                    if (this._mediator === null) {
                        this._mediator = new FruitScoreMediator_1.default(this);
                    }
                }
                FruitScore.prototype.increaseBy = function (amount) {
                    this._score += amount;
                    this.text = 'Fruits: ' + this._score.toString();
                };
                return FruitScore;
            }(RHText_1.default));
            exports_14("default", FruitScore);
        }
    }
});
System.register("gameplay/FruitCuttable", ["display/RHPrefab"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var RHPrefab_2;
    var FruitCuttable;
    return {
        setters:[
            function (RHPrefab_2_1) {
                RHPrefab_2 = RHPrefab_2_1;
            }],
        execute: function() {
            FruitCuttable = (function (_super) {
                __extends(FruitCuttable, _super);
                function FruitCuttable(name, position, data) {
                    _super.call(this, name, position, data);
                    if (FruitCuttable.TYPES.hasOwnProperty(data.prop.cuttableType)) {
                        this._cutType = data.prop.cuttableType;
                    }
                    else {
                        this._cutType = FruitCuttable.TYPES.fruit;
                    }
                    this.game.physics.arcade.enableBody(this);
                    this.checkWorldBounds = true;
                    this.outOfBoundsKill = true;
                    this._velocity = new Phaser.Point(1, 1);
                    this.body.velocity.y = -this._velocity.y;
                    this.body.velocity.x = this._velocity.x;
                    this.body.gravity.y = FruitCuttable.DEFAULT_GRAVITY;
                }
                FruitCuttable.prototype.setSpawnVelocity = function (newX, newY) {
                    this._velocity.x = newX;
                    this._velocity.y = -newY;
                    this.body.gravity.y = FruitCuttable.DEFAULT_GRAVITY;
                };
                FruitCuttable.prototype.reset = function (newX, newY) {
                    _super.prototype.reset.call(this, newX, newY);
                    this.body.velocity.x = this._velocity.x;
                    this.body.velocity.y = this._velocity.y;
                    return this;
                };
                FruitCuttable.prototype.cutObject = function () {
                    var emitter = this.game.add.emitter(this.x, this.y);
                    emitter.makeParticles(this.key, 'particle');
                    emitter.minParticleSpeed.setTo(-200, -200);
                    emitter.maxParticleSpeed.setTo(200, 200);
                    emitter.gravity = 0;
                    emitter.start(true, 700, null, 500);
                    if (this._cutType === FruitCuttable.TYPES.special) {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                        this.body.gravity.y = 0;
                        this.game.time.events.add(1000, this.kill, this);
                    }
                    else {
                        this.kill();
                    }
                    return this._cutType;
                };
                Object.defineProperty(FruitCuttable.prototype, "objectType", {
                    get: function () {
                        return this._cutType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FruitCuttable.TYPES = {
                    bomb: "bomb",
                    fruit: "fruit",
                    special: "special"
                };
                return FruitCuttable;
            }(RHPrefab_2.default));
            exports_15("default", FruitCuttable);
        }
    }
});
System.register("gameplay/Spawner", ['dijon/display', "gameplay/FruitCuttable"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var display_5, FruitCuttable_1;
    var Spawner;
    return {
        setters:[
            function (display_5_1) {
                display_5 = display_5_1;
            },
            function (FruitCuttable_1_1) {
                FruitCuttable_1 = FruitCuttable_1_1;
            }],
        execute: function() {
            Spawner = (function (_super) {
                __extends(Spawner, _super);
                function Spawner(name, position, data) {
                    _super.call(this, 0, 0, data.name);
                    this._data = data;
                    this._spawnPoint = position;
                    FruitCuttable_1.default.DEFAULT_GRAVITY = 900;
                    for (var i = 0; i < data.spawn.poolSize; i++) {
                        var cuttable = new FruitCuttable_1.default("cuttable" + this._data.cuttable.prop.cuttableType, this._spawnPoint, data.cuttable);
                        cuttable.kill();
                        this.addChild(cuttable);
                    }
                }
                Spawner.prototype.queueNextSpawn = function () {
                    this.game.time.events.add(this._nextSpawnTime, this._spawnObject, this);
                };
                Spawner.prototype._spawnObject = function () {
                    console.log('spawning object');
                    var cuttable = this.getFirstDead();
                    if (cuttable !== null) {
                        cuttable.setSpawnVelocity(this._newXVelocity, this._newYVelocity);
                        cuttable.revive(50);
                        cuttable.reset(this._spawnPoint.x, this._spawnPoint.y);
                    }
                    this.queueNextSpawn();
                };
                Object.defineProperty(Spawner.prototype, "_newXVelocity", {
                    get: function () {
                        return this.game.rnd.between(this._data.spawn.velX.min, this._data.spawn.velX.max);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spawner.prototype, "_newYVelocity", {
                    get: function () {
                        return this.game.rnd.between(this._data.spawn.velY.min, this._data.spawn.velY.max);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spawner.prototype, "_nextSpawnTime", {
                    get: function () {
                        return this.game.rnd.between(this._data.spawn.timeRange.min, this._data.spawn.timeRange.max);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Spawner;
            }(display_5.Group));
            exports_16("default", Spawner);
        }
    }
});
System.register("display/RHUpgradeItem", ["display/RHButton", 'dijon/display'], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var RHButton_1, display_6;
    var RHUpgradeItem;
    return {
        setters:[
            function (RHButton_1_1) {
                RHButton_1 = RHButton_1_1;
            },
            function (display_6_1) {
                display_6 = display_6_1;
            }],
        execute: function() {
            RHUpgradeItem = (function (_super) {
                __extends(RHUpgradeItem, _super);
                function RHUpgradeItem(name, position, data) {
                    _super.call(this, name, position, data);
                    var descPos = { x: this.realWidth + 10, y: this.realHeight * 0.5 };
                    this._desc = new display_6.Text(descPos.x, descPos.y, data.upgrade.description, data.prop.text.fontName, data.prop.text.fontSize * 0.6, data.prop.text.fontColour ? data.prop.text.fontColour : '#ffffff', 'left');
                    this.addChild(this._desc);
                    var costPos = { x: this.realWidth + 10, y: 0 };
                    this._cost = new display_6.Text(costPos.x, costPos.y, data.upgrade.price.toString() + "g", data.prop.text.fontName, data.prop.text.fontSize * 0.6, data.prop.text.fontColour ? data.prop.text.fontColour : '#ffffff', 'left');
                    this.addChild(this._cost);
                    this._data = data.upgrade;
                }
                RHUpgradeItem.prototype.disableButton = function () {
                    this._cost.text = "Sold Out";
                    this.input.enabled = false;
                    this._label.setColor(this._hoverCopyColour);
                    this.tint = 0xbfbfbf;
                    this._desc.setColor("#bfbfbf");
                    this._cost.setColor("#bfbfbf");
                };
                RHUpgradeItem.prototype.flashCost = function () {
                    this._cost.setColor('#bf0000');
                };
                Object.defineProperty(RHUpgradeItem.prototype, "baseCost", {
                    get: function () {
                        return this._data.price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHUpgradeItem.prototype, "upgradeType", {
                    get: function () {
                        return this._data.upgradeType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHUpgradeItem.prototype, "upgradeData", {
                    get: function () {
                        return this._data;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RHUpgradeItem;
            }(RHButton_1.default));
            exports_17("default", RHUpgradeItem);
        }
    }
});
System.register("input/PlayerTextInput", ["display/RHButton"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var RHButton_2;
    var PlayerTextInput;
    return {
        setters:[
            function (RHButton_2_1) {
                RHButton_2 = RHButton_2_1;
            }],
        execute: function() {
            PlayerTextInput = (function (_super) {
                __extends(PlayerTextInput, _super);
                function PlayerTextInput(name, position, data) {
                    _super.call(this, name, position, data);
                    if (this._label !== null) {
                        this._baseText = this._label.text;
                    }
                    else {
                        this._baseText = "";
                    }
                    this._baseSize = data.prop.text.fontSize;
                }
                PlayerTextInput.prototype.clearField = function () {
                    this._label.text = "";
                    this._updateInput();
                };
                PlayerTextInput.prototype.updateLabel = function (character) {
                    if (this._label.text === this._baseText) {
                        this._label.text = "";
                    }
                    this._label.text += character;
                    this._updateInput();
                };
                PlayerTextInput.prototype.removeLastCharacter = function () {
                    if (this._label.text.length > 0) {
                        this._label.text.slice(this._label.text.length - 1, this._label.text.length);
                    }
                    this._updateInput();
                };
                Object.defineProperty(PlayerTextInput.prototype, "inputText", {
                    get: function () {
                        return this._label.text;
                    },
                    enumerable: true,
                    configurable: true
                });
                PlayerTextInput.prototype._updateInput = function () {
                    if (this._label.text.length > 32) {
                        this._label.fontSize = this._baseSize / (this._label.text.length / 32);
                    }
                    else {
                        this._label.fontSize = this._baseSize;
                    }
                    this._label.centerPivot();
                };
                return PlayerTextInput;
            }(RHButton_2.default));
            exports_18("default", PlayerTextInput);
        }
    }
});
System.register("utils/PrefabBuilder", ['dijon/display', "display/RHPrefab", "display/RHText", "display/RHButton", "gameplay/FruitLife", "gameplay/FruitScore", "gameplay/Spawner", "display/RHUpgradeItem", "input/PlayerTextInput"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var display_7, RHPrefab_3, RHText_2, RHButton_3, FruitLife_1, FruitScore_1, Spawner_1, RHUpgradeItem_1, PlayerTextInput_1;
    var PrefabBuilder;
    return {
        setters:[
            function (display_7_1) {
                display_7 = display_7_1;
            },
            function (RHPrefab_3_1) {
                RHPrefab_3 = RHPrefab_3_1;
            },
            function (RHText_2_1) {
                RHText_2 = RHText_2_1;
            },
            function (RHButton_3_1) {
                RHButton_3 = RHButton_3_1;
            },
            function (FruitLife_1_1) {
                FruitLife_1 = FruitLife_1_1;
            },
            function (FruitScore_1_1) {
                FruitScore_1 = FruitScore_1_1;
            },
            function (Spawner_1_1) {
                Spawner_1 = Spawner_1_1;
            },
            function (RHUpgradeItem_1_1) {
                RHUpgradeItem_1 = RHUpgradeItem_1_1;
            },
            function (PlayerTextInput_1_1) {
                PlayerTextInput_1 = PlayerTextInput_1_1;
            }],
        execute: function() {
            PrefabBuilder = (function () {
                function PrefabBuilder() {
                }
                PrefabBuilder.createSceneFrom = function (data, scene) {
                    if (scene === null)
                        return;
                    var groupName, prefabName;
                    scene.prefabs = [];
                    scene.groups = {};
                    if (data !== null) {
                        data.groups.forEach(function (groupName) {
                            if (!scene.groups.hasOwnProperty(groupName)) {
                                scene.groups[groupName] = scene.add.dGroup(0, 0, groupName);
                            }
                        }, this);
                        for (var i = 0; i < data.prefabs.length; i++) {
                            if (PrefabBuilder.prefabClasses.hasOwnProperty(data.prefabs[i].type)) {
                                var prefab = this.createPrefab(data.prefabs[i]);
                                if (data.prefabs[i].hasOwnProperty("group") && scene.groups.hasOwnProperty(data.prefabs[i].group)) {
                                    scene.groups[data.prefabs[i].group].addChild(prefab);
                                }
                                else {
                                    scene.add.existing(prefab);
                                }
                                scene.prefabs[prefab.name] = prefab;
                            }
                        }
                    }
                };
                PrefabBuilder.createPrefabsFrom = function (data) {
                    var groupName, prefabName;
                    var groups = {};
                    var root = new display_7.Group(0, 0, 'root');
                    if (data !== null) {
                        groups['basic'] = new display_7.Group(0, 0, groupName);
                        data.groups.forEach(function (groupName) {
                            groups[groupName] = new display_7.Group(0, 0, groupName);
                            root.addChild(groups[groupName]);
                        }, this);
                        for (var i = 0; i < data.prefabs.length; i++) {
                            if (PrefabBuilder.prefabClasses.hasOwnProperty(data.prefabs[i].type)) {
                                var prefab = this.createPrefab(data.prefabs[i]);
                                if (data.prefabs[i].hasOwnProperty("group") && groups.hasOwnProperty(data.prefabs[i].group)) {
                                    groups[data.prefabs[i].group].addChild(prefab);
                                }
                                else {
                                    root.addChild(prefab);
                                }
                            }
                        }
                    }
                    return root;
                };
                PrefabBuilder.createPrefab = function (data, parent) {
                    if (parent === void 0) { parent = null; }
                    var prefabPosition = { x: 0, y: 0 };
                    var prefab;
                    if (this.prefabClasses.hasOwnProperty(data.type)) {
                        if (data.position.x > 0 && data.position.x <= 1) {
                            if (parent === null) {
                                prefabPosition.x = data.position.x * PrefabBuilder.game.width;
                                prefabPosition.y = data.position.y * PrefabBuilder.game.height;
                            }
                            else {
                                prefabPosition.x = data.position.x * parent.realWidth;
                                prefabPosition.y = data.position.y * parent.realHeight;
                            }
                        }
                        else {
                            if (parent === null) {
                                prefabPosition = data.position;
                            }
                            else {
                                prefabPosition.x = data.position.x - parent.x;
                                prefabPosition.y = data.position.y - parent.y;
                            }
                        }
                        prefab = new this.prefabClasses[data.type](data.name, prefabPosition, data);
                        if (data.hasOwnProperty("components")) {
                            for (var i = 0; i < data.components.length; i++) {
                                var comp = PrefabBuilder.createPrefab(data.components[i], prefab);
                                prefab.addChild(comp);
                            }
                        }
                    }
                    return prefab;
                };
                PrefabBuilder.prefabClasses = {
                    prefab: RHPrefab_3.default,
                    text: RHText_2.default,
                    button: RHButton_3.default,
                    lives: FruitLife_1.default,
                    score: FruitScore_1.default,
                    spawner: Spawner_1.default,
                    upgrade: RHUpgradeItem_1.default,
                    inputfield: PlayerTextInput_1.default
                };
                PrefabBuilder.game = null;
                return PrefabBuilder;
            }());
            exports_19("default", PrefabBuilder);
        }
    }
});
System.register("state/BaseState", ["dijon/core", "utils/PrefabBuilder"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_2, PrefabBuilder_1;
    var BaseState;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (PrefabBuilder_1_1) {
                PrefabBuilder_1 = PrefabBuilder_1_1;
            }],
        execute: function() {
            BaseState = (function (_super) {
                __extends(BaseState, _super);
                function BaseState() {
                    _super.apply(this, arguments);
                    this._updateAllowed = false;
                    this.prefabs = {};
                    this._levelData = null;
                }
                BaseState.prototype.init = function (levelData) {
                    if (levelData === void 0) { levelData = null; }
                    this._levelData = levelData;
                    _super.prototype.init.call(this);
                };
                BaseState.prototype.preload = function () {
                    _super.prototype.preload.call(this);
                    if (this._levelData !== null) {
                        this.game.asset.loadAssets(this._levelData.assetEntry);
                    }
                };
                BaseState.prototype.create = function () {
                    if (this._levelData !== null) {
                        PrefabBuilder_1.default.createSceneFrom(this._levelData, this);
                    }
                    _super.prototype.create.call(this);
                };
                BaseState.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                    this._updateAllowed = true;
                };
                BaseState.prototype._findPrefab = function (name) {
                    if (this.prefabs.hasOwnProperty(name)) {
                        return this.prefabs[name];
                    }
                    console.warn("Prefab " + name + " not found on State.");
                    return null;
                };
                BaseState.prototype.update = function () {
                    if (this._updateAllowed) {
                        this.updateState();
                    }
                };
                BaseState.prototype.updateState = function () { };
                Object.defineProperty(BaseState.prototype, "updateAllowed", {
                    get: function () {
                        return this._updateAllowed;
                    },
                    set: function (value) {
                        this._updateAllowed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseState.prototype, "firebase", {
                    get: function () {
                        return this.game['firebase'];
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseState;
            }(core_2.State));
            exports_20("default", BaseState);
        }
    }
});
System.register("mediator/BootMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var BaseMediator_4, Notifications_4;
    var BootMediator;
    return {
        setters:[
            function (BaseMediator_4_1) {
                BaseMediator_4 = BaseMediator_4_1;
            },
            function (Notifications_4_1) {
                Notifications_4 = Notifications_4_1;
            }],
        execute: function() {
            BootMediator = (function (_super) {
                __extends(BootMediator, _super);
                function BootMediator() {
                    _super.apply(this, arguments);
                }
                BootMediator.prototype.onRegister = function () {
                    this.sendNotification(Notifications_4.default.BOOT_INIT);
                };
                BootMediator.prototype.bootComplete = function () {
                    this.sendNotification(Notifications_4.default.BOOT_COMPLETE);
                };
                Object.defineProperty(BootMediator.prototype, "name", {
                    get: function () {
                        return BootMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                BootMediator.MEDIATOR_NAME = 'bootMediator';
                return BootMediator;
            }(BaseMediator_4.default));
            exports_21("default", BootMediator);
        }
    }
});
System.register("state/Boot", ["state/BaseState", "mediator/BootMediator"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var BaseState_1, BootMediator_1;
    var Boot;
    return {
        setters:[
            function (BaseState_1_1) {
                BaseState_1 = BaseState_1_1;
            },
            function (BootMediator_1_1) {
                BootMediator_1 = BootMediator_1_1;
            }],
        execute: function() {
            Boot = (function (_super) {
                __extends(Boot, _super);
                function Boot() {
                    _super.apply(this, arguments);
                }
                Boot.prototype.init = function () {
                    this._mediator = new BootMediator_1.default(this);
                };
                Boot.prototype.preload = function () {
                    if (window['version'] !== undefined) {
                        this.game.asset.cacheBustVersion = '@@version';
                    }
                    this.game.asset.loadJSON('game_data');
                    this.game.asset.loadJSON('assets');
                    this.game.asset.loadJSON('copy');
                };
                Boot.prototype.buildInterface = function () {
                    this.mediator.bootComplete();
                };
                Object.defineProperty(Boot.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Boot;
            }(BaseState_1.default));
            exports_22("default", Boot);
        }
    }
});
System.register("mediator/PreloadMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var BaseMediator_5, Notifications_5;
    var PreloadMediator;
    return {
        setters:[
            function (BaseMediator_5_1) {
                BaseMediator_5 = BaseMediator_5_1;
            },
            function (Notifications_5_1) {
                Notifications_5 = Notifications_5_1;
            }],
        execute: function() {
            PreloadMediator = (function (_super) {
                __extends(PreloadMediator, _super);
                function PreloadMediator() {
                    _super.apply(this, arguments);
                }
                PreloadMediator.prototype.notifyPreloadComplete = function () {
                    this.sendNotification(Notifications_5.default.PRELOAD_COMPLETE);
                };
                Object.defineProperty(PreloadMediator.prototype, "name", {
                    get: function () {
                        return PreloadMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                PreloadMediator.MEDIATOR_NAME = 'preloadMediator';
                return PreloadMediator;
            }(BaseMediator_5.default));
            exports_23("default", PreloadMediator);
        }
    }
});
System.register("state/Preload", ["state/BaseState", "utils/Constants", "mediator/PreloadMediator"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var BaseState_2, Constants_3, PreloadMediator_1;
    var Preload;
    return {
        setters:[
            function (BaseState_2_1) {
                BaseState_2 = BaseState_2_1;
            },
            function (Constants_3_1) {
                Constants_3 = Constants_3_1;
            },
            function (PreloadMediator_1_1) {
                PreloadMediator_1 = PreloadMediator_1_1;
            }],
        execute: function() {
            Preload = (function (_super) {
                __extends(Preload, _super);
                function Preload() {
                    _super.apply(this, arguments);
                }
                Preload.prototype.init = function () {
                    this._mediator = new PreloadMediator_1.default(this);
                };
                Preload.prototype.preload = function () {
                    this.game.asset.loadAssets('required');
                };
                Preload.prototype.buildInterface = function () {
                    this.mediator.notifyPreloadComplete();
                    this.mediator.requestStateChange(Constants_3.default.STATE_LOGIN);
                };
                Object.defineProperty(Preload.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Preload;
            }(BaseState_2.default));
            exports_24("default", Preload);
        }
    }
});
System.register("mediator/MenuMediator", ["mediator/BaseMediator"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var BaseMediator_6;
    var MenuMediator;
    return {
        setters:[
            function (BaseMediator_6_1) {
                BaseMediator_6 = BaseMediator_6_1;
            }],
        execute: function() {
            MenuMediator = (function (_super) {
                __extends(MenuMediator, _super);
                function MenuMediator() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(MenuMediator.prototype, "audioSpriteData", {
                    get: function () {
                        return this.gameModel.getData()['audiosprite'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MenuMediator.prototype, "name", {
                    get: function () {
                        return MenuMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MenuMediator.prototype, "menu", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                MenuMediator.MEDIATOR_NAME = 'menuMediator';
                return MenuMediator;
            }(BaseMediator_6.default));
            exports_25("default", MenuMediator);
        }
    }
});
System.register("state/Menu", ["state/BaseState", "utils/Constants", "mediator/MenuMediator"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var BaseState_3, Constants_4, MenuMediator_1;
    var Menu;
    return {
        setters:[
            function (BaseState_3_1) {
                BaseState_3 = BaseState_3_1;
            },
            function (Constants_4_1) {
                Constants_4 = Constants_4_1;
            },
            function (MenuMediator_1_1) {
                MenuMediator_1 = MenuMediator_1_1;
            }],
        execute: function() {
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.apply(this, arguments);
                    this._buildComplete = false;
                }
                Menu.prototype.init = function (levelData) {
                    _super.prototype.init.call(this, levelData);
                    this._mediator = new MenuMediator_1.default(this);
                };
                Menu.prototype.listBuildSequence = function () {
                    return [
                        this._setupInputEvents
                    ];
                };
                Menu.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                    this._buildComplete = true;
                };
                Menu.prototype.clearVisuals = function () {
                    this._title.destroy();
                    this._bg.destroy();
                };
                Menu.prototype._setupInputEvents = function () {
                    var playBtn = this._findPrefab("game_button");
                    if (playBtn !== null) {
                        playBtn.onInputDown.add(this._onPlayPressed, this);
                    }
                    var storeBtn = this._findPrefab("store_button");
                    if (storeBtn !== null) {
                        storeBtn.onInputDown.add(this._onStorePressed, this);
                    }
                };
                Menu.prototype._onPlayPressed = function () {
                    this.mediator.requestStateChange(Constants_4.default.STATE_GAME);
                };
                Menu.prototype._onStorePressed = function () {
                    this.mediator.requestStateChange(Constants_4.default.STATE_STORE);
                };
                Menu.prototype._toggleSFX = function () {
                    Constants_4.default.SFX_ENABLED = !Constants_4.default.SFX_ENABLED;
                };
                Object.defineProperty(Menu.prototype, "realWidth", {
                    get: function () {
                        return this.game.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Menu.prototype, "realHeight", {
                    get: function () {
                        return this.game.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Menu.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Menu;
            }(BaseState_3.default));
            exports_26("default", Menu);
        }
    }
});
System.register("mediator/GameplayMediator", ["mediator/BaseMediator", "utils/Notifications", "utils/Constants"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var BaseMediator_7, Notifications_6, Constants_5;
    var GameplayMediator;
    return {
        setters:[
            function (BaseMediator_7_1) {
                BaseMediator_7 = BaseMediator_7_1;
            },
            function (Notifications_6_1) {
                Notifications_6 = Notifications_6_1;
            },
            function (Constants_5_1) {
                Constants_5 = Constants_5_1;
            }],
        execute: function() {
            GameplayMediator = (function (_super) {
                __extends(GameplayMediator, _super);
                function GameplayMediator() {
                    _super.apply(this, arguments);
                }
                GameplayMediator.prototype.listNotificationInterests = function () {
                    return [
                        Notifications_6.default.GAME_LEVEL_FAILED
                    ];
                };
                GameplayMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_6.default.LIFE_LOST:
                            this.viewComp.onGameOver();
                            break;
                    }
                };
                GameplayMediator.prototype.increaseLives = function () {
                    this.sendNotification(Notifications_6.default.LIFE_EARNED);
                };
                GameplayMediator.prototype.decreaseLives = function () {
                    this.sendNotification(Notifications_6.default.LIFE_LOST);
                };
                GameplayMediator.prototype.increaseScore = function (score) {
                    this.sendNotification(Notifications_6.default.ADD_TO_SCORE, score);
                };
                Object.defineProperty(GameplayMediator.prototype, "extraLivesUpdgrade", {
                    get: function () {
                        return this.gameModel.getUpgradeValue(Constants_5.default.UPGRADE_LIVES);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameplayMediator.prototype, "bladeWidthUpgrade", {
                    get: function () {
                        return this.gameModel.getUpgradeValue(Constants_5.default.UPGRADE_BLADEWIDTH);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameplayMediator.prototype, "name", {
                    get: function () {
                        return GameplayMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameplayMediator.prototype, "viewComp", {
                    get: function () {
                        return this.viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameplayMediator.MEDIATOR_NAME = 'gameplaymediator';
                return GameplayMediator;
            }(BaseMediator_7.default));
            exports_27("default", GameplayMediator);
        }
    }
});
System.register("gameplay/FruitCut", [], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var FruitCut;
    return {
        setters:[],
        execute: function() {
            FruitCut = (function (_super) {
                __extends(FruitCut, _super);
                function FruitCut(game) {
                    _super.call(this, game);
                }
                FruitCut.prototype.drawCut = function (x, y, endX, endY) {
                    this.lineStyle(FruitCut.WIDTH, FruitCut.COLOR, 0.5);
                    this.drawPolygon([x, y]);
                    this.lineTo(endX, endY);
                    this.game.time.events.add(Phaser.Timer.SECOND * FruitCut.LIFE_TIME, this.kill, this);
                };
                FruitCut.prototype.kill = function () {
                    _super.prototype.kill.call(this);
                    this.clear();
                    return null;
                };
                return FruitCut;
            }(Phaser.Graphics));
            exports_28("default", FruitCut);
        }
    }
});
System.register("state/Gameplay", ["state/BaseState", "utils/Constants", "mediator/GameplayMediator", "gameplay/FruitCut", "gameplay/FruitCuttable"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var BaseState_4, Constants_6, GameplayMediator_1, FruitCut_1, FruitCuttable_2;
    var Gameplay;
    return {
        setters:[
            function (BaseState_4_1) {
                BaseState_4 = BaseState_4_1;
            },
            function (Constants_6_1) {
                Constants_6 = Constants_6_1;
            },
            function (GameplayMediator_1_1) {
                GameplayMediator_1 = GameplayMediator_1_1;
            },
            function (FruitCut_1_1) {
                FruitCut_1 = FruitCut_1_1;
            },
            function (FruitCuttable_2_1) {
                FruitCuttable_2 = FruitCuttable_2_1;
            }],
        execute: function() {
            Gameplay = (function (_super) {
                __extends(Gameplay, _super);
                function Gameplay() {
                    _super.apply(this, arguments);
                    this._swipeStarted = false;
                    this._buildComplete = false;
                }
                Gameplay.prototype.init = function (levelData) {
                    _super.prototype.init.call(this, levelData);
                    this._mediator = new GameplayMediator_1.default();
                    this._swipeStarted = false;
                };
                Gameplay.prototype.listBuildSequence = function () {
                    return [
                        this._initStatsAndUpgrades,
                        this._addInputEvents
                    ];
                };
                Gameplay.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                    this._buildComplete = true;
                    this._startSpawners();
                };
                Gameplay.prototype.onGameOver = function () {
                    console.log('game over man');
                };
                Gameplay.prototype._initStatsAndUpgrades = function () {
                    FruitCut_1.default.COLOR = 0xbfbfbf;
                    FruitCut_1.default.WIDTH = 3 + this.mediator.bladeWidthUpgrade;
                    FruitCut_1.default.LIFE_TIME = 0.25;
                };
                Gameplay.prototype._addInputEvents = function () {
                    this.game.input.onDown.add(this._onInputDown, this);
                    this.game.input.onUp.add(this._onInputUp, this);
                };
                Gameplay.prototype._onInputDown = function (pointer) {
                    this._swipeStarted = true;
                    this._startSwipePt = new Phaser.Point(pointer.x, pointer.y);
                };
                Gameplay.prototype._onInputUp = function (pointer) {
                    if (this._swipeStarted === false) {
                        return;
                    }
                    this._swipeStarted = false;
                    var distance = Phaser.Point.distance(this._startSwipePt, new Phaser.Point(pointer.x, pointer.y));
                    if (distance >= Gameplay.MIN_SWIPE_DISTANCE) {
                        this._cutLine = new Phaser.Line(this._startSwipePt.x, this._startSwipePt.y, pointer.x, pointer.y);
                        var cut = this._drawCut();
                        var spawners = this.groups["spawners"];
                        if (spawners === null) {
                            return;
                        }
                        for (var i = 0; i < spawners.children.length; i++) {
                            var nextGroup = spawners.getChildAt(i);
                            nextGroup.forEachAlive(this._checkCollisions, this, cut);
                        }
                    }
                };
                Gameplay.prototype._drawCut = function () {
                    var cut = new FruitCut_1.default(this.game);
                    this.groups["cuts"].addChild(cut);
                    cut.drawCut(this._cutLine.start.x, this._cutLine.start.y, this._cutLine.end.x, this._cutLine.end.y);
                    return cut;
                };
                Gameplay.prototype._checkCollisions = function (cuttable, cut) {
                    if (cuttable.body) {
                        var line1 = new Phaser.Line(cuttable.left, cuttable.bottom, cuttable.left, cuttable.top);
                        var line2 = new Phaser.Line(cuttable.left, cuttable.top, cuttable.right, cuttable.top);
                        var line3 = new Phaser.Line(cuttable.right, cuttable.top, cuttable.right, cuttable.bottom);
                        var line4 = new Phaser.Line(cuttable.right, cuttable.bottom, cuttable.left, cuttable.bottom);
                        var intersection = this._cutLine.intersects(line1) || this._cutLine.intersects(line2) || this._cutLine.intersects(line3) || this._cutLine.intersects(line4);
                        if (intersection) {
                            this._onObjectCut(cuttable.cutObject());
                        }
                    }
                };
                Gameplay.prototype._onObjectCut = function (type) {
                    switch (type) {
                        case FruitCuttable_2.default.TYPES.fruit:
                            this.mediator.increaseScore(1);
                            break;
                        case FruitCuttable_2.default.TYPES.bomb:
                            this.mediator.decreaseLives();
                            break;
                        case FruitCuttable_2.default.TYPES.special:
                            this.mediator.increaseScore(1);
                            break;
                    }
                };
                Gameplay.prototype._startSpawners = function () {
                    var spawners = this.groups['spawners'];
                    spawners.callAll("queueNextSpawn", null);
                };
                Gameplay.prototype._toggleSFX = function () {
                    Constants_6.default.SFX_ENABLED = !Constants_6.default.SFX_ENABLED;
                };
                Object.defineProperty(Gameplay.prototype, "realWidth", {
                    get: function () {
                        return this.game.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Gameplay.prototype, "realHeight", {
                    get: function () {
                        return this.game.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Gameplay.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                Gameplay.MIN_SWIPE_DISTANCE = 10;
                return Gameplay;
            }(BaseState_4.default));
            exports_29("default", Gameplay);
        }
    }
});
System.register("mediator/StoreMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var BaseMediator_8, Notifications_7;
    var StoreMediator;
    return {
        setters:[
            function (BaseMediator_8_1) {
                BaseMediator_8 = BaseMediator_8_1;
            },
            function (Notifications_7_1) {
                Notifications_7 = Notifications_7_1;
            }],
        execute: function() {
            StoreMediator = (function (_super) {
                __extends(StoreMediator, _super);
                function StoreMediator() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(StoreMediator.prototype, "playerGold", {
                    get: function () {
                        return this.gameModel.currentPlayerGold;
                    },
                    enumerable: true,
                    configurable: true
                });
                StoreMediator.prototype.attemptToSpendGold = function (amount) {
                    if (this.gameModel.goldSpent(amount)) {
                        this.sendNotification(Notifications_7.default.GOLD_CHANGED);
                        return true;
                    }
                    return false;
                };
                StoreMediator.prototype.notifyUpgradePurchased = function (uData) {
                    this.gameModel.addUpgrade(uData);
                };
                Object.defineProperty(StoreMediator.prototype, "name", {
                    get: function () {
                        return StoreMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StoreMediator.prototype, "store", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                StoreMediator.MEDIATOR_NAME = 'storemediator';
                return StoreMediator;
            }(BaseMediator_8.default));
            exports_30("default", StoreMediator);
        }
    }
});
System.register("state/Store", ["state/BaseState", "utils/Constants", "mediator/StoreMediator"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var BaseState_5, Constants_7, StoreMediator_1;
    var Store;
    return {
        setters:[
            function (BaseState_5_1) {
                BaseState_5 = BaseState_5_1;
            },
            function (Constants_7_1) {
                Constants_7 = Constants_7_1;
            },
            function (StoreMediator_1_1) {
                StoreMediator_1 = StoreMediator_1_1;
            }],
        execute: function() {
            Store = (function (_super) {
                __extends(Store, _super);
                function Store() {
                    _super.apply(this, arguments);
                    this._buildComplete = false;
                }
                Store.prototype.init = function (levelData) {
                    _super.prototype.init.call(this, levelData);
                    this._mediator = StoreMediator_1.default.retrieveMediator(StoreMediator_1.default.MEDIATOR_NAME, this);
                    if (this._mediator === null) {
                        this._mediator = new StoreMediator_1.default(this);
                    }
                };
                Store.prototype.listBuildSequence = function () {
                    return [
                        this._setupInputEvents
                    ];
                };
                Store.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                    this._buildComplete = true;
                };
                Store.prototype._setupInputEvents = function () {
                    var buttons = this.groups['store_items'];
                    for (var i = 0; i < buttons.children.length; i++) {
                        var upgrade = buttons.getChildAt(i);
                        upgrade.onInputDown.add(this.onUpgradePressed, this);
                    }
                    var quitBtn = this._findPrefab('quitButton');
                    console.log(quitBtn);
                    if (quitBtn !== null) {
                        quitBtn.onInputDown.addOnce(this._backToTitle, this);
                    }
                };
                Store.prototype._backToTitle = function () {
                    console.log("back to menu");
                    this.mediator.requestStateChange(Constants_7.default.STATE_MENU);
                };
                Store.prototype.onUpgradePressed = function (upgrade) {
                    if (this.mediator.attemptToSpendGold(upgrade.baseCost)) {
                        upgrade.disableButton();
                        this.mediator.notifyUpgradePurchased(upgrade.upgradeData);
                    }
                    else {
                        upgrade.flashCost();
                    }
                };
                Object.defineProperty(Store.prototype, "realWidth", {
                    get: function () {
                        return this.game.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Store.prototype, "realHeight", {
                    get: function () {
                        return this.game.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Store.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Store;
            }(BaseState_5.default));
            exports_31("default", Store);
        }
    }
});
System.register("mediator/LoginMediator", ["mediator/BaseMediator"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var BaseMediator_9;
    var LoginMediator;
    return {
        setters:[
            function (BaseMediator_9_1) {
                BaseMediator_9 = BaseMediator_9_1;
            }],
        execute: function() {
            LoginMediator = (function (_super) {
                __extends(LoginMediator, _super);
                function LoginMediator() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(LoginMediator.prototype, "saveData", {
                    get: function () {
                        return this.gameModel.saveData;
                    },
                    enumerable: true,
                    configurable: true
                });
                LoginMediator.prototype.updateSaveData = function (snapshot) {
                    this.gameModel.updateSaveData(snapshot);
                };
                Object.defineProperty(LoginMediator.prototype, "name", {
                    get: function () {
                        return LoginMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoginMediator.prototype, "login", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                LoginMediator.MEDIATOR_NAME = 'loginmediator';
                return LoginMediator;
            }(BaseMediator_9.default));
            exports_32("default", LoginMediator);
        }
    }
});
System.register("state/Login", ["state/BaseState", "utils/Constants", "mediator/LoginMediator"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var BaseState_6, Constants_8, LoginMediator_1;
    var Menu;
    return {
        setters:[
            function (BaseState_6_1) {
                BaseState_6 = BaseState_6_1;
            },
            function (Constants_8_1) {
                Constants_8 = Constants_8_1;
            },
            function (LoginMediator_1_1) {
                LoginMediator_1 = LoginMediator_1_1;
            }],
        execute: function() {
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.apply(this, arguments);
                    this._buildComplete = false;
                    this._currentField = null;
                }
                Menu.prototype.init = function (levelData) {
                    _super.prototype.init.call(this, levelData);
                    this._mediator = LoginMediator_1.default.retrieveMediator(LoginMediator_1.default.MEDIATOR_NAME, this);
                    if (this._mediator === null) {
                        this._mediator = new LoginMediator_1.default(this);
                    }
                };
                Menu.prototype.listBuildSequence = function () {
                    return [
                        this._setupInputEvents
                    ];
                };
                Menu.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                    this._buildComplete = true;
                };
                Menu.prototype.clearVisuals = function () {
                    this._title.destroy();
                    this._bg.destroy();
                };
                Menu.prototype._setupInputEvents = function () {
                    var playBtn = this._findPrefab("loginButton");
                    if (playBtn !== null) {
                        playBtn.onInputDown.add(this._onLoginPressed, this);
                    }
                    var email = this._findPrefab('emailInput');
                    if (email !== null) {
                        email.events.onInputDown.add(this._selectedField, this);
                        this._currentField = email;
                    }
                    var passw = this._findPrefab('passwordInput');
                    if (passw !== null) {
                        passw.events.onInputDown.add(this._selectedField, this);
                    }
                    this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeyboardInput);
                };
                Menu.prototype.handleKeyboardInput = function (key) {
                    if (this._currentField === null) {
                        return;
                    }
                    var character = this.game.input.keyboard.lastChar;
                    if (!character) {
                        this._currentField.removeLastCharacter();
                    }
                    else if (character !== ' ' && character !== '') {
                        this._currentField.updateLabel(character);
                    }
                };
                Menu.prototype._selectedField = function (inputField) {
                    this._currentField = inputField;
                };
                Menu.prototype._onLoginPressed = function () {
                    var email = this._findPrefab('emailInput');
                    var passw = this._findPrefab('passwordInput');
                    if (passw !== null && email !== null) {
                        this._loginInfo = { email: email.inputText, password: passw.inputText };
                        this.attemptLogin();
                    }
                };
                Menu.prototype.onLoginError = function (error, authData) {
                    if (error) {
                        console.log(error);
                        if (error.code === "auth/user-not-found") {
                            this.firebase.auth().createUserWithEmailAndPassword(this._loginInfo.email, this._loginInfo.password).catch(this.onCreateUser, this);
                        }
                    }
                    else {
                        console.log(authData);
                        console.log("Login Successful");
                        this.mediator.requestStateChange(Constants_8.default.STATE_MENU);
                    }
                };
                Menu.prototype.onCreateUser = function (error, userData) {
                    if (!error) {
                        this.attemptLogin();
                    }
                };
                Menu.prototype.savePlayerData = function (snapshot) {
                    if (snapshot) {
                        this.mediator.updateSaveData(snapshot);
                    }
                    else {
                        var playerName = this._loginInfo.email.replace(/@.*/, "");
                        var initData = this.mediator.saveData;
                        this.firebase("player").child(initData.key()).set({
                            name: playerName,
                            wealth: initData.wealth,
                            bestScore: initData.bestScore,
                            lastScore: initData.lastScore,
                            upgrades: initData.upgrades
                        });
                    }
                };
                Menu.prototype.attemptLogin = function () {
                    if (this.firebase.auth().currentUser) {
                        this.firebase.auth().signOut();
                    }
                    var loginAttempt = this.firebase.auth().signInWithEmailAndPassword(this._loginInfo.email, this._loginInfo.password);
                    loginAttempt.catch(this.onLoginError, this);
                };
                Menu.prototype._toggleSFX = function () {
                    Constants_8.default.SFX_ENABLED = !Constants_8.default.SFX_ENABLED;
                };
                Object.defineProperty(Menu.prototype, "realWidth", {
                    get: function () {
                        return this.game.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Menu.prototype, "realHeight", {
                    get: function () {
                        return this.game.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Menu.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Menu;
            }(BaseState_6.default));
            exports_33("default", Menu);
        }
    }
});
System.register("BoilerplateApplication", ["dijon/application", "RHGame", "dijon/utils", "dijon/mvc", "mediator/ApplicationMediator", "utils/Constants", "state/Boot", "state/Preload", "state/Menu", "state/Gameplay", "state/Store", "state/Login", "model/GameModel", "utils/PrefabBuilder"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var application_3, RHGame_1, utils_2, mvc_3, ApplicationMediator_1, Constants_9, Boot_1, Preload_1, Menu_1, Gameplay_1, Store_1, Login_1, GameModel_2, PrefabBuilder_2;
    var BoilerplateApplication;
    return {
        setters:[
            function (application_3_1) {
                application_3 = application_3_1;
            },
            function (RHGame_1_1) {
                RHGame_1 = RHGame_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (mvc_3_1) {
                mvc_3 = mvc_3_1;
            },
            function (ApplicationMediator_1_1) {
                ApplicationMediator_1 = ApplicationMediator_1_1;
            },
            function (Constants_9_1) {
                Constants_9 = Constants_9_1;
            },
            function (Boot_1_1) {
                Boot_1 = Boot_1_1;
            },
            function (Preload_1_1) {
                Preload_1 = Preload_1_1;
            },
            function (Menu_1_1) {
                Menu_1 = Menu_1_1;
            },
            function (Gameplay_1_1) {
                Gameplay_1 = Gameplay_1_1;
            },
            function (Store_1_1) {
                Store_1 = Store_1_1;
            },
            function (Login_1_1) {
                Login_1 = Login_1_1;
            },
            function (GameModel_2_1) {
                GameModel_2 = GameModel_2_1;
            },
            function (PrefabBuilder_2_1) {
                PrefabBuilder_2 = PrefabBuilder_2_1;
            }],
        execute: function() {
            BoilerplateApplication = (function (_super) {
                __extends(BoilerplateApplication, _super);
                function BoilerplateApplication() {
                    _super.call(this);
                    this.gameId = null;
                }
                BoilerplateApplication.prototype.createGame = function () {
                    this.game = new RHGame_1.default({
                        width: this._getGameWidth(),
                        height: this._getGameHeight(),
                        parent: 'game-container',
                        renderer: Phaser.AUTO,
                        transparent: false,
                        resolution: this._getResolution()
                    });
                    this._mediator = new ApplicationMediator_1.default(this);
                    this._addStates();
                };
                BoilerplateApplication.prototype.startGame = function () {
                    this.game.state.start(Constants_9.default.STATE_BOOT);
                };
                BoilerplateApplication.prototype.bootComplete = function () {
                    this.adjustScaleSettings();
                    this.adjustRendererSettings();
                    this.addPlugins();
                    PrefabBuilder_2.default.game = this.game;
                };
                BoilerplateApplication.prototype.adjustScaleSettings = function () {
                    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.game.scale.setMinMax(256, 192, 1024, 768);
                    this.game.scale.pageAlignHorizontally = true;
                };
                BoilerplateApplication.prototype.adjustRendererSettings = function () {
                    this.game.stage.disableVisibilityChange = true;
                    this.game.forceSingleUpdate = true;
                    this.game.camera.roundPx = false;
                    this.game.renderer.renderSession.roundPixels = false;
                    this.game.antialias = true;
                };
                BoilerplateApplication.prototype.registerModels = function () {
                    var gameModel = new GameModel_2.GameModel('game_data');
                    var copyModel = new mvc_3.CopyModel('copy');
                    this.gameModel.postBootLoad();
                };
                BoilerplateApplication.prototype._addStates = function () {
                    this.game.state.add(Constants_9.default.STATE_BOOT, Boot_1.default);
                    this.game.state.add(Constants_9.default.STATE_PRELOAD, Preload_1.default);
                    this.game.state.add(Constants_9.default.STATE_MENU, Menu_1.default);
                    this.game.state.add(Constants_9.default.STATE_GAME, Gameplay_1.default);
                    this.game.state.add(Constants_9.default.STATE_STORE, Store_1.default);
                    this.game.state.add(Constants_9.default.STATE_LOGIN, Login_1.default);
                };
                BoilerplateApplication.prototype._getGameWidth = function () {
                    return window.innerWidth;
                };
                BoilerplateApplication.prototype._getGameHeight = function () {
                    return window.innerHeight;
                };
                BoilerplateApplication.prototype._getResolution = function () {
                    if (application_3.Application.queryVar('resolution') && !isNaN(application_3.Application.queryVar('resolution'))) {
                        return application_3.Application.queryVar('resolution');
                    }
                    if (utils_2.Device.mobile) {
                        return Math.round(utils_2.Device.pixelRatio);
                    }
                    else {
                        return Math.round(window.devicePixelRatio);
                    }
                };
                BoilerplateApplication.prototype._getRendererByDevice = function () {
                    return utils_2.Device.mobile && window.devicePixelRatio < 2 ? Phaser.CANVAS : Phaser.AUTO;
                };
                Object.defineProperty(BoilerplateApplication.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BoilerplateApplication.prototype, "gameModel", {
                    get: function () {
                        return this.retrieveModel(GameModel_2.GameModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BoilerplateApplication.prototype, "copyModel", {
                    get: function () {
                        return this.retrieveModel(mvc_3.CopyModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                return BoilerplateApplication;
            }(application_3.Application));
            exports_34("default", BoilerplateApplication);
        }
    }
});
System.register("bootstrap", ["BoilerplateApplication"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var BoilerPlateApplication_1;
    var app;
    return {
        setters:[
            function (BoilerPlateApplication_1_1) {
                BoilerPlateApplication_1 = BoilerPlateApplication_1_1;
            }],
        execute: function() {
            exports_35("app", app = new BoilerPlateApplication_1.default());
        }
    }
});
System.register("mediator/HUDGoldMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var BaseMediator_10, Notifications_8;
    var HUDGoldMediator;
    return {
        setters:[
            function (BaseMediator_10_1) {
                BaseMediator_10 = BaseMediator_10_1;
            },
            function (Notifications_8_1) {
                Notifications_8 = Notifications_8_1;
            }],
        execute: function() {
            HUDGoldMediator = (function (_super) {
                __extends(HUDGoldMediator, _super);
                function HUDGoldMediator() {
                    _super.apply(this, arguments);
                }
                HUDGoldMediator.prototype.listNotificationInterests = function () {
                    return [
                        Notifications_8.default.GOLD_CHANGED
                    ];
                };
                HUDGoldMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_8.default.GOLD_CHANGED:
                            this.gold.updateGoldDisplay(this.gameModel.currentPlayerGold.toString());
                            break;
                    }
                };
                Object.defineProperty(HUDGoldMediator.prototype, "name", {
                    get: function () {
                        return HUDGoldMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HUDGoldMediator.prototype, "gold", {
                    get: function () {
                        return this._viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                HUDGoldMediator.MEDIATOR_NAME = 'hudgoldmediator';
                return HUDGoldMediator;
            }(BaseMediator_10.default));
            exports_36("default", HUDGoldMediator);
        }
    }
});
System.register("gameplay/HUDGold", ["display/RHText", "mediator/HUDGoldMediator"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var RHText_3, HUDGoldMediator_1;
    var HUDGold;
    return {
        setters:[
            function (RHText_3_1) {
                RHText_3 = RHText_3_1;
            },
            function (HUDGoldMediator_1_1) {
                HUDGoldMediator_1 = HUDGoldMediator_1_1;
            }],
        execute: function() {
            HUDGold = (function (_super) {
                __extends(HUDGold, _super);
                function HUDGold(name, position, data) {
                    _super.call(this, name, position, data);
                    this._mediator = HUDGoldMediator_1.default.retrieveMediator(HUDGoldMediator_1.default.MEDIATOR_NAME, this);
                    if (this._mediator === null) {
                        this._mediator = new HUDGoldMediator_1.default(this);
                    }
                }
                HUDGold.prototype.updateGoldDisplay = function (newAmount) {
                    this.text = newAmount;
                };
                return HUDGold;
            }(RHText_3.default));
            exports_37("default", HUDGold);
        }
    }
});
System.register("ui/Preloader", ['dijon/display'], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var display_8;
    var Preloader;
    return {
        setters:[
            function (display_8_1) {
                display_8 = display_8_1;
            }],
        execute: function() {
            Preloader = (function (_super) {
                __extends(Preloader, _super);
                function Preloader(x, y, name) {
                    _super.call(this, x, y, name, true);
                    this.transitionInComplete = new Phaser.Signal();
                    this.transitionOutComplete = new Phaser.Signal();
                    this.init();
                    this.buildInterface();
                }
                Preloader.prototype.buildInterface = function () {
                    this._loadText = this.addInternal.dText(50, 50, 'Loading ... ', 'Arial', 36, '#FFFFFF');
                    var gfx = this.game.add.graphics();
                    gfx.beginFill(0x000000, 1);
                    gfx.drawRect(0, 0, this.game.width, this.game.height);
                    gfx.endFill();
                    this._wiper = this.addInternal.image(0, 0, gfx.generateTexture());
                    this.game.world.remove(gfx, true);
                    this.alpha = 0;
                    this.visible = false;
                    this._inTween = this.game.add.tween(this).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out);
                    this._outTween = this.game.add.tween(this).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.In);
                    this._inTween.onComplete.add(this._in, this);
                    this._outTween.onComplete.add(this._out, this);
                };
                Preloader.prototype.loadStart = function () {
                };
                Preloader.prototype.loadProgress = function (progress) {
                    var roundedProgress = Math.round(progress).toString();
                    this._loadText.setText('Loading ... ' + roundedProgress + '%');
                };
                Preloader.prototype.loadComplete = function () {
                };
                Preloader.prototype.transitionIn = function () {
                    this.visible = true;
                    this._inTween.start();
                };
                Preloader.prototype.transitionOut = function () {
                    this._outTween.start();
                };
                Preloader.prototype._in = function () {
                    this.transitionInComplete.dispatch();
                };
                Preloader.prototype._out = function () {
                    this.visible = false;
                    this.transitionOutComplete.dispatch();
                };
                Preloader.TEST = 1;
                Preloader.TEST_2 = 2;
                return Preloader;
            }(display_8.Group));
            exports_38("default", Preloader);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJIR2FtZS50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwiZGlzcGxheS9SSFByZWZhYi50cyIsImRpc3BsYXkvUkhUZXh0LnRzIiwiZGlzcGxheS9SSEJ1dHRvbi50cyIsIm1lZGlhdG9yL0ZydWl0TGlmZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRMaWZlLnRzIiwibWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRTY29yZS50cyIsImdhbWVwbGF5L0ZydWl0Q3V0dGFibGUudHMiLCJnYW1lcGxheS9TcGF3bmVyLnRzIiwiZGlzcGxheS9SSFVwZ3JhZGVJdGVtLnRzIiwiaW5wdXQvUGxheWVyVGV4dElucHV0LnRzIiwidXRpbHMvUHJlZmFiQnVpbGRlci50cyIsInN0YXRlL0Jhc2VTdGF0ZS50cyIsIm1lZGlhdG9yL0Jvb3RNZWRpYXRvci50cyIsInN0YXRlL0Jvb3QudHMiLCJtZWRpYXRvci9QcmVsb2FkTWVkaWF0b3IudHMiLCJzdGF0ZS9QcmVsb2FkLnRzIiwibWVkaWF0b3IvTWVudU1lZGlhdG9yLnRzIiwic3RhdGUvTWVudS50cyIsIm1lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3IudHMiLCJnYW1lcGxheS9GcnVpdEN1dC50cyIsInN0YXRlL0dhbWVwbGF5LnRzIiwibWVkaWF0b3IvU3RvcmVNZWRpYXRvci50cyIsInN0YXRlL1N0b3JlLnRzIiwibWVkaWF0b3IvTG9naW5NZWRpYXRvci50cyIsInN0YXRlL0xvZ2luLnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsIm1lZGlhdG9yL0hVREdvbGRNZWRpYXRvci50cyIsImdhbWVwbGF5L0hVREdvbGQudHMiLCJ1aS9QcmVsb2FkZXIu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QUFDO2dCQXRFTSxjQUFJLEdBQVcsQ0FBQyxDQUFDO2dCQUNqQixnQkFBTSxHQUFXLENBQUMsQ0FBQztnQkFzRTlCLGdCQUFDO1lBQUQsQ0F4RUEsQUF3RUMsQ0F4RXNDLGVBQUssR0F3RTNDO1lBeEVELGdDQXdFQyxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWUgfSBmcm9tICdkaWpvbi9jb3JlJztcbmltcG9ydCB7IElHYW1lQ29uZmlnIH0gZnJvbSAnZGlqb24vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIR2FtZSBleHRlbmRzIEdhbWUge1xuICAgIHB1YmxpYyBmaXJlYmFzZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBJR2FtZUNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmZpcmViYXNlID0gd2luZG93WydmaXJlYmFzZSddO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRzIHtcbiAgICAvLyBOT1RFOiBUaGVzZSBzdHJpbmcgdmFsdWVzIHNob3VsZCBtYXRjaCBcbiAgICAvLyBleGFjbHR5IHRvIHRoZSBuYW1lIG9mIHRoZSBkYXRhIGZpbGUgZm9yIHRoYXQgc3RhdGVzIGNyZWF0aW9uLlxuICAgIHN0YXRpYyBTVEFURV9CT09UOiBzdHJpbmcgPSAnYm9vdCc7XG4gICAgc3RhdGljIFNUQVRFX1BSRUxPQUQ6IHN0cmluZyA9ICdwcmVsb2FkJztcbiAgICBzdGF0aWMgU1RBVEVfTUVOVTogc3RyaW5nID0gJ21lbnUnO1xuICAgIHN0YXRpYyBTVEFURV9HQU1FOiBzdHJpbmcgPSAnZ2FtZXBsYXknO1xuICAgIHN0YXRpYyBTVEFURV9TVE9SRTogc3RyaW5nID0gJ3N0b3JlJztcbiAgICBzdGF0aWMgU1RBVEVfTE9HSU46IHN0cmluZyA9ICdsb2dpbic7XG4gICAgXG4gICAgc3RhdGljIEZPTlRfUkFMRVdBWTogc3RyaW5nID0gJ3JhbGV3YXknO1xuXG4gICAgc3RhdGljIFBMQVlFUl9TQVZFX0RBVEE6IHN0cmluZyA9ICdwbGF5ZXJzYXZlZGF0YSc7XG4gICAgXG4gICAgc3RhdGljIFNUUl9CTFVFOiBzdHJpbmcgPSAnIzAwOTllNic7XG4gICAgc3RhdGljIFNUUl9ORVdfVElUTEU6IHN0cmluZyA9ICcjZmZmZmZmJztcbiAgICBzdGF0aWMgU1RSX0JUTl9IT1ZFUjogc3RyaW5nID0gJyNjY2ZmY2MnO1xuICAgIHN0YXRpYyBTVFJfQlROX05PUk1BTDogc3RyaW5nID0gJyM2NjY2OTknO1xuXG4gICAgc3RhdGljIE5VTV9PUkFOR0VfQk9SREVSOiBudW1iZXIgPSAweGZmYjg2NjtcbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1g6IG51bWJlciA9IDB4ZTY3YTAwO1xuXG4gICAgc3RhdGljIEJVVFRPTl9OT1JNQUw6IG51bWJlciA9IDB4ZTZlNmU2O1xuICAgIHN0YXRpYyBCVVRUT05fSE9WRVI6IG51bWJlciA9IDB4ZmY5NDFhO1xuICAgIHN0YXRpYyBCVVRUT05fRE9XTjogbnVtYmVyID0gMHgwMGFhZmY7XG5cbiAgICBzdGF0aWMgVVBHUkFERV9CTEFERVdJRFRIOiBzdHJpbmcgPSAnYmxhZGVXaWR0aCc7XG4gICAgc3RhdGljIFVQR1JBREVfTElWRVM6IHN0cmluZyA9ICdleHRyYUxpZmUnO1xuXG4gICAgc3RhdGljIFNGWF9FTkFCTEVEOiBib29sZWFuID0gdHJ1ZTtcbn0iLCJpbXBvcnQge01vZGVsfSBmcm9tICdkaWpvbi9tdmMnO1xuaW1wb3J0IHsgSVBsYXllclNhdmVEYXRhLCBJVXBncmFkZURhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIEdhbWVNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBwdWJsaWMgc3RhdGljIE1PREVMX05BTUU6IHN0cmluZyA9IFwiZ2FtZU1vZGVsXCI7XG5cbiAgICBwcm90ZWN0ZWQgX3NhdmVEYXRhOiBJUGxheWVyU2F2ZURhdGE7XG4gICAgXG4gICAgcHVibGljIHBvc3RCb290TG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEgPSB0aGlzLmdhbWUuc3RvcmFnZS5nZXRGcm9tTG9jYWxTdG9yYWdlKENvbnN0YW50cy5QTEFZRVJfU0FWRV9EQVRBLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuX3NhdmVEYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVTYXZlRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLndlYWx0aCArPSAyMDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVMb2NhbERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdG9yYWdlLnNhdmVUb0xvY2FsU3RvcmFnZShDb25zdGFudHMuUExBWUVSX1NBVkVfREFUQSwgdGhpcy5fc2F2ZURhdGEpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0VXBncmFkZVZhbHVlKHR5cGU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2F2ZURhdGEudXBncmFkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlRGF0YS51cGdyYWRlc1tpXS51cGdyYWRlVHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzW2ldLmVmZmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2F2ZURhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhID0gPElQbGF5ZXJTYXZlRGF0YT57fTtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEud2VhbHRoID0gNTA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLmJlc3RTY29yZSA9IDA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLmxhc3RTY29yZSA9IDA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVNhdmVEYXRhKG5ld0RhdGE6IElQbGF5ZXJTYXZlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zYXZlRGF0YSA9IG5ld0RhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFVwZ3JhZGUoZGF0YTogSVVwZ3JhZGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzLnB1c2goZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgVXBncmFkZTogXCIgKyBkYXRhLnVwZ3JhZGVUeXBlICsgXCIgdG8gcGxheWVyIHVwZ3JhZGUgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5zYXZlTG9jYWxEYXRhKCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnb2xkU3BlbnQoYW1vdW50OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGFtb3VudCA8PSB0aGlzLmN1cnJlbnRQbGF5ZXJHb2xkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYXZlRGF0YS53ZWFsdGggLT0gYW1vdW50O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTcGVudDogXCIgKyBhbW91bnQgKyBcIiBnb2xkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IHNhdmVEYXRhKCk6IElQbGF5ZXJTYXZlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlRGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRQbGF5ZXJHb2xkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlRGF0YS53ZWFsdGg7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gR2FtZU1vZGVsLk1PREVMX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExldmVsRGF0YShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZWRpYXRvciwgQ29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCB7R2FtZU1vZGVsfSBmcm9tIFwiLi4vbW9kZWwvR2FtZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNZWRpYXRvciBleHRlbmRzIE1lZGlhdG9yIHtcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIHNvIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yIGNhbiBnZXQgY29weVxuICAgIHB1YmxpYyBnZXRDb3B5KGdyb3VwSWQ6IHN0cmluZywgdGV4dElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3B5TW9kZWwuZ2V0Q29weShncm91cElkLCB0ZXh0SWQpO1xuICAgIH1cblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIC8vIG9mZmVyIGFjY2VzcyB0byB0aGUgR2FtZU1vZGVsIGFuZCBDb3B5TW9kZWwgZnJvbSBhbnkgbWVkaWF0b3IgZXh0ZW5kaW5nIEJhc2VNZWRpYXRvclxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPkFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVxdWVzdFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnRyYW5zaXRpb24udG8obmV3U3RhdGUsIHRoaXMuZ2FtZU1vZGVsLmdldExldmVsRGF0YShuZXdTdGF0ZSkpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IGxldmVsRGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCJiYXNlTWVkaWF0b3JfXCIgKyB0aGlzLmdhbWUucm5kLnV1aWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJldHJpZXZlTWVkaWF0b3IobmFtZTogc3RyaW5nLCB2aWV3Q29tcDogYW55KTogTWVkaWF0b3Ige1xuICAgICAgICBsZXQgbWVkaWF0b3I6IE1lZGlhdG9yID0gQXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1lZGlhdG9yKG5hbWUpO1xuICAgICAgICBpZiAobWVkaWF0b3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1lZGlhdG9yLnZpZXdDb21wb25lbnQgPSB2aWV3Q29tcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVkaWF0b3I7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbnMge1xuICAgIHN0YXRpYyBCT09UX0lOSVQ6IHN0cmluZyA9ICdib290SW5pdCc7XG4gICAgc3RhdGljIEJPT1RfQ09NUExFVEU6IHN0cmluZyA9ICdib290Q29tcGxldGUnO1xuICAgIHN0YXRpYyBQUkVMT0FEX0NPTVBMRVRFOiBzdHJpbmcgPSAncHJlbG9hZENvbXBsZXRlJztcblxuICAgIHN0YXRpYyBMSUZFX0xPU1Q6IHN0cmluZyA9ICdsaWZlbG9zdCc7XG4gICAgc3RhdGljIExJRkVfRUFSTkVEOiBzdHJpbmcgPSAnbGlmZWVhcm5lZCc7XG4gICAgc3RhdGljIEdBTUVfTEVWRUxfRkFJTEVEOiBzdHJpbmcgPSAnZ2FtZWxldmVsZmFpbGVkJztcbiAgICBzdGF0aWMgQUREX1RPX1NDT1JFOiBzdHJpbmcgPSAnYWRkdG9zY29yZSc7XG5cbiAgICBzdGF0aWMgR09MRF9DSEFOR0VEOiBzdHJpbmcgPSAnZ29sZGNoYW5nZWQnOyAgICBcbn0iLCJpbXBvcnQge0xvZ2dlcn0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi4vQm9pbGVycGxhdGVBcHBsaWNhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ0FwcGxpY2F0aW9uTWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQk9PVF9JTklULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQ6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0lOSVQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYm9vdENvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFOlxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codGhpcywgJ05vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5zZXREYXRhKHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdhc3NldHMnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnJlZ2lzdGVyTW9kZWxzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRyYW5zaXRpb24udG8oQ29uc3RhbnRzLlNUQVRFX1BSRUxPQUQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCB2aWV3Q29tcG9uZW50KCk6IEJvaWxlcnBsYXRlQXBwbGljYXRpb24ge1xuICAgICAgICByZXR1cm4gPEJvaWxlcnBsYXRlQXBwbGljYXRpb24+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXBwbGljYXRpb25NZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElQcmVmYWJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIUHJlZmFiIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElQcmVmYWJEYXRhKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIGRhdGEucHJvcC5rZXksIGRhdGEucHJvcC5mcmFtZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgaWYgKGRhdGEucHJvcC5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQaXZvdChkYXRhLnByb3AucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3Auc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUuc2V0VG8oZGF0YS5wcm9wLnNjYWxlLngsIGRhdGEucHJvcC5zY2FsZS55KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFRleHQgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElUZXh0RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWIgZXh0ZW5kcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElUZXh0RGF0YSkge1xuICAgICAgICBzdXBlcihwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5jb3B5LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnROYW1lLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRTaXplLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRDb2xvdXIsXG4gICAgICAgICAgICBkYXRhLnByb3AuYWxpZ24gPyBkYXRhLnByb3AuYWxpZ24gOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggIT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggPyBkYXRhLnByb3Aud3JhcFdpZHRoIDogMCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgaWYgKGRhdGEucHJvcC5zaGFkb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KGRhdGEucHJvcC5zaGFkb3cueCwgZGF0YS5wcm9wLnNoYWRvdy55LCBkYXRhLnByb3Auc2hhZG93LmNvbG91cik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG4gICAgICAgIHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcbiAgICB9XG59IiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnZGlqb24vYXBwbGljYXRpb24nXG5pbXBvcnQge0dhbWV9IGZyb20gJ2Rpam9uL2NvcmUnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHsgSUJ1dHRvbkRhdGEsIElUZXh0Q29tcG9uZW50RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSSEJ1dHRvbiBleHRlbmRzIFBoYXNlci5CdXR0b24ge1xuICAgIHByb3RlY3RlZCBfZGlzYWJsZWRGcmFtZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfZW5hYmxlZEZyYW1lOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgX25vcm1hbENvcHlDb2xvdXI6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgX2hvdmVyQ29weUNvbG91cjogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIF9sYWJlbDogVGV4dDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKEFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkuZ2FtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmtleSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZyYW1lICsgJ19ob3ZlcicsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX2hvdmVyJywgXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICB0aGlzLl9lbmFibGVkRnJhbWUgPSBkYXRhLnByb3AuZnJhbWU7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRnJhbWUgPSBkYXRhLnByb3AuYWx0RnJhbWUgIT09IHVuZGVmaW5lZCA/IGRhdGEucHJvcC5hbHRGcmFtZSA6IGRhdGEucHJvcC5mcmFtZTtcbiAgICAgICAgdGhpcy5mb3JjZU91dCA9IGRhdGEucHJvcC5mb3JjZU91dCA/IGRhdGEucHJvcC5mb3JjZU91dCA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlucHV0LnVzZUhhbmRDdXJzb3IgPSBkYXRhLnByb3AudXNlSGFuZCA/IGRhdGEucHJvcC51c2VIYW5kIDogdHJ1ZTtcblxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oZGF0YS5wcm9wLmFuY2hvci54LCBkYXRhLnByb3AuYW5jaG9yLnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGl2b3QoZGF0YS5wcm9wLnBpdm90KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AudGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWwoZGF0YS5wcm9wLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9hZGRMYWJlbChkYXRhOiBJVGV4dENvbXBvbmVudERhdGEpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN1YlBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiBkYXRhLnBvc2l0aW9uLngsIHk6IGRhdGEucG9zaXRpb24ueSB9O1xuICAgICAgICB0aGlzLl9ub3JtYWxDb3B5Q29sb3VyID0gZGF0YS5mb250Q29sb3VyO1xuICAgICAgICB0aGlzLl9ob3ZlckNvcHlDb2xvdXIgPSBkYXRhLmFsdENvbG91ciA/IGRhdGEuYWx0Q29sb3VyIDogZGF0YS5mb250Q29sb3VyO1xuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbi54ID4gMCAmJiBkYXRhLnBvc2l0aW9uLnggPCAxKSB7XG4gICAgICAgICAgICBzdWJQb3MueCA9IHRoaXMucmVhbFdpZHRoICogZGF0YS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgc3ViUG9zLnkgPSB0aGlzLnJlYWxIZWlnaHQgKiBkYXRhLnBvc2l0aW9uLnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFiZWwgPSBuZXcgVGV4dChzdWJQb3MueCwgc3ViUG9zLnksIGRhdGEuY29weSwgZGF0YS5mb250TmFtZSwgZGF0YS5mb250U2l6ZSwgZGF0YS5mb250Q29sb3VyID8gZGF0YS5mb250Q29sb3VyIDogJyNmZmZmZmYnLCBkYXRhLmFsaWduID8gZGF0YS5hbGlnbiA6ICdjZW50ZXInKTtcbiAgICAgICAgaWYgKGRhdGEuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5hbmNob3Iuc2V0VG8oZGF0YS5hbmNob3IueCwgZGF0YS5hbmNob3IueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldFBpdm90KGRhdGEucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fbGFiZWwpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgdG9nZ2xlRW5hYmxlZEZyYW1lKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJhc2VGcmFtZSh0aGlzLl9lbmFibGVkRnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCYXNlRnJhbWUodGhpcy5fZGlzYWJsZWRGcmFtZSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIG9uSW5wdXREb3duSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXREb3duSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIpO1xuICAgICAgICBpZiAodGhpcy5fbGFiZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldENvbG9yKHRoaXMuX2hvdmVyQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0T3V0SGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXRPdXRIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9ICBcbiAgICBcbiAgICBwdWJsaWMgb25JbnB1dFVwSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55LCBpc092ZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dFVwSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIsIGlzT3Zlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQmFzZUZyYW1lKGJhc2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEZyYW1lcyhiYXNlICsgJ19ob3ZlcicsIGJhc2UgKyAnX25vcm1hbCcsIGJhc2UgKyAnX2hvdmVyJywgYmFzZSArICdfbm9ybWFsJyk7XG4gICAgfSAgXG4gICAgXG4gICAgcHVibGljIGdldCBkZ2FtZSgpOiBHYW1lIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lPnRoaXMuZ2FtZTtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBGcnVpdExpZmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRMaWZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3N0b3JlbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5MSUZFX0VBUk5FRFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NUOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMuZGVjcmVhc2VMaXZlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkxJRkVfRUFSTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMuaW5jcmVhc2VMaXZlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBub3RpZnlHYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR0FNRV9MRVZFTF9GQUlMRUQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnJ1aXRMaWZlTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxpdmVzKCk6IEZydWl0TGlmZSB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRMaWZlPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCBGcnVpdExpZmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9GcnVpdExpZmVNZWRpYXRvcic7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlIGV4dGVuZHMgR3JvdXAge1xuXG4gICAgcHJvdGVjdGVkIF9tYXhMaXZlczogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfbGl2ZXNSZW1haW5pbmc6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2xpZmVWaXN1YWxzOiBSSFByZWZhYltdO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjoge3g6IG51bWJlciwgeTogbnVtYmVyfSwgZGF0YTogSVByZWZhYkRhdGEpIHtcbiAgICAgICAgc3VwZXIoMCwgMCwgbmFtZSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gRnJ1aXRMaWZlTWVkaWF0b3IucmV0cmlldmVNZWRpYXRvcihGcnVpdExpZmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBGcnVpdExpZmVNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpdmVzUmVtYWluaW5nID0gZGF0YS5wcm9wWydsaXZlcyddO1xuICAgICAgICB0aGlzLl9tYXhMaXZlcyA9IHRoaXMuX2xpdmVzUmVtYWluaW5nICogMjtcbiAgICAgICAgdGhpcy5fbGlmZVZpc3VhbHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21heExpdmVzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXh0TGlmZSA9IG5ldyBSSFByZWZhYihuYW1lICsgJ19saWZlXycgKyBpLCB7IHg6IHBvc2l0aW9uLnggKyAoZGF0YS5wcm9wWydzcGFjaW5nJ10gKiBpKSwgeTogcG9zaXRpb24ueSB9LCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV4dExpZmUpO1xuICAgICAgICAgICAgdGhpcy5fbGlmZVZpc3VhbHMucHVzaChuZXh0TGlmZSk7XG4gICAgICAgICAgICBpZiAoaSA+PSB0aGlzLl9saXZlc1JlbWFpbmluZykge1xuICAgICAgICAgICAgICAgIG5leHRMaWZlLmFscGhhID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWNyZWFzZUxpdmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9saXZlc1JlbWFpbmluZy0tO1xuICAgICAgICBpZiAodGhpcy5fbGl2ZXNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWF0b3Iubm90aWZ5R2FtZU92ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMaXZlc0Rpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVhc2VMaXZlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpdmVzUmVtYWluaW5nIDwgMykge1xuICAgICAgICAgICAgdGhpcy5fbGl2ZXNSZW1haW5pbmcrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMaXZlc0Rpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZUxpdmVzRGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tYXhMaXZlczsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9saWZlVmlzdWFsc1tpXS5hbHBoYSA9IGkgPCB0aGlzLl9saXZlc1JlbWFpbmluZyA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtZWRpYXRvcigpOiBGcnVpdExpZmVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRMaWZlTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufSIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgRnJ1aXRTY29yZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdFNjb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRTY29yZU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdmcnVpdHNjb3JlbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQUREX1RPX1NDT1JFXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkU6XG4gICAgICAgICAgICAgICAgbGV0IGFtb3VudDogbnVtYmVyID0gPG51bWJlcj5ub3RpZmljYXRpb24uZ2V0Qm9keSgpO1xuICAgICAgICAgICAgICAgIGlmIChhbW91bnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5pbmNyZWFzZUJ5KGFtb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgbm90aWZ5R2FtZU92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkdBTUVfTEVWRUxfRkFJTEVEKTtcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZydWl0U2NvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2NvcmUoKTogRnJ1aXRTY29yZSB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRTY29yZT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgUkhUZXh0IGZyb20gJy4uL2Rpc3BsYXkvUkhUZXh0JztcbmltcG9ydCBGcnVpdFNjb3JlTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yJztcbmltcG9ydCB7IElQcmVmYWJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0U2NvcmUgZXh0ZW5kcyBSSFRleHQge1xuICAgIHByb3RlY3RlZCBfc2NvcmU6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX21lZGlhdG9yOiBGcnVpdFNjb3JlTWVkaWF0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9LCBkYXRhOiBJUHJlZmFiRGF0YSkge1xuICAgICAgICBzdXBlcihuYW1lLCBwb3NpdGlvbiwgZGF0YSk7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gMDtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSA8RnJ1aXRTY29yZU1lZGlhdG9yPkZydWl0U2NvcmVNZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKEZydWl0U2NvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBGcnVpdFNjb3JlTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVhc2VCeShhbW91bnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9zY29yZSArPSBhbW91bnQ7XG4gICAgICAgIHRoaXMudGV4dCA9ICdGcnVpdHM6ICcgKyB0aGlzLl9zY29yZS50b1N0cmluZygpO1xuICAgIH1cbn0iLCJpbXBvcnQgUkhQcmVmYWIgZnJvbSAnLi4vZGlzcGxheS9SSFByZWZhYic7XG5pbXBvcnQgeyBJQ3V0dGFibGVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0Q3V0dGFibGUgZXh0ZW5kcyBSSFByZWZhYiB7XG4gICAgcHVibGljIHN0YXRpYyBERUZBVUxUX0dSQVZJVFk6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgVFlQRVM6IHtib21iOiBzdHJpbmcsIGZydWl0OiBzdHJpbmcsIHNwZWNpYWw6IHN0cmluZ30gPSB7XG4gICAgICAgIGJvbWI6IFwiYm9tYlwiLFxuICAgICAgICBmcnVpdDogXCJmcnVpdFwiLFxuICAgICAgICBzcGVjaWFsOiBcInNwZWNpYWxcIlxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3V0VHlwZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfdmVsb2NpdHk6IFBoYXNlci5Qb2ludDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9LCBkYXRhOiBJQ3V0dGFibGVEYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcblxuICAgICAgICBpZiAoRnJ1aXRDdXR0YWJsZS5UWVBFUy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByb3AuY3V0dGFibGVUeXBlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3V0VHlwZSA9IGRhdGEucHJvcC5jdXR0YWJsZVR5cGU7XG4gICAgICAgIH0gICBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXRUeXBlID0gRnJ1aXRDdXR0YWJsZS5UWVBFUy5mcnVpdDtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlQm9keSh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0gbmV3IFBoYXNlci5Qb2ludCgxLCAxKTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy5fdmVsb2NpdHkueTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLl92ZWxvY2l0eS54O1xuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gRnJ1aXRDdXR0YWJsZS5ERUZBVUxUX0dSQVZJVFk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNwYXduVmVsb2NpdHkobmV3WDogbnVtYmVyLCBuZXdZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkueCA9IG5ld1g7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5LnkgPSAtbmV3WTtcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IEZydWl0Q3V0dGFibGUuREVGQVVMVF9HUkFWSVRZO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgcmVzZXQobmV3WDogbnVtYmVyLCBuZXdZOiBudW1iZXIpOiBQaGFzZXIuU3ByaXRlIHtcbiAgICAgICAgc3VwZXIucmVzZXQobmV3WCwgbmV3WSk7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy5fdmVsb2NpdHkueDtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSB0aGlzLl92ZWxvY2l0eS55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgY3V0T2JqZWN0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5nYW1lLmFkZC5lbWl0dGVyKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgZW1pdHRlci5tYWtlUGFydGljbGVzKHRoaXMua2V5LCAncGFydGljbGUnKTtcbiAgICAgICAgZW1pdHRlci5taW5QYXJ0aWNsZVNwZWVkLnNldFRvKC0yMDAsIC0yMDApO1xuICAgICAgICBlbWl0dGVyLm1heFBhcnRpY2xlU3BlZWQuc2V0VG8oMjAwLCAyMDApO1xuICAgICAgICBlbWl0dGVyLmdyYXZpdHkgPSAwO1xuICAgICAgICBlbWl0dGVyLnN0YXJ0KHRydWUsIDcwMCwgbnVsbCwgNTAwKTtcbiAgICAgICAgaWYgKHRoaXMuX2N1dFR5cGUgPT09IEZydWl0Q3V0dGFibGUuVFlQRVMuc3BlY2lhbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgICAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKDEwMDAsIHRoaXMua2lsbCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtpbGwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY3V0VHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9iamVjdFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1dFR5cGU7XG4gICAgfVxufSIsImltcG9ydCB7IEdyb3VwIH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgRnJ1aXRDdXR0YWJsZSBmcm9tICcuL0ZydWl0Q3V0dGFibGUnO1xuaW1wb3J0IHsgSVNwYXduZXJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYXduZXIgZXh0ZW5kcyBHcm91cCB7XG4gICAgcHJvdGVjdGVkIF9kYXRhOiBJU3Bhd25lckRhdGE7XG4gICAgcHJvdGVjdGVkIF9zcGF3blBvaW50OiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG4gICAgXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJU3Bhd25lckRhdGEpIHtcbiAgICAgICAgc3VwZXIoMCwgMCwgZGF0YS5uYW1lKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3NwYXduUG9pbnQgPSBwb3NpdGlvbjtcbiAgICAgICAgRnJ1aXRDdXR0YWJsZS5ERUZBVUxUX0dSQVZJVFkgPSA5MDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc3Bhd24ucG9vbFNpemU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1dHRhYmxlID0gbmV3IEZydWl0Q3V0dGFibGUoXCJjdXR0YWJsZVwiICsgdGhpcy5fZGF0YS5jdXR0YWJsZS5wcm9wLmN1dHRhYmxlVHlwZSwgdGhpcy5fc3Bhd25Qb2ludCwgZGF0YS5jdXR0YWJsZSk7XG4gICAgICAgICAgICBjdXR0YWJsZS5raWxsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGN1dHRhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWV1ZU5leHRTcGF3bigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuZXZlbnRzLmFkZCh0aGlzLl9uZXh0U3Bhd25UaW1lLCB0aGlzLl9zcGF3bk9iamVjdCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zcGF3bk9iamVjdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NwYXduaW5nIG9iamVjdCcpO1xuICAgICAgICBsZXQgY3V0dGFibGUgPSA8RnJ1aXRDdXR0YWJsZT50aGlzLmdldEZpcnN0RGVhZCgpO1xuICAgICAgICBpZiAoY3V0dGFibGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGN1dHRhYmxlLnNldFNwYXduVmVsb2NpdHkodGhpcy5fbmV3WFZlbG9jaXR5LCB0aGlzLl9uZXdZVmVsb2NpdHkpO1xuICAgICAgICAgICAgY3V0dGFibGUucmV2aXZlKDUwKTtcbiAgICAgICAgICAgIGN1dHRhYmxlLnJlc2V0KHRoaXMuX3NwYXduUG9pbnQueCwgdGhpcy5fc3Bhd25Qb2ludC55KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXVlTmV4dFNwYXduKCk7XG4gICAgfVxuICAgIFxuICAgIHByb3RlY3RlZCBnZXQgX25ld1hWZWxvY2l0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udmVsWC5taW4sIHRoaXMuX2RhdGEuc3Bhd24udmVsWC5tYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgX25ld1lWZWxvY2l0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udmVsWS5taW4sIHRoaXMuX2RhdGEuc3Bhd24udmVsWS5tYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgX25leHRTcGF3blRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5ybmQuYmV0d2Vlbih0aGlzLl9kYXRhLnNwYXduLnRpbWVSYW5nZS5taW4sIHRoaXMuX2RhdGEuc3Bhd24udGltZVJhbmdlLm1heCk7XG4gICAgfVxufSIsImltcG9ydCBSSEJ1dHRvbiBmcm9tICcuL1JIQnV0dG9uJztcbmltcG9ydCB7SVVwZ3JhZGVCdXR0b25EYXRhLCBJVXBncmFkZURhdGF9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSSFVwZ3JhZGVJdGVtIGV4dGVuZHMgUkhCdXR0b24ge1xuXG4gICAgcHJvdGVjdGVkIF9jb3N0OiBUZXh0O1xuICAgIHByb3RlY3RlZCBfZGVzYzogVGV4dDtcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IElVcGdyYWRlRGF0YTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVVwZ3JhZGVCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcblxuICAgICAgICBsZXQgZGVzY1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiB0aGlzLnJlYWxXaWR0aCArIDEwLCB5OiB0aGlzLnJlYWxIZWlnaHQgKiAwLjV9O1xuICAgICAgICB0aGlzLl9kZXNjID0gbmV3IFRleHQoZGVzY1Bvcy54LCBkZXNjUG9zLnksIGRhdGEudXBncmFkZS5kZXNjcmlwdGlvbiwgZGF0YS5wcm9wLnRleHQuZm9udE5hbWUsIGRhdGEucHJvcC50ZXh0LmZvbnRTaXplICogMC42LCBkYXRhLnByb3AudGV4dC5mb250Q29sb3VyID8gZGF0YS5wcm9wLnRleHQuZm9udENvbG91ciA6ICcjZmZmZmZmJywgJ2xlZnQnKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9kZXNjKTtcblxuICAgICAgICBsZXQgY29zdFBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiB0aGlzLnJlYWxXaWR0aCArIDEwLCB5OiAwfTtcbiAgICAgICAgdGhpcy5fY29zdCA9IG5ldyBUZXh0KGNvc3RQb3MueCwgY29zdFBvcy55LCBkYXRhLnVwZ3JhZGUucHJpY2UudG9TdHJpbmcoKSArIFwiZ1wiLCBkYXRhLnByb3AudGV4dC5mb250TmFtZSwgZGF0YS5wcm9wLnRleHQuZm9udFNpemUgKiAwLjYsIGRhdGEucHJvcC50ZXh0LmZvbnRDb2xvdXIgPyBkYXRhLnByb3AudGV4dC5mb250Q29sb3VyIDogJyNmZmZmZmYnLCAnbGVmdCcpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2Nvc3QpO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnVwZ3JhZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGVCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Nvc3QudGV4dCA9IFwiU29sZCBPdXRcIjtcbiAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xhYmVsLnNldENvbG9yKHRoaXMuX2hvdmVyQ29weUNvbG91cik7XG4gICAgICAgIHRoaXMudGludCA9IDB4YmZiZmJmO1xuICAgICAgICB0aGlzLl9kZXNjLnNldENvbG9yKFwiI2JmYmZiZlwiKTtcbiAgICAgICAgdGhpcy5fY29zdC5zZXRDb2xvcihcIiNiZmJmYmZcIik7XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgZmxhc2hDb3N0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb3N0LnNldENvbG9yKCcjYmYwMDAwJyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgYmFzZUNvc3QoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEucHJpY2U7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgdXBncmFkZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEudXBncmFkZVR5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB1cGdyYWRlRGF0YSgpOiBJVXBncmFkZURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IHsgSUJ1dHRvbkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyVGV4dElucHV0IGV4dGVuZHMgUkhCdXR0b24ge1xuXG4gICAgcHJvdGVjdGVkIF9iYXNlVGV4dDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfYmFzZVNpemU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSUJ1dHRvbkRhdGEpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgcG9zaXRpb24sIGRhdGEpO1xuICAgICAgICBpZiAodGhpcy5fbGFiZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Jhc2VUZXh0ID0gdGhpcy5fbGFiZWwudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Jhc2VUZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9iYXNlU2l6ZSA9IGRhdGEucHJvcC50ZXh0LmZvbnRTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckZpZWxkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYWJlbC50ZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5fdXBkYXRlSW5wdXQoKTtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIHVwZGF0ZUxhYmVsKGNoYXJhY3Rlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbC50ZXh0ID09PSB0aGlzLl9iYXNlVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwudGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFiZWwudGV4dCArPSBjaGFyYWN0ZXI7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUlucHV0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUxhc3RDaGFyYWN0ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbC50ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnRleHQuc2xpY2UodGhpcy5fbGFiZWwudGV4dC5sZW5ndGggLSAxLCB0aGlzLl9sYWJlbC50ZXh0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSW5wdXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlucHV0VGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWwudGV4dDtcbiAgICB9ICAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfdXBkYXRlSW5wdXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbC50ZXh0Lmxlbmd0aCA+IDMyKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5mb250U2l6ZSA9IHRoaXMuX2Jhc2VTaXplIC8gKHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoIC8gMzIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuZm9udFNpemUgPSB0aGlzLl9iYXNlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYWJlbC5jZW50ZXJQaXZvdCgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBJU2NlbmVEYXRhIH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgUkhQcmVmYWIgZnJvbSAnLi4vZGlzcGxheS9SSFByZWZhYic7XG5pbXBvcnQgUkhUZXh0IGZyb20gJy4uL2Rpc3BsYXkvUkhUZXh0JztcbmltcG9ydCBSSEJ1dHRvbiBmcm9tICcuLi9kaXNwbGF5L1JIQnV0dG9uJztcbmltcG9ydCBCYXNlU3RhdGUgZnJvbSAnLi4vc3RhdGUvQmFzZVN0YXRlJztcbmltcG9ydCBGcnVpdExpZmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRMaWZlJztcbmltcG9ydCBGcnVpdFNjb3JlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0U2NvcmUnO1xuaW1wb3J0IFNwYXduZXIgZnJvbSAnLi4vZ2FtZXBsYXkvU3Bhd25lcic7XG5pbXBvcnQgUkhVcGdyYWRlSXRlbSBmcm9tICcuLi9kaXNwbGF5L1JIVXBncmFkZUl0ZW0nO1xuaW1wb3J0IFBsYXllclRleHRJbnB1dCBmcm9tICcuLi9pbnB1dC9QbGF5ZXJUZXh0SW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWJCdWlsZGVyIHtcblxuICAgIC8vIEFsbCBjbGFzc2VzIHlvdSBpbnRlbmRlZCB0byBpbnN0YW50aWF0ZSBuZWVkIHRvIGV4aXN0IHdpdGggdGhpcyBvYmplY3QuXG4gICAgLy8gSWYgdGhlcmUgdHlwZSBoZXJlIGRvZXMgbm90IG1hdGNoIHRoZSB0eXBlIHBhcmVtIGZyb20gdGhlIGltcG9ydCBmaWxlLCBcbiAgICAvLyB0aGVuIHRoZSBCdWlsZGVyIHdpbGwgc2tpcCBvdmVyIHRoYXQgY2xhc3MuXG4gICAgcHVibGljIHN0YXRpYyBwcmVmYWJDbGFzc2VzOiB7fSA9IHtcbiAgICAgICAgcHJlZmFiOiBSSFByZWZhYixcbiAgICAgICAgdGV4dDogUkhUZXh0LFxuICAgICAgICBidXR0b246IFJIQnV0dG9uLFxuICAgICAgICBsaXZlczogRnJ1aXRMaWZlLCBcbiAgICAgICAgc2NvcmU6IEZydWl0U2NvcmUsXG4gICAgICAgIHNwYXduZXI6IFNwYXduZXIsXG4gICAgICAgIHVwZ3JhZGU6IFJIVXBncmFkZUl0ZW0sXG4gICAgICAgIGlucHV0ZmllbGQ6IFBsYXllclRleHRJbnB1dFxuICAgIH07IFxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgZ2FtZTogUGhhc2VyLkdhbWUgPSBudWxsO1xuXG4gICAgLy8gQ3JlYXRlcyBhbGwgb2JqZWN0cyBmb3IgYSBnaXZlbiBzY2VuZSwgb24gdGhhdCBzY2VuZS4gICAgXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTY2VuZUZyb20oZGF0YTogSVNjZW5lRGF0YSwgc2NlbmU6IEJhc2VTdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoc2NlbmUgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBsZXQgZ3JvdXBOYW1lLCBwcmVmYWJOYW1lO1xuICAgICAgICBzY2VuZS5wcmVmYWJzID0gW107XG4gICAgICAgIHNjZW5lLmdyb3VwcyA9IHt9O1xuXG4gICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZ3JvdXAgZGF0YS5cbiAgICAgICAgICAgIGRhdGEuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICghc2NlbmUuZ3JvdXBzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUuZ3JvdXBzW2dyb3VwTmFtZV0gPSBzY2VuZS5hZGQuZEdyb3VwKDAsIDAsIGdyb3VwTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBwcmVmYWIgZGF0YS5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5wcmVmYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFByZWZhYkJ1aWxkZXIucHJlZmFiQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByZWZhYnNbaV0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHByZWZhYlxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJlZmFiID0gdGhpcy5jcmVhdGVQcmVmYWIoZGF0YS5wcmVmYWJzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFic1tpXS5oYXNPd25Qcm9wZXJ0eShcImdyb3VwXCIpICYmIHNjZW5lLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByZWZhYnNbaV0uZ3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5ncm91cHNbZGF0YS5wcmVmYWJzW2ldLmdyb3VwXS5hZGRDaGlsZChwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuYWRkLmV4aXN0aW5nKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2NlbmUucHJlZmFic1twcmVmYWIubmFtZV0gPSBwcmVmYWI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBhbGwgcHJlZmFicyBmcm9tIGEgZ2l2ZW4gZGF0YSBvYmplY3QuXG4gICAgLy8gUmV0dXJucyBhIGdyb3VwIHdpdGggdGhlbSBpbiBpdC5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVByZWZhYnNGcm9tKGRhdGE6IElTY2VuZURhdGEpOiBHcm91cCB7XG4gICAgICAgIGxldCBncm91cE5hbWUsIHByZWZhYk5hbWU7XG4gICAgICAgIGxldCBncm91cHMgPSB7fTtcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgR3JvdXAoMCwgMCwgJ3Jvb3QnKTtcblxuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZ3JvdXBzWydiYXNpYyddID0gbmV3IEdyb3VwKDAsIDAsIGdyb3VwTmFtZSk7XG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZ3JvdXAgZGF0YS5cbiAgICAgICAgICAgIGRhdGEuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwTmFtZSkge1xuICAgICAgICAgICAgICAgIGdyb3Vwc1tncm91cE5hbWVdID0gbmV3IEdyb3VwKDAsIDAsIGdyb3VwTmFtZSk7XG4gICAgICAgICAgICAgICAgcm9vdC5hZGRDaGlsZChncm91cHNbZ3JvdXBOYW1lXSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHByZWZhYiBkYXRhLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnByZWZhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoUHJlZmFiQnVpbGRlci5wcmVmYWJDbGFzc2VzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcHJlZmFiXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmVmYWIgPSB0aGlzLmNyZWF0ZVByZWZhYihkYXRhLnByZWZhYnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmVmYWJzW2ldLmhhc093blByb3BlcnR5KFwiZ3JvdXBcIikgJiYgZ3JvdXBzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS5ncm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tkYXRhLnByZWZhYnNbaV0uZ3JvdXBdLmFkZENoaWxkKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb290LmFkZENoaWxkKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQcmVmYWIoZGF0YTogYW55LCBwYXJlbnQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgICAgICBsZXQgcHJlZmFiUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBsZXQgcHJlZmFiOiBhbnk7XG4gICAgICAgIC8vIGNyZWF0ZSBvYmplY3QgYWNjb3JkaW5nIHRvIGl0cyB0eXBlXG4gICAgICAgIGlmICh0aGlzLnByZWZhYkNsYXNzZXMuaGFzT3duUHJvcGVydHkoZGF0YS50eXBlKSkge1xuICAgICAgICAgICAgLy8gSWYgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIDAgYW5kIGxlc3MgdGhhbiAxLCB3ZSBhc3N1bWUgdGhpcyBpcyBhIGZsb2F0aW5nXG4gICAgICAgICAgICAvLyBwb2ludCB2YWx1ZSB0byBiZSBpbnRlcnByZXRlZCBhcyBhICUgYmFzZWQgcG9zaXRpb24uXG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbi54ID4gMCAmJiBkYXRhLnBvc2l0aW9uLnggPD0gMSkge1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIGFzIHBlcmNlbnRhZ2UsIGRlcGVuZGVudCBvbiBwYXJlbnQuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi54ID0gZGF0YS5wb3NpdGlvbi54ICogUHJlZmFiQnVpbGRlci5nYW1lLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi55ID0gZGF0YS5wb3NpdGlvbi55ICogUHJlZmFiQnVpbGRlci5nYW1lLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnggPSBkYXRhLnBvc2l0aW9uLnggKiBwYXJlbnQucmVhbFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi55ID0gZGF0YS5wb3NpdGlvbi55ICogcGFyZW50LnJlYWxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbiA9IGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi54ID0gZGF0YS5wb3NpdGlvbi54IC0gcGFyZW50Lng7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnkgPSBkYXRhLnBvc2l0aW9uLnkgLSBwYXJlbnQueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVmYWIgPSBuZXcgdGhpcy5wcmVmYWJDbGFzc2VzW2RhdGEudHlwZV0oZGF0YS5uYW1lLCBwcmVmYWJQb3NpdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY29tcG9uZW50c1wiKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wID0gUHJlZmFiQnVpbGRlci5jcmVhdGVQcmVmYWIoZGF0YS5jb21wb25lbnRzW2ldLCBwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWIuYWRkQ2hpbGQoY29tcCk7XG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZWZhYjtcbiAgICB9XG59IiwiaW1wb3J0IHtTdGF0ZX0gZnJvbSBcImRpam9uL2NvcmVcIjtcbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL0Jhc2VNZWRpYXRvclwiO1xuaW1wb3J0IHsgSVNjZW5lRGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuaW1wb3J0IFByZWZhYkJ1aWxkZXIgZnJvbSAnLi4vdXRpbHMvUHJlZmFiQnVpbGRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBwcml2YXRlIF91cGRhdGVBbGxvd2VkOiBib29sZWFuICA9IGZhbHNlO1xuXG4gICAgLy8gVGhpcyB3aWxsIGJlIGFuIGFycmF5IGNvbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gZXZlcnkgUHJlZmFiIGJ1aWx0IGZvciB0aGlzIHNjZW5lLiAgICBcbiAgICBwdWJsaWMgcHJlZmFiczogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAvLyBUaGlzIHdpbGwgYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgZWFjaCBncm91cCwgYWRkZWQgdGhyb3VnaCB0aGUgcHJlZmFiIGJ1aWxkZXIsIGFzIGEgcHJvcGVydHkgb24gdGhlIG9iamVjdC5cbiAgICBwdWJsaWMgZ3JvdXBzOiBhbnk7XG4gICAgcHVibGljIF9sZXZlbERhdGE6IElTY2VuZURhdGEgPSBudWxsO1xuXG4gICAgcHVibGljIGluaXQobGV2ZWxEYXRhOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xldmVsRGF0YSA9IGxldmVsRGF0YTtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucHJlbG9hZCgpO1xuICAgICAgICBpZiAodGhpcy5fbGV2ZWxEYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEFzc2V0cyh0aGlzLl9sZXZlbERhdGEuYXNzZXRFbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbGV2ZWxEYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBQcmVmYWJCdWlsZGVyLmNyZWF0ZVNjZW5lRnJvbSh0aGlzLl9sZXZlbERhdGEsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckJ1aWxkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5hZnRlckJ1aWxkKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsbG93ZWQgPSB0cnVlO1xuICAgIH0gICAgXG5cbiAgICBwcm90ZWN0ZWQgX2ZpbmRQcmVmYWIobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMucHJlZmFicy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlZmFic1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oXCJQcmVmYWIgXCIgKyBuYW1lICsgXCIgbm90IGZvdW5kIG9uIFN0YXRlLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZUFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVzZSBtZSBmb3IgdXBkYXRlIGxvb3BzIC0gSSB3aWxsIG9ubHkgYmUgY2FsbGVkIHdoZW4gdXBkYXRlQWxsb3dlZCBpcyB0cnVlLiAgICBcbiAgICBwdWJsaWMgdXBkYXRlU3RhdGUoKTogdm9pZCB7IH1cblxuICAgIHB1YmxpYyBnZXQgdXBkYXRlQWxsb3dlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUFsbG93ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB1cGRhdGVBbGxvd2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsbG93ZWQgPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmaXJlYmFzZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lWydmaXJlYmFzZSddO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3RNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnYm9vdE1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIG9uUmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfSU5JVCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gdmlld0NvbXBvbmVudFxuICAgIHB1YmxpYyBib290Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUpO1xuICAgIH1cblx0XHRcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQm9vdE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQm9vdE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9Cb290TWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBCb290TWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh3aW5kb3dbJ3ZlcnNpb24nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQuY2FjaGVCdXN0VmVyc2lvbiA9ICdAQHZlcnNpb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignZ2FtZV9kYXRhJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignYXNzZXRzJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignY29weScpO1xuICAgIH1cblxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGJ1aWxkSW50ZXJmYWNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yLmJvb3RDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHJvdGVjdGVkIGdldCBtZWRpYXRvcigpOiBCb290TWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPEJvb3RNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59IiwiaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4uL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdwcmVsb2FkTWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gUHJlbG9hZCBzdGF0ZVxuXG4gICAgcHVibGljIG5vdGlmeVByZWxvYWRDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuUFJFTE9BRF9DT01QTEVURSk7XG4gICAgfSAgIFxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFByZWxvYWRNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgUHJlbG9hZE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9QcmVsb2FkTWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBQcmVsb2FkTWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkQXNzZXRzKCdyZXF1aXJlZCcpO1xuICAgIH1cblx0XHRcbiAgICBwdWJsaWMgYnVpbGRJbnRlcmZhY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3Iubm90aWZ5UHJlbG9hZENvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9MT0dJTik7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHByb3RlY3RlZCBnZXQgbWVkaWF0b3IoKTogUHJlbG9hZE1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxQcmVsb2FkTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgTWVudSBmcm9tICcuLi9zdGF0ZS9NZW51JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdtZW51TWVkaWF0b3InO1xuXHRcdFxuICAgIHB1YmxpYyBnZXQgYXVkaW9TcHJpdGVEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5nZXREYXRhKClbJ2F1ZGlvc3ByaXRlJ107XG4gICAgfSAgXG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gTWVudU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtZW51KCk6IE1lbnUge1xuICAgICAgICByZXR1cm4gPE1lbnU+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7VGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyc30gZnJvbSAnZGlqb24vdXRpbHMnO1xuaW1wb3J0IE1lbnVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9NZW51TWVkaWF0b3InO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICBwcm90ZWN0ZWQgX2J1aWxkQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnRQcmVzZXROYW1lOiBudW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgX3RpdGxlOiBQaGFzZXIuVGV4dDtcbiAgICBwcm90ZWN0ZWQgX2JnOiBQaGFzZXIuSW1hZ2U7XG5cbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQobGV2ZWxEYXRhOiBhbnkpIHtcbiAgICAgICAgc3VwZXIuaW5pdChsZXZlbERhdGEpO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBNZW51TWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcbiAgICBcbiAgICBwdWJsaWMgY2xlYXJWaXN1YWxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aXRsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2JnLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5QnRuOiBSSEJ1dHRvbiA9IHRoaXMuX2ZpbmRQcmVmYWIoXCJnYW1lX2J1dHRvblwiKTtcbiAgICAgICAgaWYgKHBsYXlCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBsYXlCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uUGxheVByZXNzZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3RvcmVCdG46IFJIQnV0dG9uID0gPFJIQnV0dG9uPnRoaXMuX2ZpbmRQcmVmYWIoXCJzdG9yZV9idXR0b25cIik7XG4gICAgICAgIGlmIChzdG9yZUJ0biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RvcmVCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uU3RvcmVQcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uUGxheVByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9HQU1FKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJpdmF0ZSBfb25TdG9yZVByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9TVE9SRSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU0ZYKCk6IHZvaWQge1xuICAgICAgICBDb25zdGFudHMuU0ZYX0VOQUJMRUQgPSAhQ29uc3RhbnRzLlNGWF9FTkFCTEVEO1xuICAgIH0gICAgICAgXG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLndpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBtZWRpYXRvcigpOiBNZW51TWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPE1lbnVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi4vc3RhdGUvR2FtZXBsYXknO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdnYW1lcGxheW1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5HQU1FX0xFVkVMX0ZBSUxFRFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NUOlxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXAub25HYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbmNyZWFzZUxpdmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5MSUZFX0VBUk5FRCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBkZWNyZWFzZUxpdmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5MSUZFX0xPU1QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbmNyZWFzZVNjb3JlKHNjb3JlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuQUREX1RPX1NDT1JFLCBzY29yZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBleHRyYUxpdmVzVXBkZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldFVwZ3JhZGVWYWx1ZShDb25zdGFudHMuVVBHUkFERV9MSVZFUyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgYmxhZGVXaWR0aFVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldFVwZ3JhZGVWYWx1ZShDb25zdGFudHMuVVBHUkFERV9CTEFERVdJRFRIKTtcbiAgICB9ICAgXG4gICAgICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBHYW1lcGxheU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2aWV3Q29tcCgpOiBHYW1lcGxheSB7XG4gICAgICAgIHJldHVybiA8R2FtZXBsYXk+dGhpcy52aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdEN1dCBleHRlbmRzIFBoYXNlci5HcmFwaGljcyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIENPTE9SOiBudW1iZXI7XG4gICAgcHVibGljIHN0YXRpYyBXSURUSDogbnVtYmVyO1xuICAgIHB1YmxpYyBzdGF0aWMgTElGRV9USU1FOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBQaGFzZXIuR2FtZSkge1xuICAgICAgICBzdXBlcihnYW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0N1dCh4OiBudW1iZXIsIHk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lU3R5bGUoRnJ1aXRDdXQuV0lEVEgsIEZydWl0Q3V0LkNPTE9SLCAwLjUpO1xuICAgICAgICB0aGlzLmRyYXdQb2x5Z29uKFt4LCB5XSk7XG4gICAgICAgIHRoaXMubGluZVRvKGVuZFgsIGVuZFkpO1xuICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKFBoYXNlci5UaW1lci5TRUNPTkQgKiBGcnVpdEN1dC5MSUZFX1RJTUUsIHRoaXMua2lsbCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGtpbGwoKTogUGhhc2VyLkdyYXBoaWNzIHtcbiAgICAgICAgc3VwZXIua2lsbCgpO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgR2FtZXBsYXlNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9HYW1lcGxheU1lZGlhdG9yJztcbmltcG9ydCBSSEJ1dHRvbiBmcm9tICcuLi9kaXNwbGF5L1JIQnV0dG9uJztcbmltcG9ydCBGcnVpdEN1dCBmcm9tICcuLi9nYW1lcGxheS9GcnVpdEN1dCc7XG5pbXBvcnQgRnJ1aXRDdXR0YWJsZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdEN1dHRhYmxlJztcbmltcG9ydCBTcGF3bmVyIGZyb20gJy4uL2dhbWVwbGF5L1NwYXduZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBNSU5fU1dJUEVfRElTVEFOQ0U6IG51bWJlciA9IDEwO1xuXG4gICAgcHJvdGVjdGVkIF9zd2lwZVN0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTsgICAgXG5cbiAgICBwcm90ZWN0ZWQgX2J1aWxkQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0U3dpcGVQdDogUGhhc2VyLlBvaW50O1xuICAgIHByb3RlY3RlZCBfY3V0TGluZTogUGhhc2VyLkxpbmU7XG5cbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQobGV2ZWxEYXRhOiBhbnkpIHtcbiAgICAgICAgc3VwZXIuaW5pdChsZXZlbERhdGEpO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBHYW1lcGxheU1lZGlhdG9yKCk7XG4gICAgICAgIHRoaXMuX3N3aXBlU3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cblx0XHRcbiAgICAvLyBkaWpvbi5jb3JlLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0QnVpbGRTZXF1ZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRoaXMuX2luaXRTdGF0c0FuZFVwZ3JhZGVzLFxuICAgICAgICAgICAgdGhpcy5fYWRkSW5wdXRFdmVudHNcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckJ1aWxkKCkge1xuICAgICAgICBzdXBlci5hZnRlckJ1aWxkKCk7XG4gICAgICAgIHRoaXMuX2J1aWxkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdGFydFNwYXduZXJzKCk7XG4gICAgfSBcblxuICAgIHB1YmxpYyBvbkdhbWVPdmVyKCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBvdmVyIG1hbicpO1xuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX2luaXRTdGF0c0FuZFVwZ3JhZGVzKCk6IHZvaWQge1xuICAgICAgICBGcnVpdEN1dC5DT0xPUiA9IDB4YmZiZmJmO1xuICAgICAgICBGcnVpdEN1dC5XSURUSCA9IDMgKyB0aGlzLm1lZGlhdG9yLmJsYWRlV2lkdGhVcGdyYWRlO1xuICAgICAgICBGcnVpdEN1dC5MSUZFX1RJTUUgPSAwLjI1O1xuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX2FkZElucHV0RXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCh0aGlzLl9vbklucHV0RG93biwgdGhpcyk7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLl9vbklucHV0VXAsIHRoaXMpO1xuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX29uSW5wdXREb3duKHBvaW50ZXI6IFBoYXNlci5Qb2ludCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zd2lwZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdGFydFN3aXBlUHQgPSBuZXcgUGhhc2VyLlBvaW50KHBvaW50ZXIueCwgcG9pbnRlci55KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uSW5wdXRVcChwb2ludGVyOiBQaGFzZXIuUG9pbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3N3aXBlU3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zd2lwZVN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gUGhhc2VyLlBvaW50LmRpc3RhbmNlKHRoaXMuX3N0YXJ0U3dpcGVQdCwgbmV3IFBoYXNlci5Qb2ludChwb2ludGVyLngsIHBvaW50ZXIueSkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPj0gR2FtZXBsYXkuTUlOX1NXSVBFX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXRMaW5lID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuX3N0YXJ0U3dpcGVQdC54LCB0aGlzLl9zdGFydFN3aXBlUHQueSwgcG9pbnRlci54LCBwb2ludGVyLnkpO1xuICAgICAgICAgICAgbGV0IGN1dDogRnJ1aXRDdXQgPSB0aGlzLl9kcmF3Q3V0KCk7XG4gICAgICAgICAgICBsZXQgc3Bhd25lcnM6IFBoYXNlci5Hcm91cCA9IHRoaXMuZ3JvdXBzW1wic3Bhd25lcnNcIl07XG4gICAgICAgICAgICBpZiAoc3Bhd25lcnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXduZXJzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEdyb3VwID0gPFBoYXNlci5Hcm91cD5zcGF3bmVycy5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgICAgIG5leHRHcm91cC5mb3JFYWNoQWxpdmUodGhpcy5fY2hlY2tDb2xsaXNpb25zLCB0aGlzLCBjdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kcmF3Q3V0KCk6IEZydWl0Q3V0IHtcbiAgICAgICAgbGV0IGN1dCA9IG5ldyBGcnVpdEN1dCh0aGlzLmdhbWUpO1xuICAgICAgICB0aGlzLmdyb3Vwc1tcImN1dHNcIl0uYWRkQ2hpbGQoY3V0KTtcbiAgICAgICAgY3V0LmRyYXdDdXQodGhpcy5fY3V0TGluZS5zdGFydC54LCB0aGlzLl9jdXRMaW5lLnN0YXJ0LnksIHRoaXMuX2N1dExpbmUuZW5kLngsIHRoaXMuX2N1dExpbmUuZW5kLnkpO1xuICAgICAgICByZXR1cm4gY3V0O1xuICAgIH0gICBcblxuICAgIHByb3RlY3RlZCBfY2hlY2tDb2xsaXNpb25zKGN1dHRhYmxlOiBQaGFzZXIuU3ByaXRlLCBjdXQ6IEZydWl0Q3V0KTogdm9pZCB7XG4gICAgICAgIGlmIChjdXR0YWJsZS5ib2R5KSB7XG4gICAgICAgICAgICBsZXQgbGluZTEgPSBuZXcgUGhhc2VyLkxpbmUoY3V0dGFibGUubGVmdCwgY3V0dGFibGUuYm90dG9tLCBjdXR0YWJsZS5sZWZ0LCBjdXR0YWJsZS50b3ApO1xuICAgICAgICAgICAgbGV0IGxpbmUyID0gbmV3IFBoYXNlci5MaW5lKGN1dHRhYmxlLmxlZnQsIGN1dHRhYmxlLnRvcCwgY3V0dGFibGUucmlnaHQsIGN1dHRhYmxlLnRvcCk7XG4gICAgICAgICAgICBsZXQgbGluZTMgPSBuZXcgUGhhc2VyLkxpbmUoY3V0dGFibGUucmlnaHQsIGN1dHRhYmxlLnRvcCwgY3V0dGFibGUucmlnaHQsIGN1dHRhYmxlLmJvdHRvbSk7XG4gICAgICAgICAgICBsZXQgbGluZTQgPSBuZXcgUGhhc2VyLkxpbmUoY3V0dGFibGUucmlnaHQsIGN1dHRhYmxlLmJvdHRvbSwgY3V0dGFibGUubGVmdCwgY3V0dGFibGUuYm90dG9tKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IHRoaXMuX2N1dExpbmUuaW50ZXJzZWN0cyhsaW5lMSkgfHwgdGhpcy5fY3V0TGluZS5pbnRlcnNlY3RzKGxpbmUyKSB8fCB0aGlzLl9jdXRMaW5lLmludGVyc2VjdHMobGluZTMpIHx8IHRoaXMuX2N1dExpbmUuaW50ZXJzZWN0cyhsaW5lNCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25PYmplY3RDdXQoKDxGcnVpdEN1dHRhYmxlPmN1dHRhYmxlKS5jdXRPYmplY3QoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uT2JqZWN0Q3V0KHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRnJ1aXRDdXR0YWJsZS5UWVBFUy5mcnVpdDpcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhdG9yLmluY3JlYXNlU2NvcmUoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRnJ1aXRDdXR0YWJsZS5UWVBFUy5ib21iOlxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWF0b3IuZGVjcmVhc2VMaXZlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEZydWl0Q3V0dGFibGUuVFlQRVMuc3BlY2lhbDpcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhdG9yLmluY3JlYXNlU2NvcmUoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF9zdGFydFNwYXduZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgc3Bhd25lcnM6IFBoYXNlci5Hcm91cCA9IHRoaXMuZ3JvdXBzWydzcGF3bmVycyddO1xuICAgICAgICBzcGF3bmVycy5jYWxsQWxsKFwicXVldWVOZXh0U3Bhd25cIiwgbnVsbCk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgX3RvZ2dsZVNGWCgpOiB2b2lkIHtcbiAgICAgICAgQ29uc3RhbnRzLlNGWF9FTkFCTEVEID0gIUNvbnN0YW50cy5TRlhfRU5BQkxFRDtcbiAgICB9ICAgICAgIFxuXG4gICAgcHVibGljIGdldCByZWFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogR2FtZXBsYXlNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8R2FtZXBsYXlNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi4vc3RhdGUvU3RvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdzdG9yZW1lZGlhdG9yJztcblxuICAgIHB1YmxpYyBnZXQgcGxheWVyR29sZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTW9kZWwuY3VycmVudFBsYXllckdvbGQ7XG4gICAgfVxuXG4gICAgcHVibGljIGF0dGVtcHRUb1NwZW5kR29sZChhbW91bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5nYW1lTW9kZWwuZ29sZFNwZW50KGFtb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkdPTERfQ0hBTkdFRCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBub3RpZnlVcGdyYWRlUHVyY2hhc2VkKHVEYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwuYWRkVXBncmFkZSh1RGF0YSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBTdG9yZU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdG9yZSgpOiBTdG9yZSB7XG4gICAgICAgIHJldHVybiA8U3RvcmU+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7VGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyc30gZnJvbSAnZGlqb24vdXRpbHMnO1xuaW1wb3J0IFN0b3JlTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvU3RvcmVNZWRpYXRvcic7XG5pbXBvcnQgUkhVcGdyYWRlSXRlbSBmcm9tICcuLi9kaXNwbGF5L1JIVXBncmFkZUl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSBleHRlbmRzIEJhc2VTdGF0ZSB7XG5cbiAgICBwcm90ZWN0ZWQgX2J1aWxkQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gU3RvcmVNZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKFN0b3JlTWVkaWF0b3IuTUVESUFUT1JfTkFNRSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tZWRpYXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgU3RvcmVNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblx0XHRcbiAgICAvLyBkaWpvbi5jb3JlLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0QnVpbGRTZXF1ZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwSW5wdXRFdmVudHNcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckJ1aWxkKCkge1xuICAgICAgICBzdXBlci5hZnRlckJ1aWxkKCk7XG4gICAgICAgIHRoaXMuX2J1aWxkQ29tcGxldGUgPSB0cnVlO1xuICAgIH0gXG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBidXR0b25zOiBQaGFzZXIuR3JvdXAgPSB0aGlzLmdyb3Vwc1snc3RvcmVfaXRlbXMnXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdXBncmFkZSA9IDxSSFVwZ3JhZGVJdGVtPmJ1dHRvbnMuZ2V0Q2hpbGRBdChpKTtcbiAgICAgICAgICAgIHVwZ3JhZGUub25JbnB1dERvd24uYWRkKHRoaXMub25VcGdyYWRlUHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcXVpdEJ0bjogUGhhc2VyLkJ1dHRvbiA9IDxQaGFzZXIuQnV0dG9uPnRoaXMuX2ZpbmRQcmVmYWIoJ3F1aXRCdXR0b24nKTtcbiAgICAgICAgY29uc29sZS5sb2cocXVpdEJ0bik7XG4gICAgICAgIGlmIChxdWl0QnRuICE9PSBudWxsKSB7XG4gICAgICAgICAgICBxdWl0QnRuLm9uSW5wdXREb3duLmFkZE9uY2UodGhpcy5fYmFja1RvVGl0bGUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfYmFja1RvVGl0bGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmFjayB0byBtZW51XCIpO1xuICAgICAgICB0aGlzLm1lZGlhdG9yLnJlcXVlc3RTdGF0ZUNoYW5nZShDb25zdGFudHMuU1RBVEVfTUVOVSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVXBncmFkZVByZXNzZWQodXBncmFkZTogUkhVcGdyYWRlSXRlbSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tZWRpYXRvci5hdHRlbXB0VG9TcGVuZEdvbGQodXBncmFkZS5iYXNlQ29zdCkpIHtcbiAgICAgICAgICAgIHVwZ3JhZGUuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlVcGdyYWRlUHVyY2hhc2VkKHVwZ3JhZGUudXBncmFkZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdXBncmFkZS5mbGFzaENvc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IFN0b3JlTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPFN0b3JlTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICAiLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IExvZ2luIGZyb20gJy4uL3N0YXRlL0xvZ2luJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5NZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnbG9naW5tZWRpYXRvcic7XG5cbiAgICBwdWJsaWMgZ2V0IHNhdmVEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5zYXZlRGF0YTtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIHVwZGF0ZVNhdmVEYXRhKHNuYXBzaG90OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwudXBkYXRlU2F2ZURhdGEoc25hcHNob3QpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gTG9naW5NZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbG9naW4oKTogTG9naW4ge1xuICAgICAgICByZXR1cm4gPExvZ2luPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBMb2dpbk1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL0xvZ2luTWVkaWF0b3InO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IFBsYXllclRleHRJbnB1dCBmcm9tICcuLi9pbnB1dC9QbGF5ZXJUZXh0SW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICBwcm90ZWN0ZWQgX2J1aWxkQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnRQcmVzZXROYW1lOiBudW1iZXI7XG4gICAgXG4gICAgcHJvdGVjdGVkIF90aXRsZTogUGhhc2VyLlRleHQ7XG4gICAgcHJvdGVjdGVkIF9iZzogUGhhc2VyLkltYWdlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudEZpZWxkOiBQbGF5ZXJUZXh0SW5wdXQgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIF9sb2dpbkluZm86IHsgZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB9O1xuICAgIFxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gTG9naW5NZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKExvZ2luTWVkaWF0b3IuTUVESUFUT1JfTkFNRSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tZWRpYXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgTG9naW5NZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblx0XHRcbiAgICAvLyBkaWpvbi5jb3JlLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0QnVpbGRTZXF1ZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwSW5wdXRFdmVudHNcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckJ1aWxkKCkge1xuICAgICAgICBzdXBlci5hZnRlckJ1aWxkKCk7XG4gICAgICAgIHRoaXMuX2J1aWxkQ29tcGxldGUgPSB0cnVlO1xuICAgIH0gXG4gICAgXG4gICAgcHVibGljIGNsZWFyVmlzdWFscygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGl0bGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9iZy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXR1cElucHV0RXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBsZXQgcGxheUJ0bjogUkhCdXR0b24gPSB0aGlzLl9maW5kUHJlZmFiKFwibG9naW5CdXR0b25cIik7XG4gICAgICAgIGlmIChwbGF5QnRuICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwbGF5QnRuLm9uSW5wdXREb3duLmFkZCh0aGlzLl9vbkxvZ2luUHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbWFpbDogUGxheWVyVGV4dElucHV0ID0gdGhpcy5fZmluZFByZWZhYignZW1haWxJbnB1dCcpO1xuICAgICAgICBpZiAoZW1haWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGVtYWlsLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5fc2VsZWN0ZWRGaWVsZCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50RmllbGQgPSBlbWFpbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXNzdzogUGxheWVyVGV4dElucHV0ID0gdGhpcy5fZmluZFByZWZhYigncGFzc3dvcmRJbnB1dCcpO1xuICAgICAgICBpZiAocGFzc3cgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBhc3N3LmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5fc2VsZWN0ZWRGaWVsZCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIG51bGwsIG51bGwsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBoYW5kbGVLZXlib2FyZElucHV0KGtleTogUGhhc2VyLktleUNvZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRGaWVsZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFyYWN0ZXI6IHN0cmluZyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5sYXN0Q2hhcjtcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGaWVsZC5yZW1vdmVMYXN0Q2hhcmFjdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZWxzZSBpZiAoY2hhcmFjdGVyID09PSBQaGFzZXIuS2V5KSB7XG4gICAgICAgIC8vICAgICB0aGlzLl9jdXJyZW50RmllbGQuY2xlYXJGaWVsZCgpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciAhPT0gJyAnICYmIGNoYXJhY3RlciAhPT0gJycpIHtcbiAgICAgICAgICAgdGhpcy5fY3VycmVudEZpZWxkLnVwZGF0ZUxhYmVsKGNoYXJhY3Rlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZEZpZWxkKGlucHV0RmllbGQ6IFBsYXllclRleHRJbnB1dCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50RmllbGQgPSBpbnB1dEZpZWxkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uTG9naW5QcmVzc2VkKCk6IHZvaWQge1xuICAgICAgICBsZXQgZW1haWw6IFBsYXllclRleHRJbnB1dCA9IHRoaXMuX2ZpbmRQcmVmYWIoJ2VtYWlsSW5wdXQnKTtcbiAgICAgICAgbGV0IHBhc3N3OiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdwYXNzd29yZElucHV0Jyk7XG4gICAgICAgIGlmIChwYXNzdyAhPT0gbnVsbCAmJiBlbWFpbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9naW5JbmZvID0geyBlbWFpbDogZW1haWwuaW5wdXRUZXh0LCBwYXNzd29yZDogcGFzc3cuaW5wdXRUZXh0IH07XG4gICAgICAgICAgICB0aGlzLmF0dGVtcHRMb2dpbigpO1xuICAgICAgICB9XG4gICAgfSAgIFxuXG4gICAgcHVibGljIG9uTG9naW5FcnJvcihlcnJvcjogYW55LCBhdXRoRGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IFwiYXV0aC91c2VyLW5vdC1mb3VuZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHRoaXMuX2xvZ2luSW5mby5lbWFpbCwgdGhpcy5fbG9naW5JbmZvLnBhc3N3b3JkKS5jYXRjaCh0aGlzLm9uQ3JlYXRlVXNlciwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdXRoRGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIFN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yLnJlcXVlc3RTdGF0ZUNoYW5nZShDb25zdGFudHMuU1RBVEVfTUVOVSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG5cbiAgICBwdWJsaWMgb25DcmVhdGVVc2VyKGVycm9yOiBhbnksIHVzZXJEYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5hdHRlbXB0TG9naW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUGxheWVyRGF0YShzbmFwc2hvdDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYXRvci51cGRhdGVTYXZlRGF0YShzbmFwc2hvdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGxheWVyTmFtZSA9IHRoaXMuX2xvZ2luSW5mby5lbWFpbC5yZXBsYWNlKC9ALiovLCBcIlwiKTtcbiAgICAgICAgICAgIGxldCBpbml0RGF0YSA9IHRoaXMubWVkaWF0b3Iuc2F2ZURhdGE7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlKFwicGxheWVyXCIpLmNoaWxkKGluaXREYXRhLmtleSgpKS5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWUsXG4gICAgICAgICAgICAgICAgd2VhbHRoOiBpbml0RGF0YS53ZWFsdGgsXG4gICAgICAgICAgICAgICAgYmVzdFNjb3JlOiBpbml0RGF0YS5iZXN0U2NvcmUsXG4gICAgICAgICAgICAgICAgbGFzdFNjb3JlOiBpbml0RGF0YS5sYXN0U2NvcmUsXG4gICAgICAgICAgICAgICAgdXBncmFkZXM6IGluaXREYXRhLnVwZ3JhZGVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGF0dGVtcHRMb2dpbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxvZ2luQXR0ZW1wdDogYW55ID0gdGhpcy5maXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodGhpcy5fbG9naW5JbmZvLmVtYWlsLCB0aGlzLl9sb2dpbkluZm8ucGFzc3dvcmQpO1xuICAgICAgICBsb2dpbkF0dGVtcHQuY2F0Y2godGhpcy5vbkxvZ2luRXJyb3IsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvZ2dsZVNGWCgpOiB2b2lkIHtcbiAgICAgICAgQ29uc3RhbnRzLlNGWF9FTkFCTEVEID0gIUNvbnN0YW50cy5TRlhfRU5BQkxFRDtcbiAgICB9ICAgICAgIFxuXG4gICAgcHVibGljIGdldCByZWFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogTG9naW5NZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8TG9naW5NZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCB7QXBwbGljYXRpb259IGZyb20gXCJkaWpvbi9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IFJIR2FtZSBmcm9tIFwiLi9SSEdhbWVcIjtcbmltcG9ydCB7RGV2aWNlfSBmcm9tIFwiZGlqb24vdXRpbHNcIjtcbmltcG9ydCB7Q29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5cbmltcG9ydCBBcHBsaWNhdGlvbk1lZGlhdG9yIGZyb20gXCIuL21lZGlhdG9yL0FwcGxpY2F0aW9uTWVkaWF0b3JcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tIFwiLi91dGlscy9Ob3RpZmljYXRpb25zXCI7XG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZS9Cb290XCI7XG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZS9QcmVsb2FkXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi9zdGF0ZS9NZW51XCI7XG5pbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9zdGF0ZS9HYW1lcGxheSc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdGF0ZS9TdG9yZSc7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi9zdGF0ZS9Mb2dpbic7XG5pbXBvcnQgeyBHYW1lTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCBQcmVmYWJCdWlsZGVyIGZyb20gJy4vdXRpbHMvUHJlZmFiQnVpbGRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG4gICAgcHVibGljIGdhbWVJZDogc3RyaW5nID0gbnVsbDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvLyBvdmVycmlkZXNcbiAgICBwdWJsaWMgY3JlYXRlR2FtZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IFJIR2FtZSh7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5fZ2V0R2FtZVdpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2dldEdhbWVIZWlnaHQoKSxcbiAgICAgICAgICAgIHBhcmVudDogJ2dhbWUtY29udGFpbmVyJyxcbiAgICAgICAgICAgIC8vcmVuZGVyZXI6IFBoYXNlci5DQU5WQVMsXG4gICAgICAgICAgICByZW5kZXJlcjogUGhhc2VyLkFVVE8sXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogZmFsc2UsXG4gICAgICAgICAgICAvLyB1c2UgdGhpcyBpZiB5b3Ugd2FudCB0byBzd2l0Y2ggYmV0d2VlbiBAMnggYW5kIEAxeCBncmFwaGljc1xuICAgICAgICAgICAgcmVzb2x1dGlvbjogdGhpcy5fZ2V0UmVzb2x1dGlvbigpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEFwcGxpY2F0aW9uTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIHRoaXMuX2FkZFN0YXRlcygpO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIHN0YXJ0R2FtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KENvbnN0YW50cy5TVEFURV9CT09UKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYm9vdENvbXBsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkanVzdFNjYWxlU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5hZGp1c3RSZW5kZXJlclNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuYWRkUGx1Z2lucygpO1xuICAgICAgICBQcmVmYWJCdWlsZGVyLmdhbWUgPSB0aGlzLmdhbWU7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBhZGp1c3RTY2FsZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnNldE1pbk1heCgyNTYsIDE5MiwgMTAyNCwgNzY4KTtcbiAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkanVzdFJlbmRlcmVyU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZS5mb3JjZVNpbmdsZVVwZGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEucm91bmRQeCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUuYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAvLyAgICB0aGlzLmdhbWUucmVuZGVyZXIuY2xlYXJCZWZvcmVSZW5kZXIgPSB0aGlzLmdhbWUucmVuZGVyVHlwZSA9PT0gUGhhc2VyLkNBTlZBUztcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZnJvbSB0aGUgYm9vdCBzdGF0ZSBhcyB3ZSBjYW4ndCBpbml0aWFsaXplIHBsdWdpbnMgdW50aWwgdGhlIGdhbWUgaXMgYm9vdGVkXG4gICAgcHVibGljIHJlZ2lzdGVyTW9kZWxzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBnYW1lTW9kZWwgPSBuZXcgR2FtZU1vZGVsKCdnYW1lX2RhdGEnKTtcbiAgICAgICAgY29uc3QgY29weU1vZGVsID0gbmV3IENvcHlNb2RlbCgnY29weScpO1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC5wb3N0Qm9vdExvYWQoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gICAgLy8gYWRkcyBzdGF0ZXNcbiAgICBwcml2YXRlIF9hZGRTdGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX0JPT1QsIEJvb3QpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9QUkVMT0FELCBQcmVsb2FkKTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfTUVOVSwgTWVudSk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX0dBTUUsIEdhbWVwbGF5KTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfU1RPUkUsIFN0b3JlKTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfTE9HSU4sIExvZ2luKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHYW1lV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEdhbWVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZXNvbHV0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIGlmIChBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpICYmICFpc05hTihBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpKSkge1xuICAgICAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERldmljZS5tb2JpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKERldmljZS5waXhlbFJhdGlvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJlbmRlcmVyQnlEZXZpY2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIERldmljZS5tb2JpbGUgJiYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPCAyID8gUGhhc2VyLkNBTlZBUyA6IFBoYXNlci5BVVRPO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG1lZGlhdG9yKCk6IEFwcGxpY2F0aW9uTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPEFwcGxpY2F0aW9uTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBnYW1lTW9kZWwoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lTW9kZWw+dGhpcy5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvcHlNb2RlbCgpOiBDb3B5TW9kZWwge1xuICAgICAgICByZXR1cm4gPENvcHlNb2RlbD50aGlzLnJldHJpZXZlTW9kZWwoQ29weU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vc3VibW9kdWxlcy9kaWpvbi9idWlsZC9kaWpvbi5kLnRzXCIvPiBcbmltcG9ydCBCb2lsZXJQbGF0ZUFwcGxpY2F0aW9uIGZyb20gJy4vQm9pbGVyUGxhdGVBcHBsaWNhdGlvbic7XG5cbi8vIGJvb3RzdHJhcCB0aGUgYXBwXG5leHBvcnQgY29uc3QgYXBwID0gbmV3IEJvaWxlclBsYXRlQXBwbGljYXRpb24oKTsiLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvbn0gZnJvbSBcImRpam9uL2ludGVyZmFjZXNcIjtcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEhVREdvbGQgZnJvbSAnLi4vZ2FtZXBsYXkvSFVER29sZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVREdvbGRNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnaHVkZ29sZG1lZGlhdG9yJztcblxuICAgIC8vIGRpam9uLm12Yy5NZWRpYXRvciBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkdPTERfQ0hBTkdFRFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuR09MRF9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuZ29sZC51cGRhdGVHb2xkRGlzcGxheSh0aGlzLmdhbWVNb2RlbC5jdXJyZW50UGxheWVyR29sZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gSFVER29sZE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBnb2xkKCk6IEhVREdvbGQge1xuICAgICAgICByZXR1cm4gPEhVREdvbGQ+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IFJIVGV4dCBmcm9tICcuLi9kaXNwbGF5L1JIVGV4dCc7XG5pbXBvcnQgSFVER29sZE1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL0hVREdvbGRNZWRpYXRvcic7XG5pbXBvcnQgeyBJVGV4dERhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVER29sZCBleHRlbmRzIFJIVGV4dCB7XG5cbiAgICBwcm90ZWN0ZWQgX21lZGlhdG9yOiBIVURHb2xkTWVkaWF0b3I7XG4gICAgXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJVGV4dERhdGEpIHsgXG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSA8SFVER29sZE1lZGlhdG9yPkhVREdvbGRNZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKEhVREdvbGRNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBIVURHb2xkTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgcHVibGljIHVwZGF0ZUdvbGREaXNwbGF5KG5ld0Ftb3VudDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGV4dCA9IG5ld0Ftb3VudDtcbiAgICB9XG59IiwiaW1wb3J0IHtHcm91cCwgVGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge0lQcmVsb2FkSGFuZGxlcn0gZnJvbSAnZGlqb24vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWRlciBleHRlbmRzIEdyb3VwIGltcGxlbWVudHMgSVByZWxvYWRIYW5kbGVyIHtcbiAgICBzdGF0aWMgVEVTVDogbnVtYmVyID0gMTtcbiAgICBzdGF0aWMgVEVTVF8yOiBudW1iZXIgPSAyO1xuXG4gICAgcHJpdmF0ZSBfd2lwZXI6IFBoYXNlci5JbWFnZTtcbiAgICBwcml2YXRlIF9sb2FkVGV4dDogVGV4dDtcblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uSW5Db21wbGV0ZTogUGhhc2VyLlNpZ25hbCA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XG4gICAgcHVibGljIHRyYW5zaXRpb25PdXRDb21wbGV0ZTogUGhhc2VyLlNpZ25hbCA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XG5cbiAgICBwcml2YXRlIF9pblR3ZWVuOiBQaGFzZXIuVHdlZW47XG4gICAgcHJpdmF0ZSBfb3V0VHdlZW46IFBoYXNlci5Ud2VlbjtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgbmFtZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgfVxuXG4gICAgLy8gR3JvdXAgb3ZlcnJpZGVzXG4gICAgcHJvdGVjdGVkIGJ1aWxkSW50ZXJmYWNlKCkge1xuICAgICAgICB0aGlzLl9sb2FkVGV4dCA9IHRoaXMuYWRkSW50ZXJuYWwuZFRleHQoNTAsIDUwLCAnTG9hZGluZyAuLi4gJywgJ0FyaWFsJywgMzYsICcjRkZGRkZGJyk7XG5cbiAgICAgICAgbGV0IGdmeCA9IHRoaXMuZ2FtZS5hZGQuZ3JhcGhpY3MoKTtcbiAgICAgICAgZ2Z4LmJlZ2luRmlsbCgweDAwMDAwMCwgMSk7XG4gICAgICAgIGdmeC5kcmF3UmVjdCgwLCAwLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgICAgICBnZnguZW5kRmlsbCgpO1xuXG4gICAgICAgIHRoaXMuX3dpcGVyID0gdGhpcy5hZGRJbnRlcm5hbC5pbWFnZSgwLCAwLCBnZnguZ2VuZXJhdGVUZXh0dXJlKCkpO1xuXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5yZW1vdmUoZ2Z4LCB0cnVlKTtcblxuICAgICAgICB0aGlzLmFscGhhID0gMDtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5faW5Ud2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oeyBhbHBoYTogMSB9LCAzMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLk91dCk7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IGFscGhhOiAwIH0sIDIwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuSW4pO1xuXG4gICAgICAgIHRoaXMuX2luVHdlZW4ub25Db21wbGV0ZS5hZGQodGhpcy5faW4sIHRoaXMpO1xuICAgICAgICB0aGlzLl9vdXRUd2Vlbi5vbkNvbXBsZXRlLmFkZCh0aGlzLl9vdXQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIGlQcmVsb2FkSGFuZGxlciBpbXBsZW1lbnRhdGlvbnNcbiAgICBwdWJsaWMgbG9hZFN0YXJ0KCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcikge1xuICAgICAgICBjb25zdCByb3VuZGVkUHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKHByb2dyZXNzKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLl9sb2FkVGV4dC5zZXRUZXh0KCdMb2FkaW5nIC4uLiAnICsgcm91bmRlZFByb2dyZXNzICsgJyUnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZENvbXBsZXRlKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uSW4oKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2luVHdlZW4uc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbk91dCgpIHtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4uc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgICBwcm90ZWN0ZWQgX2luKCkge1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25JbkNvbXBsZXRlLmRpc3BhdGNoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vdXQoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25PdXRDb21wbGV0ZS5kaXNwYXRjaCgpO1xuICAgIH1cbn0iXX0=
