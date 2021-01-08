"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var scene_1 = __importDefault(require("./scene"));
var manager_1 = __importDefault(require("./manager"));
var scene1_1 = __importDefault(require("./scene1"));
var text_1 = __importDefault(require("./text"));
var scene2Manager_1 = __importDefault(require("./scene2Manager"));
var sound_1 = __importDefault(require("./sound"));
var Scene2 = /** @class */ (function () {
    function Scene2() {
        var _this = this;
        this.hoge = true;
        scene_1.default.appendScene([
            PIXI.Texture.from('./assets/background1.jpg')
        ]);
        scene_1.default.sprite[0].scale.x = manager_1.default.game.screen.width / 511;
        scene_1.default.sprite[0].scale.y = manager_1.default.game.screen.height / 340;
        text_1.default.appendText('---PAUSE---', 0, 50, 125, 500, true);
        text_1.default.appendText('---AGAIN---', 1, 50, 425, 500, true);
        text_1.default.appendText('---BACK---', 2, 50, 725, 500, true);
        scene2Manager_1.default.appendBoard();
        sound_1.default.bgm.play();
        window.onblur = function () {
            sound_1.default.bgm.pause();
            manager_1.default.ticker.stop();
            _this.hoge = false;
        };
        text_1.default.transitionText[0].on('pointerdown', function () {
            if (_this.hoge) {
                sound_1.default.bgm.pause();
                manager_1.default.ticker.stop();
                _this.hoge = false;
            }
            else if (!_this.hoge) {
                sound_1.default.bgm.resume();
                manager_1.default.ticker.start();
                _this.hoge = true;
            }
        });
        text_1.default.transitionText[1].on('pointerdown', function () {
            sound_1.default.bgm.stop();
            manager_1.default.ticker.stop();
            _this.hoge = true;
            scene2Manager_1.default.removeEvent();
            if (scene_1.default.destroyScene()) {
                setTimeout(function () { new Scene2(); }, 600);
            }
        });
        text_1.default.transitionText[2].on('pointerdown', function () {
            sound_1.default.bgm.stop();
            manager_1.default.ticker.stop();
            _this.hoge = true;
            scene2Manager_1.default.removeEvent();
            if (scene_1.default.destroyScene()) {
                setTimeout(function () { new scene1_1.default(); }, 600);
            }
        });
    }
    return Scene2;
}());
exports.default = Scene2;
