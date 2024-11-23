export async function taskOne(input: string[]): Promise<void> {
    const sideUses = new Map<string, number[]>
    const idSingleUses: Record<number, number> = {}
    const allIds: number[] = []
    let i = 0
    input.push('')
    while(i < input.length) {
        const _s = input[i].split(' ')[1]
        const id = Number(_s.substring(0, _s.length-1))
        const lines: string[] = []
        i++
        while(input[i] != '') {
            lines.push(input[i])
            i++
        }
        const edges: string[] = []
        edges.push(lines[0])
        edges.push(lines[0].split('').reverse().join(''))
        edges.push(lines[lines.length-1])
        edges.push(lines[lines.length-1].split('').reverse().join(''))

        edges.push(lines.map(i => i[0]).join(''))
        edges.push(lines.map(i => i[0]).reverse().join(''))
        edges.push(lines.map(i => i[i.length-1]).join(''))
        edges.push(lines.map(i => i[i.length-1]).reverse().join(''))

        edges.forEach(e => {
            if (!sideUses.has(e)) sideUses.set(e, [])
            sideUses.get(e)!.push(id)
        })
        idSingleUses[id] = 0
        allIds.push(id)

        i++
    }

    for (const [e, ids] of sideUses) {
        if (ids.length == 1) {
            idSingleUses[ids[0]]++
        }
    }

    let r =  1
    for (const id of allIds) {
        if (idSingleUses[id] == 4) r *= id
    }
    console.log(r)
}

export async function taskTwo(input: string[]): Promise<void> {
    const sideUses = new Map<string, number[]>
    const idSingleUses: Record<number, number> = {}
    const allIds = new Set<number>()
    const tilesMap: Record<number, string[]> = {}
    let i = 0
    input.push('')
    while(i < input.length) {
        const _s = input[i].split(' ')[1]
        const id = Number(_s.substring(0, _s.length-1))
        const lines: string[] = []
        i++
        while(input[i] != '') {
            lines.push(input[i])
            i++
        }
        const edges: string[] = []
        edges.push(lines[0])
        edges.push(lines[0].split('').reverse().join(''))
        edges.push(lines[lines.length-1])
        edges.push(lines[lines.length-1].split('').reverse().join(''))

        edges.push(lines.map(i => i[0]).join(''))
        edges.push(lines.map(i => i[0]).reverse().join(''))
        edges.push(lines.map(i => i[i.length-1]).join(''))
        edges.push(lines.map(i => i[i.length-1]).reverse().join(''))

        edges.forEach(e => {
            if (!sideUses.has(e)) sideUses.set(e, [])
            sideUses.get(e)!.push(id)
        })
        idSingleUses[id] = 0
        allIds.add(id)
        tilesMap[id] = lines

        i++
    }

    
    const size = Math.sqrt(allIds.size)
    const bigGrid: Tile[][] = Array.from({length: size}, () => Array.from({length: size}, () => {return {} as Tile}))

    for (const [e, ids] of sideUses) {
        if (ids.length == 1) idSingleUses[ids[0]]++
    }

    for (const id of allIds) {
        if (idSingleUses[id] == 4) {
            // find orientation, so it is top left corner
            const orientation = orientate(tilesMap[id]).filter(o => {
                const bottomHasNeighbour = sideUses.get(o[o.length-1])!.length == 2
                const rightSide = o.map(i => i[i.length-1]).join('')
                const rightHasNeightbour = sideUses.get(rightSide)!.length == 2
                return bottomHasNeighbour && rightHasNeightbour
            })[0]
            bigGrid[0][0] = { id: id, tile: orientation}
        }
    }

    // fill top row
    for (let i = 1; i < size; i++) {
        const tileToMatch = bigGrid[0][i-1].tile.map(i => i[i.length-1]).join('')
        const neighbourID = sideUses.get(tileToMatch)!.filter(j => j != bigGrid[0][i-1].id)[0] 
        const wantedOrientation = orientate(tilesMap[neighbourID]).filter(o => o.map(i => i[0]).join('') == tileToMatch)[0]
        bigGrid[0][i] = {id: neighbourID, tile: wantedOrientation}
    }

    // fill each row top to bottom
    for (let row = 1; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const tileToMatch = bigGrid[row-1][col].tile
            const bottomRow = tileToMatch[tileToMatch.length-1]
            const neighbourID = sideUses.get(bottomRow)!.filter(j => j != bigGrid[row-1][col].id)[0]
            const wantedOrientation = orientate(tilesMap[neighbourID]).filter(o => o[0] == bottomRow)[0]
            bigGrid[row][col] = {id: neighbourID, tile: wantedOrientation}
        }
    }

    const tileSize = bigGrid[0][0].tile.length - 2
    const grid: string[] = Array.from({length: (tileSize)*size}, () => "")
    // create real grid
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const curCell = bigGrid[row][col].tile
            for (let r = 0; r < tileSize; r++) {
                grid[row * tileSize + r] += curCell[r+1].substring(1, tileSize+1)
            }
        }
    }

    const monster = ["                  # ", "#    ##    ##    ###", " #  #  #  #  #  #   "]
    let monsterPos: number[][] = []
    for (let y = 0; y < monster.length; y++) {
        for (let x = 0; x < monster[y].length; x++) {
            if (monster[y][x] == '#') monsterPos.push([y,x])
        }
    }
    const allGrids = orientate(grid)

    // find which grid has monsters
    const finalGrid = allGrids.filter(grid => {
        for (let row = 0; row < grid.length- monster.length; row++) {
            for (let col = 0; col < grid[row].length- monster[0].length; col++) {
                let canBeMonster = true
                for (const p of monsterPos) {
                    if (grid[row+p[0]][col+p[1]] != '#') canBeMonster = false
                }   
                if (canBeMonster) return true
            }
        }
        return false
    })[0]
    
    // mark fields witch monsters
    const hasMonster = Array.from({length: finalGrid.length}, () => Array.from({length: finalGrid.length}, () => false))
    for (let row = 0; row < finalGrid.length- monster.length; row++) {
        for (let col = 0; col < finalGrid[row].length- monster[0].length; col++) {
            let canBeMonster = true
            for (const p of monsterPos) {
                if (finalGrid[row+p[0]][col+p[1]] != '#') canBeMonster = false
            }   
            if (canBeMonster) {
                for (const p of monsterPos) {
                    hasMonster[row+p[0]][col+p[1]] = true
                } 
            }   
        }
    }
    
    // count non monster #
    let count = 0
    for (let row = 0; row < finalGrid.length; row++) {
        for (let col = 0; col < finalGrid[row].length; col++) {
            if (!hasMonster[row][col] && finalGrid[row][col] == '#') count++
        }
    }
    console.log(count)

    function orientate(tile: string[]) {
        const orientations: string[][] = []
        let lastRot = Array.from(tile)
        orientations.push(lastRot)
        for (let i = 0; i < 3; i++) {
            lastRot = turn(lastRot)
            orientations.push(lastRot)
        }

        for (let i = 0; i < 4; i++) {
            orientations.push(flip(orientations[i]))
        }

        return orientations

        function flip(org: string[]) {
            return org.map(l => l.split('').reverse().join(''))
        }

        function turn(org: string[]) {
            return org[0].split('').map((val, index) => org.map(row => row[index]).reverse()).map(i=>i.join(''))
        }
    }

    interface Tile {
        id: number
        tile: string[]
    }
}