import { Types } from "phaser"
import GameScene from "./scenes/GameScene"

const gameConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720, height: 480,
    backgroundColor: '#336699',
    /*/
    scale: {
        // mode: Phaser.Scale.ScaleModes.RESIZE,
        // width: window.innerWidth,
        // height: window.innerHeight,

        width: 640, height: 480, //[*]
    },
    /*/
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 100 },
        },
    },
    scene: [GameScene],
}
//

export default gameConfig