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
    }

    kill() {

        super.kill();
        // remove from the menu
        const menuItemIndex = this.gameState.prefabs.player_units_menu.findItemIndex(this.name);
        this.gameState.prefabs.player_units_menu.menu_items[menuItemIndex].alpha = 0.5;
    }

    receiveExperience(xp) {

        // increase experience
        this.stats.experience += xp;
        const nextLevelData = this.gameState.experienceTable[this.stats.current_level];
        // if current experience is greater than the necessary to the next level, the unit gains a level
        if (this.stats.experience >= nextLevelData.required_exp) {
            this.stats.current_level += 1;
            this.stats.experience = 0;
            // increase unit stats according to new level
            for (const stat in nextLevelData.stats_increase) {
                if (nextLevelData.stats_increase.hasOwnProperty(stat)) {
                    this.stats[stat] += nextLevelData.stats_increase[stat];
                }
            }
        }
    }
}