import React, { useRef, useEffect } from 'react'
import { Game, Types } from 'phaser'
import eventEmitter from "../emitter"

export function useGame (
    config: Types.Core.GameConfig,
    containerRef: React.RefObject<HTMLDivElement>
): Game | null {
    const gameRef = useRef<Game | null>(null)

    useEffect(() => {
        if (!gameRef.current && containerRef.current) {
            const newGame = new Game({ ...config, parent: containerRef.current })
            gameRef.current = newGame
        }

        return () => {
            eventEmitter.destroy()
            gameRef.current?.destroy(true);
            gameRef.current = null;
        }
    }, [config, containerRef, gameRef.current])

    return gameRef.current
}
