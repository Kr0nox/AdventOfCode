let grid: number[][] = []

export async function taskOne(input: string[]): Promise<void> {
    grid = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0))
    input.forEach(doInstrcution)
    console.log(count())

    function doInstrcution(ins: string) {
        const r = /([^0-9]) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/.exec(ins)
        if (r == null) throw ins
        const x1 = parseInt(r[2])
        const y1 = parseInt(r[3])
        const x2 = parseInt(r[4])
        const y2 = parseInt(r[5])
        let task = 0
        if (r[1] == 'n') task = 1
        if (r[1] == 'e') task = 2
        for(let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                if (task == 0) grid[x][y] = 0
                if (task == 1) grid[x][y] = 1
                if (task == 2) grid[x][y] = grid[x][y] == 1 ? 0:1
            }
        }
    }
    
    function count() {
        let i = 0;
        for (let x = 0; x < 1000; x++) {
            for (let y = 0; y < 1000; y++) {
                if (grid[x][y] > 0) i++
            }
        }
        return i
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    grid = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0))
    input.forEach(doInstrcution)
    console.log(count())

    function doInstrcution(ins: string) {
        const r = /([^0-9]) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/.exec(ins)
        if (r == null) throw ins
        const x1 = parseInt(r[2])
        const y1 = parseInt(r[3])
        const x2 = parseInt(r[4])
        const y2 = parseInt(r[5])
        let task = 0
        if (r[1] == 'n') task = 1
        if (r[1] == 'e') task = 2
        for(let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                if (task == 0) {
                    grid[x][y]--
                    if (grid[x][y] < 0) grid[x][y] = 0
                } 
                if (task == 1) grid[x][y]++
                if (task == 2) grid[x][y] += 2
            }
        }
    }

    function count() {
        let i = 0;
        for (let x = 0; x < 1000; x++) {
            for (let y = 0; y < 1000; y++) {
                i += grid[x][y]
            }
        }
        return i
    }
}

