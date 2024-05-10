export async function taskOne(input: string[]): Promise<void> {
    const disks = input.map(i => {
        const r = /Disc #[0-9]+ has ([0-9]+) positions; at time=0, it is at position ([0-9]+)\./.exec(i)
        if (!r) throw i
        return [parseInt(r[1]), parseInt(r[2])]
    })
    let time = 0
    while(true) {
        if (disks.every((_, i) => test(i))) break
        time++
    }   
    console.log(time)

    function test(index: number) {
        return (time + index + 1 + disks[index][1]) % disks[index][0] == 0
    } 
}

export async function taskTwo(input: string[]): Promise<void> {
    const disks = input.map(i => {
        const r = /Disc #[0-9]+ has ([0-9]+) positions; at time=0, it is at position ([0-9]+)\./.exec(i)
        if (!r) throw i
        return [parseInt(r[1]), parseInt(r[2])]
    })
    disks.push([11,0])
    let time = 0
    while(true) {
        if (disks.every((_, i) => test(i))) break
        time++
    }   
    console.log(time)

    function test(index: number) {
        return (time + index + 1 + disks[index][1]) % disks[index][0] == 0
    } 
}