const X = 50
    const Y = 6
    const grid = Array.from({length: X}, () => Array.from({length: Y}, () => false))

export async function taskOne(input: string[]): Promise<void> {
    perform(input)

    let c = 0
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            if (grid[x][y]) c++
        }
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    perform(input)

    for (let y = 0; y < Y; y++) {
        let r = ''
        for (let x = 0; x < X; x++) {
            r += grid[x][y]?'#':' '
        }
        console.log(r)
    }
}

function perform(input: string[]) {
    for(const i of input) {
        let r = /rect ([0-9]+)x([0-9]+)/.exec(i)
        if (r) {
            for (let x = 0; x < parseInt(r[1]); x++) {
                for (let y = 0; y < parseInt(r[2]); y++) {
                    grid[x][y] = true
                }
            }
        }
        r = /rotate row y=([0-9]+) by ([0-9]+)/.exec(i)
        if(r) {
            const n = Array.from({length:X}, ()=>false)
            const y = parseInt(r[1])
            const o = parseInt(r[2])
            for (let x = 0; x < X; x++) {
                n[(x+o)%X] = grid[x][y]
            }
            for (let x = 0; x < X; x++) {
                grid[x][y] = n[x]
            }
        }
        r = /rotate column x=([0-9]+) by ([0-9]+)/.exec(i)
        if(r) {
            const n = Array.from({length:Y}, ()=>false)
            const x = parseInt(r[1])
            const o = parseInt(r[2])
            for (let y = 0; y < Y; y++) {
                n[(y+o)%Y] = grid[x][y]
            }
            for (let y = 0; y < Y; y++) {
                grid[x][y] = n[y]
            }
        }
    }
}