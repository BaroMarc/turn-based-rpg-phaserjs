import 'phaser';

import Player from '../prefabs/world/Player';
import EnemySpawner from '../prefabs/world/EnemySpawner';

export default class extends Phaser.State {

    constructor() {
        super();
        this.prefabClasses = {
            "player": Player,
            "enemy_spawner": EnemySpawner
        };
    }

    init(levelData, extraParameters) {

        const self = this;

        this.levelData = this.levelData || levelData;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        
        // create map and set tileset
        this.map = this.game.add.tilemap(this.levelData.map.key);
        let tilesetIndex = 0;
        this.map.tilesets.forEach((tileset) => {
            self.map.addTilesetImage(tileset.name, self.levelData.map.tilesets[tilesetIndex]);
            tilesetIndex += 1;
        });
        
        // if no party data is in the parameters, initialize it with default values
        this.partyData = extraParameters.partyData || {
            "fighter": {
                "type": "player_unit",
                "position": {"x": 250, "y": 50},
                "properties": {
                    "texture": "male_fighter_spritesheet",
                    "group": "player_units",
                    "frame": 10,
                    "stats": {
                        "attack": 15,
                        "defense": 5,
                        "health": 100,
                        "speed": 15
                    }
                }
            },
            "mage": {
                "type": "player_unit",
                "position": {"x": 250, "y": 100},
                "properties": {
                    "texture": "female_mage_spritesheet",
                    "group": "player_units",
                    "frame": 10,
                    "stats": {
                        "attack": 20,
                        "defense": 2,
                        "health": 100,
                        "speed": 10
                    }
                }
            },
            "ranger": {
                "type": "player_unit",
                "position": {"x": 250, "y": 150},
                "properties": {
                    "texture": "female_ranger_spritesheet",
                    "group": "player_units",
                    "frame": 10,
                    "stats": {
                        "attack": 10,
                        "defense": 3,
                        "health": 100,
                        "speed": 20
                    }
                }
            }
        };
        
        if (extraParameters.restart_position) {
            this.playerPosition = undefined;
        }
    }

    create() {
        
        // create map layers
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);
            if (layer.properties.collision) { // collision layer
                const collisionTiles = [];
                layer.data.forEach(function (data_row) { // find tiles used in the layer
                    data_row.forEach(function (tile) {
                        // check if it's a valid tile index and isn't already in the list
                        if (tile.index > 0 && collisionTiles.indexOf(tile.index) === -1) {
                            collisionTiles.push(tile.index);
                        }
                    }, this);
                }, this);
                this.map.setCollision(collisionTiles, true, layer.name);
            }
        }, this);
        // resize the world to be the size of the current layer
        this.layers[this.map.layer.name].resizeWorld();
        
        // create groups
        this.groups = {};
        this.levelData.groups.forEach(function (groupName) {
            this.groups[groupName] = this.game.add.group();
        }, this);
        
        this.prefabs = {};
        
        for (let objectLayer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(objectLayer)) {
                // create layer objects
                this.map.objects[objectLayer].forEach(this.createObject, this);
            }
        }
        
        // if we came from BattleState, move the player to the previous position
        if (this.playerPosition) {
            this.prefabs.player.reset(this.playerPosition.x, this.playerPosition.y);
        }
    }

    createObject(object) {

        let prefab;
        // tiled coordinates starts in the bottom left corner
        const objectY = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
        const position = {"x": object.x + (this.map.tileHeight / 2), "y": objectY};
        // create object according to its type
        if (this.prefabClasses.hasOwnProperty(object.type)) {
            prefab = new this.prefabClasses[object.type](this, object.name, position, object.properties);
        }
        this.prefabs[object.name] = prefab;
    }
};
