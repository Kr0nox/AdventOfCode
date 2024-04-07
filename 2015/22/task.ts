export async function taskOne(input: string[]): Promise<void> {
    
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Player {
    shields: number[]
    poisons: number[]
    recharges: number[],
    health: number
    mana: number
}

function step(p: Player, h: number, d: number): number {
    if (h <= 0) return 0
    if (p.health <= 0) return Infinity

    p.poisons=p.poisons.map(i=>i-1).filter(i=>i>=0)
    p.recharges=p.recharges.map(i=>i-1).filter(i=>i>=0)
    p.shields=p.shields.map(i=>i-1).filter(i=>i>=0)
    p.health -= Math.max(1, d-p.shields.length*7)
    p.mana += 101*p.recharges.length

    const mmP = copy(p)
    mmP.mana -= 53
    const mm = 53 + step(mmP, h-4, d)

    const dP = copy(p)
    dP.mana -= 73
}

function copy(p:Player): Player {
    return JSON.parse(JSON.stringify(p))
}