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
var scene1Manager_1 = __importDefault(require("./scene1Manager"));
var Graphic = /** @class */ (function () {
    function Graphic() {
    }
    Graphic.appendGraphic = function (num, color, x, y, width, height) {
        if (width >= height) {
            this.graphic[num] = new PIXI.Graphics()
                .beginFill(color)
                .drawEllipse(height / 4, height / 4, height / 4, height / 4)
                .drawEllipse(width - height / 4, height / 4, height / 4, height / 4)
                .drawEllipse(width - height / 4, height * 3 / 4, height / 4, height / 4)
                .drawEllipse(height / 4, height * 3 / 4, height / 4, height / 4)
                .drawPolygon([
                height / 4, 0,
                width - height / 4, 0,
                width, height / 4,
                width, height * 3 / 4,
                width - height / 4, height,
                height / 4, height,
                0, height * 3 / 4,
                0, height / 4
            ])
                .endFill();
        }
        else {
            this.graphic[num] = new PIXI.Graphics()
                .beginFill(color)
                .drawEllipse(width / 4, width / 4, width / 4, width / 4)
                .drawEllipse(width * 3 / 4, width / 4, width / 4, width / 4)
                .drawEllipse(width * 3 / 4, height - width / 4, width / 4, width / 4)
                .drawEllipse(width / 4, height - width / 4, width / 4, width / 4)
                .drawPolygon([
                width / 4, 0,
                width * 3 / 4, 0,
                width, width / 4,
                width, height - width / 4,
                width * 3 / 4, height,
                width / 4, height,
                0, height - width / 4,
                0, width / 4
            ])
                .endFill();
        }
        scene_1.default.container.addChild(this.graphic[num]);
        this.graphic[num].x = x;
        this.graphic[num].y = y;
    };
    Graphic.appendCloneGraphic = function (num, cloneNum, x, y) {
        this.cloneGraphic[num] = this.graphic[cloneNum].clone();
        scene_1.default.container.addChild(this.cloneGraphic[num]);
        this.cloneGraphic[num].tint = 0x0000ff;
        this.cloneGraphic[num].x = x;
        this.cloneGraphic[num].y = y;
        this.cloneGraphic[num].width = scene_1.default.sprite[scene1Manager_1.default.spriteNum].x - Graphic.cloneGraphic[0].x;
    };
    Graphic.graphic = [];
    Graphic.cloneGraphic = [];
    return Graphic;
}());
exports.default = Graphic;
