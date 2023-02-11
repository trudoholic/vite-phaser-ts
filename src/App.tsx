// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

import phaserGame from './game/PhaserGame'
import GameScene from './game/scenes/GameScene'

// import useWindowSize from "../useWindowSize"
// const { height, width } = useWindowSize()

const handleClick = () => {
    const scene = phaserGame?.scene.keys.GameScene as GameScene
    scene?.createEmitter()
}

function App() {
  // const [count, setCount] = useState(0)

  return (
      <div className="App">
          <h1>Hello World</h1>
          <div id="phaser-container"/>
          <button className="App-button" onClick={handleClick}>Click me</button>
      </div>
  )
}

export default App
