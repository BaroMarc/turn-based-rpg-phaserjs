import 'phaser';

export default class extends Phaser.State {
      
   init(levelData, nextState) {

        this.levelData = levelData;
        this.nextState = nextState;
    }
     
    preload() {

        const assets = this.levelData.assets;
        for (let assetKey in assets) { // load assets according to asset key
            if (assets.hasOwnProperty(assetKey)) {
                const asset = assets[assetKey];
                switch (asset.type) {
                    case "image":
                        this.load.image(assetKey, asset.source);
                        break;
                    case "spritesheet":
                        this.load.spritesheet(assetKey, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                        break;
                    case "tilemap":
                        this.load.tilemap(assetKey, asset.source, null, Phaser.Tilemap.TILED_JSON);
                        break;
                }
            }
        }
    }
     
    create() {

        this.game.state.start(this.nextState, true, false, this.levelData);
    }
}