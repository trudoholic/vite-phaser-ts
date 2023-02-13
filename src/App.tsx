import { useRef } from 'react'
import './App.css'

import { useGame } from "./hooks"
import gameConfig from "./game"
import { handleClick } from "./game/utils"
// import useWindowSize from "./useWindowSize"

function App() {
    // const { height, width } = useWindowSize()
    // const [count, setCount] = useState(0)

    const parentEl = useRef<HTMLDivElement>(null)
    const game = useGame(gameConfig, parentEl)
    game && console.log(game)

    return (
        <div className="App">
            <h1>Hello World</h1>
            <div ref={parentEl} className="phaser" />
            <button className="App-button" onClick={handleClick}>Click me</button>
        </div>
    )
}

export default App
