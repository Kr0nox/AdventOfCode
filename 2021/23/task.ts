import { Stack } from '../../base/simpleStructure'

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

    console.log(step(initial))

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
            if (v < minAdd) minAdd = v
        }
        toGoalMap.set(key, minAdd)
        return minAdd
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
                copy.energy += 1 * energy[amphipot]
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

    function getKey(s: State) {
        return JSON.stringify({w:s.walkWay, h:s.holes})
    }

}

export async function taskTwo(input: string[]): Promise<void> {
    const initial: State = {
        walkWay: Array.from({length: 11}, () => undefined),
        energy: 0,
        holes: [
            [input[2][3], 'D', 'D', input[3][3]],
            [input[2][5], 'C', 'B', input[3][5]],
            [input[2][7], 'B', 'A', input[3][7]],
            [input[2][9], 'A', 'C', input[3][9]],
        ]
    }


    const toGoalMap = new Map<string, number>()

    const walkWayAllowed = [true, true, false, true, false, true, false, true, false, true, true]
    const goalHoles = {'A':0,'B':1,'C':2,'D':3} as Record<string, number>
    const energy = {'A':1,'B':10,'C':100,'D':1000} as Record<string, number>
    const holeEntry = [2,4,6,8]
    const desiredAmphipot = ['A','B','C','D']

    //console.log(step(initial))

    const Q = new Stack<State>()
    Q.push(initial)
    let curMin = Infinity

    while(!Q.isEmpty()) {
        const q = Q.pop()
        if (q.energy > curMin) continue

        const key = getKey(q)
        if (toGoalMap.has(key)) {
            const old = toGoalMap.get(key)!
            if (old <= q.energy) {
                continue
            } else {
                toGoalMap.set(key, q.energy)
            }
        } 
        if (isFinal(q)) {
            const total = q.energy
            console.log('final', total)
            if (total < curMin) {
                toGoalMap.set(key, total)
                curMin = total
            }
            continue
        }
        if (q.energy + heruristic(q) > curMin) continue

        const nextSteps = getNextStates(q)
        for (const s of nextSteps) {
            Q.push(s)
        }
    }

    console.log(curMin)

    interface State {
        walkWay: (string|undefined)[]
        holes: (string|undefined)[][]
        energy: number
    }

    
    function getNextStates(state: State): State[] {
        const newStates: State[] = []
    
        // Check if anyone can go in their hole
        for (let i = 0; i < state.walkWay.length; i++) {
            if (state.walkWay[i] == undefined) continue
            const amphipot = state.walkWay[i]!
            const goalHole = goalHoles[amphipot]
    
            // if there is another amphipot in any position in the hole, we can not fill it
            let foundWrongAmphi = false
            for (let d = 0; d < state.holes[goalHole].length; d++) {
                if (state.holes[goalHole][d] != undefined && state.holes[goalHole][d] != amphipot) {
                    foundWrongAmphi = true
                    break
                }
            }
            if (foundWrongAmphi) continue
    
            // Check that way is free
            const goalHoleEntry = holeEntry[goalHole]
            const dir = Math.sign(goalHoleEntry-i)
            let canGo = true;
            for (let j = i +dir; j != goalHoleEntry; j += dir) {
                if (state.walkWay[j] != undefined) canGo = false
            }
            if(!canGo) continue
    
            const copy = copyV(state)
            // find lowest free hole
            for (let d = 3; d >= 0; d--) {
                if (state.holes[goalHole][d] == undefined) {
                    copy.holes[goalHole][d] = amphipot
                    copy.energy += (d+1) * energy[amphipot]
                    break;
                }
            }
            copy.walkWay[i] = undefined
            copy.energy += Math.abs(i - goalHoleEntry) * energy[amphipot]
            newStates.push(copy)
        }
    
        // Check if they can leave hole
        for (let i = 0; i < state.holes.length; i++) {
            //skip empty holes
            let foundAmphi = false
            for (let d = 0; d < state.holes[i].length; d++) {
                if (state.holes[i][d] != undefined) {
                    foundAmphi = true
                    break
                }
            }
            if (!foundAmphi) continue
    
            // skip if in correct hole
            let allCorrect = true
            for (let d = 0; d < state.holes[i].length; d++) {
                if (state.holes[i][d] != undefined && state.holes[i][d] != desiredAmphipot[i]) {
                    allCorrect = false
                    break
                }
            }
            if (allCorrect) continue
    
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
                // Move top most ampiphod
                for (let d = 0; d < state.holes[i].length; d++) {
                    if (state.holes[i][d] != undefined) {
                        amphipot = state.holes[i][d]!
                        copy.holes[i][d] = undefined
                        copy.energy += (d+1) * energy[amphipot]
                        break
                    }
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
            for (let d = 0; d < state.holes[i].length; d++) {
                if (state.holes[i][d] != desiredAmphipot[i]) return false
            }
        }
        return true
    }

    function getKey(s: State) {
        return JSON.stringify({w:s.walkWay, h:s.holes})
    }

    function heruristic(state: State) {
        const theoryWalkway = walkWayAllowed.map(i=>[]as string[])
        let h = 0
        for (let i = 0; i < state.walkWay.length; i++) {
            if (state.walkWay[i] != undefined) theoryWalkway[i].push(state.walkWay[i]!)
        }
        for (let i = 0; i < state.holes.length; i++) {
            for (let d = 0; d < state.holes[i].length; d++) {
                let a = state.holes[i][d]
                if (a != undefined) {
                    if(goalHoles[a] == i) continue
                    theoryWalkway[holeEntry[i]].push(a)
                    h += (d+1)*energy[a]
                }
            }
        }
        
        for (let i = 0; i < state.walkWay.length; i++) {
            for (const a of theoryWalkway[i]) {
                h += Math.abs(i - holeEntry[goalHoles[a]]) * energy[a]
            }
        }
        return h
    }
}


function copyV<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}