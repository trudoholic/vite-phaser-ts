import { Types } from "phaser"
import GameScene from "./scenes/GameScene"

/*/
const gameConfig: Types.Core.GameConfig = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
    scene: GameScene
}
/*/
const gameConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    // parent: 'phaser-container',
    // backgroundColor: '#282c34',
    backgroundColor: '#336699',
    scale: {
        // mode: Phaser.Scale.ScaleModes.RESIZE,
        // width: window.innerWidth,
        // height: window.innerHeight,

        width: 800, height: 600, //[*]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [GameScene],
}
//

export default gameConfig