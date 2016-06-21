import Phaser from 'phaser';

import Prefab from '../Prefab';
import TextPrefab from '../TextPrefab';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
        
        // create message text
        this.messageText = new TextPrefab(this.gameState, this.name + "_message", position, {group: "hud", text: properties.message, style: Object.create(this.gameState.TEXT_STYLE)});
        this.messageText.anchor.setTo(0.5);
        
        // start timer to destroy the message
        this.killTimer = this.gameState.game.time.create();
        this.killTimer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
        this.killTimer.start();
    }

    kill() {

        super.kill();
        // when the message is destroyed, call next turn
        this.messageText.kill();
        this.gameState.nextTurn();
    }
}