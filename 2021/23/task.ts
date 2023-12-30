export async function taskOne(input: string[]): Promise<void> {
    const u: Universe = {
        cost: 0,
        way: Array.from({length: 11}, ()=>undefined),
        rooms: Array.from({length: 4},()=>[undefined, undefined])
    }
    const cost: Record<string, number> = {
        'A': 1, 'B': 10, 'C': 100, 'D': 1000
    }
    for (let i = 0; i < 4; i++) {
        const j = 2*i+3
        const n1 = input[2][j]
        const n2 = input[3][j]
        u.rooms[i] = [{
            name: n1,
            cost: cost[n1],
            movedOut: false
        }, {
            name: n2,
            cost: cost[n2],
            movedOut: false
        }]
    }
    make(u)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Universe {
    way: AmpT[]
    rooms: [AmpT, AmpT][]
    cost: number
}

interface Amp {
    name: string
    movedOut: boolean
    cost: number
}

type AmpT = Amp|undefined

const validPlaces = [true, true, false, true, false, true, false, true, false, true, true]
const roomIndex = [-1,-1,0,-1,1,-1,2,-1,3,-1,-1]

function make(_u: Universe) {
    const queue: Universe[] = [_u]
    const dup: Set<string> = new Set([JSON.stringify(_u)])
    let best = 2*1000*11
    function add(u: Universe) {
        const j = JSON.stringify(u)
        if (dup.has(j)) return
        queue.push(u)
        dup.add(j)
    }

    while(queue.length > 0) {
        const q = queue.shift() as Universe
        console.log(queue.length, best)
        print(q)
        if (isFinished(q)) {
            if (q.cost < best) best = q.cost
        }
        if (q.cost >= best) continue

        for (let i = 0; i < q.rooms.length; i++) {
            const c = copy(q)
            if (c.rooms[i][0] != undefined) {
                if ((c.rooms[i][0] as Amp).movedOut) continue
                (c.rooms[i][0] as Amp).movedOut = true
                c.way[roomIndex.indexOf(i)] = c.rooms[i][0]
                c.cost += c.rooms[i][0]?.cost??0
                c.rooms[i][0] = undefined
            } else if (c.rooms[i][1] != undefined) {
                if ((c.rooms[i][1] as Amp).movedOut) continue
                (c.rooms[i][1] as Amp).movedOut = true
                c.way[roomIndex.indexOf(i)] = c.rooms[i][1]
                c.cost += 2*(c.rooms[i][1]?.cost??0)
                c.rooms[i][1] = undefined
            } else {
                continue
            }
            add(c)
        }

        // Move all 
        for (let i = 0; i < q.way.length; i++) {
            if (q.way[i] == undefined) continue

            function insert(index: number, wayIndex: number): Universe|undefined {
                if (q.rooms[index][0] != undefined) return undefined
                if (q.rooms[index][1] != undefined || q.rooms[index][1]?.name != q.way[wayIndex]?.name) return undefined

                const c = copy(q)
                c.cost += (Math.abs(roomIndex.indexOf(index)-wayIndex) + 1) * (c.way[wayIndex]?.cost??0)
                if (c.rooms[index][1] == undefined) {
                    c.cost += (c.way[wayIndex]?.cost??0)
                    c.rooms[index][1] = c.way[wayIndex]
                } else {
                    c.rooms[index][0] = c.way[wayIndex]
                }
                c.way[wayIndex] = undefined
                add(c)
            }

            for (let j = i-1; j >= 0; j--) {
                if (q.way[j] != undefined) break
                if (roomIndex[j] >= 0) insert(roomIndex[j], i)
                if (!validPlaces[j]) continue 
                const c = copy(q)
                c.way[j] = c.way[i]
                c.way[i] = undefined
                c.cost += (c.way[j]?.cost??0) * (i-j)
                add(c)
            }
            for (let j = i+1; j < q.way.length; j++) {
                if (q.way[j] != undefined) break
                if (roomIndex[j] >= 0) insert(roomIndex[j], i)
                if (!validPlaces[j]) continue 
                const c = copy(q)
                c.way[j] = c.way[i]
                c.way[i] = undefined
                c.cost += (c.way[j]?.cost??0) * (j-i)
                add(c)
            }

            
        }

        
    }
    console.log(best)

}

function isFinished(u: Universe) {
    if (u.way.map(i => i != undefined).reduce((a,b)=> a||b, false)) return false
    return u.rooms.map(i => i[0] != undefined && i[0].name == i[1]?.name).reduce((a,b) => a&&b, true)
}

function copy(u: Universe): Universe {
    return {
        way: u.way.map(i => {return i != undefined ? {...i} as Amp: undefined}),
        cost: u.cost,
        rooms: u.rooms.map(j => j.map(i => {return i != undefined ? {...i} as Amp: undefined}) as [AmpT,AmpT])
    }
}

function print(u: Universe) {
    /*
    #############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
    */
    console.log('#############')
    console.log('#' + u.way.map(i => i==undefined?'.':i.name).join('') + ' #')
    console.log('###' + u.rooms.map(i => i[0]==undefined?'.':i[0].name).join('#') + '###')
    console.log('  #' + u.rooms.map(i => i[0]==undefined?'.':i[0].name).join('#') + '#')
    console.log('  #########')
    console.log(' ')
}