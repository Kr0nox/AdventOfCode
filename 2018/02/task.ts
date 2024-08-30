export async function taskOne(input: string[]): Promise<void> {
    let double = 0
    let tripple = 0

    for (const i of input) {
        const ls = {} as Record<string, number>
        for (const l of i.split('')) {
            if (!ls[l]) ls[l] = 0
            ls[l]++
        }
        let hasD = false
        let hasT = false
        for (const k of Object.values(ls)) {
            if (k == 2) hasD = true
            if (k == 3) hasT = true 
        }
        if (hasD) double++
        if (hasT) tripple++
    }
    console.log(double*tripple)
}

export async function taskTwo(input: string[]): Promise<void> {
    let best: string[] = []
    let bestDiff = Infinity
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            let diff = 0
            for (let k = 0; k < input[i].length; k++) {
                if (input[i][k] != input[j][k]) diff++
            }
            if (diff < bestDiff) {
                best = [input[i], input[j]]
                bestDiff = diff
            }

        }
    }
    let r = ''
    for (let i = 0; i < input[i].length; i++) {
        if (best[0][i] == best[1][i]) r += best[0][i]
    }
    console.log(r)
}