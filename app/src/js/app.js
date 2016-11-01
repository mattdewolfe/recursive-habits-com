var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("model/GameModel", ['dijon/mvc'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mvc_1;
    var ETitleType, EShipType, GameModel;
    return {
        setters:[
            function (mvc_1_1) {
                mvc_1 = mvc_1_1;
            }],
        execute: function() {
            (function (ETitleType) {
                ETitleType[ETitleType["AdjNounPronoun"] = 0] = "AdjNounPronoun";
                ETitleType[ETitleType["AdjNounActionNoun"] = 1] = "AdjNounActionNoun";
                ETitleType[ETitleType["AdvHowAdjPro"] = 2] = "AdvHowAdjPro";
                ETitleType[ETitleType["AdvHowAdjVerb"] = 3] = "AdvHowAdjVerb";
                ETitleType[ETitleType["AdjPronoun"] = 4] = "AdjPronoun";
                ETitleType[ETitleType["PronounOfNoun"] = 5] = "PronounOfNoun";
                ETitleType[ETitleType["PronounOfAdjNoun"] = 6] = "PronounOfAdjNoun";
                ETitleType[ETitleType["Max"] = 7] = "Max";
            })(ETitleType || (ETitleType = {}));
            exports_1("ETitleType", ETitleType);
            (function (EShipType) {
                EShipType[EShipType["TheColourNoun"] = 0] = "TheColourNoun";
                EShipType[EShipType["TheColourEvent"] = 1] = "TheColourEvent";
                EShipType[EShipType["TitleOfNouns"] = 2] = "TitleOfNouns";
                EShipType[EShipType["TitleOfEmotion"] = 3] = "TitleOfEmotion";
                EShipType[EShipType["NounsEmotion"] = 4] = "NounsEmotion";
                EShipType[EShipType["TheColourTitle"] = 5] = "TheColourTitle";
                EShipType[EShipType["TitlesEvent"] = 6] = "TitlesEvent";
                EShipType[EShipType["EmotionTitle"] = 7] = "EmotionTitle";
                EShipType[EShipType["Max"] = 8] = "Max";
            })(EShipType || (EShipType = {}));
            exports_1("EShipType", EShipType);
            GameModel = (function (_super) {
                __extends(GameModel, _super);
                function GameModel() {
                    _super.apply(this, arguments);
                    this.lastType = EShipType.TheColourNoun;
                }
                Object.defineProperty(GameModel.prototype, "name", {
                    get: function () {
                        return GameModel.MODEL_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomPronoun", {
                    get: function () {
                        return this.insData.pronouns[Math.round(Math.random() * (this.insData.pronouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomAdjective", {
                    get: function () {
                        return this.insData.adjectives[Math.round(Math.random() * (this.insData.adjectives.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomNoun", {
                    get: function () {
                        return this.insData.nouns[Math.round(Math.random() * (this.insData.nouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomActionVerb", {
                    get: function () {
                        return this.insData.actionVerbs[Math.round(Math.random() * (this.insData.actionVerbs.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomAdverbHow", {
                    get: function () {
                        return this.insData.adverbsHow[Math.round(Math.random() * (this.insData.adverbsHow.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomActionNoun", {
                    get: function () {
                        return this.insData.actionNouns[Math.round(Math.random() * (this.insData.actionNouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomShipNoun", {
                    get: function () {
                        return this.shipData.noun[Math.round(Math.random() * (this.shipData.noun.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomShipTitle", {
                    get: function () {
                        return this.shipData.title[Math.round(Math.random() * (this.shipData.title.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomShipColour", {
                    get: function () {
                        return this.shipData.colour[Math.round(Math.random() * (this.shipData.colour.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomShipEvent", {
                    get: function () {
                        return this.shipData.event[Math.round(Math.random() * (this.shipData.event.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomShipEmotion", {
                    get: function () {
                        return this.shipData.emotion[Math.round(Math.random() * (this.shipData.emotion.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                GameModel.prototype.generateShipName = function () {
                    var newTitle;
                    switch (this.lastType) {
                        case EShipType.NounsEmotion:
                            newTitle = "The " + this.randomShipNoun.single + "'s " + this.randomShipEmotion;
                            break;
                        case EShipType.TheColourEvent:
                            newTitle = "The " + this.randomShipColour + " " + this.randomShipEvent;
                            break;
                        case EShipType.TheColourNoun:
                            newTitle = "The " + this.randomShipColour + " " + this.randomShipNoun.single;
                            break;
                        case EShipType.TheColourTitle:
                            newTitle = "The " + this.randomShipColour + " " + this.randomShipTitle.single;
                            break;
                        case EShipType.TitleOfEmotion:
                            newTitle = this.randomShipTitle.single + " of " + this.randomShipEmotion;
                            break;
                        case EShipType.TitleOfNouns:
                            newTitle = this.randomShipTitle.single + " of " + this.randomShipNoun.plural;
                            break;
                        case EShipType.TitlesEvent:
                            newTitle = this.randomShipTitle.single + "'s " + this.randomShipEvent;
                            break;
                        case EShipType.NounsEmotion:
                            newTitle = this.randomShipNoun.plural + " " + this.randomShipEmotion;
                            break;
                        case EShipType.EmotionTitle:
                            newTitle = this.randomShipEmotion + " " + this.randomShipTitle.single;
                            break;
                    }
                    this.lastType++;
                    if (this.lastType >= EShipType.Max) {
                        this.lastType = EShipType.TheColourNoun;
                    }
                    return newTitle;
                };
                GameModel.prototype.generateTitle = function () {
                    var newTitle = 'You...';
                    var type = (Math.round(Math.random() * (ETitleType.Max - 1)));
                    switch (type) {
                        case ETitleType.AdjNounPronoun:
                            newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                            break;
                        case ETitleType.AdvHowAdjPro:
                            newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomPronoun;
                            break;
                        case ETitleType.AdjPronoun:
                            newTitle = this.randomAdjective + ' ' + this.randomPronoun;
                            break;
                        case ETitleType.PronounOfNoun:
                            newTitle = this.randomPronoun + ' of ' + this.randomNoun.plural;
                            break;
                        case ETitleType.PronounOfAdjNoun:
                            newTitle = this.randomPronoun + ' of ' + this.randomAdjective + ' ' + this.randomNoun.plural;
                            break;
                        case ETitleType.AdvHowAdjVerb:
                            newTitle = this.randomAdverbHow + ' ' + this.randomAdjective + ' ' + this.randomActionNoun;
                            break;
                        case ETitleType.AdjNounActionNoun:
                            newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomActionNoun;
                            break;
                        default:
                            newTitle = this.randomAdjective + ' ' + this.randomNoun.single + ' ' + this.randomPronoun;
                            break;
                    }
                    return newTitle;
                };
                Object.defineProperty(GameModel.prototype, "shipData", {
                    get: function () {
                        return this._data['ships'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "insData", {
                    get: function () {
                        return this._data['insults'];
                    },
                    enumerable: true,
                    configurable: true
                });
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
                Constants.FONT_RALEWAY = 'Raleway';
                Constants.STR_BLUE = '#0099e6';
                Constants.STR_NEW_TITLE = '#ffffff';
                Constants.NUM_ORANGE_BORDER = 0xffb866;
                Constants.NUM_ORANGE_BOX = 0xe67a00;
                Constants.BUTTON_NORMAL = 0xe6e6e6;
                Constants.BUTTON_HOVER = 0xff941a;
                Constants.BUTTON_DOWN = 0x00aaff;
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
                Notifications.REQUEST_TTS_AUDIO = 'requestTTS';
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
                        Notifications_1.default.PRELOAD_COMPLETE,
                        Notifications_1.default.REQUEST_TTS_AUDIO
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
                        case Notifications_1.default.REQUEST_TTS_AUDIO:
                            if (this.game.sound.mute === false) {
                                var copy = notification.getBody();
                                this.viewComponent.ttsText(copy);
                            }
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
System.register("state/BaseState", ["dijon/core"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_1;
    var BaseState;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BaseState = (function (_super) {
                __extends(BaseState, _super);
                function BaseState() {
                    _super.apply(this, arguments);
                }
                return BaseState;
            }(core_1.State));
            exports_6("default", BaseState);
        }
    }
});
System.register("mediator/BootMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
            exports_7("default", BootMediator);
        }
    }
});
System.register("state/Boot", ["state/BaseState", "mediator/BootMediator"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("default", Boot);
        }
    }
});
System.register("mediator/PreloadMediator", ["utils/Constants", "mediator/BaseMediator", "utils/Notifications"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
                    this.game.transition.to(Constants_2.default.STATE_MENU);
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
            exports_9("default", PreloadMediator);
        }
    }
});
System.register("state/Preload", ["state/BaseState", "mediator/PreloadMediator"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
            exports_10("default", Preload);
        }
    }
});
System.register("mediator/MenuMediator", ["mediator/BaseMediator", "utils/Notifications"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var BaseMediator_4, Notifications_4;
    var MenuMediator;
    return {
        setters:[
            function (BaseMediator_4_1) {
                BaseMediator_4 = BaseMediator_4_1;
            },
            function (Notifications_4_1) {
                Notifications_4 = Notifications_4_1;
            }],
        execute: function() {
            MenuMediator = (function (_super) {
                __extends(MenuMediator, _super);
                function MenuMediator() {
                    _super.apply(this, arguments);
                }
                MenuMediator.prototype.getRandomTitle = function () {
                    return this.gameModel.generateTitle();
                };
                MenuMediator.prototype.getRandomShipTitle = function () {
                    return this.gameModel.generateShipName();
                };
                MenuMediator.prototype.requestTTSAudio = function (readText) {
                    this.sendNotification(Notifications_4.default.REQUEST_TTS_AUDIO, readText);
                };
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
                MenuMediator.MEDIATOR_NAME = 'menuMediator';
                return MenuMediator;
            }(BaseMediator_4.default));
            exports_11("default", MenuMediator);
        }
    }
});
System.register("state/Menu", ["state/BaseState", "utils/Constants", 'dijon/display', 'dijon/utils', "mediator/MenuMediator"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var BaseState_3, Constants_3, display_1, utils_2, MenuMediator_1;
    var Menu;
    return {
        setters:[
            function (BaseState_3_1) {
                BaseState_3 = BaseState_3_1;
            },
            function (Constants_3_1) {
                Constants_3 = Constants_3_1;
            },
            function (display_1_1) {
                display_1 = display_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (MenuMediator_1_1) {
                MenuMediator_1 = MenuMediator_1_1;
            }],
        execute: function() {
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.apply(this, arguments);
                    this._isGenerating = false;
                }
                Menu.prototype.init = function () {
                    this._mediator = new MenuMediator_1.default();
                    this._oldTitle = null;
                    this._newTitle = null;
                    this._fontSize = ((this.game.width + this.game.height) * 0.5) * 0.065;
                };
                Menu.prototype.preload = function () {
                    this.game.asset.loadAssets('required');
                };
                Menu.prototype.listBuildSequence = function () {
                    return [
                        this._buildBorders,
                        this._addVisuals
                    ];
                };
                Menu.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                };
                Menu.prototype._buildBorders = function () {
                    var gfx = this.game.add.graphics();
                    gfx.beginFill(Constants_3.default.NUM_ORANGE_BORDER, 0.8);
                    gfx.drawRoundedRect(5, 5, this.game.width - 10, this.game.height - 10, 10);
                    gfx.endFill();
                    gfx.beginFill(0x000000, 1.0);
                    gfx.drawRoundedRect(10, 10, this.game.width - 20, this.game.height - 20, 10);
                    gfx.endFill();
                    var bg = this.add.image(5, 5, gfx.generateTexture());
                    this.game.world.remove(gfx);
                };
                Menu.prototype._addVisuals = function () {
                    var title = this.game.add.dText(this.game.width * 0.5, this.game.height * 0.1, 'AND THE SHIP WAS NAMED...', Constants_3.default.FONT_RALEWAY, this._fontSize, Constants_3.default.STR_BLUE);
                    title.centerPivot();
                    var button = utils_2.Placeholders.button(this.game.width * 0.5, this.game.height * 0.35, this.game.width * 0.35, this.game.width * 0.1, false, 'PRESS ME', this._generateShipName, this);
                    button.centerPivot();
                    this.add.existing(button);
                };
                Menu.prototype._generateShipName = function () {
                    if (this._isGenerating === true) {
                        return;
                    }
                    this._isGenerating = true;
                    if (this._oldTitle !== null) {
                        this.game.add.tween(this._oldTitle).to({ y: this.game.height * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);
                        ;
                    }
                    var newCopy = this.mediator.getRandomShipTitle();
                    var newText = new display_1.Text(0, 0, newCopy.toUpperCase(), Constants_3.default.FONT_RALEWAY, this._fontSize, Constants_3.default.STR_NEW_TITLE, 'center', true, this.game.width);
                    newText.fontSize = this._fontSize * 0.8;
                    var gfx = this.game.add.graphics(-500, 0);
                    gfx.beginFill(Constants_3.default.NUM_ORANGE_BOX, 0.8);
                    gfx.drawRoundedRect(0, 0, newText.width * 20, newText.height + 20, 10);
                    gfx.endFill();
                    this._newTitle = this.add.image(this.game.width * 0.5, -500, gfx.generateTexture());
                    this._newTitle.alpha = 0;
                    this._newTitle.y = this.game.height * 0.7;
                    this.game.world.remove(gfx);
                    this._newTitle.setPivot('center');
                    newText.setPivot('center');
                    newText.x = this._newTitle.width * 0.5;
                    newText.y = this._newTitle.height * 0.5;
                    this._newTitle.addChild(newText);
                    this.game.add.tween(this._newTitle).to({ alpha: 1 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._setCurrentAsOld, this);
                    this.mediator.requestTTSAudio(newCopy);
                };
                Menu.prototype._generateNewName = function () {
                    if (this._isGenerating === true) {
                        return;
                    }
                    this._isGenerating = true;
                    if (this._oldTitle !== null) {
                        this.game.add.tween(this._oldTitle).to({ y: this.game.height * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);
                        ;
                    }
                    var newCopy = this.mediator.getRandomTitle();
                    var newText = new display_1.Text(0, 0, newCopy, Constants_3.default.FONT_RALEWAY, this._fontSize, Constants_3.default.STR_NEW_TITLE, 'center', true, this.game.width);
                    newText.fontSize = this._fontSize * 0.8;
                    var gfx = this.game.add.graphics(-500, 0);
                    gfx.beginFill(Constants_3.default.NUM_ORANGE_BOX, 0.8);
                    gfx.drawRoundedRect(0, 0, newText.width * 20, newText.height + 20, 10);
                    gfx.endFill();
                    this._newTitle = this.add.image(this.game.width * 0.5, this.game.height - 500, gfx.generateTexture());
                    this.game.world.remove(gfx);
                    this._newTitle.setPivot('center');
                    newText.setPivot('center');
                    newText.x = this._newTitle.width * 0.5;
                    newText.y = this._newTitle.height * 0.5;
                    this._newTitle.addChild(newText);
                    this.game.add.tween(this._newTitle).to({ y: this.game.height * 0.5 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._setCurrentAsOld, this);
                    this.mediator.requestTTSAudio(newCopy);
                };
                Menu.prototype._clearOldTitle = function () {
                    this._oldTitle.visible = false;
                };
                Menu.prototype._setCurrentAsOld = function () {
                    this._oldTitle = this._newTitle;
                    this._isGenerating = false;
                };
                Object.defineProperty(Menu.prototype, "mediator", {
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Menu;
            }(BaseState_3.default));
            exports_12("default", Menu);
        }
    }
});
System.register("BoilerplateApplication", ["dijon/application", "dijon/core", "dijon/utils", "dijon/mvc", "mediator/ApplicationMediator", "utils/Constants", "state/Boot", "state/Preload", "state/Menu", "model/GameModel"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var application_2, core_2, utils_3, mvc_3, ApplicationMediator_1, Constants_4, Boot_1, Preload_1, Menu_1, GameModel_2;
    var BoilerplateApplication;
    return {
        setters:[
            function (application_2_1) {
                application_2 = application_2_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (utils_3_1) {
                utils_3 = utils_3_1;
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
                BoilerplateApplication.prototype.preloadComplete = function () {
                    this.responsiveVoice = window['responsiveVoice'];
                    console.log(window);
                };
                BoilerplateApplication.prototype.ttsText = function (readText) {
                    if (readText !== null) {
                        this.responsiveVoice.speak(readText);
                    }
                };
                BoilerplateApplication.prototype.adjustScaleSettings = function () {
                    if (this.game.device.desktop) {
                        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                        this.game.scale.pageAlignHorizontally = true;
                    }
                    else {
                        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                    }
                    this.game.scale.refresh();
                };
                BoilerplateApplication.prototype.adjustRendererSettings = function () {
                    this.game.stage.disableVisibilityChange = true;
                    this.game.forceSingleUpdate = true;
                };
                BoilerplateApplication.prototype.registerModels = function () {
                    var gameModel = new GameModel_2.GameModel('game_data');
                    var copyModel = new mvc_3.CopyModel('copy');
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
                    if (application_2.Application.queryVar('resolution') && !isNaN(application_2.Application.queryVar('resolution'))) {
                        return application_2.Application.queryVar('resolution');
                    }
                    return utils_3.Device.mobile ? 1 : (window.devicePixelRatio > 1 ? 2 : 1);
                };
                BoilerplateApplication.prototype._getRendererByDevice = function () {
                    return utils_3.Device.mobile && window.devicePixelRatio < 2 ? Phaser.CANVAS : Phaser.AUTO;
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
            }(application_2.Application));
            exports_13("default", BoilerplateApplication);
        }
    }
});
System.register("bootstrap", ["BoilerplateApplication"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var BoilerPlateApplication_1;
    var app;
    return {
        setters:[
            function (BoilerPlateApplication_1_1) {
                BoilerPlateApplication_1 = BoilerPlateApplication_1_1;
            }],
        execute: function() {
            exports_14("app", app = new BoilerPlateApplication_1.default());
        }
    }
});
System.register("ui/Preloader", ['dijon/display'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var display_2;
    var Preloader;
    return {
        setters:[
            function (display_2_1) {
                display_2 = display_2_1;
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
            }(display_2.Group));
            exports_15("default", Preloader);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwic3RhdGUvQmFzZVN0YXRlLnRzIiwibWVkaWF0b3IvQm9vdE1lZGlhdG9yLnRzIiwic3RhdGUvQm9vdC50cyIsIm1lZGlhdG9yL1ByZWxvYWRNZWRpYXRvci50cyIsInN0YXRlL1ByZWxvYWQudHMiLCJtZWRpYXRvci9NZW51TWVkaWF0b3IudHMiLCJzdGF0ZS9NZW51LnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsInVpL1ByZWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBRUEsV0FBWSxVQUFVO2dCQUNsQiwrREFBa0IsQ0FBQTtnQkFDbEIscUVBQWlCLENBQUE7Z0JBQ2pCLDJEQUFZLENBQUE7Z0JBQ1osNkRBQWEsQ0FBQTtnQkFDYix1REFBVSxDQUFBO2dCQUNWLDZEQUFhLENBQUE7Z0JBQ2IsbUVBQWdCLENBQUE7Z0JBQ2hCLHlDQUFHLENBQUE7WUFDUCxDQUFDLEVBVFcsVUFBVSxLQUFWLFVBQVUsUUFTckI7Z0RBQUE7WUFXRCxXQUFZLFNBQVM7Z0JBQ2pCLDJEQUFhLENBQUE7Z0JBQ2IsNkRBQWMsQ0FBQTtnQkFDZCx5REFBWSxDQUFBO2dCQUNaLDZEQUFjLENBQUE7Z0JBQ2QseURBQVksQ0FBQTtnQkFDWiw2REFBYyxDQUFBO2dCQUNkLHVEQUFXLENBQUE7Z0JBQ1gseURBQVksQ0FBQTtnQkFDWix1Q0FBRyxDQUFBO1lBQ1AsQ0FBQyxFQVZXLFNBQVMsS0FBVCxTQUFTLFFBVXBCOzhDQUFBO1lBVUQ7Z0JBQStCLDZCQUFLO2dCQUFwQztvQkFBK0IsOEJBQUs7b0JBR3pCLGFBQVEsR0FBYyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQXVJ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RUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFHTSw2QkFBUyxHQUFoQjtnQkFDQSxDQUFDO2dCQUVNLGdDQUFZLEdBQW5CLFVBQW9CLFFBQWdCO29CQUNoQyxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUVNLGdDQUFZLEdBQW5CO2dCQUNBLENBQUM7Z0JBRU0sZ0NBQVksR0FBbkI7b0JBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzFCLENBQUM7Z0JBRU0saUNBQWEsR0FBcEI7b0JBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztnQkFHUyx1QkFBRyxHQUFiO29CQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekMsQ0FBQztnQkFFUyx3QkFBSSxHQUFkO29CQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNyQixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzFDLENBQUM7Z0JBdEVNLGNBQUksR0FBVyxDQUFDLENBQUM7Z0JBQ2pCLGdCQUFNLEdBQVcsQ0FBQyxDQUFDO2dCQXNFOUIsZ0JBQUM7WUFBRCxDQXhFQSxBQXdFQyxDQXhFc0MsZUFBSyxHQXdFM0M7WUF4RUQsZ0NBd0VDLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSAnZGlqb24vbXZjJztcblxuZXhwb3J0IGVudW0gRVRpdGxlVHlwZSB7XG4gICAgQWRqTm91blByb25vdW4gPSAwLCAvLyBBZGplY3RpdmUsIE5vdW4sIFByb25vdW4gXG4gICAgQWRqTm91bkFjdGlvbk5vdW4sIC8vIEFkamVjdGl2ZSwgTm91biwgVmVyYlxuICAgIEFkdkhvd0FkalBybyxcbiAgICBBZHZIb3dBZGpWZXJiLFxuICAgIEFkalByb25vdW4sXG4gICAgUHJvbm91bk9mTm91bixcbiAgICBQcm9ub3VuT2ZBZGpOb3VuLFxuICAgIE1heFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXb3JkRGF0YSB7XG4gICAgYWRqZWN0aXZlczogc3RyaW5nW107XG4gICAgbm91bnM6IHtzaW5nbGU6IHN0cmluZywgcGx1cmFsOiBzdHJpbmd9W107XG4gICAgYWN0aW9uVmVyYnM6IHN0cmluZ1tdO1xuICAgIHByb25vdW5zOiBzdHJpbmdbXTtcbiAgICBhZHZlcmJzSG93OiBzdHJpbmdbXTtcbiAgICBhY3Rpb25Ob3Vuczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBlbnVtIEVTaGlwVHlwZSB7XG4gICAgVGhlQ29sb3VyTm91bixcbiAgICBUaGVDb2xvdXJFdmVudCxcbiAgICBUaXRsZU9mTm91bnMsXG4gICAgVGl0bGVPZkVtb3Rpb24sXG4gICAgTm91bnNFbW90aW9uLFxuICAgIFRoZUNvbG91clRpdGxlLFxuICAgIFRpdGxlc0V2ZW50LFxuICAgIEVtb3Rpb25UaXRsZSxcbiAgICBNYXhcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2hpcERhdGEge1xuICAgIG5vdW46IHsgc2luZ2xlOiBzdHJpbmcsIHBsdXJhbDogc3RyaW5nIH1bXTtcbiAgICBlbW90aW9uOiBzdHJpbmdbXTtcbiAgICBjb2xvdXI6IHN0cmluZ1tdO1xuICAgIGV2ZW50OiBzdHJpbmdbXTtcbiAgICB0aXRsZTogeyBzaW5nbGU6IHN0cmluZywgcGx1cmFsOiBzdHJpbmcgfVtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIHB1YmxpYyBzdGF0aWMgTU9ERUxfTkFNRTogc3RyaW5nID0gXCJnYW1lTW9kZWxcIjtcblxuICAgIHB1YmxpYyBsYXN0VHlwZTogRVNoaXBUeXBlID0gRVNoaXBUeXBlLlRoZUNvbG91ck5vdW47XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEdhbWVNb2RlbC5NT0RFTF9OQU1FO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tUHJvbm91bigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNEYXRhLnByb25vdW5zW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLmluc0RhdGEucHJvbm91bnMubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJhbmRvbUFkamVjdGl2ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNEYXRhLmFkamVjdGl2ZXNbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuaW5zRGF0YS5hZGplY3RpdmVzLmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21Ob3VuKCk6IHtzaW5nbGU6IHN0cmluZywgcGx1cmFsOiBzdHJpbmd9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zRGF0YS5ub3Vuc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5pbnNEYXRhLm5vdW5zLmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21BY3Rpb25WZXJiKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc0RhdGEuYWN0aW9uVmVyYnNbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuaW5zRGF0YS5hY3Rpb25WZXJicy5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tQWR2ZXJiSG93KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc0RhdGEuYWR2ZXJic0hvd1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5pbnNEYXRhLmFkdmVyYnNIb3cubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJhbmRvbUFjdGlvbk5vdW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zRGF0YS5hY3Rpb25Ob3Vuc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5pbnNEYXRhLmFjdGlvbk5vdW5zLmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21TaGlwTm91bigpOiB7c2luZ2xlOiBzdHJpbmcsIHBsdXJhbDogc3RyaW5nfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBEYXRhLm5vdW5bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuc2hpcERhdGEubm91bi5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tU2hpcFRpdGxlKCk6IHtzaW5nbGU6IHN0cmluZywgcGx1cmFsOiBzdHJpbmd9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcERhdGEudGl0bGVbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuc2hpcERhdGEudGl0bGUubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJhbmRvbVNoaXBDb2xvdXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcERhdGEuY29sb3VyW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLnNoaXBEYXRhLmNvbG91ci5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tU2hpcEV2ZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBEYXRhLmV2ZW50W01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLnNoaXBEYXRhLmV2ZW50Lmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21TaGlwRW1vdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGlwRGF0YS5lbW90aW9uW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLnNoaXBEYXRhLmVtb3Rpb24ubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVTaGlwTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbmV3VGl0bGU6IHN0cmluZztcbiAgICAgICAgc3dpdGNoICh0aGlzLmxhc3RUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVTaGlwVHlwZS5Ob3Vuc0Vtb3Rpb246XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSBcIlRoZSBcIiArIHRoaXMucmFuZG9tU2hpcE5vdW4uc2luZ2xlICsgXCIncyBcIiArIHRoaXMucmFuZG9tU2hpcEVtb3Rpb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVTaGlwVHlwZS5UaGVDb2xvdXJFdmVudDpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IFwiVGhlIFwiICsgdGhpcy5yYW5kb21TaGlwQ29sb3VyICsgXCIgXCIgKyB0aGlzLnJhbmRvbVNoaXBFdmVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVNoaXBUeXBlLlRoZUNvbG91ck5vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSBcIlRoZSBcIiArIHRoaXMucmFuZG9tU2hpcENvbG91ciArIFwiIFwiICsgdGhpcy5yYW5kb21TaGlwTm91bi5zaW5nbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVTaGlwVHlwZS5UaGVDb2xvdXJUaXRsZTpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IFwiVGhlIFwiICsgdGhpcy5yYW5kb21TaGlwQ29sb3VyICsgXCIgXCIgKyB0aGlzLnJhbmRvbVNoaXBUaXRsZS5zaW5nbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVTaGlwVHlwZS5UaXRsZU9mRW1vdGlvbjpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IHRoaXMucmFuZG9tU2hpcFRpdGxlLnNpbmdsZSArIFwiIG9mIFwiICsgdGhpcy5yYW5kb21TaGlwRW1vdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVNoaXBUeXBlLlRpdGxlT2ZOb3VuczpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IHRoaXMucmFuZG9tU2hpcFRpdGxlLnNpbmdsZSArIFwiIG9mIFwiICsgdGhpcy5yYW5kb21TaGlwTm91bi5wbHVyYWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVTaGlwVHlwZS5UaXRsZXNFdmVudDpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IHRoaXMucmFuZG9tU2hpcFRpdGxlLnNpbmdsZSArIFwiJ3MgXCIgKyB0aGlzLnJhbmRvbVNoaXBFdmVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVNoaXBUeXBlLk5vdW5zRW1vdGlvbjpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IHRoaXMucmFuZG9tU2hpcE5vdW4ucGx1cmFsICsgXCIgXCIgKyB0aGlzLnJhbmRvbVNoaXBFbW90aW9uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFU2hpcFR5cGUuRW1vdGlvblRpdGxlOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21TaGlwRW1vdGlvbiArIFwiIFwiICsgdGhpcy5yYW5kb21TaGlwVGl0bGUuc2luZ2xlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdFR5cGUrKztcbiAgICAgICAgaWYgKHRoaXMubGFzdFR5cGUgPj0gRVNoaXBUeXBlLk1heCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0VHlwZSA9IEVTaGlwVHlwZS5UaGVDb2xvdXJOb3VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdUaXRsZTtcbiAgICB9IFxuICAgIFxuICAgIHB1YmxpYyBnZW5lcmF0ZVRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBuZXdUaXRsZTogc3RyaW5nID0gJ1lvdS4uLic7XG4gICAgICAgIGxldCB0eXBlOiBFVGl0bGVUeXBlID0gPEVUaXRsZVR5cGU+KE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChFVGl0bGVUeXBlLk1heCAtIDEpKSk7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVUaXRsZVR5cGUuQWRqTm91blByb25vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tTm91bi5zaW5nbGUgKyAnICcgKyB0aGlzLnJhbmRvbVByb25vdW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRVRpdGxlVHlwZS5BZHZIb3dBZGpQcm86XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkdmVyYkhvdyArICcgJyArIHRoaXMucmFuZG9tQWRqZWN0aXZlICsgJyAnICsgdGhpcy5yYW5kb21Qcm9ub3VuO1xuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcblxuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLkFkalByb25vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tUHJvbm91bjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLlByb25vdW5PZk5vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbVByb25vdW4gKyAnIG9mICcgKyB0aGlzLnJhbmRvbU5vdW4ucGx1cmFsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVUaXRsZVR5cGUuUHJvbm91bk9mQWRqTm91bjpcbiAgICAgICAgICAgICAgICBuZXdUaXRsZSA9IHRoaXMucmFuZG9tUHJvbm91biArICcgb2YgJyArIHRoaXMucmFuZG9tQWRqZWN0aXZlICsgJyAnICsgdGhpcy5yYW5kb21Ob3VuLnBsdXJhbDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLkFkdkhvd0FkalZlcmI6XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkdmVyYkhvdyArICcgJyArIHRoaXMucmFuZG9tQWRqZWN0aXZlICsgJyAnICsgdGhpcy5yYW5kb21BY3Rpb25Ob3VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIEVUaXRsZVR5cGUuQWRqTm91bkFjdGlvbk5vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tTm91bi5zaW5nbGUgKyAnICcgKyB0aGlzLnJhbmRvbUFjdGlvbk5vdW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tTm91bi5zaW5nbGUgKyAnICcgKyB0aGlzLnJhbmRvbVByb25vdW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1RpdGxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHNoaXBEYXRhKCk6IElTaGlwRGF0YSB7XG4gICAgICAgIHJldHVybiA8SVNoaXBEYXRhPnRoaXMuX2RhdGFbJ3NoaXBzJ107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaW5zRGF0YSgpOiBJV29yZERhdGEge1xuICAgICAgICByZXR1cm4gPElXb3JkRGF0YT50aGlzLl9kYXRhWydpbnN1bHRzJ107XG4gICAgfVxufSIsImltcG9ydCB7TWVkaWF0b3IsIENvcHlNb2RlbH0gZnJvbSBcImRpam9uL212Y1wiO1xuaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSBcImRpam9uL2FwcGxpY2F0aW9uXCI7XG5cbmltcG9ydCB7R2FtZU1vZGVsfSBmcm9tIFwiLi4vbW9kZWwvR2FtZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNZWRpYXRvciBleHRlbmRzIE1lZGlhdG9yIHtcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIHNvIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yIGNhbiBnZXQgY29weVxuICAgIHB1YmxpYyBnZXRDb3B5KGdyb3VwSWQ6IHN0cmluZywgdGV4dElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3B5TW9kZWwuZ2V0Q29weShncm91cElkLCB0ZXh0SWQpO1xuICAgIH1cblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIC8vIG9mZmVyIGFjY2VzcyB0byB0aGUgR2FtZU1vZGVsIGFuZCBDb3B5TW9kZWwgZnJvbSBhbnkgbWVkaWF0b3IgZXh0ZW5kaW5nIEJhc2VNZWRpYXRvclxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPkFwcGxpY2F0aW9uLmdldEluc3RhbmNlKCkucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcImJhc2VNZWRpYXRvcl9cIiArIHRoaXMuZ2FtZS5ybmQudXVpZCgpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudHMge1xuICAgIHN0YXRpYyBTVEFURV9CT09UOiBzdHJpbmcgPSAnYm9vdCc7XG4gICAgc3RhdGljIFNUQVRFX1BSRUxPQUQ6IHN0cmluZyA9ICdwcmVsb2FkJztcbiAgICBzdGF0aWMgU1RBVEVfTUVOVTogc3RyaW5nID0gJ21lbnUnO1xuICAgIC8vIGZvbnRzXG4gICAgc3RhdGljIEZPTlRfS09NSUtBWDogc3RyaW5nID0gJ2tvbWlrYXgnO1xuICAgIHN0YXRpYyBGT05UX1JBTEVXQVk6IHN0cmluZyA9ICdSYWxld2F5JztcblxuICAgIHN0YXRpYyBTVFJfQkxVRTogc3RyaW5nID0gJyMwMDk5ZTYnO1xuICAgIHN0YXRpYyBTVFJfTkVXX1RJVExFOiBzdHJpbmcgPSAnI2ZmZmZmZic7XG5cbiAgICBzdGF0aWMgTlVNX09SQU5HRV9CT1JERVI6IG51bWJlciA9IDB4ZmZiODY2O1xuICAgIHN0YXRpYyBOVU1fT1JBTkdFX0JPWDogbnVtYmVyID0gMHhlNjdhMDA7XG5cbiAgICBzdGF0aWMgQlVUVE9OX05PUk1BTDogbnVtYmVyID0gMHhlNmU2ZTY7XG4gICAgc3RhdGljIEJVVFRPTl9IT1ZFUjogbnVtYmVyID0gMHhmZjk0MWE7XG4gICAgc3RhdGljIEJVVFRPTl9ET1dOOiBudW1iZXIgPSAweDAwYWFmZjtcbiAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb25zIHtcbiAgICBzdGF0aWMgQk9PVF9JTklUOiBzdHJpbmcgPSAnYm9vdEluaXQnO1xuICAgIHN0YXRpYyBCT09UX0NPTVBMRVRFOiBzdHJpbmcgPSAnYm9vdENvbXBsZXRlJztcbiAgICBzdGF0aWMgUFJFTE9BRF9DT01QTEVURTogc3RyaW5nID0gJ3ByZWxvYWRDb21wbGV0ZSc7XG4gICAgXG4gICAgc3RhdGljIFJFUVVFU1RfVFRTX0FVRElPOiBzdHJpbmcgPSAncmVxdWVzdFRUUyc7XG59IiwiaW1wb3J0IHtMb2dnZXJ9IGZyb20gXCJkaWpvbi91dGlsc1wiO1xuaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tIFwiZGlqb24vaW50ZXJmYWNlc1wiO1xuXG5pbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi4vQm9pbGVycGxhdGVBcHBsaWNhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uTWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ0FwcGxpY2F0aW9uTWVkaWF0b3InO1xuXG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMuQk9PVF9JTklULFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5SRVFVRVNUX1RUU19BVURJT1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElOb3RpZmljYXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuQk9PVF9JTklUOlxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codGhpcywgJ05vdGlmaWNhdGlvbnMuQk9PVF9JTklUJyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmFkanVzdFNjYWxlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYWRqdXN0UmVuZGVyZXJTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5hZGRQbHVnaW5zKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5QUkVMT0FEX0NPTVBMRVRFOlxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5wcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LnNldERhdGEodGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2Fzc2V0cycpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQucmVnaXN0ZXJNb2RlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhDb25zdGFudHMuU1RBVEVfUFJFTE9BRCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5SRVFVRVNUX1RUU19BVURJTzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLnNvdW5kLm11dGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3B5OiBzdHJpbmcgPSA8c3RyaW5nPm5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC50dHNUZXh0KGNvcHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgdmlld0NvbXBvbmVudCgpOiBCb2lsZXJwbGF0ZUFwcGxpY2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIDxCb2lsZXJwbGF0ZUFwcGxpY2F0aW9uPnRoaXMuX3ZpZXdDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uTWVkaWF0b3IuTUVESUFUT1JfTkFNRTtcbiAgICB9XG59IiwiaW1wb3J0IHtTdGF0ZX0gZnJvbSBcImRpam9uL2NvcmVcIjtcbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL0Jhc2VNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG59XG4iLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb290TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ2Jvb3RNZWRpYXRvcic7XG5cdFx0XG4gICAgLy8gZGlqb24ubXZjLk1lZGlhdG9yIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBvblJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5CT09UX0lOSVQpO1xuICAgIH1cblx0XHRcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIGNhbGxlZCBmcm9tIHZpZXdDb21wb25lbnRcbiAgICBwdWJsaWMgYm9vdENvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oTm90aWZpY2F0aW9ucy5CT09UX0NPTVBMRVRFKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEJvb3RNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IEJvb3RNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQm9vdE1lZGlhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3QgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICAgIC8vIFBoYXNlci5TdGF0ZSBvdmVycmlkZXNcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgQm9vdE1lZGlhdG9yKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkKCk6IHZvaWQge1xuICAgICAgICBpZiAod2luZG93Wyd2ZXJzaW9uJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmNhY2hlQnVzdFZlcnNpb24gPSAnQEB2ZXJzaW9uJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2dhbWVfZGF0YScpO1xuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2Fzc2V0cycpO1xuICAgICAgICB0aGlzLmdhbWUuYXNzZXQubG9hZEpTT04oJ2NvcHknKTtcbiAgICB9XG5cbiAgICAvLyBkaWpvbi5jb3JlLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ib290Q29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcblxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHByb3RlY3RlZCBnZXQgbWVkaWF0b3IoKTogQm9vdE1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxCb290TWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufSIsImltcG9ydCB7SU5vdGlmaWNhdGlvbn0gZnJvbSAnZGlqb24vaW50ZXJmYWNlcyc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWRNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAncHJlbG9hZE1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgIC8vIGNhbGxlZCBmcm9tIFByZWxvYWQgc3RhdGVcblxuICAgIHB1YmxpYyBub3RpZnlQcmVsb2FkQ29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEUpO1xuICAgIH0gICBcbiAgICBcbiAgICBwdWJsaWMgbmV4dCgpOiB2b2lke1xuICAgICAgICB0aGlzLmdhbWUudHJhbnNpdGlvbi50byhDb25zdGFudHMuU1RBVEVfTUVOVSk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFByZWxvYWRNZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQgQmFzZVN0YXRlIGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgUHJlbG9hZE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9QcmVsb2FkTWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBQcmVsb2FkTWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkQXNzZXRzKCdyZXF1aXJlZCcpO1xuICAgIH1cblx0XHRcbiAgICBwdWJsaWMgYnVpbGRJbnRlcmZhY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWF0b3Iubm90aWZ5UHJlbG9hZENvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMubWVkaWF0b3IubmV4dCgpO1xuICAgIH1cblx0XHRcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwcm90ZWN0ZWQgZ2V0IG1lZGlhdG9yKCk6IFByZWxvYWRNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8UHJlbG9hZE1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAiLCJpbXBvcnQgQmFzZU1lZGlhdG9yIGZyb20gJy4vQmFzZU1lZGlhdG9yJztcbmltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJy4uL3V0aWxzL05vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHtFVGl0bGVUeXBlfSBmcm9tICcuLi9tb2RlbC9nYW1lTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TWVkaWF0b3IgZXh0ZW5kcyBCYXNlTWVkaWF0b3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgTUVESUFUT1JfTkFNRTogc3RyaW5nID0gJ21lbnVNZWRpYXRvcic7XG5cdFx0XG4gICAgcHVibGljIGdldFJhbmRvbVRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNb2RlbC5nZW5lcmF0ZVRpdGxlKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXRSYW5kb21TaGlwVGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdlbmVyYXRlU2hpcE5hbWUoKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHJlcXVlc3RUVFNBdWRpbyhyZWFkVGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLlJFUVVFU1RfVFRTX0FVRElPLCByZWFkVGV4dCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhdWRpb1Nwcml0ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldERhdGEoKVsnYXVkaW9zcHJpdGUnXTtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gTWVudU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBNZW51TWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvTWVudU1lZGlhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIEJhc2VTdGF0ZSB7XG5cbiAgICBwcm90ZWN0ZWQgX2lzR2VuZXJhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfb2xkVGl0bGU6IFBoYXNlci5JbWFnZTtcbiAgICBwcm90ZWN0ZWQgX25ld1RpdGxlOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJvdGVjdGVkIF9mb250U2l6ZTogbnVtYmVyO1xuXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBNZW51TWVkaWF0b3IoKTtcbiAgICAgICAgdGhpcy5fb2xkVGl0bGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9uZXdUaXRsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gKCh0aGlzLmdhbWUud2lkdGggKyB0aGlzLmdhbWUuaGVpZ2h0KSAqIDAuNSkgKiAwLjA2NTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCb3JkZXJzLFxuICAgICAgICAgICAgdGhpcy5fYWRkVmlzdWFsc1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfYnVpbGRCb3JkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBnZnguYmVnaW5GaWxsKENvbnN0YW50cy5OVU1fT1JBTkdFX0JPUkRFUiwgMC44KTtcbiAgICAgICAgZ2Z4LmRyYXdSb3VuZGVkUmVjdCg1LCA1LCB0aGlzLmdhbWUud2lkdGggLSAxMCwgdGhpcy5nYW1lLmhlaWdodCAtIDEwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoMHgwMDAwMDAsIDEuMCk7XG4gICAgICAgIGdmeC5kcmF3Um91bmRlZFJlY3QoMTAsIDEwLCB0aGlzLmdhbWUud2lkdGggLSAyMCwgdGhpcy5nYW1lLmhlaWdodCAtIDIwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgbGV0IGJnID0gdGhpcy5hZGQuaW1hZ2UoNSwgNSwgZ2Z4LmdlbmVyYXRlVGV4dHVyZSgpKTtcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnJlbW92ZShnZngpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgX2FkZFZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIGxldCB0aXRsZSA9IHRoaXMuZ2FtZS5hZGQuZFRleHQodGhpcy5nYW1lLndpZHRoICogMC41LCB0aGlzLmdhbWUuaGVpZ2h0ICogMC4xLCAnQU5EIFRIRSBTSElQIFdBUyBOQU1FRC4uLicsIENvbnN0YW50cy5GT05UX1JBTEVXQVksIHRoaXMuX2ZvbnRTaXplLCBDb25zdGFudHMuU1RSX0JMVUUpO1xuICAgICAgICB0aXRsZS5jZW50ZXJQaXZvdCgpO1xuXG4gICAgICAgIGxldCBidXR0b24gPSBQbGFjZWhvbGRlcnMuYnV0dG9uKHRoaXMuZ2FtZS53aWR0aCAqIDAuNSwgdGhpcy5nYW1lLmhlaWdodCAqIDAuMzUsIHRoaXMuZ2FtZS53aWR0aCAqIDAuMzUsIHRoaXMuZ2FtZS53aWR0aCAqIDAuMSwgZmFsc2UsICdQUkVTUyBNRScsIHRoaXMuX2dlbmVyYXRlU2hpcE5hbWUsIHRoaXMpO1xuICAgICAgICBidXR0b24uY2VudGVyUGl2b3QoKTtcbiAgICAgICAgdGhpcy5hZGQuZXhpc3RpbmcoYnV0dG9uKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZW5lcmF0ZVNoaXBOYW1lKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNHZW5lcmF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNHZW5lcmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX29sZFRpdGxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuX29sZFRpdGxlKS50byh7IHk6IHRoaXMuZ2FtZS5oZWlnaHQgKiAxLjI1IH0sIDM1MCwgUGhhc2VyLkVhc2luZy5DdWJpYy5PdXQsIHRydWUpLm9uQ29tcGxldGUuYWRkT25jZSh0aGlzLl9jbGVhck9sZFRpdGxlLCB0aGlzKTs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0NvcHkgPSB0aGlzLm1lZGlhdG9yLmdldFJhbmRvbVNoaXBUaXRsZSgpO1xuICAgICAgICBsZXQgbmV3VGV4dCA9IG5ldyBUZXh0KDAsIDAsIG5ld0NvcHkudG9VcHBlckNhc2UoKSwgQ29uc3RhbnRzLkZPTlRfUkFMRVdBWSwgdGhpcy5fZm9udFNpemUsIENvbnN0YW50cy5TVFJfTkVXX1RJVExFLCAnY2VudGVyJywgdHJ1ZSwgdGhpcy5nYW1lLndpZHRoKTtcbiAgICAgICAgbmV3VGV4dC5mb250U2l6ZSA9IHRoaXMuX2ZvbnRTaXplICogMC44O1xuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygtNTAwLCAwKTtcbiAgICAgICAgZ2Z4LmJlZ2luRmlsbChDb25zdGFudHMuTlVNX09SQU5HRV9CT1gsIDAuOCk7XG4gICAgICAgIGdmeC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgbmV3VGV4dC53aWR0aCAqIDIwLCBuZXdUZXh0LmhlaWdodCArIDIwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgdGhpcy5fbmV3VGl0bGUgPSB0aGlzLmFkZC5pbWFnZSh0aGlzLmdhbWUud2lkdGggKiAwLjUsICAtNTAwLCBnZnguZ2VuZXJhdGVUZXh0dXJlKCkpO1xuICAgICAgICB0aGlzLl9uZXdUaXRsZS5hbHBoYSA9IDA7XG4gICAgICAgIHRoaXMuX25ld1RpdGxlLnkgPSB0aGlzLmdhbWUuaGVpZ2h0ICogMC43O1xuICAgICAgICB0aGlzLmdhbWUud29ybGQucmVtb3ZlKGdmeCk7XG5cbiAgICAgICAgdGhpcy5fbmV3VGl0bGUuc2V0UGl2b3QoJ2NlbnRlcicpO1xuICAgICAgICBuZXdUZXh0LnNldFBpdm90KCdjZW50ZXInKTtcbiAgICAgICAgbmV3VGV4dC54ID0gdGhpcy5fbmV3VGl0bGUud2lkdGggKiAwLjU7XG4gICAgICAgIG5ld1RleHQueSA9IHRoaXMuX25ld1RpdGxlLmhlaWdodCAqIDAuNTtcbiAgICAgICAgdGhpcy5fbmV3VGl0bGUuYWRkQ2hpbGQobmV3VGV4dCk7XG5cbiAgICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLl9uZXdUaXRsZSkudG8oeyBhbHBoYTogMSB9LCAzNTAsIFBoYXNlci5FYXNpbmcuQ3ViaWMuT3V0LCB0cnVlKS5vbkNvbXBsZXRlLmFkZE9uY2UodGhpcy5fc2V0Q3VycmVudEFzT2xkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5yZXF1ZXN0VFRTQXVkaW8obmV3Q29weSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHByaXZhdGUgX2dlbmVyYXRlTmV3TmFtZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzR2VuZXJhdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzR2VuZXJhdGluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9vbGRUaXRsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLl9vbGRUaXRsZSkudG8oeyB5OiB0aGlzLmdhbWUuaGVpZ2h0ICogMS4yNSB9LCAzNTAsIFBoYXNlci5FYXNpbmcuQ3ViaWMuT3V0LCB0cnVlKS5vbkNvbXBsZXRlLmFkZE9uY2UodGhpcy5fY2xlYXJPbGRUaXRsZSwgdGhpcyk7O1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdDb3B5ID0gdGhpcy5tZWRpYXRvci5nZXRSYW5kb21UaXRsZSgpO1xuICAgICAgICBsZXQgbmV3VGV4dCA9IG5ldyBUZXh0KDAsIDAsIG5ld0NvcHksIENvbnN0YW50cy5GT05UX1JBTEVXQVksIHRoaXMuX2ZvbnRTaXplLCBDb25zdGFudHMuU1RSX05FV19USVRMRSwgJ2NlbnRlcicsIHRydWUsIHRoaXMuZ2FtZS53aWR0aCk7XG4gICAgICAgIG5ld1RleHQuZm9udFNpemUgPSB0aGlzLl9mb250U2l6ZSAqIDAuODtcbiAgICAgICAgbGV0IGdmeCA9IHRoaXMuZ2FtZS5hZGQuZ3JhcGhpY3MoLTUwMCwgMCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoQ29uc3RhbnRzLk5VTV9PUkFOR0VfQk9YLCAwLjgpO1xuICAgICAgICBnZnguZHJhd1JvdW5kZWRSZWN0KDAsIDAsIG5ld1RleHQud2lkdGggKiAyMCwgbmV3VGV4dC5oZWlnaHQgKyAyMCwgMTApO1xuICAgICAgICBnZnguZW5kRmlsbCgpO1xuXG4gICAgICAgIHRoaXMuX25ld1RpdGxlID0gdGhpcy5hZGQuaW1hZ2UodGhpcy5nYW1lLndpZHRoICogMC41LCB0aGlzLmdhbWUuaGVpZ2h0IC0gNTAwLCBnZnguZ2VuZXJhdGVUZXh0dXJlKCkpO1xuICAgICAgICB0aGlzLmdhbWUud29ybGQucmVtb3ZlKGdmeCk7XG5cbiAgICAgICAgdGhpcy5fbmV3VGl0bGUuc2V0UGl2b3QoJ2NlbnRlcicpO1xuICAgICAgICBuZXdUZXh0LnNldFBpdm90KCdjZW50ZXInKTtcbiAgICAgICAgbmV3VGV4dC54ID0gdGhpcy5fbmV3VGl0bGUud2lkdGggKiAwLjU7XG4gICAgICAgIG5ld1RleHQueSA9IHRoaXMuX25ld1RpdGxlLmhlaWdodCAqIDAuNTtcbiAgICAgICAgdGhpcy5fbmV3VGl0bGUuYWRkQ2hpbGQobmV3VGV4dCk7XG5cbiAgICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLl9uZXdUaXRsZSkudG8oeyB5OiB0aGlzLmdhbWUuaGVpZ2h0ICogMC41IH0sIDM1MCwgUGhhc2VyLkVhc2luZy5DdWJpYy5PdXQsIHRydWUpLm9uQ29tcGxldGUuYWRkT25jZSh0aGlzLl9zZXRDdXJyZW50QXNPbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLm1lZGlhdG9yLnJlcXVlc3RUVFNBdWRpbyhuZXdDb3B5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhck9sZFRpdGxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbGRUaXRsZS52aXNpYmxlID0gZmFsc2U7XG4gICAgfSAgIFxuICAgIFxuICAgIHByaXZhdGUgX3NldEN1cnJlbnRBc09sZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb2xkVGl0bGUgPSB0aGlzLl9uZXdUaXRsZTtcbiAgICAgICAgdGhpcy5faXNHZW5lcmF0aW5nID0gZmFsc2U7XG4gICAgfSAgICBcblxuICAgIHByaXZhdGUgZ2V0IG1lZGlhdG9yKCk6IE1lbnVNZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8TWVudU1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cbn1cbiAgIiwiaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSBcImRpam9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQge0dhbWV9IGZyb20gXCJkaWpvbi9jb3JlXCI7XG5pbXBvcnQge0RldmljZX0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0NvcHlNb2RlbH0gZnJvbSBcImRpam9uL212Y1wiO1xuXG5pbXBvcnQgQXBwbGljYXRpb25NZWRpYXRvciBmcm9tIFwiLi9tZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vdXRpbHMvTm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGUvQm9vdFwiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGUvUHJlbG9hZFwiO1xuaW1wb3J0IE1lbnUgZnJvbSBcIi4vc3RhdGUvTWVudVwiO1xuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuL21vZGVsL0dhbWVNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2lsZXJwbGF0ZUFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuICAgIHB1YmxpYyBnYW1lSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIHJlc3BvbnNpdmVWb2ljZTogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBjcmVhdGVHYW1lKCkge1xuICAgICAgICB0aGlzLmdhbWUgPSBuZXcgR2FtZSh7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5fZ2V0R2FtZVdpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2dldEdhbWVIZWlnaHQoKSxcbiAgICAgICAgICAgIHBhcmVudDogJ2dhbWUtY29udGFpbmVyJyxcbiAgICAgICAgICAgIC8vcmVuZGVyZXI6IFBoYXNlci5DQU5WQVMsXG4gICAgICAgICAgICByZW5kZXJlcjogUGhhc2VyLkFVVE8sXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogZmFsc2UsXG4gICAgICAgICAgICAvLyB1c2UgdGhpcyBpZiB5b3Ugd2FudCB0byBzd2l0Y2ggYmV0d2VlbiBAMnggYW5kIEAxeCBncmFwaGljc1xuICAgICAgICAgICAgcmVzb2x1dGlvbjogdGhpcy5fZ2V0UmVzb2x1dGlvbigpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IEFwcGxpY2F0aW9uTWVkaWF0b3IodGhpcyk7XG4gICAgICAgIHRoaXMuX2FkZFN0YXRlcygpO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIHN0YXJ0R2FtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KENvbnN0YW50cy5TVEFURV9CT09UKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZENvbXBsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc3BvbnNpdmVWb2ljZSA9IHdpbmRvd1sncmVzcG9uc2l2ZVZvaWNlJ107XG4gICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdyk7XG4gICAgfVxuXG4gICAgcHVibGljIHR0c1RleHQocmVhZFRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAocmVhZFRleHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2l2ZVZvaWNlLnNwZWFrKHJlYWRUZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGp1c3RTY2FsZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRldmljZS5kZXNrdG9wKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5FWEFDVF9GSVQ7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLkVYQUNUX0ZJVDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRqdXN0UmVuZGVyZXJTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nYW1lLmZvcmNlU2luZ2xlVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLmdhbWUuY2FtZXJhLnJvdW5kUHggPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmdhbWUucmVuZGVyZXIucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZ2FtZS5hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZ2FtZS5yZW5kZXJlci5jbGVhckJlZm9yZVJlbmRlciA9IHRoaXMuZ2FtZS5yZW5kZXJUeXBlID09PSBQaGFzZXIuQ0FOVkFTO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBmcm9tIHRoZSBib290IHN0YXRlIGFzIHdlIGNhbid0IGluaXRpYWxpemUgcGx1Z2lucyB1bnRpbCB0aGUgZ2FtZSBpcyBib290ZWRcbiAgICBwdWJsaWMgcmVnaXN0ZXJNb2RlbHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGdhbWVNb2RlbCA9IG5ldyBHYW1lTW9kZWwoJ2dhbWVfZGF0YScpO1xuICAgICAgICBjb25zdCBjb3B5TW9kZWwgPSBuZXcgQ29weU1vZGVsKCdjb3B5Jyk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gICAgLy8gYWRkcyBzdGF0ZXNcbiAgICBwcml2YXRlIF9hZGRTdGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX0JPT1QsIEJvb3QpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9QUkVMT0FELCBQcmVsb2FkKTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfTUVOVSwgTWVudSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0R2FtZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHYW1lSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVzb2x1dGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAoQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSAmJiAhaXNOYU4oQXBwbGljYXRpb24ucXVlcnlWYXIoJ3Jlc29sdXRpb24nKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBEZXZpY2UubW9iaWxlID8gMSA6ICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEgPyAyIDogMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVuZGVyZXJCeURldmljZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gRGV2aWNlLm1vYmlsZSAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgPyBQaGFzZXIuQ0FOVkFTIDogUGhhc2VyLkFVVE87XG4gICAgfVxuICAgIFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHB1YmxpYyBnZXQgbWVkaWF0b3IoKTogQXBwbGljYXRpb25NZWRpYXRvciB7XG4gICAgICAgIHJldHVybiA8QXBwbGljYXRpb25NZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGdhbWVNb2RlbCgpOiBHYW1lTW9kZWwge1xuICAgICAgICByZXR1cm4gPEdhbWVNb2RlbD50aGlzLnJldHJpZXZlTW9kZWwoR2FtZU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29weU1vZGVsKCk6IENvcHlNb2RlbCB7XG4gICAgICAgIHJldHVybiA8Q29weU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChDb3B5TW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9zdWJtb2R1bGVzL2Rpam9uL2J1aWxkL2Rpam9uLmQudHNcIi8+ICBcbmltcG9ydCBCb2lsZXJQbGF0ZUFwcGxpY2F0aW9uIGZyb20gJy4vQm9pbGVyUGxhdGVBcHBsaWNhdGlvbic7XG5cbi8vIGJvb3RzdHJhcCB0aGUgYXBwXG5leHBvcnQgY29uc3QgYXBwID0gbmV3IEJvaWxlclBsYXRlQXBwbGljYXRpb24oKTsiLCJpbXBvcnQge0dyb3VwLCBUZXh0fSBmcm9tICdkaWpvbi9kaXNwbGF5JztcbmltcG9ydCB7SVByZWxvYWRIYW5kbGVyfSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZGVyIGV4dGVuZHMgR3JvdXAgaW1wbGVtZW50cyBJUHJlbG9hZEhhbmRsZXIge1xuICAgIHN0YXRpYyBURVNUOiBudW1iZXIgPSAxO1xuICAgIHN0YXRpYyBURVNUXzI6IG51bWJlciA9IDI7XG5cbiAgICBwcml2YXRlIF93aXBlcjogUGhhc2VyLkltYWdlO1xuICAgIHByaXZhdGUgX2xvYWRUZXh0OiBUZXh0O1xuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbkNvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcbiAgICBwdWJsaWMgdHJhbnNpdGlvbk91dENvbXBsZXRlOiBQaGFzZXIuU2lnbmFsID0gbmV3IFBoYXNlci5TaWduYWwoKTtcblxuICAgIHByaXZhdGUgX2luVHdlZW46IFBoYXNlci5Ud2VlbjtcbiAgICBwcml2YXRlIF9vdXRUd2VlbjogUGhhc2VyLlR3ZWVuO1xuXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcih4LCB5LCBuYW1lLCB0cnVlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBHcm91cCBvdmVycmlkZXNcbiAgICBwcm90ZWN0ZWQgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0ID0gdGhpcy5hZGRJbnRlcm5hbC5kVGV4dCg1MCwgNTAsICdMb2FkaW5nIC4uLiAnLCAnQXJpYWwnLCAzNiwgJyNGRkZGRkYnKTtcblxuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBnZnguYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcbiAgICAgICAgZ2Z4LmRyYXdSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgdGhpcy5fd2lwZXIgPSB0aGlzLmFkZEludGVybmFsLmltYWdlKDAsIDAsIGdmeC5nZW5lcmF0ZVRleHR1cmUoKSk7XG5cbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnJlbW92ZShnZngsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuYWxwaGEgPSAwO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IGFscGhhOiAxIH0sIDMwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0KTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDAgfSwgMjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbik7XG5cbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5vbkNvbXBsZXRlLmFkZCh0aGlzLl9pbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX291dCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gaVByZWxvYWRIYW5kbGVyIGltcGxlbWVudGF0aW9uc1xuICAgIHB1YmxpYyBsb2FkU3RhcnQoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJvdW5kZWRQcm9ncmVzcyA9IE1hdGgucm91bmQocHJvZ3Jlc3MpLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX2xvYWRUZXh0LnNldFRleHQoJ0xvYWRpbmcgLi4uICcgKyByb3VuZGVkUHJvZ3Jlc3MgKyAnJScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkQ29tcGxldGUoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25JbigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5Ud2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0KCkge1xuICAgICAgICB0aGlzLl9vdXRUd2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByb3RlY3RlZCBfaW4oKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkluQ29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX291dCgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbk91dENvbXBsZXRlLmRpc3BhdGNoKCk7XG4gICAgfVxufSJdfQ==
