/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

const KEY_CRATE = 'crate'
const INFO_FORMAT = `Size:       %1
Spawned:    %2
Despawned:  %3`

type TCrate = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

export default class GameScene extends Phaser.Scene {
    // private crateGroup?: Phaser.GameObjects.Group
    private crateGroup?: Phaser.Physics.Arcade.Group
    private infoText?: Phaser.GameObjects.Text

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image(KEY_CRATE, "assets/04/crate.png")
    }

    create() {
        this.crateGroup = this.physics.add.group({
            defaultKey: KEY_CRATE,
            maxSize: 5,
            // visible: false,
            // active: false
        })

        this.physics.add.collider(this.crateGroup, this.crateGroup)

        this.infoText = this.add.text(16, 16, 'crate')

        this.input.on('pointerup', this.handlePointerUp, this)
    }

    update() {
        if (!this.crateGroup || !this.infoText) return

        const size = this.crateGroup.getLength()
        const used = this.crateGroup.getTotalUsed()
        const text = Phaser.Utils.String.Format(
            INFO_FORMAT,
            [
                size,
                used,
                size - used
            ]
        )

        this.infoText.setText(text)
    }

    handlePointerUp(pointer: Phaser.Input.Pointer) {
        // const { type, target, currentTarget } = pointer.event
        // console.log(type, target, currentTarget)

        const a = this.input.hitTestPointer(pointer)
        console.log('[', a.length, ']', a)
        if (a.length) {
            this.despawnCrate(a[0] as TCrate)
        }
        else {
            // const box = this.physics.add.sprite(pointer.x, pointer.y,KEY_CRATE)
            // box.setInteractive({ useHandCursor: true })
            // box.body.setCollideWorldBounds(true)
            this.spawnCrate(pointer.x, pointer.y)
        }
    }

    private spawnCrate(x: number, y: number) {
        if (!this.crateGroup) return null

        const crate: TCrate = this.crateGroup.get(x, y, KEY_CRATE)
        if (!crate) return null

        crate.alpha = 1
        crate.scale = 1
        crate.setVisible(true)
        crate.setActive(true)
        crate.setInteractive({ useHandCursor: true })
        crate.enableBody(true, x, y, true, true)
        crate.body.setCollideWorldBounds(true)
        crate.body.bounce.y = 0.25
        return crate
    }

    private despawnCrate(crate: TCrate) {
        // this.crateGroup!.killAndHide(crate)
        this.tweens.add({
            targets: crate,
            // scale: 2,
            alpha: 0,
            duration: Phaser.Math.Between(500, 1500),
            onComplete: (tween) => {
                this.crateGroup!.killAndHide(crate)
                this.tweens.killTweensOf(crate)
                // crate.body.enable = false
                crate.disableBody(true, true)
            }
        })
    }

}