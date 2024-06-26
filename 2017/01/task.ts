export async function taskOne(input: string[]): Promise<void> {
    const nums = input[0].split('').map(Number)
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == nums[(i+1)%nums.length]) sum += nums[i]
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input[0].split('').map(Number)
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == nums[(i+(nums.length/2))%nums.length]) sum += nums[i]
    }
    console.log(sum)
}