import Unit from './Unit';

export default class extends Unit {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
    }

    act() {

        // search for the index of this unit in the player_units_menu
        const unitIndex = this.gameState.prefabs.player_units_menu.findItemIndex(this.name);
        this.gameState.prefabs.player_units_menu.moveSelection(unitIndex);
        
        // enable menu for choosing the action
        this.gameState.prefabs.actions_menu.enable();
    };

    kill() {

        super.kill();
        // remove from the menu
        const menuItemIndex = this.gameState.prefabs.player_units_menu.findItemIndex(this.name);
        this.gameState.prefabs.player_units_menu.menu_items[menuItemIndex].alpha = 0.5;
    };
}