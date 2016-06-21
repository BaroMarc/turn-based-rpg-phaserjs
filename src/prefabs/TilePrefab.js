import Phaser from 'phaser';

export default class extends Phaser.TileSprite {
	constructor (gameState, name, position, properties) {

	   	super(gameState.game, position.x, position.y, properties.width, properties.height, properties.texture);
	    
	    this.gameState = gameState;
	    
	    this.name = name;
	    
	    this.gameState.groups[properties.group].add(this);
	    this.frame = +properties.frame;
	    
	    this.gameState.prefabs[name] = this;
	};
}