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
                Object.defineProperty(BaseMediator.prototype, "name", {
                    get: function () {
                        return "baseMediator_" + this.game.rnd.uuid();
                    },
                    enumerable: true,
                    configurable: true
                });
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
                            this.viewComponent.adjustScaleSettings();
                            this.viewComponent.adjustRendererSettings();
                            this.viewComponent.addPlugins();
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
    var Prefab;
    return {
        setters:[
            function (display_1_1) {
                display_1 = display_1_1;
            }],
        execute: function() {
            Prefab = (function (_super) {
                __extends(Prefab, _super);
                function Prefab(name, position, data) {
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
                return Prefab;
            }(display_1.Sprite));
            exports_7("default", Prefab);
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
System.register("state/BaseState", ["dijon/core", "display/RHPrefab", "display/RHText", "display/RHButton"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_1, RHPrefab_1, RHText_1, RHButton_1;
    var BaseState;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (RHPrefab_1_1) {
                RHPrefab_1 = RHPrefab_1_1;
            },
            function (RHText_1_1) {
                RHText_1 = RHText_1_1;
            },
            function (RHButton_1_1) {
                RHButton_1 = RHButton_1_1;
            }],
        execute: function() {
            BaseState = (function (_super) {
                __extends(BaseState, _super);
                function BaseState() {
                    _super.apply(this, arguments);
                    this.prefabClasses = {
                        prefab: RHPrefab_1.default,
                        text: RHText_1.default,
                        button: RHButton_1.default
                    };
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
                    var group_name, prefab_name;
                    this.groups = {};
                    this.prefabs = {};
                    if (this._levelData !== null) {
                        this._levelData.groups.forEach(function (group_name) {
                            this.groups[group_name] = this.game.add.dGroup();
                        }, this);
                        for (var prefabName in this._levelData.prefabs) {
                            if (this._levelData.prefabs.hasOwnProperty(prefabName)) {
                                this._createPrefab(prefabName, this._levelData.prefabs[prefabName]);
                            }
                        }
                    }
                    _super.prototype.create.call(this);
                };
                BaseState.prototype._createPrefab = function (prefabName, data) {
                    var prefabPosition = { x: 0, y: 0 };
                    var prefab;
                    if (this.prefabClasses.hasOwnProperty(data.type)) {
                        if (data.position.x > 0 && data.position.x <= 1) {
                            prefabPosition.x = data.position.x * this.game.world.width;
                            prefabPosition.y = data.position.y * this.game.world.height;
                        }
                        else {
                            prefabPosition = data.position;
                        }
                        prefab = new this.prefabClasses[data.type](prefabName, prefabPosition, data);
                        if (data.group && this.groups.hasOwnProperty(data.group)) {
                            this.groups[data.group].addChild(prefab);
                        }
                        else {
                            this.game.add.existing(prefab);
                        }
                        this.prefabs[prefabName] = prefab;
                    }
                };
                BaseState.prototype._findPrefab = function (name) {
                    if (this.prefabs.hasOwnProperty(name)) {
                        return this.prefabs[name];
                    }
                    else {
                        return null;
                    }
                };
                return BaseState;
            }(core_1.State));
            exports_10("default", BaseState);
        }
    }
});
System.register("mediator/BootMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var BaseMediator_2, Notifications_2;
    var BootMediator;
    return {
        setters:[
            function (BaseMediator_2_1) {
                BaseMediator_2 = BaseMediator_2_1;
            },
            function (Notifications_2_1) {
                Notifications_2 = Notifications_2_1;
            }],
        execute: function() {
            BootMediator = (function (_super) {
                __extends(BootMediator, _super);
                function BootMediator() {
                    _super.apply(this, arguments);
                }
                BootMediator.prototype.onRegister = function () {
                    this.sendNotification(Notifications_2.default.BOOT_INIT);
                };
                BootMediator.prototype.bootComplete = function () {
                    this.sendNotification(Notifications_2.default.BOOT_COMPLETE);
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
            }(BaseMediator_2.default));
            exports_11("default", BootMediator);
        }
    }
});
System.register("state/Boot", ["state/BaseState", "mediator/BootMediator"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
            exports_12("default", Boot);
        }
    }
});
System.register("mediator/PreloadMediator", ["utils/Constants", "mediator/BaseMediator", "utils/Notifications"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var Constants_2, BaseMediator_3, Notifications_3;
    var PreloadMediator;
    return {
        setters:[
            function (Constants_2_1) {
                Constants_2 = Constants_2_1;
            },
            function (BaseMediator_3_1) {
                BaseMediator_3 = BaseMediator_3_1;
            },
            function (Notifications_3_1) {
                Notifications_3 = Notifications_3_1;
            }],
        execute: function() {
            PreloadMediator = (function (_super) {
                __extends(PreloadMediator, _super);
                function PreloadMediator() {
                    _super.apply(this, arguments);
                }
                PreloadMediator.prototype.notifyPreloadComplete = function () {
                    this.sendNotification(Notifications_3.default.PRELOAD_COMPLETE);
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
            }(BaseMediator_3.default));
            exports_13("default", PreloadMediator);
        }
    }
});
System.register("state/Preload", ["state/BaseState", "mediator/PreloadMediator"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
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
            exports_14("default", Preload);
        }
    }
});
System.register("mediator/MenuMediator", ["mediator/BaseMediator"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var BaseMediator_4;
    var MenuMediator;
    return {
        setters:[
            function (BaseMediator_4_1) {
                BaseMediator_4 = BaseMediator_4_1;
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
                Object.defineProperty(MenuMediator.prototype, "levelData", {
                    get: function () {
                        return this.gameModel.getLevelData('menu');
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
                MenuMediator.MEDIATOR_NAME = 'menuMediator';
                return MenuMediator;
            }(BaseMediator_4.default));
            exports_15("default", MenuMediator);
        }
    }
});
System.register("state/Menu", ["state/BaseState", "utils/Constants", "mediator/MenuMediator"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
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
                Menu.prototype.preload = function () {
                    this.game.asset.loadAssets('required');
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
                    console.log("Play Pressed");
                };
                Menu.prototype._onStorePressed = function () {
                    console.log("Store Pressed");
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
            exports_16("default", Menu);
        }
    }
});
System.register("BoilerplateApplication", ["dijon/application", "dijon/core", "dijon/utils", "dijon/mvc", "mediator/ApplicationMediator", "utils/Constants", "state/Boot", "state/Preload", "state/Menu", "model/GameModel"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var application_3, core_2, utils_2, mvc_3, ApplicationMediator_1, Constants_4, Boot_1, Preload_1, Menu_1, GameModel_2;
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
            function (Constants_4_1) {
                Constants_4 = Constants_4_1;
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
            function (GameModel_2_1) {
                GameModel_2 = GameModel_2_1;
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
                    this.game.state.start(Constants_4.default.STATE_BOOT);
                };
                BoilerplateApplication.prototype.adjustScaleSettings = function () {
                    if (utils_2.Device.cocoon) {
                        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                        this.game.scale.pageAlignHorizontally = true;
                        this.game.scale.pageAlignVertically = true;
                    }
                    else {
                        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                        this.game.scale.setMinMax(256, 192, 1024, 768);
                        this.game.scale.pageAlignHorizontally = true;
                    }
                };
                BoilerplateApplication.prototype.adjustRendererSettings = function () {
                    this.game.stage.disableVisibilityChange = true;
                    this.game.forceSingleUpdate = true;
                    this.game.camera.roundPx = false;
                    this.game.renderer.renderSession.roundPixels = false;
                    this.game.antialias = true;
                    this.game.renderer.clearBeforeRender = this.game.renderType === Phaser.CANVAS;
                };
                BoilerplateApplication.prototype.registerModels = function () {
                    var gameModel = new GameModel_2.GameModel('game_data');
                    var copyModel = new mvc_3.CopyModel('copy');
                };
                BoilerplateApplication.prototype.preloadComplete = function () {
                };
                BoilerplateApplication.prototype._addStates = function () {
                    this.game.state.add(Constants_4.default.STATE_BOOT, Boot_1.default);
                    this.game.state.add(Constants_4.default.STATE_PRELOAD, Preload_1.default);
                    this.game.state.add(Constants_4.default.STATE_MENU, Menu_1.default);
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
            exports_17("default", BoilerplateApplication);
        }
    }
});
System.register("bootstrap", ["BoilerplateApplication"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var BoilerPlateApplication_1;
    var app;
    return {
        setters:[
            function (BoilerPlateApplication_1_1) {
                BoilerPlateApplication_1 = BoilerPlateApplication_1_1;
            }],
        execute: function() {
            exports_18("app", app = new BoilerPlateApplication_1.default());
        }
    }
});
System.register("ui/Preloader", ['dijon/display'], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var display_4;
    var Preloader;
    return {
        setters:[
            function (display_4_1) {
                display_4 = display_4_1;
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
            }(display_4.Group));
            exports_19("default", Preloader);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwiZGlzcGxheS9SSFByZWZhYi50cyIsImRpc3BsYXkvUkhUZXh0LnRzIiwiZGlzcGxheS9SSEJ1dHRvbi50cyIsInN0YXRlL0Jhc2VTdGF0ZS50cyIsIm1lZGlhdG9yL0Jvb3RNZWRpYXRvci50cyIsInN0YXRlL0Jvb3QudHMiLCJtZWRpYXRvci9QcmVsb2FkTWVkaWF0b3IudHMiLCJzdGF0ZS9QcmVsb2FkLnRzIiwibWVkaWF0b3IvTWVudU1lZGlhdG9yLnRzIiwic3RhdGUvTWVudS50cyIsIkJvaWxlcnBsYXRlQXBwbGljYXRpb24udHMiLCJib290c3RyYXAudHMiLCJ1aS9QcmVsb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUVBO2dCQUErQiw2QkFBSztnQkFBcEM7b0JBQStCLDhCQUFLO2dCQVVwQyxDQUFDO2dCQVBHLHNCQUFXLDJCQUFJO3lCQUFmO3dCQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO29CQUNoQyxDQUFDOzs7bUJBQUE7Z0JBRU0sZ0NBQVksR0FBbkIsVUFBb0IsSUFBWTtvQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBUmEsb0JBQVUsR0FBVyxXQUFXLENBQUM7Z0JBU25ELGdCQUFDO1lBQUQsQ0FWQSxBQVVDLENBVjhCLFdBQUssR0FVbkM7WUFWRCxpQ0FVQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNQRDtnQkFBMEMsZ0NBQVE7Z0JBQWxEO29CQUEwQyw4QkFBUTtnQkF3QmxELENBQUM7Z0JBckJVLDhCQUFPLEdBQWQsVUFBZSxPQUFlLEVBQUUsTUFBYztvQkFDMUMs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QkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsQ0FBQztnQkF0RU0sY0FBSSxHQUFXLENBQUMsQ0FBQztnQkFDakIsZ0JBQU0sR0FBVyxDQUFDLENBQUM7Z0JBc0U5QixnQkFBQztZQUFELENBeEVBLEFBd0VDLENBeEVzQyxlQUFLLEdBd0UzQztZQXhFRCxnQ0F3RUMsQ0FBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsfSBmcm9tICdkaWpvbi9tdmMnO1xuXG5leHBvcnQgY2xhc3MgR2FtZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIHB1YmxpYyBzdGF0aWMgTU9ERUxfTkFNRTogc3RyaW5nID0gXCJnYW1lTW9kZWxcIjtcblxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gR2FtZU1vZGVsLk1PREVMX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExldmVsRGF0YShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZWRpYXRvciwgQ29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcblxuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuLi9tb2RlbC9HYW1lTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU1lZGlhdG9yIGV4dGVuZHMgTWVkaWF0b3Ige1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gc28gYW55IG1lZGlhdG9yIGV4dGVuZGluZyBCYXNlTWVkaWF0b3IgY2FuIGdldCBjb3B5XG4gICAgcHVibGljIGdldENvcHkoZ3JvdXBJZDogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlNb2RlbC5nZXRDb3B5KGdyb3VwSWQsIHRleHRJZCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgLy8gb2ZmZXIgYWNjZXNzIHRvIHRoZSBHYW1lTW9kZWwgYW5kIENvcHlNb2RlbCBmcm9tIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yXG4gICAgcHVibGljIGdldCBnYW1lTW9kZWwoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lTW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvcHlNb2RlbCgpOiBDb3B5TW9kZWwge1xuICAgICAgICByZXR1cm4gPENvcHlNb2RlbD5BcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTW9kZWwoQ29weU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1ZXN0U3RhdGVDaGFuZ2UobmV3U3RhdGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhuZXdTdGF0ZSwgdGhpcy5nYW1lTW9kZWwuZ2V0TGV2ZWxEYXRhKG5ld1N0YXRlKSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwiYmFzZU1lZGlhdG9yX1wiICsgdGhpcy5nYW1lLnJuZC51dWlkKCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50cyB7XG4gICAgc3RhdGljIFNUQVRFX0JPT1Q6IHN0cmluZyA9ICdib290JztcbiAgICBzdGF0aWMgU1RBVEVfUFJFTE9BRDogc3RyaW5nID0gJ3ByZWxvYWQnO1xuICAgIHN0YXRpYyBTVEFURV9NRU5VOiBzdHJpbmcgPSAnbWVudSc7XG4gICAgLy8gZm9udHNcbiAgICBzdGF0aWMgRk9OVF9LT01JS0FYOiBzdHJpbmcgPSAna29taWtheCc7XG4gICAgc3RhdGljIEZPTlRfUkFMRVdBWTogc3RyaW5nID0gJ3JhbGV3YXknO1xuXG4gICAgc3RhdGljIFNUUl9CTFVFOiBzdHJpbmcgPSAnIzAwOTllNic7XG4gICAgc3RhdGljIFNUUl9ORVdfVElUTEU6IHN0cmluZyA9ICcjZmZmZmZmJztcbiAgICBzdGF0aWMgU1RSX0JUTl9IT1ZFUjogc3RyaW5nID0gJyNjY2ZmY2MnO1xuICAgIHN0YXRpYyBTVFJfQlROX05PUk1BTDogc3RyaW5nID0gJyM2NjY2OTknO1xuXG4gICAgc3RhdGljIE5VTV9PUkFOR0VfQk9SREVSOiBudW1iZXIgPSAweGZmYjg2NjtcbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1g6IG51bWJlciA9IDB4ZTY3YTAwO1xuXG4gICAgc3RhdGljIEJVVFRPTl9OT1JNQUw6IG51bWJlciA9IDB4ZTZlNmU2O1xuICAgIHN0YXRpYyBCVVRUT05fSE9WRVI6IG51bWJlciA9IDB4ZmY5NDFhO1xuICAgIHN0YXRpYyBCVVRUT05fRE9XTjogbnVtYmVyID0gMHgwMGFhZmY7XG5cbiAgICBzdGF0aWMgU0ZYX0VOQUJMRUQ6IGJvb2xlYW4gPSB0cnVlO1xufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbnMge1xuICAgIHN0YXRpYyBCT09UX0lOSVQ6IHN0cmluZyA9ICdib290SW5pdCc7XG4gICAgc3RhdGljIEJPT1RfQ09NUExFVEU6IHN0cmluZyA9ICdib290Q29tcGxldGUnO1xuICAgIHN0YXRpYyBQUkVMT0FEX0NPTVBMRVRFOiBzdHJpbmcgPSAncHJlbG9hZENvbXBsZXRlJztcbn0iLCJpbXBvcnQge0xvZ2dlcn0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5cbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgQm9pbGVycGxhdGVBcHBsaWNhdGlvbiBmcm9tICcuLi9Cb2lsZXJwbGF0ZUFwcGxpY2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25NZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnQXBwbGljYXRpb25NZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEVcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBJTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkJPT1RfSU5JVDpcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMsICdOb3RpZmljYXRpb25zLkJPT1RfSU5JVCcpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5hZGp1c3RTY2FsZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmFkanVzdFJlbmRlcmVyU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYWRkUGx1Z2lucygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuUFJFTE9BRF9DT01QTEVURTpcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQucHJlbG9hZENvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFOlxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codGhpcywgJ05vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hc3NldC5zZXREYXRhKHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdhc3NldHMnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnJlZ2lzdGVyTW9kZWxzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRyYW5zaXRpb24udG8oQ29uc3RhbnRzLlNUQVRFX1BSRUxPQUQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCB2aWV3Q29tcG9uZW50KCk6IEJvaWxlcnBsYXRlQXBwbGljYXRpb24ge1xuICAgICAgICByZXR1cm4gPEJvaWxlcnBsYXRlQXBwbGljYXRpb24+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXBwbGljYXRpb25NZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElQcmVmYWJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWZhYiBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9LCBkYXRhOiBJUHJlZmFiRGF0YSkge1xuICAgICAgICBzdXBlcihwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBkYXRhLnByb3Aua2V5LCBkYXRhLnByb3AuZnJhbWUpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oZGF0YS5wcm9wLmFuY2hvci54LCBkYXRhLnByb3AuYW5jaG9yLnkpO1xuICAgICAgICB9ICAgXG4gICAgICAgIGlmIChkYXRhLnByb3Auc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUuc2V0VG8oZGF0YS5wcm9wLnNjYWxlLngsIGRhdGEucHJvcC5zY2FsZS55KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5wcm9wLmFuZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZGF0YS5wcm9wLmFuZ2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFRleHQgfSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7IElUZXh0RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWIgZXh0ZW5kcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGRhdGE6IElUZXh0RGF0YSkge1xuICAgICAgICBzdXBlcihwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIGRhdGEucHJvcC5jb3B5LFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnROYW1lLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRTaXplLFxuICAgICAgICAgICAgZGF0YS5wcm9wLmZvbnRDb2xvdXIsXG4gICAgICAgICAgICBkYXRhLnByb3AuYWxpZ24gPyBkYXRhLnByb3AuYWxpZ24gOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggIT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhdGEucHJvcC53cmFwV2lkdGggPyBkYXRhLnByb3Aud3JhcFdpZHRoIDogMCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgaWYgKGRhdGEucHJvcC5zaGFkb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KGRhdGEucHJvcC5zaGFkb3cueCwgZGF0YS5wcm9wLnNoYWRvdy55LCBkYXRhLnByb3Auc2hhZG93LmNvbG91cik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnZGlqb24vYXBwbGljYXRpb24nXG5pbXBvcnQge0dhbWV9IGZyb20gJ2Rpam9uL2NvcmUnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHsgSUJ1dHRvbkRhdGEsIElUZXh0Q29tcG9uZW50RGF0YSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSSEJ1dHRvbiBleHRlbmRzIFBoYXNlci5CdXR0b24ge1xuICAgIHByaXZhdGUgX2Rpc2FibGVkRnJhbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9lbmFibGVkRnJhbWU6IHN0cmluZztcblxuICAgIHByaXZhdGUgX25vcm1hbENvcHlDb2xvdXI6IHN0cmluZztcbiAgICBwcml2YXRlIF9ob3ZlckNvcHlDb2xvdXI6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2xhYmVsOiBUZXh0O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgZGF0YTogSUJ1dHRvbkRhdGEpIHtcbiAgICAgICAgc3VwZXIoQXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5nYW1lLFxuICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBkYXRhLnByb3Aua2V5LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBkYXRhLnByb3AuZnJhbWUgKyAnX2hvdmVyJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfbm9ybWFsJyxcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfaG92ZXInLCBcbiAgICAgICAgICAgIGRhdGEucHJvcC5mcmFtZSArICdfbm9ybWFsJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuX2VuYWJsZWRGcmFtZSA9IGRhdGEucHJvcC5mcmFtZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWRGcmFtZSA9IGRhdGEucHJvcC5hbHRGcmFtZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5wcm9wLmFsdEZyYW1lIDogZGF0YS5wcm9wLmZyYW1lO1xuICAgICAgICB0aGlzLmZvcmNlT3V0ID0gZGF0YS5wcm9wLmZvcmNlT3V0ID8gZGF0YS5wcm9wLmZvcmNlT3V0IDogZmFsc2U7XG4gICAgICAgIHRoaXMuaW5wdXQudXNlSGFuZEN1cnNvciA9IGRhdGEucHJvcC51c2VIYW5kID8gZGF0YS5wcm9wLnVzZUhhbmQgOiB0cnVlO1xuXG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5jaG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyhkYXRhLnByb3AuYW5jaG9yLngsIGRhdGEucHJvcC5hbmNob3IueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQaXZvdChkYXRhLnByb3AucGl2b3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnByb3AuYW5nbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBkYXRhLnByb3AuYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucHJvcC50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRMYWJlbChkYXRhLnByb3AudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2FkZExhYmVsKGRhdGE6IElUZXh0Q29tcG9uZW50RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgc3ViUG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IGRhdGEucG9zaXRpb24ueCwgeTogZGF0YS5wb3NpdGlvbi55IH07XG4gICAgICAgIHRoaXMuX25vcm1hbENvcHlDb2xvdXIgPSBkYXRhLmZvbnRDb2xvdXI7XG4gICAgICAgIHRoaXMuX2hvdmVyQ29weUNvbG91ciA9IGRhdGEuYWx0Q29sb3VyID8gZGF0YS5hbHRDb2xvdXIgOiBkYXRhLmZvbnRDb2xvdXI7XG4gICAgICAgIGlmIChkYXRhLnBvc2l0aW9uLnggPiAwICYmIGRhdGEucG9zaXRpb24ueCA8IDEpIHtcbiAgICAgICAgICAgIHN1YlBvcy54ID0gdGhpcy5yZWFsV2lkdGggKiBkYXRhLnBvc2l0aW9uLng7XG4gICAgICAgICAgICBzdWJQb3MueSA9IHRoaXMucmVhbEhlaWdodCAqIGRhdGEucG9zaXRpb24ueTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBUZXh0KHN1YlBvcy54LCBzdWJQb3MueSwgZGF0YS5jb3B5LCBkYXRhLmZvbnROYW1lLCBkYXRhLmZvbnRTaXplLCBkYXRhLmZvbnRDb2xvdXIgPyBkYXRhLmZvbnRDb2xvdXIgOiAnI2ZmZmZmZicsIGRhdGEuYWxpZ24gPyBkYXRhLmFsaWduIDogJ2NlbnRlcicpO1xuICAgICAgICBpZiAoZGF0YS5hbmNob3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLmFuY2hvci5zZXRUbyhkYXRhLmFuY2hvci54LCBkYXRhLmFuY2hvci55KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5waXZvdCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0UGl2b3QoZGF0YS5waXZvdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9sYWJlbCk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyB0b2dnbGVFbmFibGVkRnJhbWUoaXNFbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQmFzZUZyYW1lKHRoaXMuX2VuYWJsZWRGcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJhc2VGcmFtZSh0aGlzLl9kaXNhYmxlZEZyYW1lKTtcbiAgICAgICAgfVxuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgb25JbnB1dERvd25IYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dERvd25IYW5kbGVyKHNwcml0ZSwgcG9pbnRlcik7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwuc2V0Q29sb3IodGhpcy5faG92ZXJDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0T3ZlckhhbmRsZXIoc3ByaXRlOiBhbnksIHBvaW50ZXI6IGFueSk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbklucHV0T3ZlckhhbmRsZXIoc3ByaXRlLCBwb2ludGVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ob3ZlckNvcHlDb2xvdXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5wdXRPdXRIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25JbnB1dE91dEhhbmRsZXIoc3ByaXRlLCBwb2ludGVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ub3JtYWxDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH0gIFxuICAgIFxuICAgIHB1YmxpYyBvbklucHV0VXBIYW5kbGVyKHNwcml0ZTogYW55LCBwb2ludGVyOiBhbnksIGlzT3ZlcjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBzdXBlci5vbklucHV0VXBIYW5kbGVyKHNwcml0ZSwgcG9pbnRlciwgaXNPdmVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5zZXRDb2xvcih0aGlzLl9ub3JtYWxDb3B5Q29sb3VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVCYXNlRnJhbWUoYmFzZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0RnJhbWVzKGJhc2UgKyAnX2hvdmVyJywgYmFzZSArICdfbm9ybWFsJywgYmFzZSArICdfaG92ZXInLCBiYXNlICsgJ19ub3JtYWwnKTtcbiAgICB9ICBcbiAgICBcbiAgICBwdWJsaWMgZ2V0IGRnYW1lKCk6IEdhbWUge1xuICAgICAgICByZXR1cm4gPEdhbWU+dGhpcy5nYW1lO1xuICAgIH1cbn0iLCJpbXBvcnQge1N0YXRlfSBmcm9tIFwiZGlqb24vY29yZVwiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQmFzZU1lZGlhdG9yXCI7XG5pbXBvcnQgeyBJU2NlbmVEYXRhIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XG5pbXBvcnQgUkhQcmVmYWIgZnJvbSAnLi4vZGlzcGxheS9SSFByZWZhYic7XG5pbXBvcnQgUkhUZXh0IGZyb20gJy4uL2Rpc3BsYXkvUkhUZXh0JztcbmltcG9ydCBSSEJ1dHRvbiBmcm9tICcuLi9kaXNwbGF5L1JIQnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIHB1YmxpYyBwcmVmYWJDbGFzc2VzOiB7fSA9IHtcbiAgICAgICAgcHJlZmFiOiBSSFByZWZhYixcbiAgICAgICAgdGV4dDogUkhUZXh0LFxuICAgICAgICBidXR0b246IFJIQnV0dG9uXG4gICAgfTtcbiAgICBwdWJsaWMgcHJlZmFiczoge307XG4gICAgcHVibGljIGdyb3Vwczoge307XG4gICAgcHVibGljIF9sZXZlbERhdGE6IElTY2VuZURhdGEgPSBudWxsO1xuXG4gICAgcHVibGljIGluaXQobGV2ZWxEYXRhOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xldmVsRGF0YSA9IGxldmVsRGF0YTtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucHJlbG9hZCgpO1xuICAgICAgICBpZiAodGhpcy5fbGV2ZWxEYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEFzc2V0cyh0aGlzLl9sZXZlbERhdGEuYXNzZXRFbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ3JvdXBfbmFtZSwgcHJlZmFiX25hbWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLnByZWZhYnMgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5fbGV2ZWxEYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZ3JvdXAgZGF0YS5cbiAgICAgICAgICAgIHRoaXMuX2xldmVsRGF0YS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBfbmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwX25hbWVdID0gdGhpcy5nYW1lLmFkZC5kR3JvdXAoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgcHJlZmFiIGRhdGEuXG4gICAgICAgICAgICBmb3IgKGxldCBwcmVmYWJOYW1lIGluIHRoaXMuX2xldmVsRGF0YS5wcmVmYWJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xldmVsRGF0YS5wcmVmYWJzLmhhc093blByb3BlcnR5KHByZWZhYk5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlUHJlZmFiKHByZWZhYk5hbWUsIHRoaXMuX2xldmVsRGF0YS5wcmVmYWJzW3ByZWZhYk5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVQcmVmYWIocHJlZmFiTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHByZWZhYlBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbGV0IHByZWZhYjogYW55O1xuICAgICAgICAvLyBjcmVhdGUgb2JqZWN0IGFjY29yZGluZyB0byBpdHMgdHlwZVxuICAgICAgICBpZiAodGhpcy5wcmVmYWJDbGFzc2VzLmhhc093blByb3BlcnR5KGRhdGEudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIElmIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiAwIGFuZCBsZXNzIHRoYW4gMSwgd2UgYXNzdW1lIHRoaXMgaXMgYSBmbG9hdGluZ1xuICAgICAgICAgICAgLy8gcG9pbnQgdmFsdWUgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSAlIGJhc2VkIHBvc2l0aW9uLlxuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24ueCA+IDAgJiYgZGF0YS5wb3NpdGlvbi54IDw9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiBhcyBwZXJjZW50YWdlXG4gICAgICAgICAgICAgICAgcHJlZmFiUG9zaXRpb24ueCA9IGRhdGEucG9zaXRpb24ueCAqIHRoaXMuZ2FtZS53b3JsZC53aWR0aDtcbiAgICAgICAgICAgICAgICBwcmVmYWJQb3NpdGlvbi55ID0gZGF0YS5wb3NpdGlvbi55ICogdGhpcy5nYW1lLndvcmxkLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWZhYlBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZWZhYiA9IG5ldyB0aGlzLnByZWZhYkNsYXNzZXNbZGF0YS50eXBlXShwcmVmYWJOYW1lLCBwcmVmYWJQb3NpdGlvbiwgZGF0YSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmdyb3VwICYmIHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KGRhdGEuZ3JvdXApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cHNbZGF0YS5ncm91cF0uYWRkQ2hpbGQocHJlZmFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcocHJlZmFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJlZmFic1twcmVmYWJOYW1lXSA9IHByZWZhYjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZmluZFByZWZhYihuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5wcmVmYWJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmYWJzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb290TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2Jvb3RNZWRpYXRvcic7XG5cdFx0XG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBvblJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5CT09UX0lOSVQpO1xuICAgIH1cblx0XHRcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIGNhbGxlZCBmcm9tIHZpZXdDb21wb25lbnRcbiAgICBwdWJsaWMgYm9vdENvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEJvb3RNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IEJvb3RNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQm9vdE1lZGlhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3QgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgQm9vdE1lZGlhdG9yKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICBpZiAod2luZG93Wyd2ZXJzaW9uJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmNhY2hlQnVzdFZlcnNpb24gPSAnQEB2ZXJzaW9uJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2dhbWVfZGF0YScpO1xuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2Fzc2V0cycpO1xuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2NvcHknKTtcbiAgICB9XG5cbiAgICAvLyBkaWpvbi5jb3JlLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ib290Q29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHByb3RlY3RlZCBnZXQgbWVkaWF0b3IoKTogQm9vdE1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxCb290TWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufSIsImltcG9ydCB7SU5vdGlmaWNhdGlvbn0gZnJvbSAnZGlqb24vaW50ZXJmYWNlcyc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWRNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAncHJlbG9hZE1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIGNhbGxlZCBmcm9tIFByZWxvYWQgc3RhdGVcblxuICAgIHB1YmxpYyBub3RpZnlQcmVsb2FkQ29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEUpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgbmV4dCgpOiB2b2lke1xuICAgICAgICB0aGlzLnJlcXVlc3RTdGF0ZUNoYW5nZShDb25zdGFudHMuU1RBVEVfTUVOVSk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFByZWxvYWRNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgUHJlbG9hZE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9QcmVsb2FkTWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBQcmVsb2FkTWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkQXNzZXRzKCdyZXF1aXJlZCcpO1xuICAgIH1cblx0XHRcbiAgICBwdWJsaWMgYnVpbGRJbnRlcmZhY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3Iubm90aWZ5UHJlbG9hZENvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMubWVkaWF0b3IubmV4dCgpO1xuICAgIH1cblx0XHRcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwcm90ZWN0ZWQgZ2V0IG1lZGlhdG9yKCk6IFByZWxvYWRNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8UHJlbG9hZE1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAiLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ21lbnVNZWRpYXRvcic7XG5cdFx0XG4gICAgcHVibGljIGdldCBhdWRpb1Nwcml0ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldERhdGEoKVsnYXVkaW9zcHJpdGUnXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxldmVsRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldExldmVsRGF0YSgnbWVudScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1lbnVNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IHtUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7UGxhY2Vob2xkZXJzfSBmcm9tICdkaWpvbi91dGlscyc7XG5pbXBvcnQgTWVudU1lZGlhdG9yIGZyb20gJy4uL21lZGlhdG9yL01lbnVNZWRpYXRvcic7XG5pbXBvcnQgUkhCdXR0b24gZnJvbSAnLi4vZGlzcGxheS9SSEJ1dHRvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIHByb3RlY3RlZCBfYnVpbGRDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByZXNldE5hbWU6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCBfdGl0bGU6IFBoYXNlci5UZXh0O1xuICAgIHByb3RlY3RlZCBfYmc6IFBoYXNlci5JbWFnZTtcblxuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdChsZXZlbERhdGE6IGFueSkge1xuICAgICAgICBzdXBlci5pbml0KGxldmVsRGF0YSk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IE1lbnVNZWRpYXRvcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEFzc2V0cygncmVxdWlyZWQnKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZGlqb24uY29yZS5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgbGlzdEJ1aWxkU2VxdWVuY2UoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLl9zZXR1cElucHV0RXZlbnRzXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJCdWlsZCgpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJCdWlsZCgpO1xuICAgICAgICB0aGlzLl9idWlsZENvbXBsZXRlID0gdHJ1ZTtcbiAgICB9IFxuICAgIFxuICAgIHB1YmxpYyBjbGVhclZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RpdGxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fYmcuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0dXBJbnB1dEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBsYXlCdG46IFJIQnV0dG9uID0gdGhpcy5fZmluZFByZWZhYihcImdhbWVfYnV0dG9uXCIpO1xuICAgICAgICBpZiAocGxheUJ0biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGxheUJ0bi5vbklucHV0RG93bi5hZGQodGhpcy5fb25QbGF5UHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgbGV0IHN0b3JlQnRuOiBSSEJ1dHRvbiA9IDxSSEJ1dHRvbj50aGlzLl9maW5kUHJlZmFiKFwic3RvcmVfYnV0dG9uXCIpO1xuICAgICAgICBpZiAoc3RvcmVCdG4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN0b3JlQnRuLm9uSW5wdXREb3duLmFkZCh0aGlzLl9vblN0b3JlUHJlc3NlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9hZGRWaXN1YWxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90aXRsZSA9IHRoaXMuZ2FtZS5hZGQuZFRleHQodGhpcy5yZWFsV2lkdGggKiAwLjUsIHRoaXMucmVhbEhlaWdodCAqIDAuMSwgJ0ZSVUlUIE5JTkpBJywgQ29uc3RhbnRzLkZPTlRfUkFMRVdBWSwgMzAsIENvbnN0YW50cy5TVFJfQkxVRSk7XG4gICAgICAgIHRoaXMuX3RpdGxlLmNlbnRlclBpdm90KCk7XG4gICAgfSAgXG5cbiAgICBwcml2YXRlIF9vblBsYXlQcmVzc2VkKCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXkgUHJlc3NlZFwiKTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJpdmF0ZSBfb25TdG9yZVByZXNzZWQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RvcmUgUHJlc3NlZFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b2dnbGVTRlgoKTogdm9pZCB7XG4gICAgICAgIENvbnN0YW50cy5TRlhfRU5BQkxFRCA9ICFDb25zdGFudHMuU0ZYX0VOQUJMRUQ7XG4gICAgfSAgICAgICBcblxuICAgIHB1YmxpYyBnZXQgcmVhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUud2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IE1lbnVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8TWVudU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSBcImRpam9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQge0dhbWV9IGZyb20gXCJkaWpvbi9jb3JlXCI7XG5pbXBvcnQge0RldmljZX0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0NvcHlNb2RlbH0gZnJvbSBcImRpam9uL212Y1wiO1xuXG5pbXBvcnQgQXBwbGljYXRpb25NZWRpYXRvciBmcm9tIFwiLi9tZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vdXRpbHMvTm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGUvQm9vdFwiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGUvUHJlbG9hZFwiO1xuaW1wb3J0IE1lbnUgZnJvbSBcIi4vc3RhdGUvTWVudVwiO1xuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuL21vZGVsL0dhbWVNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2lsZXJwbGF0ZUFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuICAgIHB1YmxpYyBnYW1lSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGVzXG4gICAgcHVibGljIGNyZWF0ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBHYW1lKHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9nZXRHYW1lV2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZ2V0R2FtZUhlaWdodCgpLFxuICAgICAgICAgICAgcGFyZW50OiAnZ2FtZS1jb250YWluZXInLFxuICAgICAgICAgICAgLy9yZW5kZXJlcjogUGhhc2VyLkNBTlZBUyxcbiAgICAgICAgICAgIHJlbmRlcmVyOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHVzZSB0aGlzIGlmIHlvdSB3YW50IHRvIHN3aXRjaCBiZXR3ZWVuIEAyeCBhbmQgQDF4IGdyYXBoaWNzXG4gICAgICAgICAgICByZXNvbHV0aW9uOiB0aGlzLl9nZXRSZXNvbHV0aW9uKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgQXBwbGljYXRpb25NZWRpYXRvcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkU3RhdGVzKCk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICBwdWJsaWMgc3RhcnRHYW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoQ29uc3RhbnRzLlNUQVRFX0JPT1QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGp1c3RTY2FsZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICBpZiAoRGV2aWNlLmNvY29vbikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnNldE1pbk1heCgyNTYsIDE5MiwgMTAyNCwgNzY4KTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkanVzdFJlbmRlcmVyU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZS5mb3JjZVNpbmdsZVVwZGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEucm91bmRQeCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUuYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcmVyLmNsZWFyQmVmb3JlUmVuZGVyID0gdGhpcy5nYW1lLnJlbmRlclR5cGUgPT09IFBoYXNlci5DQU5WQVM7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGZyb20gdGhlIGJvb3Qgc3RhdGUgYXMgd2UgY2FuJ3QgaW5pdGlhbGl6ZSBwbHVnaW5zIHVudGlsIHRoZSBnYW1lIGlzIGJvb3RlZFxuICAgIHB1YmxpYyByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVsID0gbmV3IEdhbWVNb2RlbCgnZ2FtZV9kYXRhJyk7XG4gICAgICAgIGNvbnN0IGNvcHlNb2RlbCA9IG5ldyBDb3B5TW9kZWwoJ2NvcHknKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZENvbXBsZXRlKCk6IHZvaWQge1xuXG4gICAgfSAgIFxuICAgIFxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIC8vIGFkZHMgc3RhdGVzXG4gICAgcHJpdmF0ZSBfYWRkU3RhdGVzKCkge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9CT09ULCBCb290KTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfUFJFTE9BRCwgUHJlbG9hZCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX01FTlUsIE1lbnUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEdhbWVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0R2FtZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJlc29sdXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJykgJiYgIWlzTmFOKEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJykpKSB7XG4gICAgICAgICAgICByZXR1cm4gQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRGV2aWNlLm1vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoRGV2aWNlLnBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQod2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVuZGVyZXJCeURldmljZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gRGV2aWNlLm1vYmlsZSAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgPyBQaGFzZXIuQ0FOVkFTIDogUGhhc2VyLkFVVE87XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbWVkaWF0b3IoKTogQXBwbGljYXRpb25NZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8QXBwbGljYXRpb25NZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGdhbWVNb2RlbCgpOiBHYW1lTW9kZWwge1xuICAgICAgICByZXR1cm4gPEdhbWVNb2RlbD50aGlzLnJldHJpZXZlTW9kZWwoR2FtZU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29weU1vZGVsKCk6IENvcHlNb2RlbCB7XG4gICAgICAgIHJldHVybiA8Q29weU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChDb3B5TW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9zdWJtb2R1bGVzL2Rpam9uL2J1aWxkL2Rpam9uLmQudHNcIi8+ICBcbmltcG9ydCBCb2lsZXJQbGF0ZUFwcGxpY2F0aW9uIGZyb20gJy4vQm9pbGVyUGxhdGVBcHBsaWNhdGlvbic7XG5cbi8vIGJvb3RzdHJhcCB0aGUgYXBwXG5leHBvcnQgY29uc3QgYXBwID0gbmV3IEJvaWxlclBsYXRlQXBwbGljYXRpb24oKTsiLCJpbXBvcnQge0dyb3VwLCBUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7SVByZWxvYWRIYW5kbGVyfSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZGVyIGV4dGVuZHMgR3JvdXAgaW1wbGVtZW50cyBJUHJlbG9hZEhhbmRsZXIge1xuICAgIHN0YXRpYyBURVNUOiBudW1iZXIgPSAxO1xuICAgIHN0YXRpYyBURVNUXzI6IG51bWJlciA9IDI7XG5cbiAgICBwcml2YXRlIF93aXBlcjogUGhhc2VyLkltYWdlO1xuICAgIHByaXZhdGUgX2xvYWRUZXh0OiBUZXh0O1xuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbkNvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcbiAgICBwdWJsaWMgdHJhbnNpdGlvbk91dENvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcblxuICAgIHByaXZhdGUgX2luVHdlZW46IFBoYXNlci5Ud2VlbjtcbiAgICBwcml2YXRlIF9vdXRUd2VlbjogUGhhc2VyLlR3ZWVuO1xuXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcih4LCB5LCBuYW1lLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBHcm91cCBvdmVycmlkZXNcbiAgICBwcm90ZWN0ZWQgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0ID0gdGhpcy5hZGRJbnRlcm5hbC5kVGV4dCg1MCwgNTAsICdMb2FkaW5nIC4uLiAnLCAnQXJpYWwnLCAzNiwgJyNGRkZGRkYnKTtcblxuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBnZnguYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcbiAgICAgICAgZ2Z4LmRyYXdSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgdGhpcy5fd2lwZXIgPSB0aGlzLmFkZEludGVybmFsLmltYWdlKDAsIDAsIGdmeC5nZW5lcmF0ZVRleHR1cmUoKSk7XG5cbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnJlbW92ZShnZngsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuYWxwaGEgPSAwO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IGFscGhhOiAxIH0sIDMwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0KTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDAgfSwgMjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbik7XG5cbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5vbkNvbXBsZXRlLmFkZCh0aGlzLl9pbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX291dCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gaVByZWxvYWRIYW5kbGVyIGltcGxlbWVudGF0aW9uc1xuICAgIHB1YmxpYyBsb2FkU3RhcnQoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJvdW5kZWRQcm9ncmVzcyA9IE1hdGgucm91bmQocHJvZ3Jlc3MpLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0LnNldFRleHQoJ0xvYWRpbmcgLi4uICcgKyByb3VuZGVkUHJvZ3Jlc3MgKyAnJScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkQ29tcGxldGUoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0KCkge1xuICAgICAgICB0aGlzLl9vdXRUd2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByb3RlY3RlZCBfaW4oKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkluQ29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX291dCgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbk91dENvbXBsZXRlLmRpc3BhdGNoKCk7XG4gICAgfVxufSJdfQ==
