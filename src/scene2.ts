import * as PIXI from 'pixi.js';
import Scene from './scene';
import Manager from './manager';
import Scene1 from './scene1';
import Text from './text';
import Scene2Manager from './scene2Manager';
import Sound from './sound';

export default class Scene2 {
  private hoge = true;

  constructor() {
    Scene.appendScene([
        PIXI.Texture.from('./assets/background1.jpg')
      ]
    );
    Scene.sprite[0].scale.x = Manager.game.screen.width / 511;
    Scene.sprite[0].scale.y = Manager.game.screen.height / 340;

    Text.appendText('---PAUSE---', 0, 50, 125, 500, true);
    Text.appendText('---AGAIN---', 1, 50, 425, 500, true);
    Text.appendText('---BACK---', 2, 50, 725, 500, true);

    Scene2Manager.appendBoard();

    Sound.bgm.play();

    window.onblur = () => {
      Sound.bgm.pause();
      Manager.ticker.stop();
      this.hoge = false;
    }
    Text.transitionText[0].on('pointerdown', () => {
      if (this.hoge) {
        Sound.bgm.pause();
        Manager.ticker.stop();
        this.hoge = false;
      } else if (!this.hoge) {
        Sound.bgm.resume();
        Manager.ticker.start();
        this.hoge = true;
      }
    });
    Text.transitionText[1].on('pointerdown', () => {
      Sound.bgm.stop();
      Manager.ticker.stop();
      this.hoge = true;
      Scene2Manager.removeEvent();
      if(Scene.destroyScene()) { setTimeout(() => { new Scene2(); }, 600); }
    });
    Text.transitionText[2].on('pointerdown', () => {
      Sound.bgm.stop();
      Manager.ticker.stop();
      this.hoge = true;
      Scene2Manager.removeEvent();
      if(Scene.destroyScene()) { setTimeout(() => { new Scene1(); }, 600); }
    });
  }
}