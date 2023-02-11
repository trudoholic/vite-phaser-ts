import Phaser from 'phaser'
import GameScene from "./scenes/GameScene"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',//phaser-container
    // backgroundColor: '#282c34',
    backgroundColor: '#336699',
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,

        // width: 800, height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [GameScene],
}

const phaserGame = new Phaser.Game(config)
export default phaserGame