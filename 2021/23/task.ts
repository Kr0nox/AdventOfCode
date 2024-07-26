import {Queue, Stack, PriorityQueue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const energyMap: Record<string, number> = {
        'A': 1, 'B': 10, 'C': 100, 'D': 1000
    }
    const sorting = ['A', 'B', 'C', 'D']
    const goalCol: Record<string, number> = {'A':0, 'B':1, 'C':2, 'D':3}
    const holeIndexInWalkway = [2,4,6,8]
    const allowedMovementWalkwayPlace = Array.from({length: 11}, (_,i) => !holeIndexInWalkway.includes(i))

    const Q: PriorityQueue<State> = new PriorityQueue()
    const initialState: State = {
        energyUsed: 0,
        walkWay: Array.from({length: 11}, () => null),
        holes: [{},{},{},{}]
    }
    for (let i = 0; i < 4; i++) {
        const x = 3 + i*2
        initialState.holes[i].top = input[2][x]
        initialState.holes[i].bottom = input[3][x]
    }
    Q.insert(0, initialState)
    console.log(initialState)
    let min = Infinity
    const V = new Map<string, number>()

    while(!Q.isEmpty()) {
        const state = Q.pop()!
        // Prune
        if (state.energyUsed >= min) continue

        if (min <= 25311) {
            console.log(state)
        }


        // check if state is final
        let final = true
        for (let i = 0; i < 4; i++) {
            if (state.holes[i].top != sorting[i]) final = false
            if (state.holes[i].bottom != sorting[i]) final = false
        }
        if (final) {
            console.log(final, min)
            if (state.energyUsed < min) min = state.energyUsed
            continue
        }

        // move on walkway
        for (let i = 0; i < state.walkWay.length; i++) {
            if (state.walkWay[i] == null) continue
            const amp = state.walkWay[i]!
            
            // check that we can move into destination
            const goalI = goalCol[amp]
            const goalHole = state.holes[goalI]
            if (goalHole.top != undefined || (goalHole.bottom != undefined && goalHole.bottom != amp)) continue

            // Check that way is free to hole
            const goalInWalkway = holeIndexInWalkway[goalI]
            const dir = Math.sign(goalInWalkway - i)
            let wayIsFree = true
            for (let j = i+dir; j != goalInWalkway; j += dir) {
                if (state.walkWay[j] != null) wayIsFree = false
            }
            if (!wayIsFree) continue

            // move into new hole
            let energyUsed = Math.abs(goalInWalkway - i)
            energyUsed += goalHole.bottom == undefined ? 2 : 1
            energyUsed *= energyMap[amp]
            const newState = copy(state)
            newState.energyUsed += energyUsed
            newState.walkWay[i] = null
            if (goalHole.bottom == undefined) {
                newState.holes[goalI].bottom = amp
            } else {
                newState.holes[goalI].top = amp
            }
            add(newState)
        }

        // move out of hole
        for (let i = 0; i < 4; i++) {
            const hole = state.holes[i]
            if (hole.bottom == sorting[i] && hole.top == sorting[i]) continue
            if (hole.bottom == undefined) continue
            let moveTop = hole.top != undefined
            const amp = moveTop ? hole.top! : hole.bottom!
            for (let g = 0; g < state.walkWay.length; g++) {
                if (!allowedMovementWalkwayPlace[g]) continue
                if (state.walkWay[g] != undefined) continue

                const walkWayInfrontOfHole = holeIndexInWalkway[i]

                // check that way to goal is free
                const dir = Math.sign(g- walkWayInfrontOfHole)
                let isFree = true
                for (let j = walkWayInfrontOfHole+dir; j != g; j+=dir) {
                    if (state.walkWay[j] != null) isFree = false
                }
                if (!isFree) continue

                let energyUsed = Math.abs(g- walkWayInfrontOfHole)
                energyUsed += moveTop ? 1:2
                energyUsed *= energyMap[amp]
                const newState = copy(state)
                newState.energyUsed += energyUsed
                newState.walkWay[g] = amp;
                if (moveTop) {
                    newState.holes[i].top = undefined
                } else {
                    newState.holes[i].bottom = undefined
                }
                add(newState)
            }
        }
    }
    console.log(min)

    function add(state: State) {
        const jsonState: JsonState = {
            holes: state.holes,
            walkWay: state.walkWay
        }
        const key = JSON.stringify(jsonState)
        if (V.has(key)) {
            const val = V.get(key)!
            if (val < state.energyUsed) {
                return
            } else {
                V.set(key, state.energyUsed)
            }
        } else {
            V.set(key, state.energyUsed)
        }

        let h = 0
        for (let i = 0; i < 4; i++) {
            const amp = state.holes[i].top
            if(!amp) continue
            const holesToGo = Math.abs(i) - goalCol[amp]
            h += holesToGo * 2 * energyMap[amp]
        }
        for (let i = 0; i < 4; i++) {
            const amp = state.holes[i].bottom
            if(!amp) continue
            const holesToGo = Math.abs(i - goalCol[amp])
            h += holesToGo * 2 * energyMap[amp]
        }
        for (let i = 0; i < state.walkWay.length; i++) {
            if (state.walkWay[i] == null) continue
            let amp = state.walkWay[i]!
            let distanceToGo = Math.abs(i - holeIndexInWalkway[goalCol[amp]])
            h += distanceToGo * energyMap[amp]
        }

        Q.insert(state.energyUsed + h, state)
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Hole {
    bottom?: string
    top?: string
}

interface JsonState {
    holes: [Hole, Hole, Hole, Hole]
    walkWay: (string|null)[]
}

interface State extends JsonState {
    energyUsed: number
}

function copy<T>(t:T):T {
    return JSON.parse(JSON.stringify(t))
}