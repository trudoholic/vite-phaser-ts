/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("crate", "assets/04/crate.png")
    }

    create() {
        this.input.on('pointerup', this.handlePointerUp, this)
    }

    update() {
    }

    handlePointerUp(pointer: Phaser.Input.Pointer) {
        // const { type, target, currentTarget } = pointer.event
        // console.log(type, target, currentTarget)

        const a = this.input.hitTestPointer(pointer)
        console.log('[', a.length, ']', a)
        if (a.length) {
            //
        }
        else {
            const box = this.physics.add.sprite(pointer.x, pointer.y,"crate")
            box.setInteractive({ useHandCursor: true })
            box.body.setCollideWorldBounds(true)
        }
    }

}