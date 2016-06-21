import Phaser from 'phaser';

export default class extends Phaser.Text{

	constructor (gameState, name, position, properties) {

	    super(gameState.game, position.x, position.y, properties.text, properties.style);
	    
	    this.gameState = gameState;
	    
	    this.name = name;
	    
	    this.gameState.groups[properties.group].add(this);
	    
	    this.gameState.prefabs[name] = this;
	}
}