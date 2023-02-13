import eventEmitter from '../../emitter'

export const handleClick = () => {
    eventEmitter.emit('createEmitter', 200, 300)
}
