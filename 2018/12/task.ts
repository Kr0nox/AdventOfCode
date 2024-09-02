export async function taskOne(input: string[]): Promise<void> {
    let pots: Record<number, boolean> = {}
    let defaultState = false
    function get(i: number) {
        return pots[i] ?? defaultState
    }
    const init = input[0].split(': ')[1].split('')
    for (let i = 0; i < init.length; i++) {
        pots[i] = init[i] == '#'
    }
    let min = 0
    let max = init.length - 1

    const rules: Record<string, boolean> = {}
    for (let i = 2; i < input.length; i++) {
        const r = input[i].split(' => ')
        rules[r[0]] = r[1] == '#'
    }

    function getNew(i: number) {
        let r = ''
        for (let j = i-2; j <= i+2; j++) {
            r += get(j) ? '#':'.'
        }
        return rules[r] ?? false
    }

    for (let c = 0; c < 20; c++) {
        const newState: Record<number, boolean> = {}
        for (let i = min-2; i <= max+2; i++) {
            newState[i] = getNew(i)
        }
        min -= 2
        max += 2
        defaultState = rules[(defaultState ? '#' : '.').repeat(5)]
        pots = newState
    }
    let c = 0
    for (let i = min; i <= max; i++) {
        if (get(i)) c += i
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    let pots: Record<number, boolean> = {}
    let defaultState = false
    function get(i: number) {
        return pots[i] ?? defaultState
    }
    const init = input[0].split(': ')[1].split('')
    for (let i = 0; i < init.length; i++) {
        pots[i] = init[i] == '#'
    }
    let min = 0
    let max = init.length - 1

    const rules: Record<string, boolean> = {}
    for (let i = 2; i < input.length; i++) {
        const r = input[i].split(' => ')
        rules[r[0]] = r[1] == '#'
    }

    function getNew(i: number) {
        let r = ''
        for (let j = i-2; j <= i+2; j++) {
            r += get(j) ? '#':'.'
        }
        return rules[r] ?? false
    }

    function doSteps(C: number) {
        for (let c = 0; c < C; c++) {
            const newState: Record<number, boolean> = {}
            for (let i = min-2; i <= max+2; i++) {
                newState[i] = getNew(i)
            }
            min -= 2
            max += 2
            defaultState = rules[(defaultState ? '#' : '.').repeat(5)]
            pots = newState
        }
    }
    doSteps(999)
    const c1 = evalu()
    doSteps(1)
    const c2 = evalu()

    const GOAL = 50000000000
    const todo = GOAL - 1000
    const final = (c2-c1)*todo + c2
    console.log(c2, c1, c2-c1)
    console.log(final)
    
    function evalu() {
        let c = 0
        for (let i = min; i <= max; i++) {
            if (get(i)) c += i
        }
        return c
    }

    function print(min: number, max: number) {
        let r = ''
        for(let i = min; i <= max; i++) {
            r += get(i) ? '#':'.'
        }
        console.log(r)
    }
}