export async function taskOne(input: string[]): Promise<void> {
    const potentialParts = input.map(i => i.split('/').map(Number))
    
    console.log(step(potentialParts.map(i => false), 0))

    function step(used: boolean[], neededPart: number) {
        let max = 0
        for (let i = 0; i < potentialParts.length; i++) {
            if (used[i]) continue
            if (!potentialParts[i].includes(neededPart)) continue

            const copy = Array.from(used)
            copy[i] = true
            const needed = potentialParts[i][0] == neededPart ? potentialParts[i][1] : potentialParts[i][0]
            const newVal = step(copy, needed) + potentialParts[i][0] + potentialParts[i][1]
            if (newVal > max) max = newVal
        }
        return max
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const potentialParts = input.map(i => i.split('/').map(Number))
    
    console.log(step(potentialParts.map(i => false), 0, 0).max)

    function step(used: boolean[], neededPart: number, curLen: number): {len: number, max: number} {
        let max = {len: curLen, max: 0}
        for (let i = 0; i < potentialParts.length; i++) {
            if (used[i]) continue
            if (!potentialParts[i].includes(neededPart)) continue

            const copy = Array.from(used)
            copy[i] = true
            const needed = potentialParts[i][0] == neededPart ? potentialParts[i][1] : potentialParts[i][0]
            let newVal = step(copy, needed, curLen + 1) 
            newVal.max += potentialParts[i][0] + potentialParts[i][1]
            if (newVal.len > max.len) {
                max = newVal
            }
            if (newVal.len == max.len) {
                if (newVal.max > max.max) max = newVal
            }
            
        }
        return max
    }
}