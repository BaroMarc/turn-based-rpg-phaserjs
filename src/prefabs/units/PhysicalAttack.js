import Phaser from 'phaser';

import Attack from './Attack';

export default class extends Attack {

    hit(target) {

        // the attack multiplier for magic attacks is higher
        const attackMultiplier = this.gameState.game.rnd.realInRange(0.8, 1.2);
        const defenseMultiplier = this.gameState.game.rnd.realInRange(0.8, 1.2);
        // calculate damage using the magic attack stat
        const damage = Math.max(0, Math.round((attackMultiplier * this.owner.stats.attack) - (defenseMultiplier * target.stats.defense)));
        // apply damage
        target.receiveDamage(damage);
        
        this.showMessage(target, damage);
    }
}