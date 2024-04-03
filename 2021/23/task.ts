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
    console.log(u)
    print(u)
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
    //for (let _c = 0; _c < 5; _c++) {
        const q = queue.pop() as Universe
        console.log(queue.length, best)
        print(q)
        if (isFinished(q)) {
            if (q.cost < best) best = q.cost
        }
        if (q.cost >= best) continue

        // Move all 
        for (let i = 0; i < q.way.length; i++) {
            if (q.way[i] == undefined) continue

            for (let j = i-1; j >= 0; j--) {
                if (q.way[j] != undefined) break
                if (!validPlaces[j]) continue 
                const c = copy(q)
                c.way[j] = c.way[i]
                c.way[i] = undefined
                c.cost += (c.way[j]?.cost??0) * (i-j)
                add(c)
            }
            for (let j = i+1; j < q.way.length; j++) {
                if (q.way[j] != undefined) break
                if (!validPlaces[j]) continue 
                const c = copy(q)
                c.way[j] = c.way[i]
                c.way[i] = undefined
                c.cost += (c.way[j]?.cost??0) * (j-i)
                add(c)
            }
        }

        for (let i = 0; i < q.way.length; i++) {
            if (roomIndex[i] < 0) continue
            if (q.way[i] == undefined) continue
            const j = roomIndex[i]
            const c = copy(q)
            if (q.rooms[j][1] == undefined) {
                c.rooms[j][1] = c.way[i]
                c.cost += (c.way[i]?.cost??0)*2
                c.way[i] = undefined
            } else if (q.rooms[j][0] == undefined) {
                if (q.rooms[j][1]?.name != q.way[i]?.name) continue
                c.rooms[j][0] = c.way[i]
                c.cost += (c.way[i]?.cost??0)
                c.way[i] = undefined
            } else continue
            add(c)
        }

        for (let i = 0; i < q.way.length; i++) {
            if (roomIndex[i] < 0) continue
            if (q.way[i] != undefined) continue
            const j = roomIndex[i]
            const c = copy(q)
            if (q.rooms[j][0] != undefined) {
                if (q.rooms[j][0]?.movedOut) continue
                c.way[i] = q.rooms[j][0];
                (c.way[i] as Amp).movedOut = true
                c.cost += c.way[i]?.cost??0
                c.rooms[j][0] = undefined
            } else if(q.rooms[j][1] != undefined) {
                if (q.rooms[j][1]?.movedOut) continue
                c.way[i] = q.rooms[j][1];
                (c.way[i] as Amp).movedOut = true
                c.cost += (c.way[i]?.cost??0)*2
                c.rooms[j][1] = undefined
            } else continue
            add(c)
        }
        
    }
    console.log(best)

}

function isFinished(u: Universe) {
    if (u.way.map(i => i != undefined).reduce((a,b)=> a||b, false)) return false
    if(u.rooms.map(i => i[0] != undefined && i[0].name == i[1]?.name).reduce((a,b) => a&&b, true)) {
        print(u)
        throw u.cost
    }
    return false
        
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
    console.log('  #' + u.rooms.map(i => i[1]==undefined?'.':i[1].name).join('#') + '#')
    console.log('  #########')
    console.log(' ')
}