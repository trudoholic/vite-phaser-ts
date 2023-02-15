import eventEmitter from '../../emitter'

export const handleClick = () => {
    eventEmitter.emit('Click', 200, 300)
}
