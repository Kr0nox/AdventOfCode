export async function taskOne(input: string[]): Promise<void> {
    const passportKeys: string[][] = []
    let cur: string[] = []
    for (const i of input) {
        if (i == '') {
            passportKeys.push(cur)
            cur = []
            continue
        }
        i.split(' ').forEach(j => {
            cur.push(j.split(':')[0])
        })
    }
    passportKeys.push(cur)
    const allNeededKeys = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
    let c = 0
    for (const p of passportKeys) {
        if (allNeededKeys.every(k => p.includes(k))) c++
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const passportPairs: Record<string, string>[] = []
    let cur: Record<string, string> = {}
    for (const i of input) {
        if (i == '') {
            passportPairs.push(cur)
            cur = {}
            continue
        }
        i.split(' ').forEach(j => {
            const s = j.split(':')
            cur[s[0]] = s[1]
        })
    }
    passportPairs.push(cur)
    const allNeededKeys = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
    let c = 0
    for (const p of passportPairs) {
        const keys = Object.keys(p)
        if (allNeededKeys.some(k => !keys.includes(k))) continue
        if (!checkYear(p['byr'], 1920, 2002)) continue
        if (!checkYear(p['iyr'], 2010, 2020)) continue
        if (!checkYear(p['eyr'], 2020, 2030)) continue
        if (!/^#[0-9a-f]{6}$/.test(p['hcl'])) continue
        if (!['amb','blu','brn','gry','grn','hzl','oth'].includes(p['ecl'])) continue
        if (!/^[0-9]{9}$/.test(p['pid'])) continue

        const h = p['hgt']
        const n = Number(h.substring(0, h.length-2))
        if (h.endsWith('in')) {
            if (n > 76 || n < 59) continue
        } else if (h.endsWith('cm')) {
            if (n > 193 || n < 150) continue
        } else continue
        c++
    }
    console.log(c)

    function checkYear(y: string, min: number, max: number) {
        if (!/^[0-9]{4}$/.test(y)) return false
        const v = Number(y)
        return v >= min && v <= max
    }
}