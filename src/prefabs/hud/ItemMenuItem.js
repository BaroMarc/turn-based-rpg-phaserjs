import MenuItem from './MenuItem';

export default class extends MenuItem {
	select() {

	    // disable actions menu
	    this.gameState.prefabs.items_menu.disable();
	    // enable player units menu so the player can choose the target
	    this.gameState.prefabs.player_units_menu.enable();
	    // save selected item
	    this.gameState.currentItem = this.text;
	}
};