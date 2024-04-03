export async function taskOne(input: string[]): Promise<void> {
    console.log(input.filter(isNice).length)

    function isNice(text: string) {
        const le = text.split('')
        if (le.filter(i => ['a','e','i','o','u'].includes(i)).length < 3) {
            return false
        }
        let last = ''
        let double = false
        for (const l of le) {
            if (last == l) double = true
            if (last == 'a' && l == 'b') return false
            if (last == 'c' && l == 'd') return false
            if (last == 'p' && l == 'q') return false
            if (last == 'x' && l == 'y') return false
            last = l
        }
        return double
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(input.filter(isNice).length)

    function isNice(text: string) {
        const le = text.split('')

        let last = ''
        let beforeLast = ''
        const pairs: [number, string][] = []
        let withGap = false
        for (const [i,l] of le.entries()) {
            if (l == beforeLast) {
                withGap = true
            } 
            if (last != '') {
                pairs.push([i-1, last + l])
            }
            beforeLast = last
            last = l
        }
        if (!withGap) return false

        return pairs.filter(([i, w]) => pairs.findIndex(([i2, w2]) => w == w2 && Math.abs(i-i2) > 1) >= 0).length > 0
    }
}

