/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

type TCrate = Phaser.Physics.Matter.Image

export default class GameScene extends Phaser.Scene {
    private crate?: TCrate

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("crate", "assets/05/crate.png")
        this.load.image("platform", "assets/05/block.png")
    }

    create() {
        // const image1 = this.add.image(0, -30, 'crate')
        // const container = this.add.container(100, 100, [image1, image2, image3])

        this.crate = this.spawnCrate(325, -100)
        this.spawnCrate(400, 300)
        this.spawnCrate(450, 50)

        const platform = this.matter.add.image(400, 550, 'platform', void 0, {isStatic: true})
            .setScale(12, 0.5)
            // .setAngle(10)
            // .setFriction(0)

        // this.input.once('pointerup', () => platform.destroy())
        this.input.on('pointerup', this.handlePointerUp, this)

    }

    update() {
        // if (this.crate && this.crate.y > 600) {
        //     this.crate.setPosition(50, 0)
        //     this.crate.setVelocity(0, 0)
        // }
    }

    handlePointerUp(pointer: Phaser.Input.Pointer) {
        const a = this.input.hitTestPointer(pointer)
        console.log('[', a.length, ']', a)
        if (a.length) {
            this.despawnCrate(a[0] as TCrate)
        }
        else {
            this.spawnCrate(pointer.x, pointer.y)
        }
    }

    private spawnCrate(x: number, y: number) {
        const crate = this.matter.add.image(x, y, 'crate')
        crate.setFrictionAir(0.001)
        crate.setBounce(0.6)
        crate.setInteractive({ useHandCursor: true })
        return crate
    }

    private despawnCrate(crate: TCrate) {
        // crate.destroy()
        this.tweens.add({
            targets: crate,
            // scale: 2,
            alpha: 0,
            duration: Phaser.Math.Between(500, 1500),
            onComplete: (tween) => {
                this.tweens.killTweensOf(crate)
                crate.destroy()
            }
        })
    }

}