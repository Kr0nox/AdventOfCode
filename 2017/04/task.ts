export async function taskOne(input: string[]): Promise<void> {
    console.log(input.filter(isValid).length)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(input.filter(isValid).filter(hasNoAnnagram).length)
}

function isValid(r: string) {
    const ws = r.split(' ')
    const S = new Set<string>()

    for (const w of ws) {
        if (S.has(w)) return false
        S.add(w)
    }
    return true
}

function hasNoAnnagram(r: string) {
    return isValid(r.split(' ').map(w => w.split('').sort().join('')).join(' '))
}