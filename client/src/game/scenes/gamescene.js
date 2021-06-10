/* 
    Actual Game Functionality
*/
import Phaser from "phaser";
import io from "socket.io-client";
import Zone from '../../helpers/zone';
import Dealer from '../../helpers/dealer';
import Card from "../../helpers/card";

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

        this.load.image('cyanCardBack', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/CyanCardBack.png');
        this.load.image('magentaCardBack', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/MagentaCardBack.png');
        this.load.image('card_joker_black', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/cardJokerBlack.png');
        this.load.image('card_joker_red', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_joker_red.png');

        this.load.image('card_clubs_02', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_02.png');
        this.load.image('card_clubs_03', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_03.png');
        this.load.image('card_clubs_04', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_04.png');
        this.load.image('card_clubs_05', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_05.png');
        this.load.image('card_clubs_06', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_06.png');
        this.load.image('card_clubs_07', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_07.png');
        this.load.image('card_clubs_08', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_08.png');
        this.load.image('card_clubs_09', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_09.png');
        this.load.image('card_clubs_10', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_10.png');
        this.load.image('card_clubs_A', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_A.png');
        this.load.image('card_clubs_J', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_J.png');
        this.load.image('card_clubs_K', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_K.png');
        this.load.image('card_clubs_Q', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_clubs_Q.png');

        this.load.image('card_hearts_02', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_02.png');
        this.load.image('card_hearts_03', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_03.png');
        this.load.image('card_hearts_04', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_04.png');
        this.load.image('card_hearts_05', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_05.png');
        this.load.image('card_hearts_06', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_06.png');
        this.load.image('card_hearts_07', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_07.png');
        this.load.image('card_hearts_08', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_08.png');
        this.load.image('card_hearts_09', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_09.png');
        this.load.image('card_hearts_10', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_10.png');
        this.load.image('card_hearts_A', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_A.png');
        this.load.image('card_hearts_J', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_J.png');
        this.load.image('card_hearts_K', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_K.png');
        this.load.image('card_hearts_Q', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_hearts_Q.png');

        this.load.image('card_diamonds_02', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_02.png');
        this.load.image('card_diamonds_03', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_03.png');
        this.load.image('card_diamonds_04', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_04.png');
        this.load.image('card_diamonds_05', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_05.png');
        this.load.image('card_diamonds_06', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_06.png');
        this.load.image('card_diamonds_07', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_07.png');
        this.load.image('card_diamonds_08', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_08.png');
        this.load.image('card_diamonds_09', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_09.png');
        this.load.image('card_diamonds_10', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_10.png');
        this.load.image('card_diamonds_A', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_A.png');
        this.load.image('card_diamonds_J', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_J.png');
        this.load.image('card_diamonds_K', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_K.png');
        this.load.image('card_diamonds_Q', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_diamonds_Q.png');

        this.load.image('card_spades_02', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_02.png');
        this.load.image('card_spades_03', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_03.png');
        this.load.image('card_spades_04', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_04.png');
        this.load.image('card_spades_05', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_05.png');
        this.load.image('card_spades_06', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_06.png');
        this.load.image('card_spades_07', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_07.png');
        this.load.image('card_spades_08', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_08.png');
        this.load.image('card_spades_09', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_09.png');
        this.load.image('card_spades_10', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_10.png');
        this.load.image('card_spades_A', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_A.png');
        this.load.image('card_spades_J', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_J.png');
        this.load.image('card_spades_K', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_K.png');
        this.load.image('card_spades_Q', 'https://card-image-bucket.s3.us-east-2.amazonaws.com/assets/card_spades_Q.png');

    }

    // This is suuuuuuper simple. Love how easy it is to make interactive objects in Phaser vs something
    // like pyGame or SFML. Probably gonna user Phaser from now on if I'm not using Godot. They also have
    // quite the library of feature examples on their website that are easily adaptable to most game design
    // patterns. 

    create() {
        // Game variables
        this.isPlayerA = false;
        this.opponentCards = []
        this.dealer = new Dealer(this);
        let self = this;

        // Drop Zone Logic
        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        // Connect to WS Server 
        this.socket = io('http://localhost:5001');

        // Send Connected Message
        this.socket.on('connect', function() {
            console.log('Connected!');
        });
        // Check for Player A Event
        this.socket.on('isPlayerA', function() {
            self.isPlayerA = true;
        });
        // Deal Cards Event
        this.socket.on('dealCards', function() {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        });
        // Card Played Events
        this.socket.on('cardPlayed', function(gameObject, isPlayerA) {
            // Check to see if this client initiated event
            if (isPlayerA !== self.isPlayerA) {
                // If we are not, we must update our scene to match client who emitted event
                // Get image of card
                let sprite = gameObject.textureKey;
                // "Destroy" played card from opponents hand
                self.opponentCards.shift().destroy();
                // Incr Cards
                self.dropZone.data.values.cards++;
                // Generate and Render Played Card
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
        })
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
        this.input.on('dragstart', function(pointer, gameObject) {
            // Change Tint of Card currently selected
            gameObject.setTint(0xff69b4);
            // Bring above other cards in hand
            self.children.bringToTop(gameObject);
        })
        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                // If not dropped in Zone, return to position
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
        this.input.on('drop', function(pointer, gameObject, dropZone) {
            // Incr # of cards in dropZone
            dropZone.data.values.cards++;
            // Set Card correct in dropZone area
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            // Once a card is placed in dropZone, can't retract
            gameObject.disableInteractive();
            // Emit Card Played Event to all Clients
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);

        })

        // Deal Cards Interactivity
        this.dealText = this.add.text(75, 350, ['Deal Cards']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        this.dealText.on('pointerdown', function () {
            // Emite Deal Cards Event
            self.socket.emit('dealCards');
        })
        this.dealText.on('pointerover', function () {
            // Change Color
            self.dealText.setColor('#ff69b4');
        })
        this.dealText.on('pointerout', function () {
            // Change Color
            self.dealText.setColor('#00ffff');
        })

    }

    // Update the view
    // Also again, surprisingly simple.
    // We don't need it right now though
    update() {

    }
}