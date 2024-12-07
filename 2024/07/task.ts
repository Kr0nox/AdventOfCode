export async function taskOne(input: string[]): Promise<void> {
    let sum = 0
    for (const i of input) {
        const p = i.split(': ')
        const nums = p[1].split(' ').map(Number)
        const goal = Number(p[0])
        if (t(goal, nums, 1, nums[0])) sum += goal
    }
    console.log(sum)

    function t(goal: number, nums: number[], i: number, cur: number): boolean {
        if (i >= nums.length) return cur == goal
        if (cur > goal) return false
        return t(goal, nums, i+1, cur + nums[i]) || t(goal, nums, i+1, cur * nums[i])
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let sum = 0
    for (const i of input) {
        const p = i.split(': ')
        const nums = p[1].split(' ').map(Number)
        const goal = Number(p[0])
        if (t(goal, nums, 1, nums[0])) sum += goal
    }
    console.log(sum)

    function t(goal: number, nums: number[], i: number, cur: number): boolean {
        if (i >= nums.length) return cur == goal
        if (cur > goal) return false
        return t(goal, nums, i+1, cur + nums[i]) || t(goal, nums, i+1, cur * nums[i]) || t(goal, nums, i+1, Number(cur.toString() + nums[i].toString()))
    }
}