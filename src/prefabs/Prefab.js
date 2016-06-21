import Phaser from 'phaser';

export default class extends Phaser.Sprite {

    constructor(gameState, name, position, properties) {

        super(gameState.game, position.x, position.y, properties.texture);
        
        this.gameState = gameState;
        
        this.name = name;
        
        this.gameState.groups[properties.group].add(this);
        this.frame = +properties.frame;
        
        if (properties.scale) {
            this.scale.setTo(properties.scale.x, properties.scale.y);
        }
        
        this.gameState.prefabs[name] = this;
    }
}