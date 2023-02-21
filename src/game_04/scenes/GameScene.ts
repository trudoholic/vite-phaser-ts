/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    // private ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("crate", "assets/04/crate.png")
    }

    create() {
        const box = this.physics.add.sprite(+this.sys.game.config.width/2,0,"crate")
        box.setInteractive({ useHandCursor: true })
        // box.setGravityY(100)

        this.input.on('pointerup', this.handlePointerUp, this)
    }

    update() {
    }

    handlePointerUp(pointer: Phaser.Input.Pointer) {
        const a = this.input.hitTestPointer(pointer)
        console.log('[', a.length, ']', a)
    }

}