var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("model/GameModel", ['dijon/mvc'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mvc_1;
    var GameModel;
    return {
        setters:[
            function (mvc_1_1) {
                mvc_1 = mvc_1_1;
            }],
        execute: function() {
            GameModel = (function (_super) {
                __extends(GameModel, _super);
                function GameModel() {
                    _super.apply(this, arguments);
                }
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
            exports_1("GameModel", GameModel);
        }
    }
});
System.register("mediator/BaseMediator", ["dijon/mvc", "dijon/application", "model/GameModel"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
            exports_2("default", BaseMediator);
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
                Constants.FONT_KOMIKAX = 'komikax';
                Constants.FONT_RALEWAY = 'raleway';
                Constants.STR_BLUE = '#0099e6';
                Constants.STR_NEW_TITLE = '#ffffff';
                Constants.STR_BTN_HOVER = '#ccffcc';
                Constants.STR_BTN_NORMAL = '#666699';
                Constants.NUM_ORANGE_BORDER = 0xffb866;
                Constants.NUM_ORANGE_BOX = 0xe67a00;
                Constants.BUTTON_NORMAL = 0xe6e6e6;
                Constants.BUTTON_HOVER = 0xff941a;
                Constants.BUTTON_DOWN = 0x00aaff;
                Constants.SFX_ENABLED = true;
                return Constants;
            }());
            exports_3("default", Constants);
        }
    }
});
System.register("utils/Notifications", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
                Notifications.GAME_LEVEL_FAILED = 'gamelevelfailed';
                Notifications.ADD_TO_SCORE = 'addtoscore';
                return Notifications;
            }());
            exports_4("default", Notifications);
        }
    }
});
System.register("mediator/ApplicationMediator", ["dijon/utils", "mediator/BaseMediator", "utils/Constants", "utils/Notifications"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var utils_1, BaseMediator_1, Constants_1, Notifications_1;
    var ApplicationMediator;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (BaseMediator_1_1) {
                BaseMediator_1 = BaseMediator_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
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
                        case Notifications_1.default.PRELOAD_COMPLETE:
                            this.viewComponent.preloadComplete();
                            break;
                        case Notifications_1.default.BOOT_COMPLETE:
                            utils_1.Logger.log(this, 'Notifications.BOOT_COMPLETE');
                            this.game.asset.setData(this.game.cache.getJSON('assets'));
                            this.viewComponent.registerModels();
                            this.game.transition.to(Constants_1.default.STATE_PRELOAD);
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
            exports_5("default", ApplicationMediator);
        }
    }
});
System.register("utils/Interfaces", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("display/RHPrefab", ['dijon/display'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
                    if (data.prop.scale) {
                        this.scale.setTo(data.prop.scale.x, data.prop.scale.y);
                    }
                    if (data.prop.angle) {
                        this.angle = data.prop.angle;
                    }
                }
                return RHPrefab;
            }(display_1.Sprite));
            exports_7("default", RHPrefab);
        }
    }
});
System.register("display/RHText", ['dijon/display'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("default", Prefab);
        }
    }
});
System.register("display/RHButton", ['dijon/application', 'dijon/display'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
            exports_9("default", RHButton);
        }
    }
});
System.register("mediator/FruitLifeMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
                        Notifications_2.default.LIFE_LOST
                    ];
                };
                FruitLifeMediator.prototype.handleNotification = function (notification) {
                    switch (notification.getName()) {
                        case Notifications_2.default.LIFE_LOST:
                            this.lives.decreaseLives();
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
            exports_10("default", FruitLifeMediator);
        }
    }
});
System.register("gameplay/FruitLife", ["display/RHPrefab", "mediator/FruitLifeMediator", 'dijon/display'], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
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
                    this._lifeCount = data.prop['lives'];
                    this._livesRemaining = this._lifeCount;
                    this._lifeVisuals = [];
                    for (var i = 0; i < this._lifeCount; i++) {
                        var nextLife = new RHPrefab_1.default(name + '_life_' + i, { x: position.x + (data.prop['spacing'] * i), y: position.y }, data);
                        this.addChild(nextLife);
                        this._lifeVisuals.push(nextLife);
                    }
                }
                FruitLife.prototype.decreaseLives = function () {
                    this._livesRemaining--;
                    if (this._livesRemaining === 0) {
                        this.mediator.notifyGameOver();
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
            exports_11("default", FruitLife);
        }
    }
});
System.register("mediator/FruitScoreMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
            exports_12("default", FruitScoreMediator);
        }
    }
});
System.register("gameplay/FruitScore", ["display/RHText", "mediator/FruitScoreMediator"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
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
                    this.text = 'Fruits: ' + this._score.toString();
                };
                return FruitScore;
            }(RHText_1.default));
            exports_13("default", FruitScore);
        }
    }
});
System.register("gameplay/FruitCuttable", ["display/RHPrefab"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
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
                    this.body.gravity.y = 1000;
                }
                FruitCuttable.prototype.setSpawnVelocity = function (newX, newY) {
                    this._velocity.x = newX;
                    this._velocity.y = -newY;
                };
                FruitCuttable.prototype.reset = function (newX, newY) {
                    _super.prototype.reset.call(this, newX, newY);
                    this.body.velocity.y = this._velocity.y;
                    this.body.velocity.x = this._velocity.x;
                    return this;
                };
                FruitCuttable.prototype.cutObject = function () {
                    var emitter = this.game.add.emitter(this.x, this.y);
                    emitter.makeParticles(this.key, 'particle');
                    emitter.minParticleSpeed.setTo(-200, -200);
                    emitter.maxParticleSpeed.setTo(200, 200);
                    emitter.gravity = 0;
                    emitter.start(true, 700, null, 500);
                };
                FruitCuttable.TYPES = {
                    bomb: "bomb",
                    fruit: "fruit",
                    special: "special"
                };
                return FruitCuttable;
            }(RHPrefab_2.default));
            exports_14("default", FruitCuttable);
        }
    }
});
System.register("gameplay/Spawner", ['dijon/display', "gameplay/FruitCuttable"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
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
            exports_15("default", Spawner);
        }
    }
});
System.register("utils/PrefabBuilder", ['dijon/display', "display/RHPrefab", "display/RHText", "display/RHButton", "gameplay/FruitLife", "gameplay/FruitScore", "gameplay/Spawner"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var display_6, RHPrefab_3, RHText_2, RHButton_1, FruitLife_1, FruitScore_1, Spawner_1;
    var PrefabBuilder;
    return {
        setters:[
            function (display_6_1) {
                display_6 = display_6_1;
            },
            function (RHPrefab_3_1) {
                RHPrefab_3 = RHPrefab_3_1;
            },
            function (RHText_2_1) {
                RHText_2 = RHText_2_1;
            },
            function (RHButton_1_1) {
                RHButton_1 = RHButton_1_1;
            },
            function (FruitLife_1_1) {
                FruitLife_1 = FruitLife_1_1;
            },
            function (FruitScore_1_1) {
                FruitScore_1 = FruitScore_1_1;
            },
            function (Spawner_1_1) {
                Spawner_1 = Spawner_1_1;
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
                    var root = new display_6.Group(0, 0, 'root');
                    if (data !== null) {
                        groups['basic'] = new display_6.Group(0, 0, groupName);
                        data.groups.forEach(function (groupName) {
                            groups[groupName] = new display_6.Group(0, 0, groupName);
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
                    button: RHButton_1.default,
                    lives: FruitLife_1.default,
                    score: FruitScore_1.default,
                    spawner: Spawner_1.default
                };
                PrefabBuilder.game = null;
                return PrefabBuilder;
            }());
            exports_16("default", PrefabBuilder);
        }
    }
});
System.register("state/BaseState", ["dijon/core", "utils/PrefabBuilder"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_1, PrefabBuilder_1;
    var BaseState;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                return BaseState;
            }(core_1.State));
            exports_17("default", BaseState);
        }
    }
});
System.register("mediator/BootMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
            exports_18("default", BootMediator);
        }
    }
});
System.register("state/Boot", ["state/BaseState", "mediator/BootMediator"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
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
            exports_19("default", Boot);
        }
    }
});
System.register("mediator/PreloadMediator", ["utils/Constants", "mediator/BaseMediator", "utils/Notifications"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var Constants_2, BaseMediator_5, Notifications_5;
    var PreloadMediator;
    return {
        setters:[
            function (Constants_2_1) {
                Constants_2 = Constants_2_1;
            },
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
                PreloadMediator.prototype.next = function () {
                    this.requestStateChange(Constants_2.default.STATE_MENU);
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
            exports_20("default", PreloadMediator);
        }
    }
});
System.register("state/Preload", ["state/BaseState", "mediator/PreloadMediator"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var BaseState_2, PreloadMediator_1;
    var Preload;
    return {
        setters:[
            function (BaseState_2_1) {
                BaseState_2 = BaseState_2_1;
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
                    this.mediator.next();
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
            exports_21("default", Preload);
        }
    }
});
System.register("mediator/MenuMediator", ["mediator/BaseMediator"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
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
            exports_22("default", MenuMediator);
        }
    }
});
System.register("state/Menu", ["state/BaseState", "utils/Constants", "mediator/MenuMediator"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var BaseState_3, Constants_3, MenuMediator_1;
    var Menu;
    return {
        setters:[
            function (BaseState_3_1) {
                BaseState_3 = BaseState_3_1;
            },
            function (Constants_3_1) {
                Constants_3 = Constants_3_1;
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
                    this._mediator = new MenuMediator_1.default();
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
                Menu.prototype._addVisuals = function () {
                    this._title = this.game.add.dText(this.realWidth * 0.5, this.realHeight * 0.1, 'FRUIT NINJA', Constants_3.default.FONT_RALEWAY, 30, Constants_3.default.STR_BLUE);
                    this._title.centerPivot();
                };
                Menu.prototype._onPlayPressed = function () {
                    this.mediator.requestStateChange(Constants_3.default.STATE_GAME);
                };
                Menu.prototype._onStorePressed = function () {
                    this.mediator.requestStateChange(Constants_3.default.STATE_STORE);
                };
                Menu.prototype._toggleSFX = function () {
                    Constants_3.default.SFX_ENABLED = !Constants_3.default.SFX_ENABLED;
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
            exports_23("default", Menu);
        }
    }
});
System.register("mediator/GameplayMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var BaseMediator_7, Notifications_6;
    var GameplayMediator;
    return {
        setters:[
            function (BaseMediator_7_1) {
                BaseMediator_7 = BaseMediator_7_1;
            },
            function (Notifications_6_1) {
                Notifications_6 = Notifications_6_1;
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
            exports_24("default", GameplayMediator);
        }
    }
});
System.register("gameplay/FruitCut", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
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
            exports_25("default", FruitCut);
        }
    }
});
System.register("state/Gameplay", ["state/BaseState", "utils/Constants", "mediator/GameplayMediator", "gameplay/FruitCut"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var BaseState_4, Constants_4, GameplayMediator_1, FruitCut_1;
    var Gameplay;
    return {
        setters:[
            function (BaseState_4_1) {
                BaseState_4 = BaseState_4_1;
            },
            function (Constants_4_1) {
                Constants_4 = Constants_4_1;
            },
            function (GameplayMediator_1_1) {
                GameplayMediator_1 = GameplayMediator_1_1;
            },
            function (FruitCut_1_1) {
                FruitCut_1 = FruitCut_1_1;
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
                        this._initCutStatics,
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
                Gameplay.prototype._initCutStatics = function () {
                    FruitCut_1.default.COLOR = 0xff0000;
                    FruitCut_1.default.WIDTH = 5;
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
                        var cut = this._drawCut(this._startSwipePt.x, this._startSwipePt.y, pointer.x, pointer.y);
                        var cuttables = this.groups["cuttables"];
                        if (cuttables === null) {
                            return;
                        }
                        cuttables.forEachAlive(this._checkCollisions, this, cut);
                    }
                };
                Gameplay.prototype._drawCut = function (x, y, endX, endY) {
                    var cut = new FruitCut_1.default(this.game);
                    this.groups["cuts"].addChild(cut);
                    cut.drawCut(x, y, endX, endY);
                    return cut;
                };
                Gameplay.prototype._checkCollisions = function (cuttable, cut) {
                    if (cuttable.body.overlaps(cut)) {
                        cuttable.cutObject();
                    }
                };
                Gameplay.prototype._startSpawners = function () {
                    var normal = this._findPrefab("fruitSpawner");
                    if (normal === null) {
                        return;
                    }
                    normal.queueNextSpawn();
                };
                Gameplay.prototype._toggleSFX = function () {
                    Constants_4.default.SFX_ENABLED = !Constants_4.default.SFX_ENABLED;
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
            exports_26("default", Gameplay);
        }
    }
});
System.register("mediator/StoreMediator", ["mediator/BaseMediator"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var BaseMediator_8;
    var StoreMediator;
    return {
        setters:[
            function (BaseMediator_8_1) {
                BaseMediator_8 = BaseMediator_8_1;
            }],
        execute: function() {
            StoreMediator = (function (_super) {
                __extends(StoreMediator, _super);
                function StoreMediator() {
                    _super.apply(this, arguments);
                }
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
            exports_27("default", StoreMediator);
        }
    }
});
System.register("state/Store", ["state/BaseState", "mediator/StoreMediator"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var BaseState_5, StoreMediator_1;
    var Store;
    return {
        setters:[
            function (BaseState_5_1) {
                BaseState_5 = BaseState_5_1;
            },
            function (StoreMediator_1_1) {
                StoreMediator_1 = StoreMediator_1_1;
            }],
        execute: function() {
            Store = (function (_super) {
                __extends(Store, _super);
                function Store() {
                    _super.apply(this, arguments);
                }
                Store.prototype.init = function (levelData) {
                    _super.prototype.init.call(this, levelData);
                    this._mediator = new StoreMediator_1.default();
                };
                Store.prototype.preload = function () {
                    this.game.asset.loadAssets('required');
                };
                Store.prototype.listBuildSequence = function () {
                    return [];
                };
                Store.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
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
            exports_28("default", Store);
        }
    }
});
System.register("BoilerplateApplication", ["dijon/application", "dijon/core", "dijon/utils", "dijon/mvc", "mediator/ApplicationMediator", "utils/Constants", "state/Boot", "state/Preload", "state/Menu", "state/Gameplay", "state/Store", "model/GameModel", "utils/PrefabBuilder"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var application_3, core_2, utils_2, mvc_3, ApplicationMediator_1, Constants_5, Boot_1, Preload_1, Menu_1, Gameplay_1, Store_1, GameModel_2, PrefabBuilder_2;
    var BoilerplateApplication;
    return {
        setters:[
            function (application_3_1) {
                application_3 = application_3_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
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
            function (Constants_5_1) {
                Constants_5 = Constants_5_1;
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
                    this.game = new core_2.Game({
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
                    this.game.state.start(Constants_5.default.STATE_BOOT);
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
                };
                BoilerplateApplication.prototype.preloadComplete = function () {
                };
                BoilerplateApplication.prototype._addStates = function () {
                    this.game.state.add(Constants_5.default.STATE_BOOT, Boot_1.default);
                    this.game.state.add(Constants_5.default.STATE_PRELOAD, Preload_1.default);
                    this.game.state.add(Constants_5.default.STATE_MENU, Menu_1.default);
                    this.game.state.add(Constants_5.default.STATE_GAME, Gameplay_1.default);
                    this.game.state.add(Constants_5.default.STATE_STORE, Store_1.default);
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
            exports_29("default", BoilerplateApplication);
        }
    }
});
System.register("bootstrap", ["BoilerplateApplication"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var BoilerPlateApplication_1;
    var app;
    return {
        setters:[
            function (BoilerPlateApplication_1_1) {
                BoilerPlateApplication_1 = BoilerPlateApplication_1_1;
            }],
        execute: function() {
            exports_30("app", app = new BoilerPlateApplication_1.default());
        }
    }
});
System.register("ui/Preloader", ['dijon/display'], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var display_7;
    var Preloader;
    return {
        setters:[
            function (display_7_1) {
                display_7 = display_7_1;
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
            }(display_7.Group));
            exports_31("default", Preloader);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwiZGlzcGxheS9SSFByZWZhYi50cyIsImRpc3BsYXkvUkhUZXh0LnRzIiwiZGlzcGxheS9SSEJ1dHRvbi50cyIsIm1lZGlhdG9yL0ZydWl0TGlmZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRMaWZlLnRzIiwibWVkaWF0b3IvRnJ1aXRTY29yZU1lZGlhdG9yLnRzIiwiZ2FtZXBsYXkvRnJ1aXRTY29yZS50cyIsImdhbWVwbGF5L0ZydWl0Q3V0dGFibGUudHMiLCJnYW1lcGxheS9TcGF3bmVyLnRzIiwidXRpbHMvUHJlZmFiQnVpbGRlci50cyIsInN0YXRlL0Jhc2VTdGF0ZS50cyIsIm1lZGlhdG9yL0Jvb3RNZWRpYXRvci50cyIsInN0YXRlL0Jvb3QudHMiLCJtZWRpYXRvci9QcmVsb2FkTWVkaWF0b3IudHMiLCJzdGF0ZS9QcmVsb2FkLnRzIiwibWVkaWF0b3IvTWVudU1lZGlhdG9yLnRzIiwic3RhdGUvTWVudS50cyIsIm1lZGlhdG9yL0dhbWVwbGF5TWVkaWF0b3IudHMiLCJnYW1lcGxheS9GcnVpdEN1dC50cyIsInN0YXRlL0dhbWVwbGF5LnRzIiwibWVkaWF0b3IvU3RvcmVNZWRpYXRvci50cyIsInN0YXRlL1N0b3JlLnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsInVpL1ByZWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7Z0JBQStCLDZCQUFLO2dCQUFwQztvQkFBK0IsOEJBQUs7Z0JBVXBDLENBQUM7Z0JBUEcsc0JBQVcsMkJBQUk7eUJBQWY7d0JBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7b0JBQ2hDLENB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dUJBQUcsR0FBYjtvQkFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRVMsd0JBQUksR0FBZDtvQkFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxDQUFDO2dCQXRFTSxjQUFJLEdBQVcsQ0FBQyxDQUFDO2dCQUNqQixnQkFBTSxHQUFXLENBQUMsQ0FBQztnQkFzRTlCLGdCQUFDO1lBQUQsQ0F4RUEsQUF3RUMsQ0F4RXNDLGVBQUssR0F3RTNDO1lBeEVELGdDQXdFQyxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWx9IGZyb20gJ2Rpam9uL212Yyc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgcHVibGljIHN0YXRpYyBNT0RFTF9OQU1FOiBzdHJpbmcgPSBcImdhbWVNb2RlbFwiO1xuXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBHYW1lTW9kZWwuTU9ERUxfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGV2ZWxEYXRhKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xuICAgIH1cbn0iLCJpbXBvcnQge01lZGlhdG9yLCBDb3B5TW9kZWx9IGZyb20gXCJkaWpvbi9tdmNcIjtcbmltcG9ydCB7QXBwbGljYXRpb259IGZyb20gXCJkaWpvbi9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuLi9tb2RlbC9HYW1lTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU1lZGlhdG9yIGV4dGVuZHMgTWVkaWF0b3Ige1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gc28gYW55IG1lZGlhdG9yIGV4dGVuZGluZyBCYXNlTWVkaWF0b3IgY2FuIGdldCBjb3B5XG4gICAgcHVibGljIGdldENvcHkoZ3JvdXBJZDogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlNb2RlbC5nZXRDb3B5KGdyb3VwSWQsIHRleHRJZCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgLy8gb2ZmZXIgYWNjZXNzIHRvIHRoZSBHYW1lTW9kZWwgYW5kIENvcHlNb2RlbCBmcm9tIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yXG4gICAgcHVibGljIGdldCBnYW1lTW9kZWwoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lTW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvcHlNb2RlbCgpOiBDb3B5TW9kZWwge1xuICAgICAgICByZXR1cm4gPENvcHlNb2RlbD5BcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTW9kZWwoQ29weU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1ZXN0U3RhdGVDaGFuZ2UobmV3U3RhdGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhuZXdTdGF0ZSwgdGhpcy5nYW1lTW9kZWwuZ2V0TGV2ZWxEYXRhKG5ld1N0YXRlKSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgbGV2ZWxEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcImJhc2VNZWRpYXRvcl9cIiArIHRoaXMuZ2FtZS5ybmQudXVpZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmV0cmlldmVNZWRpYXRvcihuYW1lOiBzdHJpbmcsIHZpZXdDb21wOiBhbnkpOiBNZWRpYXRvciB7XG4gICAgICAgIGxldCBtZWRpYXRvcjogTWVkaWF0b3IgPSBBcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTWVkaWF0b3IobmFtZSk7XG4gICAgICAgIGlmIChtZWRpYXRvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbWVkaWF0b3Iudmlld0NvbXBvbmVudCA9IHZpZXdDb21wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZWRpYXRvcjtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRzIHtcbiAgICAvLyBOT1RFOiBUaGVzZSBzdHJpbmcgdmFsdWVzIHNob3VsZCBtYXRjaCBcbiAgICAvLyBleGFjbHR5IHRvIHRoZSBuYW1lIG9mIHRoZSBkYXRhIGZpbGUgZm9yIHRoYXQgc3RhdGVzIGNyZWF0aW9uLlxuICAgIHN0YXRpYyBTVEFURV9CT09UOiBzdHJpbmcgPSAnYm9vdCc7XG4gICAgc3RhdGljIFNUQVRFX1BSRUxPQUQ6IHN0cmluZyA9ICdwcmVsb2FkJztcbiAgICBzdGF0aWMgU1RBVEVfTUVOVTogc3RyaW5nID0gJ21lbnUnO1xuICAgIHN0YXRpYyBTVEFURV9HQU1FOiBzdHJpbmcgPSAnZ2FtZXBsYXknO1xuICAgIHN0YXRpYyBTVEFURV9TVE9SRTogc3RyaW5nID0gJ3N0b3JlJztcbiAgICAvLyBmb250c1xuICAgIHN0YXRpYyBGT05UX0tPTUlLQVg6IHN0cmluZyA9ICdrb21pa2F4JztcbiAgICBzdGF0aWMgRk9OVF9SQUxFV0FZOiBzdHJpbmcgPSAncmFsZXdheSc7XG5cbiAgICBzdGF0aWMgU1RSX0JMVUU6IHN0cmluZyA9ICcjMDA5OWU2JztcbiAgICBzdGF0aWMgU1RSX05FV19USVRMRTogc3RyaW5nID0gJyNmZmZmZmYnO1xuICAgIHN0YXRpYyBTVFJfQlROX0hPVkVSOiBzdHJpbmcgPSAnI2NjZmZjYyc7XG4gICAgc3RhdGljIFNUUl9CVE5fTk9STUFMOiBzdHJpbmcgPSAnIzY2NjY5OSc7XG5cbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1JERVI6IG51bWJlciA9IDB4ZmZiODY2O1xuICAgIHN0YXRpYyBOVU1fT1JBTkdFX0JPWDogbnVtYmVyID0gMHhlNjdhMDA7XG5cbiAgICBzdGF0aWMgQlVUVE9OX05PUk1BTDogbnVtYmVyID0gMHhlNmU2ZTY7XG4gICAgc3RhdGljIEJVVFRPTl9IT1ZFUjogbnVtYmVyID0gMHhmZjk0MWE7XG4gICAgc3RhdGljIEJVVFRPTl9ET1dOOiBudW1iZXIgPSAweDAwYWFmZjtcblxuICAgIHN0YXRpYyBTRlhfRU5BQkxFRDogYm9vbGVhbiA9IHRydWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9ucyB7XG4gICAgc3RhdGljIEJPT1RfSU5JVDogc3RyaW5nID0gJ2Jvb3RJbml0JztcbiAgICBzdGF0aWMgQk9PVF9DT01QTEVURTogc3RyaW5nID0gJ2Jvb3RDb21wbGV0ZSc7XG4gICAgc3RhdGljIFBSRUxPQURfQ09NUExFVEU6IHN0cmluZyA9ICdwcmVsb2FkQ29tcGxldGUnO1xuXG4gICAgc3RhdGljIExJRkVfTE9TVDogc3RyaW5nID0gJ2xpZmVsb3N0JztcbiAgICBzdGF0aWMgR0FNRV9MRVZFTF9GQUlMRUQ6IHN0cmluZyA9ICdnYW1lbGV2ZWxmYWlsZWQnO1xuICAgIHN0YXRpYyBBRERfVE9fU0NPUkU6IHN0cmluZyA9ICdhZGR0b3Njb3JlJztcbn0iLCJpbXBvcnQge0xvZ2dlcn0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi4vQm9pbGVycGxhdGVBcHBsaWNhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ0FwcGxpY2F0aW9uTWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQk9PVF9JTklULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQ6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0lOSVQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYm9vdENvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFOlxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5wcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LnNldERhdGEodGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2Fzc2V0cycpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQucmVnaXN0ZXJNb2RlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhDb25zdGFudHMuU1RBVEVfUFJFTE9BRCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IHZpZXdDb21wb25lbnQoKTogQm9pbGVycGxhdGVBcHBsaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiA8Qm9pbGVycGxhdGVBcHBsaWNhdGlvbj50aGlzLl92aWV3Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbk1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkhQcmVmYWIgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSVByZWZhYkRhdGEpIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgZGF0YS5wcm9wLmtleSwgZGF0YS5wcm9wLmZyYW1lKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKGRhdGEucHJvcC5hbmNob3IpIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKGRhdGEucHJvcC5hbmNob3IueCwgZGF0YS5wcm9wLmFuY2hvci55KTtcbiAgICAgICAgfSAgIFxuICAgICAgICBpZiAoZGF0YS5wcm9wLnNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLnNjYWxlLnNldFRvKGRhdGEucHJvcC5zY2FsZS54LCBkYXRhLnByb3Auc2NhbGUueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC5hbmdsZSkge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGRhdGEucHJvcC5hbmdsZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBUZXh0IH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQgeyBJVGV4dERhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFiIGV4dGVuZHMgVGV4dCB7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJVGV4dERhdGEpIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBkYXRhLnByb3AuY29weSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mb250TmFtZSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mb250U2l6ZSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mb250Q29sb3VyLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmFsaWduID8gZGF0YS5wcm9wLmFsaWduIDogJ2NlbnRlcicsXG4gICAgICAgICAgICBkYXRhLnByb3Aud3JhcFdpZHRoICE9PSB1bmRlZmluZWQsXG4gICAgICAgICAgICBkYXRhLnByb3Aud3JhcFdpZHRoID8gZGF0YS5wcm9wLndyYXBXaWR0aCA6IDApO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oZGF0YS5wcm9wLmFuY2hvci54LCBkYXRhLnByb3AuYW5jaG9yLnkpO1xuICAgICAgICB9ICAgXG4gICAgICAgIGlmIChkYXRhLnByb3Auc2hhZG93KSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoYWRvdyhkYXRhLnByb3Auc2hhZG93LngsIGRhdGEucHJvcC5zaGFkb3cueSwgZGF0YS5wcm9wLnNoYWRvdy5jb2xvdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xuICAgICAgICB0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XG4gICAgfVxufSIsImltcG9ydCB7QXBwbGljYXRpb259IGZyb20gJ2Rpam9uL2FwcGxpY2F0aW9uJ1xuaW1wb3J0IHtHYW1lfSBmcm9tICdkaWpvbi9jb3JlJztcbmltcG9ydCB7IFRleHQgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7IElCdXR0b25EYXRhLCBJVGV4dENvbXBvbmVudERhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkhCdXR0b24gZXh0ZW5kcyBQaGFzZXIuQnV0dG9uIHtcbiAgICBwcml2YXRlIF9kaXNhYmxlZEZyYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZW5hYmxlZEZyYW1lOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9ub3JtYWxDb3B5Q29sb3VyOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaG92ZXJDb3B5Q29sb3VyOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9sYWJlbDogVGV4dDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElCdXR0b25EYXRhKSB7XG4gICAgICAgIHN1cGVyKEFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkuZ2FtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmtleSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZyYW1lICsgJ19ob3ZlcicsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX2hvdmVyJywgXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX25vcm1hbCcpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICB0aGlzLl9lbmFibGVkRnJhbWUgPSBkYXRhLnByb3AuZnJhbWU7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRnJhbWUgPSBkYXRhLnByb3AuYWx0RnJhbWUgIT09IHVuZGVmaW5lZCA/IGRhdGEucHJvcC5hbHRGcmFtZSA6IGRhdGEucHJvcC5mcmFtZTtcbiAgICAgICAgdGhpcy5mb3JjZU91dCA9IGRhdGEucHJvcC5mb3JjZU91dCA/IGRhdGEucHJvcC5mb3JjZU91dCA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlucHV0LnVzZUhhbmRDdXJzb3IgPSBkYXRhLnByb3AudXNlSGFuZCA/IGRhdGEucHJvcC51c2VIYW5kIDogdHJ1ZTtcblxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oZGF0YS5wcm9wLmFuY2hvci54LCBkYXRhLnByb3AuYW5jaG9yLnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGl2b3QoZGF0YS5wcm9wLnBpdm90KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AudGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWwoZGF0YS5wcm9wLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9hZGRMYWJlbChkYXRhOiBJVGV4dENvbXBvbmVudERhdGEpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN1YlBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0geyB4OiBkYXRhLnBvc2l0aW9uLngsIHk6IGRhdGEucG9zaXRpb24ueSB9O1xuICAgICAgICB0aGlzLl9ub3JtYWxDb3B5Q29sb3VyID0gZGF0YS5mb250Q29sb3VyO1xuICAgICAgICB0aGlzLl9ob3ZlckNvcHlDb2xvdXIgPSBkYXRhLmFsdENvbG91ciA/IGRhdGEuYWx0Q29sb3VyIDogZGF0YS5mb250Q29sb3VyO1xuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbi54ID4gMCAmJiBkYXRhLnBvc2l0aW9uLnggPCAxKSB7XG4gICAgICAgICAgICBzdWJQb3MueCA9IHRoaXMucmVhbFdpZHRoICogZGF0YS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgc3ViUG9zLnkgPSB0aGlzLnJlYWxIZWlnaHQgKiBkYXRhLnBvc2l0aW9uLnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFiZWwgPSBuZXcgVGV4dChzdWJQb3MueCwgc3ViUG9zLnksIGRhdGEuY29weSwgZGF0YS5mb250TmFtZSwgZGF0YS5mb250U2l6ZSwgZGF0YS5mb250Q29sb3VyID8gZGF0YS5mb250Q29sb3VyIDogJyNmZmZmZmYnLCBkYXRhLmFsaWduID8gZGF0YS5hbGlnbiA6ICdjZW50ZXInKTtcbiAgICAgICAgaWYgKGRhdGEuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5hbmNob3Iuc2V0VG8oZGF0YS5hbmNob3IueCwgZGF0YS5hbmNob3IueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucGl2b3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldFBpdm90KGRhdGEucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fbGFiZWwpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgdG9nZ2xlRW5hYmxlZEZyYW1lKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJhc2VGcmFtZSh0aGlzLl9lbmFibGVkRnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCYXNlRnJhbWUodGhpcy5fZGlzYWJsZWRGcmFtZSk7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIG9uSW5wdXREb3duSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXREb3duSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIpO1xuICAgICAgICBpZiAodGhpcy5fbGFiZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLnNldENvbG9yKHRoaXMuX2hvdmVyQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dE92ZXJIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0T3V0SGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uSW5wdXRPdXRIYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9ICBcbiAgICBcbiAgICBwdWJsaWMgb25JbnB1dFVwSGFuZGxlcihzcHJpdGU6IGFueSwgcG9pbnRlcjogYW55LCBpc092ZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dFVwSGFuZGxlcihzcHJpdGUsIHBvaW50ZXIsIGlzT3Zlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5fbm9ybWFsQ29weUNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQmFzZUZyYW1lKGJhc2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEZyYW1lcyhiYXNlICsgJ19ob3ZlcicsIGJhc2UgKyAnX25vcm1hbCcsIGJhc2UgKyAnX2hvdmVyJywgYmFzZSArICdfbm9ybWFsJyk7XG4gICAgfSAgXG4gICAgXG4gICAgcHVibGljIGdldCBkZ2FtZSgpOiBHYW1lIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lPnRoaXMuZ2FtZTtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBGcnVpdExpZmUgZnJvbSAnLi4vZ2FtZXBsYXkvRnJ1aXRMaWZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ3N0b3JlbWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NUXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5MSUZFX0xPU1Q6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcy5kZWNyZWFzZUxpdmVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBub3RpZnlHYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR0FNRV9MRVZFTF9GQUlMRUQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnJ1aXRMaWZlTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxpdmVzKCk6IEZydWl0TGlmZSB7XG4gICAgICAgIHJldHVybiA8RnJ1aXRMaWZlPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFByZWZhYiBmcm9tICcuLi9kaXNwbGF5L1JIUHJlZmFiJztcbmltcG9ydCBGcnVpdExpZmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9GcnVpdExpZmVNZWRpYXRvcic7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRMaWZlIGV4dGVuZHMgR3JvdXAge1xuXG4gICAgcHJvdGVjdGVkIF9saWZlQ291bnQ6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2xpdmVzUmVtYWluaW5nOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9saWZlVmlzdWFsczogUkhQcmVmYWJbXTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHt4OiBudW1iZXIsIHk6IG51bWJlcn0sIGRhdGE6IElQcmVmYWJEYXRhKSB7XG4gICAgICAgIHN1cGVyKDAsIDAsIG5hbWUpO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IEZydWl0TGlmZU1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoRnJ1aXRMaWZlTWVkaWF0b3IuTUVESUFUT1JfTkFNRSwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tZWRpYXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgRnJ1aXRMaWZlTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saWZlQ291bnQgPSBkYXRhLnByb3BbJ2xpdmVzJ107XG4gICAgICAgIHRoaXMuX2xpdmVzUmVtYWluaW5nID0gdGhpcy5fbGlmZUNvdW50O1xuICAgICAgICB0aGlzLl9saWZlVmlzdWFscyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlmZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXh0TGlmZSA9IG5ldyBSSFByZWZhYihuYW1lICsgJ19saWZlXycgKyBpLCB7IHg6IHBvc2l0aW9uLnggKyAoZGF0YS5wcm9wWydzcGFjaW5nJ10gKiBpKSwgeTogcG9zaXRpb24ueSB9LCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV4dExpZmUpO1xuICAgICAgICAgICAgdGhpcy5fbGlmZVZpc3VhbHMucHVzaChuZXh0TGlmZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVjcmVhc2VMaXZlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbGl2ZXNSZW1haW5pbmctLTtcbiAgICAgICAgaWYgKHRoaXMuX2xpdmVzUmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yLm5vdGlmeUdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1lZGlhdG9yKCk6IEZydWl0TGlmZU1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxGcnVpdExpZmVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBGcnVpdFNjb3JlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0U2NvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdFNjb3JlTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2ZydWl0c2NvcmVtZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5BRERfVE9fU0NPUkVcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkFERF9UT19TQ09SRTpcbiAgICAgICAgICAgICAgICBsZXQgYW1vdW50OiBudW1iZXIgPSA8bnVtYmVyPm5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XG4gICAgICAgICAgICAgICAgaWYgKGFtb3VudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlLmluY3JlYXNlQnkoYW1vdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBub3RpZnlHYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuR0FNRV9MRVZFTF9GQUlMRUQpO1xuICAgIH1cbiAgICBcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnJ1aXRTY29yZU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzY29yZSgpOiBGcnVpdFNjb3JlIHtcbiAgICAgICAgcmV0dXJuIDxGcnVpdFNjb3JlPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBSSFRleHQgZnJvbSAnLi4vZGlzcGxheS9SSFRleHQnO1xuaW1wb3J0IEZydWl0U2NvcmVNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9GcnVpdFNjb3JlTWVkaWF0b3InO1xuaW1wb3J0IHsgSVByZWZhYkRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJ1aXRTY29yZSBleHRlbmRzIFJIVGV4dCB7XG4gICAgcHJvdGVjdGVkIF9zY29yZTogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfbWVkaWF0b3I6IEZydWl0U2NvcmVNZWRpYXRvcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHt4OiBudW1iZXIsIHk6IG51bWJlcn0sIGRhdGE6IElQcmVmYWJEYXRhKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHBvc2l0aW9uLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IDxGcnVpdFNjb3JlTWVkaWF0b3I+RnJ1aXRTY29yZU1lZGlhdG9yLnJldHJpZXZlTWVkaWF0b3IoRnJ1aXRTY29yZU1lZGlhdG9yLk1FRElBVE9SX05BTUUsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fbWVkaWF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEZydWl0U2NvcmVNZWRpYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbmNyZWFzZUJ5KGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGV4dCA9ICdGcnVpdHM6ICcgKyB0aGlzLl9zY29yZS50b1N0cmluZygpO1xuICAgIH1cbn0iLCJpbXBvcnQgUkhQcmVmYWIgZnJvbSAnLi4vZGlzcGxheS9SSFByZWZhYic7XG5pbXBvcnQgeyBJQ3V0dGFibGVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZydWl0Q3V0dGFibGUgZXh0ZW5kcyBSSFByZWZhYiB7XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBUWVBFUzoge2JvbWI6IHN0cmluZywgZnJ1aXQ6IHN0cmluZywgc3BlY2lhbDogc3RyaW5nfSA9IHtcbiAgICAgICAgYm9tYjogXCJib21iXCIsXG4gICAgICAgIGZydWl0OiBcImZydWl0XCIsXG4gICAgICAgIHNwZWNpYWw6IFwic3BlY2lhbFwiXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jdXRUeXBlOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIF92ZWxvY2l0eTogUGhhc2VyLlBvaW50O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHt4OiBudW1iZXIsIHk6IG51bWJlcn0sIGRhdGE6IElDdXR0YWJsZURhdGEpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgcG9zaXRpb24sIGRhdGEpO1xuXG4gICAgICAgIGlmIChGcnVpdEN1dHRhYmxlLlRZUEVTLmhhc093blByb3BlcnR5KGRhdGEucHJvcC5jdXR0YWJsZVR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXRUeXBlID0gZGF0YS5wcm9wLmN1dHRhYmxlVHlwZTtcbiAgICAgICAgfSAgIFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1dFR5cGUgPSBGcnVpdEN1dHRhYmxlLlRZUEVTLmZydWl0O1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGVCb2R5KHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSBuZXcgUGhhc2VyLlBvaW50KDEsIDEpO1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLl92ZWxvY2l0eS55O1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuX3ZlbG9jaXR5Lng7XG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSAxMDAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTcGF3blZlbG9jaXR5KG5ld1g6IG51bWJlciwgbmV3WTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5LnggPSBuZXdYO1xuICAgICAgICB0aGlzLl92ZWxvY2l0eS55ID0gLW5ld1k7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyByZXNldChuZXdYOiBudW1iZXIsIG5ld1k6IG51bWJlcik6IFBoYXNlci5TcHJpdGUge1xuICAgICAgICBzdXBlci5yZXNldChuZXdYLCBuZXdZKTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSB0aGlzLl92ZWxvY2l0eS55O1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuX3ZlbG9jaXR5Lng7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBjdXRPYmplY3QoKTogdm9pZCB7XG4gICAgICAgIGxldCBlbWl0dGVyID0gdGhpcy5nYW1lLmFkZC5lbWl0dGVyKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgZW1pdHRlci5tYWtlUGFydGljbGVzKHRoaXMua2V5LCAncGFydGljbGUnKTtcbiAgICAgICAgZW1pdHRlci5taW5QYXJ0aWNsZVNwZWVkLnNldFRvKC0yMDAsIC0yMDApO1xuICAgICAgICBlbWl0dGVyLm1heFBhcnRpY2xlU3BlZWQuc2V0VG8oMjAwLCAyMDApO1xuICAgICAgICBlbWl0dGVyLmdyYXZpdHkgPSAwO1xuICAgICAgICBlbWl0dGVyLnN0YXJ0KHRydWUsIDcwMCwgbnVsbCwgNTAwKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR3JvdXAgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCBGcnVpdEN1dHRhYmxlIGZyb20gJy4vRnJ1aXRDdXR0YWJsZSc7XG5pbXBvcnQgeyBJU3Bhd25lckRhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bhd25lciBleHRlbmRzIEdyb3VwIHtcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IElTcGF3bmVyRGF0YTtcbiAgICBwcm90ZWN0ZWQgX3NwYXduUG9pbnQ6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElTcGF3bmVyRGF0YSkge1xuICAgICAgICBzdXBlcigwLCAwLCBkYXRhLm5hbWUpO1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fc3Bhd25Qb2ludCA9IHBvc2l0aW9uO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zcGF3bi5wb29sU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3V0dGFibGUgPSBuZXcgRnJ1aXRDdXR0YWJsZShcImN1dHRhYmxlXCIgKyB0aGlzLl9kYXRhLmN1dHRhYmxlLnByb3AuY3V0dGFibGVUeXBlLCB0aGlzLl9zcGF3blBvaW50LCBkYXRhLmN1dHRhYmxlKTtcbiAgICAgICAgICAgIGN1dHRhYmxlLmtpbGwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoY3V0dGFibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXVlTmV4dFNwYXduKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKHRoaXMuX25leHRTcGF3blRpbWUsIHRoaXMuX3NwYXduT2JqZWN0LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NwYXduT2JqZWN0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc3Bhd25pbmcgb2JqZWN0Jyk7XG4gICAgICAgIGxldCBjdXR0YWJsZSA9IDxGcnVpdEN1dHRhYmxlPnRoaXMuZ2V0Rmlyc3REZWFkKCk7XG4gICAgICAgIGlmIChjdXR0YWJsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY3V0dGFibGUuc2V0U3Bhd25WZWxvY2l0eSh0aGlzLl9uZXdYVmVsb2NpdHksIHRoaXMuX25ld1lWZWxvY2l0eSk7XG4gICAgICAgICAgICBjdXR0YWJsZS5yZXZpdmUoNTApO1xuICAgICAgICAgICAgY3V0dGFibGUucmVzZXQodGhpcy5fc3Bhd25Qb2ludC54LCB0aGlzLl9zcGF3blBvaW50LnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVldWVOZXh0U3Bhd24oKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIGdldCBfbmV3WFZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUucm5kLmJldHdlZW4odGhpcy5fZGF0YS5zcGF3bi52ZWxYLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi52ZWxYLm1heCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBfbmV3WVZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUucm5kLmJldHdlZW4odGhpcy5fZGF0YS5zcGF3bi52ZWxZLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi52ZWxZLm1heCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBfbmV4dFNwYXduVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHRoaXMuX2RhdGEuc3Bhd24udGltZVJhbmdlLm1pbiwgdGhpcy5fZGF0YS5zcGF3bi50aW1lUmFuZ2UubWF4KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgSVNjZW5lRGF0YSB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IFJIUHJlZmFiIGZyb20gJy4uL2Rpc3BsYXkvUkhQcmVmYWInO1xuaW1wb3J0IFJIVGV4dCBmcm9tICcuLi9kaXNwbGF5L1JIVGV4dCc7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5pbXBvcnQgQmFzZVN0YXRlIGZyb20gJy4uL3N0YXRlL0Jhc2VTdGF0ZSc7XG5pbXBvcnQgRnJ1aXRMaWZlIGZyb20gJy4uL2dhbWVwbGF5L0ZydWl0TGlmZSc7XG5pbXBvcnQgRnJ1aXRTY29yZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdFNjb3JlJztcbmltcG9ydCBTcGF3bmVyIGZyb20gJy4uL2dhbWVwbGF5L1NwYXduZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWJCdWlsZGVyIHtcblxuICAgIC8vIEFsbCBjbGFzc2VzIHlvdSBpbnRlbmRlZCB0byBpbnN0YW50aWF0ZSBuZWVkIHRvIGV4aXN0IHdpdGggdGhpcyBvYmplY3QuXG4gICAgLy8gSWYgdGhlcmUgdHlwZSBoZXJlIGRvZXMgbm90IG1hdGNoIHRoZSB0eXBlIHBhcmVtIGZyb20gdGhlIGltcG9ydCBmaWxlLCBcbiAgICAvLyB0aGVuIHRoZSBCdWlsZGVyIHdpbGwgc2tpcCBvdmVyIHRoYXQgY2xhc3MuXG4gICAgcHVibGljIHN0YXRpYyBwcmVmYWJDbGFzc2VzOiB7fSA9IHtcbiAgICAgICAgcHJlZmFiOiBSSFByZWZhYixcbiAgICAgICAgdGV4dDogUkhUZXh0LFxuICAgICAgICBidXR0b246IFJIQnV0dG9uLFxuICAgICAgICBsaXZlczogRnJ1aXRMaWZlLCBcbiAgICAgICAgc2NvcmU6IEZydWl0U2NvcmUsXG4gICAgICAgIHNwYXduZXI6IFNwYXduZXJcbiAgICB9OyBcbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGdhbWU6IFBoYXNlci5HYW1lID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZXMgYWxsIG9iamVjdHMgZm9yIGEgZ2l2ZW4gc2NlbmUsIG9uIHRoYXQgc2NlbmUuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NlbmVGcm9tKGRhdGE6IElTY2VuZURhdGEsIHNjZW5lOiBCYXNlU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNjZW5lID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgbGV0IGdyb3VwTmFtZSwgcHJlZmFiTmFtZTtcbiAgICAgICAgc2NlbmUucHJlZmFicyA9IFtdO1xuICAgICAgICBzY2VuZS5ncm91cHMgPSB7fTtcblxuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGdyb3VwIGRhdGEuXG4gICAgICAgICAgICBkYXRhLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cE5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNjZW5lLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShncm91cE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLmdyb3Vwc1tncm91cE5hbWVdID0gc2NlbmUuYWRkLmRHcm91cCgwLCAwLCBncm91cE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgcHJlZmFiIGRhdGEuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucHJlZmFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChQcmVmYWJCdWlsZGVyLnByZWZhYkNsYXNzZXMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWZhYiA9IHRoaXMuY3JlYXRlUHJlZmFiKGRhdGEucHJlZmFic1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnByZWZhYnNbaV0uaGFzT3duUHJvcGVydHkoXCJncm91cFwiKSAmJiBzY2VuZS5ncm91cHMuaGFzT3duUHJvcGVydHkoZGF0YS5wcmVmYWJzW2ldLmdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuZ3JvdXBzW2RhdGEucHJlZmFic1tpXS5ncm91cF0uYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLmFkZC5leGlzdGluZyhwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLnByZWZhYnNbcHJlZmFiLm5hbWVdID0gcHJlZmFiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgYWxsIHByZWZhYnMgZnJvbSBhIGdpdmVuIGRhdGEgb2JqZWN0LlxuICAgIC8vIFJldHVybnMgYSBncm91cCB3aXRoIHRoZW0gaW4gaXQuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQcmVmYWJzRnJvbShkYXRhOiBJU2NlbmVEYXRhKTogR3JvdXAge1xuICAgICAgICBsZXQgZ3JvdXBOYW1lLCBwcmVmYWJOYW1lO1xuICAgICAgICBsZXQgZ3JvdXBzID0ge307XG4gICAgICAgIGxldCByb290ID0gbmV3IEdyb3VwKDAsIDAsICdyb290Jyk7XG5cbiAgICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGdyb3Vwc1snYmFzaWMnXSA9IG5ldyBHcm91cCgwLCAwLCBncm91cE5hbWUpO1xuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGdyb3VwIGRhdGEuXG4gICAgICAgICAgICBkYXRhLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cE5hbWUpIHtcbiAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBOYW1lXSA9IG5ldyBHcm91cCgwLCAwLCBncm91cE5hbWUpO1xuICAgICAgICAgICAgICAgIHJvb3QuYWRkQ2hpbGQoZ3JvdXBzW2dyb3VwTmFtZV0pO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBwcmVmYWIgZGF0YS5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5wcmVmYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFByZWZhYkJ1aWxkZXIucHJlZmFiQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByZWZhYnNbaV0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHByZWZhYlxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJlZmFiID0gdGhpcy5jcmVhdGVQcmVmYWIoZGF0YS5wcmVmYWJzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFic1tpXS5oYXNPd25Qcm9wZXJ0eShcImdyb3VwXCIpICYmIGdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShkYXRhLnByZWZhYnNbaV0uZ3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZGF0YS5wcmVmYWJzW2ldLmdyb3VwXS5hZGRDaGlsZChwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdC5hZGRDaGlsZChwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb290O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUHJlZmFiKGRhdGE6IGFueSwgcGFyZW50OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICAgICAgbGV0IHByZWZhYlBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbGV0IHByZWZhYjogYW55O1xuICAgICAgICAvLyBjcmVhdGUgb2JqZWN0IGFjY29yZGluZyB0byBpdHMgdHlwZVxuICAgICAgICBpZiAodGhpcy5wcmVmYWJDbGFzc2VzLmhhc093blByb3BlcnR5KGRhdGEudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIElmIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiAwIGFuZCBsZXNzIHRoYW4gMSwgd2UgYXNzdW1lIHRoaXMgaXMgYSBmbG9hdGluZ1xuICAgICAgICAgICAgLy8gcG9pbnQgdmFsdWUgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSAlIGJhc2VkIHBvc2l0aW9uLlxuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueCA+IDAgJiYgZGF0YS5wb3NpdGlvbi54IDw9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiBhcyBwZXJjZW50YWdlLCBkZXBlbmRlbnQgb24gcGFyZW50LlxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueCA9IGRhdGEucG9zaXRpb24ueCAqIFByZWZhYkJ1aWxkZXIuZ2FtZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueSA9IGRhdGEucG9zaXRpb24ueSAqIFByZWZhYkJ1aWxkZXIuZ2FtZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi54ID0gZGF0YS5wb3NpdGlvbi54ICogcGFyZW50LnJlYWxXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueSA9IGRhdGEucG9zaXRpb24ueSAqIHBhcmVudC5yZWFsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueCA9IGRhdGEucG9zaXRpb24ueCAtIHBhcmVudC54O1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi55ID0gZGF0YS5wb3NpdGlvbi55IC0gcGFyZW50Lnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlZmFiID0gbmV3IHRoaXMucHJlZmFiQ2xhc3Nlc1tkYXRhLnR5cGVdKGRhdGEubmFtZSwgcHJlZmFiUG9zaXRpb24sIGRhdGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImNvbXBvbmVudHNcIikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcCA9IFByZWZhYkJ1aWxkZXIuY3JlYXRlUHJlZmFiKGRhdGEuY29tcG9uZW50c1tpXSwgcHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiLmFkZENoaWxkKGNvbXApO1xuICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmYWI7XG4gICAgfVxufSIsImltcG9ydCB7U3RhdGV9IGZyb20gXCJkaWpvbi9jb3JlXCI7XG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9CYXNlTWVkaWF0b3JcIjtcbmltcG9ydCB7IElTY2VuZURhdGEgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcbmltcG9ydCBQcmVmYWJCdWlsZGVyIGZyb20gJy4uL3V0aWxzL1ByZWZhYkJ1aWxkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgcHJpdmF0ZSBfdXBkYXRlQWxsb3dlZDogYm9vbGVhbiAgPSBmYWxzZTtcblxuICAgIC8vIFRoaXMgd2lsbCBiZSBhbiBhcnJheSBjb250YWluaW5nIGEgcmVmZXJlbmNlIHRvIGV2ZXJ5IFByZWZhYiBidWlsdCBmb3IgdGhpcyBzY2VuZS4gICAgXG4gICAgcHVibGljIHByZWZhYnM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgLy8gVGhpcyB3aWxsIGJlIGFuIG9iamVjdCBjb250YWluaW5nIGVhY2ggZ3JvdXAsIGFkZGVkIHRocm91Z2ggdGhlIHByZWZhYiBidWlsZGVyLCBhcyBhIHByb3BlcnR5IG9uIHRoZSBvYmplY3QuXG4gICAgcHVibGljIGdyb3VwczogYW55O1xuICAgIHB1YmxpYyBfbGV2ZWxEYXRhOiBJU2NlbmVEYXRhID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55ID0gbnVsbCkge1xuICAgICAgICB0aGlzLl9sZXZlbERhdGEgPSBsZXZlbERhdGE7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnByZWxvYWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2xldmVsRGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHModGhpcy5fbGV2ZWxEYXRhLmFzc2V0RW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xldmVsRGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgUHJlZmFiQnVpbGRlci5jcmVhdGVTY2VuZUZyb20odGhpcy5fbGV2ZWxEYXRhLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJCdWlsZCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJCdWlsZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVBbGxvd2VkID0gdHJ1ZTtcbiAgICB9ICAgIFxuXG4gICAgcHJvdGVjdGVkIF9maW5kUHJlZmFiKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLnByZWZhYnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZWZhYnNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKFwiUHJlZmFiIFwiICsgbmFtZSArIFwiIG5vdCBmb3VuZCBvbiBTdGF0ZS5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVBbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVc2UgbWUgZm9yIHVwZGF0ZSBsb29wcyAtIEkgd2lsbCBvbmx5IGJlIGNhbGxlZCB3aGVuIHVwZGF0ZUFsbG93ZWQgaXMgdHJ1ZS4gICAgXG4gICAgcHVibGljIHVwZGF0ZVN0YXRlKCk6IHZvaWQgeyB9XG5cbiAgICBwdWJsaWMgZ2V0IHVwZGF0ZUFsbG93ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVBbGxvd2VkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdXBkYXRlQWxsb3dlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91cGRhdGVBbGxvd2VkID0gdmFsdWU7IFxuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3RNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnYm9vdE1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIG9uUmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfSU5JVCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gdmlld0NvbXBvbmVudFxuICAgIHB1YmxpYyBib290Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUpO1xuICAgIH1cblx0XHRcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQm9vdE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQm9vdE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9Cb290TWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBCb290TWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh3aW5kb3dbJ3ZlcnNpb24nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQuY2FjaGVCdXN0VmVyc2lvbiA9ICdAQHZlcnNpb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignZ2FtZV9kYXRhJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignYXNzZXRzJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignY29weScpO1xuICAgIH1cblxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGJ1aWxkSW50ZXJmYWNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yLmJvb3RDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHJvdGVjdGVkIGdldCBtZWRpYXRvcigpOiBCb290TWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPEJvb3RNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59IiwiaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4uL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdwcmVsb2FkTWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gUHJlbG9hZCBzdGF0ZVxuXG4gICAgcHVibGljIG5vdGlmeVByZWxvYWRDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuUFJFTE9BRF9DT01QTEVURSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBuZXh0KCk6IHZvaWR7XG4gICAgICAgIHRoaXMucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9NRU5VKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gUHJlbG9hZE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBQcmVsb2FkTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL1ByZWxvYWRNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IFByZWxvYWRNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlQcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5uZXh0KCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHByb3RlY3RlZCBnZXQgbWVkaWF0b3IoKTogUHJlbG9hZE1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxQcmVsb2FkTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgTWVudSBmcm9tICcuLi9zdGF0ZS9NZW51JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdtZW51TWVkaWF0b3InO1xuXHRcdFxuICAgIHB1YmxpYyBnZXQgYXVkaW9TcHJpdGVEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5nZXREYXRhKClbJ2F1ZGlvc3ByaXRlJ107XG4gICAgfSAgXG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1lbnVNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWVudSgpOiBNZW51IHtcbiAgICAgICAgcmV0dXJuIDxNZW51PnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBNZW51TWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvTWVudU1lZGlhdG9yJztcbmltcG9ydCBSSEJ1dHRvbiBmcm9tICcuLi9kaXNwbGF5L1JIQnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgcHJvdGVjdGVkIF9idWlsZENvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIF9jdXJyZW50UHJlc2V0TmFtZTogbnVtYmVyO1xuXG4gICAgcHJvdGVjdGVkIF90aXRsZTogUGhhc2VyLlRleHQ7XG4gICAgcHJvdGVjdGVkIF9iZzogUGhhc2VyLkltYWdlO1xuXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgTWVudU1lZGlhdG9yKCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBJbnB1dEV2ZW50c1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICAgICAgdGhpcy5fYnVpbGRDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBcbiAgICBcbiAgICBwdWJsaWMgY2xlYXJWaXN1YWxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aXRsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2JnLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwSW5wdXRFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5QnRuOiBSSEJ1dHRvbiA9IHRoaXMuX2ZpbmRQcmVmYWIoXCJnYW1lX2J1dHRvblwiKTtcbiAgICAgICAgaWYgKHBsYXlCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBsYXlCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uUGxheVByZXNzZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3RvcmVCdG46IFJIQnV0dG9uID0gPFJIQnV0dG9uPnRoaXMuX2ZpbmRQcmVmYWIoXCJzdG9yZV9idXR0b25cIik7XG4gICAgICAgIGlmIChzdG9yZUJ0biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RvcmVCdG4ub25JbnB1dERvd24uYWRkKHRoaXMuX29uU3RvcmVQcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgX2FkZFZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RpdGxlID0gdGhpcy5nYW1lLmFkZC5kVGV4dCh0aGlzLnJlYWxXaWR0aCAqIDAuNSwgdGhpcy5yZWFsSGVpZ2h0ICogMC4xLCAnRlJVSVQgTklOSkEnLCBDb25zdGFudHMuRk9OVF9SQUxFV0FZLCAzMCwgQ29uc3RhbnRzLlNUUl9CTFVFKTtcbiAgICAgICAgdGhpcy5fdGl0bGUuY2VudGVyUGl2b3QoKTtcbiAgICB9ICBcblxuICAgIHByaXZhdGUgX29uUGxheVByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9HQU1FKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJpdmF0ZSBfb25TdG9yZVByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFN0YXRlQ2hhbmdlKENvbnN0YW50cy5TVEFURV9TVE9SRSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU0ZYKCk6IHZvaWQge1xuICAgICAgICBDb25zdGFudHMuU0ZYX0VOQUJMRUQgPSAhQ29uc3RhbnRzLlNGWF9FTkFCTEVEO1xuICAgIH0gICAgICAgXG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLndpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhbEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBtZWRpYXRvcigpOiBNZW51TWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPE1lbnVNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi4vc3RhdGUvR2FtZXBsYXknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdnYW1lcGxheW1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5HQU1FX0xFVkVMX0ZBSUxFRFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuTElGRV9MT1NUOlxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXAub25HYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBHYW1lcGxheU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2aWV3Q29tcCgpOiBHYW1lcGxheSB7XG4gICAgICAgIHJldHVybiA8R2FtZXBsYXk+dGhpcy52aWV3Q29tcG9uZW50O1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGcnVpdEN1dCBleHRlbmRzIFBoYXNlci5HcmFwaGljcyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIENPTE9SOiBudW1iZXI7XG4gICAgcHVibGljIHN0YXRpYyBXSURUSDogbnVtYmVyO1xuICAgIHB1YmxpYyBzdGF0aWMgTElGRV9USU1FOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lOiBQaGFzZXIuR2FtZSkge1xuICAgICAgICBzdXBlcihnYW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0N1dCh4OiBudW1iZXIsIHk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lU3R5bGUoRnJ1aXRDdXQuV0lEVEgsIEZydWl0Q3V0LkNPTE9SLCAwLjUpO1xuICAgICAgICB0aGlzLmRyYXdQb2x5Z29uKFt4LCB5XSk7XG4gICAgICAgIHRoaXMubGluZVRvKGVuZFgsIGVuZFkpO1xuICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKFBoYXNlci5UaW1lci5TRUNPTkQgKiBGcnVpdEN1dC5MSUZFX1RJTUUsIHRoaXMua2lsbCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGtpbGwoKTogUGhhc2VyLkdyYXBoaWNzIHtcbiAgICAgICAgc3VwZXIua2lsbCgpO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgR2FtZXBsYXlNZWRpYXRvciBmcm9tICcuLi9tZWRpYXRvci9HYW1lcGxheU1lZGlhdG9yJztcbmltcG9ydCBSSEJ1dHRvbiBmcm9tICcuLi9kaXNwbGF5L1JIQnV0dG9uJztcbmltcG9ydCBGcnVpdEN1dCBmcm9tICcuLi9nYW1lcGxheS9GcnVpdEN1dCc7XG5pbXBvcnQgRnJ1aXRDdXR0YWJsZSBmcm9tICcuLi9nYW1lcGxheS9GcnVpdEN1dHRhYmxlJztcbmltcG9ydCBTcGF3bmVyIGZyb20gJy4uL2dhbWVwbGF5L1NwYXduZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBNSU5fU1dJUEVfRElTVEFOQ0U6IG51bWJlciA9IDEwO1xuXG4gICAgcHJvdGVjdGVkIF9zd2lwZVN0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTsgICAgXG5cbiAgICBwcm90ZWN0ZWQgX2J1aWxkQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0U3dpcGVQdDogUGhhc2VyLlBvaW50O1xuXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KGxldmVsRGF0YTogYW55KSB7XG4gICAgICAgIHN1cGVyLmluaXQobGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgR2FtZXBsYXlNZWRpYXRvcigpO1xuICAgICAgICB0aGlzLl9zd2lwZVN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdEJ1aWxkU2VxdWVuY2UoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLl9pbml0Q3V0U3RhdGljcyxcbiAgICAgICAgICAgIHRoaXMuX2FkZElucHV0RXZlbnRzXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJCdWlsZCgpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJCdWlsZCgpO1xuICAgICAgICB0aGlzLl9idWlsZENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc3RhcnRTcGF3bmVycygpO1xuICAgIH0gXG5cbiAgICBwdWJsaWMgb25HYW1lT3ZlcigpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgb3ZlciBtYW4nKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJvdGVjdGVkIF9pbml0Q3V0U3RhdGljcygpOiB2b2lkIHtcbiAgICAgICAgRnJ1aXRDdXQuQ09MT1IgPSAweGZmMDAwMDtcbiAgICAgICAgRnJ1aXRDdXQuV0lEVEggPSA1O1xuICAgICAgICBGcnVpdEN1dC5MSUZFX1RJTUUgPSAwLjI1O1xuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX2FkZElucHV0RXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZCh0aGlzLl9vbklucHV0RG93biwgdGhpcyk7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLl9vbklucHV0VXAsIHRoaXMpO1xuICAgIH0gICBcbiAgICBcbiAgICBwcm90ZWN0ZWQgX29uSW5wdXREb3duKHBvaW50ZXI6IFBoYXNlci5Qb2ludCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zd2lwZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdGFydFN3aXBlUHQgPSBuZXcgUGhhc2VyLlBvaW50KHBvaW50ZXIueCwgcG9pbnRlci55KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uSW5wdXRVcChwb2ludGVyOiBQaGFzZXIuUG9pbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3N3aXBlU3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zd2lwZVN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gUGhhc2VyLlBvaW50LmRpc3RhbmNlKHRoaXMuX3N0YXJ0U3dpcGVQdCwgbmV3IFBoYXNlci5Qb2ludChwb2ludGVyLngsIHBvaW50ZXIueSkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPj0gR2FtZXBsYXkuTUlOX1NXSVBFX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICBsZXQgY3V0OiBGcnVpdEN1dCA9IHRoaXMuX2RyYXdDdXQodGhpcy5fc3RhcnRTd2lwZVB0LngsIHRoaXMuX3N0YXJ0U3dpcGVQdC55LCBwb2ludGVyLngsIHBvaW50ZXIueSk7XG4gICAgICAgICAgICBsZXQgY3V0dGFibGVzOiBQaGFzZXIuR3JvdXAgPSB0aGlzLmdyb3Vwc1tcImN1dHRhYmxlc1wiXTtcbiAgICAgICAgICAgIGlmIChjdXR0YWJsZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXR0YWJsZXMuZm9yRWFjaEFsaXZlKHRoaXMuX2NoZWNrQ29sbGlzaW9ucywgdGhpcywgY3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZHJhd0N1dCh4OiBudW1iZXIsIHk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpOiBGcnVpdEN1dCB7XG4gICAgICAgIGxldCBjdXQgPSBuZXcgRnJ1aXRDdXQodGhpcy5nYW1lKTtcbiAgICAgICAgdGhpcy5ncm91cHNbXCJjdXRzXCJdLmFkZENoaWxkKGN1dCk7XG4gICAgICAgIGN1dC5kcmF3Q3V0KHgsIHksIGVuZFgsIGVuZFkpO1xuICAgICAgICByZXR1cm4gY3V0O1xuICAgIH0gICBcblxuICAgIHByb3RlY3RlZCBfY2hlY2tDb2xsaXNpb25zKGN1dHRhYmxlOiBQaGFzZXIuU3ByaXRlLCBjdXQ6IEZydWl0Q3V0KTogdm9pZCB7XG4gICAgICAgIGlmIChjdXR0YWJsZS5ib2R5Lm92ZXJsYXBzKGN1dCkpIHtcbiAgICAgICAgICAgICg8RnJ1aXRDdXR0YWJsZT5jdXR0YWJsZSkuY3V0T2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3N0YXJ0U3Bhd25lcnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBub3JtYWw6IFNwYXduZXIgPSB0aGlzLl9maW5kUHJlZmFiKFwiZnJ1aXRTcGF3bmVyXCIpO1xuICAgICAgICBpZiAobm9ybWFsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9ybWFsLnF1ZXVlTmV4dFNwYXduKCk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgX3RvZ2dsZVNGWCgpOiB2b2lkIHtcbiAgICAgICAgQ29uc3RhbnRzLlNGWF9FTkFCTEVEID0gIUNvbnN0YW50cy5TRlhfRU5BQkxFRDtcbiAgICB9ICAgICAgIFxuXG4gICAgcHVibGljIGdldCByZWFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogR2FtZXBsYXlNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8R2FtZXBsYXlNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59XG4gICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi4vc3RhdGUvU3RvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZU1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdzdG9yZW1lZGlhdG9yJztcblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBTdG9yZU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdG9yZSgpOiBTdG9yZSB7XG4gICAgICAgIHJldHVybiA8U3RvcmU+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG59IiwiaW1wb3J0IEJhc2VTdGF0ZSBmcm9tIFwiLi9CYXNlU3RhdGVcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCB7VGV4dH0gZnJvbSAnZGlqb24vZGlzcGxheSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyc30gZnJvbSAnZGlqb24vdXRpbHMnO1xuaW1wb3J0IFN0b3JlTWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvU3RvcmVNZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIGV4dGVuZHMgQmFzZVN0YXRlIHtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IFN0b3JlTWVkaWF0b3IoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICBcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckJ1aWxkKCkge1xuICAgICAgICBzdXBlci5hZnRlckJ1aWxkKCk7XG4gICAgfSBcblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IFN0b3JlTWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPFN0b3JlTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICAiLCJpbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCB7R2FtZX0gZnJvbSBcImRpam9uL2NvcmVcIjtcbmltcG9ydCB7RGV2aWNlfSBmcm9tIFwiZGlqb24vdXRpbHNcIjtcbmltcG9ydCB7Q29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5cbmltcG9ydCBBcHBsaWNhdGlvbk1lZGlhdG9yIGZyb20gXCIuL21lZGlhdG9yL0FwcGxpY2F0aW9uTWVkaWF0b3JcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tIFwiLi91dGlscy9Ob3RpZmljYXRpb25zXCI7XG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZS9Cb290XCI7XG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZS9QcmVsb2FkXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi9zdGF0ZS9NZW51XCI7XG5pbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9zdGF0ZS9HYW1lcGxheSc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdGF0ZS9TdG9yZSc7XG5pbXBvcnQgeyBHYW1lTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCBQcmVmYWJCdWlsZGVyIGZyb20gJy4vdXRpbHMvUHJlZmFiQnVpbGRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG4gICAgcHVibGljIGdhbWVJZDogc3RyaW5nID0gbnVsbDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvLyBvdmVycmlkZXNcbiAgICBwdWJsaWMgY3JlYXRlR2FtZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IEdhbWUoe1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuX2dldEdhbWVXaWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9nZXRHYW1lSGVpZ2h0KCksXG4gICAgICAgICAgICBwYXJlbnQ6ICdnYW1lLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAvL3JlbmRlcmVyOiBQaGFzZXIuQ0FOVkFTLFxuICAgICAgICAgICAgcmVuZGVyZXI6IFBoYXNlci5BVVRPLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gdXNlIHRoaXMgaWYgeW91IHdhbnQgdG8gc3dpdGNoIGJldHdlZW4gQDJ4IGFuZCBAMXggZ3JhcGhpY3NcbiAgICAgICAgICAgIHJlc29sdXRpb246IHRoaXMuX2dldFJlc29sdXRpb24oKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBBcHBsaWNhdGlvbk1lZGlhdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRTdGF0ZXMoKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBzdGFydEdhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChDb25zdGFudHMuU1RBVEVfQk9PVCk7XG4gICAgfVxuXG4gICAgcHVibGljIGJvb3RDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3RTY2FsZVNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuYWRqdXN0UmVuZGVyZXJTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLmFkZFBsdWdpbnMoKTtcbiAgICAgICAgUHJlZmFiQnVpbGRlci5nYW1lID0gdGhpcy5nYW1lO1xuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgYWRqdXN0U2NhbGVTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zZXRNaW5NYXgoMjU2LCAxOTIsIDEwMjQsIDc2OCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGp1c3RSZW5kZXJlclNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWUuZm9yY2VTaW5nbGVVcGRhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLnJvdW5kUHggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lLmFudGlhbGlhcyA9IHRydWU7XG4gICAgLy8gICAgdGhpcy5nYW1lLnJlbmRlcmVyLmNsZWFyQmVmb3JlUmVuZGVyID0gdGhpcy5nYW1lLnJlbmRlclR5cGUgPT09IFBoYXNlci5DQU5WQVM7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGZyb20gdGhlIGJvb3Qgc3RhdGUgYXMgd2UgY2FuJ3QgaW5pdGlhbGl6ZSBwbHVnaW5zIHVudGlsIHRoZSBnYW1lIGlzIGJvb3RlZFxuICAgIHB1YmxpYyByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVsID0gbmV3IEdhbWVNb2RlbCgnZ2FtZV9kYXRhJyk7XG4gICAgICAgIGNvbnN0IGNvcHlNb2RlbCA9IG5ldyBDb3B5TW9kZWwoJ2NvcHknKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZENvbXBsZXRlKCk6IHZvaWQge1xuXG4gICAgfSAgIFxuICAgIFxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIC8vIGFkZHMgc3RhdGVzXG4gICAgcHJpdmF0ZSBfYWRkU3RhdGVzKCkge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9CT09ULCBCb290KTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfUFJFTE9BRCwgUHJlbG9hZCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX01FTlUsIE1lbnUpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9HQU1FLCBHYW1lcGxheSk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX1NUT1JFLCBTdG9yZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0R2FtZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHYW1lSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVzb2x1dGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAoQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSAmJiAhaXNOYU4oQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEZXZpY2UubW9iaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChEZXZpY2UucGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZW5kZXJlckJ5RGV2aWNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBEZXZpY2UubW9iaWxlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDwgMiA/IFBoYXNlci5DQU5WQVMgOiBQaGFzZXIuQVVUTztcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBtZWRpYXRvcigpOiBBcHBsaWNhdGlvbk1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxBcHBsaWNhdGlvbk1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+dGhpcy5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3N1Ym1vZHVsZXMvZGlqb24vYnVpbGQvZGlqb24uZC50c1wiLz4gIFxuaW1wb3J0IEJvaWxlclBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi9Cb2lsZXJQbGF0ZUFwcGxpY2F0aW9uJztcblxuLy8gYm9vdHN0cmFwIHRoZSBhcHBcbmV4cG9ydCBjb25zdCBhcHAgPSBuZXcgQm9pbGVyUGxhdGVBcHBsaWNhdGlvbigpOyIsImltcG9ydCB7R3JvdXAsIFRleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtJUHJlbG9hZEhhbmRsZXJ9IGZyb20gJ2Rpam9uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkZXIgZXh0ZW5kcyBHcm91cCBpbXBsZW1lbnRzIElQcmVsb2FkSGFuZGxlciB7XG4gICAgc3RhdGljIFRFU1Q6IG51bWJlciA9IDE7XG4gICAgc3RhdGljIFRFU1RfMjogbnVtYmVyID0gMjtcblxuICAgIHByaXZhdGUgX3dpcGVyOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJpdmF0ZSBfbG9hZFRleHQ6IFRleHQ7XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluQ29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0Q29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuXG4gICAgcHJpdmF0ZSBfaW5Ud2VlbjogUGhhc2VyLlR3ZWVuO1xuICAgIHByaXZhdGUgX291dFR3ZWVuOiBQaGFzZXIuVHdlZW47XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIG5hbWUsIHRydWUpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xuICAgIH1cblxuICAgIC8vIEdyb3VwIG92ZXJyaWRlc1xuICAgIHByb3RlY3RlZCBidWlsZEludGVyZmFjZSgpIHtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQgPSB0aGlzLmFkZEludGVybmFsLmRUZXh0KDUwLCA1MCwgJ0xvYWRpbmcgLi4uICcsICdBcmlhbCcsIDM2LCAnI0ZGRkZGRicpO1xuXG4gICAgICAgIGxldCBnZnggPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoMHgwMDAwMDAsIDEpO1xuICAgICAgICBnZnguZHJhd1JlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgZ2Z4LmVuZEZpbGwoKTtcblxuICAgICAgICB0aGlzLl93aXBlciA9IHRoaXMuYWRkSW50ZXJuYWwuaW1hZ2UoMCwgMCwgZ2Z4LmdlbmVyYXRlVGV4dHVyZSgpKTtcblxuICAgICAgICB0aGlzLmdhbWUud29ybGQucmVtb3ZlKGdmeCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2luVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDEgfSwgMzAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQpO1xuICAgICAgICB0aGlzLl9vdXRUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oeyBhbHBoYTogMCB9LCAyMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluKTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4ub25Db21wbGV0ZS5hZGQodGhpcy5fb3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBpUHJlbG9hZEhhbmRsZXIgaW1wbGVtZW50YXRpb25zXG4gICAgcHVibGljIGxvYWRTdGFydCgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgcm91bmRlZFByb2dyZXNzID0gTWF0aC5yb3VuZChwcm9ncmVzcykudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQuc2V0VGV4dCgnTG9hZGluZyAuLi4gJyArIHJvdW5kZWRQcm9ncmVzcyArICclJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pblR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25PdXQoKSB7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gICAgcHJvdGVjdGVkIF9pbigpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSW5Db21wbGV0ZS5kaXNwYXRjaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb3V0KCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uT3V0Q29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG59Il19
