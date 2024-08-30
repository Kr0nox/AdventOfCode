export async function taskOne(_input: string[]): Promise<void> {
    const input = _input.sort()
    const minutesSleeping: Record<number, number> = {}
    const sleepMins: Record<number, number[]> = {}
    for (let i = 0; i < input.length;) {
        let curNumber = -1
        const r = /#([0-9]+) /.exec(input[i])!
        curNumber = Number(r[1])
        if (!minutesSleeping[curNumber]) {
            minutesSleeping[curNumber] = 0
            sleepMins[curNumber] = Array.from({length: 60}, () => 0)
        }
        i++
        
        while(i < input.length && !input[i].includes('begin')) {
            const r1 = /\[[0-9-]+ [0-9]+:([0-9]+)\]/.exec(input[i])!
            const t1 = Number(r1[1])
            i++
            const r2 = /\[[0-9-]+ [0-9]+:([0-9]+)\]/.exec(input[i])!
            const t2 = Number(r2[1])
            const diff = t2 - t1
            for (let t = t1; t < t2; t++)  sleepMins[curNumber][t]++
            i++
            minutesSleeping[curNumber] += diff
        }
    }
    let max = -1
    let maxID = -1
    const keys = Object.keys(minutesSleeping).map(Number)
    for (const k of keys) {
        if (minutesSleeping[k] > max) {
            max = minutesSleeping[k]
            maxID = k
        }
    }
    let maxT = -1
    let maxTC = -1
    for (let i = 0; i < 60; i++) {
        if (sleepMins[maxID][i] > maxTC) {
            maxTC = sleepMins[maxID][i]
            maxT = i
        }
    }
    console.log(maxID * maxT)
}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input.sort()
    const sleepMins: Record<number, number[]> = {}
    for (let i = 0; i < input.length;) {
        let curNumber = -1
        const r = /#([0-9]+) /.exec(input[i])!
        curNumber = Number(r[1])
        if (!sleepMins[curNumber]) {
            sleepMins[curNumber] = Array.from({length: 60}, () => 0)
        }
        i++
        
        while(i < input.length && !input[i].includes('begin')) {
            const r1 = /\[[0-9-]+ [0-9]+:([0-9]+)\]/.exec(input[i])!
            const t1 = Number(r1[1])
            i++
            const r2 = /\[[0-9-]+ [0-9]+:([0-9]+)\]/.exec(input[i])!
            const t2 = Number(r2[1])
            for (let t = t1; t < t2; t++)  sleepMins[curNumber][t]++
            i++
        }
    }
    const keys = Object.keys(sleepMins).map(Number)
    let max = -1
    let result = -1
    for (const k of keys) {
        for (let i = 0; i < 60; i++) {
            if (sleepMins[k][i] > max) {
                max = sleepMins[k][i] 
                result = i * k
            }
        }
    }
    console.log(result)
    
}