/* eslint-disable class-methods-use-this */
// noinspection JSUnusedGlobalSymbols

import Phaser from 'phaser'

const levelStart = 0, levelEnd = 640

export default class GameScene extends Phaser.Scene {
    private floorY = [92,184,276,368,460]
    private currentFloor = 0
    private theSquare: Phaser.GameObjects.Sprite | undefined
    private isJumping = false
    private jumpTime = 0
    private spikesGroup: Phaser.GameObjects.Group | undefined

    constructor() {
        super('GameScene')
        this.resetSquare = this.resetSquare.bind(this)
    }

    preload() {
        this.load.image("square", "assets/03/square.png")
        this.load.image("spike", "assets/03/spike.png")
    }

    create() {
        const floorHeight = 20

        const floor = this.add.graphics()
        floor.fillStyle(0x440044, 1)
        for (let i = 0; i < this.floorY.length; i++) {
            floor.fillRect(levelStart, this.floorY[i], levelEnd, floorHeight)
        }

        const imgHeight = this.textures.get('square').getSourceImage().height
        this.theSquare = this.physics.add.sprite(
            levelStart, this.floorY[this.currentFloor] - imgHeight / 2, "square")
        this.theSquare.setOrigin(0.5,0.5)

        const spikesAmount = 3
        this.spikesGroup = this.physics.add.group()
        const spikeHeight = this.textures.get('spike').getSourceImage().height
        for (let i = 0; i < spikesAmount; i++) {
            const randomFloor = Math.floor(Math.random() * this.floorY.length)
            let theSpike = this.add.sprite(Math.floor(Math.random() * 400) + 120,
                (this.floorY)[randomFloor] - spikeHeight / 2, "spike")
            theSpike.setOrigin(0.5,0.5)
            this.spikesGroup.add(theSpike)
        }
        this.physics.add.overlap(this.theSquare, this.spikesGroup, this.onCollision, void 0, this)

        this.input.on('pointerdown', this.jump, this)
    }

    update() {
        if (this.theSquare) {
            const imgHeight = this.textures.get('square').getSourceImage().height
            const xSpeed = 4
            let mod = this.currentFloor % 2
            this.theSquare.x += xSpeed * (1 - 2 * mod)

            if (this.theSquare.x > levelEnd && mod === 0 || this.theSquare.x < levelStart && mod === 1) {
                this.currentFloor++
                if (this.currentFloor > this.floorY.length - 1) {
                    this.currentFloor = 0
                }
                this.resetSquare()
            }

            if (this.isJumping) {
                const jumpWidth = 120, jumpHeight = 40, jumpRotation = 180, degToRad = 0.0174532925
                const jumpFrames = jumpWidth / xSpeed
                const degreesPerFrame = jumpRotation / jumpFrames * (1 - 2 * mod)
                const radiansPerFrame = (180 / jumpFrames) * degToRad


                this.jumpTime++
                this.theSquare.angle += degreesPerFrame
                this.theSquare.y = (this.floorY)[this.currentFloor] - imgHeight/2
                    - jumpHeight * Math.sin(radiansPerFrame * this.jumpTime)
                if (this.jumpTime == jumpFrames) {
                    this.isJumping = false
                    this.theSquare.y = (this.floorY)[this.currentFloor] - imgHeight/2
                }
            }
        }
    }

    jump() {
        if (! this.isJumping) {
            this.jumpTime = 0
            this.isJumping = true
        }
    }

    onCollision() {
        this.resetSquare()
    }

    resetSquare() {
        if (this.theSquare) {
            const imgHeight = this.textures.get('square').getSourceImage().height
            const mod = this.currentFloor % 2
            this.isJumping = false
            this.theSquare.rotation = 0
            this.theSquare.x = levelEnd * mod + levelStart * (1 - mod)
            this.theSquare.y = (this.floorY)[this.currentFloor] - imgHeight/2
        }
    }

}