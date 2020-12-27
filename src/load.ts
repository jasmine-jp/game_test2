import * as PIXI from 'pixi.js';
import PIXI_SOUND from 'pixi-sound';
import Scene from './scene';
import Scene2 from './scene2';
import Sound from './sound';
import Scene1Manager from './scene1Manager';

export default class Load {
  constructor(num: number) {
    Scene.appendScene([
      PIXI.Texture.from('./assets/load.png')
      ]
    );
    Scene.sprite[0].x = 750;
    Scene.sprite[0].y = 413;

    Sound.bgm = PIXI_SOUND.Sound.from({
      url: Sound.url[num],
      volume: Sound.bgmVolume[num],
      preload: true,
      loaded: () => {
        Sound.decideNote(Sound.bgm);
        Sound.effect.volume = Sound.effectVolume * Scene1Manager.volume;
        Sound.bgm.volume = Sound.bgmVolume[num] * Scene1Manager.volume;
        if(Scene.destroyScene()) { setTimeout(() => { new Scene2(); }, 600); }
      }
    });
  };
}