import 'phaser';

import TilePrefab from '../prefabs/TilePrefab';
import Prefab from '../prefabs/Prefab';
import PlayerUnit from '../prefabs/units/PlayerUnit';
import EnemyUnit from '../prefabs/units/EnemyUnit';
import PlayerMenuItem from '../prefabs/hud/PlayerMenuItem';
import EnemyMenuItem from '../prefabs/hud/EnemyMenuItem';
import Menu from '../prefabs/hud/Menu';
import AttackMenuItem from '../prefabs/hud/AttackMenuItem';

import forIn from 'lodash/forIn';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import assign from 'lodash/assign';
import concat from 'lodash/concat';

export default class extends Phaser.State {

    constructor() {

        super();
        this.prefabClasses = {
            background: TilePrefab,
            rectangle: Prefab,
            player_unit: PlayerUnit,
            enemy_unit: EnemyUnit
        };
        
        this.TEXT_STYLE = {font: '14px Arial', fill: '#FFFFFF'};
    }

    init(levelData) {

        this.levelData = levelData;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
     
    create() {
        const self = this;

        this.prefabs = [];
        // create groups
        this.groups = reduce(this.levelData.groups, (groups, groupName) => assign(groups, { [groupName]: self.game.add.group() }), {});
        
        // create prefabs
        forIn(this.levelData.prefabs, (prefab, prefabName) => {
            self.createPrefab(prefabName, prefab);
        });
    
        this.initHud();
        
        // create units array with player and enemy units
        this.units = concat(this.groups.player_units.children, this.groups.enemy_units.children);
        
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
        this.showUnits('player_units', {x: 202, y: 210}, PlayerMenuItem);
        
        // show enemy units
        this.showUnits('enemy_units', {x: 10, y: 210}, EnemyMenuItem);
    }

    showUnits(groupName, position, menuItemClass) {

        // create units menu items
        const self = this;

        const menuItems = map(this.groups[groupName].children, (unit, unitIndex) => {
            return new menuItemClass(self,
                `${unit.name}_menu_item`,
                {
                    x: position.x,
                    y: position.y + unitIndex * 20
                }, {
                    group: 'hud',
                    text: unit.name,
                    style: Object.create(self.TEXT_STYLE)
                }); 
        });

        // create units menu
        new Menu(this, `${groupName}_menu`, position, {group: 'hud', menuItems});
    }

    showPlayerActions(position) {

        const self = this;

        // available actions
        const actions = [{text: 'Attack', class: AttackMenuItem}];

        // create a menu item for each action
        const menuItems = map(actions, (action, actionIndex) => {
            return new action.class(self,
                `${action.text}_menu_item`,
                {
                    x: position.x,
                    y: position.y + actionIndex * 20
                }, {
                    group: 'hud',
                    text: action.text,
                    style: Object.create(self.TEXT_STYLE)
                });
        });
        
        new Menu(this, 'actions_menu', position, {group: 'hud', menuItems});
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