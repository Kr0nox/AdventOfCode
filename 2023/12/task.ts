function getNumbers(s: string) {
    return s
      .split(",")
      .filter((x) => x != "")
      .map((x) => parseInt(x.trim()));
  }

export async function taskOne(input: string[]): Promise<void> {
    const _in = input.map(i => i.split(" ", 2))
    const rows = _in.map(i => i[0].trim()).map(i => i.split(""))
    const nums = _in.map(i => i[1].trim()).map(getNumbers)
    const qs = rows.map(r => r.filter(s => s == '?').length)

    const perms = qs.map(q => getPermutations(q)).map((per, i) => per.map(p => replace(Array.from(rows[i]), p)).filter(p => checkPossible(p, nums[i])))
    console.log(perms.map(p => p.length).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    const _in = input.map(i => i.split(" ", 2))
    const rows = _in.map(i => i[0].trim()).map(i => i.split("")).map(r => repeatArray(r, '?'))
    const nums = _in.map(i => i[1].trim()).map(getNumbers).map(n => repeatArray(n))
    let sum = 0
    for (let i = 0; i < rows.length; i++) {
        sum += DP(nums[i], rows[i])
    }
    console.log(sum)
}

function repeatArray<T>(arr: T[], delimiter?: T) {
    if (!delimiter) {
        return arr.concat(arr).concat(arr).concat(arr).concat(arr)
    }
    return [...arr, delimiter, ...arr, delimiter, ...arr, delimiter, ...arr, delimiter, ...arr]
}

interface State {
    rowIndex: number
    numIndex: number
    blockLength: number
}

function DP(nums: number[], row: string[]) {
    const dp: (number|undefined)[][][] = Array.from({length: row.length + 1}, () => Array.from({length: nums.length + 1}, () => Array.from({length: row.length + 1}, () => undefined)))

    function step(state: State) {
        if (dp[state.rowIndex][state.numIndex][state.blockLength] != undefined) {
            return dp[state.rowIndex][state.numIndex][state.blockLength] as number
        }
        // end of row reached
        if (state.rowIndex == row.length) {
            if (state.numIndex == nums.length) {
                return state.blockLength == 0 ? 1 : 0
            } else if (state.numIndex == nums.length - 1) {
                return state.blockLength == nums[state.numIndex] ? 1 : 0
            } else {
                return 0
            }
        }

        // With a ? we try the option for both . and #
        let res = 0
        if (row[state.rowIndex] == '?' || row[state.rowIndex] == '.') {
            if (state.numIndex < nums.length && state.blockLength == nums[state.numIndex]) {
                // We have reached the end of the block
                res += step({rowIndex: state.rowIndex + 1, numIndex: state.numIndex + 1, blockLength: 0})
            } else if (state.blockLength == 0) {
                // Not inside a block. If length > 0 then we are inside a not completed block (if it was completed block above). Just go to next symbol
                res += step({rowIndex: state.rowIndex + 1, numIndex: state.numIndex, blockLength: 0})
            }
        }
        if (row[state.rowIndex] == '?' || row[state.rowIndex] == '#') {
            // extend current block
            res += step({rowIndex: state.rowIndex + 1, numIndex: state.numIndex, blockLength: state.blockLength + 1})
        }
        dp[state.rowIndex][state.numIndex][state.blockLength] = res
        return res
    }

    const res = step({rowIndex: 0, numIndex: 0, blockLength: 0})
    return res
}


function getPermutations(count: number) {
    if (count == 0) {
        return []
    }
    let perms = ['.', '#']
    for (let i = 1; i < count; i++) {
        const copy1 = Array.from(perms).map(s=> s + ".")
        const copy2 = Array.from(perms).map(s=> s + "#")
        perms = [...copy1, ...copy2]
    }
    return perms.map(s => s.split(""))
}

function replace(row: string[], perm: string[]) {
    let j = 0;
    for (let i = 0; i < row.length; i++) {
        if (row[i] == '?') {
            row[i] = perm[j]
            j++
        }
    }
    return row
}

function checkPossible(row: string[], nums: number[]) {
    const comps = row.join("").split(".").filter(s => s != "." && s!= '').map(s => s.length)
    
    return comps.length == nums.length && comps.every((val, i) => val == nums[i])

}