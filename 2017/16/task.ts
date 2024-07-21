const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
    const LENGTH = 16

export async function taskOne(input: string[]): Promise<void> {
    let row = Array.from({length: LENGTH}, (_, i) => letters[i])
    const ins = input[0].split(',')
    console.log(dance(row, ins).join(''))
}

const memo: Record<string, number> = {}

export async function taskTwo(input: string[]): Promise<void> {
    let row = Array.from({length: LENGTH}, (_, i) => letters[i])
    const ins = input[0].split(',')
    let loopStart = -1;
    let loopEnd = -1;
    const TOTAL = 1000000000
    for (let i = 0; i < TOTAL; i++) {
        row = dance(row, ins);
        const k = row.join('')
        if (memo[k] != undefined) {
            loopStart = memo[k]
            loopEnd = i
            break
        }
        memo[k] = i
    }
    const doneCycles = Math.floor((TOTAL-loopStart) / (loopEnd-loopStart))
    const remaining = TOTAL - loopStart - (loopEnd-loopStart) * doneCycles
    console.log(loopStart, loopEnd, doneCycles, remaining)
    for (let i = 0; i < remaining - 1; i++) {
        row = dance(row, ins);
    }
    console.log(row.join(''))
}

function dance(row: string[], ins: string[]) {
    for (let j = 0; j < ins.length; j++) {
        const i = ins[j]
        if (i.startsWith('s')) {
            const n = parseInt(i.substring(1))
            const newRow = row.map((_,idx)=>row[(LENGTH+idx-n)%LENGTH])
            row = newRow
        } else if (i.startsWith('x')) {
            const n = i.substring(1).split('/').map(Number)
            const t = row[n[0]]
            row[n[0]] = row[n[1]]
            row[n[1]] = t
        } else if (i.startsWith('p')) {
            const n = i.substring(1).split('/').map(l => row.indexOf(l)).map(Number)
            const t = row[n[0]]
            row[n[0]] = row[n[1]]
            row[n[1]] = t
        } else {
            throw i
        }
    }
    return row
}