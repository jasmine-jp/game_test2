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
var pixi_sound_1 = __importDefault(require("pixi-sound"));
var scene_1 = __importDefault(require("./scene"));
var scene2_1 = __importDefault(require("./scene2"));
var sound_1 = __importDefault(require("./sound"));
var scene1Manager_1 = __importDefault(require("./scene1Manager"));
var Load = /** @class */ (function () {
    function Load(num) {
        scene_1.default.appendScene([
            PIXI.Texture.from('./assets/load.png')
        ]);
        scene_1.default.sprite[0].x = 750;
        scene_1.default.sprite[0].y = 413;
        sound_1.default.bgm = pixi_sound_1.default.Sound.from({
            url: sound_1.default.url[num],
            volume: sound_1.default.bgmVolume[num],
            preload: true,
            loaded: function () {
                sound_1.default.decideNote(sound_1.default.bgm);
                sound_1.default.effect.volume = sound_1.default.effectVolume * scene1Manager_1.default.volume;
                sound_1.default.bgm.volume = sound_1.default.bgmVolume[num] * scene1Manager_1.default.volume;
                if (scene_1.default.destroyScene()) {
                    setTimeout(function () { new scene2_1.default(); }, 600);
                }
            }
        });
    }
    ;
    return Load;
}());
exports.default = Load;
