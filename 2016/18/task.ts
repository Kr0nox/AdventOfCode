export async function taskOne(input: string[]): Promise<void> {
    let lastRow = input[0].split("").map(i => i == '.')
    let count = lastRow.filter(i => i).length
    let maxIter = 40
    for (let i = 1; i < maxIter; i++) {
        const newRow = Array.from({length: lastRow.length}, () => true)
        for (let x = 0; x < newRow.length; x++) {
            if (!isSafe(x-1)&&isSafe(x+1) || isSafe(x-1)&&!isSafe(x+1)) newRow[x] = false
        }
        count += newRow.filter(i=>i).length
        lastRow = newRow
    }

    console.log(count)

    function isSafe(x: number) {
        if (x < 0) return true
        if (x >= lastRow.length) return true
        return lastRow[x]
    }

    function print() {
        console.log(lastRow.map(i => i ? '.':'^').join(""))
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let lastRow = input[0].split("").map(i => i == '.')
    let count = lastRow.filter(i => i).length
    let maxIter = 400000
    for (let i = 1; i < maxIter; i++) {
        const newRow = Array.from({length: lastRow.length}, () => true)
        for (let x = 0; x < newRow.length; x++) {
            if (!isSafe(x-1)&&isSafe(x+1) || isSafe(x-1)&&!isSafe(x+1)) newRow[x] = false
        }
        count += newRow.filter(i=>i).length
        lastRow = newRow
    }

    console.log(count)

    function isSafe(x: number) {
        if (x < 0) return true
        if (x >= lastRow.length) return true
        return lastRow[x]
    }
}