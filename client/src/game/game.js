/*
    Set up our Phaser Instance
    Import the game scene -> gamescene.js
    Launch game into Vue Component container
*/

import Phaser from "phaser"
import GameScene from './scenes/gamescene';

function launchGame(container) {
    return new Phaser.Game({
        // Auto Config is fine
        type: Phaser.AUTO,
        // Container from game
        parent: container,
        scene: [GameScene],
        scale: {
            mode: Phaser.Scale.FIT,
            width: '100%',
            height: '100%'
        }
    });
}

export default launchGame;
export {launchGame}