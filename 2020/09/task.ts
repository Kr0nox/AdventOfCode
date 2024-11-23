export async function taskOne(input: string[]): Promise<void> {
    console.log(findInvalid(input.map(Number)))
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input.map(Number)
    let goal = findInvalid(nums)
    let minI = 0
    let maxI = 1
    let sum = nums[minI] + nums[maxI]
    while(sum != goal) {
        if (sum < goal) {
            maxI++
            sum += nums[maxI]
        } else {
            sum -= nums[minI]
            minI++
        }
    }
    let min = Infinity
    let max = 0
    for (let i = minI; i <= maxI; i++) {
        if (nums[i] < min) min = nums[i]
        if (nums[i] > max) max = nums[i]
    }
    console.log(min + max)
}

function findInvalid(nums: number[]) {
    for (let i = 25; i < nums.length; i++) {
        let found = false
        for (let j = i-25; j < i; j++) {
            if (found) break
            for (let k = j+1; k < i; k++) {
                if (nums[j] == nums[k]) continue
                if (nums[k] + nums[j] == nums[i]) {
                    found = true
                    break
                }
            }
        }
        if (!found) {
            return nums[i]
        }
    }
    throw "all valid"
}