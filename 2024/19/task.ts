export async function taskOne(input: string[]): Promise<void> {
    const allowed = input[0].split(', ')
    const allowedMemo = new Set<string>()
    const disallowedMemo = new Set<string>()
    let s = 0
    for (let i = 2; i < input.length; i++) {
        if (check(input[i])) s++
    }
    console.log(s)


    function check(towel: string) {
        if (towel == '') return true
        if (allowedMemo.has(towel)) return true
        if (disallowedMemo.has(towel)) return false

        for (const t of allowed) {
            if (towel.startsWith(t)) {
                if (check(towel.substring(t.length))) {
                    allowedMemo.add(towel)
                    return true
                }
            }
        }
        disallowedMemo.add(towel)
        return false
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const allowed = input[0].split(', ')
    const memo = new Map<string, number>()
    let s = 0
    for (let i = 2; i < input.length; i++) {
        s += check(input[i])
    }
    console.log(s)


    function check(towel: string): number {
        if (towel == '') return 1
        if (memo.has(towel)) return memo.get(towel)!

        let s = 0
        for (const t of allowed) {
            if (towel.startsWith(t)) {
                let c = check(towel.substring(t.length))
                s += c
            }
        }
        memo.set(towel, s)
        return s
    }
}
