import 'phaser';

export default class extends Phaser.State {

    init(levelFile, nextState) {
        this.levelFile = levelFile;
        this.nextState = nextState;
    }
 
    preload() {
        this.load.text("level1", this.levelFile);
    }
 
    create() {
        const levelText = this.game.cache.getText("level1");
        const levelData = JSON.parse(levelText);
        this.game.state.start("LoadingState", true, false, levelData, this.nextState);
    }  
}
