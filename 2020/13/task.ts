export async function taskOne(input: string[]): Promise<void> {
    const time = Number(input[0])
    const busses = input[1].split(',').filter(i => i != 'x').map(Number)
    let min = Infinity
    let minId = 0
    for (const b of busses) {
        let v = Math.ceil(time / b)* b
        if (v < min) {
            min = v
            minId = b
        }
    }
    console.log((min-time) * minId)
}

export async function taskTwo(input: string[]): Promise<void> {
    let busses = input[1].split(',').map((i,idx) => [i,idx] as [string, number]).filter((i: [string, number]) => i[0] != 'x').map((i: [string, number]) => [Number(i[0]), i[1]])
    
    let maxBusN = Math.max(...busses.map(b => b[0]))
    let maxBus = busses.find(b => b[0] == maxBusN)!
    busses = busses.filter(b => b[0] != maxBusN).map(b => [b[0], b[1] - maxBus[1]])

    let validBus: number[][] = []
    let notNeededBus: number[][] = []
    for (const b of busses) {
        if (Math.abs(b[0]) == Math.abs(b[1])) {
            notNeededBus.push(b)
        } else {
            validBus.push(b)
        }
    }
    
    let increase = maxBus[0] * notNeededBus.map(b => b[0]).reduce((a,b) => a*b,1)

    let i = 0
    while(validBus.some(b => checkTiming(b,i))) {
        i += increase
    }
    console.log(i - maxBus[1])

    function checkTiming(b: number[], i: number) {
        let goal = i + b[1]
        if(goal < b[0]) goal += b[0]
        return (i + b[1]) % b[0] != 0
    }
}