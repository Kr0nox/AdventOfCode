import {Stack} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const initial: State = {
        walkWay: Array.from({length: 11}, () => undefined),
        energy: 0,
        holes: [
            {top: input[2][3], bottom: input[3][3]},
            {top: input[2][5], bottom: input[3][5]},
            {top: input[2][7], bottom: input[3][7]},
            {top: input[2][9], bottom: input[3][9]},
        ]
    }


    const toGoalMap = new Map<string, number>()
    //const lastVisitedEnergy = new Map<string, number>()

    const t = {
        walkWay: [
          null, 'A',  null,
          null, null, 'B',
          null, null, null,
          null, null
        ],
        energy: 50,
        holes: [
          { bottom: 'A' },
          { top: undefined, bottom: 'B' },
          { top: 'C', bottom: 'C' },
          { top: 'D', bottom: 'D' }
        ]
      } as State
    console.log(step(initial))
    //console.log(toGoalMap)

    function step(q: State) {
        const key = getKey(q)
        if (toGoalMap.has(key)) {
            const rest = toGoalMap.get(key)!
            return rest
        } 
        if (isFinal(q)) {
            return 0
        }

        const nextSteps = getNextStates(q)
        let minAdd = Infinity
        for (const s of nextSteps) {
            let v = s.energy - q.energy + step(s)
            if (s.energy - q.energy < 0) {
                console.log(q)
                console.log(s)
                throw "ner"
            }
            if (v < minAdd) minAdd = v
        }
        toGoalMap.set(key, minAdd)
        return minAdd
    }


    function getKey(s: State) {
        return JSON.stringify({w:s.walkWay, h:s.holes})
    }

}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface State {
    walkWay: (string|undefined)[]
    holes: Hole[]
    energy: number
}

interface Hole {
    bottom?: string
    top?: string
}

const walkWayAllowed = [true, true, false, true, false, true, false, true, false, true, true]
const goalHoles = {'A':0,'B':1,'C':2,'D':3} as Record<string, number>
const energy = {'A':1,'B':10,'C':100,'D':1000} as Record<string, number>
const holeEntry = [2,4,6,8]
const desiredAmphipot = ['A','B','C','D']

function getNextStates(state: State): State[] {
    const newStates: State[] = []

    // Check if anyone can go in their hole
    for (let i = 0; i < state.walkWay.length; i++) {
        if (state.walkWay[i] == undefined) continue
        const amphipot = state.walkWay[i]!
        const goalHole = goalHoles[amphipot]

        // if there is another amphipot in any position in the hole, we can not fill it
        if (state.holes[goalHole].top != undefined && state.holes[goalHole].top != amphipot) continue
        if (state.holes[goalHole].bottom != undefined && state.holes[goalHole].bottom != amphipot) continue

        // Check that way is free
        const goalHoleEntry = holeEntry[goalHole]
        const dir = Math.sign(goalHoleEntry-i)
        let canGo = true;
        for (let j = i +dir; j != goalHoleEntry; j += dir) {
            if (state.walkWay[j] != undefined) canGo = false
        }
        if(!canGo) continue

        const copy = copyV(state)
        // if bottom hole is free use bottom hole
        if (state.holes[goalHole].bottom == undefined) {
            copy.holes[goalHole].bottom = amphipot
            copy.energy += 2 * energy[amphipot]
        } else {
            copy.holes[goalHole].top = amphipot
            state.energy += 1 * energy[amphipot]
        }
        copy.walkWay[i] = undefined
        copy.energy += Math.abs(i - goalHoleEntry) * energy[amphipot]
        newStates.push(copy)
    }

    // Check if they can leave hole
    for (let i = 0; i < state.holes.length; i++) {
        //skip empty holes
        if (state.holes[i].bottom == undefined && state.holes[i].top == undefined) continue

        // skip if in correct hole
        if (state.holes[i].top == undefined) {
            if (state.holes[i].bottom == desiredAmphipot[i]) continue
        } else {
            if (state.holes[i].top == desiredAmphipot[i] && state.holes[i].bottom == desiredAmphipot[i]) continue
        }

        // walk left from hole
        const possibleGoals: number[] = []
        for (let j = holeEntry[i]; j < walkWayAllowed.length; j++) {
            if (state.walkWay[j] != undefined) break
            if (!walkWayAllowed[j]) continue
            possibleGoals.push(j)
        }
        for (let j = holeEntry[i]; j >= 0; j--) {
            if (state.walkWay[j] != undefined) break
            if (!walkWayAllowed[j]) continue
            possibleGoals.push(j)
        }
        for (const goal of possibleGoals) {
            const copy = copyV(state)
            let amphipot = ''
            if (copy.holes[i].top != undefined) {
                amphipot = copy.holes[i].top!
                copy.holes[i].top = undefined
                copy.energy += 1 * energy[amphipot]
            } else {
                amphipot = copy.holes[i].bottom!
                copy.holes[i].bottom = undefined
                copy.energy += 2 * energy[amphipot]
            }
            copy.walkWay[goal] = amphipot
            copy.energy += Math.abs(holeEntry[i] - goal) * energy[amphipot]
            newStates.push(copy)
        }
    }
    return newStates
}

function isFinal(state: State): boolean {
    for (let i = 0; i < state.holes.length; i++) {
        if (state.holes[i].top != desiredAmphipot[i]) return false
        if (state.holes[i].bottom != desiredAmphipot[i]) return false
    }
    return true
}

function copyV<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}