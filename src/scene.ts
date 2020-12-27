import * as PIXI from 'pixi.js';
import Manager from './manager';

export default class Scene {
  public static container: PIXI.Container;
  public static texture: PIXI.Texture[];
  public static sprite: PIXI.Sprite[] = [];

  public static appendScene(texture: PIXI.Texture[]) {
    this.container = new PIXI.Container();
    this.texture = texture;
    Manager.game.stage.addChild(this.container);
    for (let i = 0; i < this.texture.length; i++) {
      this.sprite[i] = new PIXI.Sprite(this.texture[i]);
      this.container.addChild(this.sprite[i]);
    }
  }

  public static destroyScene() {
    Manager.ticker = new PIXI.Ticker();
    Manager.ticker.start();
    Manager.ticker.add(() => {
      this.container.alpha -= 0.05;
      if (this.container.alpha <= 0) {
        this.container.destroy();
        Manager.ticker.stop();
      };
    });
    return true;
  }
}