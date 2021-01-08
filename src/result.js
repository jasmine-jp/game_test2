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
var text_1 = __importDefault(require("./text"));
var scene1_1 = __importDefault(require("./scene1"));
var Result = /** @class */ (function () {
    function Result() {
        scene_1.default.appendScene([
            PIXI.Texture.from('./assets/background1.jpg')
        ]);
        scene_1.default.sprite[0].scale.x = manager_1.default.game.screen.width / 511;
        scene_1.default.sprite[0].scale.y = manager_1.default.game.screen.height / 340;
        text_1.default.appendText('PERFECT', 0, 50, 350, 100, true);
        text_1.default.appendText('GREAT', 1, 50, 350, 200, true);
        text_1.default.appendText('MISS', 2, 50, 350, 300, true);
        text_1.default.appendText('COMBO', 3, 50, 350, 400, true);
        text_1.default.appendText("" + Result.perfectNum, 4, 50, 700, 100, true);
        text_1.default.appendText("" + Result.greatNum, 5, 50, 700, 200, true);
        text_1.default.appendText("" + Result.missNum, 6, 50, 700, 300, true);
        text_1.default.appendText("" + Result.maxCombo, 7, 50, 700, 400, true);
        text_1.default.appendText('---BACK---', 8, 50, 450, 500, true);
        text_1.default.transitionText[8].on('pointerdown', function () {
            if (scene_1.default.destroyScene()) {
                setTimeout(function () { new scene1_1.default(); }, 600);
            }
        });
    }
    Result.clear = function () {
        this.perfectNum = 0;
        this.greatNum = 0;
        this.combo = 0;
        this.missNum = 0;
        this.maxCombo = 0;
    };
    Result.perfectNum = 0;
    Result.greatNum = 0;
    Result.combo = 0;
    Result.missNum = 0;
    Result.maxCombo = 0;
    return Result;
}());
exports.default = Result;
