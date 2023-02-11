import Phaser from 'phaser'
import eventEmitter from '../../emitter'
import reactLogo from '../../assets/react.svg'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')

        eventEmitter.on('createEmitter', this.handler, this)
    }

    handler (x: number, y: number) {
        console.log(x, y)
        this.createEmitter()
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io')

        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
        this.load.image('red', 'assets/particles/red.png')

        this.load.image("logo", reactLogo)
    }

    create() {
        this.createEmitter()
        const logo = this.add.image(400, 150, "logo")
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        })
    }

    createEmitter() {
        const particles = this.add.particles('red')

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        logo.setVelocity(100, 200)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)
    }
}