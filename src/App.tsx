// import { useState } from 'react'
import './App.css'

import eventEmitter from './emitter'
import phaserGame from './game/PhaserGame'

// import useWindowSize from "./useWindowSize"

const game = phaserGame
const handleClick = () => {
    eventEmitter.emit('createEmitter', 200, 300)
}

function App() {
    console.log(game)
    // const { height, width } = useWindowSize()
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
