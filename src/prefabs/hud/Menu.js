import Phaser from 'phaser';

import Prefab from '../Prefab';

export default class extends Prefab {

    constructor(gameState, name, position, properties) {

        super(gameState, name, position, properties);
        
        this.visible = false;
        
        this.menuItems = properties.menuItems;
        
        this.currentItemIndex = 0;
    }

    processInput(event) {

        switch (event.keyCode) {
            case Phaser.Keyboard.UP:
                if (this.currentItemIndex > 0) {
                    // navigate to previous item
                    this.moveSelection(this.currentItemIndex - 1);
                }
                break;
            case Phaser.Keyboard.DOWN:
                if (this.currentItemIndex < this.menuItems.length - 1) {
                    // navigate to next item
                    this.moveSelection(this.currentItemIndex + 1);
                }
                break;
            case Phaser.Keyboard.SPACEBAR:
                this.menuItems[this.currentItemIndex].select();
                break;
        }
    }

    moveSelection(itemIndex) {

        this.menuItems[this.currentItemIndex].selectionOut();
        this.currentItemIndex = itemIndex;
        this.menuItems[this.currentItemIndex].selectionOver();
    }

    findItemIndex(text) {

        for (let itemIndex = 0; itemIndex < this.menuItems.length; itemIndex += 1) {
            if (this.menuItems[itemIndex].text === text) {
                return itemIndex;
            }
        }
    }

    removeItem(index) {

        const menuItem = this.menuItems[index];
        // remove menu item
        this.menuItems.splice(index, 1);
        // update currentItemIndex if necessary
        if (this.currentItemIndex === index) {
            this.currentItemIndex = 0;
        }
        return menuItem;
    }

    enable() {

        this.currentItemIndex = 0;
        if (this.menuItems.length > 0) {
            this.menuItems[this.currentItemIndex].selectionOver();
        }
        this.gameState.game.input.keyboard.addCallbacks(this, this.processInput);
    }

    disable() {

        if (this.menuItems.length > 0) {
            this.menuItems[this.currentItemIndex].selectionOut();
        }
        this.currentItemIndex = 0;
    }
}