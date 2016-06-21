import TextPrefab from '../TextPrefab';

export default class extends TextPrefab {

	constructor(gameState, name, position, properties) {

	    super(gameState, name, position, properties);
	    
	    this.prefab = this.gameState.prefabs[properties.prefab];
	    this.stat = properties.stat;
	}

	update() {

	    this.text = this.prefab.stats[this.stat];
	}
}