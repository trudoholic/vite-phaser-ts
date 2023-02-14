/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', 'assets/02/tiles/level.json')
        this.load.image('tileset', 'assets/02/tiles/tiles.png')

        this.load.image("hero", "assets/02/hero.png")
    }

    create() {
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('tileset', 'tileset')
        const layer = map.createLayer('Tile Layer 1', tileset)
        map.setCollision([ 1 ])

        const player = this.player = this.physics.add.sprite(32, 416, "hero")
        player.setOrigin(0,1)
        this.physics.add.collider(player, layer)
        player.setGravityY(400)

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

}