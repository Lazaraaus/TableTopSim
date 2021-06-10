import Card from '../helpers/card';

export default class Dealer {
	constructor(scene) {
		this.dealCards = () => {
			let playerSprite;
			let opponentSprite;
			// Check if Player is Player 1
			if (scene.isPlayerA) {
				playerSprite = 'card_spades_02';
				opponentSprite = 'magentaCardBack';
			}
			else {
				playerSprite = 'card_spades_03';
				opponentSprite = 'cyanCardBack';
			}
			// Loop, 5 Cards for each Player
			for (let i = 0; i < 5; i++) {
				// Create Player Card
				let playerCard = new Card(scene);
				// Render it to Game Scene
				playerCard.render(475 + (i * 100), 650, playerSprite, 4, 4);
				// Create Opponent Card
				let opponentCard = new Card(scene);
				// Render and add it to opponent cards container
				scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, opponentSprite, 0.3, 0.3).disableInteractive());
			}
		}
	}
}