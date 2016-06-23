import Prefab from '../Prefab';

import ActionMessage from '../hud/ActionMessage';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
        
        this.stats = properties.stats;
        
        this.attackedAnimation = this.gameState.game.add.tween(this);
        this.attackedAnimation.to({tint: 0xFF0000}, 200);
        this.attackedAnimation.onComplete.add(this.restoreTint, this);

        this.actTurn = 0;
    }

    receiveDamage(damage) {

        this.stats.health -= damage;
        this.attackedAnimation.start();
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.kill();
        }
    }

    restoreTint() {

        this.tint = 0xFFFFFF;
    }

    calculateActTurn(currentTurn) {
        
        // calculate the act turn based on the unit speed
        this.actTurn = currentTurn + Math.ceil(100 / this.stats.speed);
    }
}
