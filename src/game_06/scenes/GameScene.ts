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

let canMove = false

export default class GameScene extends Phaser.Scene {
    private tiles: Phaser.GameObjects.Container[] = []

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

        const tile = this.add.sprite(0, 0, "tile").setOrigin(0,0)

        const style = {font: "bold 32px Arial", fill: "#336699", align: "center"}
        const text = this.add.text(tileSize/2, tileSize/2, "2", style).setOrigin(0.5, 0.5)

        const tileX = toCol(rnd) * tileSize, tileY = toRow(rnd) * tileSize
        const container = this.add.container(tileX, tileY, [ tile, text ])
        this.tiles.push(container)

        tile.alpha = 0
        this.tweens.add({
            targets: tile,
            alpha: 1,
            duration: 250,
            onComplete: (/*tween*/) => {
                this.tweens.killTweensOf(tile)
                this.updateNumbers()
                canMove = true
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
        /*/
        if (canMove) {
            canMove = false
            let moved = false
            // this.tiles.sort("x", Phaser.Group.SORT_ASCENDING)
            this.tiles.sort((a, b) => a.x - b.x)
            // looping through each element in the group
            this.tiles.forEach(function(it){
                // getting row and column starting from a one-dimensional array
                var row = toRow(it.pos);
                var col = toCol(it.pos);
                // checking if we aren't already on the leftmost column (the tile can't move)
                if(col>0){
                    // setting a "remove" flag to false. Sometimes you have to remove tiles, when two merge into one
                    var remove = false;
                    // looping from column position back to the leftmost column
                    for(i=col-1;i>=0;i--){
                        // if we find a tile which is not empty, our search is about to end...
                        if(fieldArray[row*4+i]!=0){
                            // ...we just have to see if the tile we are landing on has the same value of the tile we are moving
                            if(fieldArray[row*4+i]==fieldArray[row*4+col]){
                                // in this case the current tile will be removed
                                remove = true;
                                i--;
                            }
                            break;
                        }
                    }
                    // if we can actually move...
                    if(col!=i+1){
                        // set moved to true
                        moved=true;
                        // moving the tile "item" from row*4+col to row*4+i+1 and (if allowed) remove it
                        moveTile(item,row*4+col,row*4+i+1,remove);
                    }
                }
            });
            // completing the move
            endMove(moved);
        }

        /*/
    }

    moveDown() {
        console.log("keyS")
        this.addTwo()
    }

    moveRight() {
        console.log("keyD")
        this.addTwo()
    }

    updateNumbers() {
        this.tiles.forEach(it => {
            console.log(it)
            // const tile = it.getAt(0) as Phaser.GameObjects.Sprite
            // tile.tint = 0xff9999
            // const text = it.getAt(1) as Phaser.GameObjects.Text
            // text.text = "8"
        })
    }

}