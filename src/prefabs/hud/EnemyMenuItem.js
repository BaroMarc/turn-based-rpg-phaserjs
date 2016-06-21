import MenuItem from './MenuItem';

export default class extends MenuItem {

    select() {

        // get enemy prefab
        const enemy = this.gameState.prefabs[this.text];
        // attack selected enemy
        this.gameState.currentUnit.attack(enemy);
        // disable menus
        this.gameState.prefabs.enemy_units_menu.disable();
        this.gameState.prefabs.player_units_menu.disable();
    }
}