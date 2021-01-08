"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphic_1 = __importDefault(require("./graphic"));
var manager_1 = __importDefault(require("./manager"));
var scene_1 = __importDefault(require("./scene"));
var text_1 = __importDefault(require("./text"));
var Scene1Manager = /** @class */ (function () {
    function Scene1Manager() {
    }
    Scene1Manager.spriteEnableMove = function (num) {
        var _this = this;
        this.spriteNum = num;
        scene_1.default.sprite[num].interactive = true;
        scene_1.default.sprite[num].buttonMode = true;
        scene_1.default.sprite[num].on('pointerdown', Scene1Manager.func1);
        window.addEventListener('pointerup', function () { scene_1.default.sprite[_this.spriteNum].off('pointermove'); });
    };
    Scene1Manager.func1 = function () {
        scene_1.default.sprite[Scene1Manager.spriteNum].on('pointermove', function (e) {
            if (e.data.getLocalPosition(manager_1.default.game.stage).x > 774) {
                scene_1.default.sprite[Scene1Manager.spriteNum].x = 774;
            }
            else if (e.data.getLocalPosition(manager_1.default.game.stage).x < 374) {
                scene_1.default.sprite[Scene1Manager.spriteNum].x = 374;
            }
            else {
                scene_1.default.sprite[Scene1Manager.spriteNum].x = e.data.getLocalPosition(manager_1.default.game.stage).x;
            }
            graphic_1.default.cloneGraphic[0].width = scene_1.default.sprite[Scene1Manager.spriteNum].x - graphic_1.default.cloneGraphic[0].x;
            Scene1Manager.spritePositionX = scene_1.default.sprite[Scene1Manager.spriteNum].x;
            Scene1Manager.volume = 1 + (scene_1.default.sprite[Scene1Manager.spriteNum].x - 474) / 100;
        });
    };
    Scene1Manager.rotate = function () {
        var _this = this;
        var bgmPositionY = [100, 175, 250];
        var lastNum = this.bgmNum[this.bgmNum.length - 1];
        var firstNum = this.bgmNum[0];
        this.bgmMiddleNum = this.bgmNum[1];
        for (var i = 0; i < this.bgmNum.length; i++) {
            scene_1.default.container.addChild(text_1.default.transitionText[this.bgmNum[i] + 3]);
            text_1.default.transitionText[this.bgmNum[i] + 3].y = bgmPositionY[i];
        }
        text_1.default.transitionText[1].on('pointerdown', function () {
            if (lastNum >= text_1.default.transitionText.length - 4) {
                lastNum = 0;
            }
            else {
                lastNum++;
            }
            _this.bgmNum.push(lastNum);
            _this.bgmNum.shift();
            scene_1.default.container.addChild(text_1.default.transitionText[lastNum + 3]);
            scene_1.default.container.removeChild(text_1.default.transitionText[firstNum + 3]);
            for (var i = 0; i < _this.bgmNum.length; i++) {
                text_1.default.transitionText[_this.bgmNum[i] + 3].y = bgmPositionY[i];
            }
            _this.bgmMiddleNum = _this.bgmNum[1];
            firstNum = _this.bgmNum[0];
        });
        text_1.default.transitionText[2].on('pointerdown', function () {
            if (firstNum <= 0) {
                firstNum = text_1.default.transitionText.length - 4;
            }
            else {
                firstNum--;
            }
            _this.bgmNum.unshift(firstNum);
            _this.bgmNum.pop();
            scene_1.default.container.addChild(text_1.default.transitionText[firstNum + 3]);
            scene_1.default.container.removeChild(text_1.default.transitionText[lastNum + 3]);
            for (var i = 0; i < _this.bgmNum.length; i++) {
                text_1.default.transitionText[_this.bgmNum[i] + 3].y = bgmPositionY[i];
            }
            _this.bgmMiddleNum = _this.bgmNum[1];
            lastNum = _this.bgmNum[_this.bgmNum.length - 1];
        });
    };
    Scene1Manager.volume = 1;
    Scene1Manager.spritePositionX = 474;
    Scene1Manager.bgmNum = [0, 1, 2];
    return Scene1Manager;
}());
exports.default = Scene1Manager;
