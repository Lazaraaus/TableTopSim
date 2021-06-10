export default class Zone {
	constructor(scene) {
		// Luckily for us, Phaser has built-in DropZones that allows to dictate where gameObjects can be dropped
		// Here we will set one up in a class without an outline to alert the Player of the boundaries
		this.renderZone = () => {
			let dropZone = scene.add.zone(700, 375, 900, 250).setRectangleDropZone(900, 250);
			dropZone.setData({cards:0});
			return dropZone;
		};
		this.renderOutline = (dropZone) => {
			let dropZoneOutline = scene.add.graphics();
			dropZoneOutline.lineStyle(4, 0xff69b4);
			dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);	
		}
	}
}