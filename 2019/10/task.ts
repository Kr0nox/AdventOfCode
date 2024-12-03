export async function taskOne(input: string[]): Promise<void> {
    const field = input.map(i => i.split(''))

    let allSlopes: number[][] = []
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            allSlopes.push([y,x])
        }
    }

    let multiples: number[][] = [[0,0]]
    for (const s of allSlopes) {
        for (let d = 2; d < field[0].length; d++) {
            multiples.push(([s[1]*d,s[0]*d]))
        }
    }
    allSlopes = allSlopes.filter(i => multiples.find(x => x[0] == i[0] && x[1] == i[1]) == undefined)
    

    let max = 0
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {

            if (field[y][x] != '#') continue
            let c = 0
            for (const s of allSlopes) c += check(x,y, s[1],s[0])
            if (c > max) {
                max = c
            }
        }
    }
    console.log(max)

    function check(x: number, y: number, xD: number, yD: number) {
        let i = 1
        let c = 0
        while(x + i * xD < input[0].length && y + i * yD < input.length) {
            if (input[y+i*yD][x+i*xD] == '#') {
                c++
                break
            }
            i++
        }
        i = 1
        while(x - i * xD >= 0 && y + i * yD < input.length) {
            if (input[y+i*yD][x-i*xD] == '#') {
                c++
                break
            }
            i++
        }
        i = 1
        while(x + i * xD < input[0].length && y - i * yD >= 0) {
            if (input[y-i*yD][x+i*xD] == '#') {
                c++
                break
            }
            i++
        }
        i = 1
        while(x - i * xD >= 0 && y - i * yD >= 0) {
            if (input[y-i*yD][x-i*xD] == '#') {
                c++
                break
            }
            i++
        }
        return c / (xD == 0 || yD == 0 ? 2 : 1)
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const field = input.map(i => i.split(''))

    let allSlopes: number[][] = []
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            allSlopes.push([y,x])
        }
    }

    let multiples: number[][] = [[0,0]]
    for (const s of allSlopes) {
        for (let d = 2; d < field[0].length; d++) {
            multiples.push(([s[1]*d,s[0]*d]))
        }
    }
    allSlopes = allSlopes.filter(i => multiples.find(x => x[0] == i[0] && x[1] == i[1]) == undefined)
    

    let max = 0
    const station = [-1,-1]
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {

            if (field[y][x] != '#') continue
            let c = 0
            for (const s of allSlopes) {
                const dxs = s[1] == 0 ? [s[1]] : [s[1], -s[1]]
                const dys = s[0] == 0 ? [s[0]] : [s[0], -s[0]]
                for (const dx of dxs) {
                    for (const dy of dys) {
                        if (check(x,y,dx,dy)) c++
                    }
                }

            }
            if (c > max) {
                max = c
                station[1] = x
                station[0] = y
            }
        }
    }

    const nonDuplicateSlopes = allSlopes
    const halfSortedSlopes = [
        ...nonDuplicateSlopes,
        ...nonDuplicateSlopes.map(([y,x]) => [-y,x]).filter(([y,x])=>y !=0 || x != 1)
    ].map(i => {
        if (Math.abs(i[0]) == 0) return [0, i[1]]
        if (Math.abs(i[1]) == 0) return [i[0], 0]
        return i
    }).map(s => {
        const a = Math.atan(s[0] / s[1])
        return {s, a}
    }).sort((a,b) => {
        return a.a < b.a ? 1:-1
    }).map(s => s.s)
    const sortedSlopes = [...halfSortedSlopes, ...halfSortedSlopes.reverse().filter(([y,x])=>Math.abs(y)!=1||x!=0).map(([y,x]) => [y,-x])].map(([y,x])=>[-y,x])

    let slopeIndex = 0
    let removedCount = 0
    let lastMeteor = [-1,-1]
    while(removedCount < 200) {
        while(!check(station[1],station[0],sortedSlopes[slopeIndex][1],sortedSlopes[slopeIndex][0])) {
            slopeIndex++
            if(slopeIndex >= sortedSlopes.length) slopeIndex = 0
        }
        let i = 1
        while (field[station[0]+i*sortedSlopes[slopeIndex][0]][station[1]+i*sortedSlopes[slopeIndex][1]] != '#') {
            i++
        }
        field[station[0]+i*sortedSlopes[slopeIndex][0]][station[1]+i*sortedSlopes[slopeIndex][1]] = '+'
        lastMeteor = [station[0]+i*sortedSlopes[slopeIndex][0],station[1]+i*sortedSlopes[slopeIndex][1]]
        removedCount++
        slopeIndex++
        if(slopeIndex >= sortedSlopes.length) slopeIndex = 0
    }
    console.log(lastMeteor[1]*100+lastMeteor[0])

    function check(x: number, y: number, xD: number, yD: number) {
        let i = 1
        while(x + i * xD < field[0].length && y + i * yD < field.length && x + i * xD >= 0 && y + i * yD >= 0) {
            if (field[y+i*yD][x+i*xD] == '#') {
                return true
            }
            i++
        }
        return false
    }

    function print() {
        for (let y = 0; y < field.length; y++) {
            let r = ''
            for (let x = 0; x < field[y].length; x++) {
                if (y == station[0] && x == station[1]) r += 'X'
                else r += field[y][x]
            }
            console.log(r)
        }
    }
}
