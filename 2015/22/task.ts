
let bossDamage = 0
export async function taskOne(input: string[]): Promise<void> {
    task(input, false)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, true)
}

function task(input: string[], hardMode: boolean) {
    let health = parseInt(input[0].substring(12))
    bossDamage = parseInt(input[1].substring(8))
    player({
        bossHealt: health,
        poison: 0,
        recharge: 0,
        shield: 0,
        playerHealth: 50,
        mana: 500,
        spend: 0,
        hardMode: hardMode
    })
    console.log(min)
}

interface State {
    shield: number
    poison: number
    recharge: number
    playerHealth: number
    bossHealt: number
    spend: number
    mana: number
    hardMode: boolean
}

let min = Infinity

function player(state: State) {
    if (state.hardMode) state.playerHealth--
    if (state.playerHealth <= 0 ) return
    if(state.poison > 0) state.bossHealt -= 3
    if(state.recharge > 0) state.mana += 101
    state.poison = Math.max(state.poison-1,0)
    state.recharge = Math.max(state.recharge-1, 0)
    state.shield = Math.max(state.shield-1, 0)

    if (state.bossHealt <= 0) {
        if (state.spend >= min) return
        min = state.spend
        return
    }


    if (state.mana >= 229 && state.recharge <= 0) {
        const s = copy(state)
        s.mana -= 229
        s.spend += 229
        s.recharge = 5
        boss(s)
    }

    if (state.mana >= 173 && state.poison <= 0) {
        const s = copy(state)
        s.mana -= 173
        s.spend += 173
        s.poison = 6
        boss(s)
    }

    if (state.mana >= 113 && state.shield <= 0) {
        const s = copy(state)
        s.mana -= 113
        s.spend += 113
        s.shield = 6
        boss(s)
    }

    if (state.mana >= 73) {
        const s = copy(state)
        s.bossHealt -= 2
        s.playerHealth += 2
        s.mana -= 73
        s.spend += 73
        boss(s)
    }

    if (state.mana >= 53) {
        const s = copy(state)
        s.bossHealt -= 4
        s.mana -= 53
        s.spend += 53
        boss(s)
    }
}

function boss(state: State) {
    if (state.spend > min) return

    if(state.poison > 0) state.bossHealt -= 3
    if(state.recharge > 0) state.mana += 101
    state.poison = Math.max(state.poison-1,0)
    state.recharge = Math.max(state.recharge-1, 0)

    if (state.bossHealt <= 0) {
        if (state.spend >= min) return
        min = state.spend
        return
    }

    state.playerHealth -= Math.max(1, bossDamage - (state.shield > 0 ? 7:0))
    if(state.playerHealth <= 0) {
        return
    }
    state.shield = Math.max(state.shield-1, 0)

    return player(state)
}

function copy(p:State): State {
    return JSON.parse(JSON.stringify(p))
}