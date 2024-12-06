export async function taskOne(input: string[]): Promise<void> {
    let i = 1
    let immune: Group[] = []
    let virus: Group[] = []
    while(input[i] != '') {
        immune.push(getGroup(input[i], 'Immune',i-1))
        i++
    }
    i += 2
    const temp = i
    while(i < input.length) {
        virus.push(getGroup(input[i], 'Virus',i-temp))
        i++
    }
    
    console.log(Math.max(...run(immune, virus)))
}

function run(immune: Group[], virus: Group[]) {
    while(immune.length > 0 && virus.length > 0) {
        const order = [...immune, ...virus].sort((a,b) => {
            const eA = a.amount * a.damageAmount
            const eB = b.amount * b.damageAmount
            if (eA != eB) return eB - eA
            return b.initiative - a.initiative
        })

        const available = new Set<string>()
        for (const o of order) { available.add(o.side + o.id) }
        
        const targets: Record<string, Group> = {}
        for (const o of order) {
            let maxDamage = 0
            let maxDamageGroup: Group|null = null
            for (const enemy of (o.side == 'Immune' ? virus : immune)) {
                if (!available.has(enemy.side + enemy.id)) continue
                let damage = o.damageAmount * o.amount
                if (enemy.resistances.includes(o.damageType)) continue
                if (enemy.weaknesses.includes(o.damageType)) damage *= 2
                if (damage > maxDamage) {
                    maxDamage = damage
                    maxDamageGroup = enemy
                } else if (damage == maxDamage) {
                    const eMax = (maxDamageGroup?.amount ?? 0) * (maxDamageGroup?.damageAmount ?? 0)
                    const eEnemy = enemy.amount * enemy.damageAmount

                    if (eMax < eEnemy) {
                        maxDamage = damage
                        maxDamageGroup = enemy
                    } else if (eMax == eEnemy) {
                        if ((maxDamageGroup?.initiative??0) < enemy.initiative) {
                            maxDamage = damage
                            maxDamageGroup = enemy
                        }
                    }
                }
            }
            if (maxDamageGroup != null) {
                targets[o.side + o.id] = maxDamageGroup
                available.delete(maxDamageGroup.side + maxDamageGroup.id)
            }
        }
        order.sort((a,b) => b.initiative - a.initiative)

        let didDamage = false
        for (const o of order) {
            if (o.amount <= 0) continue

            const target = targets[o.side + o.id]
            if (!target) continue

            let damage = o.damageAmount * o.amount
            if (target.resistances.includes(o.damageType)) continue
            if (target.weaknesses.includes(o.damageType)) damage *= 2
            const killCount = Math.floor(damage / target.hitPoints)
            target.amount -= killCount
            if (killCount > 0) didDamage = true
        }
        if (!didDamage) return [0,0]

        immune = immune.filter(a => a.amount > 0)
        virus = virus.filter(a => a.amount > 0)
    }

    return [immune.map(a => a.amount).reduce((a,b) => a+b,0), virus.map(a => a.amount).reduce((a,b) => a+b,0)]
}

export async function taskTwo(input: string[]): Promise<void> {
    let i = 1
    let immune: Group[] = []
    let virus: Group[] = []
    while(input[i] != '') {
        immune.push(getGroup(input[i], 'Immune',i-1))
        i++
    }
    i += 2
    const temp = i
    while(i < input.length) {
        virus.push(getGroup(input[i], 'Virus',i-temp))
        i++
    }

    let min = 1
    let max = 1

    while (true) {
        const immuneCopy = copy(immune)
        const virusCopy = copy(virus)
        immuneCopy.forEach(i => i.damageAmount += max)
        const [ri, rv] = run(immuneCopy, virusCopy)
        if (ri == 0) {
            min = max
            max *= 2
        } else break    
    }
    
    while(min < max) {
        let m = Math.floor((max+min)/2)
        const immuneCopy = copy(immune)
        const virusCopy = copy(virus)
        immuneCopy.forEach(i => i.damageAmount += m)

        const [ri, rv] = run(immuneCopy, virusCopy)
        if (ri == 0) {
            min = m + 1
        } else {
            max = m
        }
    }
    const immuneCopy = copy(immune)
    const virusCopy = copy(virus)
    immuneCopy.forEach(i => i.damageAmount += max)

    console.log(run(immuneCopy, virusCopy)[0])
        

    function copy<T> (v:T): T {
        return JSON.parse(JSON.stringify(v))
    }
}

function getGroup(inp: string, side: Side, id: number): Group {
    const r = /^(\d*) units each with (\d*) hit points( \([^)]*\))? with an attack that does (\d*) (.*) damage at initiative (\d*)$/.exec(inp)
    if (!r) throw inp
    
    let resistances = [] as string[]
    let weaknesses = [] as string[]
    const resWeakString = r[3] ?? ''
    if (resWeakString.includes('weak')) {
        const rWeak = /weak to ([^;)]*)/.exec(resWeakString)!
        weaknesses = rWeak[1].split(', ')
    }
    if (resWeakString.includes('immune')) {
        const rRes = /immune to ([^;)]*)/.exec(resWeakString)!
        resistances = rRes[1].split(', ')
    }

    return {
        side, id,
        amount: Number(r[1]),
        hitPoints: Number(r[2]),
        damageAmount: Number(r[4]),
        damageType: r[5],
        initiative: Number(r[6]),
        resistances, weaknesses
    }
}

type Side = 'Immune'|'Virus'
interface Group {
    id: number
    side: Side
    amount: number
    hitPoints: number
    damageAmount: number
    damageType: string
    resistances: string[]
    weaknesses: string[]
    initiative: number
}