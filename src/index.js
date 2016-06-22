import 'pixi';
import 'p2';
import Phaser from 'phaser';
import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import BattleState from './states/BattleState';
import WorldState from './states/WorldState';

const game = new Phaser.Game(320, 320, Phaser.AUTO);
game.state.add("BootState", BootState);
game.state.add("LoadingState", LoadingState);
game.state.add("BattleState", BattleState);
game.state.add("WorldState", WorldState);
game.state.start("BootState", true, false, "../assets/levels/level1.json", "WorldState", {});