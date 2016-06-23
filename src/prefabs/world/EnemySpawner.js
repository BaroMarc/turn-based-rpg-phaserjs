import Prefab from '../Prefab';

export default class extends Prefab {
    constructor(gameState, name, position, properties) {
    
        super(gameState, name, position, properties);
        
        this.gameState.game.physics.arcade.enable(this);
        this.body.immovable = true;
        
        this.overlapping = true;
    }

    update() {

        this.overlapping = this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.players, this.checkForSpawn, null, this);
    }

    checkForSpawn() {

        // check for spawn only once for overlap
        if (!this.overlapping) {
            const spawnChance = this.gameState.game.rnd.frac();
            // check if the enemy spawn probability is less than the generated random number for each spawn
            for (let encounterIndex = 0; encounterIndex < this.gameState.levelData.enemy_encounters.length; encounterIndex += 1) {
                const enemyEncounter = this.gameState.levelData.enemy_encounters[encounterIndex];
                if (spawnChance <= enemyEncounter.probability) {
                    // save current player position for later
                    this.gameState.playerPosition = this.gameState.prefabs.player.position;
                    // call battle state
                    this.gameState.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {encounter: enemyEncounter, partyData: this.gameState.partyData});
                    break;
                }
            }
        }
    }
};