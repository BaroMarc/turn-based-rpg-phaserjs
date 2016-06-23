import Item from './Item';

export default class extends Item {

	constructor(gameState, name, position, properties) {

	    super(gameState, name, position, properties);
	    
	    this.healthPower = properties.health_power;
	}

	use(target) {

	    super.use();
	    target.stats.health += this.healthPower;
	};
}