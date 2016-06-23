import MenuItem from './MenuItem';
import ShowStat from './ShowStat';

export default class extends MenuItem {

	constructor(gameState, name, position, properties) {

	   	super(gameState, name, position, properties);
	    
	    this.playerUnitHealth = new ShowStat(
	    	this.gameState,
	    	`${this.text}_health`,
	    	{x: 250, y: this.y},
	    	{
	    		group: 'hud',
	    		text: '',
	    		style: properties.style,
	    		prefab: this.text,
	    		stat: 'health'
	    	});

	    this.playerUnitMana = new ShowStat(
	    	this.gameState,
	    	`${this.text}_mana`,
	    	{x: 280, y: this.y},
	    	{
	    		group: 'hud',
	    		text: '',
	    		style: properties.style,
	    		prefab: this.text,
	    		stat: 'mana'}
	    		);
	}

	select() {

	    // get selected player unit
	    const playerUnit = this.gameState.prefabs[this.text];
	    // use current selected item on selected unit
	    this.gameState.prefabs.inventory.useItem(this.gameState.currentItem, playerUnit);
	    
	    // show actions menu again
	    this.gameState.prefabs.items_menu.disable();
	    this.gameState.prefabs.items_menu.hide();
	    this.gameState.prefabs.actions_menu.show();
	    this.gameState.prefabs.actions_menu.enable();

	}
}