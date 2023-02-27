/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    private ball?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    private power: number = 0
    private timer?: Phaser.Time.TimerEvent
    private meter?: Phaser.GameObjects.Image
    private zone?: Phaser.GameObjects.Zone

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("ball", "assets/01/ball.png")
        this.load.image("block", "assets/01/block.png")
        this.load.image("green", "assets/01/green.png")
    }

    create() {
        this.power = 0
        const width_2 = +this.sys.game.config.width/2

        let zone = this.zone = this.add.zone(width_2, 200, 100, 100)
        this.physics.world.enable(zone)
        let body = this.zone.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        body.moves = false

        const ball = this.ball = this.physics.add.sprite(width_2,0,"ball")
        ball.setGravityY(100)

        this.physics.add.overlap(ball, zone)

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

        this.meter = this.add.image(25,480,"green")
        this.meter.setOrigin(1, 1)
        this.meter.scaleY = 0

        let healthBar = this.makeBar(10,10,0x2ecc71)
        this.setValue(healthBar,100)

    }

    update() {
        if (!this.zone) return
        let body = this.zone.body as Phaser.Physics.Arcade.Body
        body.debugBodyColor = body.touching.none ? 0x00ffff : 0xffff00
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
        this.ball?.setVelocityY(-this.power * 50)
        this.power = 0
        if (this.meter) this.meter.scaleY = 0
    }

    tick() {
        if (this.power < 5) {
            this.power += .1
            if (this.meter) this.meter.scaleY = this.power
        }
    }

    makeBar(x: number, y: number,color: number) {
        let bar = this.add.graphics()
        bar.fillStyle(color, 1)
        bar.fillRect(0, 0, 200, 25)
        bar.x = x
        bar.y = y
        return bar
    }

    setValue(bar: Phaser.GameObjects.Graphics, percentage: number) {
        bar.scaleX = percentage / 100
    }

}