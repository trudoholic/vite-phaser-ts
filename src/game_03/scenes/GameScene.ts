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

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image("square", "assets/03/square.png")
    }

    create() {
        const floorHeight = 20

        const floor = this.add.graphics()
        floor.fillStyle(0x440044, 1)
        for(let i = 0; i < this.floorY.length; i++){
            floor.fillRect(levelStart, this.floorY[i], levelEnd, floorHeight)
        }

        const imgHeight = this.textures.get('square').getSourceImage().height
        this.theSquare = this.add.sprite(levelStart, this.floorY[this.currentFloor] - imgHeight / 2, "square")
        this.theSquare.setOrigin(0.5,0.5)

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
                mod = this.currentFloor % 2
                this.isJumping = false
                this.theSquare.rotation = 0
                this.theSquare.x = levelEnd * mod + levelStart * (1 - mod)
                this.theSquare.y = (this.floorY)[this.currentFloor] - imgHeight / 2
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

}