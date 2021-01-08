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
var Text = /** @class */ (function () {
    function Text() {
    }
    Text.appendText = function (str, num, font, x, y, bool) {
        var _this = this;
        this.transitionText[num] = new PIXI.Text(str, {
            fontSize: font,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 3
        });
        if (bool) {
            scene_1.default.container.addChild(this.transitionText[num]);
        }
        this.transitionText[num].x = x;
        this.transitionText[num].y = y;
        this.transitionText[num].interactive = true;
        this.transitionText[num].buttonMode = true;
        this.transitionText[num].on('mouseover', function () { _this.transitionText[num].tint = 0xffff00; })
            .on('mouseout', function () { _this.transitionText[num].tint = 0xffffff; });
    };
    Text.transitionText = [];
    return Text;
}());
exports.default = Text;
