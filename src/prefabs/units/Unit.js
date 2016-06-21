import Prefab from '../Prefab';

import ActionMessage from '../hud/ActionMessage';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
        
        this.stats = properties.stats;
        
        this.attacked_animation = this.gameState.game.add.tween(this);
        this.attacked_animation.to({tint: 0xFF0000}, 200);
        this.attacked_animation.onComplete.add(this.restoreTint, this);
    }

    receiveDamage(damage) {

        this.stats.health -= damage;
        this.attacked_animation.start();
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.kill();
        }
    }

    restoreTint() {

        this.tint = 0xFFFFFF;
    }

    attack(target) {

        var attackMessage;
        // attack target
        const attackMultiplier = this.gameState.game.rnd.realInRange(0.8, 1.2);
        const defenseMultiplier = this.gameState.game.rnd.realInRange(0.8, 1.2);
        const damage = Math.round((attackMultiplier * this.stats.attack) - (defenseMultiplier * target.stats.defense));
        target.receiveDamage(damage);
        
        // show attack message
        const actionMessagePosition = new Phaser.Point(this.gameState.game.world.width / 2, this.gameState.game.world.height * 0.1);
        const actionMessageText = `${this.name} attacks ${target.name} for ${damage} damage`;
        attackMessage = new ActionMessage(this.gameState, this.name + "_action_message", actionMessagePosition, {group: "hud", texture: "rectangle_image", scale: {x: 0.75, y: 0.2}, duration: 1, message: actionMessageText});
    }
}
