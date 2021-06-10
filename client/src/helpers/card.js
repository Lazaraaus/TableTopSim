export default class Card {
	constructor(scene) {
		this.render = (x, y, sprite, scaleX, scaleY) => {
			let card = scene.add.image(x, y, sprite).setScale(scaleX, scaleY).setInteractive();
			scene.input.setDraggable(card);
			return card;
		}
	}
}