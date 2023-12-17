export async function taskOne(input: string[]): Promise<void> {
    const graph = input.map(i => i.split("")).map(r => r.map(c => parseInt(c)))
    const g = algo1(graph)
    let min = Infinity
    for (let d of Dirs) {
        for (let i = 0; i <=3; i++) {
            if (g[g.length-1][g[0].length-1][d][i as DirLen1] < min) {
                min = g[g.length-1][g[0].length-1][d][i as DirLen1]
            }
        }
    }
    console.log(min)
}

export async function taskTwo(input: string[]): Promise<void> {
    const graph = input.map(i => i.split("")).map(r => r.map(c => parseInt(c)))
    const g = algo2(graph)
    let min = Infinity
    for (let d of Dirs) {
        for (let i = 4; i <=10; i++) {
            if (g[g.length-1][g[0].length-1][d][i as DirLen1] < min) {
                min = g[g.length-1][g[0].length-1][d][i as DirLen1]
            }
        }
    }
    console.log(min)
}


type Dir = 'X+'|'X-'|'Y+'|'Y-'
const Dirs : Dir[] = ['X+', 'X-', 'Y+', 'Y-']
type DirLen1 = 0|1|2|3


const EMPTY_LENS = {0:Infinity, 1:Infinity, 2:Infinity,3:Infinity}
const NULL_LENS = {0:0, 1:Infinity, 2:Infinity, 3:Infinity}

interface Step1 {
    x: number
    y: number
    d: Dir
    l: DirLen1
}


function algo1(g: number[][]) {
    const d: Record<Dir, Record<DirLen1, number>>[][] = Array.from({length: g.length}, ()=> Array.from({length:g.length}, () =>{return{'X+':{...EMPTY_LENS},'X-':{...EMPTY_LENS},'Y-':{...EMPTY_LENS},'Y+':{...EMPTY_LENS}}}))
    d[0][0] = {'X+':{...NULL_LENS},'X-':{...NULL_LENS},'Y-':{...NULL_LENS},'Y+':{...NULL_LENS}}
    const Qu: Step1[] = [{x:0,y:0,d:'X+',l:0}]
    while (Qu.length > 0) {
        const q = Qu.shift() as Step1
        for (const dir of Dirs) {
            if (q.d == dir && q.l >= 3) continue
            if (opp[dir] == q.d) continue
            const nX = q.x+dirX[dir]
            const nY = q.y+dirY[dir]
            if (nX < 0 || nY < 0 || nX >= g.length || nY >= g[0].length) continue
            const temp = d[q.x][q.y][q.d][q.l] + g[nX][nY]
            const nextLen = (q.d == dir ? q.l+1 : 1) as DirLen1
            if (temp < d[nX][nY][dir][nextLen]) {
                d[nX][nY][dir][nextLen] = temp
                Qu.push({
                    x: nX,
                    y:nY,
                    d: dir,
                    l: nextLen
                })
            }
        }
    }
    return d
}

type DirLen2 = 0|1|2|3|4|5|6|7|8|9|10
interface Step2 {
    x: number
    y: number
    d: Dir
    l: DirLen2
}

function getInifinite2() {
    const r: Record<number, number> = {}
    for (let i = 0; i <= 10; i++) {
        r[i] = Infinity
    }
    return r as Record<DirLen2, number>
}
function getStart2() {
    const r = getInifinite2()
    r[0] = 0;
    return r
}

function algo2(g: number[][]) {
    const d: Record<Dir, Record<DirLen2, number>>[][] = Array.from({length: g.length}, ()=> Array.from({length:g.length}, () =>{return{'X+':getInifinite2(),'X-':getInifinite2(),'Y-':getInifinite2(),'Y+':getInifinite2()}}))
    d[0][0] = {'X+':getStart2(),'X-':getStart2(),'Y-':getStart2(),'Y+':getStart2()}
    const Qu: Step2[] = [{x:0,y:0,d:'X+',l:0},{x:0,y:0,d:'Y+',l:0},{x:0,y:0,d:'X-',l:0},{x:0,y:0,d:'Y-',l:0}]
    while (Qu.length > 0) {
        const q = Qu.shift() as Step2
        for (const dir of Dirs) {
            if (q.d == dir && q.l >= 10) continue
            if (q.d != dir && q.l < 4) continue
            if (opp[dir] == q.d) continue
            const nX = q.x+dirX[dir]
            const nY = q.y+dirY[dir]
            if (nX < 0 || nY < 0 || nX >= g.length || nY >= g[0].length) continue
            const temp = d[q.x][q.y][q.d][q.l] + g[nX][nY]
            const nextLen = (q.d == dir ? q.l+1 : 1) as DirLen2
            if (temp < d[nX][nY][dir][nextLen]) {
                d[nX][nY][dir][nextLen] = temp
                Qu.push({
                    x: nX,
                    y:nY,
                    d: dir,
                    l: nextLen
                })
            }
        }
    }
    return d
}

const dirX = {
    'X+': 1, 'X-': -1, 'Y+': 0, 'Y-':0
}

const dirY = {
    'X+': 0, 'X-': 0, 'Y+': 1, 'Y-':-1
}

const opp = {
    'X+': 'X-', 'X-': 'X+', 'Y+': 'Y-', 'Y-':'Y+'
}

