import * as PIXI from 'pixi.js';
import Scene1 from './scene1';

export default class Manager {
  public static game: PIXI.Application;
  public static ticker: PIXI.Ticker;

  public static start(options: {
    width: number,
    height: number,
    canvas: any
  }): void {
    this.game = new PIXI.Application({
      width: options.width,
      height: options.height,
      backgroundColor: 0x000000
    });
    options.canvas.appendChild(this.game.view);
    new Scene1();
  }
}