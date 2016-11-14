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
                Menu.prototype.onLogin = function (error, authData) {
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
                    this.firebase.auth().signInWithEmailAndPassword(this._loginInfo.email, this._loginInfo.password).catch(this.onLogin, this);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJIR2FtZS50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwiZGlzcGxheS9SSFByZWZhYi50cyIsImRpc3BsYXkvUkhUZXh0LnRzIiwiZGlzcGxheS9SSEJ1dHRvbi50cyIsIm1lZGlhdG9yL0ZydWl0TGlmZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRMaWZlLnRzIiwibWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRTY29yZS50cyIsImdhbWVwbGF5L0ZydWl0Q3V0dGFibGUudHMiLCJnYW1lcGxheS9TcGF3bmVyLnRzIiwiZGlzcGxheS9SSFVwZ3JhZGVJdGVtLnRzIiwiaW5wdXQvUGxheWVyVGV4dElucHV0LnRzIiwidXRpbHMvUHJlZmFiQnVpbGRlci50cyIsInN0YXRlL0Jhc2VTdGF0ZS50cyIsIm1lZGlhdG9yL0Jvb3RNZWRpYXRvci50cyIsInN0YXRlL0Jvb3QudHMiLCJtZWRpYXRvci9QcmVsb2FkTWVkaWF0b3IudHMiLCJzdGF0ZS9QcmVsb2FkLnRzIiwibWVkaWF0b3IvTWVudU1lZGlhdG9yLnRzIiwic3RhdGUvTWVudS50cyIsIm1lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3IudHMiLCJnYW1lcGxheS9GcnVpdEN1dC50cyIsInN0YXRlL0dhbWVwbGF5LnRzIiwibWVkaWF0b3IvU3RvcmVNZWRpYXRvci50cyIsInN0YXRlL1N0b3JlLnRzIiwibWVkaWF0b3IvTG9naW5NZWRpYXRvci50cyIsInN0YXRlL0xvZ2luLnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsIm1lZGlhdG9yL0hVREdvbGRNZWRpYXRvci50cyIsImdhbWVwbGF5L0hVREdvbGQudHMiLCJ1aS9QcmVsb2FkZXIu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Q2pCLGdCQUFNLEdBQVcsQ0FBQyxDQUFDO2dCQXNFOUIsZ0JBQUM7WUFBRCxDQXhFQSxBQXdFQyxDQXhFc0MsZUFBSyxHQXdFM0M7WUF4RUQsZ0NBd0VDLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZSB9IGZyb20gJ2Rpam9uL2NvcmUnO1xuaW1wb3J0IHsgSUdhbWVDb25maWcgfSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkhHYW1lIGV4dGVuZHMgR2FtZSB7XG4gICAgcHVibGljIGZpcmViYXNlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IElHYW1lQ29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZmlyZWJhc2UgPSB3aW5kb3dbJ2ZpcmViYXNlJ107XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2UpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudHMge1xuICAgIC8vIE5PVEU6IFRoZXNlIHN0cmluZyB2YWx1ZXMgc2hvdWxkIG1hdGNoIFxuICAgIC8vIGV4YWNsdHkgdG8gdGhlIG5hbWUgb2YgdGhlIGRhdGEgZmlsZSBmb3IgdGhhdCBzdGF0ZXMgY3JlYXRpb24uXG4gICAgc3RhdGljIFNUQVRFX0JPT1Q6IHN0cmluZyA9ICdib290JztcbiAgICBzdGF0aWMgU1RBVEVfUFJFTE9BRDogc3RyaW5nID0gJ3ByZWxvYWQnO1xuICAgIHN0YXRpYyBTVEFURV9NRU5VOiBzdHJpbmcgPSAnbWVudSc7XG4gICAgc3RhdGljIFNUQVRFX0dBTUU6IHN0cmluZyA9ICdnYW1lcGxheSc7XG4gICAgc3RhdGljIFNUQVRFX1NUT1JFOiBzdHJpbmcgPSAnc3RvcmUnO1xuICAgIHN0YXRpYyBTVEFURV9MT0dJTjogc3RyaW5nID0gJ2xvZ2luJztcbiAgICBcbiAgICBzdGF0aWMgRk9OVF9SQUxFV0FZOiBzdHJpbmcgPSAncmFsZXdheSc7XG5cbiAgICBzdGF0aWMgUExBWUVSX1NBVkVfREFUQTogc3RyaW5nID0gJ3BsYXllcnNhdmVkYXRhJztcbiAgICBcbiAgICBzdGF0aWMgU1RSX0JMVUU6IHN0cmluZyA9ICcjMDA5OWU2JztcbiAgICBzdGF0aWMgU1RSX05FV19USVRMRTogc3RyaW5nID0gJyNmZmZmZmYnO1xuICAgIHN0YXRpYyBTVFJfQlROX0hPVkVSOiBzdHJpbmcgPSAnI2NjZmZjYyc7XG4gICAgc3RhdGljIFNUUl9CVE5fTk9STUFMOiBzdHJpbmcgPSAnIzY2NjY5OSc7XG5cbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1JERVI6IG51bWJlciA9IDB4ZmZiODY2O1xuICAgIHN0YXRpYyBOVU1fT1JBTkdFX0JPWDogbnVtYmVyID0gMHhlNjdhMDA7XG5cbiAgICBzdGF0aWMgQlVUVE9OX05PUk1BTDogbnVtYmVyID0gMHhlNmU2ZTY7XG4gICAgc3RhdGljIEJVVFRPTl9IT1ZFUjogbnVtYmVyID0gMHhmZjk0MWE7XG4gICAgc3RhdGljIEJVVFRPTl9ET1dOOiBudW1iZXIgPSAweDAwYWFmZjtcblxuICAgIHN0YXRpYyBVUEdSQURFX0JMQURFV0lEVEg6IHN0cmluZyA9ICdibGFkZVdpZHRoJztcbiAgICBzdGF0aWMgVVBHUkFERV9MSVZFUzogc3RyaW5nID0gJ2V4dHJhTGlmZSc7XG5cbiAgICBzdGF0aWMgU0ZYX0VOQUJMRUQ6IGJvb2xlYW4gPSB0cnVlO1xufSIsImltcG9ydCB7TW9kZWx9IGZyb20gJ2Rpam9uL212Yyc7XG5pbXBvcnQgeyBJUGxheWVyU2F2ZURhdGEsIElVcGdyYWRlRGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgR2FtZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIHB1YmxpYyBzdGF0aWMgTU9ERUxfTkFNRTogc3RyaW5nID0gXCJnYW1lTW9kZWxcIjtcblxuICAgIHByb3RlY3RlZCBfc2F2ZURhdGE6IElQbGF5ZXJTYXZlRGF0YTtcbiAgICBcbiAgICBwdWJsaWMgcG9zdEJvb3RMb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zYXZlRGF0YSA9IHRoaXMuZ2FtZS5zdG9yYWdlLmdldEZyb21Mb2NhbFN0b3JhZ2UoQ29uc3RhbnRzLlBMQVlFUl9TQVZFX0RBVEEsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5fc2F2ZURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVNhdmVEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2F2ZURhdGEud2VhbHRoICs9IDIwMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZUxvY2FsRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0b3JhZ2Uuc2F2ZVRvTG9jYWxTdG9yYWdlKENvbnN0YW50cy5QTEFZRVJfU0FWRV9EQVRBLCB0aGlzLl9zYXZlRGF0YSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXRVcGdyYWRlVmFsdWUodHlwZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHZhbHVlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zYXZlRGF0YS51cGdyYWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzW2ldLnVwZ3JhZGVUeXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gdGhpcy5fc2F2ZURhdGEudXBncmFkZXNbaV0uZWZmZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVTYXZlRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEgPSA8SVBsYXllclNhdmVEYXRhPnt9O1xuICAgICAgICB0aGlzLl9zYXZlRGF0YS53ZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEuYmVzdFNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEubGFzdFNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEudXBncmFkZXMgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlU2F2ZURhdGEobmV3RGF0YTogSVBsYXllclNhdmVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhID0gbmV3RGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkVXBncmFkZShkYXRhOiBJVXBncmFkZURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEudXBncmFkZXMucHVzaChkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRlZCBVcGdyYWRlOiBcIiArIGRhdGEudXBncmFkZVR5cGUgKyBcIiB0byBwbGF5ZXIgdXBncmFkZSBkYXRhXCIpO1xuICAgICAgICB0aGlzLnNhdmVMb2NhbERhdGEoKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGdvbGRTcGVudChhbW91bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYW1vdW50IDw9IHRoaXMuY3VycmVudFBsYXllckdvbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhdmVEYXRhLndlYWx0aCAtPSBhbW91bnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNwZW50OiBcIiArIGFtb3VudCArIFwiIGdvbGRcIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgc2F2ZURhdGEoKTogSVBsYXllclNhdmVEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmVEYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY3VycmVudFBsYXllckdvbGQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmVEYXRhLndlYWx0aDtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBHYW1lTW9kZWwuTU9ERUxfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGV2ZWxEYXRhKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xuICAgIH1cbn0iLCJpbXBvcnQge01lZGlhdG9yLCBDb3B5TW9kZWx9IGZyb20gXCJkaWpvbi9tdmNcIjtcbmltcG9ydCB7QXBwbGljYXRpb259IGZyb20gXCJkaWpvbi9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuLi9tb2RlbC9HYW1lTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU1lZGlhdG9yIGV4dGVuZHMgTWVkaWF0b3Ige1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gc28gYW55IG1lZGlhdG9yIGV4dGVuZGluZyBCYXNlTWVkaWF0b3IgY2FuIGdldCBjb3B5XG4gICAgcHVibGljIGdldENvcHkoZ3JvdXBJZDogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlNb2RlbC5nZXRDb3B5KGdyb3VwSWQsIHRleHRJZCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgLy8gb2ZmZXIgYWNjZXNzIHRvIHRoZSBHYW1lTW9kZWwgYW5kIENvcHlNb2RlbCBmcm9tIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yXG4gICAgcHVibGljIGdldCBnYW1lTW9kZWwoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lTW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvcHlNb2RlbCgpOiBDb3B5TW9kZWwge1xuICAgICAgICByZXR1cm4gPENvcHlNb2RlbD5BcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTW9kZWwoQ29weU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1ZXN0U3RhdGVDaGFuZ2UobmV3U3RhdGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhuZXdTdGF0ZSwgdGhpcy5nYW1lTW9kZWwuZ2V0TGV2ZWxEYXRhKG5ld1N0YXRlKSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgbGV2ZWxEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcImJhc2VNZWRpYXRvcl9cIiArIHRoaXMuZ2FtZS5ybmQudXVpZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmV0cmlldmVNZWRpYXRvcihuYW1lOiBzdHJpbmcsIHZpZXdDb21wOiBhbnkpOiBNZWRpYXRvciB7XG4gICAgICAgIGxldCBtZWRpYXRvcjogTWVkaWF0b3IgPSBBcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTWVkaWF0b3IobmFtZSk7XG4gICAgICAgIGlmIChtZWRpYXRvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbWVkaWF0b3Iudmlld0NvbXBvbmVudCA9IHZpZXdDb21wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZWRpYXRvcjtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9ucyB7XG4gICAgc3RhdGljIEJPT1RfSU5JVDogc3RyaW5nID0gJ2Jvb3RJbml0JztcbiAgICBzdGF0aWMgQk9PVF9DT01QTEVURTogc3RyaW5nID0gJ2Jvb3RDb21wbGV0ZSc7XG4gICAgc3RhdGljIFBSRUxPQURfQ09NUExFVEU6IHN0cmluZyA9ICdwcmVsb2FkQ29tcGxldGUnO1xuXG4gICAgc3RhdGljIExJRkVfTE9TVDogc3RyaW5nID0gJ2xpZmVsb3N0JztcbiAgICBzdGF0aWMgTElGRV9FQVJORUQ6IHN0cmluZyA9ICdsaWZlZWFybmVkJztcbiAgICBzdGF0aWMgR0FNRV9MRVZFTF9GQUlMRUQ6IHN0cmluZyA9ICdnYW1lbGV2ZWxmYWlsZWQnO1xuICAgIHN0YXRpYyBBRERfVE9fU0NPUkU6IHN0cmluZyA9ICdhZGR0b3Njb3JlJztcblxuICAgIHN0YXRpYyBHT0xEX0NIQU5HRUQ6IHN0cmluZyA9ICdnb2xkY2hhbmdlZCc7ICAgIFxufSIsImltcG9ydCB7TG9nZ2VyfSBmcm9tIFwiZGlqb24vdXRpbHNcIjtcbmltcG9ydCB7SU5vdGlmaWNhdGlvbn0gZnJvbSBcImRpam9uL2ludGVyZmFjZXNcIjtcbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgQm9pbGVycGxhdGVBcHBsaWNhdGlvbiBmcm9tICcuLi9Cb2lsZXJwbGF0ZUFwcGxpY2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25NZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnQXBwbGljYXRpb25NZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEVcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkJPT1RfSU5JVDpcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMsICdOb3RpZmljYXRpb25zLkJPT1RfSU5JVCcpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5ib290Q29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LnNldERhdGEodGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2Fzc2V0cycpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQucmVnaXN0ZXJNb2RlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhDb25zdGFudHMuU1RBVEVfUFJFTE9BRCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IHZpZXdDb21wb25lbnQoKTogQm9pbGVycGxhdGVBcHBsaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiA8Qm9pbGVycGxhdGVBcHBsaWNhdGlvbj50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbk1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkhQcmVmYWIgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVByZWZhYkRhdGEpIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgZGF0YS5wcm9wLmtleSwgZGF0YS5wcm9wLmZyYW1lKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKGRhdGEucHJvcC5hbmNob3IpIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKGRhdGEucHJvcC5hbmNob3IueCwgZGF0YS5wcm9wLmFuY2hvci55KTtcbiAgICAgICAgfSAgIFxuICAgICAgICBpZiAoZGF0YS5wcm9wLnBpdm90KSB7XG4gICAgICAgICAgICB0aGlzLnNldFBpdm90KGRhdGEucHJvcC5waXZvdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC5zY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5zY2FsZS5zZXRUbyhkYXRhLnByb3Auc2NhbGUueCwgZGF0YS5wcm9wLnNjYWxlLnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5nbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBkYXRhLnByb3AuYW5nbGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVRleHREYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWZhYiBleHRlbmRzIFRleHQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVRleHREYXRhKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmNvcHksXG4gICAgICAgICAgICBkYXRhLnByb3AuZm9udE5hbWUsXG4gICAgICAgICAgICBkYXRhLnByb3AuZm9udFNpemUsXG4gICAgICAgICAgICBkYXRhLnByb3AuZm9udENvbG91cixcbiAgICAgICAgICAgIGRhdGEucHJvcC5hbGlnbiA/IGRhdGEucHJvcC5hbGlnbiA6ICdjZW50ZXInLFxuICAgICAgICAgICAgZGF0YS5wcm9wLndyYXBXaWR0aCAhPT0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGF0YS5wcm9wLndyYXBXaWR0aCA/IGRhdGEucHJvcC53cmFwV2lkdGggOiAwKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKGRhdGEucHJvcC5hbmNob3IpIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKGRhdGEucHJvcC5hbmNob3IueCwgZGF0YS5wcm9wLmFuY2hvci55KTtcbiAgICAgICAgfSAgIFxuICAgICAgICBpZiAoZGF0YS5wcm9wLnNoYWRvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGFkb3coZGF0YS5wcm9wLnNoYWRvdy54LCBkYXRhLnByb3Auc2hhZG93LnksIGRhdGEucHJvcC5zaGFkb3cuY29sb3VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMueCA9IE1hdGgucm91bmQodGhpcy54KTtcbiAgICAgICAgdGhpcy55ID0gTWF0aC5yb3VuZCh0aGlzLnkpO1xuICAgIH1cbn0iLCJpbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICdkaWpvbi9hcHBsaWNhdGlvbidcbmltcG9ydCB7R2FtZX0gZnJvbSAnZGlqb24vY29yZSc7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBJQnV0dG9uRGF0YSwgSVRleHRDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIQnV0dG9uIGV4dGVuZHMgUGhhc2VyLkJ1dHRvbiB7XG4gICAgcHJvdGVjdGVkIF9kaXNhYmxlZEZyYW1lOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIF9lbmFibGVkRnJhbWU6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBfbm9ybWFsQ29weUNvbG91cjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfaG92ZXJDb3B5Q29sb3VyOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgX2xhYmVsOiBUZXh0O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSUJ1dHRvbkRhdGEpIHtcbiAgICAgICAgc3VwZXIoQXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5nYW1lLFxuICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBkYXRhLnByb3Aua2V5LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX2hvdmVyJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfbm9ybWFsJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfaG92ZXInLCBcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfbm9ybWFsJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuX2VuYWJsZWRGcmFtZSA9IGRhdGEucHJvcC5mcmFtZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWRGcmFtZSA9IGRhdGEucHJvcC5hbHRGcmFtZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5wcm9wLmFsdEZyYW1lIDogZGF0YS5wcm9wLmZyYW1lO1xuICAgICAgICB0aGlzLmZvcmNlT3V0ID0gZGF0YS5wcm9wLmZvcmNlT3V0ID8gZGF0YS5wcm9wLmZvcmNlT3V0IDogZmFsc2U7XG4gICAgICAgIHRoaXMuaW5wdXQudXNlSGFuZEN1cnNvciA9IGRhdGEucHJvcC51c2VIYW5kID8gZGF0YS5wcm9wLnVzZUhhbmQgOiB0cnVlO1xuXG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQaXZvdChkYXRhLnByb3AucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5nbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBkYXRhLnByb3AuYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRMYWJlbChkYXRhLnByb3AudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2FkZExhYmVsKGRhdGE6IElUZXh0Q29tcG9uZW50RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgc3ViUG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IGRhdGEucG9zaXRpb24ueCwgeTogZGF0YS5wb3NpdGlvbi55IH07XG4gICAgICAgIHRoaXMuX25vcm1hbENvcHlDb2xvdXIgPSBkYXRhLmZvbnRDb2xvdXI7XG4gICAgICAgIHRoaXMuX2hvdmVyQ29weUNvbG91ciA9IGRhdGEuYWx0Q29sb3VyID8gZGF0YS5hbHRDb2xvdXIgOiBkYXRhLmZvbnRDb2xvdXI7XG4gICAgICAgIGlmIChkYXRhLnBvc2l0aW9uLnggPiAwICYmIGRhdGEucG9zaXRpb24ueCA8IDEpIHtcbiAgICAgICAgICAgIHN1YlBvcy54ID0gdGhpcy5yZWFsV2lkdGggKiBkYXRhLnBvc2l0aW9uLng7XG4gICAgICAgICAgICBzdWJQb3MueSA9IHRoaXMucmVhbEhlaWdodCAqIGRhdGEucG9zaXRpb24ueTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBUZXh0KHN1YlBvcy54LCBzdWJQb3MueSwgZGF0YS5jb3B5LCBkYXRhLmZvbnROYW1lLCBkYXRhLmZvbnRTaXplLCBkYXRhLmZvbnRDb2xvdXIgPyBkYXRhLmZvbnRDb2xvdXIgOiAnI2ZmZmZmZicsIGRhdGEuYWxpZ24gPyBkYXRhLmFsaWduIDogJ2NlbnRlcicpO1xuICAgICAgICBpZiAoZGF0YS5hbmNob3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLmFuY2hvci5zZXRUbyhkYXRhLmFuY2hvci54LCBkYXRhLmFuY2hvci55KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0UGl2b3QoZGF0YS5waXZvdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9sYWJlbCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyB0b2dnbGVFbmFibGVkRnJhbWUoaXNFbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQmFzZUZyYW1lKHRoaXMuX2VuYWJsZWRGcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJhc2VGcmFtZSh0aGlzLl9kaXNhYmxlZEZyYW1lKTtcbiAgICAgICAgfVxuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgb25JbnB1dERvd25IYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dERvd25IYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0T3ZlckhhbmRsZXIoc3ByaXRlOiBhbnksIHBvaW50ZXI6IGFueSk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbklucHV0T3ZlckhhbmRsZXIoc3ByaXRlLCBwb2ludGVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ob3ZlckNvcHlDb2xvdXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5wdXRPdXRIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dE91dEhhbmRsZXIoc3ByaXRlLCBwb2ludGVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ub3JtYWxDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH0gIFxuICAgIFxuICAgIHB1YmxpYyBvbklucHV0VXBIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnksIGlzT3ZlcjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBzdXBlci5vbklucHV0VXBIYW5kbGVyKHNwcml0ZSwgcG9pbnRlciwgaXNPdmVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ub3JtYWxDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVCYXNlRnJhbWUoYmFzZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0RnJhbWVzKGJhc2UgKyAnX2hvdmVyJywgYmFzZSArICdfbm9ybWFsJywgYmFzZSArICdfaG92ZXInLCBiYXNlICsgJ19ub3JtYWwnKTtcbiAgICB9ICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IGRnYW1lKCk6IEdhbWUge1xuICAgICAgICByZXR1cm4gPEdhbWU+dGhpcy5nYW1lO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCB7SU5vdGlmaWNhdGlvbn0gZnJvbSBcImRpam9uL2ludGVyZmFjZXNcIjtcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEZydWl0TGlmZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdExpZmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdExpZmVNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnc3RvcmVtZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5MSUZFX0xPU1QsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkxJRkVfRUFSTkVEXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5MSUZFX0xPU1Q6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcy5kZWNyZWFzZUxpdmVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuTElGRV9FQVJORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcy5pbmNyZWFzZUxpdmVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIG5vdGlmeUdhbWVPdmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5HQU1FX0xFVkVMX0ZBSUxFRCk7XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBGcnVpdExpZmVNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGl2ZXMoKTogRnJ1aXRMaWZlIHtcbiAgICAgICAgcmV0dXJuIDxGcnVpdExpZmU+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IFJIUHJlZmFiIGZyb20gJy4uL2Rpc3BsYXkvUkhQcmVmYWInO1xuaW1wb3J0IEZydWl0TGlmZU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL0ZydWl0TGlmZU1lZGlhdG9yJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgeyBJUHJlZmFiRGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdExpZmUgZXh0ZW5kcyBHcm91cCB7XG5cbiAgICBwcm90ZWN0ZWQgX21heExpdmVzOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9saXZlc1JlbWFpbmluZzogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfbGlmZVZpc3VhbHM6IFJIUHJlZmFiW107XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9LCBkYXRhOiBJUHJlZmFiRGF0YSkge1xuICAgICAgICBzdXBlcigwLCAwLCBuYW1lKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBGcnVpdExpZmVNZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKEZydWl0TGlmZU1lZGlhdG9yLk1FRElBVE9SX05BTUUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fbWVkaWF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEZydWl0TGlmZU1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGl2ZXNSZW1haW5pbmcgPSBkYXRhLnByb3BbJ2xpdmVzJ107XG4gICAgICAgIHRoaXMuX21heExpdmVzID0gdGhpcy5fbGl2ZXNSZW1haW5pbmcgKiAyO1xuICAgICAgICB0aGlzLl9saWZlVmlzdWFscyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWF4TGl2ZXM7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5leHRMaWZlID0gbmV3IFJIUHJlZmFiKG5hbWUgKyAnX2xpZmVfJyArIGksIHsgeDogcG9zaXRpb24ueCArIChkYXRhLnByb3BbJ3NwYWNpbmcnXSAqIGkpLCB5OiBwb3NpdGlvbi55IH0sIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXh0TGlmZSk7XG4gICAgICAgICAgICB0aGlzLl9saWZlVmlzdWFscy5wdXNoKG5leHRMaWZlKTtcbiAgICAgICAgICAgIGlmIChpID49IHRoaXMuX2xpdmVzUmVtYWluaW5nKSB7XG4gICAgICAgICAgICAgICAgbmV4dExpZmUuYWxwaGEgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlY3JlYXNlTGl2ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xpdmVzUmVtYWluaW5nLS07XG4gICAgICAgIGlmICh0aGlzLl9saXZlc1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlHYW1lT3ZlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpdmVzRGlzcGxheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbmNyZWFzZUxpdmVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbGl2ZXNSZW1haW5pbmcgPCAzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXZlc1JlbWFpbmluZysrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpdmVzRGlzcGxheSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdXBkYXRlTGl2ZXNEaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21heExpdmVzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2xpZmVWaXN1YWxzW2ldLmFscGhhID0gaSA8IHRoaXMuX2xpdmVzUmVtYWluaW5nID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1lZGlhdG9yKCk6IEZydWl0TGlmZU1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxGcnVpdExpZmVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBGcnVpdFNjb3JlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0U2NvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdFNjb3JlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2ZydWl0c2NvcmVtZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkVcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkFERF9UT19TQ09SRTpcbiAgICAgICAgICAgICAgICBsZXQgYW1vdW50OiBudW1iZXIgPSA8bnVtYmVyPm5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XG4gICAgICAgICAgICAgICAgaWYgKGFtb3VudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLmluY3JlYXNlQnkoYW1vdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBub3RpZnlHYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR0FNRV9MRVZFTF9GQUlMRUQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnJ1aXRTY29yZU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzY29yZSgpOiBGcnVpdFNjb3JlIHtcbiAgICAgICAgcmV0dXJuIDxGcnVpdFNjb3JlPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFRleHQgZnJvbSAnLi4vZGlzcGxheS9SSFRleHQnO1xuaW1wb3J0IEZydWl0U2NvcmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9GcnVpdFNjb3JlTWVkaWF0b3InO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRTY29yZSBleHRlbmRzIFJIVGV4dCB7XG4gICAgcHJvdGVjdGVkIF9zY29yZTogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfbWVkaWF0b3I6IEZydWl0U2NvcmVNZWRpYXRvcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHt4OiBudW1iZXIsIHk6IG51bWJlcn0sIGRhdGE6IElQcmVmYWJEYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IDxGcnVpdFNjb3JlTWVkaWF0b3I+RnJ1aXRTY29yZU1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoRnJ1aXRTY29yZU1lZGlhdG9yLk1FRElBVE9SX05BTUUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fbWVkaWF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEZydWl0U2NvcmVNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbmNyZWFzZUJ5KGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Njb3JlICs9IGFtb3VudDtcbiAgICAgICAgdGhpcy50ZXh0ID0gJ0ZydWl0czogJyArIHRoaXMuX3Njb3JlLnRvU3RyaW5nKCk7XG4gICAgfVxufSIsImltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCB7IElDdXR0YWJsZURhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRDdXR0YWJsZSBleHRlbmRzIFJIUHJlZmFiIHtcbiAgICBwdWJsaWMgc3RhdGljIERFRkFVTFRfR1JBVklUWTogbnVtYmVyO1xuXG4gICAgcHVibGljIHN0YXRpYyBUWVBFUzoge2JvbWI6IHN0cmluZywgZnJ1aXQ6IHN0cmluZywgc3BlY2lhbDogc3RyaW5nfSA9IHtcbiAgICAgICAgYm9tYjogXCJib21iXCIsXG4gICAgICAgIGZydWl0OiBcImZydWl0XCIsXG4gICAgICAgIHNwZWNpYWw6IFwic3BlY2lhbFwiXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jdXRUeXBlOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIF92ZWxvY2l0eTogUGhhc2VyLlBvaW50O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHt4OiBudW1iZXIsIHk6IG51bWJlcn0sIGRhdGE6IElDdXR0YWJsZURhdGEpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgcG9zaXRpb24sIGRhdGEpO1xuXG4gICAgICAgIGlmIChGcnVpdEN1dHRhYmxlLlRZUEVTLmhhc093blByb3BlcnR5KGRhdGEucHJvcC5jdXR0YWJsZVR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXRUeXBlID0gZGF0YS5wcm9wLmN1dHRhYmxlVHlwZTtcbiAgICAgICAgfSAgIFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1dFR5cGUgPSBGcnVpdEN1dHRhYmxlLlRZUEVTLmZydWl0O1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGVCb2R5KHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSBuZXcgUGhhc2VyLlBvaW50KDEsIDEpO1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLl92ZWxvY2l0eS55O1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuX3ZlbG9jaXR5Lng7XG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSBGcnVpdEN1dHRhYmxlLkRFRkFVTFRfR1JBVklUWTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U3Bhd25WZWxvY2l0eShuZXdYOiBudW1iZXIsIG5ld1k6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl92ZWxvY2l0eS54ID0gbmV3WDtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkueSA9IC1uZXdZO1xuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gRnJ1aXRDdXR0YWJsZS5ERUZBVUxUX0dSQVZJVFk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyByZXNldChuZXdYOiBudW1iZXIsIG5ld1k6IG51bWJlcik6IFBoYXNlci5TcHJpdGUge1xuICAgICAgICBzdXBlci5yZXNldChuZXdYLCBuZXdZKTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLl92ZWxvY2l0eS54O1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMuX3ZlbG9jaXR5Lnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBjdXRPYmplY3QoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGVtaXR0ZXIgPSB0aGlzLmdhbWUuYWRkLmVtaXR0ZXIodGhpcy54LCB0aGlzLnkpO1xuICAgICAgICBlbWl0dGVyLm1ha2VQYXJ0aWNsZXModGhpcy5rZXksICdwYXJ0aWNsZScpO1xuICAgICAgICBlbWl0dGVyLm1pblBhcnRpY2xlU3BlZWQuc2V0VG8oLTIwMCwgLTIwMCk7XG4gICAgICAgIGVtaXR0ZXIubWF4UGFydGljbGVTcGVlZC5zZXRUbygyMDAsIDIwMCk7XG4gICAgICAgIGVtaXR0ZXIuZ3Jhdml0eSA9IDA7XG4gICAgICAgIGVtaXR0ZXIuc3RhcnQodHJ1ZSwgNzAwLCBudWxsLCA1MDApO1xuICAgICAgICBpZiAodGhpcy5fY3V0VHlwZSA9PT0gRnJ1aXRDdXR0YWJsZS5UWVBFUy5zcGVjaWFsKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IDA7XG4gICAgICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5hZGQoMTAwMCwgdGhpcy5raWxsLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua2lsbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXRUeXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb2JqZWN0VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3V0VHlwZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR3JvdXAgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCBGcnVpdEN1dHRhYmxlIGZyb20gJy4vRnJ1aXRDdXR0YWJsZSc7XG5pbXBvcnQgeyBJU3Bhd25lckRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bhd25lciBleHRlbmRzIEdyb3VwIHtcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IElTcGF3bmVyRGF0YTtcbiAgICBwcm90ZWN0ZWQgX3NwYXduUG9pbnQ6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElTcGF3bmVyRGF0YSkge1xuICAgICAgICBzdXBlcigwLCAwLCBkYXRhLm5hbWUpO1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fc3Bhd25Qb2ludCA9IHBvc2l0aW9uO1xuICAgICAgICBGcnVpdEN1dHRhYmxlLkRFRkFVTFRfR1JBVklUWSA9IDkwMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zcGF3bi5wb29sU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3V0dGFibGUgPSBuZXcgRnJ1aXRDdXR0YWJsZShcImN1dHRhYmxlXCIgKyB0aGlzLl9kYXRhLmN1dHRhYmxlLnByb3AuY3V0dGFibGVUeXBlLCB0aGlzLl9zcGF3blBvaW50LCBkYXRhLmN1dHRhYmxlKTtcbiAgICAgICAgICAgIGN1dHRhYmxlLmtpbGwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoY3V0dGFibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXVlTmV4dFNwYXduKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKHRoaXMuX25leHRTcGF3blRpbWUsIHRoaXMuX3NwYXduT2JqZWN0LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NwYXduT2JqZWN0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc3Bhd25pbmcgb2JqZWN0Jyk7XG4gICAgICAgIGxldCBjdXR0YWJsZSA9IDxGcnVpdEN1dHRhYmxlPnRoaXMuZ2V0Rmlyc3REZWFkKCk7XG4gICAgICAgIGlmIChjdXR0YWJsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY3V0dGFibGUuc2V0U3Bhd25WZWxvY2l0eSh0aGlzLl9uZXdYVmVsb2NpdHksIHRoaXMuX25ld1lWZWxvY2l0eSk7XG4gICAgICAgICAgICBjdXR0YWJsZS5yZXZpdmUoNTApO1xuICAgICAgICAgICAgY3V0dGFibGUucmVzZXQodGhpcy5fc3Bhd25Qb2ludC54LCB0aGlzLl9zcGF3blBvaW50LnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVldWVOZXh0U3Bhd24oKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIGdldCBfbmV3WFZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUucm5kLmJldHdlZW4odGhpcy5fZGF0YS5zcGF3bi52ZWxYLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi52ZWxYLm1heCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBfbmV3WVZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUucm5kLmJldHdlZW4odGhpcy5fZGF0YS5zcGF3bi52ZWxZLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi52ZWxZLm1heCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBfbmV4dFNwYXduVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udGltZVJhbmdlLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi50aW1lUmFuZ2UubWF4KTtcbiAgICB9XG59IiwiaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4vUkhCdXR0b24nO1xuaW1wb3J0IHtJVXBncmFkZUJ1dHRvbkRhdGEsIElVcGdyYWRlRGF0YX0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIVXBncmFkZUl0ZW0gZXh0ZW5kcyBSSEJ1dHRvbiB7XG5cbiAgICBwcm90ZWN0ZWQgX2Nvc3Q6IFRleHQ7XG4gICAgcHJvdGVjdGVkIF9kZXNjOiBUZXh0O1xuICAgIHByb3RlY3RlZCBfZGF0YTogSVVwZ3JhZGVEYXRhO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJVXBncmFkZUJ1dHRvbkRhdGEpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgcG9zaXRpb24sIGRhdGEpO1xuXG4gICAgICAgIGxldCBkZXNjUG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IHRoaXMucmVhbFdpZHRoICsgMTAsIHk6IHRoaXMucmVhbEhlaWdodCAqIDAuNX07XG4gICAgICAgIHRoaXMuX2Rlc2MgPSBuZXcgVGV4dChkZXNjUG9zLngsIGRlc2NQb3MueSwgZGF0YS51cGdyYWRlLmRlc2NyaXB0aW9uLCBkYXRhLnByb3AudGV4dC5mb250TmFtZSwgZGF0YS5wcm9wLnRleHQuZm9udFNpemUgKiAwLjYsIGRhdGEucHJvcC50ZXh0LmZvbnRDb2xvdXIgPyBkYXRhLnByb3AudGV4dC5mb250Q29sb3VyIDogJyNmZmZmZmYnLCAnbGVmdCcpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2Rlc2MpO1xuXG4gICAgICAgIGxldCBjb3N0UG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IHRoaXMucmVhbFdpZHRoICsgMTAsIHk6IDB9O1xuICAgICAgICB0aGlzLl9jb3N0ID0gbmV3IFRleHQoY29zdFBvcy54LCBjb3N0UG9zLnksIGRhdGEudXBncmFkZS5wcmljZS50b1N0cmluZygpICsgXCJnXCIsIGRhdGEucHJvcC50ZXh0LmZvbnROYW1lLCBkYXRhLnByb3AudGV4dC5mb250U2l6ZSAqIDAuNiwgZGF0YS5wcm9wLnRleHQuZm9udENvbG91ciA/IGRhdGEucHJvcC50ZXh0LmZvbnRDb2xvdXIgOiAnI2ZmZmZmZicsICdsZWZ0Jyk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fY29zdCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGEudXBncmFkZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZUJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29zdC50ZXh0ID0gXCJTb2xkIE91dFwiO1xuICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgdGhpcy50aW50ID0gMHhiZmJmYmY7XG4gICAgICAgIHRoaXMuX2Rlc2Muc2V0Q29sb3IoXCIjYmZiZmJmXCIpO1xuICAgICAgICB0aGlzLl9jb3N0LnNldENvbG9yKFwiI2JmYmZiZlwiKTtcbiAgICB9ICBcblxuICAgIHB1YmxpYyBmbGFzaENvc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Nvc3Quc2V0Q29sb3IoJyNiZjAwMDAnKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGdldCBiYXNlQ29zdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5wcmljZTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGdldCB1cGdyYWRlVHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS51cGdyYWRlVHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHVwZ3JhZGVEYXRhKCk6IElVcGdyYWRlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cbn0iLCJpbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5pbXBvcnQgeyBJQnV0dG9uRGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJUZXh0SW5wdXQgZXh0ZW5kcyBSSEJ1dHRvbiB7XG5cbiAgICBwcm90ZWN0ZWQgX2Jhc2VUZXh0OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIF9iYXNlU2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJQnV0dG9uRGF0YSkge1xuICAgICAgICBzdXBlcihuYW1lLCBwb3NpdGlvbiwgZGF0YSk7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVRleHQgPSB0aGlzLl9sYWJlbC50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVRleHQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Jhc2VTaXplID0gZGF0YS5wcm9wLnRleHQuZm9udFNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyRmllbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xhYmVsLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLl91cGRhdGVJbnB1dCgpO1xuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgdXBkYXRlTGFiZWwoY2hhcmFjdGVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsLnRleHQgPT09IHRoaXMuX2Jhc2VUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC50ZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYWJlbC50ZXh0ICs9IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5fdXBkYXRlSW5wdXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlTGFzdENoYXJhY3RlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwudGV4dC5zbGljZSh0aGlzLl9sYWJlbC50ZXh0Lmxlbmd0aCAtIDEsIHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVJbnB1dCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaW5wdXRUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbC50ZXh0O1xuICAgIH0gICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF91cGRhdGVJbnB1dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLmZvbnRTaXplID0gdGhpcy5fYmFzZVNpemUgLyAodGhpcy5fbGFiZWwudGV4dC5sZW5ndGggLyAzMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5mb250U2l6ZSA9IHRoaXMuX2Jhc2VTaXplO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhYmVsLmNlbnRlclBpdm90KCk7XG4gICAgfVxufSIsImltcG9ydCB7IElTY2VuZURhdGEgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCBSSFRleHQgZnJvbSAnLi4vZGlzcGxheS9SSFRleHQnO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IEJhc2VTdGF0ZSBmcm9tICcuLi9zdGF0ZS9CYXNlU3RhdGUnO1xuaW1wb3J0IEZydWl0TGlmZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdExpZmUnO1xuaW1wb3J0IEZydWl0U2NvcmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRTY29yZSc7XG5pbXBvcnQgU3Bhd25lciBmcm9tICcuLi9nYW1lcGxheS9TcGF3bmVyJztcbmltcG9ydCBSSFVwZ3JhZGVJdGVtIGZyb20gJy4uL2Rpc3BsYXkvUkhVcGdyYWRlSXRlbSc7XG5pbXBvcnQgUGxheWVyVGV4dElucHV0IGZyb20gJy4uL2lucHV0L1BsYXllclRleHRJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWZhYkJ1aWxkZXIge1xuXG4gICAgLy8gQWxsIGNsYXNzZXMgeW91IGludGVuZGVkIHRvIGluc3RhbnRpYXRlIG5lZWQgdG8gZXhpc3Qgd2l0aCB0aGlzIG9iamVjdC5cbiAgICAvLyBJZiB0aGVyZSB0eXBlIGhlcmUgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgcGFyZW0gZnJvbSB0aGUgaW1wb3J0IGZpbGUsIFxuICAgIC8vIHRoZW4gdGhlIEJ1aWxkZXIgd2lsbCBza2lwIG92ZXIgdGhhdCBjbGFzcy5cbiAgICBwdWJsaWMgc3RhdGljIHByZWZhYkNsYXNzZXM6IHt9ID0ge1xuICAgICAgICBwcmVmYWI6IFJIUHJlZmFiLFxuICAgICAgICB0ZXh0OiBSSFRleHQsXG4gICAgICAgIGJ1dHRvbjogUkhCdXR0b24sXG4gICAgICAgIGxpdmVzOiBGcnVpdExpZmUsIFxuICAgICAgICBzY29yZTogRnJ1aXRTY29yZSxcbiAgICAgICAgc3Bhd25lcjogU3Bhd25lcixcbiAgICAgICAgdXBncmFkZTogUkhVcGdyYWRlSXRlbSxcbiAgICAgICAgaW5wdXRmaWVsZDogUGxheWVyVGV4dElucHV0XG4gICAgfTsgXG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBnYW1lOiBQaGFzZXIuR2FtZSA9IG51bGw7XG5cbiAgICAvLyBDcmVhdGVzIGFsbCBvYmplY3RzIGZvciBhIGdpdmVuIHNjZW5lLCBvbiB0aGF0IHNjZW5lLiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lRnJvbShkYXRhOiBJU2NlbmVEYXRhLCBzY2VuZTogQmFzZVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmIChzY2VuZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBncm91cE5hbWUsIHByZWZhYk5hbWU7XG4gICAgICAgIHNjZW5lLnByZWZhYnMgPSBbXTtcbiAgICAgICAgc2NlbmUuZ3JvdXBzID0ge307XG5cbiAgICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBncm91cCBkYXRhLlxuICAgICAgICAgICAgZGF0YS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY2VuZS5ncm91cHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZS5ncm91cHNbZ3JvdXBOYW1lXSA9IHNjZW5lLmFkZC5kR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHByZWZhYiBkYXRhLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnByZWZhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoUHJlZmFiQnVpbGRlci5wcmVmYWJDbGFzc2VzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcHJlZmFiXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmVmYWIgPSB0aGlzLmNyZWF0ZVByZWZhYihkYXRhLnByZWZhYnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmVmYWJzW2ldLmhhc093blByb3BlcnR5KFwiZ3JvdXBcIikgJiYgc2NlbmUuZ3JvdXBzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS5ncm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLmdyb3Vwc1tkYXRhLnByZWZhYnNbaV0uZ3JvdXBdLmFkZENoaWxkKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5hZGQuZXhpc3RpbmcocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5wcmVmYWJzW3ByZWZhYi5uYW1lXSA9IHByZWZhYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIGFsbCBwcmVmYWJzIGZyb20gYSBnaXZlbiBkYXRhIG9iamVjdC5cbiAgICAvLyBSZXR1cm5zIGEgZ3JvdXAgd2l0aCB0aGVtIGluIGl0LlxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUHJlZmFic0Zyb20oZGF0YTogSVNjZW5lRGF0YSk6IEdyb3VwIHtcbiAgICAgICAgbGV0IGdyb3VwTmFtZSwgcHJlZmFiTmFtZTtcbiAgICAgICAgbGV0IGdyb3VwcyA9IHt9O1xuICAgICAgICBsZXQgcm9vdCA9IG5ldyBHcm91cCgwLCAwLCAncm9vdCcpO1xuXG4gICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBncm91cHNbJ2Jhc2ljJ10gPSBuZXcgR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBncm91cCBkYXRhLlxuICAgICAgICAgICAgZGF0YS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzW2dyb3VwTmFtZV0gPSBuZXcgR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgICAgICByb290LmFkZENoaWxkKGdyb3Vwc1tncm91cE5hbWVdKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgcHJlZmFiIGRhdGEuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucHJlZmFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChQcmVmYWJCdWlsZGVyLnByZWZhYkNsYXNzZXMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWZhYiA9IHRoaXMuY3JlYXRlUHJlZmFiKGRhdGEucHJlZmFic1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnByZWZhYnNbaV0uaGFzT3duUHJvcGVydHkoXCJncm91cFwiKSAmJiBncm91cHMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLmdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW2RhdGEucHJlZmFic1tpXS5ncm91cF0uYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3QuYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVByZWZhYihkYXRhOiBhbnksIHBhcmVudDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgICAgIGxldCBwcmVmYWJQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGxldCBwcmVmYWI6IGFueTtcbiAgICAgICAgLy8gY3JlYXRlIG9iamVjdCBhY2NvcmRpbmcgdG8gaXRzIHR5cGVcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnR5cGUpKSB7XG4gICAgICAgICAgICAvLyBJZiBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsIHdlIGFzc3VtZSB0aGlzIGlzIGEgZmxvYXRpbmdcbiAgICAgICAgICAgIC8vIHBvaW50IHZhbHVlIHRvIGJlIGludGVycHJldGVkIGFzIGEgJSBiYXNlZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIGlmIChkYXRhLnBvc2l0aW9uLnggPiAwICYmIGRhdGEucG9zaXRpb24ueCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gYXMgcGVyY2VudGFnZSwgZGVwZW5kZW50IG9uIHBhcmVudC5cbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnggPSBkYXRhLnBvc2l0aW9uLnggKiBQcmVmYWJCdWlsZGVyLmdhbWUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnkgPSBkYXRhLnBvc2l0aW9uLnkgKiBQcmVmYWJCdWlsZGVyLmdhbWUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueCA9IGRhdGEucG9zaXRpb24ueCAqIHBhcmVudC5yZWFsV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnkgPSBkYXRhLnBvc2l0aW9uLnkgKiBwYXJlbnQucmVhbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnggPSBkYXRhLnBvc2l0aW9uLnggLSBwYXJlbnQueDtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueSA9IGRhdGEucG9zaXRpb24ueSAtIHBhcmVudC55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZWZhYiA9IG5ldyB0aGlzLnByZWZhYkNsYXNzZXNbZGF0YS50eXBlXShkYXRhLm5hbWUsIHByZWZhYlBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJjb21wb25lbnRzXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXAgPSBQcmVmYWJCdWlsZGVyLmNyZWF0ZVByZWZhYihkYXRhLmNvbXBvbmVudHNbaV0sIHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYi5hZGRDaGlsZChjb21wKTtcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJlZmFiO1xuICAgIH1cbn0iLCJpbXBvcnQge1N0YXRlfSBmcm9tIFwiZGlqb24vY29yZVwiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQmFzZU1lZGlhdG9yXCI7XG5pbXBvcnQgeyBJU2NlbmVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5pbXBvcnQgUHJlZmFiQnVpbGRlciBmcm9tICcuLi91dGlscy9QcmVmYWJCdWlsZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIHByaXZhdGUgX3VwZGF0ZUFsbG93ZWQ6IGJvb2xlYW4gID0gZmFsc2U7XG5cbiAgICAvLyBUaGlzIHdpbGwgYmUgYW4gYXJyYXkgY29udGFpbmluZyBhIHJlZmVyZW5jZSB0byBldmVyeSBQcmVmYWIgYnVpbHQgZm9yIHRoaXMgc2NlbmUuICAgIFxuICAgIHB1YmxpYyBwcmVmYWJzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgIC8vIFRoaXMgd2lsbCBiZSBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIGdyb3VwLCBhZGRlZCB0aHJvdWdoIHRoZSBwcmVmYWIgYnVpbGRlciwgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0LlxuICAgIHB1YmxpYyBncm91cHM6IGFueTtcbiAgICBwdWJsaWMgX2xldmVsRGF0YTogSVNjZW5lRGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWxEYXRhID0gbGV2ZWxEYXRhO1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBwcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5wcmVsb2FkKCk7XG4gICAgICAgIGlmICh0aGlzLl9sZXZlbERhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkQXNzZXRzKHRoaXMuX2xldmVsRGF0YS5hc3NldEVudHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sZXZlbERhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIFByZWZhYkJ1aWxkZXIuY3JlYXRlU2NlbmVGcm9tKHRoaXMuX2xldmVsRGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsb3dlZCA9IHRydWU7XG4gICAgfSAgICBcblxuICAgIHByb3RlY3RlZCBfZmluZFByZWZhYihuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5wcmVmYWJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmYWJzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIlByZWZhYiBcIiArIG5hbWUgKyBcIiBub3QgZm91bmQgb24gU3RhdGUuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdXBkYXRlQWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXNlIG1lIGZvciB1cGRhdGUgbG9vcHMgLSBJIHdpbGwgb25seSBiZSBjYWxsZWQgd2hlbiB1cGRhdGVBbGxvd2VkIGlzIHRydWUuICAgIFxuICAgIHB1YmxpYyB1cGRhdGVTdGF0ZSgpOiB2b2lkIHsgfVxuXG4gICAgcHVibGljIGdldCB1cGRhdGVBbGxvd2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlQWxsb3dlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHVwZGF0ZUFsbG93ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsb3dlZCA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZpcmViYXNlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVbJ2ZpcmViYXNlJ107XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdib290TWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIGRpam9uLm12Yy5NZWRpYXRvciBvdmVycmlkZXNcbiAgICBwdWJsaWMgb25SZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuQk9PVF9JTklUKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvLyBjYWxsZWQgZnJvbSB2aWV3Q29tcG9uZW50XG4gICAgcHVibGljIGJvb3RDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURSk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBCb290TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBCb290TWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL0Jvb3RNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEJvb3RNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHdpbmRvd1sndmVyc2lvbiddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5jYWNoZUJ1c3RWZXJzaW9uID0gJ0BAdmVyc2lvbic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdnYW1lX2RhdGEnKTtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdhc3NldHMnKTtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdjb3B5Jyk7XG4gICAgfVxuXG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgYnVpbGRJbnRlcmZhY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IuYm9vdENvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwcm90ZWN0ZWQgZ2V0IG1lZGlhdG9yKCk6IEJvb3RNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8Qm9vdE1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn0iLCJpbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gJ2Rpam9uL2ludGVyZmFjZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3ByZWxvYWRNZWRpYXRvcic7XG5cdFx0XG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvLyBjYWxsZWQgZnJvbSBQcmVsb2FkIHN0YXRlXG5cbiAgICBwdWJsaWMgbm90aWZ5UHJlbG9hZENvbXBsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFKTtcbiAgICB9ICAgXG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gUHJlbG9hZE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBQcmVsb2FkTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL1ByZWxvYWRNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IFByZWxvYWRNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlQcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX0xPR0lOKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHJvdGVjdGVkIGdldCBtZWRpYXRvcigpOiBQcmVsb2FkTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPFByZWxvYWRNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBNZW51IGZyb20gJy4uL3N0YXRlL01lbnUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ21lbnVNZWRpYXRvcic7XG5cdFx0XG4gICAgcHVibGljIGdldCBhdWRpb1Nwcml0ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldERhdGEoKVsnYXVkaW9zcHJpdGUnXTtcbiAgICB9ICBcblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBNZW51TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1lbnUoKTogTWVudSB7XG4gICAgICAgIHJldHVybiA8TWVudT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgTWVudU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL01lbnVNZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByZXNldE5hbWU6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCBfdGl0bGU6IFBoYXNlci5UZXh0O1xuICAgIHByb3RlY3RlZCBfYmc6IFBoYXNlci5JbWFnZTtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IE1lbnVNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdEJ1aWxkU2VxdWVuY2UoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLl9zZXR1cElucHV0RXZlbnRzXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJCdWlsZCgpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJCdWlsZCgpO1xuICAgICAgICB0aGlzLl9idWlsZENvbXBsZXRlID0gdHJ1ZTtcbiAgICB9IFxuICAgIFxuICAgIHB1YmxpYyBjbGVhclZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RpdGxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fYmcuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0dXBJbnB1dEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBsYXlCdG46IFJIQnV0dG9uID0gdGhpcy5fZmluZFByZWZhYihcImdhbWVfYnV0dG9uXCIpO1xuICAgICAgICBpZiAocGxheUJ0biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGxheUJ0bi5vbklucHV0RG93bi5hZGQodGhpcy5fb25QbGF5UHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzdG9yZUJ0bjogUkhCdXR0b24gPSA8UkhCdXR0b24+dGhpcy5fZmluZFByZWZhYihcInN0b3JlX2J1dHRvblwiKTtcbiAgICAgICAgaWYgKHN0b3JlQnRuICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdG9yZUJ0bi5vbklucHV0RG93bi5hZGQodGhpcy5fb25TdG9yZVByZXNzZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25QbGF5UHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX0dBTUUpO1xuICAgIH0gICBcbiAgICBcbiAgICBwcml2YXRlIF9vblN0b3JlUHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX1NUT1JFKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b2dnbGVTRlgoKTogdm9pZCB7XG4gICAgICAgIENvbnN0YW50cy5TRlhfRU5BQkxFRCA9ICFDb25zdGFudHMuU0ZYX0VOQUJMRUQ7XG4gICAgfSAgICAgICBcblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IE1lbnVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8TWVudU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBHYW1lcGxheSBmcm9tICcuLi9zdGF0ZS9HYW1lcGxheSc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2dhbWVwbGF5bWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIGRpam9uLm12Yy5NZWRpYXRvciBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkdBTUVfTEVWRUxfRkFJTEVEXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5MSUZFX0xPU1Q6XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcC5vbkdhbWVPdmVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluY3JlYXNlTGl2ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkxJRkVfRUFSTkVEKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGRlY3JlYXNlTGl2ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkxJRkVfTE9TVCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluY3JlYXNlU2NvcmUoc2NvcmU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkUsIHNjb3JlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGV4dHJhTGl2ZXNVcGRncmFkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTW9kZWwuZ2V0VXBncmFkZVZhbHVlKENvbnN0YW50cy5VUEdSQURFX0xJVkVTKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGdldCBibGFkZVdpZHRoVXBncmFkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTW9kZWwuZ2V0VXBncmFkZVZhbHVlKENvbnN0YW50cy5VUEdSQURFX0JMQURFV0lEVEgpO1xuICAgIH0gICBcbiAgICAgICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEdhbWVwbGF5TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZpZXdDb21wKCk6IEdhbWVwbGF5IHtcbiAgICAgICAgcmV0dXJuIDxHYW1lcGxheT50aGlzLnZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0Q3V0IGV4dGVuZHMgUGhhc2VyLkdyYXBoaWNzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgQ09MT1I6IG51bWJlcjtcbiAgICBwdWJsaWMgc3RhdGljIFdJRFRIOiBudW1iZXI7XG4gICAgcHVibGljIHN0YXRpYyBMSUZFX1RJTUU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IFBoYXNlci5HYW1lKSB7XG4gICAgICAgIHN1cGVyKGdhbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3Q3V0KHg6IG51bWJlciwgeTogbnVtYmVyLCBlbmRYOiBudW1iZXIsIGVuZFk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVTdHlsZShGcnVpdEN1dC5XSURUSCwgRnJ1aXRDdXQuQ09MT1IsIDAuNSk7XG4gICAgICAgIHRoaXMuZHJhd1BvbHlnb24oW3gsIHldKTtcbiAgICAgICAgdGhpcy5saW5lVG8oZW5kWCwgZW5kWSk7XG4gICAgICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5hZGQoUGhhc2VyLlRpbWVyLlNFQ09ORCAqIEZydWl0Q3V0LkxJRkVfVElNRSwgdGhpcy5raWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbCgpOiBQaGFzZXIuR3JhcGhpY3Mge1xuICAgICAgICBzdXBlci5raWxsKCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBHYW1lcGxheU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3InO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IEZydWl0Q3V0IGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0Q3V0JztcbmltcG9ydCBGcnVpdEN1dHRhYmxlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0Q3V0dGFibGUnO1xuaW1wb3J0IFNwYXduZXIgZnJvbSAnLi4vZ2FtZXBsYXkvU3Bhd25lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIE1JTl9TV0lQRV9ESVNUQU5DRTogbnVtYmVyID0gMTA7XG5cbiAgICBwcm90ZWN0ZWQgX3N3aXBlU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlOyAgICBcblxuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfc3RhcnRTd2lwZVB0OiBQaGFzZXIuUG9pbnQ7XG4gICAgcHJvdGVjdGVkIF9jdXRMaW5lOiBQaGFzZXIuTGluZTtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEdhbWVwbGF5TWVkaWF0b3IoKTtcbiAgICAgICAgdGhpcy5fc3dpcGVTdGFydGVkID0gZmFsc2U7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5faW5pdFN0YXRzQW5kVXBncmFkZXMsXG4gICAgICAgICAgICB0aGlzLl9hZGRJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0U3Bhd25lcnMoKTtcbiAgICB9IFxuXG4gICAgcHVibGljIG9uR2FtZU92ZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIG92ZXIgbWFuJyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfaW5pdFN0YXRzQW5kVXBncmFkZXMoKTogdm9pZCB7XG4gICAgICAgIEZydWl0Q3V0LkNPTE9SID0gMHhiZmJmYmY7XG4gICAgICAgIEZydWl0Q3V0LldJRFRIID0gMyArIHRoaXMubWVkaWF0b3IuYmxhZGVXaWR0aFVwZ3JhZGU7XG4gICAgICAgIEZydWl0Q3V0LkxJRkVfVElNRSA9IDAuMjU7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfYWRkSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKHRoaXMuX29uSW5wdXREb3duLCB0aGlzKTtcbiAgICAgICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuX29uSW5wdXRVcCwgdGhpcyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfb25JbnB1dERvd24ocG9pbnRlcjogUGhhc2VyLlBvaW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N3aXBlU3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0U3dpcGVQdCA9IG5ldyBQaGFzZXIuUG9pbnQocG9pbnRlci54LCBwb2ludGVyLnkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25JbnB1dFVwKHBvaW50ZXI6IFBoYXNlci5Qb2ludCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc3dpcGVTdGFydGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N3aXBlU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSBQaGFzZXIuUG9pbnQuZGlzdGFuY2UodGhpcy5fc3RhcnRTd2lwZVB0LCBuZXcgUGhhc2VyLlBvaW50KHBvaW50ZXIueCwgcG9pbnRlci55KSk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+PSBHYW1lcGxheS5NSU5fU1dJUEVfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1dExpbmUgPSBuZXcgUGhhc2VyLkxpbmUodGhpcy5fc3RhcnRTd2lwZVB0LngsIHRoaXMuX3N0YXJ0U3dpcGVQdC55LCBwb2ludGVyLngsIHBvaW50ZXIueSk7XG4gICAgICAgICAgICBsZXQgY3V0OiBGcnVpdEN1dCA9IHRoaXMuX2RyYXdDdXQoKTtcbiAgICAgICAgICAgIGxldCBzcGF3bmVyczogUGhhc2VyLkdyb3VwID0gdGhpcy5ncm91cHNbXCJzcGF3bmVyc1wiXTtcbiAgICAgICAgICAgIGlmIChzcGF3bmVycyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Bhd25lcnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXh0R3JvdXAgPSA8UGhhc2VyLkdyb3VwPnNwYXduZXJzLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgICAgICAgbmV4dEdyb3VwLmZvckVhY2hBbGl2ZSh0aGlzLl9jaGVja0NvbGxpc2lvbnMsIHRoaXMsIGN1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RyYXdDdXQoKTogRnJ1aXRDdXQge1xuICAgICAgICBsZXQgY3V0ID0gbmV3IEZydWl0Q3V0KHRoaXMuZ2FtZSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzW1wiY3V0c1wiXS5hZGRDaGlsZChjdXQpO1xuICAgICAgICBjdXQuZHJhd0N1dCh0aGlzLl9jdXRMaW5lLnN0YXJ0LngsIHRoaXMuX2N1dExpbmUuc3RhcnQueSwgdGhpcy5fY3V0TGluZS5lbmQueCwgdGhpcy5fY3V0TGluZS5lbmQueSk7XG4gICAgICAgIHJldHVybiBjdXQ7XG4gICAgfSAgIFxuXG4gICAgcHJvdGVjdGVkIF9jaGVja0NvbGxpc2lvbnMoY3V0dGFibGU6IFBoYXNlci5TcHJpdGUsIGN1dDogRnJ1aXRDdXQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGN1dHRhYmxlLmJvZHkpIHtcbiAgICAgICAgICAgIGxldCBsaW5lMSA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5sZWZ0LCBjdXR0YWJsZS5ib3R0b20sIGN1dHRhYmxlLmxlZnQsIGN1dHRhYmxlLnRvcCk7XG4gICAgICAgICAgICBsZXQgbGluZTIgPSBuZXcgUGhhc2VyLkxpbmUoY3V0dGFibGUubGVmdCwgY3V0dGFibGUudG9wLCBjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUudG9wKTtcbiAgICAgICAgICAgIGxldCBsaW5lMyA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUudG9wLCBjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUuYm90dG9tKTtcbiAgICAgICAgICAgIGxldCBsaW5lNCA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUuYm90dG9tLCBjdXR0YWJsZS5sZWZ0LCBjdXR0YWJsZS5ib3R0b20pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW50ZXJzZWN0aW9uID0gdGhpcy5fY3V0TGluZS5pbnRlcnNlY3RzKGxpbmUxKSB8fCB0aGlzLl9jdXRMaW5lLmludGVyc2VjdHMobGluZTIpIHx8IHRoaXMuX2N1dExpbmUuaW50ZXJzZWN0cyhsaW5lMykgfHwgdGhpcy5fY3V0TGluZS5pbnRlcnNlY3RzKGxpbmU0KTtcbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbk9iamVjdEN1dCgoPEZydWl0Q3V0dGFibGU+Y3V0dGFibGUpLmN1dE9iamVjdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25PYmplY3RDdXQodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBGcnVpdEN1dHRhYmxlLlRZUEVTLmZydWl0OlxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWF0b3IuaW5jcmVhc2VTY29yZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBGcnVpdEN1dHRhYmxlLlRZUEVTLmJvbWI6XG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYXRvci5kZWNyZWFzZUxpdmVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRnJ1aXRDdXR0YWJsZS5UWVBFUy5zcGVjaWFsOlxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWF0b3IuaW5jcmVhc2VTY29yZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0U3Bhd25lcnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBzcGF3bmVyczogUGhhc2VyLkdyb3VwID0gdGhpcy5ncm91cHNbJ3NwYXduZXJzJ107XG4gICAgICAgIHNwYXduZXJzLmNhbGxBbGwoXCJxdWV1ZU5leHRTcGF3blwiLCBudWxsKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU0ZYKCk6IHZvaWQge1xuICAgICAgICBDb25zdGFudHMuU0ZYX0VOQUJMRUQgPSAhQ29uc3RhbnRzLlNGWF9FTkFCTEVEO1xuICAgIH0gICAgICAgXG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLndpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBtZWRpYXRvcigpOiBHYW1lcGxheU1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lcGxheU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBTdG9yZSBmcm9tICcuLi9zdGF0ZS9TdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3N0b3JlbWVkaWF0b3InO1xuXG4gICAgcHVibGljIGdldCBwbGF5ZXJHb2xkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5jdXJyZW50UGxheWVyR29sZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXR0ZW1wdFRvU3BlbmRHb2xkKGFtb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVNb2RlbC5nb2xkU3BlbnQoYW1vdW50KSkge1xuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR09MRF9DSEFOR0VEKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIG5vdGlmeVVwZ3JhZGVQdXJjaGFzZWQodURhdGE6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC5hZGRVcGdyYWRlKHVEYXRhKTtcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFN0b3JlTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0b3JlKCk6IFN0b3JlIHtcbiAgICAgICAgcmV0dXJuIDxTdG9yZT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgU3RvcmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9TdG9yZU1lZGlhdG9yJztcbmltcG9ydCBSSFVwZ3JhZGVJdGVtIGZyb20gJy4uL2Rpc3BsYXkvUkhVcGdyYWRlSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIGV4dGVuZHMgQmFzZVN0YXRlIHtcblxuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBTdG9yZU1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoU3RvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBTdG9yZU1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcblxuICAgIHByb3RlY3RlZCBfc2V0dXBJbnB1dEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJ1dHRvbnM6IFBoYXNlci5Hcm91cCA9IHRoaXMuZ3JvdXBzWydzdG9yZV9pdGVtcyddO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB1cGdyYWRlID0gPFJIVXBncmFkZUl0ZW0+YnV0dG9ucy5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgdXBncmFkZS5vbklucHV0RG93bi5hZGQodGhpcy5vblVwZ3JhZGVQcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBxdWl0QnRuOiBQaGFzZXIuQnV0dG9uID0gPFBoYXNlci5CdXR0b24+dGhpcy5fZmluZFByZWZhYigncXVpdEJ1dHRvbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhxdWl0QnRuKTtcbiAgICAgICAgaWYgKHF1aXRCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1aXRCdG4ub25JbnB1dERvd24uYWRkT25jZSh0aGlzLl9iYWNrVG9UaXRsZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF9iYWNrVG9UaXRsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJiYWNrIHRvIG1lbnVcIik7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9NRU5VKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGdyYWRlUHJlc3NlZCh1cGdyYWRlOiBSSFVwZ3JhZGVJdGVtKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yLmF0dGVtcHRUb1NwZW5kR29sZCh1cGdyYWRlLmJhc2VDb3N0KSkge1xuICAgICAgICAgICAgdXBncmFkZS5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yLm5vdGlmeVVwZ3JhZGVQdXJjaGFzZWQodXBncmFkZS51cGdyYWRlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1cGdyYWRlLmZsYXNoQ29zdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogU3RvcmVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8U3RvcmVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vc3RhdGUvTG9naW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbk1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdsb2dpbm1lZGlhdG9yJztcblxuICAgIHB1YmxpYyBnZXQgc2F2ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLnNhdmVEYXRhO1xuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgdXBkYXRlU2F2ZURhdGEoc25hcHNob3Q6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC51cGRhdGVTYXZlRGF0YShzbmFwc2hvdCk7XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBMb2dpbk1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsb2dpbigpOiBMb2dpbiB7XG4gICAgICAgIHJldHVybiA8TG9naW4+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7VGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyc30gZnJvbSAnZGlqb24vdXRpbHMnO1xuaW1wb3J0IExvZ2luTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvTG9naW5NZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5pbXBvcnQgUGxheWVyVGV4dElucHV0IGZyb20gJy4uL2lucHV0L1BsYXllclRleHRJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByZXNldE5hbWU6IG51bWJlcjtcbiAgICBcbiAgICBwcm90ZWN0ZWQgX3RpdGxlOiBQaGFzZXIuVGV4dDtcbiAgICBwcm90ZWN0ZWQgX2JnOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJvdGVjdGVkIF9jdXJyZW50RmllbGQ6IFBsYXllclRleHRJbnB1dCA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgX2xvZ2luSW5mbzogeyBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nIH07XG4gICAgXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBMb2dpbk1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoTG9naW5NZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBMb2dpbk1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcbiAgICBcbiAgICBwdWJsaWMgY2xlYXJWaXN1YWxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aXRsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2JnLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5QnRuOiBSSEJ1dHRvbiA9IHRoaXMuX2ZpbmRQcmVmYWIoXCJsb2dpbkJ1dHRvblwiKTtcbiAgICAgICAgaWYgKHBsYXlCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBsYXlCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uTG9naW5QcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVtYWlsOiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdlbWFpbElucHV0Jyk7XG4gICAgICAgIGlmIChlbWFpbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZW1haWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLl9zZWxlY3RlZEZpZWxkLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGaWVsZCA9IGVtYWlsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhc3N3OiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdwYXNzd29yZElucHV0Jyk7XG4gICAgICAgIGlmIChwYXNzdyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGFzc3cuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLl9zZWxlY3RlZEZpZWxkLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRDYWxsYmFja3ModGhpcywgbnVsbCwgbnVsbCwgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGhhbmRsZUtleWJvYXJkSW5wdXQoa2V5OiBQaGFzZXIuS2V5Q29kZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudEZpZWxkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJhY3Rlcjogc3RyaW5nID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmxhc3RDaGFyO1xuICAgICAgICBpZiAoIWNoYXJhY3Rlcikge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEZpZWxkLnJlbW92ZUxhc3RDaGFyYWN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IFBoYXNlci5LZXkpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuX2N1cnJlbnRGaWVsZC5jbGVhckZpZWxkKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyICE9PSAnICcgJiYgY2hhcmFjdGVyICE9PSAnJykge1xuICAgICAgICAgICB0aGlzLl9jdXJyZW50RmllbGQudXBkYXRlTGFiZWwoY2hhcmFjdGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkRmllbGQoaW5wdXRGaWVsZDogUGxheWVyVGV4dElucHV0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRGaWVsZCA9IGlucHV0RmllbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25Mb2dpblByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIGxldCBlbWFpbDogUGxheWVyVGV4dElucHV0ID0gdGhpcy5fZmluZFByZWZhYignZW1haWxJbnB1dCcpO1xuICAgICAgICBsZXQgcGFzc3c6IFBsYXllclRleHRJbnB1dCA9IHRoaXMuX2ZpbmRQcmVmYWIoJ3Bhc3N3b3JkSW5wdXQnKTtcbiAgICAgICAgaWYgKHBhc3N3ICE9PSBudWxsICYmIGVtYWlsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dpbkluZm8gPSB7IGVtYWlsOiBlbWFpbC5pbnB1dFRleHQsIHBhc3N3b3JkOiBwYXNzdy5pbnB1dFRleHQgfTtcbiAgICAgICAgICAgIHRoaXMuYXR0ZW1wdExvZ2luKCk7XG4gICAgICAgIH1cbiAgICB9ICAgXG5cbiAgICBwdWJsaWMgb25Mb2dpbihlcnJvcjogYW55LCBhdXRoRGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IFwiYXV0aC91c2VyLW5vdC1mb3VuZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHRoaXMuX2xvZ2luSW5mby5lbWFpbCwgdGhpcy5fbG9naW5JbmZvLnBhc3N3b3JkKS5jYXRjaCh0aGlzLm9uQ3JlYXRlVXNlciwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdXRoRGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIFN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yLnJlcXVlc3RTdGF0ZUNoYW5nZShDb25zdGFudHMuU1RBVEVfTUVOVSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG5cbiAgICBwdWJsaWMgb25DcmVhdGVVc2VyKGVycm9yOiBhbnksIHVzZXJEYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5hdHRlbXB0TG9naW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUGxheWVyRGF0YShzbmFwc2hvdDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYXRvci51cGRhdGVTYXZlRGF0YShzbmFwc2hvdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGxheWVyTmFtZSA9IHRoaXMuX2xvZ2luSW5mby5lbWFpbC5yZXBsYWNlKC9ALiovLCBcIlwiKTtcbiAgICAgICAgICAgIGxldCBpbml0RGF0YSA9IHRoaXMubWVkaWF0b3Iuc2F2ZURhdGE7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlKFwicGxheWVyXCIpLmNoaWxkKGluaXREYXRhLmtleSgpKS5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWUsXG4gICAgICAgICAgICAgICAgd2VhbHRoOiBpbml0RGF0YS53ZWFsdGgsXG4gICAgICAgICAgICAgICAgYmVzdFNjb3JlOiBpbml0RGF0YS5iZXN0U2NvcmUsXG4gICAgICAgICAgICAgICAgbGFzdFNjb3JlOiBpbml0RGF0YS5sYXN0U2NvcmUsXG4gICAgICAgICAgICAgICAgdXBncmFkZXM6IGluaXREYXRhLnVwZ3JhZGVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGF0dGVtcHRMb2dpbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodGhpcy5fbG9naW5JbmZvLmVtYWlsLCB0aGlzLl9sb2dpbkluZm8ucGFzc3dvcmQpLmNhdGNoKHRoaXMub25Mb2dpbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU0ZYKCk6IHZvaWQge1xuICAgICAgICBDb25zdGFudHMuU0ZYX0VOQUJMRUQgPSAhQ29uc3RhbnRzLlNGWF9FTkFCTEVEO1xuICAgIH0gICAgICAgXG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLndpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBtZWRpYXRvcigpOiBMb2dpbk1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxMb2dpbk1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSBcImRpam9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgUkhHYW1lIGZyb20gXCIuL1JIR2FtZVwiO1xuaW1wb3J0IHtEZXZpY2V9IGZyb20gXCJkaWpvbi91dGlsc1wiO1xuaW1wb3J0IHtDb3B5TW9kZWx9IGZyb20gXCJkaWpvbi9tdmNcIjtcblxuaW1wb3J0IEFwcGxpY2F0aW9uTWVkaWF0b3IgZnJvbSBcIi4vbWVkaWF0b3IvQXBwbGljYXRpb25NZWRpYXRvclwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gXCIuL3V0aWxzL05vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCBCb290IGZyb20gXCIuL3N0YXRlL0Jvb3RcIjtcbmltcG9ydCBQcmVsb2FkIGZyb20gXCIuL3N0YXRlL1ByZWxvYWRcIjtcbmltcG9ydCBNZW51IGZyb20gXCIuL3N0YXRlL01lbnVcIjtcbmltcG9ydCBHYW1lcGxheSBmcm9tICcuL3N0YXRlL0dhbWVwbGF5JztcbmltcG9ydCBTdG9yZSBmcm9tICcuL3N0YXRlL1N0b3JlJztcbmltcG9ydCBMb2dpbiBmcm9tICcuL3N0YXRlL0xvZ2luJztcbmltcG9ydCB7IEdhbWVNb2RlbCB9IGZyb20gXCIuL21vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IFByZWZhYkJ1aWxkZXIgZnJvbSAnLi91dGlscy9QcmVmYWJCdWlsZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9pbGVycGxhdGVBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uIHtcbiAgICBwdWJsaWMgZ2FtZUlkOiBzdHJpbmcgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBjcmVhdGVHYW1lKCkge1xuICAgICAgICB0aGlzLmdhbWUgPSBuZXcgUkhHYW1lKHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9nZXRHYW1lV2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZ2V0R2FtZUhlaWdodCgpLFxuICAgICAgICAgICAgcGFyZW50OiAnZ2FtZS1jb250YWluZXInLFxuICAgICAgICAgICAgLy9yZW5kZXJlcjogUGhhc2VyLkNBTlZBUyxcbiAgICAgICAgICAgIHJlbmRlcmVyOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHVzZSB0aGlzIGlmIHlvdSB3YW50IHRvIHN3aXRjaCBiZXR3ZWVuIEAyeCBhbmQgQDF4IGdyYXBoaWNzXG4gICAgICAgICAgICByZXNvbHV0aW9uOiB0aGlzLl9nZXRSZXNvbHV0aW9uKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgQXBwbGljYXRpb25NZWRpYXRvcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkU3RhdGVzKCk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICBwdWJsaWMgc3RhcnRHYW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoQ29uc3RhbnRzLlNUQVRFX0JPT1QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBib290Q29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRqdXN0U2NhbGVTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLmFkanVzdFJlbmRlcmVyU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5hZGRQbHVnaW5zKCk7XG4gICAgICAgIFByZWZhYkJ1aWxkZXIuZ2FtZSA9IHRoaXMuZ2FtZTtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIGFkanVzdFNjYWxlU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2V0TWluTWF4KDI1NiwgMTkyLCAxMDI0LCA3NjgpO1xuICAgICAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRqdXN0UmVuZGVyZXJTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nYW1lLmZvcmNlU2luZ2xlVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5yb3VuZFB4ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW5kZXJlci5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5hbnRpYWxpYXMgPSB0cnVlO1xuICAgIC8vICAgIHRoaXMuZ2FtZS5yZW5kZXJlci5jbGVhckJlZm9yZVJlbmRlciA9IHRoaXMuZ2FtZS5yZW5kZXJUeXBlID09PSBQaGFzZXIuQ0FOVkFTO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBmcm9tIHRoZSBib290IHN0YXRlIGFzIHdlIGNhbid0IGluaXRpYWxpemUgcGx1Z2lucyB1bnRpbCB0aGUgZ2FtZSBpcyBib290ZWRcbiAgICBwdWJsaWMgcmVnaXN0ZXJNb2RlbHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGdhbWVNb2RlbCA9IG5ldyBHYW1lTW9kZWwoJ2dhbWVfZGF0YScpO1xuICAgICAgICBjb25zdCBjb3B5TW9kZWwgPSBuZXcgQ29weU1vZGVsKCdjb3B5Jyk7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsLnBvc3RCb290TG9hZCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgICAvLyBhZGRzIHN0YXRlc1xuICAgIHByaXZhdGUgX2FkZFN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfQk9PVCwgQm9vdCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX1BSRUxPQUQsIFByZWxvYWQpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9NRU5VLCBNZW51KTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfR0FNRSwgR2FtZXBsYXkpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9TVE9SRSwgU3RvcmUpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9MT0dJTiwgTG9naW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEdhbWVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0R2FtZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJlc29sdXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJykgJiYgIWlzTmFOKEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJykpKSB7XG4gICAgICAgICAgICByZXR1cm4gQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRGV2aWNlLm1vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoRGV2aWNlLnBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQod2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVuZGVyZXJCeURldmljZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gRGV2aWNlLm1vYmlsZSAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgPyBQaGFzZXIuQ0FOVkFTIDogUGhhc2VyLkFVVE87XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbWVkaWF0b3IoKTogQXBwbGljYXRpb25NZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8QXBwbGljYXRpb25NZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGdhbWVNb2RlbCgpOiBHYW1lTW9kZWwge1xuICAgICAgICByZXR1cm4gPEdhbWVNb2RlbD50aGlzLnJldHJpZXZlTW9kZWwoR2FtZU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29weU1vZGVsKCk6IENvcHlNb2RlbCB7XG4gICAgICAgIHJldHVybiA8Q29weU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChDb3B5TW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9zdWJtb2R1bGVzL2Rpam9uL2J1aWxkL2Rpam9uLmQudHNcIi8+IFxuaW1wb3J0IEJvaWxlclBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi9Cb2lsZXJQbGF0ZUFwcGxpY2F0aW9uJztcblxuLy8gYm9vdHN0cmFwIHRoZSBhcHBcbmV4cG9ydCBjb25zdCBhcHAgPSBuZXcgQm9pbGVyUGxhdGVBcHBsaWNhdGlvbigpOyIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgSFVER29sZCBmcm9tICcuLi9nYW1lcGxheS9IVURHb2xkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVER29sZE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdodWRnb2xkbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuR09MRF9DSEFOR0VEXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5HT0xEX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkLnVwZGF0ZUdvbGREaXNwbGF5KHRoaXMuZ2FtZU1vZGVsLmN1cnJlbnRQbGF5ZXJHb2xkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBIVURHb2xkTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGdvbGQoKTogSFVER29sZCB7XG4gICAgICAgIHJldHVybiA8SFVER29sZD50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgUkhUZXh0IGZyb20gJy4uL2Rpc3BsYXkvUkhUZXh0JztcbmltcG9ydCBIVURHb2xkTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvSFVER29sZE1lZGlhdG9yJztcbmltcG9ydCB7IElUZXh0RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVURHb2xkIGV4dGVuZHMgUkhUZXh0IHtcblxuICAgIHByb3RlY3RlZCBfbWVkaWF0b3I6IEhVREdvbGRNZWRpYXRvcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElUZXh0RGF0YSkgeyBcbiAgICAgICAgc3VwZXIobmFtZSwgcG9zaXRpb24sIGRhdGEpO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IDxIVURHb2xkTWVkaWF0b3I+SFVER29sZE1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoSFVER29sZE1lZGlhdG9yLk1FRElBVE9SX05BTUUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fbWVkaWF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEhVREdvbGRNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICBwdWJsaWMgdXBkYXRlR29sZERpc3BsYXkobmV3QW1vdW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gbmV3QW1vdW50O1xuICAgIH1cbn0iLCJpbXBvcnQge0dyb3VwLCBUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7SVByZWxvYWRIYW5kbGVyfSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZGVyIGV4dGVuZHMgR3JvdXAgaW1wbGVtZW50cyBJUHJlbG9hZEhhbmRsZXIge1xuICAgIHN0YXRpYyBURVNUOiBudW1iZXIgPSAxO1xuICAgIHN0YXRpYyBURVNUXzI6IG51bWJlciA9IDI7XG5cbiAgICBwcml2YXRlIF93aXBlcjogUGhhc2VyLkltYWdlO1xuICAgIHByaXZhdGUgX2xvYWRUZXh0OiBUZXh0O1xuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbkNvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcbiAgICBwdWJsaWMgdHJhbnNpdGlvbk91dENvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcblxuICAgIHByaXZhdGUgX2luVHdlZW46IFBoYXNlci5Ud2VlbjtcbiAgICBwcml2YXRlIF9vdXRUd2VlbjogUGhhc2VyLlR3ZWVuO1xuXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcih4LCB5LCBuYW1lLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBHcm91cCBvdmVycmlkZXNcbiAgICBwcm90ZWN0ZWQgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0ID0gdGhpcy5hZGRJbnRlcm5hbC5kVGV4dCg1MCwgNTAsICdMb2FkaW5nIC4uLiAnLCAnQXJpYWwnLCAzNiwgJyNGRkZGRkYnKTtcblxuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBnZnguYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcbiAgICAgICAgZ2Z4LmRyYXdSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgdGhpcy5fd2lwZXIgPSB0aGlzLmFkZEludGVybmFsLmltYWdlKDAsIDAsIGdmeC5nZW5lcmF0ZVRleHR1cmUoKSk7XG5cbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnJlbW92ZShnZngsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuYWxwaGEgPSAwO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IGFscGhhOiAxIH0sIDMwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0KTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDAgfSwgMjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbik7XG5cbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5vbkNvbXBsZXRlLmFkZCh0aGlzLl9pbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX291dCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gaVByZWxvYWRIYW5kbGVyIGltcGxlbWVudGF0aW9uc1xuICAgIHB1YmxpYyBsb2FkU3RhcnQoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJvdW5kZWRQcm9ncmVzcyA9IE1hdGgucm91bmQocHJvZ3Jlc3MpLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0LnNldFRleHQoJ0xvYWRpbmcgLi4uICcgKyByb3VuZGVkUHJvZ3Jlc3MgKyAnJScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkQ29tcGxldGUoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0KCkge1xuICAgICAgICB0aGlzLl9vdXRUd2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByb3RlY3RlZCBfaW4oKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkluQ29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX291dCgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbk91dENvbXBsZXRlLmRpc3BhdGNoKCk7XG4gICAgfVxufSJdfQ==
