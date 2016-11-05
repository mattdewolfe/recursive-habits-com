!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register('2', ['3', '4', '5', '6'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var utils_1, BaseMediator_1, Constants_1, Notifications_1;
    var ApplicationMediator;
    return {
        setters: [function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (BaseMediator_1_1) {
            BaseMediator_1 = BaseMediator_1_1;
        }, function (Constants_1_1) {
            Constants_1 = Constants_1_1;
        }, function (Notifications_1_1) {
            Notifications_1 = Notifications_1_1;
        }],
        execute: function () {
            ApplicationMediator = function (_super) {
                __extends(ApplicationMediator, _super);
                function ApplicationMediator() {
                    _super.apply(this, arguments);
                }
                // dijon.mvc.Mediator overrides
                ApplicationMediator.prototype.listNotificationInterests = function () {
                    return [Notifications_1.default.BOOT_INIT, Notifications_1.default.BOOT_COMPLETE, Notifications_1.default.PRELOAD_COMPLETE, Notifications_1.default.REQUEST_TTS_AUDIO];
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
                    // getter / setter
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
            }(BaseMediator_1.default);
            exports_1("default", ApplicationMediator);
        }
    };
});
$__System.register('7', ['4', '6'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseMediator_1, Notifications_1;
    var BootMediator;
    return {
        setters: [function (BaseMediator_1_1) {
            BaseMediator_1 = BaseMediator_1_1;
        }, function (Notifications_1_1) {
            Notifications_1 = Notifications_1_1;
        }],
        execute: function () {
            BootMediator = function (_super) {
                __extends(BootMediator, _super);
                function BootMediator() {
                    _super.apply(this, arguments);
                }
                // dijon.mvc.Mediator overrides
                BootMediator.prototype.onRegister = function () {
                    this.sendNotification(Notifications_1.default.BOOT_INIT);
                };
                // public methods
                // called from viewComponent
                BootMediator.prototype.bootComplete = function () {
                    this.sendNotification(Notifications_1.default.BOOT_COMPLETE);
                };
                Object.defineProperty(BootMediator.prototype, "name", {
                    // getter / setter
                    get: function () {
                        return BootMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                BootMediator.MEDIATOR_NAME = 'bootMediator';
                return BootMediator;
            }(BaseMediator_1.default);
            exports_1("default", BootMediator);
        }
    };
});
$__System.register("8", ["9", "7"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseState_1, BootMediator_1;
    var Boot;
    return {
        setters: [function (BaseState_1_1) {
            BaseState_1 = BaseState_1_1;
        }, function (BootMediator_1_1) {
            BootMediator_1 = BootMediator_1_1;
        }],
        execute: function () {
            Boot = function (_super) {
                __extends(Boot, _super);
                function Boot() {
                    _super.apply(this, arguments);
                }
                // Phaser.State overrides
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
                // dijon.core.State overrides
                Boot.prototype.buildInterface = function () {
                    this.mediator.bootComplete();
                };
                Object.defineProperty(Boot.prototype, "mediator", {
                    // private methods
                    // getter / setter
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Boot;
            }(BaseState_1.default);
            exports_1("default", Boot);
        }
    };
});
$__System.register('a', ['5', '4', '6'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Constants_1, BaseMediator_1, Notifications_1;
    var PreloadMediator;
    return {
        setters: [function (Constants_1_1) {
            Constants_1 = Constants_1_1;
        }, function (BaseMediator_1_1) {
            BaseMediator_1 = BaseMediator_1_1;
        }, function (Notifications_1_1) {
            Notifications_1 = Notifications_1_1;
        }],
        execute: function () {
            PreloadMediator = function (_super) {
                __extends(PreloadMediator, _super);
                function PreloadMediator() {
                    _super.apply(this, arguments);
                }
                // public methods
                // called from Preload state
                PreloadMediator.prototype.notifyPreloadComplete = function () {
                    this.sendNotification(Notifications_1.default.PRELOAD_COMPLETE);
                };
                PreloadMediator.prototype.next = function () {
                    this.game.transition.to(Constants_1.default.STATE_MENU);
                };
                Object.defineProperty(PreloadMediator.prototype, "name", {
                    // getter / setter
                    get: function () {
                        return PreloadMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                PreloadMediator.MEDIATOR_NAME = 'preloadMediator';
                return PreloadMediator;
            }(BaseMediator_1.default);
            exports_1("default", PreloadMediator);
        }
    };
});
$__System.register("b", ["9", "a"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseState_1, PreloadMediator_1;
    var Preload;
    return {
        setters: [function (BaseState_1_1) {
            BaseState_1 = BaseState_1_1;
        }, function (PreloadMediator_1_1) {
            PreloadMediator_1 = PreloadMediator_1_1;
        }],
        execute: function () {
            Preload = function (_super) {
                __extends(Preload, _super);
                function Preload() {
                    _super.apply(this, arguments);
                }
                // Phaser.State overrides
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
                    // getter / setter
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Preload;
            }(BaseState_1.default);
            exports_1("default", Preload);
        }
    };
});
$__System.register("9", ["c"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1;
    var BaseState;
    return {
        setters: [function (core_1_1) {
            core_1 = core_1_1;
        }],
        execute: function () {
            BaseState = function (_super) {
                __extends(BaseState, _super);
                function BaseState() {
                    _super.apply(this, arguments);
                }
                return BaseState;
            }(core_1.State);
            exports_1("default", BaseState);
        }
    };
});
$__System.register('5', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Constants;
    return {
        setters: [],
        execute: function () {
            Constants = function () {
                function Constants() {}
                Constants.STATE_BOOT = 'boot';
                Constants.STATE_PRELOAD = 'preload';
                Constants.STATE_MENU = 'menu';
                // fonts
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
            }();
            exports_1("default", Constants);
        }
    };
});
$__System.register("4", ["d", "e", "f"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var mvc_1, application_1, GameModel_1;
    var BaseMediator;
    return {
        setters: [function (mvc_1_1) {
            mvc_1 = mvc_1_1;
        }, function (application_1_1) {
            application_1 = application_1_1;
        }, function (GameModel_1_1) {
            GameModel_1 = GameModel_1_1;
        }],
        execute: function () {
            BaseMediator = function (_super) {
                __extends(BaseMediator, _super);
                function BaseMediator() {
                    _super.apply(this, arguments);
                }
                // public methods
                // so any mediator extending BaseMediator can get copy
                BaseMediator.prototype.getCopy = function (groupId, textId) {
                    return this.copyModel.getCopy(groupId, textId);
                };
                Object.defineProperty(BaseMediator.prototype, "gameModel", {
                    // getter / setter
                    // offer access to the GameModel and CopyModel from any mediator extending BaseMediator
                    get: function () {
                        return application_1.Application.getInstance().retrieveModel(GameModel_1.GameModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseMediator.prototype, "copyModel", {
                    get: function () {
                        return application_1.Application.getInstance().retrieveModel(mvc_1.CopyModel.MODEL_NAME);
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
            }(mvc_1.Mediator);
            exports_1("default", BaseMediator);
        }
    };
});
$__System.register('6', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Notifications;
    return {
        setters: [],
        execute: function () {
            Notifications = function () {
                function Notifications() {}
                Notifications.BOOT_INIT = 'bootInit';
                Notifications.BOOT_COMPLETE = 'bootComplete';
                Notifications.PRELOAD_COMPLETE = 'preloadComplete';
                Notifications.REQUEST_TTS_AUDIO = 'requestTTS';
                return Notifications;
            }();
            exports_1("default", Notifications);
        }
    };
});
$__System.register('10', ['4', '6'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseMediator_1, Notifications_1;
    var MenuMediator;
    return {
        setters: [function (BaseMediator_1_1) {
            BaseMediator_1 = BaseMediator_1_1;
        }, function (Notifications_1_1) {
            Notifications_1 = Notifications_1_1;
        }],
        execute: function () {
            MenuMediator = function (_super) {
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
                MenuMediator.prototype.getPresetShipNames = function () {
                    return this.gameModel.singleShipNames;
                };
                MenuMediator.prototype.requestTTSAudio = function (readText) {
                    this.sendNotification(Notifications_1.default.REQUEST_TTS_AUDIO, readText);
                };
                Object.defineProperty(MenuMediator.prototype, "audioSpriteData", {
                    get: function () {
                        return this.gameModel.getData()['audiosprite'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MenuMediator.prototype, "name", {
                    // getter / setter
                    get: function () {
                        return MenuMediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                MenuMediator.MEDIATOR_NAME = 'menuMediator';
                return MenuMediator;
            }(BaseMediator_1.default);
            exports_1("default", MenuMediator);
        }
    };
});
$__System.register('11', ['9', '5', '12', '3', '10'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseState_1, Constants_1, display_1, utils_1, MenuMediator_1;
    var Menu;
    return {
        setters: [function (BaseState_1_1) {
            BaseState_1 = BaseState_1_1;
        }, function (Constants_1_1) {
            Constants_1 = Constants_1_1;
        }, function (display_1_1) {
            display_1 = display_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (MenuMediator_1_1) {
            MenuMediator_1 = MenuMediator_1_1;
        }],
        execute: function () {
            Menu = function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.apply(this, arguments);
                    this._isGenerating = false;
                }
                // Phaser.State overrides
                Menu.prototype.init = function () {
                    this._mediator = new MenuMediator_1.default();
                    this._oldTitle = null;
                    this._newTitle = null;
                    this._fontSize = (this.game.width + this.game.height) * 0.5 * 0.065;
                    this._presetNames = this.mediator.getPresetShipNames();
                    this._currentPresetName = Math.floor(Math.random() * this._presetNames.length);
                };
                Menu.prototype.preload = function () {
                    this.game.asset.loadAssets('required');
                };
                // dijon.core.State overrides
                Menu.prototype.listBuildSequence = function () {
                    return [this._buildBorders, this._addVisuals];
                };
                Menu.prototype.afterBuild = function () {
                    _super.prototype.afterBuild.call(this);
                };
                Menu.prototype.resize = function (width, height) {
                    this.clearVisuals();
                    this._buildBorders();
                    this._addVisuals();
                };
                Menu.prototype.clearVisuals = function () {
                    this._title.destroy();
                    this._button.destroy();
                    this._button2.destroy();
                    this._bg.destroy();
                };
                Menu.prototype._buildBorders = function () {
                    var gfx = this.game.add.graphics();
                    gfx.beginFill(Constants_1.default.NUM_ORANGE_BORDER, 0.8);
                    gfx.drawRoundedRect(5, 5, this.game.width - 10, this.game.height - 10, 10);
                    gfx.endFill();
                    gfx.beginFill(0x000000, 1.0);
                    gfx.drawRoundedRect(10, 10, this.game.width - 20, this.game.height - 20, 10);
                    gfx.endFill();
                    this._bg = this.add.image(5, 5, gfx.generateTexture());
                    this.game.world.remove(gfx);
                };
                // private methods
                Menu.prototype._addVisuals = function () {
                    this._title = this.game.add.dText(this.game.width * 0.5, this.game.height * 0.1, 'AND THE SHIP WAS NAMED...', Constants_1.default.FONT_RALEWAY, this._fontSize, Constants_1.default.STR_BLUE);
                    this._title.centerPivot();
                    this._button = utils_1.Placeholders.button(this.game.width * 0.75, this.game.height * 0.35, this.game.width * 0.35, this.game.width * 0.05, false, 'RANDOM NAME', this._generateShipName, this);
                    this._button.centerPivot();
                    this.add.existing(this._button);
                    this._button2 = utils_1.Placeholders.button(this.game.width * 0.25, this.game.height * 0.35, this.game.width * 0.35, this.game.width * 0.05, false, 'PRESET NAME', this._getPresetName, this);
                    this._button2.centerPivot();
                    this.add.existing(this._button2);
                };
                Menu.prototype._generateShipName = function () {
                    if (this._isGenerating === true) {
                        return;
                    }
                    this._isGenerating = true;
                    this._removeOldTitle();
                    this.updateAndShowNewName(this.mediator.getRandomShipTitle());
                };
                Menu.prototype._getPresetName = function () {
                    if (this._isGenerating === true) {
                        return;
                    }
                    this._isGenerating = true;
                    this._removeOldTitle();
                    if (this._currentPresetName >= this._presetNames.length) {
                        this._currentPresetName = 0;
                    }
                    this.updateAndShowNewName(this._presetNames[this._currentPresetName]);
                    this._currentPresetName++;
                };
                Menu.prototype.updateAndShowNewName = function (newName) {
                    var newText = new display_1.Text(0, 0, newName.toUpperCase(), Constants_1.default.FONT_RALEWAY, this._fontSize, Constants_1.default.STR_NEW_TITLE, 'center', true, this.game.width);
                    newText.fontSize = this._fontSize * 0.8;
                    var gfx = this.game.add.graphics(-500, 0);
                    gfx.beginFill(Constants_1.default.NUM_ORANGE_BOX, 0.8);
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
                    this.mediator.requestTTSAudio(newName);
                };
                Menu.prototype._generateNewName = function () {
                    if (this._isGenerating === true) {
                        return;
                    }
                    this._isGenerating = true;
                    this._removeOldTitle();
                    this.updateAndShowNewName(this.mediator.getRandomTitle());
                };
                Menu.prototype._removeOldTitle = function () {
                    if (this._oldTitle !== null) {
                        this.game.add.tween(this._oldTitle).to({ y: this.game.height * 1.25 }, 350, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(this._clearOldTitle, this);
                        ;
                    }
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
            }(BaseState_1.default);
            exports_1("default", Menu);
        }
    };
});
$__System.register('13', ['14'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Model_1;
    var CopyModel;
    return {
        setters: [function (Model_1_1) {
            Model_1 = Model_1_1;
        }],
        execute: function () {
            CopyModel = function (_super) {
                __extends(CopyModel, _super);
                function CopyModel(dataKey) {
                    if (dataKey === void 0) {
                        dataKey = null;
                    }
                    _super.call(this, dataKey);
                    this._languages = {};
                    this._languages['en'] = this._data;
                }
                CopyModel.prototype.getCopy = function (groupId, itemId) {
                    return this.getCopyGroup(groupId)[itemId];
                };
                CopyModel.prototype.getCopyGroup = function (groupId) {
                    return this._data[groupId];
                };
                CopyModel.prototype.addLanguage = function (languageId, dataKey) {
                    if (!this.getKeyExists(dataKey)) {
                        throw new Error('cannot add an alternate language from key ' + dataKey + '. Is it in the Phaser cache?');
                    }
                    this._languages[languageId] = this.game.cache.getJSON(dataKey);
                };
                CopyModel.prototype.changeLanguage = function (languageId) {
                    if (typeof this._languages[languageId] === 'undefined') throw new Error('there is no language ' + languageId);
                    this._data = this._languages[languageId];
                };
                Object.defineProperty(CopyModel.prototype, "name", {
                    get: function () {
                        return CopyModel.MODEL_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                CopyModel.MODEL_NAME = 'copyModel';
                return CopyModel;
            }(Model_1.Model);
            exports_1("CopyModel", CopyModel);
        }
    };
});
$__System.register("15", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var Mediator;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Mediator = function () {
                function Mediator(_viewComponent, autoReg, mediatorName) {
                    if (_viewComponent === void 0) {
                        _viewComponent = null;
                    }
                    if (autoReg === void 0) {
                        autoReg = true;
                    }
                    if (mediatorName === void 0) {
                        mediatorName = null;
                    }
                    this._viewComponent = _viewComponent;
                    this.mediatorName = null;
                    this.app = application_1.Application.getInstance();
                    this.game = this.app.game;
                    this.mediatorName = mediatorName;
                    if (autoReg) {
                        this.register();
                    }
                }
                // private methods
                Mediator.prototype.register = function () {
                    this.app.registerMediator(this);
                };
                Mediator.prototype.remove = function () {
                    this.app.removeMediator(this);
                };
                Mediator.prototype.onRegister = function () {
                    // override me freely
                };
                Mediator.prototype.onRemoved = function () {};
                Mediator.prototype.destroy = function () {
                    this.remove();
                };
                Mediator.prototype.listNotificationInterests = function () {
                    return [];
                };
                Mediator.prototype.handleNotification = function (notification) {
                    /**
                     * default immplementation would look something like:
                     * switch( notification: dijon.INotification ){
                     * 		case Notifications.SOMETHING:
                     * 			// do something
                     * 			break;
                     * 		case Notifications.SOMETHING_ELSE:
                     * 			// do something else
                     * 			break;
                     * }
                     */
                };
                Mediator.prototype.sendNotification = function (notificationName, notificationBody) {
                    this.app.sendNotification(notificationName, notificationBody);
                };
                Object.defineProperty(Mediator.prototype, "viewComponent", {
                    get: function () {
                        return this._viewComponent;
                    },
                    // getter / setter
                    set: function (viewComponent) {
                        this._viewComponent = viewComponent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mediator.prototype, "name", {
                    get: function () {
                        return this.mediatorName || Mediator.MEDIATOR_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Mediator.MEDIATOR_NAME = 'Mediator';
                return Mediator;
            }();
            exports_1("Mediator", Mediator);
        }
    };
});
$__System.register('16', ['3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var utils_1;
    var AnalyticsManager, AnalyticsException;
    return {
        setters: [function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            AnalyticsManager = function () {
                function AnalyticsManager(enabled, category) {
                    if (enabled === void 0) {
                        enabled = true;
                    }
                    if (category === void 0) {
                        category = null;
                    }
                    this.enabled = enabled;
                    this.category = category;
                    // for cocoon only
                    this._trackerId = null;
                    this._startedWithTrackerId = false;
                }
                AnalyticsManager.prototype.trackEvent = function (action, label, value) {
                    if (action === void 0) {
                        action = null;
                    }
                    if (label === void 0) {
                        label = null;
                    }
                    if (value === void 0) {
                        value = null;
                    }
                    if (!this.active || !this.enabled) {
                        return;
                    }
                    if (!action) {
                        throw new AnalyticsException('No action defined');
                    }
                    if (utils_1.Device.cocoon && window['analytics'] !== undefined) {
                        var analytics = window['analytics'];
                        analytics.trackEvent(this.category, action, label, value);
                        return;
                    }
                    if (value) {
                        this.ga('send', 'event', this.category, action, label, value);
                    } else if (label) {
                        this.ga('send', 'event', this.category, action, label);
                    } else {
                        this.ga('send', 'event', this.category, action);
                    }
                };
                AnalyticsManager.prototype.trackOmnitureEvent = function (gameName, activity, isGameEvent) {
                    if (!this.enabled) {
                        return;
                    }
                    //console.log('tracking omniture', gameName, activity, isGameEvent);
                    if (typeof window['trackFlashEvent'] === 'undefined') return false;
                    window['trackFlashEvent'](gameName, activity, isGameEvent);
                };
                AnalyticsManager.prototype._startWithTrackerId = function () {
                    var self = this;
                    if (utils_1.Device.cocoon && window['analytics'] !== undefined) {
                        var analytics = window['analytics'];
                        analytics.startTrackerWithId(this._trackerId);
                    }
                };
                Object.defineProperty(AnalyticsManager.prototype, "trackerId", {
                    get: function () {
                        return this._trackerId;
                    },
                    set: function (value) {
                        this._trackerId = value;
                        if (!this._startedWithTrackerId) {
                            this._startWithTrackerId();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnalyticsManager.prototype, "active", {
                    // getter / setter
                    get: function () {
                        return window['ga'] || utils_1.Device.cocoon && window['analytics'] !== undefined ? true : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnalyticsManager.prototype, "ga", {
                    get: function () {
                        return window['ga'];
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnalyticsManager;
            }();
            exports_1("AnalyticsManager", AnalyticsManager);
            AnalyticsException = function () {
                function AnalyticsException(message) {
                    this.message = message;
                    this.name = 'AnalyticsException';
                }
                return AnalyticsException;
            }();
            exports_1("AnalyticsException", AnalyticsException);
        }
    };
});
/**
 * Wraps Phaser.Loader
*/
$__System.register('17', ['e', '3', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1, utils_1, display_1;
    var AssetManager;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (display_1_1) {
            display_1 = display_1_1;
        }],
        execute: function () {
            /**
             * Wraps Phaser.Loader
            */
            AssetManager = function () {
                function AssetManager() {
                    // private variables
                    this._data = {};
                    this._baseURL = '';
                    this._pathObj = {};
                    this._assetPath = null;
                    this._dataPath = null;
                    this._spriteSheetPath = null;
                    this._imgPath = null;
                    this._videoPath = null;
                    this._spinePath = null;
                    this._fontPath = null;
                    this._bitmapFontPath = null;
                    this._physicsPath = null;
                    this._audioSpritePath = null;
                    this._soundPath = null;
                    this._soundDecodingModifier = 2;
                    this._res = 1;
                    this._resolution = null;
                    this._loadData = {};
                    this._autoLoadData = {};
                    this._completedLoads = {};
                    this._requiredData = {};
                    this._currentAssetList = null;
                    this._hasFiles = false;
                    this._soundsToDecode = [];
                    this._isLoadingQueue = false;
                    this._fileCompleteProgress = 0;
                    this._maxPercent = 100;
                    this._numSounds = 0;
                    this._soundsDecoded = 0;
                    this._cacheBustVersion = '';
                    this.onLoadStart = new Phaser.Signal();
                    this.onFileStart = new Phaser.Signal();
                    this.onFileComplete = new Phaser.Signal();
                    this.onLoadComplete = new Phaser.Signal();
                    this.onLoadCompleteAndAudioDecoded = new Phaser.Signal();
                    this.onBackgroundLoadStart = new Phaser.Signal();
                    this.onBackgroundFileStart = new Phaser.Signal();
                    this.onBackgroundFileComplete = new Phaser.Signal();
                    this.onBackgroundLoadComplete = new Phaser.Signal();
                    this.onBackgroundLoadCompleteAndAudioDecoded = new Phaser.Signal();
                    this._init();
                }
                // private methods
                /**
                * adds internal variables and signals
                * @return {void}
                * @private
                */
                AssetManager.prototype._init = function () {
                    this.app = application_1.Application.getInstance();
                    this.game = this.app.game;
                    this.baseURL = '';
                    this.paths = null;
                    this.resolution = this.game.resolution;
                    this._soundsToDecode = [];
                };
                /**
                * parses an asset list by key (usually from data/assets.json) and stores them internally
                * @param  {String} key the id of the list
                * @param  {Array}  list the json array of assets
                * @return {void}
                * @private
                */
                AssetManager.prototype._parseAssetList = function (key, list) {
                    var _this = this;
                    this._autoLoadData[key] = list.autoload;
                    this._requiredData[key] = list.required;
                    this._loadData[key] = [];
                    list.assets.forEach(function (asset) {
                        _this._loadData[key].push(asset);
                    });
                };
                /**
                * adds assets from a list to the load list
                * @param  {String} id id of the list to add
                * @return {void}
                * @private
                */
                AssetManager.prototype._loadAssets = function (id) {
                    var assets = this._loadData[id],
                        i;
                    for (i = 0; i < assets.length; i++) {
                        this._loadAsset(assets[i]);
                    }
                };
                /**
                * start the background loading
                * @return {void}
                * @private
                */
                AssetManager.prototype._backgroundLoadStart = function () {
                    this.onBackgroundLoadStart.dispatch();
                };
                /**
                * when a file completes in an background load queue - dispatches the onBackgroundFileComplete signal
                * @param  {Number} progress   the percent progress
                * @param  {String} id         the file id
                * @param  {int}    fileIndex  the index of the file in the list
                * @param  {int}    totalFiles the total number of files in the list
                * @return {void}
                * @private
                */
                AssetManager.prototype._backgroundFileComplete = function (progress, id, fileIndex, totalFiles) {
                    if (this.game.cache.checkKey(Phaser.Cache.IMAGE, id)) {
                        this._setBaseTextureResolution(this.game.cache.getBaseTexture(id));
                    }
                    this._fileCompleteProgress = progress;
                    this.onBackgroundFileComplete.dispatch(progress, id, fileIndex, totalFiles);
                };
                /**
                * when the background load completes - dispatches the onBackgroundLoadComplete signal, starts checking for decoded sounds
                * @return {void}
                * @private
                */
                AssetManager.prototype._backgroundLoadComplete = function () {
                    this.game.load.onFileComplete.remove(this._backgroundFileComplete, this);
                    this.onBackgroundLoadComplete.dispatch();
                    this._checkSoundDecoding(this.onBackgroundLoadCompleteAndAudioDecoded);
                };
                /**
                * when the asset list starts loading, dispatches the onLoadStart signal
                * @return {void}
                */
                AssetManager.prototype._gameLoadStart = function () {
                    this.onLoadStart.dispatch();
                };
                /**
                * when a file starts loading - dispatches the onFileStart signal
                * @return {void}
                */
                AssetManager.prototype._gameFileStart = function () {
                    this.onFileStart.dispatch();
                };
                /**
                * when a file completes in the game load - dispatches the onFileComplete signal
                * @param  {Number} progress   the percent progress
                * @param  {String} id         the file id
                * @param  {int}    fileIndex  the index of the file in the list
                * @param  {int}    totalFiles the total number of files in the list
                * @return {void}
                * @private
                */
                AssetManager.prototype._gameFileComplete = function (progress, id, fileIndex, totalFiles) {
                    if (this.game.cache.checkKey(Phaser.Cache.IMAGE, id)) {
                        this._setBaseTextureResolution(this.game.cache.getBaseTexture(id));
                    }
                    // else if (this.game.cache.checkKey(Phaser.Cache.BITMAPFONT, id)){
                    //     this._setBaseTextureResolution(this.game.cache.getBaseTexture(id, Phaser.Cache.BITMAPFONT));
                    //     console.log('id', id, this.game.cache.getBaseTexture(id, Phaser.Cache.BITMAPFONT).resolution);
                    // }
                    this._fileCompleteProgress = progress;
                    this.onFileComplete.dispatch(this.getLoadProgress(), id, fileIndex, totalFiles);
                };
                AssetManager.prototype._setBaseTextureResolution = function (texture) {
                    if (texture && texture.source.src.indexOf('@' + this.resolution + 'x') >= 0) {
                        texture.resolution = this.resolution;
                    }
                };
                ;
                /**
                * when the background load completes - dispatches the onLoadComplete signal, starts checking for decoded sounds
                * @return {void}
                * @private
                */
                AssetManager.prototype._gameLoadComplete = function () {
                    this._completedLoads[this._currentAssetList] = true;
                    this.onLoadComplete.dispatch();
                    this.game.load.onFileStart.remove(this._gameFileStart, this);
                    this.game.load.onFileComplete.remove(this._gameFileComplete, this);
                    this._checkSoundDecoding(this.onLoadCompleteAndAudioDecoded);
                };
                /**
                * checks if all the sounds in the queue are decoded
                * @param  {Phaser.Signal} eventToDispatch the signal to be dispatched when all sounds are decoded
                * @return {void}
                * @private
                */
                AssetManager.prototype._checkSoundDecoding = function (eventToDispatch) {
                    var sound, i, isAudioSprite;
                    if (this._soundsToDecode && this._soundsToDecode.length > 0) {
                        for (i = 0; i < this._soundsToDecode.length; i++) {
                            isAudioSprite = this._soundsToDecode[i].isAudioSprite;
                            sound = this.game.add.sound(this._soundsToDecode[i].url);
                            sound.__isAudioSprite = isAudioSprite;
                            sound.eventToDispatch = eventToDispatch;
                            sound.onDecoded.addOnce(this._onSoundDecoded, this);
                        }
                    } else {
                        eventToDispatch.dispatch();
                    }
                };
                /**
                * when a sound is decoded, this method removes it from the _soundsToDecode array, and increases the overall percentage loaded
                * @param  {Phaser.Sound} sound the sound being decoded
                * @return {void}
                * @private
                */
                AssetManager.prototype._onSoundDecoded = function (sound) {
                    var soundIndex = this._soundsToDecode.indexOf(sound.key);
                    this._soundsToDecode.splice(soundIndex, 1);
                    if (typeof this.game.audio !== 'undefined' && typeof this.game.audio.addAudio !== 'undefined') {
                        if (sound.__isAudioSprite) this.game.add.audioSprite(sound.key);
                        this.game.audio.addAudio(sound.key, sound.__isAudioSprite);
                    }
                    this._soundsDecoded++;
                    this._maxPercent = 100 - this._numSounds * this.soundDecodingModifier + this._soundsDecoded * this.soundDecodingModifier;
                    this._gameFileComplete(100);
                    if (this._soundsToDecode.length === 0) {
                        sound.eventToDispatch.dispatch();
                    }
                };
                /**
                * shortcut to get an asset key using a file name (strips its extension)
                * @param  {String} fileName the url of the file
                * @return {Stirng}          the asset key (the filename with its extension stripped)
                * @private
                */
                AssetManager.prototype._getAssetKey = function (fileName) {
                    if (fileName.indexOf('.') < 0) return fileName;
                    var ext = fileName.split('.');
                    ext.pop();
                    return ext.join('');
                };
                /**
                * gets the extension of a given file
                * @param  {String} fileName
                * @return {String}          the extension
                * @private
                */
                AssetManager.prototype._getExtension = function (fileName) {
                    return fileName.split('.').pop();
                };
                /**
                * gets the extension of a given file
                * @param  {String} fileName
                * @return {String}          the extension
                * @private
                */
                AssetManager.prototype._getResolution = function (res) {
                    var result = '';
                    if (typeof res === 'string') {
                        res = parseFloat(res);
                    }
                    if (res === undefined) {
                        res = this.resolution;
                    }
                    if (res > 1.5) {
                        result = AssetManager.RESOLUTION_2X;
                    }
                    return result;
                };
                /**
                * determines what kind of asset we're dealing with and adds it to the load queue
                * @param  {Object} asset the asset object we're going to load
                * @return {void}
                * @private
                */
                AssetManager.prototype._loadAsset = function (asset) {
                    var type = asset.type,
                        url = asset.url || asset.key;
                    switch (type) {
                        case AssetManager.ASSET_LIST:
                            this._loadAssets(asset.id);
                            break;
                        case AssetManager.SOUND:
                            this.loadSound(url, asset.extensions);
                            break;
                        case AssetManager.AUDIO_SPRITE:
                            this.loadAudioSprite(url, asset.extensions);
                            break;
                        case AssetManager.IMAGE:
                            this.loadImage(url, this._getResolution(asset.resolution));
                            break;
                        case AssetManager.VIDEO:
                            this.loadVideo(url, this._getResolution(asset.resolution));
                            break;
                        case AssetManager.ATLAS:
                            this.loadAtlas(url, this._getResolution(asset.resolution));
                            break;
                        case AssetManager.TEXT:
                            this.loadText(url);
                            break;
                        case AssetManager.JSON:
                            this.loadJSON(url);
                            break;
                        case AssetManager.TILEMAP:
                            this.loadTilemap(url);
                            break;
                        case AssetManager.TILEDMAP:
                            this.loadTiledmap(url, asset.assets);
                            break;
                        case AssetManager.PHYSICS:
                            this.loadPhysics(url);
                            break;
                        case AssetManager.SPINE:
                            this.loadSpine(url, this._getResolution(asset.resolution));
                            break;
                        case AssetManager.BITMAP_FONT:
                            this.loadBitmapFont(url, this._getResolution(asset.resolution));
                            break;
                    }
                };
                /**
                * parses the data from the external assets file (normally data/assets.json)
                * @return {void}
                * @private
                */
                AssetManager.prototype._parseData = function () {
                    var key;
                    for (key in this._data) {
                        this._parseAssetList(key, this._data[key]);
                    }
                };
                AssetManager.prototype._getCacheBustedUrl = function (url) {
                    if (this._cacheBustVersion === undefined || this._cacheBustVersion === '') {
                        return url;
                    }
                    return url + '?v=' + this._cacheBustVersion;
                };
                // public methods
                AssetManager.prototype.loadText = function (url) {
                    var key = this._getAssetKey(url);
                    return this.game.load.text(key, this._getCacheBustedUrl(this._dataPath + '/' + url));
                };
                AssetManager.prototype.loadJSON = function (key) {
                    key = this._getAssetKey(key);
                    return this.game.load.json(key, this._getCacheBustedUrl(this._dataPath + '/' + key + '.json'));
                };
                AssetManager.prototype.loadTilemap = function (key) {
                    key = this._getAssetKey(key);
                    return this.game.load.tilemap(key, this._getCacheBustedUrl(this._dataPath + '/tilemap/' + key + '.json'), null, Phaser.Tilemap.TILED_JSON);
                };
                AssetManager.prototype.loadTiledmap = function (key, assets) {
                    var _this = this;
                    if (Phaser.Plugin['Tiled'] === undefined) {
                        console.log('tiledmap requires the phaser-tiled plugin from https://github.com/englercj/phaser-tiled');
                        return null;
                    }
                    var cacheKey = Phaser.Plugin['Tiled'].utils.cacheKey;
                    this.game.load['tiledmap'](cacheKey(key, 'tiledmap'), this._getCacheBustedUrl(this._dataPath + '/tilemap/' + key + '.json'), null, Phaser.Tilemap.TILED_JSON);
                    assets.forEach(function (asset) {
                        switch (asset.type) {
                            case AssetManager.TILEDMAP_TILESET:
                            case AssetManager.TILEDMAP_LAYER:
                                _this.loadTiledmapImage(key, asset.type, asset);
                                break;
                        }
                    });
                };
                AssetManager.prototype.loadTiledmapImage = function (key, tilesetImageType, asset) {
                    var cacheKey = Phaser.Plugin['Tiled'].utils.cacheKey;
                    var resolution = '';
                    var newKey = this._getAssetKey(asset.url);
                    var cKey = cacheKey(key, 'tileset', newKey);
                    if (typeof asset.resolution !== 'string') {
                        resolution = this._getResolution(asset.resolution);
                    }
                    var url = this._getAssetKey(newKey + resolution + '.' + this._getExtension(asset.url));
                    console.log(asset.url, cKey);
                    this.game.load.image(cKey, this._getCacheBustedUrl(this._spriteSheetPath + '/' + url + '.png'));
                };
                AssetManager.prototype.loadPhysics = function (key) {
                    key = this._getAssetKey(key);
                    return this.game.load.physics(key, this._getCacheBustedUrl(this._physicsPath + '/' + key + '.json'));
                };
                AssetManager.prototype.loadAtlas = function (url, resolution) {
                    if (typeof resolution !== 'string') {
                        resolution = this._getResolution(resolution);
                    }
                    if (this.game.cache.checkImageKey(url)) {
                        return url;
                    }
                    return this.game.load.atlasJSONHash(url, this._getCacheBustedUrl(this._spriteSheetPath + '/' + url + resolution + '.png'), this._getCacheBustedUrl(this._spriteSheetPath + '/' + url + resolution + '.json'));
                };
                AssetManager.prototype.loadImage = function (url, resolution) {
                    if (typeof resolution !== 'string') {
                        resolution = this._getResolution(resolution);
                    }
                    var key = this._getAssetKey(url);
                    if (this.game.cache.checkImageKey(key)) {
                        // if the image key already exists, don't reload the image and return the key
                        return key;
                    }
                    url = key + resolution + '.' + this._getExtension(url);
                    return this.game.load.image(key, this._getCacheBustedUrl(this._imgPath + '/' + url));
                };
                AssetManager.prototype.loadVideo = function (url, resolution) {
                    if (typeof resolution !== 'string') {
                        resolution = this._getResolution(resolution);
                    }
                    var key = this._getAssetKey(url);
                    if (this.game.cache.checkVideoKey(key)) {
                        // if the image key already exists, don't reload the image and return the key
                        return key;
                    }
                    url = key + resolution + '.' + this._getExtension(url);
                    return this.game.load.video(key, this._getCacheBustedUrl(this._videoPath + '/' + url));
                };
                AssetManager.prototype.loadSpine = function (url, resolution) {
                    if (typeof resolution !== 'string') {
                        resolution = this._getResolution(resolution);
                    }
                    if (resolution === '') {
                        resolution = '@1x';
                    }
                    var key = this._getAssetKey(url);
                    if (this.game.cache.checkImageKey(key)) {
                        // if the image key already exists, don't reload the image and return the key
                        return key;
                    }
                    url = key + resolution + '.png';
                    var jsonUrl = key + '.json';
                    var atlasUrl = key + resolution + '.atlas';
                    this.game.load.json(key + '.json', this._getCacheBustedUrl(this._spinePath + '/' + jsonUrl));
                    this.game.load.text(key + '.atlas', this._getCacheBustedUrl(this._spinePath + '/' + atlasUrl));
                    this.game.load.image(key + '.png', this._getCacheBustedUrl(this._spinePath + '/' + url));
                    if (display_1.Spine.AUTO_MESH === true && key.indexOf(display_1.Spine.NON_MESH_SUFFIX) === -1) {
                        this.loadSpine(key + display_1.Spine.NON_MESH_SUFFIX);
                    }
                };
                AssetManager.prototype.loadBitmapFont = function (url, resolution) {
                    if (typeof resolution !== 'string') {
                        resolution = this._getResolution(resolution);
                    }
                    this.game.load.bitmapFont(url, this._getCacheBustedUrl(this._bitmapFontPath + '/' + url + resolution + '.png'), this._getCacheBustedUrl(this._bitmapFontPath + '/' + url + resolution + '.json'));
                };
                AssetManager.prototype.loadAudio = function (url, exts, isAudioSprite) {
                    var type, path;
                    if (this.game.cache.checkSoundKey(url) && this.game.cache.getSound(url).isDecoded) {
                        return;
                    }
                    // type should be 'sound' or 'sprite' ('fx' and 'music' to be deprecated)
                    // default to sound
                    if (typeof type === 'undefined') {
                        type = 'sound';
                    }
                    if (exts.indexOf(',') >= 0) {
                        exts = exts.split(',');
                    }
                    if (this.game.device.iOS && exts.indexOf('m4a') === -1) {
                        exts.unshift('m4a');
                    }
                    if (typeof exts === 'object') {
                        path = [];
                        for (var i = 0; i < exts.length; i++) {
                            path.push(this._getCacheBustedUrl((isAudioSprite ? this._audioSpritePath : this._soundPath) + '/' + url + '.' + exts[i]));
                        }
                    } else {
                        path = this._getCacheBustedUrl((isAudioSprite ? this._audioSpritePath : this._soundPath) + '/' + type + '/' + url + '.' + exts);
                    }
                    if (isAudioSprite) {
                        this.game.load.audiosprite(url, path, this._audioSpritePath + '/' + url + '.json');
                    } else {
                        this.game.load.audio(url, path);
                    }
                    this._soundsToDecode.push({
                        url: url,
                        isAudioSprite: isAudioSprite
                    });
                };
                AssetManager.prototype.loadSound = function (url, exts) {
                    return this.loadAudio(url, exts, false);
                };
                AssetManager.prototype.loadAudioSprite = function (url, exts) {
                    return this.loadAudio(url, exts, true);
                };
                AssetManager.prototype.loadAssets = function (id, background) {
                    if (background === void 0) {
                        background = false;
                    }
                    this._currentAssetList = id;
                    this.game.load.onFileComplete.remove(this._backgroundFileComplete, this);
                    this.game.load.onFileComplete.remove(this._gameFileComplete, this);
                    this._hasFiles = false;
                    if (this._data === undefined) {
                        return;
                    }
                    if (this._data[id] === undefined || this._data[id].assets === undefined || this._data[id].assets.length < 1) {
                        return console.log('no preload data registered for ', id);
                    }
                    this._loadAssets(id);
                    this._hasFiles = this.game.load.totalQueuedFiles() > 0;
                    if (background) {
                        this.game.load.onLoadStart.addOnce(this._backgroundLoadStart, this);
                        this.game.load.onFileComplete.add(this._backgroundFileComplete, this);
                        this.game.load.onLoadComplete.addOnce(this._backgroundLoadComplete, this);
                    } else {
                        this.game.load.onLoadStart.addOnce(this._gameLoadStart, this);
                        this.game.load.onFileStart.add(this._gameFileStart, this);
                        this.game.load.onFileComplete.add(this._gameFileComplete, this);
                        this.game.load.onLoadComplete.addOnce(this._gameLoadComplete, this);
                    }
                    if (!this._hasFiles) {
                        this._gameLoadStart();
                        this._gameFileComplete(100);
                        this._gameLoadComplete();
                        return;
                    }
                    this._numSounds = this._soundsToDecode.length;
                    this._soundsDecoded = 0;
                    this._maxPercent = 100 - this._numSounds * this.soundDecodingModifier;
                    if (background) {
                        this.game.load.start();
                    }
                };
                AssetManager.prototype.loadQueue = function () {
                    if (this._isLoadingQueue) {
                        return;
                    }
                    if (typeof this._data === 'undefined') {
                        return console.log('no preload queue to load');
                    }
                    var assets, state, i;
                    for (state in this._data) {
                        if (this._autoLoadData[state]) {
                            assets = this._data[state].assets;
                            for (i = 0; i < assets.length; i++) {
                                this._loadAsset(assets[i]);
                            }
                        }
                    }
                    this.game.load.start();
                    this._isLoadingQueue = true;
                    this.game.load.onLoadStart.addOnce(this._backgroundLoadStart, this);
                    this.game.load.onFileComplete.add(this._backgroundFileComplete, this);
                    this.game.load.onLoadComplete.addOnce(this._backgroundLoadComplete, this);
                };
                AssetManager.prototype.getLoadProgress = function () {
                    var adjustedProgress = this._fileCompleteProgress * this._maxPercent / 100;
                    return adjustedProgress;
                };
                AssetManager.prototype.allSoundsDecoded = function () {
                    //console.log('sounds to decode', this._soundsToDecode.length);
                    return this._soundsToDecode.length === 0;
                };
                /**
                * sets the data for the AssetManager to use as a reference (usually from data/assets.json)
                * triggers the _parseData internal method, which stores the asset list for later use
                * @param {String} textFileFromCache the id of the file in the Phaser.Cache
                */
                AssetManager.prototype.setData = function (data) {
                    this._data = data;
                    this._loadData = {};
                    this._parseData();
                    this.sendNotification(utils_1.Notifications.ASSET_MANAGER_DATA_SET, this._data);
                };
                /**
                * clears the assets from a particular id in the storage
                * @param  {String} id            the id of the asset list to clear
                * @param  {Boolean} [clearAudio = true]    whether to clear audio files
                * @param  {Boolean} [clearAtlasses = true] whether to clear texture atlasses
                * @param  {Boolean} [clearImages = true]   whether to clear images
                * @param  {Boolean} [clearText = true]     whether to clear text files
                * @return {void}
                */
                AssetManager.prototype.clearAssets = function (id, clearAudio, clearAtlasses, clearImages, clearText, clearJSON) {
                    if (clearAudio === void 0) {
                        clearAudio = true;
                    }
                    if (clearAtlasses === void 0) {
                        clearAtlasses = true;
                    }
                    if (clearImages === void 0) {
                        clearImages = true;
                    }
                    if (clearText === void 0) {
                        clearText = true;
                    }
                    if (clearJSON === void 0) {
                        clearJSON = true;
                    }
                    var data = this._data[id];
                    console.log('clearing: ', id, data);
                    if (!data || typeof data === 'undefined' || !data.assets || data.assets.length < 1) {
                        return console.log('no assets', data);
                    }
                    var assets = data.assets;
                    for (var i = 0; i < assets.length; i++) {
                        console.log('clearing type', assets[i].type);
                        if (assets[i].type === AssetManager.ASSET_LIST) {
                            this.clearAssets(assets[i].id, clearAudio, clearAtlasses, clearImages, clearText, clearJSON);
                            continue;
                        }
                        this.clearAsset(assets[i], clearAudio, clearAtlasses, clearImages, clearText, clearJSON);
                    }
                    this._completedLoads[id] = false;
                    this.sendNotification(utils_1.Notifications.ASSET_MANAGER_ASSETS_CLEARED, id);
                };
                /**
                * clears an asset from the game's memory
                * @param  {Object} asset         the asset to clear
                * @param  {Boolean} [clearAudio = true]    whether to clear audio files
                * @param  {Boolean} [clearAtlasses = true] whether to clear texture atlasses
                * @param  {Boolean} [clearImages = true]   whether to clear images
                * @param  {Boolean} [clearText = true]     whether to clear text files
                * @return {void}
                */
                AssetManager.prototype.clearAsset = function (asset, clearAudio, clearAtlasses, clearImages, clearText, clearJSON) {
                    if (clearAudio === void 0) {
                        clearAudio = true;
                    }
                    if (clearAtlasses === void 0) {
                        clearAtlasses = true;
                    }
                    if (clearImages === void 0) {
                        clearImages = true;
                    }
                    if (clearText === void 0) {
                        clearText = true;
                    }
                    if (clearJSON === void 0) {
                        clearJSON = true;
                    }
                    var type = asset.type,
                        url = asset.url,
                        required = asset.required;
                    if (required) {
                        console.log('the ' + type + ' asset: ' + url + ' is required and will not be cleared');
                        return;
                    }
                    switch (type) {
                        case AssetManager.AUDIO:
                            if (clearAudio) {
                                this.game.sound.removeByKey(url);
                                this.game.cache.removeSound(url);
                            }
                            break;
                        case AssetManager.IMAGE:
                            if (clearImages) {
                                this.clearImage(url);
                            }
                            break;
                        case AssetManager.ATLAS:
                            if (clearAtlasses) {
                                this.clearImage(url);
                                this.game.cache.removeJSON(url);
                            }
                            break;
                        case AssetManager.TEXT:
                            if (clearText) {
                                this.game.cache.removeText(url);
                            }
                            break;
                        case AssetManager.JSON:
                            if (clearJSON) {
                                this.game.cache.removeJSON(url);
                            }
                            break;
                        case AssetManager.PHYSICS:
                            if (clearJSON) {
                                this.game.cache.removePhysics(url);
                            }
                            break;
                        case AssetManager.SPINE:
                            this.clearSpineAsset(asset.url);
                            break;
                    }
                };
                AssetManager.prototype.clearImage = function (url) {
                    var img = this.game.cache.getImage(url, true);
                    this.game.cache.removeImage(url);
                    console.log(img.base);
                    console.log(img.base.imageUrl);
                    if (img && img.data.dispose !== undefined) {
                        img.data.dispose();
                    }
                    img = null;
                };
                AssetManager.prototype.clearSpineAsset = function (id) {
                    this.game.cache.removeJSON(id + '.json');
                    this.game.cache.removeText(id + '.atlas');
                    this.clearImage(id + '.png');
                };
                /**
                * checks if the assets from this list id are already loaded
                * @param  {String}  id the asset list id to check
                * @return {Boolean}    whether it has been loaded already
                */
                AssetManager.prototype.hasLoadedAssets = function (id) {
                    return this._completedLoads[id] === true;
                };
                AssetManager.prototype.sendNotification = function (notificationName, notificationBody) {
                    return this.app.sendNotification(notificationName, notificationBody);
                };
                Object.defineProperty(AssetManager.prototype, "baseURL", {
                    // getter / setter
                    set: function (baseURL) {
                        // ensure trailing slash
                        if (baseURL && baseURL !== undefined && baseURL.charAt(baseURL.length - 1) !== '/') baseURL += '/';
                        this._baseURL = baseURL;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AssetManager.prototype, "paths", {
                    set: function (pathObj) {
                        this._pathObj = pathObj || {};
                        this._assetPath = this._baseURL + (this._pathObj.assetPath || 'assets');
                        this._dataPath = this._baseURL + (this._pathObj.dataPath || 'assets/data');
                        this._spriteSheetPath = this._baseURL + (this._pathObj.spritesheetPath || 'assets/img/spritesheets');
                        this._imgPath = this._baseURL + (this._pathObj.imgPath || 'assets/img');
                        this._videoPath = this._baseURL + (this._pathObj.imgPath || 'assets/video');
                        this._spinePath = this._baseURL + (this._pathObj.spinePath || 'assets/spine');
                        this._fontPath = this._baseURL + (this._pathObj.fontPath || 'assets/fonts');
                        this._bitmapFontPath = this._baseURL + (this._pathObj.bitmapFontPath || 'assets/fonts/bitmap');
                        this._audioSpritePath = this._baseURL + (this._pathObj.audioSpritePath || 'assets/audio/sprite');
                        this._soundPath = this._baseURL + (this._pathObj.soundPath || 'assets/audio/sound');
                        this._physicsPath = this._baseURL + (this._pathObj.physicsPath || 'assets/data/physics');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AssetManager.prototype, "resolution", {
                    get: function () {
                        return this._res;
                    },
                    set: function (res) {
                        if (res === undefined) {
                            res = this.game.resolution;
                        }
                        this._res = res;
                        this._resolution = '';
                        if (this._res > 1.5) {
                            this._resolution = AssetManager.RESOLUTION_2X;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AssetManager.prototype, "soundDecodingModifier", {
                    get: function () {
                        return this._soundDecodingModifier;
                    },
                    /**
                    * sets the percentage of the load we should allot to each sound
                    * @param {Number} [num = 2] the percentage
                    */
                    set: function (num) {
                        if (num === undefined) {
                            num = 2;
                        }
                        this._soundDecodingModifier = num;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AssetManager.prototype, "cacheBustVersion", {
                    set: function (version) {
                        this._cacheBustVersion = '' + version;
                    },
                    enumerable: true,
                    configurable: true
                });
                // static constants
                // asset types
                AssetManager.AUDIO = 'audio';
                AssetManager.SOUND = 'sound';
                AssetManager.AUDIO_SPRITE = 'audioSprite';
                AssetManager.IMAGE = 'image';
                AssetManager.VIDEO = 'video';
                AssetManager.ATLAS = 'atlas';
                AssetManager.TEXT = 'text';
                AssetManager.JSON = 'json';
                AssetManager.TILEMAP = 'tilemap';
                AssetManager.TILEDMAP = 'tiledmap';
                AssetManager.TILEDMAP_TILESET = 'tileset';
                AssetManager.TILEDMAP_LAYER = 'layer';
                AssetManager.PHYSICS = 'physics';
                AssetManager.SPINE = 'spine';
                AssetManager.BITMAP_FONT = 'bitmapFont';
                AssetManager.ASSET_LIST = 'assetList';
                // resolutions
                AssetManager.RESOLUTION_2X = "@2x";
                AssetManager.RESOLUTION_3X = "@3x";
                return AssetManager;
            }();
            exports_1("AssetManager", AssetManager);
        }
    };
});
$__System.register('18', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var AudioManager;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            AudioManager = function () {
                function AudioManager() {
                    this._defaultVolume = 1;
                    this._sprites = {};
                    this._sounds = {};
                    this._markerLookup = {};
                    this.game = application_1.Application.getInstance().game;
                }
                // private methods
                AudioManager.prototype._addAudio = function (key, isAudioSprite) {
                    if (isAudioSprite === void 0) {
                        isAudioSprite = false;
                    }
                    if (isAudioSprite === true) {
                        return this._parseAudioSprite(key, this.game.add.audioSprite(key));
                    } else {
                        return this._allowMultiple(this.game.add.sound(key));
                    }
                };
                AudioManager.prototype._parseAudioSprite = function (key, audioSprite) {
                    for (var soundKey in audioSprite.sounds) {
                        this._allowMultiple(audioSprite.sounds[soundKey]);
                        this._markerLookup[soundKey] = key;
                    }
                    return audioSprite;
                };
                AudioManager.prototype._allowMultiple = function (sound) {
                    sound.allowMultiple = true;
                    return sound;
                };
                AudioManager.prototype._getKeyFromMarkerName = function (marker) {
                    if (typeof this._markerLookup[marker] !== 'undefined') {
                        return this._markerLookup[marker];
                    }
                    for (var key in this._sprites) {
                        if (typeof this._sprites[key].sounds[marker] !== 'undefined') {
                            this._markerLookup[marker] = key;
                            return key;
                        }
                    }
                    return false;
                };
                AudioManager.prototype._playSpriteMarker = function (key, marker, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    if (typeof volume !== 'undefined') {
                        if (typeof volume === 'string') {
                            if (volume.indexOf('+') >= 0 || volume.indexOf('-') >= 0) {
                                volume = this._defaultVolume + parseFloat(volume);
                            } else {
                                volume = parseFloat(volume);
                            }
                        }
                    } else {
                        volume = this._defaultVolume;
                    }
                    loop = loop || false;
                    forceRestart = forceRestart === false ? false : true;
                    return this._sprites[key].play(marker, volume);
                };
                AudioManager.prototype._stopSpriteMarker = function (key, marker) {
                    if (typeof this._sprites === 'undefined' || typeof this._sprites[key] === 'undefined') {
                        return false;
                    }
                    return this._sprites[key].stop(marker);
                };
                AudioManager.prototype._stopSound = function (sound) {
                    return sound.stop();
                };
                // public methods
                /**
                * adds audio to the lookup (called by AssetManager when any sound is loaded, usually not necessary to call from a game)
                * @param {String} key         the Phaser.Cache key of the audio asset
                * @param {Boolean} isAudioSprite whether the asset is an audio sprite
                */
                AudioManager.prototype.addAudio = function (key, isAudioSprite) {
                    if (isAudioSprite === void 0) {
                        isAudioSprite = false;
                    }
                    if (isAudioSprite === true) {
                        return this.addAudioSprite(key);
                    }
                    return this.addSound(key);
                };
                /**
                * adds a single sound to the lookup (usually not necessary to call from a game)
                * @param {String} key the Phaser.Cache key of the asset
                * @return {Phaser.Sound} the added sound
                */
                AudioManager.prototype.addSound = function (key) {
                    if (typeof this._sounds[key] !== 'undefined') {
                        return this._sounds[key];
                    }
                    this._sounds[key] = this.game.add.audio(key);
                    this._sounds[key].allowMultiple = true;
                    return this._sounds[key];
                };
                /**
                * adds an audio sprite to the lookup (usually not necessary to call from a game)
                * @param {String} key the Phaser.Cache key of the asset
                * @return {Phaser.AudioSprite} the added audio sprite
                */
                AudioManager.prototype.addAudioSprite = function (key) {
                    if (typeof this._sprites[key] !== 'undefined') {
                        return this._sprites[key];
                    }
                    this._sprites[key] = this._addAudio(key, true);
                    return this._sprites[key];
                };
                /**
                * a global method to play a sound - will check audio sprite markers for the provided key first, then single sounds
                * @param  {String} marker       the sound marker (or key) to check for
                * @param  {Number} volume       the volume at which to play the sound
                * @param  {Boolean} loop         whether the sound should loop (won't work if it's a sprite marker, and "loop" hasn't been set in the audio sprite descriptor file)
                * @param  {Boolean} forceRestart whether to restart the sound if it's already playing
                * @return {Phaser.Sound}              the playing sound
                */
                AudioManager.prototype.playAudio = function (marker, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    if (this._getKeyFromMarkerName(marker)) {
                        return this.playSpriteMarker(marker, volume, loop, forceRestart);
                    }
                    return this.playSound(marker, volume, loop, forceRestart);
                };
                /**
                * calls Dijon.AudioManager.playAudio on a delay
                * @param  {int} delay        number of milliseconds to delay the sound
                * @param  {String} marker       the sound marker (or key) to check for
                * @param  {Number} volume       the volume at which to play the sound
                * @param  {Boolean} loop         whether the sound should loop (won't work if it's a sprite marker, and "loop" hasn't been set in the audio sprite descriptor file)
                * @param  {Boolean} forceRestart whether to restart the sound if it's already playing
                */
                AudioManager.prototype.playDelayedAudio = function (delay, marker, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    if (this._getKeyFromMarkerName(marker)) {
                        return this.playDelayedSpriteMarker(delay, marker, volume, loop, forceRestart);
                    }
                    return this.playDelayedSound(delay, marker, volume, loop, forceRestart);
                };
                /**
                * plays a single sound
                * @param  {String} key          the Phaser.Cache key for the sound
                * @param  {Number} volume       the volume at which to play the sound
                * @param  {Boolean} loop         whether the sound should loop (won't work if it's a sprite marker, and "loop" hasn't been set in the audio sprite descriptor file)
                * @param  {Boolean} forceRestart whether to restart the sound if it's already playing
                * @return {Phaser.Sound} the playing sound
                */
                AudioManager.prototype.playSound = function (key, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    if (typeof this._sounds[key] === 'undefined') {
                        return null;
                    }
                    volume = typeof volume === 'undefined' ? this._defaultVolume : volume;
                    return this._sounds[key].play("", 0, volume, loop, forceRestart);
                };
                // similat to playSound, but just returns the Phaser.Sound instance
                AudioManager.prototype.getSound = function (key, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    if (typeof this._sounds[key] === 'undefined') {
                        return null;
                    }
                    volume = typeof volume === 'undefined' ? this._defaultVolume : volume;
                    return this._sounds[key];
                };
                /**
                * plays a marker from an audio sprite
                * @param  {String} marker       the marker to check for (will check all audio sprites)
                * @param  {Number} volume       the volume at which to play the sound
                * @param  {Boolean} loop         whether the sound should loop (won't work if it's a sprite marker, and "loop" hasn't been set in the audio sprite descriptor file)
                * @param  {Boolean} forceRestart whether to restart the sound if it's already playing
                * @return {Phaser.Sound} the playing sound
                */
                AudioManager.prototype.playSpriteMarker = function (marker, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    var key = this._getKeyFromMarkerName(marker);
                    if (!key) {
                        console.log('marker not found', marker);
                        return null;
                    }
                    return this._playSpriteMarker(key, marker, volume, loop, forceRestart);
                };
                AudioManager.prototype.playDelayedSound = function (delay, key, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    this.game.time.events.add(delay, this.playSound, this, key, volume, loop, forceRestart);
                    return null;
                };
                AudioManager.prototype.playDelayedSpriteMarker = function (delay, marker, volume, loop, forceRestart) {
                    if (loop === void 0) {
                        loop = false;
                    }
                    if (forceRestart === void 0) {
                        forceRestart = true;
                    }
                    this.game.time.events.add(delay, this.playSpriteMarker, this, marker, volume, loop, forceRestart);
                    return null;
                };
                /**
                * stops any playing audio file with the given marker
                * checks audio sprites first, then single sounds
                * @return {Phaser.Sound} the sound that was stopped
                */
                AudioManager.prototype.stopAudio = function (marker) {
                    if (this._getKeyFromMarkerName(marker)) {
                        return this.stopSpriteMarker(marker);
                    }
                    return this.stopSound(marker);
                };
                /**
                * stops a single sound from playing
                * @return {Phaser.Sound} the sound that was stopped
                */
                AudioManager.prototype.stopSound = function (key) {
                    if (typeof this._sounds === 'undefined' || typeof this._sounds[key] === 'undefined') {
                        return;
                    }
                    return this._sounds[key].stop();
                };
                /**
                * stops a single sound from playing
                * @return {Phaser.Sound} the sound that was stopped
                */
                AudioManager.prototype.stopSpriteMarker = function (marker) {
                    var key = this._getKeyFromMarkerName(marker);
                    if (!key) {
                        console.log('marker not found', marker);
                        return;
                    }
                    this._stopSpriteMarker(key, marker);
                };
                /**
                * stops removes a sound from Dijon.AudioManager's lookup
                * @param  {String} key the key of the sound to be removed
                * @return {void}
                */
                AudioManager.prototype.removeSound = function (key) {
                    if (typeof this._sounds === 'undefined' || typeof this._sounds[key] === 'undefined') {
                        return false;
                    }
                    if (this._sounds[key]) {
                        this.stopSound(key);
                        this._sounds[key].destroy();
                        delete this._sounds[key];
                    }
                };
                /**
                * stops removes an audio sprite from Dijon.AudioManager's lookup
                * @param  {String} key the key of the sound to be removed
                * @return {void}
                */
                AudioManager.prototype.removeSprite = function (key) {
                    if (typeof this._sprites === 'undefined' || typeof this._sprites[key] === 'undefined') {
                        return;
                    }
                    this.stopSpriteMarker(key);
                    this._sprites[key] = null;
                    delete this._sprites[key];
                };
                AudioManager.prototype.fade = function (sound, volume, time, stop) {
                    if (stop === void 0) {
                        stop = false;
                    }
                    if (!sound) return;
                    if (sound.fadeTween && sound.fadeTween) this.game.tweens.remove(sound.fadeTween);
                    sound.fadeTween = this.game.add.tween(sound).to({
                        volume: volume
                    }, time || 300, Phaser.Easing.Linear.None);
                    if (stop === true) sound.fadeTween.onComplete.addOnce(function () {
                        this._stopSound(sound);
                    }, this);
                    return sound.fadeTween.start();
                };
                Object.defineProperty(AudioManager.prototype, "defaultVolume", {
                    get: function () {
                        return this._defaultVolume;
                    },
                    // getter / setter
                    /**
                    * Sets the default volume for all sounds (used in the case where a volume is not supplied to the playAudio, playSound, or playSpriteMarker methods)
                    */
                    set: function (vol) {
                        this._defaultVolume = vol;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AudioManager;
            }();
            exports_1("AudioManager", AudioManager);
        }
    };
});
$__System.register('19', ['e', 'c', '3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1, core_1, utils_1;
    var Game;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (core_1_1) {
            core_1 = core_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            Game = function (_super) {
                __extends(Game, _super);
                // Phaser.Game overrides
                function Game(config) {
                    _super.call(this, config);
                    // signals
                    this.onWorldInputDisabled = new Phaser.Signal();
                    this.onWorldInputEnabled = new Phaser.Signal();
                }
                Game.prototype.boot = function () {
                    _super.prototype.boot.call(this);
                    this.app = application_1.Application.getInstance();
                    // add managers
                    this.asset = new core_1.AssetManager();
                    this.sequence = new core_1.SequenceManager();
                    this.transition = new core_1.TransitionManager();
                    this.storage = new core_1.StorageManager();
                    this.audio = new core_1.AudioManager();
                    this.analytics = new core_1.AnalyticsManager(this.config.analytics);
                    // replace Phaser.GameObjectFactory
                    this.add = null;
                    this.add = new core_1.GameObjectFactory(this);
                    this.addLayers();
                    this.addMouseCallbacks();
                    this.setFactoryDefaultLayer(this.gameLayer);
                };
                Game.prototype.addPlugins = function () {
                    var _this = this;
                    if (this.config.plugins && this.config.plugins.length > 0) {
                        this.config.plugins.forEach(function (pluginName) {
                            if (typeof Phaser.Plugin[pluginName] === 'function') {
                                _this.add.plugin(Phaser.Plugin[pluginName]);
                            }
                        });
                    }
                };
                // Override this.world as the default layer that
                // .add calls will be created on.
                Game.prototype.setFactoryDefaultLayer = function (newLayer) {
                    this.add.setDefaultLayer(newLayer || this.world);
                };
                // private methods
                Game.prototype.addLayers = function () {
                    // adds persistent background layer
                    this.backgroundLayer = this.add.dGroup(0, 0, '_background_layer', true);
                    this.stage.setChildIndex(this.backgroundLayer, 0);
                    // adds game and ui layers
                    this.gameLayer = this.add.dGroup(0, 0, '_game_layer');
                    // add ui layer and set the "fixedToCamera" property to true
                    // if the game's camera moves, anything in this group will stay in place
                    this.uiLayer = this.add.dGroup(0, 0, '_ui_layer');
                    this.uiLayer.fixedToCamera = true;
                    // add a group to the Phaser.Stage (just in case)
                    this.stageLayer = this.add.dGroup(0, 0, '_stage_layer', true);
                };
                Game.prototype.addMouseCallbacks = function () {
                    if (this.device.desktop) {
                        this.input.mouse.mouseOverCallback = this.mouseOver;
                        this.input.mouse.mouseOutCallback = this.mouseOut;
                    }
                };
                Game.prototype.mouseOut = function () {
                    application_1.Application.getInstance().sendNotification(utils_1.Notifications.MOUSE_LEAVE_GLOBAL);
                };
                Game.prototype.mouseOver = function () {
                    application_1.Application.getInstance().sendNotification(utils_1.Notifications.MOUSE_ENTER_GLOBAL);
                };
                // public methods
                Game.prototype.disableElementInput = function (el) {
                    if (el.input && el.inputEnabled === true) {
                        el.wasEnabled = true;
                        el.inputEnabled = false;
                    }
                    if (el.children.length > 0) {
                        for (var i = 0; i < el.children.length; i++) {
                            this.disableElementInput(el.children[i]);
                        }
                    }
                };
                Game.prototype.enableElementInput = function (el) {
                    if (el.input && el.inputEnabled === false && el.wasEnabled) {
                        el.wasEnabled = false;
                        el.inputEnabled = true;
                    }
                    if (el.children.length > 0) {
                        for (var i = 0; i < el.children.length; i++) {
                            this.enableElementInput(el.children[i]);
                        }
                    }
                };
                Game.prototype.disableInput = function (group) {
                    return group.forEach(function (el) {
                        if (el instanceof Phaser.Group) {
                            return this.disableInput(el);
                        } else {
                            return this.disableElementInput(el);
                        }
                    }, this);
                };
                Game.prototype.enableInput = function (group) {
                    return group.forEach(function (el) {
                        if (el instanceof Phaser.Group) {
                            return this.enableInput(el);
                        } else {
                            return this.enableElementInput(el);
                        }
                    }, this);
                };
                Game.prototype.disableGameInput = function () {
                    this.disableInput(this.gameLayer);
                    this.onWorldInputDisabled.dispatch();
                };
                Game.prototype.enableGameInput = function () {
                    this.enableInput(this.gameLayer);
                    this.onWorldInputEnabled.dispatch();
                };
                /**
                 * removes all items from the game layer
                 * but allows the ui layer to persist
                 * that way we can overlay the game without adding stuff to the phaser stage (for transitions)
                 * @param {String} toState the new state we're changing to
                 * @param {any} args an optional parameter. This can be used to pass in a token/object
                 * containing specific parameters for the state you are changing to. The init() function of
                 * that state must also take an object of type any.
                 * @return {void}
                 */
                Game.prototype.changeState = function (toState, args) {
                    this.gameLayer.removeAll(true, true);
                    return this.state.start(toState, false, false, args);
                };
                Object.defineProperty(Game.prototype, "addToGame", {
                    // getter / setter
                    /**
                     * sets the target group for the gameObjectFactory to gameLayer before adding
                     * this way if we pass a null group to whatever method we call
                     * ie (this.game.addToGame.image(0, 0, key, frame));
                     * it will be added to the appropriate layer
                     */
                    get: function () {
                        this.add.targetGroup = this.gameLayer;
                        return this.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Game.prototype, "addToBackground", {
                    /**
                     * sets the target group for the gameObjectFactory to uiLayer before adding
                     * this way if we pass a null group to whatever method we call
                     * ie (this.game.addToUI.image(0, 0, key, frame));
                     * it will be added to the appropriate layer
                     */
                    get: function () {
                        this.add.targetGroup = this.backgroundLayer;
                        return this.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Game.prototype, "addToUI", {
                    get: function () {
                        // set the target group for the gameObjectFactory before adding
                        this.add.targetGroup = this.uiLayer;
                        return this.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Game.prototype, "addToStage", {
                    get: function () {
                        // set the target group for the gameObjectFactory before adding
                        this.add.targetGroup = this.stageLayer;
                        return this.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Game.prototype, "addToWorld", {
                    get: function () {
                        // set the target group for the gameObjectFactory before adding
                        this.add.targetGroup = this.world;
                        return this.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Game;
            }(Phaser.Game);
            exports_1("Game", Game);
        }
    };
});
/**
 * GameObjectFactory
 */
$__System.register('1a', ['12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var display_1;
    var GameObjectFactory;
    return {
        setters: [function (display_1_1) {
            display_1 = display_1_1;
        }],
        execute: function () {
            /**
             * GameObjectFactory
             */
            GameObjectFactory = function (_super) {
                __extends(GameObjectFactory, _super);
                function GameObjectFactory() {
                    _super.apply(this, arguments);
                    // The layer the current object will be added to. This is used by helper functions in Game.ts.
                    this._targetGroup = null;
                    // This is the layer that standard .add calls will be applied to.
                    this._defaultLayer = this.world;
                }
                // overrides
                /**
                * Adds an existing display object to the game world.
                *
                * @method Phaser.GameObjectFactory#existing
                * @param {any} object - An instance of Phaser.Sprite, Phaser.Button or any other display object.
                * @return {any} The child that was added to the World.
                */
                GameObjectFactory.prototype.existing = function (object) {
                    var group = this.targetGroup;
                    this.targetGroup = null;
                    return group.add(object);
                };
                /**
                * Create a new `Image` object.
                *
                * An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
                *
                * It can still rotate, scale, crop and receive input events.
                * This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
                *
                * @method Phaser.GameObjectFactory#image
                * @param {number} [x=0] - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
                * @param {number} [y=0] - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
                * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
                * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
                * @returns {Phaser.Image} The newly created Image object.
                */
                GameObjectFactory.prototype.image = function (x, y, key, frame, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.Image(this.game, x, y, key, frame));
                };
                /**
                * Create a new Sprite with specific position and sprite sheet key.
                *
                * At its most basic a Sprite consists of a set of coordinates and a texture that is used when rendered.
                * They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
                * events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
                *
                * @method Phaser.GameObjectFactory#sprite
                * @param {number} [x=0] - The x coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
                * @param {number} [y=0] - The y coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
                * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
                * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
                * @returns {Phaser.Sprite} The newly created Sprite object.
                */
                GameObjectFactory.prototype.sprite = function (x, y, key, frame, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.create(x, y, key, frame);
                };
                /**
                * Create a new Creature Animation object.
                *
                * Creature is a custom Game Object used in conjunction with the Creature Runtime libraries by Kestrel Moon Studios.
                *
                * It allows you to display animated Game Objects that were created with the [Creature Automated Animation Tool](http://www.kestrelmoon.com/creature/).
                *
                * Note 1: You can only use Phaser.Creature objects in WebGL enabled games. They do not work in Canvas mode games.
                *
                * Note 2: You must use a build of Phaser that includes the CreatureMeshBone.js runtime and gl-matrix.js, or have them
                * loaded before your Phaser game boots.
                *
                * See the Phaser custom build process for more details.
                *
                * @method Phaser.GameObjectFactory#creature
                * @param {number} [x=0] - The x coordinate of the creature. The coordinate is relative to any parent container this creature may be in.
                * @param {number} [y=0] - The y coordinate of the creature. The coordinate is relative to any parent container this creature may be in.
                * @param {string|PIXI.Texture} [key] - The image used as a texture by this creature object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a PIXI.Texture.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the Default Layer group.
                * @returns {Phaser.Creature} The newly created Sprite object.
                */
                GameObjectFactory.prototype.creature = function (x, y, key, mesh, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    var obj = new Phaser['Creature'](this.game, x, y, key, mesh);
                    group.add(obj);
                    return obj;
                };
                /**
                * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
                *
                * @method Phaser.GameObjectFactory#group
                * @param {any} [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
                * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
                * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
                * @param {boolean} [enableBody=false] - If true all Sprites created with `Group.create` or `Group.createMulitple` will have a physics body created on them. Change the body type with physicsBodyType.
                * @param {number} [physicsBodyType=0] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
                * @return {Phaser.Group} The newly created Group.
                */
                GameObjectFactory.prototype.group = function (parent, name, addToStage, enableBody, physicsBodyType) {
                    if (name === void 0) {
                        name = 'group';
                    }
                    if (addToStage === void 0) {
                        addToStage = false;
                    }
                    if (enableBody === void 0) {
                        enableBody = false;
                    }
                    if (physicsBodyType === void 0) {
                        physicsBodyType = 0;
                    }
                    if (parent === undefined && addToStage !== true) {
                        parent = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return new Phaser.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType);
                };
                /**
                * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
                *
                * A Physics Group is the same as an ordinary Group except that is has enableBody turned on by default, so any Sprites it creates
                * are automatically given a physics body.
                *
                * @method Phaser.GameObjectFactory#physicsGroup
                * @param {number} [physicsBodyType=Phaser.Physics.ARCADE] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
                * @param {any} [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
                * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
                * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
                * @return {Phaser.Group} The newly created Group.
                */
                GameObjectFactory.prototype.physicsGroup = function (physicsBodyType, parent, name, addToStage) {
                    if (physicsBodyType === void 0) {
                        physicsBodyType = 0;
                    }
                    if (name === void 0) {
                        name = 'group';
                    }
                    if (addToStage === void 0) {
                        addToStage = false;
                    }
                    if (parent === undefined) {
                        parent = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return new Phaser.Group(this.game, parent, name, addToStage, true, physicsBodyType);
                };
                /**
                * A SpriteBatch is a really fast version of a Phaser Group built solely for speed.
                * Use when you need a lot of sprites or particles all sharing the same texture.
                * The speed gains are specifically for WebGL. In Canvas mode you won't see any real difference.
                *
                * @method Phaser.GameObjectFactory#spriteBatch
                * @param {Phaser.Group|null} parent - The parent Group that will hold this Sprite Batch. Set to `undefined` or `null` to add directly to game.world.
                * @param {string} [name='group'] - A name for this Sprite Batch. Not used internally but useful for debugging.
                * @param {boolean} [addToStage=false] - If set to true this Sprite Batch will be added directly to the Game.Stage instead of the parent.
                * @return {Phaser.SpriteBatch} The newly created Sprite Batch.
                */
                GameObjectFactory.prototype.spriteBatch = function (parent, name, addToStage) {
                    if (name === void 0) {
                        name = "spriteBatch";
                    }
                    if (addToStage === void 0) {
                        addToStage = false;
                    }
                    if (parent === undefined) {
                        parent = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return new Phaser.SpriteBatch(this.game, parent, name, addToStage);
                };
                /**
                * Creates a new TileSprite object.
                *
                * @method Phaser.GameObjectFactory#tileSprite
                * @param {number} x - The x coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
                * @param {number} y - The y coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
                * @param {number} width - The width of the TileSprite.
                * @param {number} height - The height of the TileSprite.
                * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} key - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
                * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the Default Layer group.
                * @return {Phaser.TileSprite} The newly created TileSprite object.
                */
                GameObjectFactory.prototype.tileSprite = function (x, y, width, height, key, frame, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (width === void 0) {
                        width = 0;
                    }
                    if (height === void 0) {
                        height = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.TileSprite(this.game, x, y, width, height, key, frame));
                };
                /**
                * Creates a new Rope object.
                *
                * Example usage: https://github.com/codevinsky/phaser-rope-demo/blob/master/dist/demo.js
                *
                * @method Phaser.GameObjectFactory#rope
                * @param {number} [x=0] - The x coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
                * @param {number} [y=0] - The y coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
                * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
                * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
                * @param {Array} points - An array of {Phaser.Point}.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the Default Layer group.
                * @return {Phaser.Rope} The newly created Rope object.
                */
                GameObjectFactory.prototype.rope = function (x, y, key, frame, points, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.Rope(this.game, x, y, key, frame, points));
                };
                /**
                * Creates a new Text object.
                *
                * @method Phaser.GameObjectFactory#text
                * @param {number} [x=0] - The x coordinate of the Text. The coordinate is relative to any parent container this text may be in.
                * @param {number} [y=0] - The y coordinate of the Text. The coordinate is relative to any parent container this text may be in.
                * @param {string} [text=''] - The text string that will be displayed.
                * @param {object} [style] - The style object containing style attributes like font, font size , etc.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the Default Layer group.
                * @return {Phaser.Text} The newly created text object.
                */
                GameObjectFactory.prototype.text = function (x, y, text, style, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (text === void 0) {
                        text = '';
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.Text(this.game, x, y, text, style));
                };
                /**
                * Creates a new Button object.
                *
                * @method Phaser.GameObjectFactory#button
                * @param {number} [x=0] - The x coordinate of the Button. The coordinate is relative to any parent container this button may be in.
                * @param {number} [y=0] - The y coordinate of the Button. The coordinate is relative to any parent container this button may be in.
                * @param {string} [key] - The image key as defined in the Game.Cache to use as the texture for this button.
                * @param {function} [callback] - The function to call when this button is pressed
                * @param {object} [callbackContext] - The context in which the callback will be called (usually 'this')
                * @param {string|number} [overFrame] - This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
                * @param {string|number} [outFrame] - This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
                * @param {string|number} [downFrame] - This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
                * @param {string|number} [upFrame] - This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the Default Layer group.
                * @return {Phaser.Button} The newly created Button object.
                */
                GameObjectFactory.prototype.button = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame));
                };
                /**
                * Creates a new Graphics object.
                *
                * @method Phaser.GameObjectFactory#graphics
                * @param {number} [x=0] - The x coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
                * @param {number} [y=0] - The y coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
                * @return {Phaser.Graphics} The newly created graphics object.
                */
                GameObjectFactory.prototype.graphics = function (x, y, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.world;
                    }
                    /***
                     * Commented this out - since graphics are by default added directly on the game.world, we shouldn't reset this.targetGroup
                     * It could cause major problems if using dijon/utils Textures instances as an image texture, for instance
                     */
                    //this.targetGroup = null;
                    return group.add(new Phaser.Graphics(this.game, x, y));
                };
                /**
                * Create a new BitmapText object.
                *
                * BitmapText objects work by taking a texture file and an XML file that describes the font structure.
                * It then generates a new Sprite object for each letter of the text, proportionally spaced out and aligned to
                * match the font structure.
                *
                * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability
                * to use Web Fonts. However you trade this flexibility for pure rendering speed. You can also create visually compelling BitmapTexts by
                * processing the font texture in an image editor first, applying fills and any other effects required.
                *
                * To create multi-line text insert \r, \n or \r\n escape codes into the text string.
                *
                * To create a BitmapText data files you can use:
                *
                * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
                * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
                * Littera (Web-based, free): http://kvazars.com/littera/
                *
                * @method Phaser.GameObjectFactory#bitmapText
                * @param {number} x - X coordinate to display the BitmapText object at.
                * @param {number} y - Y coordinate to display the BitmapText object at.
                * @param {string} font - The key of the BitmapText as stored in Phaser.Cache.
                * @param {string} [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
                * @param {number} [size=32] - The size the font will be rendered at in pixels.
                * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
                * @return {Phaser.BitmapText} The newly created bitmapText object.
                */
                GameObjectFactory.prototype.bitmapText = function (x, y, font, text, size, group) {
                    if (text === void 0) {
                        text = "";
                    }
                    if (size === void 0) {
                        size = 32;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new Phaser.BitmapText(this.game, x, y, font, text, size));
                };
                // dijon specific display objects
                GameObjectFactory.prototype.dSprite = function (x, y, key, frame, name, components, group) {
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new display_1.Sprite(x, y, key, frame, name, components));
                };
                GameObjectFactory.prototype.dGroup = function (x, y, name, addToStage, components, enableBody, physicsBodyType, group) {
                    if (group === undefined && addToStage !== true) {
                        group = this.targetGroup;
                        this.targetGroup = null;
                        return group.add(new display_1.Group(x, y, name, addToStage, components, enableBody, physicsBodyType));
                    }
                    return new display_1.Group(x, y, name, addToStage, components, enableBody, physicsBodyType);
                };
                GameObjectFactory.prototype.dText = function (x, y, text, fontName, fontSize, fontColor, fontAlign, wordWrap, width, lineSpacing, settings, group) {
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new display_1.Text(x, y, text, fontName, fontSize, fontColor, fontAlign, wordWrap, width, lineSpacing, settings));
                };
                GameObjectFactory.prototype.dBitmapText = function (x, y, font, text, size, align, color, smoothing, autoFlatten, makeImage, group) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (font === void 0) {
                        font = null;
                    }
                    if (text === void 0) {
                        text = "";
                    }
                    if (size === void 0) {
                        size = 12;
                    }
                    if (align === void 0) {
                        align = 'left';
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (smoothing === void 0) {
                        smoothing = true;
                    }
                    if (autoFlatten === void 0) {
                        autoFlatten = true;
                    }
                    if (makeImage === void 0) {
                        makeImage = false;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new display_1.BitmapText(x, y, font, text, size, align, color, smoothing, autoFlatten, makeImage));
                };
                GameObjectFactory.prototype.spine = function (assetName, x, y, group) {
                    if (assetName === void 0) {
                        assetName = '';
                    }
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (group === undefined) {
                        group = this.targetGroup;
                    }
                    this.targetGroup = null;
                    return group.add(new display_1.Spine(assetName, x, y));
                };
                GameObjectFactory.prototype.setDefaultLayer = function (value) {
                    console.log("CAUTION: Changing the default layer will change the target group for .add");
                    this._defaultLayer = value;
                };
                Object.defineProperty(GameObjectFactory.prototype, "defaultLayer", {
                    get: function () {
                        return this._defaultLayer;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameObjectFactory.prototype, "targetGroup", {
                    get: function () {
                        return this._targetGroup || this._defaultLayer;
                    },
                    // getter / setter
                    set: function (value) {
                        this._targetGroup = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GameObjectFactory;
            }(Phaser.GameObjectFactory);
            exports_1("GameObjectFactory", GameObjectFactory);
        }
    };
});
$__System.register('1b', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var SequenceManager;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            SequenceManager = function () {
                function SequenceManager() {
                    this._defaultInterval = 20;
                    this.game = application_1.Application.getInstance().game;
                }
                // private methods
                SequenceManager.prototype._executeMethod = function (sequence, context, callback, callbackContext) {
                    var func = sequence.shift();
                    if (typeof func !== 'undefined' && typeof context !== 'undefined' && context) {
                        func.call(context);
                    }
                    if (sequence.length === 0 && callback && callbackContext) {
                        callback.call(callbackContext);
                    }
                };
                // public methods
                SequenceManager.prototype.run = function (sequence, context, interval, completeCallback, completeCallbackContext) {
                    if (typeof context === 'undefined') {
                        throw new Error('context must be provided for the sequence methods');
                    }
                    if (typeof interval === 'undefined') {
                        interval = this._defaultInterval;
                    }
                    if (sequence.length === 0 && typeof completeCallback !== 'undefined' && typeof completeCallbackContext !== 'undefined') {
                        completeCallback.call(completeCallbackContext);
                        return;
                    }
                    if (interval === 0) {
                        while (sequence.length > 0) this._executeMethod(sequence, context, typeof completeCallback === 'undefined' ? null : completeCallback, typeof completeCallbackContext === 'undefined' ? null : completeCallbackContext);
                        return;
                    }
                    var event = this.game.time.events.repeat(interval, sequence.length, this._executeMethod, this, sequence, context, typeof completeCallback === 'undefined' ? null : completeCallback, typeof completeCallbackContext === 'undefined' ? null : completeCallbackContext);
                    event.timer.paused = false;
                };
                return SequenceManager;
            }();
            exports_1("SequenceManager", SequenceManager);
        }
    };
});
$__System.register('1c', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var State;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            State = function (_super) {
                __extends(State, _super);
                function State() {
                    _super.call(this);
                    this._audio = [];
                    this._mediator = null;
                }
                // Phaser.State overrides
                State.prototype.init = function (args) {};
                State.prototype.preload = function () {
                    if (this.preloadID) this.game.asset.loadAssets(this.preloadID);
                };
                State.prototype.create = function () {
                    if (!this.game.asset.allSoundsDecoded()) {
                        this.game.asset.onLoadCompleteAndAudioDecoded.addOnce(this.create, this);
                        return;
                    }
                    this.buildInterface();
                    this.afterBuildInterface();
                    this.startBuild();
                };
                State.prototype.shutdown = function (removeMediator, removeAudio) {
                    if (removeMediator === void 0) {
                        removeMediator = true;
                    }
                    if (removeAudio === void 0) {
                        removeAudio = true;
                    }
                    if (removeMediator) {
                        this.removeMediator();
                    }
                    if (removeAudio) {
                        this.removeAudio();
                    }
                    _super.prototype.shutdown.call(this);
                };
                // public methods
                State.prototype.listBuildSequence = function () {
                    return [];
                };
                State.prototype.buildInterface = function () {};
                State.prototype.afterBuildInterface = function () {};
                State.prototype.startBuild = function () {
                    this.game.sequence.run(this.listBuildSequence(), this, this.buildInterval, this.preAfterBuild, this);
                };
                State.prototype.preAfterBuild = function () {
                    if (typeof this.game.transition === 'undefined' || !this.game.transition.canTransitionOut()) {
                        this.afterBuild();
                    } else {
                        if (this.game.transition.canTransitionOut()) {
                            this.game.transition.onTransitionOutComplete.addOnce(this.afterBuild, this);
                            this.game.transition.transitionOut();
                        }
                    }
                };
                State.prototype.afterBuild = function () {};
                State.prototype.addAudio = function (track) {
                    if (!this._audio) {
                        this._audio = [];
                    }
                    this._audio.push(track);
                    return track;
                };
                State.prototype.removeAudio = function () {
                    var sound;
                    if (!this._audio) {
                        return;
                    }
                    while (this._audio.length > 0) {
                        sound = this._audio.pop();
                        if (typeof sound !== 'undefined' && sound != null && typeof sound.stop !== 'undefined') {
                            if (typeof sound.onStop !== 'undefined') {
                                sound.onStop.removeAll();
                            }
                            sound.stop();
                        }
                    }
                };
                State.prototype.removeMediator = function () {
                    if (!this._mediator) return;
                    this._mediator.destroy();
                    this._mediator = null;
                };
                Object.defineProperty(State.prototype, "preloadID", {
                    // getter / setter
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(State.prototype, "buildInterval", {
                    get: function () {
                        return 10;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(State.prototype, "add", {
                    get: function () {
                        return this.game.addToGame;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(State.prototype, "app", {
                    get: function () {
                        return application_1.Application.getInstance();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(State.prototype, "game", {
                    get: function () {
                        return this.app.game;
                    },
                    enumerable: true,
                    configurable: true
                });
                return State;
            }(Phaser.State);
            exports_1("State", State);
        }
    };
});
$__System.register('1d', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var StorageManager;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            StorageManager = function () {
                function StorageManager() {
                    this.game = application_1.Application.getInstance().game;
                    this._init();
                }
                // private methods
                StorageManager.prototype._init = function () {
                    this._localStorageAvailable = this._getIsLocalStorageAvailable();
                    console.log('local storage available', this._localStorageAvailable);
                };
                StorageManager.prototype._getIsLocalStorageAvailable = function () {
                    try {
                        return 'localStorage' in window && window['localStorage'] !== null;
                    } catch (e) {
                        return false;
                    }
                };
                StorageManager.prototype._getString = function (data) {
                    if (typeof data === 'string') {
                        return data;
                    }
                    var jsonData;
                    try {
                        jsonData = JSON.stringify(data);
                    } catch (e) {
                        console.log('Could not convert' + data + ' to json');
                        return null;
                    }
                    return jsonData;
                };
                // public methods
                /**
                * gets stored data with the specified key
                * @param  {String}  key    the LocalStorage key where the data is stored
                * @param  {Boolean} isJSON is the stored data just a string or is it stringified json (assumes it's JSON)
                * @return {String | Object} the retrieved data - if it's a JSON string, we parse the data and return the JSON object
                */
                StorageManager.prototype.getFromLocalStorage = function (key, isJSON) {
                    if (isJSON === void 0) {
                        isJSON = true;
                    }
                    var data = localStorage.getItem(key);
                    if (typeof data === 'undefined') {
                        console.log('no data saved with the key', key);
                        return null;
                    }
                    if (isJSON !== false) {
                        data = JSON.parse(data);
                    }
                    return data;
                };
                /**
                * saves data to localstorage
                * @param  {String} key   the LocalStorage key the data will be saved to
                * @param  {String|Object} value the data to save (if it's an object, will be stringified before saving)
                * @return {void}
                */
                StorageManager.prototype.saveToLocalStorage = function (key, value) {
                    if (!this._localStorageAvailable) {
                        console.log('no local storage');
                        return false;
                    }
                    try {
                        localStorage.setItem(key, this._getString(value));
                    } catch (e) {
                        console.log('your data could not be saved');
                    }
                };
                /**
                * clear stored data
                * @param  {String} key the LocalStorage key to clear
                * @return {void}
                */
                StorageManager.prototype.clearFromLocalStorage = function (key) {
                    if (!this._localStorageAvailable) {
                        console.log('no local storage');
                        return false;
                    }
                    try {
                        localStorage.removeItem(key);
                    } catch (e) {}
                };
                return StorageManager;
            }();
            exports_1("StorageManager", StorageManager);
        }
    };
});
$__System.register('1e', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var TransitionManager;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            TransitionManager = function () {
                function TransitionManager() {
                    this.onTransitionOutComplete = new Phaser.Signal();
                    this.onTransitionInComplete = new Phaser.Signal();
                    this._isInTransition = false;
                    this._transition = null;
                    this._transitions = {};
                    this._exceptions = {};
                    this._fromState = null;
                    this._toState = null;
                    this._args = null;
                    this.game = application_1.Application.getInstance().game;
                }
                TransitionManager.prototype._add = function (id, outHandler, preloadHandler, inHandler) {
                    this._transitions[id] = {
                        outHandler: outHandler,
                        preloadHandler: preloadHandler,
                        inHandler: inHandler
                    };
                };
                TransitionManager.prototype._getTransition = function (inState, outState) {
                    var transition = this._transitions[inState + '/' + outState];
                    if (typeof transition === 'undefined') transition = this._transitions['all'];
                    return typeof transition === 'undefined' ? null : transition;
                };
                TransitionManager.prototype._transitionInComplete = function () {
                    this._transition = this._getTransition(this._fromState, this._toState);
                    if (!this._transition) return false;
                    if (typeof this._transition.preloadHandler.loadStart === 'function') this.game.asset.onLoadStart.addOnce(this._transition.preloadHandler.loadStart, this._transition.preloadHandler);
                    if (typeof this._transition.preloadHandler.loadProgress === 'function') {
                        this.game.asset.onFileComplete.add(this._transition.preloadHandler.loadProgress, this._transition.preloadHandler);
                    }
                    this.game.asset.onLoadCompleteAndAudioDecoded.addOnce(this._preloadComplete, this);
                    this.onTransitionInComplete.dispatch();
                    this.game.changeState(this._toState, this._args);
                };
                TransitionManager.prototype._transitionOutComplete = function () {
                    this._transition = null;
                    this.onTransitionOutComplete.dispatch();
                    this._isInTransition = false;
                };
                TransitionManager.prototype._preloadComplete = function () {
                    this._transition = this._getTransition(this._fromState, this._toState);
                    if (!this._transition) return false;
                    this.game.asset.onFileComplete.remove(this._transition.preloadHandler.loadProgress, this._transition.preloadHandler);
                    if (typeof this._transition.preloadHandler.loadComplete === 'function') this._transition.preloadHandler.loadComplete();
                };
                TransitionManager.prototype._clearTransition = function () {
                    this._transition.outHandler.transitionInComplete.remove(this._transitionOutComplete, this);
                    this._transition.inHandler.transitionOutComplete.remove(this._transitionInComplete, this);
                    this.game.asset.onLoadCompleteAndAudioDecoded.remove(this._preloadComplete, this);
                    this.game.asset.onLoadStart.remove(this._transition.preloadHandler.loadStart, this._transition.preloadHandler);
                    this.game.asset.onFileComplete.remove(this._transition.preloadHandler.loadProgress, this._transition.preloadHandler);
                    this._transition = null;
                };
                // public methods
                /**
                * Adds a transition handler for a specific from / to state combination
                * pass the from / to states as the first 2 arguments, and additional arguments for which instance will handle the transition
                * if only 3 args are passed, the instance will handle the in / out transition, and the preloading
                * E.G.
                * this.game.transition.add(this.game.constants.STATE_PRELOAD, this.game.constants.STATE_MENU, this.game.preloader);
                *
                * if 5 arguments are passed, a different instance can be used for in transition, preloading, and out transition
                * E.G.
                * this.game.transition.add(this.game.constants.STATE_PRELOAD, this.game.constants.STATE_MENU, this.game.transitionOutHandler, this.game.preloadHandler, this.game.transitionInHandler);
                *
                * transition handlers are expected to behave as follows:
                * an out transition handler should have a transitionIn method and dispatch a transitionComplete signal when done
                * an in transition handler should have a transitionOut method and dispatch a transitionCOmplete signal when done
                * a preload handler should have loadStart, loadProgress, and loadComplete methods
                * the loadProgress method may accept a up to 4 parameters for progress (percent of files loaded), id, fileIndex, and totalFiles
                *
                * @param {string} fromState - the state being transitioned from
                * @param {string} toState - the state being transitioned to
                * @param {outHandler} outHandler - the instance that will handle the transition from the fromState
                * @param {preloadHandler} preloadHandler - the instance that will handle preloading the toState
                * @param {inHandler} inHandler - the instance that will handle the in transition when the toState is completely loaded
                * @return {Object} transition reference that was added to _transitions
                */
                TransitionManager.prototype.add = function (fromState, toState, outHandler, preloadHandler, inHandler) {
                    var args;
                    if (arguments.length < 5) {
                        if (fromState === 'all') {
                            args = [].slice.call(arguments, 1);
                            if (arguments.length === 2) return this._add('all', args[0], args[0], args[0]);else return this._add('all', args[0], args[1], args[2]);
                        } else {
                            args = [].slice.call(arguments, 2);
                            return this._add(fromState + '/' + toState, args[0], args[0], args[0]);
                        }
                    }
                    return this._add(fromState + '/' + toState, outHandler, preloadHandler, inHandler);
                };
                TransitionManager.prototype.addAll = function (handler) {
                    return this._add('all', handler, handler, handler);
                };
                /**
                * Adds an exception to the Dijon.TransitionManager in the case where 'all' has been used
                * @param {string} state - the state to add the exception for
                */
                TransitionManager.prototype.addException = function (state) {
                    this._exceptions[state] = true;
                };
                /**
                * Removes a transition handler for a specific from / to state combination
                */
                TransitionManager.prototype.remove = function (fromState, toState) {
                    if (arguments.length === 1) {
                        this._transitions[fromState] = null;
                        delete this._transitions[fromState];
                    } else {
                        this._transitions[fromState + '/' + toState] = null;
                        delete this._transitions[fromState + '/' + toState];
                    }
                };
                /**
                * Start the transition to a new state
                * @param {string} state - the state to transition to
                * @param {any} args - an optional parameter. Pass in an object of type any containing specific parameters
                * for the state you are transitioning to. The object can then be deconstructed in that states init(args: any).
                */
                TransitionManager.prototype.to = function (state, args) {
                    if (this._transition) this._clearTransition();
                    if (this._exceptions[state]) return;
                    if (args !== undefined) {
                        this._args = args;
                    }
                    this._fromState = this.game.state.current;
                    this._toState = state;
                    this._transition = this._getTransition(this._fromState, this._toState);
                    if (!this._transition) {
                        console.log('no transition found for:', this.game.state.current + ' to ' + state);
                        this.game.changeState(this._toState);
                    }
                    this.transitionIn();
                };
                TransitionManager.prototype.transitionIn = function () {
                    if (!this._transition) return;
                    if (typeof this._transition.outHandler.transitionIn === 'function') {
                        this._isInTransition = true;
                        this._transition.outHandler.transitionInComplete.addOnce(this._transitionInComplete, this);
                        this._transition.outHandler.transitionIn();
                    }
                };
                TransitionManager.prototype.canTransitionOut = function () {
                    return !this._exceptions[this.game.state.current] && this._transition && this._transition.inHandler && typeof this._transition.inHandler.transitionOut === 'function';
                };
                /**
                * After the state is fully loaded and 'built' a call to this is made
                * this is currently made from BaseState in the 'afterBuild' method
                */
                TransitionManager.prototype.transitionOut = function () {
                    this._transition.inHandler.transitionOutComplete.addOnce(this._transitionOutComplete, this);
                    this._transition.inHandler.transitionOut();
                };
                Object.defineProperty(TransitionManager.prototype, "isInTransition", {
                    get: function () {
                        return this._isInTransition;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TransitionManager;
            }();
            exports_1("TransitionManager", TransitionManager);
        }
    };
});
$__System.register('c', ['16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (AnalyticsManager_1_1) {
            exports_1({
                "AnalyticsManager": AnalyticsManager_1_1["AnalyticsManager"],
                "AnalyticsException": AnalyticsManager_1_1["AnalyticsException"]
            });
        }, function (AssetManager_1_1) {
            exports_1({
                "AssetManager": AssetManager_1_1["AssetManager"]
            });
        }, function (AudioManager_1_1) {
            exports_1({
                "AudioManager": AudioManager_1_1["AudioManager"]
            });
        }, function (Game_1_1) {
            exports_1({
                "Game": Game_1_1["Game"]
            });
        }, function (GameObjectFactory_1_1) {
            exports_1({
                "GameObjectFactory": GameObjectFactory_1_1["GameObjectFactory"]
            });
        }, function (SequenceManager_1_1) {
            exports_1({
                "SequenceManager": SequenceManager_1_1["SequenceManager"]
            });
        }, function (State_1_1) {
            exports_1({
                "State": State_1_1["State"]
            });
        }, function (StorageManager_1_1) {
            exports_1({
                "StorageManager": StorageManager_1_1["StorageManager"]
            });
        }, function (TransitionManager_1_1) {
            exports_1({
                "TransitionManager": TransitionManager_1_1["TransitionManager"]
            });
        }],
        execute: function () {}
    };
});
$__System.register("1f", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Device;
    return {
        setters: [],
        execute: function () {
            Device = function () {
                function Device() {}
                Object.defineProperty(Device, "mobile", {
                    get: function () {
                        return Device.mobileOS !== Device.UNKNOWN;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Device, "cocoon", {
                    get: function () {
                        return typeof navigator['isCocoonJS'] !== "undefined";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Device, "mobileOS", {
                    get: function () {
                        var userAgent = window.navigator.userAgent || window.navigator.vendor || window['opera'];
                        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                            return Device.IOS;
                        } else if (userAgent.match(/Android/i)) {
                            return Device.ANDROID;
                        } else {
                            return Device.UNKNOWN;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Device, "browser", {
                    get: function () {
                        var ua = navigator.userAgent.toLowerCase();
                        return {
                            firefox: ua.indexOf('firefox') > -1,
                            ie: ua.indexOf('ie') > -1,
                            safari: ua.indexOf('safari') > -1,
                            chrome: ua.indexOf('chrome') > -1
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Device, "pixelRatio", {
                    get: function () {
                        return typeof window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Device, "customPixelRatio", {
                    get: function () {
                        return Device.pixelRatio >= 1.5 ? 2 : 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Device.IOS = 'iOS';
                Device.ANDROID = 'android';
                Device.UNKNOWN = 'unknown';
                return Device;
            }();
            exports_1("Device", Device);
        }
    };
});
$__System.register("20", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Logger;
    return {
        setters: [],
        execute: function () {
            Logger = function () {
                function Logger() {}
                Logger.log = function (instance) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (!Logger.enabled) {
                        return;
                    }
                    if (instance && instance.constructor) {
                        args.unshift(instance.constructor.toString().match(/\w+/g)[1] + ' ::');
                    }
                    return console.log.apply(console, args);
                };
                Logger.enabled = true;
                return Logger;
            }();
            exports_1("Logger", Logger);
        }
    };
});
$__System.register('21', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Notifications;
    return {
        setters: [],
        execute: function () {
            Notifications = function () {
                function Notifications() {}
                Notifications.ASSET_MANAGER_DATA_SET = 'dijonAssetManagerDataSet';
                Notifications.ASSET_MANAGER_ASSETS_CLEARED = 'dijonAssetManagerAssetsCleared';
                Notifications.MOUSE_LEAVE_GLOBAL = 'mouseOutGlobal';
                Notifications.MOUSE_ENTER_GLOBAL = 'mouseEnterGlobal';
                return Notifications;
            }();
            exports_1("Notifications", Notifications);
        }
    };
});
$__System.register('22', ['e', '23', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1, Textures_1, display_1;
    var Placeholders;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (Textures_1_1) {
            Textures_1 = Textures_1_1;
        }, function (display_1_1) {
            display_1 = display_1_1;
        }],
        execute: function () {
            Placeholders = function () {
                function Placeholders() {}
                Object.defineProperty(Placeholders, "game", {
                    get: function () {
                        return application_1.Application.getInstance().game;
                    },
                    enumerable: true,
                    configurable: true
                });
                Placeholders.image = function (x, y, texture, name) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (name === void 0) {
                        name = "";
                    }
                    var imageInstance = new Phaser.Image(Placeholders.game, x, y, texture);
                    imageInstance.name = name;
                    return imageInstance;
                };
                Placeholders.button = function (x, y, width, height, autoSize, text, callback, callbackContext, defaultColor, overColor, downColor) {
                    var _this = this;
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (width === void 0) {
                        width = 100;
                    }
                    if (height === void 0) {
                        height = 50;
                    }
                    if (autoSize === void 0) {
                        autoSize = false;
                    }
                    if (text === void 0) {
                        text = 'button';
                    }
                    if (callback === void 0) {
                        callback = null;
                    }
                    if (callbackContext === void 0) {
                        callbackContext = null;
                    }
                    if (defaultColor === void 0) {
                        defaultColor = 0xffffff;
                    }
                    if (overColor === void 0) {
                        overColor = 0xff0000;
                    }
                    if (downColor === void 0) {
                        downColor = 0x00ff00;
                    }
                    var sprite = new Phaser.Sprite(Placeholders.game, x, y);
                    // Create the text instance with an auto size of 25 or 60% of the height passed in.
                    var textInstance = new display_1.Text(width * 0.5, height * 0.55, " " + text + " ", 'Arial', autoSize ? 25 : height * 0.6, '#000000');
                    textInstance.centerPivot();
                    textInstance.name = "Label";
                    if (autoSize) {
                        // Use a padding of 10
                        width = textInstance.realWidth + 10;
                        height = textInstance.realHeight + 10;
                        // Update the text position
                        textInstance.position.set(width * 0.5, height * 0.55);
                    }
                    var upImage = Placeholders.image(0, 0, Textures_1.Textures.roundedRect(width, height, 10, defaultColor), "Up");
                    var overImage = Placeholders.image(0, 0, Textures_1.Textures.roundedRect(width, height, 10, overColor), "Over");
                    var downImage = Placeholders.image(0, 0, Textures_1.Textures.roundedRect(width, height, 10, downColor), "Down");
                    overImage.visible = false;
                    downImage.visible = false;
                    sprite.addChild(upImage);
                    sprite.addChild(overImage);
                    sprite.addChild(downImage);
                    sprite.addChild(textInstance);
                    sprite.inputEnabled = true;
                    sprite.input.useHandCursor = true;
                    sprite.events.onInputUp.add(function () {
                        downImage.visible = false;
                        overImage.visible = false;
                        upImage.visible = true;
                        if (callback) {
                            callback.call(callbackContext, _this);
                        }
                    });
                    sprite.events.onInputDown.add(function () {
                        downImage.visible = true;
                        overImage.visible = false;
                        upImage.visible = false;
                    });
                    sprite.events.onInputOver.add(function () {
                        downImage.visible = false;
                        overImage.visible = true;
                        upImage.visible = false;
                    });
                    sprite.events.onInputOut.add(function () {
                        downImage.visible = false;
                        overImage.visible = false;
                        upImage.visible = true;
                    });
                    sprite.getBounds = function () {
                        return new PIXI.Rectangle(0, 0, upImage.width, upImage.height);
                    };
                    return sprite;
                };
                return Placeholders;
            }();
            exports_1("Placeholders", Placeholders);
        }
    };
});
$__System.register("23", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var Textures;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Textures = function () {
                function Textures() {}
                Object.defineProperty(Textures, "game", {
                    get: function () {
                        return application_1.Application.getInstance().game;
                    },
                    enumerable: true,
                    configurable: true
                });
                Textures.rect = function (width, height, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline) {
                    if (width === void 0) {
                        width = 100;
                    }
                    if (height === void 0) {
                        height = 100;
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (alpha === void 0) {
                        alpha = 1;
                    }
                    if (fill === void 0) {
                        fill = true;
                    }
                    if (lineColor === void 0) {
                        lineColor = 0xffffff;
                    }
                    if (lineThickness === void 0) {
                        lineThickness = 1;
                    }
                    if (lineAlpha === void 0) {
                        lineAlpha = 1;
                    }
                    if (outline === void 0) {
                        outline = false;
                    }
                    var gfx = Textures.game.add.graphics(0, 0);
                    if (fill) {
                        gfx.beginFill(color, alpha);
                    }
                    if (outline) {
                        gfx.lineWidth = lineThickness;
                        gfx.lineStyle(lineThickness, lineColor, lineAlpha);
                    }
                    gfx.drawRect(0, 0, width, height);
                    var texture = gfx.generateTexture();
                    Textures.game.world.remove(gfx);
                    return texture;
                };
                Textures.roundedRect = function (width, height, radius, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline) {
                    if (width === void 0) {
                        width = 100;
                    }
                    if (height === void 0) {
                        height = 100;
                    }
                    if (radius === void 0) {
                        radius = 10;
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (alpha === void 0) {
                        alpha = 1;
                    }
                    if (fill === void 0) {
                        fill = true;
                    }
                    if (lineColor === void 0) {
                        lineColor = 0xffffff;
                    }
                    if (lineThickness === void 0) {
                        lineThickness = 1;
                    }
                    if (lineAlpha === void 0) {
                        lineAlpha = 1;
                    }
                    if (outline === void 0) {
                        outline = false;
                    }
                    var gfx = Textures.game.add.graphics(0, 0);
                    if (fill) {
                        gfx.beginFill(color, alpha);
                    }
                    if (outline) {
                        gfx.lineWidth = lineThickness;
                        gfx.lineStyle(lineThickness, lineColor, lineAlpha);
                    }
                    gfx.drawRoundedRect(0, 0, width, height, radius);
                    var texture = gfx.generateTexture();
                    Textures.game.world.remove(gfx);
                    return texture;
                };
                Textures.square = function (size, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline) {
                    if (size === void 0) {
                        size = 100;
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (alpha === void 0) {
                        alpha = 1;
                    }
                    if (fill === void 0) {
                        fill = true;
                    }
                    if (lineColor === void 0) {
                        lineColor = 0xffffff;
                    }
                    if (lineThickness === void 0) {
                        lineThickness = 1;
                    }
                    if (lineAlpha === void 0) {
                        lineAlpha = 1;
                    }
                    if (outline === void 0) {
                        outline = false;
                    }
                    return Textures.rect(size, size, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline);
                };
                Textures.circle = function (diameter, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline) {
                    if (diameter === void 0) {
                        diameter = 100;
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (alpha === void 0) {
                        alpha = 1;
                    }
                    if (fill === void 0) {
                        fill = true;
                    }
                    if (lineColor === void 0) {
                        lineColor = 0xffffff;
                    }
                    if (lineThickness === void 0) {
                        lineThickness = 1;
                    }
                    if (lineAlpha === void 0) {
                        lineAlpha = 1;
                    }
                    if (outline === void 0) {
                        outline = false;
                    }
                    var gfx = Textures.game.add.graphics(0, 0);
                    if (fill) {
                        gfx.beginFill(color, alpha);
                    }
                    if (outline) {
                        gfx.lineWidth = lineThickness;
                        gfx.lineStyle(lineThickness, lineColor, lineAlpha);
                    }
                    gfx.drawCircle(0, 0, diameter);
                    var texture = gfx.generateTexture();
                    Textures.game.world.remove(gfx);
                    return texture;
                };
                Textures.ellipse = function (width, height, color, alpha, fill, lineColor, lineThickness, lineAlpha, outline) {
                    if (width === void 0) {
                        width = 50;
                    }
                    if (height === void 0) {
                        height = 100;
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (alpha === void 0) {
                        alpha = 1;
                    }
                    if (fill === void 0) {
                        fill = true;
                    }
                    if (lineColor === void 0) {
                        lineColor = 0xffffff;
                    }
                    if (lineThickness === void 0) {
                        lineThickness = 1;
                    }
                    if (lineAlpha === void 0) {
                        lineAlpha = 1;
                    }
                    if (outline === void 0) {
                        outline = false;
                    }
                    var gfx = Textures.game.add.graphics(0, 0);
                    if (fill) {
                        gfx.beginFill(color, alpha);
                    }
                    if (outline) {
                        gfx.lineWidth = lineThickness;
                        gfx.lineStyle(lineThickness, lineColor, lineAlpha);
                    }
                    gfx.drawEllipse(0, 0, width * 0.5, height * 0.5);
                    var texture = gfx.generateTexture();
                    Textures.game.world.remove(gfx);
                    return texture;
                };
                return Textures;
            }();
            exports_1("Textures", Textures);
        }
    };
});
$__System.register("24", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var Time;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Time = function () {
                function Time() {}
                Time.delayedCall = function (delayInMilliseconds, callback, callbackContext) {
                    var params = [];
                    for (var _i = 3; _i < arguments.length; _i++) {
                        params[_i - 3] = arguments[_i];
                    }
                    if (params === undefined) {
                        params = [];
                    }
                    params.unshift(delayInMilliseconds, callback, callbackContext);
                    return application_1.Application.getInstance().game.time.events.add.apply(application_1.Application.getInstance().game.time.events, params);
                };
                return Time;
            }();
            exports_1("Time", Time);
        }
    };
});
$__System.register("25", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Util;
    return {
        setters: [],
        execute: function () {
            Util = function () {
                function Util() {}
                Util.isNumber = function (value) {
                    return +value === +value;
                };
                return Util;
            }();
            exports_1("Util", Util);
        }
    };
});
$__System.register("26", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var BitmapText;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            /**
             * Text
             */
            BitmapText = function (_super) {
                __extends(BitmapText, _super);
                function BitmapText(x, y, font, text, size, align, color, smoothing, autoFlatten, makeImage) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (font === void 0) {
                        font = null;
                    }
                    if (text === void 0) {
                        text = "";
                    }
                    if (size === void 0) {
                        size = 12;
                    }
                    if (align === void 0) {
                        align = 'left';
                    }
                    if (color === void 0) {
                        color = 0xffffff;
                    }
                    if (smoothing === void 0) {
                        smoothing = true;
                    }
                    if (autoFlatten === void 0) {
                        autoFlatten = true;
                    }
                    if (makeImage === void 0) {
                        makeImage = false;
                    }
                    _super.call(this, application_1.Application.getInstance().game, x, y, font, text, size, align);
                    this._autoFlatten = true;
                    this._color = 0xffffff;
                    this._isImage = false;
                    this._internalImage = null;
                    this._generateCachedSprite = function () {
                        this._cacheAsBitmap = false;
                        var bounds = this.getLocalBounds();
                        var res = this.game.resolution;
                        if (!this._cachedSprite) {
                            var renderTexture = new PIXI.RenderTexture(bounds.width * res | 0, bounds.height * res | 0); //, renderSession.renderer);
                            renderTexture.baseTexture.resolution = res;
                            this._cachedSprite = new PIXI.Sprite(renderTexture);
                            this._cachedSprite.texture.resolution = res;
                            this._cachedSprite.worldTransform = this.worldTransform;
                        } else {
                            this._cachedSprite.texture.resize(bounds.width * res | 0, bounds.height * res | 0);
                        }
                        //REMOVE filter!
                        var tempFilters = this._filters;
                        this._filters = null;
                        this._cachedSprite.filters = tempFilters;
                        PIXI.DisplayObject['_tempMatrix'].tx = -bounds.x;
                        PIXI.DisplayObject['_tempMatrix'].ty = -bounds.y;
                        this._cachedSprite.texture.render(this, PIXI.DisplayObject['_tempMatrix'], true);
                        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
                        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);
                        this._filters = tempFilters;
                        this._cacheAsBitmap = true;
                        this.setHitAreaToBounds();
                    };
                    this.setHitAreaToBounds = function () {
                        this.hitArea = this.getBounds();
                    };
                    if (smoothing !== true) {
                        this.smoothed = false;
                    }
                    if (makeImage !== true) {
                        if (color !== 0xffffff) {
                            this.color = color;
                        }
                        this.autoFlatten = autoFlatten;
                    } else {
                        this.makeImage();
                        if (color !== 0xffffff) {
                            this.color = color;
                        }
                    }
                }
                BitmapText.prototype.makeImage = function () {
                    this._isImage = true;
                    this._alignToNearestPixel();
                    this._internalImage = this.addChildAt(this.game.add.image(0, 0, this.generateTexture(this.game.resolution, PIXI.scaleModes.DEFAULT)), 0);
                    this.destroyGlyphs();
                };
                BitmapText.prototype.destroyGlyphs = function () {
                    var n = this.children.length - 1;
                    while (n > (this._isImage ? 0 : -1)) {
                        this.removeChildAt(n);
                        n--;
                    }
                    var glyphs = this._glyphs;
                    for (var i = 0; i < glyphs.length; i++) {
                        glyphs[i].destroy();
                    }
                    this._glyphs = [];
                };
                BitmapText.prototype.flatten = function (delay) {
                    var _this = this;
                    if (delay === void 0) {
                        delay = null;
                    }
                    if (delay) {
                        this.game.time.events.add(delay, function () {
                            _this.cacheAsBitmap = true;
                        }, this);
                        return;
                    }
                    this._alignToNearestPixel();
                    this.cacheAsBitmap = true;
                };
                BitmapText.prototype.unFlatten = function () {
                    this.cacheAsBitmap = null;
                };
                Object.defineProperty(BitmapText.prototype, "autoFlatten", {
                    get: function () {
                        return this._autoFlatten;
                    },
                    set: function (value) {
                        this._autoFlatten = value;
                        if (this._autoFlatten) {
                            this.flatten();
                        } else {
                            this.unFlatten();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BitmapText.prototype, "color", {
                    get: function () {
                        return this._color;
                    },
                    set: function (value) {
                        if (this._autoFlatten) {
                            this.unFlatten();
                        }
                        this._color = value;
                        if (this._isImage) {
                            this._internalImage.tint = this._color;
                        } else {
                            this.tint = this._color;
                        }
                        if (this._autoFlatten) {
                            this.flatten();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BitmapText.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        if (this._autoFlatten) {
                            this.unFlatten();
                        }
                        if (this._text !== undefined && value !== this._text) {
                            this._text = value.toString() || '';
                            this.destroyGlyphs();
                            this.updateText();
                        }
                        if (this._autoFlatten) {
                            this.flatten();
                        } else {
                            this._alignToNearestPixel();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BitmapText.prototype, "realWidth", {
                    get: function () {
                        return this.getBounds().width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BitmapText.prototype, "realHeight", {
                    get: function () {
                        return this.getBounds().height;
                    },
                    enumerable: true,
                    configurable: true
                });
                BitmapText.prototype._alignToNearestPixel = function () {
                    this.x = Math.round(this.x);
                    this.y = Math.round(this.y);
                    this.children.forEach(function (child) {
                        child.x = Math.round(child.x);
                        child.y = Math.round(child.y);
                    });
                };
                BitmapText.prototype.highlight = function (highlightStr, highlightColor) {
                    if (this._isImage) {
                        console.log('BitmapText:: cannot highlight a substring of a BitmapText instance when makeImage is set to true', this.text);
                        return false;
                    }
                    if (this.text.indexOf(highlightStr) < 0) {
                        return false;
                    }
                    var startIndex = this.text.indexOf(highlightStr) - 1;
                    var endIndex = startIndex + highlightStr.length;
                    var child;
                    if (this._autoFlatten) {
                        this.unFlatten();
                    }
                    for (var i = startIndex; i < endIndex; i++) {
                        child = this.getChildAt(i);
                        child.tint = highlightColor;
                    }
                    if (this._autoFlatten) {
                        this.flatten();
                    } else {
                        this._alignToNearestPixel();
                    }
                    return true;
                };
                BitmapText.prototype.anchorAsImage = function (x, y) {
                    if (y === void 0) {
                        y = x;
                    }
                    // If the image is cached, no changes will be applied, so we temporarily uncache
                    var wasCached = this.cacheAsBitmap;
                    this.cacheAsBitmap = null;
                    this._internalImage.anchor.set(x, y);
                    this.cacheAsBitmap = wasCached;
                };
                return BitmapText;
            }(Phaser.BitmapText);
            exports_1("BitmapText", BitmapText);
        }
    };
});
$__System.register('27', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var Component;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Component = function () {
                function Component() {
                    this.game = application_1.Application.getInstance().game;
                    this.name = 'Component';
                }
                Component.prototype.setOwner = function (owner) {
                    this.owner = owner;
                };
                /**
                * initialize the component, set up variables
                * called by the owner first after the component is attached
                * @return {void}
                */
                Component.prototype.init = function () {};
                /**
                * add visual elements
                * called by the owner after it calls this init method
                * @return {void}
                */
                Component.prototype.buildInterface = function () {};
                /**
                * called by the owner in its update cycle, every frame
                * @return {void}
                */
                Component.prototype.update = function () {};
                /**
                * remove any visual elements / signals added
                * owner calls this method in its own destroy method
                * @return {void}
                */
                Component.prototype.destroy = function () {};
                return Component;
            }();
            exports_1("Component", Component);
        }
    };
});
$__System.register("28", ["29"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Sprite_1;
    var InvisibleButton;
    return {
        setters: [function (Sprite_1_1) {
            Sprite_1 = Sprite_1_1;
        }],
        execute: function () {
            InvisibleButton = function (_super) {
                __extends(InvisibleButton, _super);
                function InvisibleButton(x, y, name, w, h) {
                    _super.call(this, x, y, null, null, name);
                    this.init();
                    this.buildInterface();
                    this.setSize(w, h);
                }
                InvisibleButton.prototype.init = function () {
                    this.inputEnabled = true;
                };
                InvisibleButton.prototype.buildInterface = function () {
                    this._addHitRect();
                };
                // private methods
                InvisibleButton.prototype._addHitRect = function () {
                    if (this._hitWidth > 0 && this._hitHeight > 0) {
                        this.hitArea = new Phaser.Rectangle(0, 0, this._hitWidth, this._hitHeight);
                    }
                };
                // public methods
                InvisibleButton.prototype.setSize = function (w, h) {
                    this._hitWidth = w || 0;
                    this._hitHeight = h || 0;
                    this._addHitRect();
                };
                return InvisibleButton;
            }(Sprite_1.Sprite);
            exports_1("InvisibleButton", InvisibleButton);
        }
    };
});
$__System.register("2a", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var Group;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Group = function (_super) {
                __extends(Group, _super);
                function Group(x, y, name, addToStage, components, enableBody, physicsBodyType) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (name === void 0) {
                        name = "dGroup";
                    }
                    if (addToStage === void 0) {
                        addToStage = false;
                    }
                    if (components === void 0) {
                        components = null;
                    }
                    _super.call(this, application_1.Application.getInstance().game, null, name, addToStage, enableBody, physicsBodyType);
                    this.name = name;
                    this._hasComponents = false;
                    this._componentKeys = [];
                    this._components = {};
                    this._mediator = null;
                    // public methods
                    /**
                    * attaches a list of components to the Dijon.UIGroup
                    * @param {Array} components the list of components to add
                    */
                    this.addComponents = function (components) {
                        if (typeof components.length === 'undefined') throw new Error('Dijon.UIGroup components must be an array');
                        while (components.length > 0) this.addComponent(components.shift());
                    };
                    this.position.set(x, y);
                    if (!addToStage) this.game.add.existing(this);
                    if (components) this.addComponents(components);
                }
                // Phaser.Group overrides
                /**
                * called every frame
                * iterates the components list and calls component.update() on each component
                * @return {void}
                * @override
                */
                Group.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this._hasComponents) this.updateComponents();
                };
                /**
                * removes all components
                * @return {Phaser.Group.destroy}
                * @override
                */
                Group.prototype.destroy = function () {
                    this.removeAllComponents();
                    this.removeMediator();
                    _super.prototype.destroy.call(this);
                };
                // private methods
                /**
                * initialize variables
                * add mediator, if needed
                * @return {void}
                */
                Group.prototype.init = function () {};
                /**
                * add visual elements
                * @return {void}
                */
                Group.prototype.buildInterface = function () {};
                /**
                * updates the internal list of component keys (so we don't have to call Object.keys() all the time)
                * @return {void}
                */
                Group.prototype._updateComponentKeys = function () {
                    this._componentKeys = Object.keys(this._components);
                    this._hasComponents = this._componentKeys.length > 0;
                };
                /**
                * attaches a component to the Dijon.UIGroup
                * @param {dijon.Component} component to be attached
                */
                Group.prototype.addComponent = function (component) {
                    component.setOwner(this);
                    component.init();
                    component.buildInterface();
                    this._components[component.name] = component;
                    this._updateComponentKeys();
                    return component;
                };
                /**
                * iterates through the list of components and updates each one
                * @return {void}
                */
                Group.prototype.updateComponents = function () {
                    var _this = this;
                    this._componentKeys.forEach(function (componentName) {
                        _this.updateComponent(componentName);
                    });
                };
                /**
                * updates an attached component (calls component.update())
                * @param  {String} componentName the name of the component to update
                * @return {void}
                */
                Group.prototype.updateComponent = function (componentName) {
                    this._components[componentName].update();
                };
                /**
                * removes all the components currently attached
                * @return {void}
                */
                Group.prototype.removeAllComponents = function () {
                    while (this._componentKeys.length > 0) {
                        this.removeComponent(this._componentKeys.pop());
                    }
                };
                /**
                * removes a specific component
                * @param  {String} componentName the name of the component to remove
                * @return {void}
                */
                Group.prototype.removeComponent = function (componentName) {
                    if (typeof this._components[componentName] === 'undefined') return;
                    this._components[componentName].destroy();
                    this._components[componentName] = null;
                    delete this._components[componentName];
                    this._updateComponentKeys();
                };
                Group.prototype.flatten = function (delay) {
                    var _this = this;
                    if (delay === void 0) {
                        delay = 0;
                    }
                    if (delay === 0) {
                        this.cacheAsBitmap = true;
                    } else {
                        this.game.time.events.add(delay, function () {
                            _this.cacheAsBitmap = true;
                        }, this);
                    }
                };
                Group.prototype.unFlatten = function () {
                    this.cacheAsBitmap = null;
                };
                /**
                * removes the mediator, if it exists
                * @return {void}
                */
                Group.prototype.removeMediator = function () {
                    if (!this._mediator) {
                        return;
                    }
                    this._mediator.destroy();
                    this._mediator = null;
                };
                Object.defineProperty(Group.prototype, "addInternal", {
                    get: function () {
                        this.game.add.targetGroup = this;
                        return this.game.add;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Group;
            }(Phaser.Group);
            exports_1("Group", Group);
        }
    };
});
$__System.register('2b', ['2a'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Group_1;
    var NineSliceImage;
    return {
        setters: [function (Group_1_1) {
            Group_1 = Group_1_1;
        }],
        execute: function () {
            NineSliceImage = function (_super) {
                __extends(NineSliceImage, _super);
                function NineSliceImage(x, y, width, height, key, texturePath, fillMiddle, topHeight, rightWidth, bottomHeight, leftWidth) {
                    if (fillMiddle === void 0) {
                        fillMiddle = true;
                    }
                    _super.call(this, x, y);
                    this.key = key;
                    this.texturePath = texturePath;
                    this.fillMiddle = fillMiddle;
                    this.topHeight = topHeight;
                    this.rightWidth = rightWidth;
                    this.bottomHeight = bottomHeight;
                    this.leftWidth = leftWidth;
                    this._interactiveBacking = null;
                    this._inputEnabled = false;
                    this._currentBounds = null;
                    this.__width = Math.round(width);
                    this.__height = Math.round(height);
                    this._build();
                    this.game.time.events.add(10, this.dFlatten, this);
                }
                NineSliceImage.prototype._build = function () {
                    this._inputLayer = this.add(this.game.add.group());
                    this._displayLayer = this.add(this.game.add.group());
                    this.tl = this._displayLayer.add(this.game.add.image(0, 0, this.key, this.texturePath + '/tl'));
                    this.tr = this._displayLayer.add(this.game.add.image(this.__width, 0, this.key, this.texturePath + '/tr'));
                    this.t = this._displayLayer.add(this.game.add.tileSprite(Math.floor(this.tl.getBounds().width), 0, Math.ceil(this.__width - this.tl.getBounds().width - this.tr.getBounds().width), this.topHeight || this.tl.getBounds().height, this.key, this.texturePath + '/t'));
                    this.l = this._displayLayer.add(this.game.add.tileSprite(0, Math.floor(this.tl.getBounds().height), Math.ceil(this.leftWidth || this.tl.getBounds().width), 100, this.key, this.texturePath + '/l'));
                    this.bl = this._displayLayer.add(this.game.add.image(0, this.__height, this.key, this.texturePath + '/bl'));
                    this.l.height = Math.ceil(this.__height - this.tl.getBounds().height - this.bl.getBounds().height);
                    this.b = this._displayLayer.add(this.game.add.tileSprite(Math.floor(this.bl.getBounds().width), this.__height, 100, this.bottomHeight || this.bl.getBounds().height, this.key, this.texturePath + '/b'));
                    this.br = this._displayLayer.add(this.game.add.image(this.__width, this.__height, this.key, this.texturePath + '/br'));
                    this.b.width = Math.ceil(this.__width - this.bl.getBounds().width - this.br.getBounds().width);
                    this.r = this._displayLayer.add(this.game.add.tileSprite(this.__width, Math.floor(this.tr.getBounds().height), Math.ceil(this.rightWidth || this.tr.getBounds().width), Math.ceil(this.__height - this.tl.getBounds().height - this.br.getBounds().height), this.key, this.texturePath + '/r'));
                    this.tr.setPivot('tr');
                    this.r.setPivot('tr');
                    this.br.setPivot('br');
                    this.b.setPivot('bl');
                    this.bl.setPivot('bl');
                    if (this.fillMiddle) {
                        this.tile = this._displayLayer.add(this.game.add.tileSprite(this.tl.getBounds().width - 1, this.tl.getBounds().height - 1, this.__width - this.tl.getBounds().width - this.tr.getBounds().width + 2, this.__height - this.tl.getBounds().height - this.br.getBounds().height + 4, this.key, this.texturePath + '/tile'));
                        this.sendToBack(this.tile);
                    }
                };
                NineSliceImage.prototype._addInteractiveBacking = function () {
                    var gfx = this.game.add.graphics();
                    gfx.beginFill(0xFF0000, 0);
                    gfx.drawRect(this.x, this.y, this.__width, this.__height);
                    gfx.endFill();
                    this._interactiveBacking = this._inputLayer.add(this.game.add.image(0, 0, gfx.generateTexture()));
                    this._interactiveBacking.inputEnabled = true;
                    this.game.world.remove(gfx);
                };
                NineSliceImage.prototype._setSize = function () {
                    this.dUnflatten();
                    this.t.width = this.b.width = Math.ceil(this.__width - this.tl.getBounds().width - this.tr.getBounds().width | 0);
                    this.r.x = this.tr.x = this.br.x = this.__width | 0;
                    this.l.height = this.r.height = this.__height - this.tr.getBounds().height - this.bl.getBounds().height | 0;
                    this.bl.y = this.b.y = this.br.y = this.__height | 0;
                    if (this.fillMiddle) {
                        this.tile.width = Math.ceil(this.__width - this.tr.getBounds().width - this.tl.getBounds().width + 4);
                        this.tile.height = Math.ceil(this.__height - this.tl.getBounds().height - this.bl.getBounds().height + 4);
                    }
                    if (this._interactiveBacking != null) {
                        console.log('new width', this.__width);
                        this._interactiveBacking.width = this.__width;
                        this._interactiveBacking.height = this.__height;
                    }
                    this.game.time.events.add(10, this.dFlatten, this);
                };
                NineSliceImage.prototype._addInput = function () {
                    if (!this._interactiveBacking) {
                        this._addInteractiveBacking();
                    }
                };
                NineSliceImage.prototype._removeInput = function () {
                    if (!this._interactiveBacking) {
                        return;
                    }
                    this._interactiveBacking.inputEnabled = false;
                };
                NineSliceImage.prototype.dUnflatten = function () {
                    this._displayLayer.cacheAsBitmap = null;
                };
                NineSliceImage.prototype.dFlatten = function () {
                    this._displayLayer.cacheAsBitmap = true; //this.game.renderType === Phaser.WEBGL;
                };
                Object.defineProperty(NineSliceImage.prototype, "inputEnabled", {
                    set: function (value) {
                        this._inputEnabled = value;
                        if (this._inputEnabled) {
                            this._addInput();
                        } else {
                            this._removeInput();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NineSliceImage.prototype, "events", {
                    get: function () {
                        if (!this._interactiveBacking || !this._interactiveBacking.inputEnabled) {
                            return null;
                        }
                        return this._interactiveBacking.events;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NineSliceImage.prototype, "input", {
                    get: function () {
                        return this._interactiveBacking.input;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NineSliceImage.prototype, "hSize", {
                    get: function () {
                        return this.__width;
                    },
                    set: function (value) {
                        this.__width = value;
                        this._setSize();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NineSliceImage.prototype, "vSize", {
                    get: function () {
                        return this.__height;
                    },
                    set: function (value) {
                        this.__height = value;
                        this._setSize();
                    },
                    enumerable: true,
                    configurable: true
                });
                NineSliceImage.prototype.setSize = function (width, height) {
                    this.__width = width;
                    this.__height = height;
                    this._setSize();
                };
                Object.defineProperty(NineSliceImage.prototype, "interactiveBacking", {
                    get: function () {
                        return this._interactiveBacking;
                    },
                    enumerable: true,
                    configurable: true
                });
                return NineSliceImage;
            }(Group_1.Group);
            exports_1("NineSliceImage", NineSliceImage);
        }
    };
});
$__System.register('2c', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var Spine;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Spine = function (_super) {
                __extends(Spine, _super);
                function Spine(assetName, x, y, skeletonScale) {
                    if (assetName === void 0) {
                        assetName = '';
                    }
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (skeletonScale === void 0) {
                        skeletonScale = 1;
                    }
                    _super.call(this, application_1.Application.getInstance().game, x, y, Spine.createSpineData(Spine.LOAD_NON_MESH ? assetName + Spine.NON_MESH_SUFFIX : assetName, skeletonScale));
                    this.assetName = assetName;
                    this.skeletonScale = skeletonScale;
                    this.debug = false;
                    this._created = false;
                    this.onCreate = new Phaser.Signal();
                    this.onAnimationComplete = null;
                    this.onMeshSwap = new Phaser.Signal();
                    this._canUpdate = true;
                    this._paused = false;
                    this._speed = 1;
                    this._skeletonScale = 1;
                    this._boundsOffset = new Phaser.Point(0, 0);
                    this._boundsWidthScale = 1;
                    this._boundsHeightScale = 1;
                    this._currentBounds = new PIXI.Rectangle();
                    this._physicsOffset = { x: 0, y: 0 };
                    this._physicsEnabled = false;
                    this.nonMeshVersion = false;
                    this._skeletonScale = skeletonScale;
                    if (Spine.LOAD_NON_MESH) {
                        this.nonMeshVersion = true;
                    }
                    // initialize static
                    Spine.initialize();
                    Spine.onNonMeshFPS.addOnce(this.loadNonMeshVersion, this);
                    this.name = assetName;
                    this.skeleton.setToSetupPose();
                    this._createBounds();
                    this.update(0);
                    this.autoUpdate = false;
                    this.onAnimationComplete = this.state.onAnimationComplete;
                    this.hitArea = new Phaser.Rectangle(0, -this.skeleton.data.height, this.skeleton.data.width, this.skeleton.data.height);
                    //this.game.time.events.add(100, this._onCreateInternal, this);
                    if (Spine.AUTO_MESH && Spine.LOAD_NON_MESH !== true) {
                        Spine.detectAutoMesh();
                    }
                }
                Spine.prototype._onCreateInternal = function () {
                    this._created = true;
                    this._create();
                    this.onCreate.dispatch();
                    this._canUpdate = true;
                };
                Spine.prototype._create = function () {
                    // to override
                };
                Spine.prototype.destroy = function () {
                    this.skeleton = null;
                    this.state = null;
                    this.stateData = null;
                    this.spineData = null;
                    if (this.slotContainers && this.slotContainers.length > 0) {
                        while (this.slotContainers.length > 0) {
                            this.slotContainers.shift().destroy(true, true);
                        }
                    }
                    this.slotContainers = null;
                    this.removeChildren();
                    _super.prototype.destroy.call(this);
                };
                Spine.prototype.update = function (dt) {
                    if (dt === void 0) {
                        dt = Spine.DEFAULT_SPEED;
                    }
                    if (!this._created && this.parent) {
                        this._onCreateInternal();
                    }
                    if (this._paused || !this._canUpdate) {
                        return;
                    }
                    if (this._physicsEnabled === true) {
                        this.x = this.physicsSprite.body.position.x + this._physicsOffset.x;
                        this.y = this.physicsSprite.body.position.y + this._physicsOffset.y + (this.scale.y > 0 ? this.physicsSprite.body.height : 0);
                    }
                    _super.prototype.update.call(this, this._speed * dt);
                };
                Spine.prototype.initPhysics = function (type, offset) {
                    this._createBounds();
                    if (type != Phaser.Physics.ARCADE && type != Phaser.Physics.NINJA && type != Phaser.Physics.P2JS) return false;
                    if (offset.x !== undefined) {
                        this._physicsOffset.x = offset.x;
                    }
                    if (offset.y !== undefined) {
                        this._physicsOffset.y = offset.y;
                    }
                    this.physicsSprite = this.parent.addChild(this.game.add.sprite(this.x + this._physicsOffset.x, this.y - this._physicsOffset.y));
                    this.physicsSprite.name = this.assetName + '_physicsSprite';
                    this.game.physics.enable(this.physicsSprite, type);
                    this._physicsEnabled = this.physicsSprite.body !== null;
                    return this._physicsEnabled;
                };
                Spine.prototype.disablePhysics = function () {
                    this._physicsEnabled = false;
                };
                Spine.prototype.enablePhysics = function () {
                    this._physicsEnabled = true;
                };
                Spine.prototype.loadNonMeshVersion = function () {
                    var _this = this;
                    if (this.nonMeshVersion === true) {
                        return;
                    }
                    /// sets the nonMeshVersion flag so this method doesn't run more than once
                    //this.visible = false;
                    this.nonMeshVersion = true;
                    this.alpha = 0;
                    // store the tracks and signals
                    var tracks = this.state.tracks;
                    var signal = this.state.onAnimationComplete;
                    // destroy the slot containers
                    while (this.children.length > 0) {
                        this.removeChildAt(0).destroy();
                    }
                    // reset the spine data
                    this.setup(Spine.createSpineData(this.name + Spine.NON_MESH_SUFFIX, this._skeletonScale));
                    this.state.apply(this.skeleton);
                    // reset the state
                    this.state.tracks = tracks;
                    // reset the signals
                    if (signal !== null) {
                        this.state.onAnimationComplete.removeAll();
                        this.state.onAnimationComplete.dispose();
                        this.state.onAnimationComplete = null;
                        this.onAnimationComplete = null;
                        this.state.onAnimationComplete = signal;
                    } else {
                        this.state.onAnimationComplete = new Phaser.Signal();
                    }
                    this.onAnimationComplete = this.state.onAnimationComplete;
                    // force an update
                    //this.update();
                    // clear the meshed spine assets
                    this.game.asset.clearSpineAsset(this.name);
                    this.game.time.events.add(100, function () {
                        _this.alpha = 1;
                    }, this);
                    this.onMeshSwap.dispatch();
                };
                Spine.createSpineData = function (assetName, skeletonScale) {
                    if (skeletonScale === void 0) {
                        skeletonScale = 1;
                    }
                    var spine = PIXI.spine;
                    var spineAtlas = new spine.SpineRuntime.Atlas(application_1.Application.getInstance().game.cache.getText(assetName + '.atlas'), this.atlasCallbackFunction);
                    var spineJsonParser = new spine.SpineRuntime.SkeletonJsonParser(new spine.SpineRuntime.AtlasAttachmentParser(spineAtlas), skeletonScale);
                    var skeletonData = spineJsonParser.readSkeletonData(application_1.Application.getInstance().game.cache.getJSON(assetName + '.json'));
                    return skeletonData;
                };
                Spine.atlasCallbackFunction = function (line, callback) {
                    //callback(PIXI.BaseTexture.fromImage('assets/spine/' + line));
                    var lineArr = line.split('@' + application_1.Application.getInstance().game.resolution + 'x');
                    var url = lineArr.join('');
                    callback(new PIXI.BaseTexture(application_1.Application.getInstance().game.cache.getImage(url), PIXI.scaleModes.DEFAULT));
                };
                Object.defineProperty(Spine.prototype, "paused", {
                    get: function () {
                        return this._paused;
                    },
                    set: function (value) {
                        this._paused = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "speed", {
                    get: function () {
                        return this._speed;
                    },
                    set: function (value) {
                        this._speed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "boundsOffset", {
                    get: function () {
                        return this._boundsOffset;
                    },
                    set: function (offset) {
                        this._boundsOffset = offset;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "boundsWidthScale", {
                    get: function () {
                        return this._boundsWidthScale;
                    },
                    set: function (scale) {
                        this._boundsWidthScale = scale;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "boundsHeightScale", {
                    get: function () {
                        return this._boundsHeightScale;
                    },
                    set: function (scale) {
                        this._boundsHeightScale = scale;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Spine.prototype.getBounds = function () {
                    return this._currentBounds || this._createBounds();
                };
                Spine.prototype._createBounds = function () {
                    this._currentBounds = new PIXI.Rectangle(this.x + this._boundsOffset.x * this.scale.x, this.y - this.skeleton.data.height * this.scale.y + this._boundsOffset.y * this.scale.y, this.skeleton.data.width * Math.abs(this.scale.x) * this.boundsWidthScale, this.skeleton.data.height * Math.abs(this.scale.y) * this.boundsHeightScale);
                    return this._currentBounds;
                };
                // also updates the bounds
                Spine.prototype.setScale = function (x, y) {
                    if (x === void 0) {
                        x = null;
                    }
                    if (y === void 0) {
                        y = null;
                    }
                    if (x !== null) {
                        this.scale.x = x;
                    }
                    if (y !== null) {
                        this.scale.y = y;
                    }
                    this._currentBounds = null;
                };
                Object.defineProperty(Spine.prototype, "width", {
                    get: function () {
                        return this.getBounds().width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "height", {
                    get: function () {
                        return this.getBounds().height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine.prototype, "body", {
                    get: function () {
                        if (!this._physicsEnabled) {
                            return null;
                        }
                        return this.physicsSprite.body;
                    },
                    enumerable: true,
                    configurable: true
                });
                Spine.initialize = function () {
                    if (Spine.INITIALIZED) {
                        return;
                    }
                    Spine.INITIALIZED = true;
                    Spine.game = application_1.Application.getInstance().game;
                    Spine.onNonMeshFPS = new Phaser.Signal();
                };
                Spine.detectAutoMesh = function () {
                    Spine.game.time.advancedTiming = true;
                    Spine.game.time.events.add(2000, Spine.checkNonMeshThreshold, Spine);
                };
                Spine.destroyNonMeshTimer = function () {
                    if (Spine.nonMeshTimer !== null) {
                        Spine.game.time.events.remove(Spine.nonMeshTimer);
                        Spine.nonMeshTimer = null;
                    }
                };
                Spine.checkNonMeshThreshold = function () {
                    Spine.destroyNonMeshTimer();
                    Spine.nonMeshTimer = Spine.game.time.events.repeat(500, 10, Spine.checkAutoMeshFPS, Spine);
                    Spine.game.time.events.add(5500, Spine.disableAdvancedTiming, Spine);
                };
                Spine.checkAutoMeshFPS = function () {
                    //console.log(this.game.time.fps, Spine.NON_MESH_FPS)
                    if (Spine.game.time.fps < Spine.NON_MESH_FPS) {
                        Spine.destroyNonMeshTimer();
                        Spine.LOAD_NON_MESH = true;
                        Spine.onNonMeshFPS.dispatch();
                        Spine.disableAdvancedTiming();
                    }
                };
                Spine.disableAdvancedTiming = function () {
                    Spine.game.time.advancedTiming = false;
                };
                Spine.setAutoMesh = function (enabled, nonMeshSuffix, nonMeshFPS) {
                    if (enabled === void 0) {
                        enabled = true;
                    }
                    if (nonMeshSuffix === void 0) {
                        nonMeshSuffix = Spine.DEFAULT_NON_MESH_SUFFIX;
                    }
                    if (nonMeshFPS === void 0) {
                        nonMeshFPS = Spine.DEFAULT_NON_MESH_FPS;
                    }
                    Spine.AUTO_MESH = enabled;
                    Spine.NON_MESH_SUFFIX = nonMeshSuffix;
                    Spine.NON_MESH_FPS = nonMeshFPS;
                };
                Spine.DEFAULT_SPEED = 0.0167; // 60 fps;
                // static methods
                // auto mesh / non-mesh asset loading
                Spine.INITIALIZED = false;
                Spine.game = null;
                Spine.nonMeshTimer = null;
                Spine.LOAD_NON_MESH = false;
                Spine.AUTO_MESH = false;
                Spine.DEFAULT_NON_MESH_SUFFIX = '_nomesh';
                Spine.NON_MESH_SUFFIX = null;
                Spine.DEFAULT_NON_MESH_FPS = 35;
                Spine.NON_MESH_FPS = null;
                return Spine;
            }(PIXI.spine.Spine);
            exports_1("Spine", Spine);
        }
    };
});
$__System.register('2d', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var Spine2;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Spine2 = function (_super) {
                __extends(Spine2, _super);
                function Spine2(assetName, x, y, skeletonScale) {
                    if (assetName === void 0) {
                        assetName = '';
                    }
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (skeletonScale === void 0) {
                        skeletonScale = 1;
                    }
                    _super.call(this, application_1.Application.getInstance().game, x, y, Spine2.createSpineData(Spine2.LOAD_NON_MESH ? assetName + Spine2.NON_MESH_SUFFIX : assetName, skeletonScale));
                    this.assetName = assetName;
                    this.skeletonScale = skeletonScale;
                    this.debug = false;
                    this._created = false;
                    this.onCreate = new Phaser.Signal();
                    this.onAnimationComplete = null;
                    this.onMeshSwap = new Phaser.Signal();
                    this._canUpdate = true;
                    this._paused = false;
                    this._speed = 1;
                    this._skeletonScale = 1;
                    this._boundsOffset = new Phaser.Point(0, 0);
                    this._boundsWidthScale = 1;
                    this._boundsHeightScale = 1;
                    this._currentBounds = new PIXI.Rectangle();
                    this._physicsOffset = { x: 0, y: 0 };
                    this._physicsEnabled = false;
                    this.nonMeshVersion = false;
                    this._skeletonScale = skeletonScale;
                    if (Spine2.LOAD_NON_MESH) {
                        this.nonMeshVersion = true;
                    }
                    // initialize static
                    Spine2.initialize();
                    Spine2.onNonMeshFPS.addOnce(this.loadNonMeshVersion, this);
                    this.name = assetName;
                    this.skeleton.setToSetupPose();
                    this._createBounds();
                    this.update(0);
                    this.autoUpdate = false;
                    this.onAnimationComplete = this.state.onAnimationComplete;
                    this.hitArea = new Phaser.Rectangle(0, -this.skeleton.data.height, this.skeleton.data.width, this.skeleton.data.height);
                    //this.game.time.events.add(100, this._onCreateInternal, this);
                    if (Spine2.AUTO_MESH && Spine2.LOAD_NON_MESH !== true) {
                        Spine2.detectAutoMesh();
                    }
                }
                Spine2.prototype._onCreateInternal = function () {
                    this._created = true;
                    this._create();
                    this.onCreate.dispatch();
                    this._canUpdate = true;
                };
                Spine2.prototype._create = function () {
                    // to override
                };
                Spine2.prototype.destroy = function () {
                    this.skeleton = null;
                    this.state = null;
                    this.stateData = null;
                    this.spineData = null;
                    if (this.slotContainers && this.slotContainers.length > 0) {
                        while (this.slotContainers.length > 0) {
                            this.slotContainers.shift().destroy(true, true);
                        }
                    }
                    this.slotContainers = null;
                    _super.prototype.destroy.call(this);
                };
                Spine2.prototype.update = function (dt) {
                    if (dt === void 0) {
                        dt = Spine2.DEFAULT_SPEED;
                    }
                    if (!this._created && this.parent) {
                        this._onCreateInternal();
                    }
                    if (this._paused || !this._canUpdate) {
                        return;
                    }
                    _super.prototype.update.call(this, this._speed * dt);
                };
                Spine2.prototype.initPhysics = function (type) {
                    this._createBounds();
                    if (type != Phaser.Physics.ARCADE && type != Phaser.Physics.NINJA && type != Phaser.Physics.P2JS) return false;
                    if (type === Phaser.Physics.ARCADE) {
                        this.game.physics.arcade.enable(this, false);
                    } else {
                        this.game.physics.enable(this, type);
                    }
                    this._physicsEnabled = this.body !== null;
                    return this._physicsEnabled;
                };
                Spine2.prototype.disablePhysics = function () {
                    this._physicsEnabled = false;
                };
                Spine2.prototype.enablePhysics = function () {
                    this._physicsEnabled = true;
                };
                Spine2.prototype.loadNonMeshVersion = function () {
                    var _this = this;
                    if (this.nonMeshVersion === true) {
                        return;
                    }
                    /// sets the nonMeshVersion flag so this method doesn't run more than once
                    //this.visible = false;
                    this.nonMeshVersion = true;
                    this.alpha = 0;
                    // store the tracks and signals
                    var tracks = this.state.tracks;
                    var signal = this.state.onAnimationComplete;
                    // destroy the slot containers
                    while (this.children.length > 0) {
                        this.removeChildAt(0).destroy();
                    }
                    // reset the spine data
                    this.setup(Spine2.createSpineData(this.name + Spine2.NON_MESH_SUFFIX, this._skeletonScale));
                    this.state.apply(this.skeleton);
                    // reset the state
                    this.state.tracks = tracks;
                    // reset the signals
                    if (signal !== null) {
                        this.state.onAnimationComplete.removeAll();
                        this.state.onAnimationComplete.dispose();
                        this.state.onAnimationComplete = null;
                        this.onAnimationComplete = null;
                        this.state.onAnimationComplete = signal;
                    } else {
                        this.state.onAnimationComplete = new Phaser.Signal();
                    }
                    this.onAnimationComplete = this.state.onAnimationComplete;
                    // force an update
                    //this.update();
                    // clear the meshed spine assets
                    this.game.asset.clearSpineAsset(this.name);
                    this.game.time.events.add(100, function () {
                        _this.alpha = 1;
                    }, this);
                    this.onMeshSwap.dispatch();
                };
                Spine2.createSpineData = function (assetName, skeletonScale) {
                    if (skeletonScale === void 0) {
                        skeletonScale = 1;
                    }
                    var spine = PIXI.spine;
                    var spineAtlas = new spine.SpineRuntime.Atlas(application_1.Application.getInstance().game.cache.getText(assetName + '.atlas'), this.atlasCallbackFunction);
                    var spineJsonParser = new spine.SpineRuntime.SkeletonJsonParser(new spine.SpineRuntime.AtlasAttachmentParser(spineAtlas), skeletonScale);
                    var skeletonData = spineJsonParser.readSkeletonData(application_1.Application.getInstance().game.cache.getJSON(assetName + '.json'));
                    return skeletonData;
                };
                Spine2.atlasCallbackFunction = function (line, callback) {
                    //callback(PIXI.BaseTexture.fromImage('assets/spine/' + line));
                    var lineArr = line.split('@' + application_1.Application.getInstance().game.resolution + 'x');
                    var url = lineArr.join('');
                    callback(new PIXI.BaseTexture(application_1.Application.getInstance().game.cache.getImage(url), PIXI.scaleModes.DEFAULT));
                };
                Object.defineProperty(Spine2.prototype, "paused", {
                    get: function () {
                        return this._paused;
                    },
                    set: function (value) {
                        this._paused = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "speed", {
                    get: function () {
                        return this._speed;
                    },
                    set: function (value) {
                        this._speed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "boundsOffset", {
                    get: function () {
                        return this._boundsOffset;
                    },
                    set: function (offset) {
                        this._boundsOffset = offset;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "boundsWidthScale", {
                    get: function () {
                        return this._boundsWidthScale;
                    },
                    set: function (scale) {
                        this._boundsWidthScale = scale;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "boundsHeightScale", {
                    get: function () {
                        return this._boundsHeightScale;
                    },
                    set: function (scale) {
                        this._boundsHeightScale = scale;
                        this._currentBounds = null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Spine2.prototype.getBounds = function () {
                    return this._currentBounds || this._createBounds();
                };
                Spine2.prototype._createBounds = function () {
                    this._currentBounds = new PIXI.Rectangle(this.x + this._boundsOffset.x * this.scale.x, this.y - this.skeleton.data.height * this.scale.y + this._boundsOffset.y * this.scale.y, this.skeleton.data.width * Math.abs(this.scale.x) * this.boundsWidthScale, this.skeleton.data.height * Math.abs(this.scale.y) * this.boundsHeightScale);
                    return this._currentBounds;
                };
                // also updates the bounds
                Spine2.prototype.setScale = function (x, y) {
                    if (x === void 0) {
                        x = null;
                    }
                    if (y === void 0) {
                        y = null;
                    }
                    if (x !== null) {
                        this.scale.x = x;
                    }
                    if (y !== null) {
                        this.scale.y = y;
                    }
                    this._currentBounds = null;
                };
                Object.defineProperty(Spine2.prototype, "width", {
                    get: function () {
                        return this.getBounds().width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "height", {
                    get: function () {
                        return this.getBounds().height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "arcadeBody", {
                    get: function () {
                        return this.body;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Spine2.prototype, "created", {
                    get: function () {
                        return this._created;
                    },
                    enumerable: true,
                    configurable: true
                });
                Spine2.initialize = function () {
                    if (Spine2.INITIALIZED) {
                        return;
                    }
                    Spine2.INITIALIZED = true;
                    Spine2.game = application_1.Application.getInstance().game;
                    Spine2.onNonMeshFPS = new Phaser.Signal();
                };
                Spine2.detectAutoMesh = function () {
                    Spine2.game.time.advancedTiming = true;
                    Spine2.game.time.events.add(2000, Spine2.checkNonMeshThreshold, Spine2);
                };
                Spine2.destroyNonMeshTimer = function () {
                    if (Spine2.nonMeshTimer !== null) {
                        Spine2.game.time.events.remove(Spine2.nonMeshTimer);
                        Spine2.nonMeshTimer = null;
                    }
                };
                Spine2.checkNonMeshThreshold = function () {
                    Spine2.destroyNonMeshTimer();
                    Spine2.nonMeshTimer = Spine2.game.time.events.repeat(500, 10, Spine2.checkAutoMeshFPS, Spine2);
                    Spine2.game.time.events.add(5500, Spine2.disableAdvancedTiming, Spine2);
                };
                Spine2.checkAutoMeshFPS = function () {
                    //console.log(this.game.time.fps, Spine2.NON_MESH_FPS)
                    if (Spine2.game.time.fps < Spine2.NON_MESH_FPS) {
                        Spine2.destroyNonMeshTimer();
                        Spine2.LOAD_NON_MESH = true;
                        Spine2.onNonMeshFPS.dispatch();
                        Spine2.disableAdvancedTiming();
                    }
                };
                Spine2.disableAdvancedTiming = function () {
                    Spine2.game.time.advancedTiming = false;
                };
                Spine2.setAutoMesh = function (enabled, nonMeshSuffix, nonMeshFPS) {
                    if (enabled === void 0) {
                        enabled = true;
                    }
                    if (nonMeshSuffix === void 0) {
                        nonMeshSuffix = Spine2.DEFAULT_NON_MESH_SUFFIX;
                    }
                    if (nonMeshFPS === void 0) {
                        nonMeshFPS = Spine2.DEFAULT_NON_MESH_FPS;
                    }
                    Spine2.AUTO_MESH = enabled;
                    Spine2.NON_MESH_SUFFIX = nonMeshSuffix;
                    Spine2.NON_MESH_FPS = nonMeshFPS;
                };
                Spine2.DEFAULT_SPEED = 0.0167; // 60 fps;
                // static methods
                // auto mesh / non-mesh asset loading
                Spine2.INITIALIZED = false;
                Spine2.game = null;
                Spine2.nonMeshTimer = null;
                Spine2.LOAD_NON_MESH = false;
                Spine2.AUTO_MESH = false;
                Spine2.DEFAULT_NON_MESH_SUFFIX = '_nomesh';
                Spine2.NON_MESH_SUFFIX = null;
                Spine2.DEFAULT_NON_MESH_FPS = 35;
                Spine2.NON_MESH_FPS = null;
                return Spine2;
            }(PIXI.spine.Spine);
            exports_1("Spine2", Spine2);
        }
    };
});
$__System.register("29", ["e"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1;
    var Sprite;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Sprite = function (_super) {
                __extends(Sprite, _super);
                function Sprite(x, y, key, frame, name, components) {
                    if (name === void 0) {
                        name = "dSprite";
                    }
                    if (components === void 0) {
                        components = null;
                    }
                    _super.call(this, application_1.Application.getInstance().game, x, y, key, frame);
                    this.name = name;
                    this._hasComponents = false;
                    this._componentKeys = [];
                    this._components = {};
                    // public methods
                    /**
                    * attaches a list of components to the Dijon.UIGroup
                    * @param {Array} components the list of components to add
                    */
                    this.addComponents = function (components) {
                        if (typeof components.length === 'undefined') throw new Error('Dijon.UIGroup components must be an array');
                        while (components.length > 0) this.addComponent(components.shift());
                    };
                    if (components) this.addComponents(components);
                }
                // Phaser.Sprite overrides
                /**
                * called every frame
                * iterates the components list and calls component.update() on each component
                * @return {void}
                * @override
                */
                Sprite.prototype.update = function () {
                    if (this._hasComponents) this.updateComponents();
                };
                /**
                * removes all components
                * @return {Phaser.Group.destroy}
                * @override
                */
                Sprite.prototype.destroy = function () {
                    this.removeAllComponents();
                    _super.prototype.destroy.call(this);
                };
                // private methods
                /**
                * initialize variables
                * @return {void}
                */
                Sprite.prototype.init = function () {};
                /**
                * add visual elements
                * @return {void}
                */
                Sprite.prototype.buildInterface = function () {};
                /**
                * updates the internal list of component keys (so we don't have to call Object.keys() all the time)
                * @return {void}
                */
                Sprite.prototype._updateComponentKeys = function () {
                    this._componentKeys = Object.keys(this._components);
                    this._hasComponents = this._componentKeys.length > 0;
                };
                /**
                * attaches a component to the Dijon.UIGroup
                * @param {dijon.Component} component to be attached
                */
                Sprite.prototype.addComponent = function (component) {
                    component.setOwner(this);
                    component.init();
                    component.buildInterface();
                    this._components[component.name] = component;
                    this._updateComponentKeys();
                    return component;
                };
                ;
                /**
                * iterates through the list of components and updates each one
                * @return {void}
                */
                Sprite.prototype.updateComponents = function () {
                    var _this = this;
                    this._componentKeys.forEach(function (componentName) {
                        _this.updateComponent(componentName);
                    });
                };
                /**
                * updates an attached component (calls component.update())
                * @param  {String} componentName the name of the component to update
                * @return {void}
                */
                Sprite.prototype.updateComponent = function (componentName) {
                    this._components[componentName].update();
                };
                /**
                * removes all the components currently attached
                * @return {void}
                */
                Sprite.prototype.removeAllComponents = function () {
                    while (this._componentKeys.length > 0) {
                        this.removeComponent(this._componentKeys.pop());
                    }
                };
                /**
                * removes a specific component
                * @param  {String} componentName the name of the component to remove
                * @return {void}
                */
                Sprite.prototype.removeComponent = function (componentName) {
                    if (typeof this._components[componentName] === 'undefined') return;
                    this._components[componentName].destroy();
                    this._components[componentName] = null;
                    delete this._components[componentName];
                    this._updateComponentKeys();
                };
                Sprite.prototype.flatten = function (delay) {
                    var _this = this;
                    if (delay === void 0) {
                        delay = 0;
                    }
                    if (delay === 0) {
                        this.cacheAsBitmap = true;
                    } else {
                        this.game.time.events.add(delay, function () {
                            _this.cacheAsBitmap = true;
                        }, this);
                    }
                };
                Sprite.prototype.unFlatten = function () {
                    this.cacheAsBitmap = null;
                };
                Object.defineProperty(Sprite.prototype, "resolution", {
                    get: function () {
                        return this.texture.baseTexture.resolution;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Sprite;
            }(Phaser.Sprite);
            exports_1("Sprite", Sprite);
        }
    };
});
$__System.register('2e', ['e', '3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1, utils_1;
    var Text;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
             * Text
             */
            Text = function (_super) {
                __extends(Text, _super);
                function Text(x, y, text, fontName, fontSize, fontColor, fontAlign, wordWrap, width, lineSpacing, settings) {
                    if (text === void 0) {
                        text = "";
                    }
                    if (fontSize === void 0) {
                        fontSize = Text.DEFAULT_FONT_SIZE;
                    }
                    if (fontColor === void 0) {
                        fontColor = Text.DEFAULT_FONT_COLOR;
                    }
                    if (fontAlign === void 0) {
                        fontAlign = 'left';
                    }
                    if (wordWrap === void 0) {
                        wordWrap = false;
                    }
                    if (width === void 0) {
                        width = 0;
                    }
                    if (lineSpacing === void 0) {
                        lineSpacing = 0;
                    }
                    if (settings === void 0) {
                        settings = null;
                    }
                    _super.call(this, application_1.Application.getInstance().game, x, y, text, Text._addSettings({
                        font: fontSize + 'px ' + fontName,
                        fill: fontColor,
                        align: fontAlign,
                        wordWrap: wordWrap,
                        wordWrapWidth: width
                    }, settings));
                    this.lineSpacing = lineSpacing;
                    this.onAnimationComplete = new Phaser.Signal();
                    this._canUpdate = false;
                    this._textToAnimate = [];
                    /**
                    * stops the text animation and clears the timers
                    * @return {void}
                    */
                    this.stopAnimating = function () {
                        this._canUpdate = false;
                        this._textToAnimate = null;
                        this.game.time.events.remove(this._delayTimer);
                        this.game.time.events.remove(this._repeatTimer);
                    };
                    /**
                    * rounds the position
                    * @return {void}
                    */
                    this.roundPixel = function () {
                        this.position.set(Math.round(this.x), Math.round(this.y));
                    };
                    this.text = text.replace(/'/g, "\'");
                    this._lowercaseText = this.text.toLowerCase();
                    this.setResolution();
                }
                // Phaser.Text overrides
                Text.prototype.setText = function (text) {
                    _super.prototype.setText.call(this, text);
                    this._lowercaseText = this.text.toLowerCase();
                    this.setResolution();
                    return this;
                };
                Text.prototype.setResolution = function () {
                    if (!this.game || !utils_1.Device.cocoon) {
                        return;
                    } else if (utils_1.Device.cocoon) {
                        // fix for fonts looking really blurry in cocoonJS
                        this.resolution = this.game.resolution * this.game.resolution;
                    }
                };
                // private methods		
                /**
                * starts the text animation
                * @return {void}
                * @private
                */
                Text.prototype._startTextAnimation = function () {
                    this._canUpdate = true;
                    this._repeatTimer = this.game.time.events.repeat(this._letterTime * 100, this._textLength, this._updateTextAnimation, this);
                };
                Text.prototype._updateTextAnimation = function () {
                    if (!this._canUpdate || !this._textToAnimate) {
                        return false;
                    }
                    var index = this._textLength - this._textToAnimate.length;
                    this.addColor(this.style.fill, index);
                    this.addColor('rgba(0,0,0,0)', index + 1);
                    this._textToAnimate.shift();
                    if (this._textToAnimate.length === 0) {
                        this.onAnimationComplete.dispatch();
                    }
                };
                // public methods
                /**
                * sets the color of the entire text
                * @param {String} color css color string (such as "#ff0000")
                * @return {Dijon.UIText.highlightPhrase} calls the highlightPhrase method and "highlights" the entire text string
                */
                Text.prototype.setColor = function (color) {
                    return this.highlightPhrase(this.text, color, false);
                };
                /**
                * resets the color to the original fill color
                * @return {Dijon.UIText.highlightPhrase} calls the highlightPhrase method and "highlights" the entire text string
                */
                Text.prototype.resetColor = function () {
                    return this.highlightPhrase(this.text, this.style.fill, false);
                };
                /**
                * changes the colour of a portion of the text
                * @param  {String} phrase        the phrase within the text to change
                * @param  {String} color         css color string (such as "#ff0000")
                * @param  {Boolean} [caseSensitive = false] whether the search for the phrase within this text should be case sensitive
                * @return {void}
                */
                Text.prototype.highlightPhrase = function (phrase, color, caseSensitive) {
                    if (caseSensitive === void 0) {
                        caseSensitive = false;
                    }
                    var text = caseSensitive ? this.text : this._lowercaseText;
                    phrase = caseSensitive ? phrase : phrase.toLowerCase();
                    var len = phrase.length;
                    var startIndex = text.indexOf(phrase);
                    var endIndex = startIndex + len;
                    while (startIndex <= endIndex) {
                        this.addColor(color, startIndex);
                        startIndex++;
                    }
                    this.addColor(this.style.fill, endIndex);
                };
                /**
                * animates the text in by revealing each character in sequence
                * @param  {Number} [letterTime = 0.1]  the time (in seconds) between each character
                * @param  {int} [delay = 0]            the delay before starting the animation
                */
                Text.prototype.animate = function (letterTime, delay) {
                    if (letterTime === void 0) {
                        letterTime = 0.1;
                    }
                    if (delay === void 0) {
                        delay = 0;
                    }
                    this.game.time.events.remove(this._delayTimer);
                    this.game.time.events.remove(this._repeatTimer);
                    this._letterTime = letterTime;
                    this._textLength = this.text.length;
                    this._textToAnimate = this.text.split('');
                    var startIndex = 0;
                    var endIndex = this._textLength;
                    while (startIndex <= endIndex) {
                        this.addColor('rgba(0,0,0,0)', startIndex);
                        startIndex++;
                    }
                    this._delayTimer = this.game.time.events.add(delay * Phaser.Timer.SECOND, this._startTextAnimation, this);
                };
                // static methods
                Text._addSettings = function (obj, settings) {
                    if (!settings) return obj;
                    for (var prop in settings) {
                        if (settings.hasOwnProperty(prop)) {
                            obj[prop] = settings[prop];
                        }
                    }
                    return obj;
                };
                Object.defineProperty(Text.prototype, "realHeight", {
                    get: function () {
                        return this.scale.y * this.texture.frame.height / this.game.resolution;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Text.prototype, "realWidth", {
                    get: function () {
                        return this.scale.x * this.texture.frame.width / this.game.resolution;
                    },
                    enumerable: true,
                    configurable: true
                });
                // constants
                Text.DEFAULT_FONT_SIZE = 12;
                Text.DEFAULT_FONT_COLOR = "#000000";
                Text.DEFAULT_FONT = "Helvetica Neue, Arial";
                Text.GLOBAL_PADDING_X = 0;
                Text.GLOBAL_PADDING_Y = 0;
                return Text;
            }(Phaser.Text);
            exports_1("Text", Text);
        }
    };
});
$__System.register('12', ['26', '27', '2a', '28', '2b', '2c', '2d', '29', '2e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (BitmapText_1_1) {
            exports_1({
                "BitmapText": BitmapText_1_1["BitmapText"]
            });
        }, function (Component_1_1) {
            exports_1({
                "Component": Component_1_1["Component"]
            });
        }, function (Group_1_1) {
            exports_1({
                "Group": Group_1_1["Group"]
            });
        }, function (InvisibleButton_1_1) {
            exports_1({
                "InvisibleButton": InvisibleButton_1_1["InvisibleButton"]
            });
        }, function (NineSliceImage_1_1) {
            exports_1({
                "NineSliceImage": NineSliceImage_1_1["NineSliceImage"]
            });
        }, function (Spine_1_1) {
            exports_1({
                "Spine": Spine_1_1["Spine"]
            });
        }, function (Spine2_1_1) {
            exports_1({
                "Spine2": Spine2_1_1["Spine2"]
            });
        }, function (Sprite_1_1) {
            exports_1({
                "Sprite": Sprite_1_1["Sprite"]
            });
        }, function (Text_1_1) {
            exports_1({
                "Text": Text_1_1["Text"]
            });
        }],
        execute: function () {}
    };
});
$__System.register('2f', ['e', '12', '3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1, display_1, utils_1;
    var Log;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (display_1_1) {
            display_1 = display_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
             *  Log will write to the standard console as well as a visual one and handle showing and hiding it.
             *  @author Galen Manuel
             */
            Log = function () {
                function Log() {}
                /* PUBLIC FUNCTIONS */
                Log.init = function () {
                    // Create our internal components
                    this.static_logLines = new Array();
                    this.static_logLinesText = new Array();
                    this.static_gameInstance = application_1.Application.getInstance().game;
                    this.static_gameHalfHeight = this.static_gameInstance.height * 0.5 | 0;
                    this._createWindowGroup();
                };
                Log.show = function () {
                    if (!application_1.Application.static_debugMode) {
                        return;
                    }
                    this.static_window.y = this.static_gameHalfHeight;
                    this.static_window.visible = true;
                };
                Log.hide = function () {
                    if (!application_1.Application.static_debugMode) {
                        return;
                    }
                    this.static_window.y = this.static_gameInstance.height;
                    this.static_window.visible = false;
                };
                Log.debug = function (pLine) {
                    var pOptionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        pOptionalParams[_i - 1] = arguments[_i];
                    }
                    if (!application_1.Application.static_debugMode) {
                        return;
                    }
                    // Standard console.log
                    if (pOptionalParams.length === 0) {
                        console.log(pLine);
                    } else {
                        console.log(pLine, pOptionalParams);
                    }
                    // TODO: Figure out how pOptionalParams is handled by console.log
                    var optionalParamsString = "";
                    for (var cnt = 0; cnt < pOptionalParams.length; cnt++) {
                        var element = pOptionalParams[cnt];
                        optionalParamsString += " ";
                        optionalParamsString += element.toString();
                    }
                    // Add the line
                    if (pLine === null) {
                        pLine = "null";
                    } else if (pLine === undefined) {
                        pLine = "undefined";
                    }
                    this.static_logLines.push(pLine + optionalParamsString);
                    // Update the _window if visible
                    this._addLine(this.static_logLines.length, '#ffffff');
                };
                Log.warn = function (pLine) {
                    var pOptionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        pOptionalParams[_i - 1] = arguments[_i];
                    }
                    if (!application_1.Application.static_debugMode) {
                        return;
                    }
                    // Standard console.warn
                    if (pOptionalParams.length === 0) {
                        console.warn(pLine);
                    } else {
                        console.warn(pLine, pOptionalParams);
                    }
                    // TODO: Figure out how pOptionalParams is handled by console.warn
                    var optionalParamsString = "";
                    for (var cnt = 0; cnt < pOptionalParams.length; cnt++) {
                        var element = pOptionalParams[cnt];
                        optionalParamsString += " ";
                        optionalParamsString += element.toString();
                    }
                    // Add the line
                    if (pLine === null) {
                        pLine = "null";
                    } else if (pLine === undefined) {
                        pLine = "undefined";
                    }
                    this.static_logLines.push(pLine + optionalParamsString);
                    // Update the _window if visible
                    this._addLine(this.static_logLines.length, '#ffff00');
                };
                Log.error = function (pLine) {
                    var pOptionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        pOptionalParams[_i - 1] = arguments[_i];
                    }
                    if (!application_1.Application.static_debugMode) {
                        return;
                    }
                    // Standard console.error
                    if (pOptionalParams.length === 0) {
                        console.error(pLine);
                    } else {
                        console.error(pLine, pOptionalParams);
                    }
                    // TODO: Figure out how pOptionalParams is handled by console.error
                    var optionalParamsString = "";
                    for (var cnt = 0; cnt < pOptionalParams.length; cnt++) {
                        var element = pOptionalParams[cnt];
                        optionalParamsString += " ";
                        optionalParamsString += element.toString();
                    }
                    // Add the line
                    if (pLine === null) {
                        pLine = "null";
                    } else if (pLine === undefined) {
                        pLine = "undefined";
                    }
                    this.static_logLines.push(pLine + optionalParamsString);
                    // Update the _window if visible
                    this._addLine(this.static_logLines.length, '#ff0000');
                };
                Log.isVisible = function () {
                    return this.static_window.visible;
                };
                /* PRIVATE FUNCTIONS */
                Log._createWindowGroup = function () {
                    this.static_window = this.static_gameInstance.addToStage.dGroup(0, this.static_gameInstance.height, "Log Window");
                    this.static_windowBG = this.static_window.addChild(utils_1.Placeholders.image(0, this.static_gameHalfHeight, utils_1.Textures.rect(this.static_gameInstance.width, this.static_gameHalfHeight, 0x000000, 0.7, true), "BG"));
                    this.static_windowBG.anchor.set(0, 1);
                    this.static_window.visible = false;
                };
                Log._addLine = function (pIndex, pColor) {
                    console.log("displaying", this.static_logLines[pIndex - 1]);
                    // create the text object
                    var logLine = new display_1.Text(5, 0, this.static_logLines[pIndex - 1], 'Arial', 14, pColor, 'left', true, this.static_gameInstance.width - 10);
                    logLine.anchor.set(0, 1);
                    logLine.name = "LogLine" + pIndex;
                    // add in to the Window and position
                    this.static_windowBG.addChild(logLine);
                    this.static_logLinesText.push(logLine);
                    // shift all other lines up
                    for (var cnt = this.static_windowBG.children.length - 2; cnt >= 0; --cnt) {
                        var line = this.static_windowBG.getChildAt(cnt);
                        line.y -= logLine.realHeight - this.LINE_SPACING;
                        // hide those that are too high
                        if (Math.abs(line.y - 5 + line.realHeight) >= this.static_gameHalfHeight - line.realHeight - 10) {
                            this.static_logLines[this.static_backOffset] = null;
                            this.static_logLinesText[this.static_backOffset].destroy();
                            this.static_logLinesText[this.static_backOffset] = null;
                            if (++this.static_backOffset * 2 >= this.static_logLines.length) {
                                this.static_logLines = this.static_logLines.slice(this.static_backOffset);
                                console.log(this.static_logLines);
                                this.static_logLinesText = this.static_logLinesText.slice(this.static_backOffset);
                                console.log(this.static_logLinesText);
                                this.static_backOffset = 0;
                            }
                        }
                    }
                };
                Log.MAX_LOG_LINES = 22;
                Log.LINE_SPACING = 5;
                Log.static_logLines = null;
                Log.static_logLinesText = null;
                Log.static_backOffset = 0;
                Log.static_window = null;
                Log.static_windowBG = null;
                Log.static_gameInstance = null;
                Log.static_gameHalfHeight = 0;
                return Log;
            }();
            exports_1("Log", Log);
        }
    };
});
$__System.register('3', ['1f', '20', '21', '22', '23', '24', '25', '2f'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Device_1_1) {
            exports_1({
                "Device": Device_1_1["Device"]
            });
        }, function (Logger_1_1) {
            exports_1({
                "Logger": Logger_1_1["Logger"]
            });
        }, function (Notifications_1_1) {
            exports_1({
                "Notifications": Notifications_1_1["Notifications"]
            });
        }, function (Placeholders_1_1) {
            exports_1({
                "Placeholders": Placeholders_1_1["Placeholders"]
            });
        }, function (Textures_1_1) {
            exports_1({
                "Textures": Textures_1_1["Textures"]
            });
        }, function (Time_1_1) {
            exports_1({
                "Time": Time_1_1["Time"]
            });
        }, function (Util_1_1) {
            exports_1({
                "Util": Util_1_1["Util"]
            });
        }, function (Log_1_1) {
            exports_1({
                "Log": Log_1_1["Log"]
            });
        }],
        execute: function () {}
    };
});
$__System.register('30', ['d', 'c', '3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var mvc_1, core_1, utils_1;
    var Application;
    return {
        setters: [function (mvc_1_1) {
            mvc_1 = mvc_1_1;
        }, function (core_1_1) {
            core_1 = core_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            Application = function () {
                function Application() {
                    var _this = this;
                    // protected        
                    this._mediator = null;
                    this._models = {};
                    this._mediators = {};
                    this._observerMap = {};
                    if (Application.instance) throw Error(Application.SINGLETON_MSG);
                    Application.instance = this;
                    window.addEventListener("hashchange", function () {
                        Application._getHashQuery();
                        _this.windowHashChange();
                    }, false);
                    this.createGame();
                    this.startGame();
                }
                Application.prototype.windowHashChange = function () {};
                // public methods
                Application.prototype.createGame = function () {
                    this.game = new core_1.Game({
                        width: 800,
                        height: 600,
                        parent: 'game-container',
                        renderer: Phaser.AUTO,
                        transparent: false
                    });
                };
                Application.prototype.startGame = function () {
                    // start the app's initial state here
                };
                Application.prototype.addPlugins = function () {
                    this.game.addPlugins();
                    if (Application.static_debugMode) {
                        utils_1.Log.init();
                    }
                };
                Application.prototype.registerModel = function (model) {
                    if (this._models[model.name]) {
                        throw new Error('Application:: a model with the name "' + model.name + '" already exists.');
                    }
                    this._models[model.name] = model;
                    model.onRegister();
                    return model;
                };
                Application.prototype.retrieveModel = function (modelName) {
                    return this._models[modelName] || null;
                };
                Application.prototype.removeModel = function (modelToRemove) {
                    var name = modelToRemove.name;
                    var model = this._models[name];
                    if (!model) return;
                    model.onRemoved();
                    delete this._models[name];
                };
                Application.prototype.registerMediator = function (mediator) {
                    if (this._mediators[mediator.name]) {
                        throw new Error('Application:: a mediator with the name "' + mediator.name + '" already exists.');
                    }
                    this._mediators[mediator.name] = mediator;
                    this.registerObserver(mediator);
                    mediator.onRegister();
                };
                Application.prototype.retrieveMediator = function (mediatorName) {
                    return this._mediators[mediatorName] || null;
                };
                Application.prototype.removeMediator = function (mediatorToRemove) {
                    var _this = this;
                    var name = mediatorToRemove.name;
                    var mediator = this._mediators[name];
                    if (!mediator) return;
                    mediator.listNotificationInterests().forEach(function (interest) {
                        _this.removeObserver(interest, mediator);
                    });
                    mediator.onRemoved();
                    delete this._mediators[name];
                };
                Application.prototype.registerObserver = function (observer) {
                    var _this = this;
                    observer.listNotificationInterests().forEach(function (notificationName) {
                        if (_this._observerMap[notificationName] === undefined) {
                            _this._observerMap[notificationName] = [];
                        }
                        _this._observerMap[notificationName].push(observer);
                    });
                };
                /**
                 * stops an observer from being interested in a notification
                 * @param {String} notificationName
                 * @param {IObserver} observerToRemove
                 * @return {void}
                 */
                Application.prototype.removeObserver = function (notificationName, observerToRemove) {
                    //The observer list for the notification under inspection
                    var observers = null,
                        observer = null,
                        i = 0;
                    observers = this._observerMap[notificationName];
                    //Find the observer for the notifyContext.
                    i = observers.length;
                    while (i--) {
                        observer = observers[i];
                        if (observer === observerToRemove) {
                            observers.splice(i, 1);
                            break;
                        }
                    }
                    /*
                     * Also, when a Notification's Observer list length falls to zero, delete the
                     * notification key from the observer map.
                     */
                    if (observers.length == 0) {
                        delete this._observerMap[notificationName];
                    }
                };
                Application.prototype.sendNotification = function (notificationName, notficationBody) {
                    var notification = new mvc_1.Notification(notificationName, notficationBody);
                    this._notifyObservers(notification);
                    notification.destroy();
                    notification = null;
                };
                // private methods
                Application.prototype._notifyObservers = function (notification) {
                    var observer = null,
                        observers = null;
                    var notificationName = notification.getName();
                    var observersRef = this._observerMap[notificationName];
                    if (observersRef) {
                        // clone the array in case an observer gets removed while the notification is being sent
                        observers = observersRef.slice(0);
                        observers.forEach(function (observer) {
                            observer.handleNotification(notification);
                        });
                    }
                };
                Application._getHashQuery = function () {
                    Application._hashQuery = {};
                    if (!window.location.hash || window.location.hash === undefined) {
                        window.location.hash = '';
                    }
                    var hash = window.location.hash.substr(1, window.location.hash.length);
                    var aHash = hash.split('&');
                    aHash.forEach(function (hashPair) {
                        var aHash = hashPair.split('=');
                        Application._hashQuery[aHash[0]] = /^\d+$/.test(aHash[1]) ? parseInt(aHash[1]) : aHash[1];
                    });
                };
                // static methods
                /**
                 * returns the Application singleton
                 * @return {Application}
                 */
                Application.getInstance = function () {
                    if (!Application.instance) Application.instance = new Application();
                    return Application.instance;
                };
                /**
                 * gets a query variable from the window.location hash
                 * assumes something like http://url/#foo=bar&baz=foo
                 * @param {String} variableId
                 * @return {any}
                 */
                Application.queryVar = function (variableId) {
                    if (Application._hashQuery === undefined) {
                        Application._getHashQuery();
                    }
                    return Application._hashQuery[variableId] || null;
                };
                // static constants
                Application.instance = null;
                Application.SINGLETON_MSG = 'Application singleton already constructed!';
                Application.static_debugMode = false;
                return Application;
            }();
            exports_1("Application", Application);
        }
    };
});
$__System.register("e", ["30"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Application_1_1) {
            exports_1({
                "Application": Application_1_1["Application"]
            });
        }],
        execute: function () {}
    };
});
$__System.register('14', ['e'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var application_1;
    var Model;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }],
        execute: function () {
            Model = function () {
                function Model(dataKey, modelName) {
                    if (dataKey === void 0) {
                        dataKey = null;
                    }
                    if (modelName === void 0) {
                        modelName = null;
                    }
                    this.modelName = modelName;
                    this.app = application_1.Application.getInstance();
                    this.game = this.app.game;
                    if (dataKey) {
                        this.setData(dataKey);
                    }
                    this.app.registerModel(this);
                }
                Model.prototype.onRegister = function () {};
                Model.prototype.onRemoved = function () {};
                Model.prototype.getKeyExists = function (key) {
                    return this.game.cache.getJSON(key) !== null;
                };
                Model.prototype.setData = function (dataKey) {
                    if (!this.getKeyExists(dataKey)) {
                        console.log('Model:: cannot set data from key ' + dataKey + '. Is it in the Phaser cache?');
                        return false;
                    }
                    this._data = this.game.cache.getJSON(dataKey);
                    return this._data;
                };
                Model.prototype.getData = function () {
                    return this._data;
                };
                Model.prototype.destroy = function () {
                    this.app.removeModel(this);
                };
                Object.defineProperty(Model.prototype, "name", {
                    get: function () {
                        return this.modelName || Model.MODEL_NAME;
                    },
                    enumerable: true,
                    configurable: true
                });
                Model.MODEL_NAME = 'Model';
                return Model;
            }();
            exports_1("Model", Model);
        }
    };
});
$__System.register("31", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Notification;
    return {
        setters: [],
        execute: function () {
            Notification = function () {
                function Notification(_name, _body) {
                    if (_body === void 0) {
                        _body = null;
                    }
                    this._name = _name;
                    this._body = _body;
                }
                Notification.prototype.getName = function () {
                    return this._name;
                };
                Notification.prototype.setBody = function (body) {
                    this._body = body;
                };
                Notification.prototype.getBody = function () {
                    return this._body;
                };
                Notification.prototype.destroy = function () {
                    this._body = null;
                    this._name = null;
                };
                return Notification;
            }();
            exports_1("Notification", Notification);
        }
    };
});
$__System.register('d', ['13', '15', '14', '31'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (CopyModel_1_1) {
            exports_1({
                "CopyModel": CopyModel_1_1["CopyModel"]
            });
        }, function (Mediator_1_1) {
            exports_1({
                "Mediator": Mediator_1_1["Mediator"]
            });
        }, function (Model_1_1) {
            exports_1({
                "Model": Model_1_1["Model"]
            });
        }, function (Notification_1_1) {
            exports_1({
                "Notification": Notification_1_1["Notification"]
            });
        }],
        execute: function () {}
    };
});
$__System.register("f", ["d"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var mvc_1;
    var ETitleType, EShipType, GameModel;
    return {
        setters: [function (mvc_1_1) {
            mvc_1 = mvc_1_1;
        }],
        execute: function () {
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
                EShipType[EShipType["NounsTitle"] = 8] = "NounsTitle";
                EShipType[EShipType["EmotionsNoun"] = 9] = "EmotionsNoun";
                EShipType[EShipType["Max"] = 10] = "Max";
            })(EShipType || (EShipType = {}));
            exports_1("EShipType", EShipType);
            GameModel = function (_super) {
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
                Object.defineProperty(GameModel.prototype, "singleShipNames", {
                    get: function () {
                        return this.shipData.solo;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameModel.prototype.generateShipName = function () {
                    var newTitle;
                    var type = Math.round(Math.random() * (EShipType.Max - 1));
                    switch (type) {
                        case EShipType.NounsEmotion:
                            newTitle = "The " + this.randomShipNoun.single + "'s " + this.randomShipEmotion.noun;
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
                            newTitle = this.randomShipTitle.single + " of " + this.randomShipEmotion.noun;
                            break;
                        case EShipType.TitleOfNouns:
                            newTitle = this.randomShipTitle.single + " of " + this.randomShipNoun.plural;
                            break;
                        case EShipType.TitlesEvent:
                            newTitle = this.randomShipTitle.single + "'s " + this.randomShipEvent;
                            break;
                        case EShipType.EmotionTitle:
                            newTitle = "The " + this.randomShipEmotion.adjective + " " + this.randomShipTitle.single;
                            break;
                        case EShipType.NounsTitle:
                            newTitle = "The " + this.randomShipNoun.single + "'s " + this.randomShipTitle.single;
                            break;
                        case EShipType.EmotionsNoun:
                            newTitle = this.randomShipEmotion.adjective + " " + this.randomShipNoun.single;
                            break;
                    }
                    return newTitle;
                };
                GameModel.prototype.generateTitle = function () {
                    var newTitle = 'You...';
                    var type = Math.round(Math.random() * (ETitleType.Max - 1));
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
            }(mvc_1.Model);
            exports_1("GameModel", GameModel);
        }
    };
});
$__System.register("32", ["e", "c", "3", "d", "2", "5", "8", "b", "11", "f"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var application_1, core_1, utils_1, mvc_1, ApplicationMediator_1, Constants_1, Boot_1, Preload_1, Menu_1, GameModel_1;
    var BoilerplateApplication;
    return {
        setters: [function (application_1_1) {
            application_1 = application_1_1;
        }, function (core_1_1) {
            core_1 = core_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (mvc_1_1) {
            mvc_1 = mvc_1_1;
        }, function (ApplicationMediator_1_1) {
            ApplicationMediator_1 = ApplicationMediator_1_1;
        }, function (Constants_1_1) {
            Constants_1 = Constants_1_1;
        }, function (Boot_1_1) {
            Boot_1 = Boot_1_1;
        }, function (Preload_1_1) {
            Preload_1 = Preload_1_1;
        }, function (Menu_1_1) {
            Menu_1 = Menu_1_1;
        }, function (GameModel_1_1) {
            GameModel_1 = GameModel_1_1;
        }],
        execute: function () {
            BoilerplateApplication = function (_super) {
                __extends(BoilerplateApplication, _super);
                function BoilerplateApplication() {
                    _super.call(this);
                    this.gameId = null;
                }
                // overrides
                BoilerplateApplication.prototype.createGame = function () {
                    this.game = new core_1.Game({
                        width: this._getGameWidth(),
                        height: this._getGameHeight(),
                        parent: 'game-container',
                        //renderer: Phaser.CANVAS,
                        renderer: Phaser.AUTO,
                        transparent: false,
                        // use this if you want to switch between @2x and @1x graphics
                        resolution: this._getResolution()
                    });
                    this._mediator = new ApplicationMediator_1.default(this);
                    this._addStates();
                };
                // public methods
                BoilerplateApplication.prototype.startGame = function () {
                    this.game.state.start(Constants_1.default.STATE_BOOT);
                };
                BoilerplateApplication.prototype.preloadComplete = function () {
                    this.responsiveVoice = window['responsiveVoice'];
                };
                BoilerplateApplication.prototype.ttsText = function (readText) {
                    if (readText !== null) {
                        this.responsiveVoice.speak(readText);
                    }
                };
                BoilerplateApplication.prototype.adjustScaleSettings = function () {
                    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                    this.game.scale.refresh();
                };
                BoilerplateApplication.prototype.adjustRendererSettings = function () {
                    this.game.stage.disableVisibilityChange = true;
                    this.game.forceSingleUpdate = true;
                    this.game.camera.roundPx = false;
                    this.game.renderer.renderSession.roundPixels = false;
                    this.game.antialias = true;
                    this.game.renderer.clearBeforeRender = this.game.renderType === Phaser.CANVAS;
                };
                // called from the boot state as we can't initialize plugins until the game is booted
                BoilerplateApplication.prototype.registerModels = function () {
                    var gameModel = new GameModel_1.GameModel('game_data');
                    var copyModel = new mvc_1.CopyModel('copy');
                };
                // private methods
                // adds states
                BoilerplateApplication.prototype._addStates = function () {
                    this.game.state.add(Constants_1.default.STATE_BOOT, Boot_1.default);
                    this.game.state.add(Constants_1.default.STATE_PRELOAD, Preload_1.default);
                    this.game.state.add(Constants_1.default.STATE_MENU, Menu_1.default);
                };
                BoilerplateApplication.prototype._getGameWidth = function () {
                    return window.innerWidth;
                };
                BoilerplateApplication.prototype._getGameHeight = function () {
                    return window.innerHeight;
                };
                BoilerplateApplication.prototype._getResolution = function () {
                    if (application_1.Application.queryVar('resolution') && !isNaN(application_1.Application.queryVar('resolution'))) {
                        return application_1.Application.queryVar('resolution');
                    }
                    return utils_1.Device.mobile ? 1 : window.devicePixelRatio > 1 ? 2 : 1;
                };
                BoilerplateApplication.prototype._getRendererByDevice = function () {
                    return utils_1.Device.mobile && window.devicePixelRatio < 2 ? Phaser.CANVAS : Phaser.AUTO;
                };
                Object.defineProperty(BoilerplateApplication.prototype, "mediator", {
                    // getter / setter
                    get: function () {
                        return this._mediator;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BoilerplateApplication.prototype, "gameModel", {
                    get: function () {
                        return this.retrieveModel(GameModel_1.GameModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BoilerplateApplication.prototype, "copyModel", {
                    get: function () {
                        return this.retrieveModel(mvc_1.CopyModel.MODEL_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                return BoilerplateApplication;
            }(application_1.Application);
            exports_1("default", BoilerplateApplication);
        }
    };
});
$__System.register("1", ["32"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var BoilerPlateApplication_1;
    var app;
    return {
        setters: [function (BoilerPlateApplication_1_1) {
            BoilerPlateApplication_1 = BoilerPlateApplication_1_1;
        }],
        execute: function () {
            // bootstrap the app
            exports_1("app", app = new BoilerPlateApplication_1.default());
        }
    };
});
})
(function(factory) {
  factory();
});