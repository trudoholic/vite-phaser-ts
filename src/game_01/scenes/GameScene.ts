/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    private ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined
    private power: number = 0
    private timer: Phaser.Time.TimerEvent | undefined

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("ball", "assets/01/ball.png")
        this.load.image("block", "assets/01/block.png")
    }

    create() {
        this.power = 0

        const ball = this.ball = this.physics.add.sprite(+this.sys.game.config.width/2,0,"ball")
        ball.setGravityY(100)

        // this.input.on('pointerdown', this.jump, this)
        this.input.on('pointerdown', this.startJump, this)
        this.input.on('pointerup', this.endJump, this)

        let groundX = +this.sys.game.config.width / 2
        let groundY = +this.sys.game.config.height * .95
        let ground = this.physics.add.sprite(groundX, groundY,"block")
        ground.displayWidth = +this.sys.game.config.width
        // ground.alpha = .5
        this.physics.add.collider(ball, ground)
        ground.setImmovable()
    }

    update() {
    }

    // jump() {
    //     this.ball?.setVelocityY(-100);
    // }

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