export async function taskOne(input: string[]): Promise<void> {
    console.log(buildFloor(input).size)    
}

export async function taskTwo(input: string[]): Promise<void> {
    let blackPieces = buildFloor(input)

    const neighbours = [
        [2,0],[-2,0],
        [1,1],[1,-1],[-1,1],[-1,-1]
    ]
    for (let d = 0; d < 100; d++) {
        let newBlackPieces = new Set<string>()
        for (const p of blackPieces) {
            const [x,y] = p.split('|').map(Number)
            
            // this is a black piece, handle its neighbour check
            let blackNeighbours = 0
            for (const [dX, dY] of neighbours) {
                if (blackPieces.has(stringify(x+dX,y+dY))) blackNeighbours++
            }
            if (blackNeighbours == 1 || blackNeighbours == 2) newBlackPieces.add(p)

            // since white tiles need to have a black neighbour next to them to change, we just need to check neighbours of black tiles
            for (const [wX, wY] of neighbours) {
                // skip black neighbours
                const k = stringify(x+wX,y+wY)
                if (blackPieces.has(k)) continue
                blackNeighbours = 0
                for (const [dX, dY] of neighbours) {
                    if (blackPieces.has(stringify(x+wX+dX,y+wY+dY))) blackNeighbours++
                }
                if (blackNeighbours == 2) newBlackPieces.add(k)
            }
        }
        blackPieces = newBlackPieces
    }
    console.log(blackPieces.size)
}

function buildFloor(input: string[]) {
    const blackPieces = new Set<string>
    for (const i of input) {
        let x = 0
        let y = 0
        let p = 0
        while(p < i.length) {
            if (i[p] == "e") x += 2
            else if (i[p] == "w") x -= 2
            else {
                if (i[p] == "n") y += 1
                else if (i[p] == "s") y -= 1
                p++
                if (i[p] == "e") x += 1
                else if (i[p] == "w") x -= 1
            }
            p++
        }
        const k = stringify(x,y)
        if (blackPieces.has(k)) blackPieces.delete(k)
        else blackPieces.add(k)
    }
    return blackPieces
}

function stringify(x: number, y: number) {
    return x + '|' + y
}