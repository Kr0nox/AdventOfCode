export async function taskOne(input: string[]): Promise<void> {
    const ranges = input.map(i => i.split('-').map(Number))

    ranges.sort((a,b)=>(a[0]-b[0]))
    if (ranges[0][0] != 0) {
        console.log(0)
        return
    }
    let firstFree = 0
    for (let i = 0; i < ranges.length-1; i++) {
        firstFree = Math.max(firstFree, ranges[i][1]+1)
        if(firstFree < ranges[i+1][0]) {
            console.log(firstFree)
            return
        }
    }
    console.log(ranges[ranges.length-1][1]+1)
}

export async function taskTwo(input: string[]): Promise<void> {
    const ranges = input.map(i => i.split('-').map(Number))

    ranges.sort((a,b)=>(a[0]-b[0]))
    
    let freeCount = 0
    if (ranges[0][0] != 0) {
        freeCount += ranges[0][0]
        return
    }
    let firstFree = 0
    for (let i = 0; i < ranges.length-1; i++) {
        firstFree = Math.max(firstFree, ranges[i][1]+1)
        if(firstFree < ranges[i+1][0]) {
            freeCount += ranges[i+1][0] - firstFree
        }
        
    }

    const max = 4294967295
    ranges.sort((a,b)=>(b[1]-a[1]))
    if (ranges[0][1] < max) {
        freeCount += max - ranges[0][1]
    }
    
    console.log(freeCount)
}
//3021650