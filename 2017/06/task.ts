export async function taskOne(input: string[]): Promise<void> {
    let state = input[0].split(/ |\t/).map(Number)

    const s = new Set<string>()
    while(!s.has(JSON.stringify(state))) {
        s.add(JSON.stringify(state))
        let maxI = -1
        let max = -1
        for (let i = 0; i < state.length; i++) {
            if (state[i] > max) {
                max = state[i]
                maxI = i
            }
        }
        state[maxI] = 0
        maxI++
        while(max > 0) {
            if (maxI >= state.length) maxI = 0
            state[maxI]++
            maxI++
            max--
        }
    }
    console.log(s.size)
}

export async function taskTwo(input: string[]): Promise<void> {
    let state = input[0].split(/ |\t/).map(Number)

    const s = new Set<string>()
    const m = new Map<string, number>()
    while(!s.has(JSON.stringify(state))) {
        s.add(JSON.stringify(state))
        m.set(JSON.stringify(state), s.size)
        let maxI = -1
        let max = -1
        for (let i = 0; i < state.length; i++) {
            if (state[i] > max) {
                max = state[i]
                maxI = i
            }
        }
        state[maxI] = 0
        maxI++
        while(max > 0) {
            if (maxI >= state.length) maxI = 0
            state[maxI]++
            maxI++
            max--
        }
    }
    console.log(s.size - (m.get(JSON.stringify(state)) ?? 0) + 1)
}