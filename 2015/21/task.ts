const Weapons = [
    {c:8,a:4,d:0},
    {c:10,a:5,d:0},
    {c:25,a:6,d:0},
    {c:40,a:7,d:0},
    {c:74,a:8,d:0}
]
const Armor = [
    {c:0,d:0,a:0},
    {c:13,d:1,a:0},
    {c:31,d:2,a:0},
    {c:53,d:3,a:0},
    {c:75,d:4,a:0},
    {c:102,d:5,a:0}
]

const Rings = [
    {c:0,d:0,a:0},
    {c:0,d:0,a:0},
    {c:25,a:1,d:0},
    {c:50,a:2,d:0},
    {c:100,a:3,d:0},
    {c:20,d:1,a:0},
    {c:40,d:2,a:0},
    {c:80,d:3,a:0}
]

export async function taskOne(input: string[]): Promise<void> {
    let min = Infinity
    for (let w = 0; w < Weapons.length; w++) {
        for (let a = 0; a < Armor.length; a++) {
            for (let r1 = 0; r1 < Rings.length; r1++) {
                for (let r2 = r1+1; r2 < Rings.length; r2++) {
                    if (sim([w,a,r1,r2], input)) {
                        let s = Weapons[w].c + Armor[a].c + Rings[r1].c + Rings[r2].c
                        if (s < min) min = s
                    }
                }
            }
        }
    }
    console.log(min)
}

export async function taskTwo(input: string[]): Promise<void> {
    let max = 0
    for (let w = 0; w < Weapons.length; w++) {
        for (let a = 0; a < Armor.length; a++) {
            for (let r1 = 0; r1 < Rings.length; r1++) {
                for (let r2 = r1+1; r2 < Rings.length; r2++) {
                    if (!sim([w,a,r1,r2], input)) {
                        let s = Weapons[w].c + Armor[a].c + Rings[r1].c + Rings[r2].c
                        if (s > max) max = s
                    }
                }
            }
        }
    }
    console.log(max)
}

function sim(s: [number, number, number, number], input: string[]) {
    let health = parseInt(input[0].substring(12))
    let damage = parseInt(input[1].substring(8)) - Armor[s[1]].d - Rings[s[2]].d - Rings[s[3]].d
    damage = Math.max(1, damage)
    const armor = parseInt(input[2].substring(7)) 

    let player = 100
    let playerDamage = Weapons[s[0]].a + Rings[s[2]].a + Rings[s[3]].a - armor
    playerDamage = Math.max(1, playerDamage)
    while(player > 0 && health > 0) {
        health -= playerDamage
        player -= damage
    }
    return health <= 0
}

interface Stat {
    a: number,
    d: number,
    c: number
}