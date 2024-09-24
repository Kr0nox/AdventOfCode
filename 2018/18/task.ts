export async function taskOne(input: string[]): Promise<void> {
    const field = input.map(j => j.split('').map(i => {
        if (i == '.') return Space.ACRE
        if (i == '|') return Space.WOODED
        if (i == '#') return Space.YARD
        throw i
    }))

    for (let c = 0; c < 10; c++) {
        const neighbours = field.map((r, y) => r.map((_,x) => {
            const map = {[Space.ACRE]:0, [Space.WOODED]:0, [Space.YARD]:0}
            // console.log(y, field.length, x, field[0].length)
            for (let yD = Math.max(0, y - 1); yD < Math.min(y+2, field.length); yD++) {
                for (let xD = Math.max(0, x-1); xD < Math.min(x+2, field[0].length); xD++) {
                    if (xD == x && yD == y) continue
                    map[field[yD][xD]]++
                }
            }
            return map
        }))
        for (let y = 0; y < field.length; y++) {
            for (let x = 0; x < field[0].length; x++) {
                const n = neighbours[y][x]
                if (field[y][x] == Space.ACRE && n[Space.WOODED] >= 3) {
                    field[y][x] = Space.WOODED
                }
                else if (field[y][x] == Space.WOODED && n[Space.YARD] >= 3) {
                    field[y][x] = Space.YARD
                }
                else if (field[y][x] == Space.YARD) {
                    if (!(n[Space.YARD] >= 1 && n[Space.WOODED] >= 1)) {
                        field[y][x] = Space.ACRE
                    }
                }
            }
        }

    }
    
    let treeCount = 0
    let yardCount = 0
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            if (field[y][x] == Space.WOODED) treeCount++
            if (field[y][x] == Space.YARD) yardCount++
        }
    }
    console.log(treeCount*yardCount)
}

export async function taskTwo(input: string[]): Promise<void> {
    const field = input.map(j => j.split('').map(i => {
        if (i == '.') return Space.ACRE
        if (i == '|') return Space.WOODED
        if (i == '#') return Space.YARD
        throw i
    }))

    const V = new Map<string, number>
    let firstOccurrance = 0
    let secondOccurance = 0
    for (let c = 0; c < 1000000000 ; c++) {
        const neighbours = field.map((r, y) => r.map((_,x) => {
            const map = {[Space.ACRE]:0, [Space.WOODED]:0, [Space.YARD]:0}
            // console.log(y, field.length, x, field[0].length)
            for (let yD = Math.max(0, y - 1); yD < Math.min(y+2, field.length); yD++) {
                for (let xD = Math.max(0, x-1); xD < Math.min(x+2, field[0].length); xD++) {
                    if (xD == x && yD == y) continue
                    map[field[yD][xD]]++
                }
            }
            return map
        }))
        for (let y = 0; y < field.length; y++) {
            for (let x = 0; x < field[0].length; x++) {
                const n = neighbours[y][x]
                if (field[y][x] == Space.ACRE && n[Space.WOODED] >= 3) {
                    field[y][x] = Space.WOODED
                }
                else if (field[y][x] == Space.WOODED && n[Space.YARD] >= 3) {
                    field[y][x] = Space.YARD
                }
                else if (field[y][x] == Space.YARD) {
                    if (!(n[Space.YARD] >= 1 && n[Space.WOODED] >= 1)) {
                        field[y][x] = Space.ACRE
                    }
                }
            }
        }
        const k = JSON.stringify(field)
        if (V.has(k)) {
            firstOccurrance = V.get(k)!
            secondOccurance = c
            break
        }
        V.set(k, c)
    }

    let toGo = 1000000000 - secondOccurance
    const perLoop = secondOccurance - firstOccurrance
    const iters = Math.floor(toGo / perLoop)
    let cur = secondOccurance + iters * perLoop + 1

    for (let c = cur; c < 1000000000 ; c++) {
        const neighbours = field.map((r, y) => r.map((_,x) => {
            const map = {[Space.ACRE]:0, [Space.WOODED]:0, [Space.YARD]:0}
            // console.log(y, field.length, x, field[0].length)
            for (let yD = Math.max(0, y - 1); yD < Math.min(y+2, field.length); yD++) {
                for (let xD = Math.max(0, x-1); xD < Math.min(x+2, field[0].length); xD++) {
                    if (xD == x && yD == y) continue
                    map[field[yD][xD]]++
                }
            }
            return map
        }))
        for (let y = 0; y < field.length; y++) {
            for (let x = 0; x < field[0].length; x++) {
                const n = neighbours[y][x]
                if (field[y][x] == Space.ACRE && n[Space.WOODED] >= 3) {
                    field[y][x] = Space.WOODED
                }
                else if (field[y][x] == Space.WOODED && n[Space.YARD] >= 3) {
                    field[y][x] = Space.YARD
                }
                else if (field[y][x] == Space.YARD) {
                    if (!(n[Space.YARD] >= 1 && n[Space.WOODED] >= 1)) {
                        field[y][x] = Space.ACRE
                    }
                }
            }
        }
    }
    let treeCount = 0
    let yardCount = 0
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            if (field[y][x] == Space.WOODED) treeCount++
            if (field[y][x] == Space.YARD) yardCount++
        }
    }
    console.log(treeCount*yardCount)
}

enum Space {
    ACRE, WOODED, YARD
}

function print(field: Space[][]) {
    for (let y = 0; y < field.length; y++) {
        let r = ''
        for (let x = 0; x < field[0].length; x++) {
            const f = field[y][x]
            if (f == Space.ACRE) r += '.'
            if (f == Space.WOODED) r += '|'
            if (f == Space.YARD) r += '#'
        }
        console.log(r)
    }
}