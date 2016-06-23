import Phaser from 'phaser';

import Prefab from '../Prefab';
import ActionMessage from '../hud/ActionMessage';

export default class extends Prefab {

	constructor(gameState, name, position, properties) {

	    super(gameState, name, position, properties);
	    
	    this.owner = this.gameState.prefabs[properties.ownerName];
	}

	showMessage(target, damage) {

	    // show attack message
	    const actionMessagePosition = new Phaser.Point(this.gameState.game.world.width / 2, this.gameState.game.world.height * 0.1);
	    
	    new ActionMessage(this.gameState,
	    	`${this.name}_action_message`,
	    	actionMessagePosition, 
	    	{
	    		group: 'hud',
	    		texture: 'rectangle_image',
	    		scale: {x: 0.85, y: 0.2},
	    		duration: 1,
	    		message: `${this.owner.name} attacks ${target.name} for ${damage} damage`
	    	});
	}
};