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
var load_1 = __importDefault(require("./load"));
var graphic_1 = __importDefault(require("./graphic"));
var scene1Manager_1 = __importDefault(require("./scene1Manager"));
var Scene1 = /** @class */ (function () {
    function Scene1() {
        scene_1.default.appendScene([
            PIXI.Texture.from('./assets/background1.jpg'),
            PIXI.Texture.from('./assets/maru.png')
        ]);
        scene_1.default.sprite[0].scale.x = manager_1.default.game.screen.width / 511;
        scene_1.default.sprite[0].scale.y = manager_1.default.game.screen.height / 340;
        scene_1.default.sprite[1].scale.x = 0.2;
        scene_1.default.sprite[1].scale.y = 0.2;
        scene_1.default.sprite[1].anchor.x = 0.5;
        scene_1.default.sprite[1].anchor.y = 0.5;
        scene_1.default.sprite[1].x = scene1Manager_1.default.spritePositionX;
        scene_1.default.sprite[1].y = 510;
        text_1.default.appendText('---GAME PLAY---', 0, 50, 375, 400, true);
        text_1.default.appendText('⇑', 1, 75, 550, 30, true);
        text_1.default.appendText('⇓', 2, 75, 550, 300, true);
        graphic_1.default.appendGraphic(0, 0xffffff, 374, 500, 400, 10);
        scene1Manager_1.default.spriteEnableMove(1);
        graphic_1.default.appendCloneGraphic(0, 0, 374, 500);
        text_1.default.appendText('Dream', 3, 50, 500, 0, false);
        text_1.default.appendText('Knight Of Firmament', 4, 50, 337, 0, false);
        text_1.default.appendText('Leviathan', 5, 50, 468, 0, false);
        text_1.default.appendText('Myosotis', 6, 50, 475, 0, false);
        text_1.default.appendText('RTRT', 7, 50, 508, 0, false);
        scene1Manager_1.default.rotate();
        text_1.default.transitionText[0].on('pointerdown', function () {
            if (scene_1.default.destroyScene()) {
                setTimeout(function () { new load_1.default(scene1Manager_1.default.bgmMiddleNum); }, 600);
            }
        });
    }
    return Scene1;
}());
exports.default = Scene1;
