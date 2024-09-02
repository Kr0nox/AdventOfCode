export async function taskOne(input: string[]): Promise<void> {
    const serialNumber = Number(input[0])
    const L = 300

    const grid = Array.from({length: L}, (_, x) => Array.from({length:L}, (_, y) => {
        const rackID = x + 10 + 1
        let powerLevel = (rackID) * (y + 1)
        powerLevel += serialNumber
        powerLevel *= rackID
        return {
            rackID: rackID,
            powerLevel: (Math.floor(powerLevel / 100)% 10)-5
        } as Cell
    }))

    let maxP = [0,0]
    let maxV = -Infinity
    for (let x = 0; x < L-2; x++) {
        for (let y = 0; y < L-2; y++) {
            let s = 0
            for (let xd = 0; xd < 3; xd++) {
                for (let yd = 0; yd < 3; yd++) {
                    s += grid[x+xd][y+yd].powerLevel
                }
            }
            if (s > maxV) {
                maxV = s
                maxP = [x, y]
            }
        }
    }
    console.log(`${maxP[0]+1},${maxP[1]+1}`)

}

export async function taskTwo(input: string[]): Promise<void> {
    const serialNumber = Number(input[0])
    const L = 300

    const grid = Array.from({length: L}, (_, x) => Array.from({length:L}, (_, y) => {
        const rackID = x + 10 + 1
        let powerLevel = (rackID) * (y + 1)
        powerLevel += serialNumber
        powerLevel *= rackID
        return (Math.floor(powerLevel / 100)% 10)-5
    }))

    const summedAreaTable = Array.from({length: L}, () => Array.from({length:L}, () => 0))

    summedAreaTable[0][0] = grid[0][0]
    for (let x = 1; x < L; x++) {
        summedAreaTable[x][0] = summedAreaTable[x-1][0] + grid[x][0]
        summedAreaTable[0][x] = summedAreaTable[0][x-1] + grid[0][x]
    }

    for (let x = 1; x < L; x++) {
        for (let y = 1; y < L; y++) {
            summedAreaTable[x][y] = summedAreaTable[x-1][y] + summedAreaTable[x][y-1] - summedAreaTable[x-1][y-1] + grid[x][y]
        }
    }
/*
    for (let y = 1; y < 10; y++) {
        let r = ''
        for (let x = 1; x < 10; x++) {
            r += summedAreaTable[x][y] + ' ' 
        }
        console.log(r)
    }*/

    function get(x1: number, x2: number, y1:number, y2: number) {
        return summedAreaTable[x2][y2] + summedAreaTable[x1][y1] - summedAreaTable[x2][y1] - summedAreaTable[x1][y2]
    }

    let maxP = [0,0, 0]
    let maxV = -Infinity
    for (let s = 1; s <= L; s++) {
        for (let x = 0; x < L-s; x++) {
            for (let y = 0; y < L-s; y++) {
                let su = get(x, x+s, y, y+s)
                if (su > maxV) {
                    maxV = su
                    maxP = [x, y, s]
                }
            }
        }
    }
    
    console.log(`${maxP[0]+2},${maxP[1]+2},${maxP[2]}`)
}

interface Cell {
    rackID: number,
    powerLevel: number
}