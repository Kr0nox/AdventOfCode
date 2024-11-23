export async function taskOne(input: string[]): Promise<void> {
    const nums = input.map(Number).sort((a,b) => a-b)
    let d1 = 0
    let d3 = 0
    for (let i = 0; i < nums.length - 1; i++) {
        let d = nums[i+1]-nums[i]
        if (d == 1) d1++
        if (d == 3) d3++
    }
    d3++
    if (nums[0] == 1) d1++
    if (nums[0] == 3) d3++
    console.log(d1*d3)
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input.map(Number)
    nums.push(0)
    nums.sort((a,b) => a-b)

    const prevCount = {} as Record<number, number>

    prevCount[0] = 1

    console.log(getPrevCount(nums.length - 1))
    

    function getPrevCount(i: number): number {
        const n = nums[i]
        if (prevCount[n] != undefined) {
            return prevCount[n]
        } 
        let s = 0
        for (let j = i-1; j >= 0; j--) {
            if (n - nums[j] > 3) break
            s += getPrevCount(j)
        }
        prevCount[n] = s
        return s
    }
}