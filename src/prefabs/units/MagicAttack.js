import Attack from './Attack';

export default class extends Attack {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.manaCost = properties.manaCost;
    }

    hit(target) {

        // the attack multiplier for magic attacks is higher
        const attackMultiplier = this.gameState.game.rnd.realInRange(0.9, 1.3);
        const defenseMultiplier = this.gameState.game.rnd.realInRange(0.8, 1.2);
        // calculate damage using the magic attack stat
        const damage = Math.max(0, Math.round((attackMultiplier * this.owner.stats.magic_attack) - (defenseMultiplier * target.stats.defense)));
        // apply damage
        target.receiveDamage(damage);
        
        // reduce the unit mana
        this.gameState.currentUnit.stats.mana -= this.manaCost;
        
        this.showMessage(target, damage);
    }
}