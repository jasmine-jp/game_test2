import * as PIXI from 'pixi.js';
import Scene from './scene';
import Sound from './sound';
import Manager from './manager';
import Result from './result';

export default class Scene2Manager {
  private static container: PIXI.Container[] = [];
  private static sprite: PIXI.Sprite[] = [];
  private static key: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                                  "a", "s", "d", "f", "g", "h", "j", "k", "l",
                                  "z", "x", "c", "v", "b", "n", "m"
                                ];
  private static text: PIXI.Text[] = [];
  private static boolNote: number[][] = [];
  private static shadow: PIXI.Sprite[] = [];

  public static appendBoard() {
    for (let i = 0; i < 26; i++) {
      this.container[i] = new PIXI.Container();
      Scene.container.addChild(this.container[i]);
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
      } else if (i > 9) {
        this.container[i].y = 300;
        this.container[i].x = (i - 8.85) * 100;
      } else {
        this.container[i].y = 175;
        this.container[i].x = (i + 0.9) * 100;
      }
      window.addEventListener('keydown', Scene2Manager.func1);
      window.addEventListener('keyup', Scene2Manager.func2);
    }
    this.container[26] = new PIXI.Container();
    this.container[27] = new PIXI.Container();
    Scene.container.addChild(this.container[27]);
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
    Manager.game.ticker.add(() => {
      this.text[27].text = `${Result.combo} COMBO`;
    })
    this.controlGame();
  }

  private static func1 = function(e: KeyboardEvent) {
    for (let i = 0; i < 26; i++) {
      if (Scene2Manager.key[i] === e.key) {
        Scene2Manager.sprite[i].tint = 0xffff00;
        Scene2Manager.text[i].tint = 0xffff00;
        Sound.effect.play();
      }
    }
  }
  private static func2(e: KeyboardEvent) {
    for (let i = 0; i < 26; i++) {
      if (Scene2Manager.key[i] === e.key) {
        Scene2Manager.sprite[i].tint = 0xffffff;
        Scene2Manager.text[i].tint = 0xffffff;
      }
    }
  }

  private static count = 0;
  private static i = 0;
  private static j = 0;
  private static note = "";
  private static controlGame() {
    this.boolNote = Sound.note;
    Manager.ticker = new PIXI.Ticker();
    Manager.ticker.start();
    this.count = 0;
    this.i = 0;
    this.j = 0;
    Result.clear();
    Manager.ticker.add(() => {
      this.count += Manager.ticker.deltaMS / 1000;
      //window.addEventListener('keydown', Scene2Manager.a); //create note
      this.pushNote(this.count, this.boolNote);
      for (let i = 0; i < this.j; i++) {
        if (this.shadow[i].y > 7) {
          this.container[this.boolNote[i][1]].removeChild(this.shadow[i]);
        } else {
          this.shadow[i].y += 1.2;
        }
      }
      if (Sound.bgm.duration <= this.count) {
        //console.log(this.note); //get note
        Manager.ticker.stop();
        Scene2Manager.removeEvent();
        if(Scene.destroyScene()) { setTimeout(() => { new Result(); }, 600); }
      }
    });
  }

  private static a() {
    Scene2Manager.note += `[${Math.round(Scene2Manager.count * 100) / 100}, ], `;
  }

  private static pushNote(count: number, note: number[][]) {
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
    } else {
      if ((this.boolNote[this.i][0] < count + 0.3) && (this.boolNote[this.i][0] > count - 0.3)) {
        window.addEventListener('keydown', Scene2Manager.func3);
        return;
      }
      if ((this.boolNote[this.i][0] < count - 0.3)) {
        this.judge(0);
        this.i++;
      }
    }
  }

  private static func3 = function(e: KeyboardEvent) {
    if (Scene2Manager.key[Scene2Manager.boolNote[Scene2Manager.i][1]] === e.key) {
      Scene2Manager.container[Scene2Manager.boolNote[Scene2Manager.i][1]].removeChild(Scene2Manager.shadow[Scene2Manager.i]);
      if ((Scene2Manager.boolNote[Scene2Manager.i][0] <= Scene2Manager.count + 0.075) && (Scene2Manager.boolNote[Scene2Manager.i][0] >= Scene2Manager.count - 0.075)) {
        Scene2Manager.judge(2);
        Scene2Manager.i++;
        window.removeEventListener('keydown', Scene2Manager.func3);
      } else if ((Scene2Manager.boolNote[Scene2Manager.i][0] <= Scene2Manager.count + 0.15) && (Scene2Manager.boolNote[Scene2Manager.i][0] >= Scene2Manager.count - 0.15)) {
        Scene2Manager.judge(1);
        Scene2Manager.i++;
        window.removeEventListener('keydown', Scene2Manager.func3);
      } else {
        Scene2Manager.judge(0);
        Scene2Manager.i++;
        window.removeEventListener('keydown', Scene2Manager.func3);
      }
    } else {
      Scene2Manager.judge(0);
      Scene2Manager.i++;
      window.removeEventListener('keydown', Scene2Manager.func3);
    }
  }

  public static removeEvent() {
    window.removeEventListener("keydown", Scene2Manager.func1);
    window.removeEventListener("keyup", Scene2Manager.func2);
    window.removeEventListener('keydown', Scene2Manager.func3);
  }

  private static noteShadow() {
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
  }

  private static judge(n: number) {
    this.text[26].text = "";
    if (n === 2) {
      this.text[26].text = "PERFECT";
      Result.perfectNum++;
      Result.combo++;
    } else if (n === 1) {
      this.text[26].text = "GREAT";
      Result.greatNum++;
      Result.combo++;
    } else if (n === 0) {
      this.text[26].text = "MISS";
      Result.missNum++;
      Result.combo = 0;
    } else {
      this.text[26].text = "undefined";
    }
    if (Result.maxCombo < Result.combo) {
      Result.maxCombo = Result.combo;
    }
    Manager.game.stage.addChild(this.container[26]);
    this.container[26].addChild(this.text[26]);
    this.text[26].x = 350;
    this.text[26].y = 25;
    setTimeout(() => {
      this.text[26].text = "";
    }, 300);
  }
}