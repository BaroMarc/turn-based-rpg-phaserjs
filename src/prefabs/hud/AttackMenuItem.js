import MenuItem from './MenuItem';
import PhysicalAttack from '../units/PhysicalAttack';

export default class extends MenuItem {

	select() {

	    // disable actions menu
	    this.gameState.prefabs.actions_menu.disable();
	    // enable enemy units menu so the player can choose the target
	    this.gameState.prefabs.enemy_units_menu.enable();
		// save current attack
    	this.gameState.currentAttack = new PhysicalAttack(this.gameState,
    		`${this.gameState.currentUnit.name}_attack`,
    		{x: 0, y: 0},
    		{
    			group: 'attacks',
    			ownerName: this.gameState.currentUnit.name
    		});
	}
}