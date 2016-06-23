import Unit from './Unit';
import PhysicalAttack from './PhysicalAttack';

export default class extends Unit {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
        
        this.scale.setTo(-1, 1);

        this.attack = new PhysicalAttack(this.gameState,
            `${this.name}_attack`,
            {x: 0, y: 0},
            {
                group: "attacks",
                ownerName: this.name
            });
    }

    act() {

        // randomly choose target
        const targetIndex = this.gameState.rnd.between(0, this.gameState.groups.player_units.countLiving() - 1);
        const target = this.gameState.groups.player_units.children[targetIndex];
        
        this.attack.hit(target);
    }

    kill() {

        super.kill();
        // remove from the menu
        const menuItemIndex = this.gameState.prefabs.enemy_units_menu.findItemIndex(this.name);
        const menuItem = this.gameState.prefabs.enemy_units_menu.removeItem(menuItemIndex);
        menuItem.kill();
    }
}