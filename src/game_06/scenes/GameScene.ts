/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'
import {
    tileSize,
    // SIZE,
    toRow,
    toCol,
    fieldArray,
} from '../constants'

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("tile", "assets/06/tile.png")
    }

    create() {
        // console.log(Phaser.Input.Keyboard.KeyCodes)
        const keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        const keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        const keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        const keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        keyW.on('down', this.moveUp, this)
        keyA.on('down', this.moveLeft, this)
        keyS.on('down', this.moveDown, this)
        keyD.on('down', this.moveRight, this)

        this.addTwo()
    }

    update() {
    }

    addTwo() {
        let rnd = 0
        do {
            rnd = Phaser.Math.Between(0, 15)
        } while (fieldArray[rnd])
        fieldArray[rnd] = 2

        const container = this.add.container(toCol(rnd) * tileSize, toRow(rnd) * tileSize)
        const tile = this.add.sprite(0, 0, "tile").setOrigin(0,0)
        container.add(tile)

        const style = {font: "bold 32px Arial", fill: "#336699", align: "center"}
        const text = this.add.text(tileSize/2, tileSize/2, "2", style).setOrigin(0.5, 0.5)
        container.add(text)

        tile.alpha = 0
        this.tweens.add({
            targets: tile,
            alpha: 1,
            duration: 250,
            onComplete: (tween) => {
                this.tweens.killTweensOf(tile)
                //     updateNumbers();
                //     canMove=true;
                console.log("rnd:", rnd)
            }
        })
    }

    moveUp() {
        console.log("keyW")
        this.addTwo()
    }

    moveLeft() {
        console.log("keyA")
        this.addTwo()
    }

    moveDown() {
        console.log("keyS")
        this.addTwo()
    }

    moveRight() {
        console.log("keyD")
        this.addTwo()
    }

}