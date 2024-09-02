export async function taskOne(input: string[]): Promise<void> {
    const points = input.map(i => {
        const r = /[^<]*< *([-0-9]+), *([-0-9]+)>[^<]*< *([-0-9]+), *([-0-9]+)>/.exec(i)!
        return {
            x: Number(r[1]),
            y: Number(r[2]),
            vx: Number(r[3]),
            vy: Number(r[4])
        } as Point
    })

    let t = 0
    while(true) {
        const ps = getPointsAtTime(points, t)
        let minY = Infinity
        let maxY = -Infinity
    
        for (const p of ps) {
            if (p.y < minY) minY = p.y
            if (p.y > maxY) maxY = p.y
        } 

        if (maxY - minY < 10) {
            console.log('T: ' + t)
            print(ps)
            break
        }

        t++
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const points = input.map(i => {
        const r = /[^<]*< *([-0-9]+), *([-0-9]+)>[^<]*< *([-0-9]+), *([-0-9]+)>/.exec(i)!
        return {
            x: Number(r[1]),
            y: Number(r[2]),
            vx: Number(r[3]),
            vy: Number(r[4])
        } as Point
    })

    let t = 0
    while(true) {
        const ps = getPointsAtTime(points, t)
        let minY = Infinity
        let maxY = -Infinity
    
        for (const p of ps) {
            if (p.y < minY) minY = p.y
            if (p.y > maxY) maxY = p.y
        } 

        if (maxY - minY < 10) {
            console.log(t)
            break
        }

        t++
    }
}

interface Position {
    x: number, y: number
}

interface Point extends Position {
    vx:number,vy: number
}

function getPointsAtTime(ps: Point[], t: number): Position[] {
    return ps.map(p => {
        return {
            x: p.x + t*p.vx,
            y: p.y + t*p.vy
        }
    })
}

function print(ps: Position[]) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    for (const p of ps) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
        if (p.y < minY) minY = p.y
        if (p.y > maxY) maxY = p.y
    } 
    console.log(minX, maxX, minY, maxY)

    const g = Array.from({length:maxY-minY+1}, () => Array.from({length: maxX-minX+1}, () => false))

    for (const p of ps) {
        g[p.y-minY][p.x-minX] = true
    }

    g.forEach(r => console.log(r.map(i => i ? '#' : ' ').join('')))
}