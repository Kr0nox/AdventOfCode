export async function taskOne(input: string[]): Promise<void> {
    const nums = [3,7]
    const goal = Number(input[0])
    let e1 = 0
    let e2 = 1

    while (nums.length < (goal + 10)) {
        let newS = nums[e1] + nums[e2]
        if (newS >= 10) {
            nums.push(Math.floor(newS / 10))
        }
        nums.push(newS % 10)
        e1 = (e1 + nums[e1] + 1) % nums.length
        e2 = (e2 + nums[e2] + 1) % nums.length
    }

    let r = ''
    for (let i = goal; i < goal + 10; i++) {
        r += nums[i]
    }
    console.log(r)

}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = [3,7]
    const goal = input[0].split('').map(Number)
    let e1 = 0
    let e2 = 1
    let curStart = 2
    let curLen = 0

    while (true) {
        let newS = nums[e1] + nums[e2]
        if (newS >= 10) {
            nums.push(Math.floor(newS / 10))
        }
        nums.push(newS % 10)
        e1 = (e1 + nums[e1] + 1) % nums.length
        e2 = (e2 + nums[e2] + 1) % nums.length

        while((curStart+curLen) < nums.length) {
            if (curLen == 0) {
                if (nums[curStart] == goal[0]) {
                    curLen++
                } else {
                    curStart++
                }
            } else {
                if (nums[curStart+curLen] == goal[curLen]) {
                    curLen++
                } else {
                    curStart++
                    curLen = 0
                }
            }
            if (curLen == goal.length) {
                break
            }
        }
        if (curLen == goal.length) {
            break
        }
    }
    console.log(curStart)
}