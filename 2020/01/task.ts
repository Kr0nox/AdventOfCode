export async function taskOne(input: string[]): Promise<void> {
    const nums = input.map(Number)
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] + nums[j] == 2020) console.log(nums[i]*nums[j])
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input.map(Number)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 2020) continue
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] + nums[j] > 2020) continue
            for (let k = j+1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 2020) console.log(nums[i]*nums[j]*nums[k])
            }
        }
    }
}