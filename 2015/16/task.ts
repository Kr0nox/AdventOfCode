const params: Record<string, number> = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
}
const keys = Object.keys(params)

export async function taskOne(input: string[]): Promise<void> {
    const sues: Record<string, number>[] = parse(input)
    
    const s = sues.filter(s => {
        for (const k of keys) {
            if (s[k] == undefined) continue
            if (s[k] != params[k]) return false
        }
        return true
    })
    console.log(s[0]["id"])
}

export async function taskTwo(input: string[]): Promise<void> {
    const sues: Record<string, number>[] = parse(input)
    
    const s = sues.filter(s => {
        for (const k of keys) {
            if (s[k] == undefined) continue
            if (k == 'trees' || k == 'cats') {if(s[k] <= params[k]) return false}
            else if (k == 'pomeranians' || k == 'goldfish') {if(s[k] >= params[k]) return false}
            else if (s[k] != params[k]) return false
        }
        return true
    })
    console.log(s)
    console.log(s[0]["id"])
}

function parse(input: string[]): Record<string, number>[] {
    return input.map(i => {
        const r = /Sue ([0-9]+): ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+)/.exec(i)
        if (!r) throw i
        return {
            "id": parseInt(r[1]),
            [r[2]]: parseInt(r[3]),
            [r[4]]: parseInt(r[5]),
            [r[6]]: parseInt(r[7])
        }
    })
}