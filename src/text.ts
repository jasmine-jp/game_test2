import * as PIXI from 'pixi.js';
import Scene from './scene';

export default class Text {
  public static transitionText: PIXI.Text[] = [];

  public static appendText(str: string, num: number, font: number, x: number, y: number, bool: boolean) {
    this.transitionText[num] = new PIXI.Text(str, {
      fontSize: font,
      fill: 0xffffff,
      stroke: 0x000000,
      strokeThickness: 3
    });
    if (bool) {
      Scene.container.addChild(this.transitionText[num]);
    }
    this.transitionText[num].x = x;
    this.transitionText[num].y = y;
    this.transitionText[num].interactive = true;
    this.transitionText[num].buttonMode = true;
    this.transitionText[num].on('mouseover', () => { this.transitionText[num].tint = 0xffff00; })
      .on('mouseout', () => { this.transitionText[num].tint = 0xffffff; });
  }
}