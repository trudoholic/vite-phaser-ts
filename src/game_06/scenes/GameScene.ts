/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

const tileSize = 100
const SIZE = 4
const toRow = (n: number) => Math.floor(n / SIZE)
const toCol = (n: number) => n % SIZE

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("tile", "assets/06/tile.png")
    }

    create() {
        this.addTwo()
    }

    update() {
    }

    addTwo() {
        const rnd = Phaser.Math.Between(0, 15)
        // console.log("123:", rnd)
        const tile = this.add.sprite(toCol(rnd) * tileSize, toRow(rnd) * tileSize, "tile")
        tile.setOrigin(0,0)

        // const text = this.add.text(tileSize / 2, tileSize / 2, "2", {font: "bold 16px Arial", align: "center"});
        // text.anchor.set(0.5);
        // tile.addChild(text);

        tile.alpha = 0
        this.tweens.add({
            targets: tile,
            alpha: 1,
            duration: 250,
            onComplete: (tween) => {
                this.tweens.killTweensOf(tile)
                //     updateNumbers();
                //     canMove=true;
                console.log("123:", rnd)
            }
        })


    }

}