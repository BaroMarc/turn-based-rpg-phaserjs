import Prefab from '../Prefab';

export default class extends Prefab {
    use() {

        // by default the item is destroyed
        this.kill();
    }

    kill() {

        super.kill();

        // remove item from the menu
        const menuItemIndex = this.gameState.prefabs.items_menu.findItemIndex(this.name);
        const menuItem = this.gameState.prefabs.items_menu.removeItem(menuItemIndex);
        menuItem.kill();
    }
};