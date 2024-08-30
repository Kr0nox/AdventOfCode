export async function taskOne(input: string[]): Promise<void> {
    const points = input.map(i => {
        const k = i.split(', ')
        return [Number(k[0]), Number(k[1])]
    })
    let maxX = 0
    let maxY = 0
    for (const p of points) {
        if (p[0]>maxX) maxX = p[0]
        if (p[1]>maxY) maxY = p[1]
    }
    maxX++
    maxY++
    const grid = Array.from({length: maxX}, () => Array.from({length: maxY}, () => -1))

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            let minD = Infinity
            let point = -1
            for (let i = 0; i < points.length; i++) {
                const newD = Math.abs(points[i][0]-x) + Math.abs(points[i][1]-y)
                if (newD == minD) point = -1
                else if (newD < minD) {
                    minD = newD
                    point = i
                } 
            }
            grid[x][y] = point
        }
    }
    const distances = Array.from({length:input.length}, ()=>0)

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            if (grid[x][y] < 0) continue
            distances[grid[x][y]]++
        }
    }

    const inValid = new Set<number>()
    for (let x = 0; x < maxX; x++) {
        if (grid[x][0] >= 0) {
            inValid.add(grid[x][0])
        }
        if (grid[x][maxY-1] >= 0) {
            inValid.add(grid[x][maxY-1])
        }
    }
    for (let y = 0; y < maxY; y++) {
        if (grid[0][y] >= 0) {
            inValid.add(grid[0][y])
        }
        if (grid[maxX-1][y] >= 0) {
            inValid.add(grid[maxX-1][y])
        }
    }
    let maxC = 0
    for (let i = 0; i < input.length; i++) {
        if (inValid.has(i)) continue
        if (distances[i] > maxC) {
            maxC = distances[i]
        }
    }
    console.log(maxC)
}

export async function taskTwo(input: string[]): Promise<void> {
    const D = 10000
    const points = input.map(i => {
        const k = i.split(', ')
        return [Number(k[0]), Number(k[1])]
    })
    let maxX = 0
    let maxY = 0
    for (const p of points) {
        if (p[0]>maxX) maxX = p[0]
        if (p[1]>maxY) maxY = p[1]
    }
    maxX++
    maxY++
    const grid = Array.from({length: maxX}, () => Array.from({length: maxY}, () => false))

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            let d = 0
            for (let i = 0; i < points.length; i++) {
                d += Math.abs(points[i][0]-x) + Math.abs(points[i][1]-y)
            }
            if (d >= D) continue
            grid[x][y] = true
        }
    }
    let c = 0
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            if (grid[x][y]) c++
        }
    }
    console.log(c)
}