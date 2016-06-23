import MenuItem from './MenuItem';

export default class extends MenuItem {
    select() {

        // select only if there are remaining items
        if (this.gameState.prefabs.inventory.items.length > 0) {
            // disable actions menu
            this.gameState.prefabs.actions_menu.disable();
            this.gameState.prefabs.actions_menu.hide();
            // enable enemy units menu so the player can choose the target
            this.gameState.prefabs.items_menu.show();
            this.gameState.prefabs.items_menu.enable();
        }
    }
};