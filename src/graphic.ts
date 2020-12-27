import * as PIXI from 'pixi.js';
import Scene from './scene';
import Scene1Manager from './scene1Manager';

export default class Graphic {
  public static graphic: PIXI.Graphics[] = [];
  public static cloneGraphic: PIXI.Graphics[] = [];

  public static appendGraphic(num: number, color: number, x: number, y: number, width: number, height: number) {
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
    } else {
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
    Scene.container.addChild(this.graphic[num]);
    this.graphic[num].x = x;
    this.graphic[num].y = y;
  }

  public static appendCloneGraphic(num: number, cloneNum: number, x: number, y: number) {
    this.cloneGraphic[num] = this.graphic[cloneNum].clone();
    Scene.container.addChild(this.cloneGraphic[num]);
    this.cloneGraphic[num].tint = 0x0000ff;
    this.cloneGraphic[num].x = x;
    this.cloneGraphic[num].y = y;
    this.cloneGraphic[num].width = Scene.sprite[Scene1Manager.spriteNum].x - Graphic.cloneGraphic[0].x;
  }
}