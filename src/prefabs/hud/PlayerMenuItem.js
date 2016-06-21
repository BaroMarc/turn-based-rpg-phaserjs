import MenuItem from './MenuItem';
import ShowStat from './ShowStat';

export default class extends MenuItem {

	constructor(gameState, name, position, properties) {

	   	super(gameState, name, position, properties);
	    
	    this.playerUnitHealth = new ShowStat(this.gameState, this.text + "_health", {x: 280, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"});
	}

	select() {

	}
}