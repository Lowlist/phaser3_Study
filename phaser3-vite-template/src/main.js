import Phaser from 'phaser'
import HelloWorldScene from './HelloWorldScene';
import MainScene from './MainScene';

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [MainScene],
}

export default new Phaser.Game(config)
