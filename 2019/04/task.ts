export async function taskOne(input: string[]): Promise<void> {
    const range = input[0].split('-').map(Number)
    let count = 0
    for (let i = range[0]; i <= range[1]; i++) {
        if (checkValid(i)) count++
    }
    console.log(count)

    function checkValid(n: number) {
        const nums = getNums(n)
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i-1]) return false
        }
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i-1]) return true
        }
        return false
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const range = input[0].split('-').map(Number)
    let count = 0
    for (let i = range[0]; i <= range[1]; i++) {
        if (checkValid(i)) count++
    }
    console.log(count)

    function checkValid(n: number) {
        const nums = getNums(n)
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i-1]) return false
        }
        const c: number[] = []
        let last = nums[0]
        let co = 0
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == last) co++
            else {
                c.push(co)
                co = 1
                last = nums[i]
            }
        }
        c.push(co)
        return c.includes(2)
    }
}



function getNums(n: number): number[] {
    return [100000, 10000, 1000, 100, 10, 1].map(i => Math.floor((n % (i*10)) / i))
}