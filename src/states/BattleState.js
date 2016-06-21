import 'phaser';

import TilePrefab from '../prefabs/TilePrefab';
import Prefab from '../prefabs/Prefab';
import PlayerUnit from '../prefabs/units/PlayerUnit';
import EnemyUnit from '../prefabs/units/EnemyUnit';
import PlayerMenuItem from '../prefabs/hud/PlayerMenuItem';
import EnemyMenuItem from '../prefabs/hud/EnemyMenuItem';
import Menu from '../prefabs/hud/Menu';
import AttackMenuItem from '../prefabs/hud/AttackMenuItem';

export default class extends Phaser.State {

    constructor() {

        super();
        this.prefabClasses = {
            background: TilePrefab,
            rectangle: Prefab,
            player_unit: PlayerUnit,
            enemy_unit: EnemyUnit
        };
        
        this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
    }

    init(levelData) {

        this.levelData = levelData;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
     
    create() {

        // create groups
        this.groups = {};
        this.levelData.groups.forEach(function (groupName) {
            this.groups[groupName] = this.game.add.group();
        }, this);
        
        // create prefabs
        this.prefabs = {};
        for (let prefabName in this.levelData.prefabs) {
            if (this.levelData.prefabs.hasOwnProperty(prefabName)) {
                // create prefab
                this.createPrefab(prefabName, this.levelData.prefabs[prefabName]);
            }
        }
    
        this.initHud();
        
        // create units array with player and enemy units
        this.units = [];
        this.units = this.units.concat(this.groups.player_units.children);
        this.units = this.units.concat(this.groups.enemy_units.children);
        
        this.nextTurn();
    }
     
    createPrefab(prefabName, prefabData) {

        var prefab;
        // create object according to its type
        if (this.prefabClasses.hasOwnProperty(prefabData.type)) {
            prefab = new this.prefabClasses[prefabData.type](this, prefabName, prefabData.position, prefabData.properties);
        }
    }

    initHud() {

        // show player actions
        this.showPlayerActions({x: 106, y: 210});
        
        // show player units
        this.showUnits("player_units", {x: 202, y: 210}, PlayerMenuItem);
        
        // show enemy units
        this.showUnits("enemy_units", {x: 10, y: 210}, EnemyMenuItem);
    }

    showUnits(groupName, position, menuItemClass) {

        // create units menu items, TODO: refactor with array.map
        let unitIndex = 0;
        const menuItems = [];
        this.groups[groupName].forEach(function (unit) {
            const unitMenuItem = new menuItemClass(this, unit.name + "_menu_item", {x: position.x, y: position.y + unitIndex * 20}, {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)});
            unitIndex += 1;
            menuItems.push(unitMenuItem);
        }, this);
        // create units menu
        var unitsMenu = new Menu(this, groupName + "_menu", position, {group: "hud", menuItems});
    }

    showPlayerActions(position) {

        // available actions
        const actions = [{text: "Attack", class: AttackMenuItem}];
        const menuItems = [];
        let actionIndex = 0;
        // create a menu item for each action
        actions.forEach(function (action) {
            menuItems.push(new action.class(this, action.text + "_menu_item", {x: position.x, y: position.y + actionIndex * 20}, {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}));
            actionIndex += 1;
        }, this);
        var actionsMenu = new Menu(this, "actions_menu", position, {group: "hud", menuItems});
    }

    nextTurn() {

        // takes the next unit
        this.currentUnit = this.units.shift();
        // if the unit is alive, it acts, otherwise goes to the next turn
        if (this.currentUnit.alive) {
            this.currentUnit.act();
            this.units.push(this.currentUnit);
        } else {
            this.nextTurn();
        }
    }
}