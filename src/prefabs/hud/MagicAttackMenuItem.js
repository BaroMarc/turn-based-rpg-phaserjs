import MenuItem from './MenuItem';
import MagicAttack from '../units/MagicAttack'

export default class extends MenuItem {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.MANA_COST = 10;
    }
    select() {

        // use only if the current unit has enough mana
        if (this.gameState.currentUnit.stats.mana >= this.MANA_COST) {
            // disable actions menu
            this.gameState.prefabs.actions_menu.disable();
            // enable enemy units menu so the player can choose the target
            this.gameState.prefabs.enemy_units_menu.enable();
            // save current attack
            this.gameState.currentAttack = new MagicAttack(this.gameState, this.gameState.currentUnit.name + "_attack", {x: 0, y: 0}, {group: "attacks", manaCost: this.MANA_COST, ownerName: this.gameState.currentUnit.name});
        }
    }
};