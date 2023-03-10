export const tileSize = 100
export const SIZE = 4
export const toRow = (n: number) => Math.floor(n / SIZE)
export const toCol = (n: number) => n % SIZE
export const fieldArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

export const colors = {
    2: 0xFFFFFF,
    4: 0xFFEEEE,
    8: 0xFFDDDD,
    16: 0xFFCCCC,
    32: 0xFFBBBB,
    64: 0xFFAAAA,
    128: 0xFF9999,
    256: 0xFF8888,
    512: 0xFF7777,
    1024: 0xFF6666,
    2048: 0xFF5555,
    4096: 0xFF4444,
    8192: 0xFF3333,
    16384: 0xFF2222,
    32768: 0xFF1111,
    65536: 0xFF0000,
}

