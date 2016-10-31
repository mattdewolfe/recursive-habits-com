var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("model/GameModel", ['dijon/mvc'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mvc_1;
    var ETitleType, GameModel;
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
                Object.defineProperty(GameModel.prototype, "randomPronoun", {
                    get: function () {
                        return this.data.pronouns[Math.round(Math.random() * (this.data.pronouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomAdjective", {
                    get: function () {
                        return this.data.adjectives[Math.round(Math.random() * (this.data.adjectives.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomNoun", {
                    get: function () {
                        return this.data.nouns[Math.round(Math.random() * (this.data.nouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomActionVerb", {
                    get: function () {
                        return this.data.actionVerbs[Math.round(Math.random() * (this.data.actionVerbs.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomAdverbHow", {
                    get: function () {
                        return this.data.adverbsHow[Math.round(Math.random() * (this.data.adverbsHow.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameModel.prototype, "randomActionNoun", {
                    get: function () {
                        return this.data.actionNouns[Math.round(Math.random() * (this.data.actionNouns.length - 1))];
                    },
                    enumerable: true,
                    configurable: true
                });
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
                Object.defineProperty(GameModel.prototype, "data", {
                    get: function () {
                        return this._data['main'];
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
System.register("state/Menu", ["state/BaseState", "utils/Constants", 'dijon/display', "mediator/MenuMediator"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var BaseState_3, Constants_3, display_1, MenuMediator_1;
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
            function (MenuMediator_1_1) {
                MenuMediator_1 = MenuMediator_1_1;
            }],
        execute: function() {
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.apply(this, arguments);
                    this._isGenerating = false;
                    this._repeating = true;
                    this._lastSound = 0;
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
                    this._spriteData = this.mediator.audioSpriteData;
                    var buttonWidth = this.game.width * 0.35 > 400 ? 400 : this.game.width * 0.3;
                    var row = 1;
                    var column = 1;
                    var repeat = new Phaser.Button(this.game, 125, 75 * row, 'up', this._playLast, this);
                    repeat.setPivot('center');
                    this.add.existing(repeat);
                    var label = new display_1.Text(repeat.x, repeat.y + 60, 'REPLAY LAST', Constants_3.default.FONT_RALEWAY, 20, Constants_3.default.STR_BLUE);
                    label.centerPivot();
                    this.add.existing(label);
                    for (var key in this._spriteData.spritemap) {
                        var button = new Phaser.Button(this.game, 200 + (300 * column), 200 * row, 'up', this._playSFX, this);
                        button.setPivot('center');
                        button.name = key;
                        this.add.existing(button);
                        column++;
                        if (column >= 4) {
                            row++;
                            column = 0;
                        }
                        label = new display_1.Text(button.x, button.y + 60, key, Constants_3.default.FONT_RALEWAY, 20, Constants_3.default.STR_BLUE);
                        label.centerPivot();
                        this.add.existing(label);
                    }
                };
                Menu.prototype._playLast = function () {
                    this.game.audio.playAudio('fx_1', this._lastSound);
                };
                Menu.prototype._playSFX = function (button) {
                    this._lastSound = this.game.audio.playAudio('fx_1', button.name);
                };
                Menu.prototype._stop = function () {
                    this._repeating = false;
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
    var application_2, core_2, utils_2, mvc_3, ApplicationMediator_1, Constants_4, Boot_1, Preload_1, Menu_1, GameModel_2;
    var BoilerplateApplication;
    return {
        setters:[
            function (application_2_1) {
                application_2 = application_2_1;
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
                    if (utils_2.Device.cocoon) {
                        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                        this.game.scale.pageAlignHorizontally = true;
                        this.game.scale.pageAlignVertically = true;
                    }
                    else {
                        if (this.game.device.desktop) {
                            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                            this.game.scale.pageAlignHorizontally = true;
                        }
                        else {
                            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                        }
                        this.game.scale.forceLandscape = true;
                        this.game.scale.refresh();
                    }
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
                    return utils_2.Device.mobile ? 1 : (window.devicePixelRatio > 1 ? 2 : 1);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL0dhbWVNb2RlbC50cyIsIm1lZGlhdG9yL0Jhc2VNZWRpYXRvci50cyIsInV0aWxzL0NvbnN0YW50cy50cyIsInV0aWxzL05vdGlmaWNhdGlvbnMudHMiLCJtZWRpYXRvci9BcHBsaWNhdGlvbk1lZGlhdG9yLnRzIiwic3RhdGUvQmFzZVN0YXRlLnRzIiwibWVkaWF0b3IvQm9vdE1lZGlhdG9yLnRzIiwic3RhdGUvQm9vdC50cyIsIm1lZGlhdG9yL1ByZWxvYWRNZWRpYXRvci50cyIsInN0YXRlL1ByZWxvYWQudHMiLCJtZWRpYXRvci9NZW51TWVkaWF0b3IudHMiLCJzdGF0ZS9NZW51LnRzIiwiQm9pbGVycGxhdGVBcHBsaWNhdGlvbi50cyIsImJvb3RzdHJhcC50cyIsInVpL1ByZWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBRUEsV0FBWSxVQUFVO2dCQUNsQiwrREFBa0IsQ0FBQTtnQkFDbEIscUVBQWlCLENBQUE7Z0JBQ2pCLDJEQUFZLENBQUE7Z0JBQ1osNkRBQWEsQ0FBQTtnQkFDYix1REFBVSxDQUFBO2dCQUNWLDZEQUFhLENBQUE7Z0JBQ2IsbUVBQWdCLENBQUE7Z0JBQ2hCLHlDQUFHLENBQUE7WUFDUCxDQUFDLEVBVFcsVUFBVSxLQUFWLFVBQVUsUUFTckI7Z0RBQUE7WUFXRDtnQkFBK0IsNkJBQUs7Z0JBQXBDO29CQUErQiw4QkFBSztnQkEwRXBDLENBQUM7Z0JBdkVHLHNCQUFXLDJCQUFJO3lCQUFmO3dCQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO29CQUNoQyxDQUFDOzs7bUJBQUE7Z0JBRUQsc0JBQVcsb0NBQWE7eUJBQXhCO3dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FB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QUMxQyxDQUFDO2dCQXRFTSxjQUFJLEdBQVcsQ0FBQyxDQUFDO2dCQUNqQixnQkFBTSxHQUFXLENBQUMsQ0FBQztnQkFzRTlCLGdCQUFDO1lBQUQsQ0F4RUEsQUF3RUMsQ0F4RXNDLGVBQUssR0F3RTNDO1lBeEVELGdDQXdFQyxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWx9IGZyb20gJ2Rpam9uL212Yyc7XG5cbmV4cG9ydCBlbnVtIEVUaXRsZVR5cGUge1xuICAgIEFkak5vdW5Qcm9ub3VuID0gMCwgLy8gQWRqZWN0aXZlLCBOb3VuLCBQcm9ub3VuIFxuICAgIEFkak5vdW5BY3Rpb25Ob3VuLCAvLyBBZGplY3RpdmUsIE5vdW4sIFZlcmJcbiAgICBBZHZIb3dBZGpQcm8sXG4gICAgQWR2SG93QWRqVmVyYixcbiAgICBBZGpQcm9ub3VuLFxuICAgIFByb25vdW5PZk5vdW4sXG4gICAgUHJvbm91bk9mQWRqTm91bixcbiAgICBNYXhcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV29yZERhdGEge1xuICAgIGFkamVjdGl2ZXM6IHN0cmluZ1tdO1xuICAgIG5vdW5zOiB7c2luZ2xlOiBzdHJpbmcsIHBsdXJhbDogc3RyaW5nfVtdO1xuICAgIGFjdGlvblZlcmJzOiBzdHJpbmdbXTtcbiAgICBwcm9ub3Vuczogc3RyaW5nW107XG4gICAgYWR2ZXJic0hvdzogc3RyaW5nW107XG4gICAgYWN0aW9uTm91bnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZU1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICAgIHB1YmxpYyBzdGF0aWMgTU9ERUxfTkFNRTogc3RyaW5nID0gXCJnYW1lTW9kZWxcIjtcblxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gR2FtZU1vZGVsLk1PREVMX05BTUU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21Qcm9ub3VuKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucHJvbm91bnNbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuZGF0YS5wcm9ub3Vucy5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tQWRqZWN0aXZlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuYWRqZWN0aXZlc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5kYXRhLmFkamVjdGl2ZXMubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJhbmRvbU5vdW4oKToge3NpbmdsZTogc3RyaW5nLCBwbHVyYWw6IHN0cmluZ30ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLm5vdW5zW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLmRhdGEubm91bnMubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJhbmRvbUFjdGlvblZlcmIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5hY3Rpb25WZXJic1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5kYXRhLmFjdGlvblZlcmJzLmxlbmd0aCAtIDEpKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYW5kb21BZHZlcmJIb3coKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5hZHZlcmJzSG93W01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLmRhdGEuYWR2ZXJic0hvdy5sZW5ndGggLSAxKSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmFuZG9tQWN0aW9uTm91bigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmFjdGlvbk5vdW5zW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLmRhdGEuYWN0aW9uTm91bnMubGVuZ3RoIC0gMSkpXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbmV3VGl0bGU6IHN0cmluZyA9ICdZb3UuLi4nO1xuICAgICAgICBsZXQgdHlwZTogRVRpdGxlVHlwZSA9IDxFVGl0bGVUeXBlPihNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoRVRpdGxlVHlwZS5NYXggLSAxKSkpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLkFkak5vdW5Qcm9ub3VuOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZGplY3RpdmUgKyAnICcgKyB0aGlzLnJhbmRvbU5vdW4uc2luZ2xlICsgJyAnICsgdGhpcy5yYW5kb21Qcm9ub3VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEVUaXRsZVR5cGUuQWR2SG93QWRqUHJvOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZHZlcmJIb3cgKyAnICcgKyB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tUHJvbm91bjtcbiAgICAgICAgICAgICAgICBicmVhazsgICAgXG5cbiAgICAgICAgICAgIGNhc2UgRVRpdGxlVHlwZS5BZGpQcm9ub3VuOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZGplY3RpdmUgKyAnICcgKyB0aGlzLnJhbmRvbVByb25vdW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRVRpdGxlVHlwZS5Qcm9ub3VuT2ZOb3VuOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21Qcm9ub3VuICsgJyBvZiAnICsgdGhpcy5yYW5kb21Ob3VuLnBsdXJhbDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLlByb25vdW5PZkFkak5vdW46XG4gICAgICAgICAgICAgICAgbmV3VGl0bGUgPSB0aGlzLnJhbmRvbVByb25vdW4gKyAnIG9mICcgKyB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tTm91bi5wbHVyYWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRVRpdGxlVHlwZS5BZHZIb3dBZGpWZXJiOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZHZlcmJIb3cgKyAnICcgKyB0aGlzLnJhbmRvbUFkamVjdGl2ZSArICcgJyArIHRoaXMucmFuZG9tQWN0aW9uTm91bjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSBFVGl0bGVUeXBlLkFkak5vdW5BY3Rpb25Ob3VuOlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZGplY3RpdmUgKyAnICcgKyB0aGlzLnJhbmRvbU5vdW4uc2luZ2xlICsgJyAnICsgdGhpcy5yYW5kb21BY3Rpb25Ob3VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG5ld1RpdGxlID0gdGhpcy5yYW5kb21BZGplY3RpdmUgKyAnICcgKyB0aGlzLnJhbmRvbU5vdW4uc2luZ2xlICsgJyAnICsgdGhpcy5yYW5kb21Qcm9ub3VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBkYXRhKCk6IElXb3JkRGF0YSB7XG4gICAgICAgIHJldHVybiA8SVdvcmREYXRhPnRoaXMuX2RhdGFbJ21haW4nXTtcbiAgICB9XG59IiwiaW1wb3J0IHtNZWRpYXRvciwgQ29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcblxuaW1wb3J0IHtHYW1lTW9kZWx9IGZyb20gXCIuLi9tb2RlbC9HYW1lTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU1lZGlhdG9yIGV4dGVuZHMgTWVkaWF0b3Ige1xuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gc28gYW55IG1lZGlhdG9yIGV4dGVuZGluZyBCYXNlTWVkaWF0b3IgY2FuIGdldCBjb3B5XG4gICAgcHVibGljIGdldENvcHkoZ3JvdXBJZDogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlNb2RlbC5nZXRDb3B5KGdyb3VwSWQsIHRleHRJZCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgLy8gb2ZmZXIgYWNjZXNzIHRvIHRoZSBHYW1lTW9kZWwgYW5kIENvcHlNb2RlbCBmcm9tIGFueSBtZWRpYXRvciBleHRlbmRpbmcgQmFzZU1lZGlhdG9yXG4gICAgcHVibGljIGdldCBnYW1lTW9kZWwoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxHYW1lTW9kZWw+QXBwbGljYXRpb24uZ2V0SW5zdGFuY2UoKS5yZXRyaWV2ZU1vZGVsKEdhbWVNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvcHlNb2RlbCgpOiBDb3B5TW9kZWwge1xuICAgICAgICByZXR1cm4gPENvcHlNb2RlbD5BcHBsaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnJldHJpZXZlTW9kZWwoQ29weU1vZGVsLk1PREVMX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwiYmFzZU1lZGlhdG9yX1wiICsgdGhpcy5nYW1lLnJuZC51dWlkKCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50cyB7XG4gICAgc3RhdGljIFNUQVRFX0JPT1Q6IHN0cmluZyA9ICdib290JztcbiAgICBzdGF0aWMgU1RBVEVfUFJFTE9BRDogc3RyaW5nID0gJ3ByZWxvYWQnO1xuICAgIHN0YXRpYyBTVEFURV9NRU5VOiBzdHJpbmcgPSAnbWVudSc7XG4gICAgLy8gZm9udHNcbiAgICBzdGF0aWMgRk9OVF9LT01JS0FYOiBzdHJpbmcgPSAna29taWtheCc7XG4gICAgc3RhdGljIEZPTlRfUkFMRVdBWTogc3RyaW5nID0gJ1JhbGV3YXknO1xuXG4gICAgc3RhdGljIFNUUl9CTFVFOiBzdHJpbmcgPSAnIzAwOTllNic7XG4gICAgc3RhdGljIFNUUl9ORVdfVElUTEU6IHN0cmluZyA9ICcjZmZmZmZmJztcblxuICAgIHN0YXRpYyBOVU1fT1JBTkdFX0JPUkRFUjogbnVtYmVyID0gMHhmZmI4NjY7XG4gICAgc3RhdGljIE5VTV9PUkFOR0VfQk9YOiBudW1iZXIgPSAweGU2N2EwMDtcblxuICAgIHN0YXRpYyBCVVRUT05fTk9STUFMOiBudW1iZXIgPSAweGU2ZTZlNjtcbiAgICBzdGF0aWMgQlVUVE9OX0hPVkVSOiBudW1iZXIgPSAweGZmOTQxYTtcbiAgICBzdGF0aWMgQlVUVE9OX0RPV046IG51bWJlciA9IDB4MDBhYWZmO1xuICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbnMge1xuICAgIHN0YXRpYyBCT09UX0lOSVQ6IHN0cmluZyA9ICdib290SW5pdCc7XG4gICAgc3RhdGljIEJPT1RfQ09NUExFVEU6IHN0cmluZyA9ICdib290Q29tcGxldGUnO1xuICAgIHN0YXRpYyBQUkVMT0FEX0NPTVBMRVRFOiBzdHJpbmcgPSAncHJlbG9hZENvbXBsZXRlJztcbiAgICBcbiAgICBzdGF0aWMgUkVRVUVTVF9UVFNfQVVESU86IHN0cmluZyA9ICdyZXF1ZXN0VFRTJztcbn0iLCJpbXBvcnQge0xvZ2dlcn0gZnJvbSBcImRpam9uL3V0aWxzXCI7XG5pbXBvcnQge0lOb3RpZmljYXRpb259IGZyb20gXCJkaWpvbi9pbnRlcmZhY2VzXCI7XG5cbmltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgQm9pbGVycGxhdGVBcHBsaWNhdGlvbiBmcm9tICcuLi9Cb2lsZXJwbGF0ZUFwcGxpY2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25NZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnQXBwbGljYXRpb25NZWRpYXRvcic7XG5cbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEUsXG4gICAgICAgICAgICBOb3RpZmljYXRpb25zLlJFUVVFU1RfVFRTX0FVRElPXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSU5vdGlmaWNhdGlvbikge1xuICAgICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5nZXROYW1lKCkpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9ucy5CT09UX0lOSVQ6XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLCAnTm90aWZpY2F0aW9ucy5CT09UX0lOSVQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYWRqdXN0U2NhbGVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5hZGp1c3RSZW5kZXJlclNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmFkZFBsdWdpbnMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLlBSRUxPQURfQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnByZWxvYWRDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbnMuQk9PVF9DT01QTEVURTpcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMsICdOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQuc2V0RGF0YSh0aGlzLmdhbWUuY2FjaGUuZ2V0SlNPTignYXNzZXRzJykpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5yZWdpc3Rlck1vZGVscygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS50cmFuc2l0aW9uLnRvKENvbnN0YW50cy5TVEFURV9QUkVMT0FEKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25zLlJFUVVFU1RfVFRTX0FVRElPOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuc291bmQubXV0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHk6IHN0cmluZyA9IDxzdHJpbmc+bm90aWZpY2F0aW9uLmdldEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnR0c1RleHQoY29weSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCB2aWV3Q29tcG9uZW50KCk6IEJvaWxlcnBsYXRlQXBwbGljYXRpb24ge1xuICAgICAgICByZXR1cm4gPEJvaWxlcnBsYXRlQXBwbGljYXRpb24+dGhpcy5fdmlld0NvbXBvbmVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXBwbGljYXRpb25NZWRpYXRvci5NRURJQVRPUl9OQU1FO1xuICAgIH1cbn0iLCJpbXBvcnQge1N0YXRlfSBmcm9tIFwiZGlqb24vY29yZVwiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tIFwiLi4vbWVkaWF0b3IvQmFzZU1lZGlhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbn1cbiIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3RNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnYm9vdE1lZGlhdG9yJztcblx0XHRcbiAgICAvLyBkaWpvbi5tdmMuTWVkaWF0b3Igb3ZlcnJpZGVzXG4gICAgcHVibGljIG9uUmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfSU5JVCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gdmlld0NvbXBvbmVudFxuICAgIHB1YmxpYyBib290Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLkJPT1RfQ09NUExFVEUpO1xuICAgIH1cblx0XHRcbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gQm9vdE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQm9vdE1lZGlhdG9yIGZyb20gXCIuLi9tZWRpYXRvci9Cb290TWVkaWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBCb290TWVkaWF0b3IodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh3aW5kb3dbJ3ZlcnNpb24nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYXNzZXQuY2FjaGVCdXN0VmVyc2lvbiA9ICdAQHZlcnNpb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignZ2FtZV9kYXRhJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignYXNzZXRzJyk7XG4gICAgICAgIHRoaXMuZ2FtZS5hc3NldC5sb2FkSlNPTignY29weScpO1xuICAgIH1cblxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGJ1aWxkSW50ZXJmYWNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhdG9yLmJvb3RDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHJvdGVjdGVkIGdldCBtZWRpYXRvcigpOiBCb290TWVkaWF0b3Ige1xuICAgICAgICByZXR1cm4gPEJvb3RNZWRpYXRvcj50aGlzLl9tZWRpYXRvcjtcbiAgICB9XG59IiwiaW1wb3J0IHtJTm90aWZpY2F0aW9ufSBmcm9tICdkaWpvbi9pbnRlcmZhY2VzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4uL3V0aWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VNZWRpYXRvciBmcm9tICcuL0Jhc2VNZWRpYXRvcic7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuLi91dGlscy9Ob3RpZmljYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZE1lZGlhdG9yIGV4dGVuZHMgQmFzZU1lZGlhdG9yIHtcbiAgICBwdWJsaWMgc3RhdGljIE1FRElBVE9SX05BTUU6IHN0cmluZyA9ICdwcmVsb2FkTWVkaWF0b3InO1xuXHRcdFxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgLy8gY2FsbGVkIGZyb20gUHJlbG9hZCBzdGF0ZVxuXG4gICAgcHVibGljIG5vdGlmeVByZWxvYWRDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbnMuUFJFTE9BRF9DT01QTEVURSk7XG4gICAgfSAgIFxuICAgIFxuICAgIHB1YmxpYyBuZXh0KCk6IHZvaWR7XG4gICAgICAgIHRoaXMuZ2FtZS50cmFuc2l0aW9uLnRvKENvbnN0YW50cy5TVEFURV9NRU5VKTtcbiAgICB9XG5cdFx0XG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gUHJlbG9hZE1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi91dGlscy9Db25zdGFudHNcIjtcbmltcG9ydCBQcmVsb2FkTWVkaWF0b3IgZnJvbSBcIi4uL21lZGlhdG9yL1ByZWxvYWRNZWRpYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgICAvLyBQaGFzZXIuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yID0gbmV3IFByZWxvYWRNZWRpYXRvcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIHB1YmxpYyBidWlsZEludGVyZmFjZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5ub3RpZnlQcmVsb2FkQ29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5tZWRpYXRvci5uZXh0KCk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGdldHRlciAvIHNldHRlclxuICAgIHByb3RlY3RlZCBnZXQgbWVkaWF0b3IoKTogUHJlbG9hZE1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxQcmVsb2FkTWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICIsImltcG9ydCBCYXNlTWVkaWF0b3IgZnJvbSAnLi9CYXNlTWVkaWF0b3InO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vdXRpbHMvTm90aWZpY2F0aW9ucyc7XG5pbXBvcnQge0VUaXRsZVR5cGV9IGZyb20gJy4uL21vZGVsL2dhbWVNb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVNZWRpYXRvciBleHRlbmRzIEJhc2VNZWRpYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBNRURJQVRPUl9OQU1FOiBzdHJpbmcgPSAnbWVudU1lZGlhdG9yJztcblx0XHRcbiAgICBwdWJsaWMgZ2V0UmFuZG9tVGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdlbmVyYXRlVGl0bGUoKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHJlcXVlc3RUVFNBdWRpbyhyZWFkVGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25zLlJFUVVFU1RfVFRTX0FVRElPLCByZWFkVGV4dCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhdWRpb1Nwcml0ZURhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1vZGVsLmdldERhdGEoKVsnYXVkaW9zcHJpdGUnXTtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgLyBzZXR0ZXJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gTWVudU1lZGlhdG9yLk1FRElBVE9SX05BTUU7XG4gICAgfVxufSIsImltcG9ydCBCYXNlU3RhdGUgZnJvbSBcIi4vQmFzZVN0YXRlXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL3V0aWxzL0NvbnN0YW50cyc7XG5pbXBvcnQge1RleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtQbGFjZWhvbGRlcnN9IGZyb20gJ2Rpam9uL3V0aWxzJztcbmltcG9ydCBNZW51TWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvTWVudU1lZGlhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIEJhc2VTdGF0ZSB7XG5cbiAgICBwcm90ZWN0ZWQgX2lzR2VuZXJhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfb2xkVGl0bGU6IFBoYXNlci5JbWFnZTtcbiAgICBwcm90ZWN0ZWQgX25ld1RpdGxlOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJvdGVjdGVkIF9yZXBlYXRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByb3RlY3RlZCBfZm9udFNpemU6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCBfc3ByaXRlRGF0YTogYW55O1xuICAgIHByb3RlY3RlZCBfbGFzdFNvdW5kOiBudW1iZXIgPSAwO1xuXG4gICAgLy8gUGhhc2VyLlN0YXRlIG92ZXJyaWRlc1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9tZWRpYXRvciA9IG5ldyBNZW51TWVkaWF0b3IoKTtcbiAgICAgICAgdGhpcy5fb2xkVGl0bGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9uZXdUaXRsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gKCh0aGlzLmdhbWUud2lkdGggKyB0aGlzLmdhbWUuaGVpZ2h0KSAqIDAuNSkgKiAwLjA2NTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmFzc2V0LmxvYWRBc3NldHMoJ3JlcXVpcmVkJyk7XG4gICAgfVxuXHRcdFxuICAgIC8vIGRpam9uLmNvcmUuU3RhdGUgb3ZlcnJpZGVzXG4gICAgcHVibGljIGxpc3RCdWlsZFNlcXVlbmNlKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRCb3JkZXJzLFxuICAgICAgICAgICAgdGhpcy5fYWRkVmlzdWFsc1xuICAgICAgICBdXG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyQnVpbGQoKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfYnVpbGRCb3JkZXJzKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBnZnguYmVnaW5GaWxsKENvbnN0YW50cy5OVU1fT1JBTkdFX0JPUkRFUiwgMC44KTtcbiAgICAgICAgZ2Z4LmRyYXdSb3VuZGVkUmVjdCg1LCA1LCB0aGlzLmdhbWUud2lkdGggLSAxMCwgdGhpcy5nYW1lLmhlaWdodCAtIDEwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoMHgwMDAwMDAsIDEuMCk7XG4gICAgICAgIGdmeC5kcmF3Um91bmRlZFJlY3QoMTAsIDEwLCB0aGlzLmdhbWUud2lkdGggLSAyMCwgdGhpcy5nYW1lLmhlaWdodCAtIDIwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgbGV0IGJnID0gdGhpcy5hZGQuaW1hZ2UoNSwgNSwgZ2Z4LmdlbmVyYXRlVGV4dHVyZSgpKTtcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnJlbW92ZShnZngpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgX2FkZFZpc3VhbHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Nwcml0ZURhdGEgPSB0aGlzLm1lZGlhdG9yLmF1ZGlvU3ByaXRlRGF0YTtcbiAgICAgICAgbGV0IGJ1dHRvbldpZHRoID0gdGhpcy5nYW1lLndpZHRoICogMC4zNSA+IDQwMCA/IDQwMCA6IHRoaXMuZ2FtZS53aWR0aCAqIDAuMztcbiAgICAgICAgbGV0IHJvdzogbnVtYmVyID0gMTtcbiAgICAgICAgbGV0IGNvbHVtbjogbnVtYmVyID0gMTtcbiAgICAgICAgbGV0IHJlcGVhdCA9IG5ldyBQaGFzZXIuQnV0dG9uKHRoaXMuZ2FtZSwgMTI1LCA3NSAqIHJvdywgJ3VwJywgdGhpcy5fcGxheUxhc3QsIHRoaXMpO1xuICAgICAgICByZXBlYXQuc2V0UGl2b3QoJ2NlbnRlcicpO1xuICAgICAgICB0aGlzLmFkZC5leGlzdGluZyhyZXBlYXQpO1xuICAgICAgICBsZXQgbGFiZWwgPSBuZXcgVGV4dChyZXBlYXQueCwgcmVwZWF0LnkgKyA2MCwgJ1JFUExBWSBMQVNUJywgQ29uc3RhbnRzLkZPTlRfUkFMRVdBWSwgMjAsIENvbnN0YW50cy5TVFJfQkxVRSk7XG4gICAgICAgIGxhYmVsLmNlbnRlclBpdm90KCk7XG4gICAgICAgIHRoaXMuYWRkLmV4aXN0aW5nKGxhYmVsKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3Nwcml0ZURhdGEuc3ByaXRlbWFwKSB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IFBoYXNlci5CdXR0b24odGhpcy5nYW1lLCAyMDAgKygzMDAgKiBjb2x1bW4pLCAyMDAgKiByb3csICd1cCcsIHRoaXMuX3BsYXlTRlgsIHRoaXMpO1xuICAgICAgICAgICAgYnV0dG9uLnNldFBpdm90KCdjZW50ZXInKTtcbiAgICAgICAgICAgIGJ1dHRvbi5uYW1lID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5hZGQuZXhpc3RpbmcoYnV0dG9uKTtcbiAgICAgICAgICAgIGNvbHVtbisrO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiA+PSA0KSB7IFxuICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgIGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYWJlbCA9IG5ldyBUZXh0KGJ1dHRvbi54LCBidXR0b24ueSArIDYwLCBrZXksIENvbnN0YW50cy5GT05UX1JBTEVXQVksIDIwLCBDb25zdGFudHMuU1RSX0JMVUUpO1xuICAgICAgICAgICAgbGFiZWwuY2VudGVyUGl2b3QoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkLmV4aXN0aW5nKGxhYmVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIF9wbGF5TGFzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lLmF1ZGlvLnBsYXlBdWRpbygnZnhfMScsIHRoaXMuX2xhc3RTb3VuZCk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgX3BsYXlTRlgoYnV0dG9uOiBQaGFzZXIuU3ByaXRlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xhc3RTb3VuZCA9IHRoaXMuZ2FtZS5hdWRpby5wbGF5QXVkaW8oJ2Z4XzEnLCBidXR0b24ubmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RvcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVwZWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVOZXdOYW1lKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNHZW5lcmF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNHZW5lcmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX29sZFRpdGxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuX29sZFRpdGxlKS50byh7IHk6IHRoaXMuZ2FtZS5oZWlnaHQgKiAxLjI1IH0sIDM1MCwgUGhhc2VyLkVhc2luZy5DdWJpYy5PdXQsIHRydWUpLm9uQ29tcGxldGUuYWRkT25jZSh0aGlzLl9jbGVhck9sZFRpdGxlLCB0aGlzKTs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0NvcHkgPSB0aGlzLm1lZGlhdG9yLmdldFJhbmRvbVRpdGxlKCk7XG4gICAgICAgIGxldCBuZXdUZXh0ID0gbmV3IFRleHQoMCwgMCwgbmV3Q29weSwgQ29uc3RhbnRzLkZPTlRfUkFMRVdBWSwgdGhpcy5fZm9udFNpemUsIENvbnN0YW50cy5TVFJfTkVXX1RJVExFLCAnY2VudGVyJywgdHJ1ZSwgdGhpcy5nYW1lLndpZHRoKTtcbiAgICAgICAgbmV3VGV4dC5mb250U2l6ZSA9IHRoaXMuX2ZvbnRTaXplICogMC44O1xuICAgICAgICBsZXQgZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygtNTAwLCAwKTtcbiAgICAgICAgZ2Z4LmJlZ2luRmlsbChDb25zdGFudHMuTlVNX09SQU5HRV9CT1gsIDAuOCk7XG4gICAgICAgIGdmeC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgbmV3VGV4dC53aWR0aCAqIDIwLCBuZXdUZXh0LmhlaWdodCArIDIwLCAxMCk7XG4gICAgICAgIGdmeC5lbmRGaWxsKCk7XG5cbiAgICAgICAgdGhpcy5fbmV3VGl0bGUgPSB0aGlzLmFkZC5pbWFnZSh0aGlzLmdhbWUud2lkdGggKiAwLjUsIHRoaXMuZ2FtZS5oZWlnaHQgLSA1MDAsIGdmeC5nZW5lcmF0ZVRleHR1cmUoKSk7XG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5yZW1vdmUoZ2Z4KTtcblxuICAgICAgICB0aGlzLl9uZXdUaXRsZS5zZXRQaXZvdCgnY2VudGVyJyk7XG4gICAgICAgIG5ld1RleHQuc2V0UGl2b3QoJ2NlbnRlcicpO1xuICAgICAgICBuZXdUZXh0LnggPSB0aGlzLl9uZXdUaXRsZS53aWR0aCAqIDAuNTtcbiAgICAgICAgbmV3VGV4dC55ID0gdGhpcy5fbmV3VGl0bGUuaGVpZ2h0ICogMC41O1xuICAgICAgICB0aGlzLl9uZXdUaXRsZS5hZGRDaGlsZChuZXdUZXh0KTtcblxuICAgICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuX25ld1RpdGxlKS50byh7IHk6IHRoaXMuZ2FtZS5oZWlnaHQgKiAwLjUgfSwgMzUwLCBQaGFzZXIuRWFzaW5nLkN1YmljLk91dCwgdHJ1ZSkub25Db21wbGV0ZS5hZGRPbmNlKHRoaXMuX3NldEN1cnJlbnRBc09sZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubWVkaWF0b3IucmVxdWVzdFRUU0F1ZGlvKG5ld0NvcHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFyT2xkVGl0bGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29sZFRpdGxlLnZpc2libGUgPSBmYWxzZTtcbiAgICB9ICAgXG4gICAgXG4gICAgcHJpdmF0ZSBfc2V0Q3VycmVudEFzT2xkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbGRUaXRsZSA9IHRoaXMuX25ld1RpdGxlO1xuICAgICAgICB0aGlzLl9pc0dlbmVyYXRpbmcgPSBmYWxzZTtcbiAgICB9ICAgIFxuXG4gICAgcHJpdmF0ZSBnZXQgbWVkaWF0b3IoKTogTWVudU1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxNZW51TWVkaWF0b3I+dGhpcy5fbWVkaWF0b3I7XG4gICAgfVxufVxuICAiLCJpbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tIFwiZGlqb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCB7R2FtZX0gZnJvbSBcImRpam9uL2NvcmVcIjtcbmltcG9ydCB7RGV2aWNlfSBmcm9tIFwiZGlqb24vdXRpbHNcIjtcbmltcG9ydCB7Q29weU1vZGVsfSBmcm9tIFwiZGlqb24vbXZjXCI7XG5cbmltcG9ydCBBcHBsaWNhdGlvbk1lZGlhdG9yIGZyb20gXCIuL21lZGlhdG9yL0FwcGxpY2F0aW9uTWVkaWF0b3JcIjtcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4vdXRpbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tIFwiLi91dGlscy9Ob3RpZmljYXRpb25zXCI7XG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZS9Cb290XCI7XG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZS9QcmVsb2FkXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi9zdGF0ZS9NZW51XCI7XG5pbXBvcnQge0dhbWVNb2RlbH0gZnJvbSBcIi4vbW9kZWwvR2FtZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvaWxlcnBsYXRlQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG4gICAgcHVibGljIGdhbWVJZDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgcmVzcG9uc2l2ZVZvaWNlOiBhbnk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGVzXG4gICAgcHVibGljIGNyZWF0ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBHYW1lKHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9nZXRHYW1lV2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZ2V0R2FtZUhlaWdodCgpLFxuICAgICAgICAgICAgcGFyZW50OiAnZ2FtZS1jb250YWluZXInLFxuICAgICAgICAgICAgLy9yZW5kZXJlcjogUGhhc2VyLkNBTlZBUyxcbiAgICAgICAgICAgIHJlbmRlcmVyOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHVzZSB0aGlzIGlmIHlvdSB3YW50IHRvIHN3aXRjaCBiZXR3ZWVuIEAyeCBhbmQgQDF4IGdyYXBoaWNzXG4gICAgICAgICAgICByZXNvbHV0aW9uOiB0aGlzLl9nZXRSZXNvbHV0aW9uKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgQXBwbGljYXRpb25NZWRpYXRvcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkU3RhdGVzKCk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICBwdWJsaWMgc3RhcnRHYW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoQ29uc3RhbnRzLlNUQVRFX0JPT1QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkQ29tcGxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzcG9uc2l2ZVZvaWNlID0gd2luZG93WydyZXNwb25zaXZlVm9pY2UnXTtcbiAgICAgICAgY29uc29sZS5sb2cod2luZG93KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHRzVGV4dChyZWFkVGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChyZWFkVGV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlVm9pY2Uuc3BlYWsocmVhZFRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkanVzdFNjYWxlU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgICAgIGlmIChEZXZpY2UuY29jb29uKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZXZpY2UuZGVza3RvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NhbGUuZm9yY2VMYW5kc2NhcGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjYWxlLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGp1c3RSZW5kZXJlclNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWUuZm9yY2VTaW5nbGVVcGRhdGUgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZ2FtZS5jYW1lcmEucm91bmRQeCA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZ2FtZS5yZW5kZXJlci5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5nYW1lLmFudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5nYW1lLnJlbmRlcmVyLmNsZWFyQmVmb3JlUmVuZGVyID0gdGhpcy5nYW1lLnJlbmRlclR5cGUgPT09IFBoYXNlci5DQU5WQVM7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGZyb20gdGhlIGJvb3Qgc3RhdGUgYXMgd2UgY2FuJ3QgaW5pdGlhbGl6ZSBwbHVnaW5zIHVudGlsIHRoZSBnYW1lIGlzIGJvb3RlZFxuICAgIHB1YmxpYyByZWdpc3Rlck1vZGVscygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVsID0gbmV3IEdhbWVNb2RlbCgnZ2FtZV9kYXRhJyk7XG4gICAgICAgIGNvbnN0IGNvcHlNb2RlbCA9IG5ldyBDb3B5TW9kZWwoJ2NvcHknKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgICAvLyBhZGRzIHN0YXRlc1xuICAgIHByaXZhdGUgX2FkZFN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLmFkZChDb25zdGFudHMuU1RBVEVfQk9PVCwgQm9vdCk7XG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5hZGQoQ29uc3RhbnRzLlNUQVRFX1BSRUxPQUQsIFByZWxvYWQpO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuYWRkKENvbnN0YW50cy5TVEFURV9NRU5VLCBNZW51KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHYW1lV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEdhbWVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZXNvbHV0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIGlmIChBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpICYmICFpc05hTihBcHBsaWNhdGlvbi5xdWVyeVZhcigncmVzb2x1dGlvbicpKSkge1xuICAgICAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLnF1ZXJ5VmFyKCdyZXNvbHV0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERldmljZS5tb2JpbGUgPyAxIDogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSA/IDIgOiAxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZW5kZXJlckJ5RGV2aWNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBEZXZpY2UubW9iaWxlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDwgMiA/IFBoYXNlci5DQU5WQVMgOiBQaGFzZXIuQVVUTztcbiAgICB9XG4gICAgXG4gICAgLy8gZ2V0dGVyIC8gc2V0dGVyXG4gICAgcHVibGljIGdldCBtZWRpYXRvcigpOiBBcHBsaWNhdGlvbk1lZGlhdG9yIHtcbiAgICAgICAgcmV0dXJuIDxBcHBsaWNhdGlvbk1lZGlhdG9yPnRoaXMuX21lZGlhdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZ2FtZU1vZGVsKCk6IEdhbWVNb2RlbCB7XG4gICAgICAgIHJldHVybiA8R2FtZU1vZGVsPnRoaXMucmV0cmlldmVNb2RlbChHYW1lTW9kZWwuTU9ERUxfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3B5TW9kZWwoKTogQ29weU1vZGVsIHtcbiAgICAgICAgcmV0dXJuIDxDb3B5TW9kZWw+dGhpcy5yZXRyaWV2ZU1vZGVsKENvcHlNb2RlbC5NT0RFTF9OQU1FKTtcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3N1Ym1vZHVsZXMvZGlqb24vYnVpbGQvZGlqb24uZC50c1wiLz4gIFxuaW1wb3J0IEJvaWxlclBsYXRlQXBwbGljYXRpb24gZnJvbSAnLi9Cb2lsZXJQbGF0ZUFwcGxpY2F0aW9uJztcblxuLy8gYm9vdHN0cmFwIHRoZSBhcHBcbmV4cG9ydCBjb25zdCBhcHAgPSBuZXcgQm9pbGVyUGxhdGVBcHBsaWNhdGlvbigpOyIsImltcG9ydCB7R3JvdXAsIFRleHR9IGZyb20gJ2Rpam9uL2Rpc3BsYXknO1xuaW1wb3J0IHtJUHJlbG9hZEhhbmRsZXJ9IGZyb20gJ2Rpam9uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkZXIgZXh0ZW5kcyBHcm91cCBpbXBsZW1lbnRzIElQcmVsb2FkSGFuZGxlciB7XG4gICAgc3RhdGljIFRFU1Q6IG51bWJlciA9IDE7XG4gICAgc3RhdGljIFRFU1RfMjogbnVtYmVyID0gMjtcblxuICAgIHByaXZhdGUgX3dpcGVyOiBQaGFzZXIuSW1hZ2U7XG4gICAgcHJpdmF0ZSBfbG9hZFRleHQ6IFRleHQ7XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluQ29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuICAgIHB1YmxpYyB0cmFuc2l0aW9uT3V0Q29tcGxldGU6IFBoYXNlci5TaWduYWwgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xuXG4gICAgcHJpdmF0ZSBfaW5Ud2VlbjogUGhhc2VyLlR3ZWVuO1xuICAgIHByaXZhdGUgX291dFR3ZWVuOiBQaGFzZXIuVHdlZW47XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIG5hbWUsIHRydWUpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xuICAgIH1cblxuICAgIC8vIEdyb3VwIG92ZXJyaWRlc1xuICAgIHByb3RlY3RlZCBidWlsZEludGVyZmFjZSgpIHtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQgPSB0aGlzLmFkZEludGVybmFsLmRUZXh0KDUwLCA1MCwgJ0xvYWRpbmcgLi4uICcsICdBcmlhbCcsIDM2LCAnI0ZGRkZGRicpO1xuXG4gICAgICAgIGxldCBnZnggPSB0aGlzLmdhbWUuYWRkLmdyYXBoaWNzKCk7XG4gICAgICAgIGdmeC5iZWdpbkZpbGwoMHgwMDAwMDAsIDEpO1xuICAgICAgICBnZnguZHJhd1JlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgZ2Z4LmVuZEZpbGwoKTtcblxuICAgICAgICB0aGlzLl93aXBlciA9IHRoaXMuYWRkSW50ZXJuYWwuaW1hZ2UoMCwgMCwgZ2Z4LmdlbmVyYXRlVGV4dHVyZSgpKTtcblxuICAgICAgICB0aGlzLmdhbWUud29ybGQucmVtb3ZlKGdmeCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2luVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDEgfSwgMzAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQpO1xuICAgICAgICB0aGlzLl9vdXRUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oeyBhbHBoYTogMCB9LCAyMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluKTtcblxuICAgICAgICB0aGlzLl9pblR3ZWVuLm9uQ29tcGxldGUuYWRkKHRoaXMuX2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fb3V0VHdlZW4ub25Db21wbGV0ZS5hZGQodGhpcy5fb3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBpUHJlbG9hZEhhbmRsZXIgaW1wbGVtZW50YXRpb25zXG4gICAgcHVibGljIGxvYWRTdGFydCgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgcm91bmRlZFByb2dyZXNzID0gTWF0aC5yb3VuZChwcm9ncmVzcykudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5fbG9hZFRleHQuc2V0VGV4dCgnTG9hZGluZyAuLi4gJyArIHJvdW5kZWRQcm9ncmVzcyArICclJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRDb21wbGV0ZSgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkluKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pblR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25PdXQoKSB7XG4gICAgICAgIHRoaXMuX291dFR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gICAgcHJvdGVjdGVkIF9pbigpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSW5Db21wbGV0ZS5kaXNwYXRjaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb3V0KCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uT3V0Q29tcGxldGUuZGlzcGF0Y2goKTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
