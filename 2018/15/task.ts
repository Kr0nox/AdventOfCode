import { JsonSet, Queue } from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const [_0, _1, goblinHealthSum, r] = run(input, 3)
    console.log(r * goblinHealthSum)
}

export async function taskTwo(input: string[]): Promise<void> {
    let curDamage = 3
    let heighestNotWorking = 0
    let lowestWorking = Infinity
    let lastR = NaN
    let lastElfHealth = NaN

    while(lowestWorking - heighestNotWorking > 1) {
        const [success, elfHealthSum, _, r] = run(input, curDamage)
        lastR = r
        lastElfHealth = elfHealthSum

        // calculate new cur
        if (success) {
            if (curDamage < lowestWorking) lowestWorking = curDamage

            curDamage -= Math.ceil(r / curDamage)
        } else {
            if (curDamage > heighestNotWorking) heighestNotWorking = curDamage

            curDamage += Math.floor(r / curDamage)
        }

        // ensure we see a new damage value
        curDamage = Math.min(curDamage, lowestWorking - 1)
        curDamage = Math.max(heighestNotWorking+1, curDamage)
    }
    console.log(lastR * lastElfHealth)
}

function run(input: string[], elvesDamage: number): [boolean, number, number, number] {
    const field = input.map(i => i.split(''))

    interface Person {
        team: 'E'|'G'
        attack: number
        health: number
        x: number
        y: number
        o: number
    }
    let o = 0

    const persons: Person[] = []
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] == 'E' || field[y][x] == 'G') {
                persons.push({
                    x,y,o,
                    health: 200,
                    attack: field[y][x] == 'E' ? elvesDamage : 3,
                    team: field[y][x] as 'E'|'G'
                })
                o++
            }
        }
    }

    let end = false
    let r = 0
    while (true) {
        persons.sort((a,b) => {
            if (a.y == b.y) return a.x < b.x ? -1:1
            return a.y < b.y ? -1:1
        })
        for (const p of persons) {
            // skip dead
            if (p.health <= 0) continue

            // check if enemies remain
            if (persons.filter(g => g.team != p.team && g.health > 0).length == 0) {
                end = true
                break;
            }

            // check if enemy is adjacent and attack
            let found = attack(p)
            if (found) continue

            // movement
            const allGoals: [number, number][] = []
            for (const e of persons) {
                if (e.team == p.team) continue
                if (e.health <= 0) continue
                for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
                    if (field[e.y+dir[1]][e.x+dir[0]] == '.') {
                        allGoals.push([e.x+dir[0],e.y+dir[1]])
                    }
                }
            }

            const closest = findClosest(p.x, p.y, allGoals)
            if (closest == null) {
                continue
            } 
            const next = getNextStep(p.x, p.y, closest[0], closest[1])
            field[p.y][p.x] = '.'
            p.x = next[0]
            p.y = next[1]
            field[p.y][p.x] = p.team   

            // combat again
            attack(p)
        }
        if (end) break
        r++
    }
    return [persons.filter(i => i.team == 'E').every(e => e.health > 0), 
        persons.filter(i => i.team == 'E' && i.health > 0).map(i => i.health).reduce((a,b) => a+b,0), 
        persons.filter(i => i.team == 'G' && i.health > 0).map(i => i.health).reduce((a,b) => a+b,0),
        r
    ]

    function attack(p: Person) {
        let min = Infinity
        let minP: Person|null = null
        for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
            const f = field[p.y + dir[1]][p.x + dir[0]]
            if (f == '.' || f == '#') continue
            if (f != p.team) {
                const e = persons.filter(g => g.team != p.team && g.x == (p.x + dir[0]) && g.y == (p.y + dir[1]))[0]
                if (e.health <= 0) continue
                if (e.health < min) {
                    min = e.health
                    minP = e
                }
            }
        }
        if (minP == null) return false

        minP.health -= p.attack
        if (minP.health <= 0) {
            field[minP.y][minP.x] = '.'
        }
        return minP != null
    }

    function findClosest(x: number, y: number, goals: [number, number][]) {
        const Q: Queue<[number, number]> = new Queue()
        const V: JsonSet<[number, number]> = new JsonSet()
        Q.push([x,y])
        while(!Q.isEmpty()) {
            const q = Q.pop()
            if (V.has(q)) continue
            if (goals.some(a => a[0] == q[0] && a[1] == q[1])) {
                return q
            }
            V.add(q)
            for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
                if (field[q[1]+dir[1]][q[0]+dir[0]] == '.') {
                    Q.push([q[0]+dir[0],q[1]+dir[1]])
                }
            }
        }
        return null
    }

    function getNextStep(curX: number, curY: number, goalX: number, goalY: number) {
        function n(x: number, y:number) {return `${x}|${y}`}
        const M: Map<string, number> = new Map()
        const Q: Queue<[number, number]> = new Queue()
        const V: JsonSet<[number, number]> = new JsonSet()
        Q.push([goalX, goalY])
        M.set(n(goalX, goalY), 0)
        while(!Q.isEmpty()) {
            while(!Q.isEmpty()) {
                const q = Q.pop()
                if (V.has(q)) continue
                if (q[0] == curX && q[1] == curY) {
                    let min = Infinity
                    for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
                        const m = M.get(n(q[0]+dir[0],q[1]+dir[1]))
                        if (m == undefined) continue
                        if (m < min) min = m
                    }
                    for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
                        const m = M.get(n(q[0]+dir[0],q[1]+dir[1]))
                        if (m == undefined) continue
                        if (m == min) return [q[0]+dir[0],q[1]+dir[1]]
                    }
                    console.log(curX, curY, goalX, goalY, min, M)
                    throw "Could not find length of closest point"

                }
                V.add(q)
                const m = M.get(n(q[0],q[1]))!
                for (const dir of [[0,-1],[-1,0],[1,0],[0,1]]) {
                    if (field[q[1]+dir[1]][q[0]+dir[0]] == '.' || (q[1]+dir[1] == curY && q[0]+dir[0] == curX)) {
                        if (V.has([q[0]+dir[0],q[1]+dir[1]])) {
                            continue
                        }
                        Q.push([q[0]+dir[0],q[1]+dir[1]])
                        M.set(n(q[0]+dir[0],q[1]+dir[1]), m+1)
                    }
                }
            }
        }
        console.log(curX, curY, goalX, goalY, M)
        throw "Could not find length of closest point 2"
    }

    function print() {
        field.forEach(i => console.log(i.join('')))
    }
}
