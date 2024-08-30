export async function taskOne(input: string[]): Promise<void> {
    const nums = input[0].split(' ').map(Number)

    let metaDataSum = 0
    function processNode(startIndex: number): number {
        const childCount = nums[startIndex]
        const metaDataCount = nums[startIndex+1]
        let curIndex = startIndex + 2
        if (childCount == 0 && metaDataCount == 0) return curIndex + 1
        for (let i = 0; i < childCount; i++) {
            curIndex = processNode(curIndex)
        }
        for (let i = 0; i < metaDataCount; i++) {
            metaDataSum += nums[curIndex]
            curIndex++
        }
        return curIndex
    }
    processNode(0)
    console.log(metaDataSum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input[0].split(' ').map(Number)

    // value, nextIndex
    function processNode(startIndex: number): [number, number] {
        const childCount = nums[startIndex]
        const metaDataCount = nums[startIndex+1]
        let curIndex = startIndex + 2
        if (childCount == 0 && metaDataCount == 0) return [0, curIndex + 1]
        if (childCount == 0) {
            let s = 0
            for (let i = 0; i < metaDataCount; i++) {
                s += nums[curIndex]
                curIndex++
            }
            return [s, curIndex]
        } else {
            const childValues = Array.from({length: childCount}, () => 0)
            for (let i = 0; i < childCount; i++) {
                const r = processNode(curIndex)
                childValues[i] = r[0]
                curIndex = r[1]
            }
            let s = 0
            for (let i = 0; i < metaDataCount; i++) {
                if (nums[curIndex] > 0 && nums[curIndex] <= childCount) {
                    s += childValues[nums[curIndex]-1]
                }
                curIndex++
            }
            return [s, curIndex]
        }
    }
    console.log(processNode(0)[0])
}