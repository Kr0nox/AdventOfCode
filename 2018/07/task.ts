export async function taskOne(input: string[]): Promise<void> {
    const reqs: Record<string, string[]> = {}
    for (const i of input) {
        const s = i.split(' ');
        // 1, 7
        if (reqs[s[1]] == undefined) reqs[s[1]] = []
        if (reqs[s[7]] == undefined) reqs[s[7]] = []
        reqs[s[7]].push(s[1])
    }
    const keys = Object.keys(reqs).sort()
    console.log(keys)

    let r = ''
    while(r.length < keys.length) {
        for (const k of keys) {
            if (reqs[k].length == 0) {
                r += k
                reqs[k].push('_')
                for (const k2 of keys) {
                    if (reqs[k2].includes(k)) {
                        reqs[k2].splice(reqs[k2].indexOf(k), 1)
                    }
                }

                break;
            }
        }
    }
    console.log(r)
}

export async function taskTwo(input: string[]): Promise<void> {
    const reqs: Record<string, string[]> = {}
    for (const i of input) {
        const s = i.split(' ');
        // 1, 7
        if (reqs[s[1]] == undefined) reqs[s[1]] = []
        if (reqs[s[7]] == undefined) reqs[s[7]] = []
        reqs[s[7]].push(s[1])
    }
    const keys = Object.keys(reqs).sort()
    console.log(keys)

    let r = ''
    let workerTimes = [0,0,0,0,0]
    let workerTasks = ['-', '-','-','-','-']
    const visited = new Set<string>()
    let rots = 0
    while(visited.size < keys.length) {

        for (let i = 0; i < workerTasks.length; i++) {
            workerTimes[i]--
            if (workerTimes[i] > 0) {
                continue
            } else {
                const k = workerTasks[i]
                for (const k2 of keys) {
                    if (reqs[k2].includes(k)) {
                        reqs[k2].splice(reqs[k2].indexOf(k), 1)
                    }
                }
                visited.add(k)
            }
            for (const k of keys) {
                if (reqs[k].length == 0) {
                    console.log(k)
                    reqs[k].push('_')
                    workerTasks[i] = k
                    workerTimes[i] = k.charCodeAt(0) - 'A'.charCodeAt(0) + 61
    
                    break;
                }
            }
        }
        rots++
        
    }
    rots += Math.max(...workerTimes) - 1
    console.log(rots)
}