import 'phaser';

import forIn from 'lodash/forIn';

export default class extends Phaser.State {
      
   init(levelData, nextState, extraParameters) {

        this.levelData = levelData;
        this.nextState = nextState;
        this.extraParameters = extraParameters;
    }
     
    preload() {

        const self = this;

        forIn(this.levelData.assets, (asset, assetKey) => {
            switch (asset.type) {
                case "image":
                    self.load.image(assetKey, asset.source);
                    break;
                case "spritesheet":
                    self.load.spritesheet(assetKey, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                    break;
                case "tilemap":
                    self.load.tilemap(assetKey, asset.source, null, Phaser.Tilemap.TILED_JSON);
                    break;
            }
        });
    }
     
    create() {

        this.game.state.start(this.nextState, true, false, this.levelData, this.extraParameters);
    }
}