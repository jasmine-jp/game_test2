import * as PIXI from 'pixi.js';
import Scene from './scene';
import Manager from './manager';
import Text from './text';
import Scene1 from './scene1';

export default class Result {
  public static perfectNum = 0;
  public static greatNum = 0;
  public static combo = 0;
  public static missNum = 0;
  public static maxCombo = 0;

  constructor() {
    Scene.appendScene([
        PIXI.Texture.from('./assets/background1.jpg')
      ]
    );
    Scene.sprite[0].scale.x = Manager.game.screen.width / 511;
    Scene.sprite[0].scale.y = Manager.game.screen.height / 340;

    Text.appendText('PERFECT', 0, 50, 350, 100, true);
    Text.appendText('GREAT', 1, 50, 350, 200, true);
    Text.appendText('MISS', 2, 50, 350, 300, true);
    Text.appendText('COMBO', 3, 50, 350, 400, true);
    Text.appendText(`${Result.perfectNum}`, 4, 50, 700, 100, true);
    Text.appendText(`${Result.greatNum}`, 5, 50, 700, 200, true);
    Text.appendText(`${Result.missNum}`, 6, 50, 700, 300, true);
    Text.appendText(`${Result.maxCombo}`, 7, 50, 700, 400, true);
    Text.appendText('---BACK---', 8, 50, 450, 500, true);

    Text.transitionText[8].on('pointerdown', () => {
      if(Scene.destroyScene()) { setTimeout(() => { new Scene1(); }, 600); }
    });
  }

  public static clear() {
    this.perfectNum = 0;
    this.greatNum = 0;
    this.combo = 0;
    this.missNum = 0;
    this.maxCombo = 0;
  }
}