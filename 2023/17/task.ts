export async function taskOne(input: string[]): Promise<void> {
    task(input, 0, 3)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, 4, 10)
}

function task(input: string[], minStraightLen: number, maxStraightLen: number) {
    const graph = input.map(i => i.split("")).map(r => r.map(c => parseInt(c)))
    const g = algo(graph, minStraightLen, maxStraightLen)
    let min = Infinity
    for (let d of (['X','Y'] as Dir[])) {
        if (g[g.length-1][g[0].length-1][d] < min) 
            min = g[g.length-1][g[0].length-1][d]
    }
    console.log(min)
}

type Dir = 'X'|'Y'

interface Step {
    x: number
    y: number
    d: Dir
}

function algo(g: number[][], minStraightLen: number, maxStraightLen: number) {
    const d: Record<Dir, number>[][] = Array.from({length: g.length}, ()=> Array.from({length:g.length}, () =>{return{'X':Infinity,'Y':Infinity}}))
    d[0][0] = {'X':0,'Y':0}
    const Qu: Step[] = [{x:0,y:0,d:'X'},{x:0,y:0,d:'Y'}]
    while (Qu.length > 0) {
        const q = Qu.shift() as Step
        for (const dir of [1,-1]) {
            let nX = q.x
            let nY = q.y
            let temp = d[q.x][q.y][q.d]
            const di = q.d == 'X' ? 'Y':'X'
            for (let i = 1; i <= maxStraightLen; i++) {
                if (di == 'X') nX += dir
                if (di == 'Y') nY += dir
                if (nX < 0 || nY < 0 || nX >= g.length || nY >= g[0].length) break
                temp += g[nX][nY]
                if (i < minStraightLen) continue
                if(temp < d[nX][nY][di]) {
                    d[nX][nY][di] = temp
                    Qu.push({
                        x: nX,
                        y:nY,
                        d: di
                    })
                }
            }
        }
    }
    return d
}
