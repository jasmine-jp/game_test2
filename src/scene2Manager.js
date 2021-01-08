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
var sound_1 = __importDefault(require("./sound"));
var manager_1 = __importDefault(require("./manager"));
var result_1 = __importDefault(require("./result"));
var Scene2Manager = /** @class */ (function () {
    function Scene2Manager() {
    }
    Scene2Manager.appendBoard = function () {
        var _this = this;
        for (var i = 0; i < 26; i++) {
            this.container[i] = new PIXI.Container();
            scene_1.default.container.addChild(this.container[i]);
            this.sprite[i] = PIXI.Sprite.from(PIXI.Texture.from('assets/maru.png'));
            this.container[i].addChild(this.sprite[i]);
            this.sprite[i].anchor.x = 0.5;
            this.sprite[i].anchor.y = 0.5;
            this.sprite[i].scale.x = 0.25;
            this.sprite[i].scale.y = 0.25;
            this.text[i] = new PIXI.Text(this.key[i].toUpperCase(), {
                fontSize: 75,
                fill: 0xffffff,
                stroke: 0x000000,
                strokeThickness: 3
            });
            this.container[i].addChild(this.text[i]);
            this.text[i].anchor.x = 0.5;
            this.text[i].anchor.y = 0.5;
            if (i > 18) {
                this.container[i].y = 425;
                this.container[i].x = (i - 17.35) * 100;
            }
            else if (i > 9) {
                this.container[i].y = 300;
                this.container[i].x = (i - 8.85) * 100;
            }
            else {
                this.container[i].y = 175;
                this.container[i].x = (i + 0.9) * 100;
            }
            window.addEventListener('keydown', Scene2Manager.func1);
            window.addEventListener('keyup', Scene2Manager.func2);
        }
        this.container[26] = new PIXI.Container();
        this.container[27] = new PIXI.Container();
        scene_1.default.container.addChild(this.container[27]);
        this.text[26] = new PIXI.Text("", {
            fontSize: 75,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 3
        });
        this.text[27] = new PIXI.Text("0 COMBO", {
            fontSize: 50,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 3
        });
        this.container[27].addChild(this.text[27]);
        this.text[27].x = 750;
        this.text[27].y = 50;
        manager_1.default.game.ticker.add(function () {
            _this.text[27].text = result_1.default.combo + " COMBO";
        });
        this.controlGame();
    };
    Scene2Manager.func2 = function (e) {
        for (var i = 0; i < 26; i++) {
            if (Scene2Manager.key[i] === e.key) {
                Scene2Manager.sprite[i].tint = 0xffffff;
                Scene2Manager.text[i].tint = 0xffffff;
            }
        }
    };
    Scene2Manager.controlGame = function () {
        var _this = this;
        this.boolNote = sound_1.default.note;
        manager_1.default.ticker = new PIXI.Ticker();
        manager_1.default.ticker.start();
        this.count = 0;
        this.i = 0;
        this.j = 0;
        result_1.default.clear();
        manager_1.default.ticker.add(function () {
            _this.count += manager_1.default.ticker.deltaMS / 1000;
            //window.addEventListener('keydown', Scene2Manager.a); //create note
            _this.pushNote(_this.count, _this.boolNote);
            for (var i = 0; i < _this.j; i++) {
                if (_this.shadow[i].y > 7) {
                    _this.container[_this.boolNote[i][1]].removeChild(_this.shadow[i]);
                }
                else {
                    _this.shadow[i].y += 1.2;
                }
            }
            if (sound_1.default.bgm.duration <= _this.count) {
                //console.log(this.note); //get note
                manager_1.default.ticker.stop();
                Scene2Manager.removeEvent();
                if (scene_1.default.destroyScene()) {
                    setTimeout(function () { new result_1.default(); }, 600);
                }
            }
        });
    };
    Scene2Manager.a = function () {
        Scene2Manager.note += "[" + Math.round(Scene2Manager.count * 100) / 100 + ", ], ";
    };
    Scene2Manager.pushNote = function (count, note) {
        if (this.j < note.length) {
            if (this.boolNote[this.j][0] < count + 0.6) {
                //console.log(this.boolNote[this.j]); //divide notes
                this.noteShadow();
                //if ((this.boolNote[this.j][0] - this.boolNote[this.j - 1][0]) >= 0.3) {
                //console.log("//////////////////////"); //divide notes
                //}
            }
        }
        if (this.i === note.length) {
            window.removeEventListener('keydown', Scene2Manager.func3);
        }
        else {
            if ((this.boolNote[this.i][0] < count + 0.3) && (this.boolNote[this.i][0] > count - 0.3)) {
                window.addEventListener('keydown', Scene2Manager.func3);
                return;
            }
            if ((this.boolNote[this.i][0] < count - 0.3)) {
                this.judge(0);
                this.i++;
            }
        }
    };
    Scene2Manager.removeEvent = function () {
        window.removeEventListener("keydown", Scene2Manager.func1);
        window.removeEventListener("keyup", Scene2Manager.func2);
        window.removeEventListener('keydown', Scene2Manager.func3);
    };
    Scene2Manager.noteShadow = function () {
        this.shadow[this.j] = PIXI.Sprite.from(PIXI.Texture.from('assets/maru.png'));
        this.container[this.boolNote[this.j][1]].addChild(this.shadow[this.j]);
        this.shadow[this.j].anchor.x = 0.5;
        this.shadow[this.j].anchor.y = 0.5;
        this.shadow[this.j].scale.x = 0.25;
        this.shadow[this.j].scale.y = 0.25;
        this.shadow[this.j].y = -50;
        this.shadow[this.j].alpha = 0.6;
        this.j++;
        //setTimeout(() => {
        //Sound.effect.play();
        //}, 500);
    };
    Scene2Manager.judge = function (n) {
        var _this = this;
        this.text[26].text = "";
        if (n === 2) {
            this.text[26].text = "PERFECT";
            result_1.default.perfectNum++;
            result_1.default.combo++;
        }
        else if (n === 1) {
            this.text[26].text = "GREAT";
            result_1.default.greatNum++;
            result_1.default.combo++;
        }
        else if (n === 0) {
            this.text[26].text = "MISS";
            result_1.default.missNum++;
            result_1.default.combo = 0;
        }
        else {
            this.text[26].text = "undefined";
        }
        if (result_1.default.maxCombo < result_1.default.combo) {
            result_1.default.maxCombo = result_1.default.combo;
        }
        manager_1.default.game.stage.addChild(this.container[26]);
        this.container[26].addChild(this.text[26]);
        this.text[26].x = 350;
        this.text[26].y = 25;
        setTimeout(function () {
            _this.text[26].text = "";
        }, 300);
    };
    Scene2Manager.container = [];
    Scene2Manager.sprite = [];
    Scene2Manager.key = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "a", "s", "d", "f", "g", "h", "j", "k", "l",
        "z", "x", "c", "v", "b", "n", "m"
    ];
    Scene2Manager.text = [];
    Scene2Manager.boolNote = [];
    Scene2Manager.shadow = [];
    Scene2Manager.func1 = function (e) {
        for (var i = 0; i < 26; i++) {
            if (Scene2Manager.key[i] === e.key) {
                Scene2Manager.sprite[i].tint = 0xffff00;
                Scene2Manager.text[i].tint = 0xffff00;
                sound_1.default.effect.play();
            }
        }
    };
    Scene2Manager.count = 0;
    Scene2Manager.i = 0;
    Scene2Manager.j = 0;
    Scene2Manager.note = "";
    Scene2Manager.func3 = function (e) {
        if (Scene2Manager.key[Scene2Manager.boolNote[Scene2Manager.i][1]] === e.key) {
            Scene2Manager.container[Scene2Manager.boolNote[Scene2Manager.i][1]].removeChild(Scene2Manager.shadow[Scene2Manager.i]);
            if ((Scene2Manager.boolNote[Scene2Manager.i][0] <= Scene2Manager.count + 0.075) && (Scene2Manager.boolNote[Scene2Manager.i][0] >= Scene2Manager.count - 0.075)) {
                Scene2Manager.judge(2);
                Scene2Manager.i++;
                window.removeEventListener('keydown', Scene2Manager.func3);
            }
            else if ((Scene2Manager.boolNote[Scene2Manager.i][0] <= Scene2Manager.count + 0.15) && (Scene2Manager.boolNote[Scene2Manager.i][0] >= Scene2Manager.count - 0.15)) {
                Scene2Manager.judge(1);
                Scene2Manager.i++;
                window.removeEventListener('keydown', Scene2Manager.func3);
            }
            else {
                Scene2Manager.judge(0);
                Scene2Manager.i++;
                window.removeEventListener('keydown', Scene2Manager.func3);
            }
        }
        else {
            Scene2Manager.judge(0);
            Scene2Manager.i++;
            window.removeEventListener('keydown', Scene2Manager.func3);
        }
    };
    return Scene2Manager;
}());
exports.default = Scene2Manager;
