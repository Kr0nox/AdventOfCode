export async function taskOne(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(" "))
    const wall: Map<number, Set<number>> = new Map()
    let x = 0
    let y = 0
    wall.set(0, new Set())
    wall.get(0)?.add(0)
    for (const line of input) {
        const d = line[0] as 'U'|'D'|'L'|'R'
        for(let i = 0; i < parseInt(line[1]); i++) {
            x += dirX[d]
            y+= dirY[d]
            if (!wall.has(x)) wall.set(x, new Set())
            wall.get(x)?.add(y)
        }
    }
    let sum = sumMap(wall) + sumMap(fill(wall, [1,1]))
    console.log(sum)

}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(" "))
    let x = 0
    let y = 0
    let sum = 0
    let perim = 0
    for (let i = 0; i < input.length; i += 2) {
        const xLine = input[i]
        const yLine = input[i+1]
        const xDir = dirNum[parseInt(xLine[2].charAt(7)) as 0|1|2|3] as 'U'|'D'|'L'|'R'
        const yDir = dirNum[parseInt(yLine[2].charAt(7)) as 0|1|2|3] as 'U'|'D'|'L'|'R'
        const xLen = parseInt(xLine[2].slice(2, 7), 16)
        const yLen = parseInt(yLine[2].slice(2, 7), 16)

        // Add trench

        x = x + xLen*dirX[xDir]
        y = y + yLen*dirY[yDir]
        const square = (x)*(yLen*dirY[yDir])
        sum += square
        perim += xLen + yLen

    }
    console.log(sum + perim/2+1)
}

interface Wall {
    rootX: number,
    rootY: number,
    length: number
}

function sumMap(m: Map<number, Set<number>>) {
    return Array.from(m.values()).map(i => Array.from(i).length).reduce((a,b)=>a+b,0)
}

const dirNum = {
    0: 'R', 1: 'D', 2: 'L', 3: 'U'
}

const dirX= {
    'R': 1, 'L': -1, 'U': 0, 'D': 0
}
const dirY= {
    'R': 0, 'L': 0, 'U': -1, 'D': 1
}

function fill(coords: Map<number, Set<number>>, start: [number, number]) {
    const visited: Map<number, Set<number>> = new Map()
    const Qu: [number, number][] = [start]

    while(Qu.length > 0) {
        const q = Qu.shift() as [number,number]
        if (visited.has(q[0]) && visited.get(q[0])?.has(q[1])) {continue;}
        if (coords.has(q[0]) && coords.get(q[0])?.has(q[1])) continue
        if(!visited.has(q[0])) visited.set(q[0], new Set())
        visited.get(q[0])?.add(q[1])
        
        Qu.push([q[0],q[1]+1])
        Qu.push([q[0],q[1]-1])
        Qu.push([q[0]+1,q[1]])
        Qu.push([q[0]-1,q[1]])
    }
    return visited
}