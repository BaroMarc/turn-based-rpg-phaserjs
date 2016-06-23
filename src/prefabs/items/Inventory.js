import Prefab from '../Prefab';

import Potion from './Potion';
import ItemMenuItem from '../hud/ItemMenuItem'
import Menu from '../hud/Menu'

import map from 'lodash/map';
import find from 'lodash/find';
import remove from 'lodash/remove';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.itemClasses = {
            potion: Potion
        };

        this.items = [];
    }

    createMenu(position) {

        const self = this;
        // create units menu items

        const menuItems = map(this.items, (item, itemIndex) =>  new ItemMenuItem(this.gameState, 
            `${item.name}_menu_item`, 
            {
                x: position.x,
                y: position.y + item_index * 20
            }, {
                group: 'hud', 
                text: item.name,
                style: Object.create(this.gameState.TEXT_STYLE)
            }));

        // create units menu
        const itemsMenu = new Menu(this.gameState, "items_menu", position, {group: "hud", menuItems});
        itemsMenu.hide();
    }

    collectItem(itemObject) {

        // create item prefab
        const item = new this.itemClasses[itemObject.type](this.gameState, itemObject.type + this.items.length, {x: 0, y: 0}, itemObject.properties);
        this.items.push(item);
    }

    useItem(itemName, target) {

        const self = this;

        const item = find(this.items, (item) => item.name === itemName);
        item.use(target);
        remove(this.items, item);
    }
};