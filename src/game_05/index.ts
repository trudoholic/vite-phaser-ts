import { Types } from "phaser"
import GameScene from "./scenes/GameScene"

const gameConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800, height: 600,
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
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 0.3 },
        },
    },
    scene: [GameScene],
}
//

export default gameConfig