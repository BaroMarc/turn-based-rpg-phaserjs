import Prefab from '../Prefab';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.anchor.setTo(0.5);
        
        this.walkingSpeed = +properties.walking_speed;
        
        this.animations.add("walking_down", [6, 7, 8], 10, true);
        this.animations.add("walking_left", [9, 10, 11], 10, true);
        this.animations.add("walking_right", [3, 4, 5], 10, true);
        this.animations.add("walking_up", [0, 1, 2], 10, true);
        
        this.stoppedFrames = [7, 10, 4, 1, 7];

        this.gameState.game.physics.arcade.enable(this);
        this.body.setSize(16, 16, 0, 8);
        this.body.collideWorldBounds = true;

        this.cursors = this.gameState.game.input.keyboard.createCursorKeys();
    }

    update() {

        this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision_back);
        this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision_front);
        
        if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
            // move left
            this.body.velocity.x = -this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.animations.play("walking_left");
            }
        } else if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
            // move right
            this.body.velocity.x = +this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.animations.play("walking_right");
            }
        } else {
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown && this.body.velocity.y <= 0) {
            // move up
            this.body.velocity.y = -this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.animations.play("walking_up");
            }
        } else if (this.cursors.down.isDown && this.body.velocity.y >= 0) {
            // move down
            this.body.velocity.y = +this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.animations.play("walking_down");
            }
        } else {
            this.body.velocity.y = 0;
        }
        
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            // stop current animation
            this.animations.stop();
            this.frame = this.stoppedFrames[this.body.facing];
        }
    };
};