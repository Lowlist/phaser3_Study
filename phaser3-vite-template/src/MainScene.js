import Phaser from "phaser";

export default class MainScene extends Phaser.Scene{

    constructor(){
        super({ key : 'main' , active : true })
    }
    preload(){
        this.load.image("sky" , "phaser3-tutorial-src/assets/sky.png");
        this.load.image("ground" , "phaser3-tutorial-src/assets/platform.png");
        this.load.image("star" , "phaser3-tutorial-src/assets/star.png");
        this.load.image("bomb" , "phaser3-tutorial-src/assets/bomb.png");
        this.load.image("dude" , "phaser3-tutorial-src/assets/dude.png");
    }

    create() {
        this.add.image(400, 300, "sky");
        this.add.image(400, 300, "star");
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");
    }
  
    update(){
    }
  
    destroy(){

    }

}