import Phaser from "phaser";

export default class MainScene extends Phaser.Scene{

    constructor(){
        super({ key : 'main' , active : true })
        this.player = null;
    }

    preload(){
        this.load.image("sky" , "phaser3-tutorial-src/assets/sky.png");
        this.load.image("ground" , "phaser3-tutorial-src/assets/platform.png");
        this.load.image("star" , "phaser3-tutorial-src/assets/star.png");
        this.load.image("bomb" , "phaser3-tutorial-src/assets/bomb.png");
        // 이미지 불러올때 한곳에 있으면 이런식으로 잘라서 데려와야할 필요가 있음.
        this.load.spritesheet("dude", "phaser3-tutorial-src/assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.add.image(400, 300, "sky");
        // this.add.image(400, 300, "star");
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");
        this.player = this.physics.add.sprite(100, 450, 'dude').setName("player");
        this.player.setBounce(0.5);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
        this.physics.add.collider(this.player, platforms);

        const stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });
        this.data.set("stars", stars);
        stars.children.iterate((star) => {
            // star가 Sprite인지 확인 후 setBounceY 호출
            if (star instanceof Phaser.Physics.Arcade.Sprite) {
                star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            }
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(this.player, stars, this.collectStar, undefined, this);
        this.data.set("score", 0);
        this.add.text(16, 16, 'score: 0', { fontSize: '32px', backgroundColor: '#000' }).setName("scoreText");
        const bombs = this.physics.add.group();
        this.data.set("bombs", bombs);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(this.player, bombs, this.hitBomb, undefined, this);
    }
    update() {
        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.data.set("score", this.data.get("score") + 10);
        let a = this.children.getByName("scoreText");
        a.setText("Score: " + this.data.get("score"));
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
    }

    
    destroy(){

    }

}