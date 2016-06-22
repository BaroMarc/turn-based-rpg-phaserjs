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
import PriorityQueue from 'js-priority-queue';

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

    init(levelData, extraParameters) {

        this.levelData = levelData;
        this.enemyData = extraParameters.enemyData;
        this.partyData = extraParameters.partyData;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
     
    create() {
        const self = this;
    
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
        
        // create enemy units
        for (let enemyUnitName in this.enemyData) {
            if (this.enemyData.hasOwnProperty(enemyUnitName)) {
                // create enemy units
                this.createPrefab(enemyUnitName, this.enemyData[enemyUnitName]);
            }
        }
        
        // create player units
        for (let playerUnitName in this.partyData) {
            if (this.partyData.hasOwnProperty(playerUnitName)) {
                // create player units
                this.createPrefab(playerUnitName, this.partyData[playerUnitName]);
            }
        }
        
        this.initHud();
        
        // store units in a priority queue which compares the units act turn
        this.units = new PriorityQueue({comparator: function (firstUnit, secondUnit) {
            return firstUnit.actTurn - secondUnit.actTurn;
        }});
        this.groups.player_units.forEach(function (unit) {
            unit.calculateActTurn(0);
            this.units.queue(unit);
        }, this);
        this.groups.enemy_units.forEach(function (unit) {
            unit.calculateActTurn(0);
            this.units.queue(unit);
        }, this);
        
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

        // if all enemy units are dead, go back to the world state
        if (this.groups.enemy_units.countLiving() === 0) {
            this.endBattle();
        }
        
        // if all player units are dead, restart the game
        if (this.groups.player_units.countLiving() === 0) {
            this.gameOver();
        }

        // takes the next unit
        this.currentUnit = this.units.dequeue();
        // if the unit is alive, it acts, otherwise goes to the next turn
        if (this.currentUnit.alive) {
            this.currentUnit.act();
            this.currentUnit.calculateActTurn(this.currentUnit.actTurn);
            this.units.queue(this.currentUnit);
        } else {
            this.nextTurn();
        }
    }

    gameOver() {

        // go back to WorldState restarting the player position
        this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {restart_position: true});
    };

    endBattle() {

        // save current party health
        this.groups.player_units.forEach(function (unit) {
            this.partyData[unit.name].properties.stats = unit.stats;
        }, this);
        // go back to WorldState with the current party data
        this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {partyData: this.partyData});
    };
}