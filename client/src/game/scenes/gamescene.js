/* 
    Actual Game Functionality
*/

import Phaser from "phaser"
import io from "socket.io-client"

// Build Class for Game Scene
// Basic Phaser Building Block
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        // Originally had models loaded here but it took FOREVER!
        // I think going with Yandeu's suggestion of .gifs instead of 
        // building 3D visuals in real-time. I have a good system, but
        // not strong for that. Might rent an azure instance and host
        // everything there.
    }

    // This is suuuuuuper simple. Love how easy it is to make interactive objects in Phaser vs something
    // like pyGame or SFML. Probably gonna user Phaser from now on if I'm not using Godot. They also have
    // quite the library of feature examples on their website that are easily adaptable to most game design
    // patterns. 
    create() {
        // Connect to WS Server 
        this.socket = io('http://localhost:5001');
        
        // Create token
        this.socket.on('create token', (width, height) => {
            console.log("creating token");
            let token = this.add.rectangle(300, 300, width, height, 0x00ffff).setInteractive();
            this.input.setDraggable(token);
            let okayText = "Token Created..."
            io.emit('send', okayText);
        });
        
        // Define drag behavior
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //gameObject.setTint(0xff69b4);
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // Define drop behavior
        // this.input.on('drop', (pointer, gameObject) => {
        //    gameObject.setTint(); 
        // })
    }

    // Update the view
    // Also again, surprisingly simple.
    // We don't need it right now though
    update() {

    }
}