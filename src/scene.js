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
var manager_1 = __importDefault(require("./manager"));
var Scene = /** @class */ (function () {
    function Scene() {
    }
    Scene.appendScene = function (texture) {
        this.container = new PIXI.Container();
        this.texture = texture;
        manager_1.default.game.stage.addChild(this.container);
        for (var i = 0; i < this.texture.length; i++) {
            this.sprite[i] = new PIXI.Sprite(this.texture[i]);
            this.container.addChild(this.sprite[i]);
        }
    };
    Scene.destroyScene = function () {
        var _this = this;
        manager_1.default.ticker = new PIXI.Ticker();
        manager_1.default.ticker.start();
        manager_1.default.ticker.add(function () {
            _this.container.alpha -= 0.05;
            if (_this.container.alpha <= 0) {
                _this.container.destroy();
                manager_1.default.ticker.stop();
            }
            ;
        });
        return true;
    };
    Scene.sprite = [];
    return Scene;
}());
exports.default = Scene;
