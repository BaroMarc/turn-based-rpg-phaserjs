import MenuItem from './MenuItem';

export default class extends MenuItem {

	select() {

	    // disable actions menu
	    this.gameState.prefabs.actions_menu.disable();
	    // enable enemy units menu so the player can choose the target
	    this.gameState.prefabs.enemy_units_menu.enable();
	}
}