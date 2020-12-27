import * as PIXI from 'pixi.js';
import Graphic from './graphic';
import Manager from './manager';
import Scene from './scene';
import Text from './text';

export default class Scene1Manager {
  public static spriteNum: number;
  public static volume = 1;
  public static spritePositionX = 474;
  public static bgmMiddleNum : number;
  private static bgmNum = [0, 1, 2];

  public static spriteEnableMove(num: number) {
    this.spriteNum = num;
    Scene.sprite[num].interactive = true;
    Scene.sprite[num].buttonMode = true;
    Scene.sprite[num].on('pointerdown', Scene1Manager.func1);
    window.addEventListener('pointerup', () => { Scene.sprite[this.spriteNum].off('pointermove'); });
  }

  private static func1() {
    Scene.sprite[Scene1Manager.spriteNum].on('pointermove', (e: PIXI.InteractionEvent) => {
      if (e.data.getLocalPosition(Manager.game.stage).x > 774) {
        Scene.sprite[Scene1Manager.spriteNum].x = 774;
      } else if (e.data.getLocalPosition(Manager.game.stage).x < 374) {
        Scene.sprite[Scene1Manager.spriteNum].x = 374;
      } else {
        Scene.sprite[Scene1Manager.spriteNum].x = e.data.getLocalPosition(Manager.game.stage).x;
      }
      Graphic.cloneGraphic[0].width = Scene.sprite[Scene1Manager.spriteNum].x - Graphic.cloneGraphic[0].x;
      Scene1Manager.spritePositionX = Scene.sprite[Scene1Manager.spriteNum].x;
      Scene1Manager.volume = 1 + (Scene.sprite[Scene1Manager.spriteNum].x - 474) / 100;
    });
  }

  public static rotate() {
    let bgmPositionY = [100, 175, 250];
    let lastNum = this.bgmNum[this.bgmNum.length - 1];
    let firstNum = this.bgmNum[0];
    this.bgmMiddleNum = this.bgmNum[1];

    for (let i = 0; i < this.bgmNum.length; i++) {
      Scene.container.addChild(Text.transitionText[this.bgmNum[i] + 3]);
      Text.transitionText[this.bgmNum[i] + 3].y = bgmPositionY[i];
    }

    Text.transitionText[1].on('pointerdown', () => {
      if (lastNum >= Text.transitionText.length - 4) {
        lastNum = 0;
      } else {
        lastNum++;
      }
      this.bgmNum.push(lastNum);
      this.bgmNum.shift();
      Scene.container.addChild(Text.transitionText[lastNum + 3]);
      Scene.container.removeChild(Text.transitionText[firstNum + 3]);
      for (let i = 0; i < this.bgmNum.length; i++) {
        Text.transitionText[this.bgmNum[i] + 3].y = bgmPositionY[i];
      }
      this.bgmMiddleNum = this.bgmNum[1];
      firstNum = this.bgmNum[0];
    });
    Text.transitionText[2].on('pointerdown', () => {
      if (firstNum <= 0) {
        firstNum = Text.transitionText.length - 4;
      } else {
        firstNum--;
      }
      this.bgmNum.unshift(firstNum);
      this.bgmNum.pop();
      Scene.container.addChild(Text.transitionText[firstNum + 3]);
      Scene.container.removeChild(Text.transitionText[lastNum + 3]);
      for (let i = 0; i < this.bgmNum.length; i++) {
        Text.transitionText[this.bgmNum[i] + 3].y = bgmPositionY[i];
      }
      this.bgmMiddleNum = this.bgmNum[1];
      lastNum = this.bgmNum[this.bgmNum.length - 1];
    });
  }
}