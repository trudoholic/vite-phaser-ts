/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

// const heroW = 16, heroH = 28

export default class GameScene extends Phaser.Scene {
    private ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined
    private power: number = 0
    private timer: Phaser.Time.TimerEvent | undefined

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', 'assets/01/tiles/level.json')
        this.load.image('tileset', 'assets/01/tiles/tiles.png')

        this.load.image("hero", "assets/01/hero.png")

        //
        this.load.image("ball", "assets/01/ball.png")
        this.load.image("block", "assets/01/block.png")
        //
    }

    create() {
        this.power = 0

        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('tileset', 'tileset')
        const layer = map.createLayer('Tile Layer 1', tileset)
        map.setCollision([ 1 ])

        const player = this.player = this.physics.add.sprite(32, 416, "hero")
        player.setOrigin(0,1)
        this.physics.add.collider(player, layer)
        player.setGravityY(400)

        //
        const ball = this.ball = this.physics.add.sprite(+this.sys.game.config.width/2,0,"ball")
        ball.setGravityY(100)

        // this.input.on('pointerdown', this.jump, this)
        this.input.on('pointerdown', this.startJump, this)
        this.input.on('pointerup', this.endJump, this)

        let groundX = +this.sys.game.config.width / 2
        let groundY = +this.sys.game.config.height * .95
        let ground = this.physics.add.sprite(groundX, groundY,"block")
        ground.displayWidth = +this.sys.game.config.width
        ground.alpha = .5
        this.physics.add.collider(ball, ground)
        ground.setImmovable()
        //


        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.player?.setVelocityX(0)
        if (this.cursors?.left.isDown){
            this.player?.setVelocityX(-150)
        }
        if (this.cursors?.right.isDown){
            this.player?.setVelocityX(150)
        }
        if (this.cursors?.up.isDown && this.player?.body.blocked.down){
            this.player?.setVelocityY(-250)
        }
    }

    jump() {
        this.ball?.setVelocityY(-100);
    }

    startJump() {
        this.timer = this.time.addEvent({
            delay: 100,
            callback: this.tick,
            callbackScope: this,
            loop: true
        })
    }

    endJump() {
        this.timer?.remove()
        this.ball?.setVelocityY(-this.power * 100)
        this.power = 0
    }

    tick() {
        if (this.power < 5) {
            this.power += .1
        }
    }    

}