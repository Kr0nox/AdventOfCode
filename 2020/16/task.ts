export async function taskOne(input: string[]): Promise<void> {
    const ranges: number[][] = []
    let i = 0;
    while(input[i] != "") {
        const r = /[^:]+: ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/.exec(input[i])!
        ranges.push([Number(r[1]), Number(r[2])])
        ranges.push([Number(r[3]), Number(r[4])])
        i++
    }
    i++
    while(input[i] != "") i++
    i++
    i++
    let error = 0
    while(i < input.length) {
        const nums = input[i].split(',').map(Number)
        for (const n of nums) {
            if (!ranges.some(r => n >= r[0] && n <= r[1])) {
                error += n
            }
        }
        i++
    }
    console.log(error)
}

export async function taskTwo(input: string[]): Promise<void> {
    const ranges: number[][] = []
    const classes: Class[] = []
    let i = 0;
    while(input[i] != "") {
        const r = /([^:]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/.exec(input[i])!
        const nC = {
            name: r[1],
            ranges: [
                [Number(r[2]), Number(r[3])],
                [Number(r[4]), Number(r[5])]
            ]
        }
        ranges.push(nC.ranges[0])
        ranges.push(nC.ranges[1])
        classes.push(nC)
        i++
    }
    i++
    i++
    const myTicket = input[i].split(',').map(Number)
    i++
    i++
    i++
    const validTickets: number[][] = []
    while(i < input.length) {
        const nums = input[i].split(',').map(Number)
        let valid = true
        for (const n of nums) {
            if (!ranges.some(r => n >= r[0] && n <= r[1])) {
                valid = false
                break
            }
        }
        if (valid) {
            validTickets.push(nums)
        }
        i++
    }

    const possibilities = Array.from({length: myTicket.length}, () => Array.from(classes))

    while(possibilities.some(p => p.length > 1)) {
        let changes = false
        for (let i = 0; i < possibilities.length; i++) {
            if (possibilities[i].length == 1) {
                const cl = possibilities[i][0]
                for (let j = 0; j < possibilities.length; j++) {
                    if (i == j) continue
                    possibilities[j] = possibilities[j].filter(c => c.name != cl.name)
                }
                continue
            }

            let oldLen = possibilities[i].length
            possibilities[i] = possibilities[i].filter(p => {
                return !validTickets.some(t => {
                    const inside1 = p.ranges[0][0] <= t[i] && p.ranges[0][1] >= t[i]
                    const inside2 = p.ranges[1][0] <= t[i] && p.ranges[1][1] >= t[i]
                    return !(inside1 || inside2)
                })
            })
            if(possibilities[i].length != oldLen) changes = true


            if (possibilities[i].length == 1) {
                changes = true
                const cl = possibilities[i][0]
                for (let j = 0; j < possibilities.length; j++) {
                    if (i == j) continue
                    possibilities[j] = possibilities[j].filter(c => c.name != cl.name)
                }
            }
        }
        if (changes) continue
        
        let occurances: Record<string, number[]> = {}
        classes.forEach(c => occurances[c.name] = [])
        possibilities.forEach((p, idx) => p.forEach(c => occurances[c.name].push(idx)))

        for (const k of Object.keys(occurances)) {
            if (occurances[k].length == 1) {
                if (possibilities[occurances[k][0]].length != 1) {
                    possibilities[occurances[k][0]] = possibilities[occurances[k][0]].filter(c => c.name != k)
                }
            }
        }

    }

    let r = 1
    for (let i = 0; i < myTicket.length; i++) {
        if (possibilities[i][0].name.startsWith("departure")) {
            r *= myTicket[i]
        }
    }
    console.log(r)

    interface Class {
        name: string
        ranges: number[][]
    }
}
