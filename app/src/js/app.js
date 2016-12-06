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
                    this._firstInput = true;
                    this._input = "";
                    this._hideCharacters = data.prop.hideCharacters;
                    this._baseSize = data.prop.text.fontSize;
                }
                PlayerTextInput.prototype.clearField = function () {
                    this._input = "";
                    this._label.text = "";
                    this._updateInput();
                };
                PlayerTextInput.prototype.updateLabel = function (character) {
                    if (this._firstInput === true) {
                        this._firstInput = false;
                        this.clearField();
                    }
                    this._label.text += this._hideCharacters ? '*' : character;
                    this._input += character;
                    this._updateInput();
                };
                PlayerTextInput.prototype.removeLastCharacter = function () {
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
                };
                Object.defineProperty(PlayerTextInput.prototype, "inputText", {
                    get: function () {
                        return this._input;
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
                    var delkey = this.game.input.keyboard.addKey(Phaser.KeyCode.DELETE);
                    delkey.onDown.add(this._deleteLastInput, this);
                    var bckkey = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
                    bckkey.onDown.add(this._deleteLastInput, this);
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
                Menu.prototype._deleteLastInput = function () {
                    this._currentField.removeLastCharacter();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJIR2FtZS50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwiZGlzcGxheS9SSFByZWZhYi50cyIsImRpc3BsYXkvUkhUZXh0LnRzIiwiZGlzcGxheS9SSEJ1dHRvbi50cyIsIm1lZGlhdG9yL0ZydWl0TGlmZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRMaWZlLnRzIiwibWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRTY29yZS50cyIsImdhbWVwbGF5L0ZydWl0Q3V0dGFibGUudHMiLCJnYW1lcGxheS9TcGF3bmVyLnRzIiwiZGlzcGxheS9SSFVwZ3JhZGVJdGVtLnRzIiwiaW5wdXQvUGxheWVyVGV4dElucHV0LnRzIiwidXRpbHMvUHJlZmFiQnVpbGRlci50cyIsInN0YXRlL0Jhc2VTdGF0ZS50cyIsIm1lZGlhdG9yL0Jvb3RNZWRpYXRvci50cyIsInN0YXRlL0Jvb3QudHMiLCJtZWRpYXRvci9QcmVsb2FkTWVkaWF0b3IudHMiLCJzdGF0ZS9QcmVsb2FkLnRzIiwibWVkaWF0b3IvTWVudU1lZGlhdG9yLnRzIiwic3RhdGUvTWVudS50cyIsIm1lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3IudHMiLCJnYW1lcGxheS9GcnVpdEN1dC50cyIsInN0YXRlL0dhbWVwbGF5LnRzIiwibWVkaWF0b3IvU3RvcmVNZWRpYXRvci50cyIsInN0YXRlL1N0b3JlLnRzIiwibWVkaWF0b3IvTG9naW5NZWRpYXRvci50cyIsInN0YXRlL0xvZ2luLnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsIm1lZGlhdG9yL0hVREdvbGRNZWRpYXRvci50cyIsImdhbWVwbGF5L0hVREdvbGQudHMiLCJ1aS9QcmVsb2FkZXIu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QVEsRUFBRSxDQUFDO2dCQUMxQyxDQUFDO2dCQXRFTSxjQUFJLEdBQVcsQ0FBQyxDQUFDO2dCQUNqQixnQkFBTSxHQUFXLENBQUMsQ0FBQztnQkFzRTlCLGdCQUFDO1lBQUQsQ0F4RUEsQUF3RUMsQ0F4RXNDLGVBQUssR0F3RTNDO1lBeEVELGdDQXdFQyxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWUgfSBmcm9tICdkaWpvbi9jb3JlJztcbmltcG9ydCB7IElHYW1lQ29uZmlnIH0gZnJvbSAnZGlqb24vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIR2FtZSBleHRlbmRzIEdhbWUge1xuICAgIHB1YmxpYyBmaXJlYmFzZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBJR2FtZUNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmZpcmViYXNlID0gd2luZG93WydmaXJlYmFzZSddO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRzIHtcbiAgICAvLyBOT1RFOiBUaGVzZSBzdHJpbmcgdmFsdWVzIHNob3VsZCBtYXRjaCBcbiAgICAvLyBleGFjbHR5IHRvIHRoZSBuYW1lIG9mIHRoZSBkYXRhIGZpbGUgZm9yIHRoYXQgc3RhdGVzIGNyZWF0aW9uLlxuICAgIHN0YXRpYyBTVEFURV9CT09UOiBzdHJpbmcgPSAnYm9vdCc7XG4gICAgc3RhdGljIFNUQVRFX1BSRUxPQUQ6IHN0cmluZyA9ICdwcmVsb2FkJztcbiAgICBzdGF0aWMgU1RBVEVfTUVOVTogc3RyaW5nID0gJ21lbnUnO1xuICAgIHN0YXRpYyBTVEFURV9HQU1FOiBzdHJpbmcgPSAnZ2FtZXBsYXknO1xuICAgIHN0YXRpYyBTVEFURV9TVE9SRTogc3RyaW5nID0gJ3N0b3JlJztcbiAgICBzdGF0aWMgU1RBVEVfTE9HSU46IHN0cmluZyA9ICdsb2dpbic7XG4gICAgXG4gICAgc3RhdGljIEZPTlRfUkFMRVdBWTogc3RyaW5nID0gJ3JhbGV3YXknO1xuXG4gICAgc3RhdGljIFBMQVlFUl9TQVZFX0RBVEE6IHN0cmluZyA9ICdwbGF5ZXJzYXZlZGF0YSc7XG4gICAgXG4gICAgc3RhdGljIFNUUl9CTFVFOiBzdHJpbmcgPSAnIzAwOTllNic7XG4gICAgc3RhdGljIFNUUl9ORVdfVElUTEU6IHN0cmluZyA9ICcjZmZmZmZmJztcbiAgICBzdGF0aWMgU1RSX0JUTl9IT1ZFUjogc3RyaW5nID0gJyNjY2ZmY2MnO1xuICAgIHN0YXRpYyBTVFJfQlROX05PUk1BTDogc3RyaW5nID0gJyM2NjY2OTknO1xuXG4gICAgc3RhdGljIE5VTV9PUkFOR0VfQk9SREVSOiBudW1iZXIgPSAweGZmYjg2NjtcbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1g6IG51bWJlciA9IDB4ZTY3YTAwO1xuXG4gICAgc3RhdGljIEJVVFRPTl9OT1JNQUw6IG51bWJlciA9IDB4ZTZlNmU2O1xuICAgIHN0YXRpYyBCVVRUT05fSE9WRVI6IG51bWJlciA9IDB4ZmY5NDFhO1xuICAgIHN0YXRpYyBCVVRUT05fRE9XTjogbnVtYmVyID0gMHgwMGFhZmY7XG5cbiAgICBzdGF0aWMgVVBHUkFERV9CTEFERVdJRFRIOiBzdHJpbmcgPSAnYmxhZGVXaWR0aCc7XG4gICAgc3RhdGljIFVQR1JBREVfTElWRVM6IHN0cmluZyA9ICdleHRyYUxpZmUnO1xuXG4gICAgc3RhdGljIFNGWF9FTkFCTEVEOiBib29sZWFuID0gdHJ1ZTtcbn0iLCJpbXBvcnQge01vZGVsfSBmcm9tICdkaWpvbi9tdmMnO1xuaW1wb3J0IHsgSVBsYXllclNhdmVEYXRhLCBJVXBncmFkZURhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIEdhbWVNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBwdWJsaWMgc3RhdGljIE1PREVMX05BTUU6IHN0cmluZyA9IFwiZ2FtZU1vZGVsXCI7XG5cbiAgICBwcm90ZWN0ZWQgX3NhdmVEYXRhOiBJUGxheWVyU2F2ZURhdGE7XG4gICAgXG4gICAgcHVibGljIHBvc3RCb290TG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEgPSB0aGlzLmdhbWUuc3RvcmFnZS5nZXRGcm9tTG9jYWxTdG9yYWdlKENvbnN0YW50cy5QTEFZRVJfU0FWRV9EQVRBLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuX3NhdmVEYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVTYXZlRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLndlYWx0aCArPSAyMDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVMb2NhbERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdG9yYWdlLnNhdmVUb0xvY2FsU3RvcmFnZShDb25zdGFudHMuUExBWUVSX1NBVkVfREFUQSwgdGhpcy5fc2F2ZURhdGEpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0VXBncmFkZVZhbHVlKHR5cGU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2F2ZURhdGEudXBncmFkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlRGF0YS51cGdyYWRlc1tpXS51cGdyYWRlVHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzW2ldLmVmZmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2F2ZURhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhID0gPElQbGF5ZXJTYXZlRGF0YT57fTtcbiAgICAgICAgdGhpcy5fc2F2ZURhdGEud2VhbHRoID0gNTA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLmJlc3RTY29yZSA9IDA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLmxhc3RTY29yZSA9IDA7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVNhdmVEYXRhKG5ld0RhdGE6IElQbGF5ZXJTYXZlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zYXZlRGF0YSA9IG5ld0RhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFVwZ3JhZGUoZGF0YTogSVVwZ3JhZGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NhdmVEYXRhLnVwZ3JhZGVzLnB1c2goZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgVXBncmFkZTogXCIgKyBkYXRhLnVwZ3JhZGVUeXBlICsgXCIgdG8gcGxheWVyIHVwZ3JhZGUgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5zYXZlTG9jYWxEYXRhKCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnb2xkU3BlbnQoYW1vdW50OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGFtb3VudCA8PSB0aGlzLmN1cnJlbnRQbGF5ZXJHb2xkKSB7XG4gICAgICAgICAgICB0aGlzLl9zYXZlRGF0YS53ZWFsdGggLT0gYW1vdW50O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTcGVudDogXCIgKyBhbW91bnQgKyBcIiBnb2xkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IHNhdmVEYXRhKCk6IElQbGF5ZXJTYXZlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlRGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRQbGF5ZXJHb2xkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlRGF0YS53ZWFsdGg7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gR2FtZU1vZGVsLk1PREVMX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExldmVsRGF0YShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZWRpYXRvciwgQ29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCB7R2FtZU1vZGVsfSBmcm9tIFwiLi4vbW9kZWwvR2FtZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNZWRpYXRvciBleHRlbmRzIE1lZGlhdG9yIHtcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIHNvIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yIGNhbiBnZXQgY29weVxuICAgIHB1YmxpYyBnZXRDb3B5KGdyb3VwSWQ6IHN0cmluZywgdGV4dElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3B5TW9kZWwuZ2V0Q29weShncm91cElkLCB0ZXh0SWQpO1xuICAgIH1cblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIC8vIG9mZmVyIGFjY2VzcyB0byB0aGUgR2FtZU1vZGVsIGFuZCBDb3B5TW9kZWwgZnJvbSBhbnkgbWVkaWF0b3IgZXh0ZW5kaW5nIEJhc2VNZWRpYXRvclxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPkFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVxdWVzdFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnRyYW5zaXRpb24udG8obmV3U3RhdGUsIHRoaXMuZ2FtZU1vZGVsLmdldExldmVsRGF0YShuZXdTdGF0ZSkpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IGxldmVsRGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCJiYXNlTWVkaWF0b3JfXCIgKyB0aGlzLmdhbWUucm5kLnV1aWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJldHJpZXZlTWVkaWF0b3IobmFtZTogc3RyaW5nLCB2aWV3Q29tcDogYW55KTogTWVkaWF0b3Ige1xuICAgICAgICBsZXQgbWVkaWF0b3I6IE1lZGlhdG9yID0gQXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1lZGlhdG9yKG5hbWUpO1xuICAgICAgICBpZiAobWVkaWF0b3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1lZGlhdG9yLnZpZXdDb21wb25lbnQgPSB2aWV3Q29tcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVkaWF0b3I7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbnMge1xuICAgIHN0YXRpYyBCT09UX0lOSVQ6IHN0cmluZyA9ICdib290SW5pdCc7XG4gICAgc3RhdGljIEJPT1RfQ09NUExFVEU6IHN0cmluZyA9ICdib290Q29tcGxldGUnO1xuICAgIHN0YXRpYyBQUkVMT0FEX0NPTVBMRVRFOiBzdHJpbmcgPSAncHJlbG9hZENvbXBsZXRlJztcblxuICAgIHN0YXRpYyBMSUZFX0xPU1Q6IHN0cmluZyA9ICdsaWZlbG9zdCc7XG4gICAgc3RhdGljIExJRkVfRUFSTkVEOiBzdHJpbmcgPSAnbGlmZWVhcm5lZCc7XG4gICAgc3RhdGljIEdBTUVfTEVWRUxfRkFJTEVEOiBzdHJpbmcgPSAnZ2FtZWxldmVsZmFpbGVkJztcbiAgICBzdGF0aWMgQUREX1RPX1NDT1JFOiBzdHJpbmcgPSAnYWRkdG9zY29yZSc7XG5cbiAgICBzdGF0aWMgR09MRF9DSEFOR0VEOiBzdHJpbmcgPSAnZ29sZGNoYW5nZWQnOyAgICBcbn0iLCJpbXBvcnQge0xvZ2dlcn0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi4vQm9pbGVycGxhdGVBcHBsaWNhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ0FwcGxpY2F0aW9uTWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQk9PVF9JTklULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQ6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0lOSVQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYm9vdENvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFOlxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codGhpcywgJ05vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5zZXREYXRhKHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdhc3NldHMnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnJlZ2lzdGVyTW9kZWxzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRyYW5zaXRpb24udG8oQ29uc3RhbnRzLlNUQVRFX1BSRUxPQUQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCB2aWV3Q29tcG9uZW50KCk6IEJvaWxlcnBsYXRlQXBwbGljYXRpb24ge1xuICAgICAgICByZXR1cm4gPEJvaWxlcnBsYXRlQXBwbGljYXRpb24+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXBwbGljYXRpb25NZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElQcmVmYWJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJIUHJlZmFiIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElQcmVmYWJEYXRhKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIGRhdGEucHJvcC5rZXksIGRhdGEucHJvcC5mcmFtZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgaWYgKGRhdGEucHJvcC5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQaXZvdChkYXRhLnByb3AucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3Auc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUuc2V0VG8oZGF0YS5wcm9wLnNjYWxlLngsIGRhdGEucHJvcC5zY2FsZS55KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFRleHQgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElUZXh0RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWIgZXh0ZW5kcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElUZXh0RGF0YSkge1xuICAgICAgICBzdXBlcihwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5jb3B5LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnROYW1lLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRTaXplLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRDb2xvdXIsXG4gICAgICAgICAgICBkYXRhLnByb3AuYWxpZ24gPyBkYXRhLnByb3AuYWxpZ24gOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggIT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggPyBkYXRhLnByb3Aud3JhcFdpZHRoIDogMCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgaWYgKGRhdGEucHJvcC5zaGFkb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KGRhdGEucHJvcC5zaGFkb3cueCwgZGF0YS5wcm9wLnNoYWRvdy55LCBkYXRhLnByb3Auc2hhZG93LmNvbG91cik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG4gICAgICAgIHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcbiAgICB9XG59IiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnZGlqb24vYXBwbGljYXRpb24nXG5pbXBvcnQge0dhbWV9IGZyb20gJ2Rpam9uL2NvcmUnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHsgSUJ1dHRvbkRhdGEsIElUZXh0Q29tcG9uZW50RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSSEJ1dHRvbiBleHRlbmRzIFBoYXNlci5CdXR0b24ge1xuICAgIHByb3RlY3RlZCBfZGlzYWJsZWRGcmFtZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfZW5hYmxlZEZyYW1lOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgX25vcm1hbENvcHlDb2xvdXI6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgX2hvdmVyQ29weUNvbG91cjogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIF9sYWJlbDogVGV4dDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKEFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkuZ2FtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmtleSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZyYW1lICsgJ19ob3ZlcicsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX2hvdmVyJywgXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICB0aGlzLl9lbmFibGVkRnJhbWUgPSBkYXRhLnByb3AuZnJhbWU7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRnJhbWUgPSBkYXRhLnByb3AuYWx0RnJhbWUgIT09IHVuZGVmaW5lZCA/IGRhdGEucHJvcC5hbHRGcmFtZSA6IGRhdGEucHJvcC5mcmFtZTtcbiAgICAgICAgdGhpcy5mb3JjZU91dCA9IGRhdGEucHJvcC5mb3JjZU91dCA/IGRhdGEucHJvcC5mb3JjZU91dCA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlucHV0LnVzZUhhbmRDdXJzb3IgPSBkYXRhLnByb3AudXNlSGFuZCA/IGRhdGEucHJvcC51c2VIYW5kIDogdHJ1ZTtcblxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oZGF0YS5wcm9wLmFuY2hvci54LCBkYXRhLnByb3AuYW5jaG9yLnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGl2b3QoZGF0YS5wcm9wLnBpdm90KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AudGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWwoZGF0YS5wcm9wLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9hZGRMYWJlbChkYXRhOiBJVGV4dENvbXBvbmVudERhdGEpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN1YlBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiBkYXRhLnBvc2l0aW9uLngsIHk6IGRhdGEucG9zaXRpb24ueSB9O1xuICAgICAgICB0aGlzLl9ub3JtYWxDb3B5Q29sb3VyID0gZGF0YS5mb250Q29sb3VyO1xuICAgICAgICB0aGlzLl9ob3ZlckNvcHlDb2xvdXIgPSBkYXRhLmFsdENvbG91ciA/IGRhdGEuYWx0Q29sb3VyIDogZGF0YS5mb250Q29sb3VyO1xuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbi54ID4gMCAmJiBkYXRhLnBvc2l0aW9uLnggPCAxKSB7XG4gICAgICAgICAgICBzdWJQb3MueCA9IHRoaXMucmVhbFdpZHRoICogZGF0YS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgc3ViUG9zLnkgPSB0aGlzLnJlYWxIZWlnaHQgKiBkYXRhLnBvc2l0aW9uLnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFiZWwgPSBuZXcgVGV4dChzdWJQb3MueCwgc3ViUG9zLnksIGRhdGEuY29weSwgZGF0YS5mb250TmFtZSwgZGF0YS5mb250U2l6ZSwgZGF0YS5mb250Q29sb3VyID8gZGF0YS5mb250Q29sb3VyIDogJyNmZmZmZmYnLCBkYXRhLmFsaWduID8gZGF0YS5hbGlnbiA6ICdjZW50ZXInKTtcbiAgICAgICAgaWYgKGRhdGEuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5hbmNob3Iuc2V0VG8oZGF0YS5hbmNob3IueCwgZGF0YS5hbmNob3IueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldFBpdm90KGRhdGEucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fbGFiZWwpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgdG9nZ2xlRW5hYmxlZEZyYW1lKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJhc2VGcmFtZSh0aGlzLl9lbmFibGVkRnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCYXNlRnJhbWUodGhpcy5fZGlzYWJsZWRGcmFtZSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIG9uSW5wdXREb3duSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXREb3duSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIpO1xuICAgICAgICBpZiAodGhpcy5fbGFiZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldENvbG9yKHRoaXMuX2hvdmVyQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0T3V0SGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXRPdXRIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9ICBcbiAgICBcbiAgICBwdWJsaWMgb25JbnB1dFVwSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55LCBpc092ZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dFVwSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIsIGlzT3Zlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQmFzZUZyYW1lKGJhc2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEZyYW1lcyhiYXNlICsgJ19ob3ZlcicsIGJhc2UgKyAnX25vcm1hbCcsIGJhc2UgKyAnX2hvdmVyJywgYmFzZSArICdfbm9ybWFsJyk7XG4gICAgfSAgXG4gICAgXG4gICAgcHVibGljIGdldCBkZ2FtZSgpOiBHYW1lIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lPnRoaXMuZ2FtZTtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBGcnVpdExpZmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRMaWZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3N0b3JlbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5MSUZFX0VBUk5FRFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NUOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMuZGVjcmVhc2VMaXZlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkxJRkVfRUFSTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMuaW5jcmVhc2VMaXZlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBub3RpZnlHYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR0FNRV9MRVZFTF9GQUlMRUQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnJ1aXRMaWZlTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxpdmVzKCk6IEZydWl0TGlmZSB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRMaWZlPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCBGcnVpdExpZmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9GcnVpdExpZmVNZWRpYXRvcic7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlIGV4dGVuZHMgR3JvdXAge1xuXG4gICAgcHJvdGVjdGVkIF9tYXhMaXZlczogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfbGl2ZXNSZW1haW5pbmc6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2xpZmVWaXN1YWxzOiBSSFByZWZhYltdO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjoge3g6IG51bWJlciwgeTogbnVtYmVyfSwgZGF0YTogSVByZWZhYkRhdGEpIHtcbiAgICAgICAgc3VwZXIoMCwgMCwgbmFtZSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gRnJ1aXRMaWZlTWVkaWF0b3IucmV0cmlldmVNZWRpYXRvcihGcnVpdExpZmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBGcnVpdExpZmVNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpdmVzUmVtYWluaW5nID0gZGF0YS5wcm9wWydsaXZlcyddO1xuICAgICAgICB0aGlzLl9tYXhMaXZlcyA9IHRoaXMuX2xpdmVzUmVtYWluaW5nICogMjtcbiAgICAgICAgdGhpcy5fbGlmZVZpc3VhbHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21heExpdmVzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXh0TGlmZSA9IG5ldyBSSFByZWZhYihuYW1lICsgJ19saWZlXycgKyBpLCB7IHg6IHBvc2l0aW9uLnggKyAoZGF0YS5wcm9wWydzcGFjaW5nJ10gKiBpKSwgeTogcG9zaXRpb24ueSB9LCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV4dExpZmUpO1xuICAgICAgICAgICAgdGhpcy5fbGlmZVZpc3VhbHMucHVzaChuZXh0TGlmZSk7XG4gICAgICAgICAgICBpZiAoaSA+PSB0aGlzLl9saXZlc1JlbWFpbmluZykge1xuICAgICAgICAgICAgICAgIG5leHRMaWZlLmFscGhhID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWNyZWFzZUxpdmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9saXZlc1JlbWFpbmluZy0tO1xuICAgICAgICBpZiAodGhpcy5fbGl2ZXNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWF0b3Iubm90aWZ5R2FtZU92ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMaXZlc0Rpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVhc2VMaXZlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpdmVzUmVtYWluaW5nIDwgMykge1xuICAgICAgICAgICAgdGhpcy5fbGl2ZXNSZW1haW5pbmcrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMaXZlc0Rpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZUxpdmVzRGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tYXhMaXZlczsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9saWZlVmlzdWFsc1tpXS5hbHBoYSA9IGkgPCB0aGlzLl9saXZlc1JlbWFpbmluZyA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtZWRpYXRvcigpOiBGcnVpdExpZmVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRMaWZlTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufSIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgRnJ1aXRTY29yZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdFNjb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRTY29yZU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdmcnVpdHNjb3JlbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQUREX1RPX1NDT1JFXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkU6XG4gICAgICAgICAgICAgICAgbGV0IGFtb3VudDogbnVtYmVyID0gPG51bWJlcj5ub3RpZmljYXRpb24uZ2V0Qm9keSgpO1xuICAgICAgICAgICAgICAgIGlmIChhbW91bnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZS5pbmNyZWFzZUJ5KGFtb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgbm90aWZ5R2FtZU92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkdBTUVfTEVWRUxfRkFJTEVEKTtcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZydWl0U2NvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2NvcmUoKTogRnJ1aXRTY29yZSB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRTY29yZT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgUkhUZXh0IGZyb20gJy4uL2Rpc3BsYXkvUkhUZXh0JztcbmltcG9ydCBGcnVpdFNjb3JlTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yJztcbmltcG9ydCB7IElQcmVmYWJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0U2NvcmUgZXh0ZW5kcyBSSFRleHQge1xuICAgIHByb3RlY3RlZCBfc2NvcmU6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX21lZGlhdG9yOiBGcnVpdFNjb3JlTWVkaWF0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9LCBkYXRhOiBJUHJlZmFiRGF0YSkge1xuICAgICAgICBzdXBlcihuYW1lLCBwb3NpdGlvbiwgZGF0YSk7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gMDtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSA8RnJ1aXRTY29yZU1lZGlhdG9yPkZydWl0U2NvcmVNZWRpYXRvci5yZXRyaWV2ZU1lZGlhdG9yKEZydWl0U2NvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBGcnVpdFNjb3JlTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVhc2VCeShhbW91bnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9zY29yZSArPSBhbW91bnQ7XG4gICAgICAgIHRoaXMudGV4dCA9ICdGcnVpdHM6ICcgKyB0aGlzLl9zY29yZS50b1N0cmluZygpO1xuICAgIH1cbn0iLCJpbXBvcnQgUkhQcmVmYWIgZnJvbSAnLi4vZGlzcGxheS9SSFByZWZhYic7XG5pbXBvcnQgeyBJQ3V0dGFibGVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0Q3V0dGFibGUgZXh0ZW5kcyBSSFByZWZhYiB7XG4gICAgcHVibGljIHN0YXRpYyBERUZBVUxUX0dSQVZJVFk6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgVFlQRVM6IHtib21iOiBzdHJpbmcsIGZydWl0OiBzdHJpbmcsIHNwZWNpYWw6IHN0cmluZ30gPSB7XG4gICAgICAgIGJvbWI6IFwiYm9tYlwiLFxuICAgICAgICBmcnVpdDogXCJmcnVpdFwiLFxuICAgICAgICBzcGVjaWFsOiBcInNwZWNpYWxcIlxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3V0VHlwZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfdmVsb2NpdHk6IFBoYXNlci5Qb2ludDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9LCBkYXRhOiBJQ3V0dGFibGVEYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcblxuICAgICAgICBpZiAoRnJ1aXRDdXR0YWJsZS5UWVBFUy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByb3AuY3V0dGFibGVUeXBlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3V0VHlwZSA9IGRhdGEucHJvcC5jdXR0YWJsZVR5cGU7XG4gICAgICAgIH0gICBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXRUeXBlID0gRnJ1aXRDdXR0YWJsZS5UWVBFUy5mcnVpdDtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlQm9keSh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0gbmV3IFBoYXNlci5Qb2ludCgxLCAxKTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy5fdmVsb2NpdHkueTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLl92ZWxvY2l0eS54O1xuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gRnJ1aXRDdXR0YWJsZS5ERUZBVUxUX0dSQVZJVFk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNwYXduVmVsb2NpdHkobmV3WDogbnVtYmVyLCBuZXdZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkueCA9IG5ld1g7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5LnkgPSAtbmV3WTtcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IEZydWl0Q3V0dGFibGUuREVGQVVMVF9HUkFWSVRZO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgcmVzZXQobmV3WDogbnVtYmVyLCBuZXdZOiBudW1iZXIpOiBQaGFzZXIuU3ByaXRlIHtcbiAgICAgICAgc3VwZXIucmVzZXQobmV3WCwgbmV3WSk7XG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy5fdmVsb2NpdHkueDtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSB0aGlzLl92ZWxvY2l0eS55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgY3V0T2JqZWN0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5nYW1lLmFkZC5lbWl0dGVyKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgZW1pdHRlci5tYWtlUGFydGljbGVzKHRoaXMua2V5LCAncGFydGljbGUnKTtcbiAgICAgICAgZW1pdHRlci5taW5QYXJ0aWNsZVNwZWVkLnNldFRvKC0yMDAsIC0yMDApO1xuICAgICAgICBlbWl0dGVyLm1heFBhcnRpY2xlU3BlZWQuc2V0VG8oMjAwLCAyMDApO1xuICAgICAgICBlbWl0dGVyLmdyYXZpdHkgPSAwO1xuICAgICAgICBlbWl0dGVyLnN0YXJ0KHRydWUsIDcwMCwgbnVsbCwgNTAwKTtcbiAgICAgICAgaWYgKHRoaXMuX2N1dFR5cGUgPT09IEZydWl0Q3V0dGFibGUuVFlQRVMuc3BlY2lhbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAwO1xuICAgICAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKDEwMDAsIHRoaXMua2lsbCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtpbGwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY3V0VHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9iamVjdFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1dFR5cGU7XG4gICAgfVxufSIsImltcG9ydCB7IEdyb3VwIH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgRnJ1aXRDdXR0YWJsZSBmcm9tICcuL0ZydWl0Q3V0dGFibGUnO1xuaW1wb3J0IHsgSVNwYXduZXJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYXduZXIgZXh0ZW5kcyBHcm91cCB7XG4gICAgcHJvdGVjdGVkIF9kYXRhOiBJU3Bhd25lckRhdGE7XG4gICAgcHJvdGVjdGVkIF9zcGF3blBvaW50OiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG4gICAgXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJU3Bhd25lckRhdGEpIHtcbiAgICAgICAgc3VwZXIoMCwgMCwgZGF0YS5uYW1lKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3NwYXduUG9pbnQgPSBwb3NpdGlvbjtcbiAgICAgICAgRnJ1aXRDdXR0YWJsZS5ERUZBVUxUX0dSQVZJVFkgPSA5MDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc3Bhd24ucG9vbFNpemU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1dHRhYmxlID0gbmV3IEZydWl0Q3V0dGFibGUoXCJjdXR0YWJsZVwiICsgdGhpcy5fZGF0YS5jdXR0YWJsZS5wcm9wLmN1dHRhYmxlVHlwZSwgdGhpcy5fc3Bhd25Qb2ludCwgZGF0YS5jdXR0YWJsZSk7XG4gICAgICAgICAgICBjdXR0YWJsZS5raWxsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGN1dHRhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWV1ZU5leHRTcGF3bigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuZXZlbnRzLmFkZCh0aGlzLl9uZXh0U3Bhd25UaW1lLCB0aGlzLl9zcGF3bk9iamVjdCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zcGF3bk9iamVjdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NwYXduaW5nIG9iamVjdCcpO1xuICAgICAgICBsZXQgY3V0dGFibGUgPSA8RnJ1aXRDdXR0YWJsZT50aGlzLmdldEZpcnN0RGVhZCgpO1xuICAgICAgICBpZiAoY3V0dGFibGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGN1dHRhYmxlLnNldFNwYXduVmVsb2NpdHkodGhpcy5fbmV3WFZlbG9jaXR5LCB0aGlzLl9uZXdZVmVsb2NpdHkpO1xuICAgICAgICAgICAgY3V0dGFibGUucmV2aXZlKDUwKTtcbiAgICAgICAgICAgIGN1dHRhYmxlLnJlc2V0KHRoaXMuX3NwYXduUG9pbnQueCwgdGhpcy5fc3Bhd25Qb2ludC55KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXVlTmV4dFNwYXduKCk7XG4gICAgfVxuICAgIFxuICAgIHByb3RlY3RlZCBnZXQgX25ld1hWZWxvY2l0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udmVsWC5taW4sIHRoaXMuX2RhdGEuc3Bhd24udmVsWC5tYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgX25ld1lWZWxvY2l0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udmVsWS5taW4sIHRoaXMuX2RhdGEuc3Bhd24udmVsWS5tYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgX25leHRTcGF3blRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5ybmQuYmV0d2Vlbih0aGlzLl9kYXRhLnNwYXduLnRpbWVSYW5nZS5taW4sIHRoaXMuX2RhdGEuc3Bhd24udGltZVJhbmdlLm1heCk7XG4gICAgfVxufSIsImltcG9ydCBSSEJ1dHRvbiBmcm9tICcuL1JIQnV0dG9uJztcbmltcG9ydCB7SVVwZ3JhZGVCdXR0b25EYXRhLCBJVXBncmFkZURhdGF9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSSFVwZ3JhZGVJdGVtIGV4dGVuZHMgUkhCdXR0b24ge1xuXG4gICAgcHJvdGVjdGVkIF9jb3N0OiBUZXh0O1xuICAgIHByb3RlY3RlZCBfZGVzYzogVGV4dDtcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IElVcGdyYWRlRGF0YTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVVwZ3JhZGVCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcblxuICAgICAgICBsZXQgZGVzY1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiB0aGlzLnJlYWxXaWR0aCArIDEwLCB5OiB0aGlzLnJlYWxIZWlnaHQgKiAwLjV9O1xuICAgICAgICB0aGlzLl9kZXNjID0gbmV3IFRleHQoZGVzY1Bvcy54LCBkZXNjUG9zLnksIGRhdGEudXBncmFkZS5kZXNjcmlwdGlvbiwgZGF0YS5wcm9wLnRleHQuZm9udE5hbWUsIGRhdGEucHJvcC50ZXh0LmZvbnRTaXplICogMC42LCBkYXRhLnByb3AudGV4dC5mb250Q29sb3VyID8gZGF0YS5wcm9wLnRleHQuZm9udENvbG91ciA6ICcjZmZmZmZmJywgJ2xlZnQnKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9kZXNjKTtcblxuICAgICAgICBsZXQgY29zdFBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiB0aGlzLnJlYWxXaWR0aCArIDEwLCB5OiAwfTtcbiAgICAgICAgdGhpcy5fY29zdCA9IG5ldyBUZXh0KGNvc3RQb3MueCwgY29zdFBvcy55LCBkYXRhLnVwZ3JhZGUucHJpY2UudG9TdHJpbmcoKSArIFwiZ1wiLCBkYXRhLnByb3AudGV4dC5mb250TmFtZSwgZGF0YS5wcm9wLnRleHQuZm9udFNpemUgKiAwLjYsIGRhdGEucHJvcC50ZXh0LmZvbnRDb2xvdXIgPyBkYXRhLnByb3AudGV4dC5mb250Q29sb3VyIDogJyNmZmZmZmYnLCAnbGVmdCcpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2Nvc3QpO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnVwZ3JhZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGVCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Nvc3QudGV4dCA9IFwiU29sZCBPdXRcIjtcbiAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xhYmVsLnNldENvbG9yKHRoaXMuX2hvdmVyQ29weUNvbG91cik7XG4gICAgICAgIHRoaXMudGludCA9IDB4YmZiZmJmO1xuICAgICAgICB0aGlzLl9kZXNjLnNldENvbG9yKFwiI2JmYmZiZlwiKTtcbiAgICAgICAgdGhpcy5fY29zdC5zZXRDb2xvcihcIiNiZmJmYmZcIik7XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgZmxhc2hDb3N0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb3N0LnNldENvbG9yKCcjYmYwMDAwJyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgYmFzZUNvc3QoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEucHJpY2U7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgdXBncmFkZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEudXBncmFkZVR5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB1cGdyYWRlRGF0YSgpOiBJVXBncmFkZURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59IiwiaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IHsgSUJ1dHRvbkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyVGV4dElucHV0IGV4dGVuZHMgUkhCdXR0b24ge1xuXG4gICAgcHJvdGVjdGVkIF9iYXNlU2l6ZTogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfaW5wdXQ6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgX2hpZGVDaGFyYWN0ZXJzOiBib29sZWFuO1xuICAgIHByb3RlY3RlZCBfZmlyc3RJbnB1dDogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fZmlyc3RJbnB1dCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5faGlkZUNoYXJhY3RlcnMgPSBkYXRhLnByb3AuaGlkZUNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMuX2Jhc2VTaXplID0gZGF0YS5wcm9wLnRleHQuZm9udFNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyRmllbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5fbGFiZWwudGV4dCA9IFwiXCI7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUlucHV0KCk7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyB1cGRhdGVMYWJlbChjaGFyYWN0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZmlyc3RJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3RJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFiZWwudGV4dCArPSB0aGlzLl9oaWRlQ2hhcmFjdGVycyA/ICcqJyA6IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5faW5wdXQgKz0gY2hhcmFjdGVyO1xuICAgICAgICB0aGlzLl91cGRhdGVJbnB1dCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVMYXN0Q2hhcmFjdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZmlyc3RJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3RJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwudGV4dCA9IHRoaXMuX2xhYmVsLnRleHQuc2xpY2UoMCwgdGhpcy5fbGFiZWwudGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UoMCwgdGhpcy5faW5wdXQubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fbGFiZWwudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUlucHV0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xuICAgIH0gICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF91cGRhdGVJbnB1dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsLnRleHQubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLmZvbnRTaXplID0gdGhpcy5fYmFzZVNpemUgLyAodGhpcy5fbGFiZWwudGV4dC5sZW5ndGggLyAzMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5mb250U2l6ZSA9IHRoaXMuX2Jhc2VTaXplO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhYmVsLmNlbnRlclBpdm90KCk7XG4gICAgfVxufSIsImltcG9ydCB7IElTY2VuZURhdGEgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCBSSFRleHQgZnJvbSAnLi4vZGlzcGxheS9SSFRleHQnO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IEJhc2VTdGF0ZSBmcm9tICcuLi9zdGF0ZS9CYXNlU3RhdGUnO1xuaW1wb3J0IEZydWl0TGlmZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdExpZmUnO1xuaW1wb3J0IEZydWl0U2NvcmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRTY29yZSc7XG5pbXBvcnQgU3Bhd25lciBmcm9tICcuLi9nYW1lcGxheS9TcGF3bmVyJztcbmltcG9ydCBSSFVwZ3JhZGVJdGVtIGZyb20gJy4uL2Rpc3BsYXkvUkhVcGdyYWRlSXRlbSc7XG5pbXBvcnQgUGxheWVyVGV4dElucHV0IGZyb20gJy4uL2lucHV0L1BsYXllclRleHRJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWZhYkJ1aWxkZXIge1xuXG4gICAgLy8gQWxsIGNsYXNzZXMgeW91IGludGVuZGVkIHRvIGluc3RhbnRpYXRlIG5lZWQgdG8gZXhpc3Qgd2l0aCB0aGlzIG9iamVjdC5cbiAgICAvLyBJZiB0aGVyZSB0eXBlIGhlcmUgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgcGFyZW0gZnJvbSB0aGUgaW1wb3J0IGZpbGUsIFxuICAgIC8vIHRoZW4gdGhlIEJ1aWxkZXIgd2lsbCBza2lwIG92ZXIgdGhhdCBjbGFzcy5cbiAgICBwdWJsaWMgc3RhdGljIHByZWZhYkNsYXNzZXM6IHt9ID0ge1xuICAgICAgICBwcmVmYWI6IFJIUHJlZmFiLFxuICAgICAgICB0ZXh0OiBSSFRleHQsXG4gICAgICAgIGJ1dHRvbjogUkhCdXR0b24sXG4gICAgICAgIGxpdmVzOiBGcnVpdExpZmUsIFxuICAgICAgICBzY29yZTogRnJ1aXRTY29yZSxcbiAgICAgICAgc3Bhd25lcjogU3Bhd25lcixcbiAgICAgICAgdXBncmFkZTogUkhVcGdyYWRlSXRlbSxcbiAgICAgICAgaW5wdXRmaWVsZDogUGxheWVyVGV4dElucHV0XG4gICAgfTsgXG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBnYW1lOiBQaGFzZXIuR2FtZSA9IG51bGw7XG5cbiAgICAvLyBDcmVhdGVzIGFsbCBvYmplY3RzIGZvciBhIGdpdmVuIHNjZW5lLCBvbiB0aGF0IHNjZW5lLiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lRnJvbShkYXRhOiBJU2NlbmVEYXRhLCBzY2VuZTogQmFzZVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmIChzY2VuZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBncm91cE5hbWUsIHByZWZhYk5hbWU7XG4gICAgICAgIHNjZW5lLnByZWZhYnMgPSBbXTtcbiAgICAgICAgc2NlbmUuZ3JvdXBzID0ge307XG5cbiAgICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBncm91cCBkYXRhLlxuICAgICAgICAgICAgZGF0YS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY2VuZS5ncm91cHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZS5ncm91cHNbZ3JvdXBOYW1lXSA9IHNjZW5lLmFkZC5kR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHByZWZhYiBkYXRhLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnByZWZhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoUHJlZmFiQnVpbGRlci5wcmVmYWJDbGFzc2VzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcHJlZmFiXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmVmYWIgPSB0aGlzLmNyZWF0ZVByZWZhYihkYXRhLnByZWZhYnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmVmYWJzW2ldLmhhc093blByb3BlcnR5KFwiZ3JvdXBcIikgJiYgc2NlbmUuZ3JvdXBzLmhhc093blByb3BlcnR5KGRhdGEucHJlZmFic1tpXS5ncm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLmdyb3Vwc1tkYXRhLnByZWZhYnNbaV0uZ3JvdXBdLmFkZENoaWxkKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5hZGQuZXhpc3RpbmcocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5wcmVmYWJzW3ByZWZhYi5uYW1lXSA9IHByZWZhYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIGFsbCBwcmVmYWJzIGZyb20gYSBnaXZlbiBkYXRhIG9iamVjdC5cbiAgICAvLyBSZXR1cm5zIGEgZ3JvdXAgd2l0aCB0aGVtIGluIGl0LlxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUHJlZmFic0Zyb20oZGF0YTogSVNjZW5lRGF0YSk6IEdyb3VwIHtcbiAgICAgICAgbGV0IGdyb3VwTmFtZSwgcHJlZmFiTmFtZTtcbiAgICAgICAgbGV0IGdyb3VwcyA9IHt9O1xuICAgICAgICBsZXQgcm9vdCA9IG5ldyBHcm91cCgwLCAwLCAncm9vdCcpO1xuXG4gICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBncm91cHNbJ2Jhc2ljJ10gPSBuZXcgR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBncm91cCBkYXRhLlxuICAgICAgICAgICAgZGF0YS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzW2dyb3VwTmFtZV0gPSBuZXcgR3JvdXAoMCwgMCwgZ3JvdXBOYW1lKTtcbiAgICAgICAgICAgICAgICByb290LmFkZENoaWxkKGdyb3Vwc1tncm91cE5hbWVdKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgcHJlZmFiIGRhdGEuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucHJlZmFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChQcmVmYWJCdWlsZGVyLnByZWZhYkNsYXNzZXMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWZhYiA9IHRoaXMuY3JlYXRlUHJlZmFiKGRhdGEucHJlZmFic1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnByZWZhYnNbaV0uaGFzT3duUHJvcGVydHkoXCJncm91cFwiKSAmJiBncm91cHMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLmdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW2RhdGEucHJlZmFic1tpXS5ncm91cF0uYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3QuYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVByZWZhYihkYXRhOiBhbnksIHBhcmVudDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgICAgIGxldCBwcmVmYWJQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGxldCBwcmVmYWI6IGFueTtcbiAgICAgICAgLy8gY3JlYXRlIG9iamVjdCBhY2NvcmRpbmcgdG8gaXRzIHR5cGVcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnR5cGUpKSB7XG4gICAgICAgICAgICAvLyBJZiBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsIHdlIGFzc3VtZSB0aGlzIGlzIGEgZmxvYXRpbmdcbiAgICAgICAgICAgIC8vIHBvaW50IHZhbHVlIHRvIGJlIGludGVycHJldGVkIGFzIGEgJSBiYXNlZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIGlmIChkYXRhLnBvc2l0aW9uLnggPiAwICYmIGRhdGEucG9zaXRpb24ueCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gYXMgcGVyY2VudGFnZSwgZGVwZW5kZW50IG9uIHBhcmVudC5cbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnggPSBkYXRhLnBvc2l0aW9uLnggKiBQcmVmYWJCdWlsZGVyLmdhbWUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnkgPSBkYXRhLnBvc2l0aW9uLnkgKiBQcmVmYWJCdWlsZGVyLmdhbWUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueCA9IGRhdGEucG9zaXRpb24ueCAqIHBhcmVudC5yZWFsV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnkgPSBkYXRhLnBvc2l0aW9uLnkgKiBwYXJlbnQucmVhbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uLnggPSBkYXRhLnBvc2l0aW9uLnggLSBwYXJlbnQueDtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueSA9IGRhdGEucG9zaXRpb24ueSAtIHBhcmVudC55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZWZhYiA9IG5ldyB0aGlzLnByZWZhYkNsYXNzZXNbZGF0YS50eXBlXShkYXRhLm5hbWUsIHByZWZhYlBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJjb21wb25lbnRzXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXAgPSBQcmVmYWJCdWlsZGVyLmNyZWF0ZVByZWZhYihkYXRhLmNvbXBvbmVudHNbaV0sIHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIHByZWZhYi5hZGRDaGlsZChjb21wKTtcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJlZmFiO1xuICAgIH1cbn0iLCJpbXBvcnQge1N0YXRlfSBmcm9tIFwiZGlqb24vY29yZVwiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQmFzZU1lZGlhdG9yXCI7XG5pbXBvcnQgeyBJU2NlbmVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5pbXBvcnQgUHJlZmFiQnVpbGRlciBmcm9tICcuLi91dGlscy9QcmVmYWJCdWlsZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIHByaXZhdGUgX3VwZGF0ZUFsbG93ZWQ6IGJvb2xlYW4gID0gZmFsc2U7XG5cbiAgICAvLyBUaGlzIHdpbGwgYmUgYW4gYXJyYXkgY29udGFpbmluZyBhIHJlZmVyZW5jZSB0byBldmVyeSBQcmVmYWIgYnVpbHQgZm9yIHRoaXMgc2NlbmUuICAgIFxuICAgIHB1YmxpYyBwcmVmYWJzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgIC8vIFRoaXMgd2lsbCBiZSBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIGdyb3VwLCBhZGRlZCB0aHJvdWdoIHRoZSBwcmVmYWIgYnVpbGRlciwgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0LlxuICAgIHB1YmxpYyBncm91cHM6IGFueTtcbiAgICBwdWJsaWMgX2xldmVsRGF0YTogSVNjZW5lRGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWxEYXRhID0gbGV2ZWxEYXRhO1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBwcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5wcmVsb2FkKCk7XG4gICAgICAgIGlmICh0aGlzLl9sZXZlbERhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkQXNzZXRzKHRoaXMuX2xldmVsRGF0YS5hc3NldEVudHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sZXZlbERhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIFByZWZhYkJ1aWxkZXIuY3JlYXRlU2NlbmVGcm9tKHRoaXMuX2xldmVsRGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsb3dlZCA9IHRydWU7XG4gICAgfSAgICBcblxuICAgIHByb3RlY3RlZCBfZmluZFByZWZhYihuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5wcmVmYWJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmYWJzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIlByZWZhYiBcIiArIG5hbWUgKyBcIiBub3QgZm91bmQgb24gU3RhdGUuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdXBkYXRlQWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXNlIG1lIGZvciB1cGRhdGUgbG9vcHMgLSBJIHdpbGwgb25seSBiZSBjYWxsZWQgd2hlbiB1cGRhdGVBbGxvd2VkIGlzIHRydWUuICAgIFxuICAgIHB1YmxpYyB1cGRhdGVTdGF0ZSgpOiB2b2lkIHsgfVxuXG4gICAgcHVibGljIGdldCB1cGRhdGVBbGxvd2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlQWxsb3dlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHVwZGF0ZUFsbG93ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsb3dlZCA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZpcmViYXNlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVbJ2ZpcmViYXNlJ107XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdib290TWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIGRpam9uLm12Yy5NZWRpYXRvciBvdmVycmlkZXNcbiAgICBwdWJsaWMgb25SZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuQk9PVF9JTklUKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvLyBjYWxsZWQgZnJvbSB2aWV3Q29tcG9uZW50XG4gICAgcHVibGljIGJvb3RDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURSk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBCb290TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBCb290TWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL0Jvb3RNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEJvb3RNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHdpbmRvd1sndmVyc2lvbiddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5jYWNoZUJ1c3RWZXJzaW9uID0gJ0BAdmVyc2lvbic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdnYW1lX2RhdGEnKTtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdhc3NldHMnKTtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRKU09OKCdjb3B5Jyk7XG4gICAgfVxuXG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgYnVpbGRJbnRlcmZhY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IuYm9vdENvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwcm90ZWN0ZWQgZ2V0IG1lZGlhdG9yKCk6IEJvb3RNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8Qm9vdE1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn0iLCJpbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gJ2Rpam9uL2ludGVyZmFjZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3ByZWxvYWRNZWRpYXRvcic7XG5cdFx0XG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvLyBjYWxsZWQgZnJvbSBQcmVsb2FkIHN0YXRlXG5cbiAgICBwdWJsaWMgbm90aWZ5UHJlbG9hZENvbXBsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFKTtcbiAgICB9ICAgXG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gUHJlbG9hZE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBQcmVsb2FkTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL1ByZWxvYWRNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IFByZWxvYWRNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlQcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX0xPR0lOKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHJvdGVjdGVkIGdldCBtZWRpYXRvcigpOiBQcmVsb2FkTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPFByZWxvYWRNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBNZW51IGZyb20gJy4uL3N0YXRlL01lbnUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ21lbnVNZWRpYXRvcic7XG5cdFx0XG4gICAgcHVibGljIGdldCBhdWRpb1Nwcml0ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldERhdGEoKVsnYXVkaW9zcHJpdGUnXTtcbiAgICB9ICBcblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBNZW51TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1lbnUoKTogTWVudSB7XG4gICAgICAgIHJldHVybiA8TWVudT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgTWVudU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL01lbnVNZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByZXNldE5hbWU6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCBfdGl0bGU6IFBoYXNlci5UZXh0O1xuICAgIHByb3RlY3RlZCBfYmc6IFBoYXNlci5JbWFnZTtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IE1lbnVNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdEJ1aWxkU2VxdWVuY2UoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLl9zZXR1cElucHV0RXZlbnRzXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJCdWlsZCgpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJCdWlsZCgpO1xuICAgICAgICB0aGlzLl9idWlsZENvbXBsZXRlID0gdHJ1ZTtcbiAgICB9IFxuICAgIFxuICAgIHB1YmxpYyBjbGVhclZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RpdGxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fYmcuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0dXBJbnB1dEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBsYXlCdG46IFJIQnV0dG9uID0gdGhpcy5fZmluZFByZWZhYihcImdhbWVfYnV0dG9uXCIpO1xuICAgICAgICBpZiAocGxheUJ0biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGxheUJ0bi5vbklucHV0RG93bi5hZGQodGhpcy5fb25QbGF5UHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzdG9yZUJ0bjogUkhCdXR0b24gPSA8UkhCdXR0b24+dGhpcy5fZmluZFByZWZhYihcInN0b3JlX2J1dHRvblwiKTtcbiAgICAgICAgaWYgKHN0b3JlQnRuICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdG9yZUJ0bi5vbklucHV0RG93bi5hZGQodGhpcy5fb25TdG9yZVByZXNzZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25QbGF5UHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX0dBTUUpO1xuICAgIH0gICBcbiAgICBcbiAgICBwcml2YXRlIF9vblN0b3JlUHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX1NUT1JFKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b2dnbGVTRlgoKTogdm9pZCB7XG4gICAgICAgIENvbnN0YW50cy5TRlhfRU5BQkxFRCA9ICFDb25zdGFudHMuU0ZYX0VOQUJMRUQ7XG4gICAgfSAgICAgICBcblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IE1lbnVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8TWVudU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBHYW1lcGxheSBmcm9tICcuLi9zdGF0ZS9HYW1lcGxheSc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2dhbWVwbGF5bWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIGRpam9uLm12Yy5NZWRpYXRvciBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkdBTUVfTEVWRUxfRkFJTEVEXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5MSUZFX0xPU1Q6XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcC5vbkdhbWVPdmVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluY3JlYXNlTGl2ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkxJRkVfRUFSTkVEKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGRlY3JlYXNlTGl2ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkxJRkVfTE9TVCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluY3JlYXNlU2NvcmUoc2NvcmU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkUsIHNjb3JlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGV4dHJhTGl2ZXNVcGRncmFkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTW9kZWwuZ2V0VXBncmFkZVZhbHVlKENvbnN0YW50cy5VUEdSQURFX0xJVkVTKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIGdldCBibGFkZVdpZHRoVXBncmFkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTW9kZWwuZ2V0VXBncmFkZVZhbHVlKENvbnN0YW50cy5VUEdSQURFX0JMQURFV0lEVEgpO1xuICAgIH0gICBcbiAgICAgICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEdhbWVwbGF5TWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZpZXdDb21wKCk6IEdhbWVwbGF5IHtcbiAgICAgICAgcmV0dXJuIDxHYW1lcGxheT50aGlzLnZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0Q3V0IGV4dGVuZHMgUGhhc2VyLkdyYXBoaWNzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgQ09MT1I6IG51bWJlcjtcbiAgICBwdWJsaWMgc3RhdGljIFdJRFRIOiBudW1iZXI7XG4gICAgcHVibGljIHN0YXRpYyBMSUZFX1RJTUU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWU6IFBoYXNlci5HYW1lKSB7XG4gICAgICAgIHN1cGVyKGdhbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3Q3V0KHg6IG51bWJlciwgeTogbnVtYmVyLCBlbmRYOiBudW1iZXIsIGVuZFk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVTdHlsZShGcnVpdEN1dC5XSURUSCwgRnJ1aXRDdXQuQ09MT1IsIDAuNSk7XG4gICAgICAgIHRoaXMuZHJhd1BvbHlnb24oW3gsIHldKTtcbiAgICAgICAgdGhpcy5saW5lVG8oZW5kWCwgZW5kWSk7XG4gICAgICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5hZGQoUGhhc2VyLlRpbWVyLlNFQ09ORCAqIEZydWl0Q3V0LkxJRkVfVElNRSwgdGhpcy5raWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbCgpOiBQaGFzZXIuR3JhcGhpY3Mge1xuICAgICAgICBzdXBlci5raWxsKCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBHYW1lcGxheU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3InO1xuaW1wb3J0IFJIQnV0dG9uIGZyb20gJy4uL2Rpc3BsYXkvUkhCdXR0b24nO1xuaW1wb3J0IEZydWl0Q3V0IGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0Q3V0JztcbmltcG9ydCBGcnVpdEN1dHRhYmxlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0Q3V0dGFibGUnO1xuaW1wb3J0IFNwYXduZXIgZnJvbSAnLi4vZ2FtZXBsYXkvU3Bhd25lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIE1JTl9TV0lQRV9ESVNUQU5DRTogbnVtYmVyID0gMTA7XG5cbiAgICBwcm90ZWN0ZWQgX3N3aXBlU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlOyAgICBcblxuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfc3RhcnRTd2lwZVB0OiBQaGFzZXIuUG9pbnQ7XG4gICAgcHJvdGVjdGVkIF9jdXRMaW5lOiBQaGFzZXIuTGluZTtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEdhbWVwbGF5TWVkaWF0b3IoKTtcbiAgICAgICAgdGhpcy5fc3dpcGVTdGFydGVkID0gZmFsc2U7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5faW5pdFN0YXRzQW5kVXBncmFkZXMsXG4gICAgICAgICAgICB0aGlzLl9hZGRJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0U3Bhd25lcnMoKTtcbiAgICB9IFxuXG4gICAgcHVibGljIG9uR2FtZU92ZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIG92ZXIgbWFuJyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfaW5pdFN0YXRzQW5kVXBncmFkZXMoKTogdm9pZCB7XG4gICAgICAgIEZydWl0Q3V0LkNPTE9SID0gMHhiZmJmYmY7XG4gICAgICAgIEZydWl0Q3V0LldJRFRIID0gMyArIHRoaXMubWVkaWF0b3IuYmxhZGVXaWR0aFVwZ3JhZGU7XG4gICAgICAgIEZydWl0Q3V0LkxJRkVfVElNRSA9IDAuMjU7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfYWRkSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKHRoaXMuX29uSW5wdXREb3duLCB0aGlzKTtcbiAgICAgICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuX29uSW5wdXRVcCwgdGhpcyk7XG4gICAgfSAgIFxuICAgIFxuICAgIHByb3RlY3RlZCBfb25JbnB1dERvd24ocG9pbnRlcjogUGhhc2VyLlBvaW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N3aXBlU3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0U3dpcGVQdCA9IG5ldyBQaGFzZXIuUG9pbnQocG9pbnRlci54LCBwb2ludGVyLnkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25JbnB1dFVwKHBvaW50ZXI6IFBoYXNlci5Qb2ludCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc3dpcGVTdGFydGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N3aXBlU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSBQaGFzZXIuUG9pbnQuZGlzdGFuY2UodGhpcy5fc3RhcnRTd2lwZVB0LCBuZXcgUGhhc2VyLlBvaW50KHBvaW50ZXIueCwgcG9pbnRlci55KSk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+PSBHYW1lcGxheS5NSU5fU1dJUEVfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1dExpbmUgPSBuZXcgUGhhc2VyLkxpbmUodGhpcy5fc3RhcnRTd2lwZVB0LngsIHRoaXMuX3N0YXJ0U3dpcGVQdC55LCBwb2ludGVyLngsIHBvaW50ZXIueSk7XG4gICAgICAgICAgICBsZXQgY3V0OiBGcnVpdEN1dCA9IHRoaXMuX2RyYXdDdXQoKTtcbiAgICAgICAgICAgIGxldCBzcGF3bmVyczogUGhhc2VyLkdyb3VwID0gdGhpcy5ncm91cHNbXCJzcGF3bmVyc1wiXTtcbiAgICAgICAgICAgIGlmIChzcGF3bmVycyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Bhd25lcnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXh0R3JvdXAgPSA8UGhhc2VyLkdyb3VwPnNwYXduZXJzLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgICAgICAgbmV4dEdyb3VwLmZvckVhY2hBbGl2ZSh0aGlzLl9jaGVja0NvbGxpc2lvbnMsIHRoaXMsIGN1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RyYXdDdXQoKTogRnJ1aXRDdXQge1xuICAgICAgICBsZXQgY3V0ID0gbmV3IEZydWl0Q3V0KHRoaXMuZ2FtZSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzW1wiY3V0c1wiXS5hZGRDaGlsZChjdXQpO1xuICAgICAgICBjdXQuZHJhd0N1dCh0aGlzLl9jdXRMaW5lLnN0YXJ0LngsIHRoaXMuX2N1dExpbmUuc3RhcnQueSwgdGhpcy5fY3V0TGluZS5lbmQueCwgdGhpcy5fY3V0TGluZS5lbmQueSk7XG4gICAgICAgIHJldHVybiBjdXQ7XG4gICAgfSAgIFxuXG4gICAgcHJvdGVjdGVkIF9jaGVja0NvbGxpc2lvbnMoY3V0dGFibGU6IFBoYXNlci5TcHJpdGUsIGN1dDogRnJ1aXRDdXQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGN1dHRhYmxlLmJvZHkpIHtcbiAgICAgICAgICAgIGxldCBsaW5lMSA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5sZWZ0LCBjdXR0YWJsZS5ib3R0b20sIGN1dHRhYmxlLmxlZnQsIGN1dHRhYmxlLnRvcCk7XG4gICAgICAgICAgICBsZXQgbGluZTIgPSBuZXcgUGhhc2VyLkxpbmUoY3V0dGFibGUubGVmdCwgY3V0dGFibGUudG9wLCBjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUudG9wKTtcbiAgICAgICAgICAgIGxldCBsaW5lMyA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUudG9wLCBjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUuYm90dG9tKTtcbiAgICAgICAgICAgIGxldCBsaW5lNCA9IG5ldyBQaGFzZXIuTGluZShjdXR0YWJsZS5yaWdodCwgY3V0dGFibGUuYm90dG9tLCBjdXR0YWJsZS5sZWZ0LCBjdXR0YWJsZS5ib3R0b20pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW50ZXJzZWN0aW9uID0gdGhpcy5fY3V0TGluZS5pbnRlcnNlY3RzKGxpbmUxKSB8fCB0aGlzLl9jdXRMaW5lLmludGVyc2VjdHMobGluZTIpIHx8IHRoaXMuX2N1dExpbmUuaW50ZXJzZWN0cyhsaW5lMykgfHwgdGhpcy5fY3V0TGluZS5pbnRlcnNlY3RzKGxpbmU0KTtcbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbk9iamVjdEN1dCgoPEZydWl0Q3V0dGFibGU+Y3V0dGFibGUpLmN1dE9iamVjdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25PYmplY3RDdXQodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBGcnVpdEN1dHRhYmxlLlRZUEVTLmZydWl0OlxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWF0b3IuaW5jcmVhc2VTY29yZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBGcnVpdEN1dHRhYmxlLlRZUEVTLmJvbWI6XG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYXRvci5kZWNyZWFzZUxpdmVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRnJ1aXRDdXR0YWJsZS5UWVBFUy5zcGVjaWFsOlxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWF0b3IuaW5jcmVhc2VTY29yZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0U3Bhd25lcnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBzcGF3bmVyczogUGhhc2VyLkdyb3VwID0gdGhpcy5ncm91cHNbJ3NwYXduZXJzJ107XG4gICAgICAgIHNwYXduZXJzLmNhbGxBbGwoXCJxdWV1ZU5leHRTcGF3blwiLCBudWxsKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU0ZYKCk6IHZvaWQge1xuICAgICAgICBDb25zdGFudHMuU0ZYX0VOQUJMRUQgPSAhQ29uc3RhbnRzLlNGWF9FTkFCTEVEO1xuICAgIH0gICAgICAgXG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLndpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBtZWRpYXRvcigpOiBHYW1lcGxheU1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lcGxheU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBTdG9yZSBmcm9tICcuLi9zdGF0ZS9TdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3N0b3JlbWVkaWF0b3InO1xuXG4gICAgcHVibGljIGdldCBwbGF5ZXJHb2xkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5jdXJyZW50UGxheWVyR29sZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXR0ZW1wdFRvU3BlbmRHb2xkKGFtb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVNb2RlbC5nb2xkU3BlbnQoYW1vdW50KSkge1xuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR09MRF9DSEFOR0VEKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9ICAgIFxuXG4gICAgcHVibGljIG5vdGlmeVVwZ3JhZGVQdXJjaGFzZWQodURhdGE6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC5hZGRVcGdyYWRlKHVEYXRhKTtcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFN0b3JlTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0b3JlKCk6IFN0b3JlIHtcbiAgICAgICAgcmV0dXJuIDxTdG9yZT50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgU3RvcmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9TdG9yZU1lZGlhdG9yJztcbmltcG9ydCBSSFVwZ3JhZGVJdGVtIGZyb20gJy4uL2Rpc3BsYXkvUkhVcGdyYWRlSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIGV4dGVuZHMgQmFzZVN0YXRlIHtcblxuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBTdG9yZU1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoU3RvcmVNZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBTdG9yZU1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcblxuICAgIHByb3RlY3RlZCBfc2V0dXBJbnB1dEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJ1dHRvbnM6IFBoYXNlci5Hcm91cCA9IHRoaXMuZ3JvdXBzWydzdG9yZV9pdGVtcyddO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB1cGdyYWRlID0gPFJIVXBncmFkZUl0ZW0+YnV0dG9ucy5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgdXBncmFkZS5vbklucHV0RG93bi5hZGQodGhpcy5vblVwZ3JhZGVQcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBxdWl0QnRuOiBQaGFzZXIuQnV0dG9uID0gPFBoYXNlci5CdXR0b24+dGhpcy5fZmluZFByZWZhYigncXVpdEJ1dHRvbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhxdWl0QnRuKTtcbiAgICAgICAgaWYgKHF1aXRCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1aXRCdG4ub25JbnB1dERvd24uYWRkT25jZSh0aGlzLl9iYWNrVG9UaXRsZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF9iYWNrVG9UaXRsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJiYWNrIHRvIG1lbnVcIik7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9NRU5VKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGdyYWRlUHJlc3NlZCh1cGdyYWRlOiBSSFVwZ3JhZGVJdGVtKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhdG9yLmF0dGVtcHRUb1NwZW5kR29sZCh1cGdyYWRlLmJhc2VDb3N0KSkge1xuICAgICAgICAgICAgdXBncmFkZS5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yLm5vdGlmeVVwZ3JhZGVQdXJjaGFzZWQodXBncmFkZS51cGdyYWRlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1cGdyYWRlLmZsYXNoQ29zdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogU3RvcmVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8U3RvcmVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vc3RhdGUvTG9naW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbk1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdsb2dpbm1lZGlhdG9yJztcblxuICAgIHB1YmxpYyBnZXQgc2F2ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLnNhdmVEYXRhO1xuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgdXBkYXRlU2F2ZURhdGEoc25hcHNob3Q6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC51cGRhdGVTYXZlRGF0YShzbmFwc2hvdCk7XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBMb2dpbk1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsb2dpbigpOiBMb2dpbiB7XG4gICAgICAgIHJldHVybiA8TG9naW4+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7VGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyc30gZnJvbSAnZGlqb24vdXRpbHMnO1xuaW1wb3J0IExvZ2luTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvTG9naW5NZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5pbXBvcnQgUGxheWVyVGV4dElucHV0IGZyb20gJy4uL2lucHV0L1BsYXllclRleHRJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByZXNldE5hbWU6IG51bWJlcjtcbiAgICBcbiAgICBwcm90ZWN0ZWQgX3RpdGxlOiBQaGFzZXIuVGV4dDtcbiAgICBwcm90ZWN0ZWQgX2JnOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJvdGVjdGVkIF9jdXJyZW50RmllbGQ6IFBsYXllclRleHRJbnB1dCA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgX2xvZ2luSW5mbzogeyBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nIH07XG4gICAgXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBMb2dpbk1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoTG9naW5NZWRpYXRvci5NRURJQVRPUl9OQU1FLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBMb2dpbk1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcbiAgICBcbiAgICBwdWJsaWMgY2xlYXJWaXN1YWxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aXRsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2JnLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5QnRuOiBSSEJ1dHRvbiA9IHRoaXMuX2ZpbmRQcmVmYWIoXCJsb2dpbkJ1dHRvblwiKTtcbiAgICAgICAgaWYgKHBsYXlCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBsYXlCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uTG9naW5QcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVtYWlsOiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdlbWFpbElucHV0Jyk7XG4gICAgICAgIGlmIChlbWFpbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZW1haWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLl9zZWxlY3RlZEZpZWxkLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGaWVsZCA9IGVtYWlsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhc3N3OiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdwYXNzd29yZElucHV0Jyk7XG4gICAgICAgIGlmIChwYXNzdyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGFzc3cuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLl9zZWxlY3RlZEZpZWxkLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkZWxrZXk6IFBoYXNlci5LZXkgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlDb2RlLkRFTEVURSk7XG4gICAgICAgIGRlbGtleS5vbkRvd24uYWRkKHRoaXMuX2RlbGV0ZUxhc3RJbnB1dCwgdGhpcyk7XG4gICAgICAgIGxldCBiY2trZXk6IFBoYXNlci5LZXkgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlDb2RlLkJBQ0tTUEFDRSk7XG4gICAgICAgIGJja2tleS5vbkRvd24uYWRkKHRoaXMuX2RlbGV0ZUxhc3RJbnB1dCwgdGhpcyk7ICAgIFxuICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkQ2FsbGJhY2tzKHRoaXMsIG51bGwsIG51bGwsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBoYW5kbGVLZXlib2FyZElucHV0KGtleTogUGhhc2VyLktleUNvZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRGaWVsZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFyYWN0ZXI6IHN0cmluZyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5sYXN0Q2hhcjtcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGaWVsZC5yZW1vdmVMYXN0Q2hhcmFjdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyICE9PSAnICcgJiYgY2hhcmFjdGVyICE9PSAnJykge1xuICAgICAgICAgICB0aGlzLl9jdXJyZW50RmllbGQudXBkYXRlTGFiZWwoY2hhcmFjdGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2RlbGV0ZUxhc3RJbnB1dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEZpZWxkLnJlbW92ZUxhc3RDaGFyYWN0ZXIoKTtcbiAgICB9ICAgIFxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRGaWVsZChpbnB1dEZpZWxkOiBQbGF5ZXJUZXh0SW5wdXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEZpZWxkID0gaW5wdXRGaWVsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkxvZ2luUHJlc3NlZCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGVtYWlsOiBQbGF5ZXJUZXh0SW5wdXQgPSB0aGlzLl9maW5kUHJlZmFiKCdlbWFpbElucHV0Jyk7XG4gICAgICAgIGxldCBwYXNzdzogUGxheWVyVGV4dElucHV0ID0gdGhpcy5fZmluZFByZWZhYigncGFzc3dvcmRJbnB1dCcpO1xuICAgICAgICBpZiAocGFzc3cgIT09IG51bGwgJiYgZW1haWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2luSW5mbyA9IHsgZW1haWw6IGVtYWlsLmlucHV0VGV4dCwgcGFzc3dvcmQ6IHBhc3N3LmlucHV0VGV4dCB9O1xuICAgICAgICAgICAgdGhpcy5hdHRlbXB0TG9naW4oKTtcbiAgICAgICAgfVxuICAgIH0gICBcblxuICAgIHB1YmxpYyBvbkxvZ2luRXJyb3IoZXJyb3I6IGFueSwgYXV0aERhdGE6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSBcImF1dGgvdXNlci1ub3QtZm91bmRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCh0aGlzLl9sb2dpbkluZm8uZW1haWwsIHRoaXMuX2xvZ2luSW5mby5wYXNzd29yZCkuY2F0Y2godGhpcy5vbkNyZWF0ZVVzZXIsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXV0aERhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbiBTdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0U3RhdGVDaGFuZ2UoQ29uc3RhbnRzLlNUQVRFX01FTlUpO1xuICAgICAgICB9XG4gICAgfSAgIFxuXG4gICAgcHVibGljIG9uQ3JlYXRlVXNlcihlcnJvcjogYW55LCB1c2VyRGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0ZW1wdExvZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZVBsYXllckRhdGEoc25hcHNob3Q6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWF0b3IudXBkYXRlU2F2ZURhdGEoc25hcHNob3QpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBsYXllck5hbWUgPSB0aGlzLl9sb2dpbkluZm8uZW1haWwucmVwbGFjZSgvQC4qLywgXCJcIik7XG4gICAgICAgICAgICBsZXQgaW5pdERhdGEgPSB0aGlzLm1lZGlhdG9yLnNhdmVEYXRhO1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZShcInBsYXllclwiKS5jaGlsZChpbml0RGF0YS5rZXkoKSkuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lLFxuICAgICAgICAgICAgICAgIHdlYWx0aDogaW5pdERhdGEud2VhbHRoLFxuICAgICAgICAgICAgICAgIGJlc3RTY29yZTogaW5pdERhdGEuYmVzdFNjb3JlLFxuICAgICAgICAgICAgICAgIGxhc3RTY29yZTogaW5pdERhdGEubGFzdFNjb3JlLFxuICAgICAgICAgICAgICAgIHVwZ3JhZGVzOiBpbml0RGF0YS51cGdyYWRlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhdHRlbXB0TG9naW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcikge1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsb2dpbkF0dGVtcHQ6IGFueSA9IHRoaXMuZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKHRoaXMuX2xvZ2luSW5mby5lbWFpbCwgdGhpcy5fbG9naW5JbmZvLnBhc3N3b3JkKTtcbiAgICAgICAgbG9naW5BdHRlbXB0LmNhdGNoKHRoaXMub25Mb2dpbkVycm9yLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b2dnbGVTRlgoKTogdm9pZCB7XG4gICAgICAgIENvbnN0YW50cy5TRlhfRU5BQkxFRCA9ICFDb25zdGFudHMuU0ZYX0VOQUJMRUQ7XG4gICAgfSAgICAgICBcblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IExvZ2luTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPExvZ2luTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICAiLCJpbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCBSSEdhbWUgZnJvbSBcIi4vUkhHYW1lXCI7XG5pbXBvcnQge0RldmljZX0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0NvcHlNb2RlbH0gZnJvbSBcImRpam9uL212Y1wiO1xuXG5pbXBvcnQgQXBwbGljYXRpb25NZWRpYXRvciBmcm9tIFwiLi9tZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vdXRpbHMvTm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGUvQm9vdFwiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGUvUHJlbG9hZFwiO1xuaW1wb3J0IE1lbnUgZnJvbSBcIi4vc3RhdGUvTWVudVwiO1xuaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vc3RhdGUvR2FtZXBsYXknO1xuaW1wb3J0IFN0b3JlIGZyb20gJy4vc3RhdGUvU3RvcmUnO1xuaW1wb3J0IExvZ2luIGZyb20gJy4vc3RhdGUvTG9naW4nO1xuaW1wb3J0IHsgR2FtZU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgUHJlZmFiQnVpbGRlciBmcm9tICcuL3V0aWxzL1ByZWZhYkJ1aWxkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2lsZXJwbGF0ZUFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuICAgIHB1YmxpYyBnYW1lSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGVzXG4gICAgcHVibGljIGNyZWF0ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBSSEdhbWUoe1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuX2dldEdhbWVXaWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9nZXRHYW1lSGVpZ2h0KCksXG4gICAgICAgICAgICBwYXJlbnQ6ICdnYW1lLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAvL3JlbmRlcmVyOiBQaGFzZXIuQ0FOVkFTLFxuICAgICAgICAgICAgcmVuZGVyZXI6IFBoYXNlci5BVVRPLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gdXNlIHRoaXMgaWYgeW91IHdhbnQgdG8gc3dpdGNoIGJldHdlZW4gQDJ4IGFuZCBAMXggZ3JhcGhpY3NcbiAgICAgICAgICAgIHJlc29sdXRpb246IHRoaXMuX2dldFJlc29sdXRpb24oKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBBcHBsaWNhdGlvbk1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRTdGF0ZXMoKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBzdGFydEdhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChDb25zdGFudHMuU1RBVEVfQk9PVCk7XG4gICAgfVxuXG4gICAgcHVibGljIGJvb3RDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3RTY2FsZVNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuYWRqdXN0UmVuZGVyZXJTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLmFkZFBsdWdpbnMoKTtcbiAgICAgICAgUHJlZmFiQnVpbGRlci5nYW1lID0gdGhpcy5nYW1lO1xuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgYWRqdXN0U2NhbGVTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zZXRNaW5NYXgoMjU2LCAxOTIsIDEwMjQsIDc2OCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGp1c3RSZW5kZXJlclNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWUuZm9yY2VTaW5nbGVVcGRhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLnJvdW5kUHggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lLmFudGlhbGlhcyA9IHRydWU7XG4gICAgLy8gICAgdGhpcy5nYW1lLnJlbmRlcmVyLmNsZWFyQmVmb3JlUmVuZGVyID0gdGhpcy5nYW1lLnJlbmRlclR5cGUgPT09IFBoYXNlci5DQU5WQVM7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGZyb20gdGhlIGJvb3Qgc3RhdGUgYXMgd2UgY2FuJ3QgaW5pdGlhbGl6ZSBwbHVnaW5zIHVudGlsIHRoZSBnYW1lIGlzIGJvb3RlZFxuICAgIHB1YmxpYyByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVsID0gbmV3IEdhbWVNb2RlbCgnZ2FtZV9kYXRhJyk7XG4gICAgICAgIGNvbnN0IGNvcHlNb2RlbCA9IG5ldyBDb3B5TW9kZWwoJ2NvcHknKTtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwucG9zdEJvb3RMb2FkKCk7XG4gICAgfVxuICAgIFxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIC8vIGFkZHMgc3RhdGVzXG4gICAgcHJpdmF0ZSBfYWRkU3RhdGVzKCkge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9CT09ULCBCb290KTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfUFJFTE9BRCwgUHJlbG9hZCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX01FTlUsIE1lbnUpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9HQU1FLCBHYW1lcGxheSk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX1NUT1JFLCBTdG9yZSk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX0xPR0lOLCBMb2dpbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0R2FtZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHYW1lSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVzb2x1dGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAoQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSAmJiAhaXNOYU4oQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEZXZpY2UubW9iaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChEZXZpY2UucGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZW5kZXJlckJ5RGV2aWNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBEZXZpY2UubW9iaWxlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDwgMiA/IFBoYXNlci5DQU5WQVMgOiBQaGFzZXIuQVVUTztcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBtZWRpYXRvcigpOiBBcHBsaWNhdGlvbk1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxBcHBsaWNhdGlvbk1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+dGhpcy5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3N1Ym1vZHVsZXMvZGlqb24vYnVpbGQvZGlqb24uZC50c1wiLz4gXG5pbXBvcnQgQm9pbGVyUGxhdGVBcHBsaWNhdGlvbiBmcm9tICcuL0JvaWxlclBsYXRlQXBwbGljYXRpb24nO1xuXG4vLyBib290c3RyYXAgdGhlIGFwcFxuZXhwb3J0IGNvbnN0IGFwcCA9IG5ldyBCb2lsZXJQbGF0ZUFwcGxpY2F0aW9uKCk7IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBIVURHb2xkIGZyb20gJy4uL2dhbWVwbGF5L0hVREdvbGQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVURHb2xkTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2h1ZGdvbGRtZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5HT0xEX0NIQU5HRURcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkdPTERfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICB0aGlzLmdvbGQudXBkYXRlR29sZERpc3BsYXkodGhpcy5nYW1lTW9kZWwuY3VycmVudFBsYXllckdvbGQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEhVREdvbGRNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZ29sZCgpOiBIVURHb2xkIHtcbiAgICAgICAgcmV0dXJuIDxIVURHb2xkPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFRleHQgZnJvbSAnLi4vZGlzcGxheS9SSFRleHQnO1xuaW1wb3J0IEhVREdvbGRNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9IVURHb2xkTWVkaWF0b3InO1xuaW1wb3J0IHsgSVRleHREYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVREdvbGQgZXh0ZW5kcyBSSFRleHQge1xuXG4gICAgcHJvdGVjdGVkIF9tZWRpYXRvcjogSFVER29sZE1lZGlhdG9yO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVRleHREYXRhKSB7IFxuICAgICAgICBzdXBlcihuYW1lLCBwb3NpdGlvbiwgZGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gPEhVREdvbGRNZWRpYXRvcj5IVURHb2xkTWVkaWF0b3IucmV0cmlldmVNZWRpYXRvcihIVURHb2xkTWVkaWF0b3IuTUVESUFUT1JfTkFNRSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tZWRpYXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgSFVER29sZE1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIHB1YmxpYyB1cGRhdGVHb2xkRGlzcGxheShuZXdBbW91bnQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRleHQgPSBuZXdBbW91bnQ7XG4gICAgfVxufSIsImltcG9ydCB7R3JvdXAsIFRleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtJUHJlbG9hZEhhbmRsZXJ9IGZyb20gJ2Rpam9uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkZXIgZXh0ZW5kcyBHcm91cCBpbXBsZW1lbnRzIElQcmVsb2FkSGFuZGxlciB7XG4gICAgc3RhdGljIFRFU1Q6IG51bWJlciA9IDE7XG4gICAgc3RhdGljIFRFU1RfMjogbnVtYmVyID0gMjtcblxuICAgIHByaXZhdGUgX3dpcGVyOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJpdmF0ZSBfbG9hZFRleHQ6IFRleHQ7XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluQ29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0Q29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuXG4gICAgcHJpdmF0ZSBfaW5Ud2VlbjogUGhhc2VyLlR3ZWVuO1xuICAgIHByaXZhdGUgX291dFR3ZWVuOiBQaGFzZXIuVHdlZW47XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIG5hbWUsIHRydWUpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xuICAgIH1cblxuICAgIC8vIEdyb3VwIG92ZXJyaWRlc1xuICAgIHByb3RlY3RlZCBidWlsZEludGVyZmFjZSgpIHtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQgPSB0aGlzLmFkZEludGVybmFsLmRUZXh0KDUwLCA1MCwgJ0xvYWRpbmcgLi4uICcsICdBcmlhbCcsIDM2LCAnI0ZGRkZGRicpO1xuXG4gICAgICAgIGxldCBnZnggPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoMHgwMDAwMDAsIDEpO1xuICAgICAgICBnZnguZHJhd1JlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgZ2Z4LmVuZEZpbGwoKTtcblxuICAgICAgICB0aGlzLl93aXBlciA9IHRoaXMuYWRkSW50ZXJuYWwuaW1hZ2UoMCwgMCwgZ2Z4LmdlbmVyYXRlVGV4dHVyZSgpKTtcblxuICAgICAgICB0aGlzLmdhbWUud29ybGQucmVtb3ZlKGdmeCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2luVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDEgfSwgMzAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQpO1xuICAgICAgICB0aGlzLl9vdXRUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oeyBhbHBoYTogMCB9LCAyMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluKTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4ub25Db21wbGV0ZS5hZGQodGhpcy5fb3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBpUHJlbG9hZEhhbmRsZXIgaW1wbGVtZW50YXRpb25zXG4gICAgcHVibGljIGxvYWRTdGFydCgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgcm91bmRlZFByb2dyZXNzID0gTWF0aC5yb3VuZChwcm9ncmVzcykudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQuc2V0VGV4dCgnTG9hZGluZyAuLi4gJyArIHJvdW5kZWRQcm9ncmVzcyArICclJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pblR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25PdXQoKSB7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gICAgcHJvdGVjdGVkIF9pbigpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSW5Db21wbGV0ZS5kaXNwYXRjaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb3V0KCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uT3V0Q29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG59Il19
