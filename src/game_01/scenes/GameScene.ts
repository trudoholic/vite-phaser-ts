/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

let map, tileset, layer, player, cursors


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        // this.load.tilemap("level", "level.json", null, Phaser.Tilemap.TILED_JSON);
        // this.load.tileset("tiles", "tiles.png", 32, 32);
        this.load.image("hero", "assets/01/hero.png")
    }

    create() {
        const hero = this.add.image(400, 150, "hero")
        this.tweens.add({
            targets: hero,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        })
    }
}