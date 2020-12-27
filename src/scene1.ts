import * as PIXI from 'pixi.js';
import Scene from './scene';
import Manager from './manager';
import Text from './text';
import Load from './load';
import Graphic from './graphic';
import Scene1Manager from './scene1Manager';

export default class Scene1 {
  constructor() {
    Scene.appendScene([
        PIXI.Texture.from('./assets/background1.jpg'),
        PIXI.Texture.from('./assets/maru.png')
      ]
    );
    Scene.sprite[0].scale.x = Manager.game.screen.width / 511;
    Scene.sprite[0].scale.y = Manager.game.screen.height / 340;
    Scene.sprite[1].scale.x = 0.2; Scene.sprite[1].scale.y = 0.2;
    Scene.sprite[1].anchor.x = 0.5; Scene.sprite[1].anchor.y = 0.5;
    Scene.sprite[1].x = Scene1Manager.spritePositionX; Scene.sprite[1].y = 510;

    Text.appendText('---GAME PLAY---', 0, 50, 375, 400, true);
    Text.appendText('⇑', 1, 75, 550, 30, true);
    Text.appendText('⇓', 2, 75, 550, 300, true);
    Graphic.appendGraphic(0, 0xffffff, 374, 500, 400, 10);

    Scene1Manager.spriteEnableMove(1);
    Graphic.appendCloneGraphic(0, 0, 374, 500);

    Text.appendText('Dream', 3, 50, 500, 0, false);
    Text.appendText('Knight Of Firmament', 4, 50, 337, 0, false);
    Text.appendText('Leviathan', 5, 50, 468, 0, false);
    Text.appendText('Myosotis', 6, 50, 475, 0, false);
    Text.appendText('RTRT', 7, 50, 508, 0, false);

    Scene1Manager.rotate();

    Text.transitionText[0].on('pointerdown', () => {
      if(Scene.destroyScene()) { setTimeout(() => { new Load(Scene1Manager.bgmMiddleNum); }, 600); }
    });
  }
}