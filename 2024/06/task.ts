import {ComplexNumber} from '../../base/math'

export async function taskOne(input: string[]): Promise<void> {
    const pos = new Set<string>()
    const guardDir = new ComplexNumber(-1,0)
    let guard = new ComplexNumber(0,0)
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == '^') guard = new ComplexNumber(y,x)
        }
    }
    while(true) {
        pos.add(guard.rel + '-' + guard.img)
        const newPos = guard.add(guardDir)
        if (!(newPos.rel < input.length && newPos.rel >= 0 && newPos.img < input[0].length && newPos.img >= 0)) break
        if (input[newPos.rel][newPos.img] == '#') guardDir.mulAdd(ComplexNumber.fromImg(-1))
        else guard = newPos
    }
    console.log(pos.size)
}

export async function taskTwo(input: string[]): Promise<void> {
    let count = 0
    let guardStart = new ComplexNumber(0,0)
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == '^') guardStart = new ComplexNumber(y,x)
        }
    }
    const pos = new Set<string>()
    const guardDir = new ComplexNumber(-1,0)
    let guard = guardStart.add(new ComplexNumber(0,0))
    while(true) {
        pos.add(guard.rel + '-' + guard.img)
        const newPos = guard.add(guardDir)
        if (!(newPos.rel < input.length && newPos.rel >= 0 && newPos.img < input[0].length && newPos.img >= 0)) break
        if (input[newPos.rel][newPos.img] == '#') guardDir.mulAdd(ComplexNumber.fromImg(-1))
        else guard = newPos
    }
    const tries = Array.from(pos).map(i => i.split('-').map(Number))

    for (const t of tries) {
        const x = t[1]
        const y = t[0]
        if (input[y][x] == '#') continue
        const pos = new Set<string>()
        const guardDir = new ComplexNumber(-1,0)
        let guard = guardStart.add(new ComplexNumber(0,0))
        while(true) {
            const k = guard.rel + '-' + guard.img + '-' + guardDir.rel + '-' + guardDir.img
            if (pos.has(k)) {
                count++
                break
            }
            pos.add(k)
            const newPos = guard.add(guardDir)
            if (!(newPos.rel < input.length && newPos.rel >= 0 && newPos.img < input[0].length && newPos.img >= 0)) {
                break
            }
            if (input[newPos.rel][newPos.img] == '#' || (newPos.rel == y && newPos.img == x)) guardDir.mulAdd(ComplexNumber.fromImg(-1))
            else guard = newPos
        }
    }
    console.log(count)
}