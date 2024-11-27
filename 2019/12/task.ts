export async function taskOne(input: string[]): Promise<void> {
    const moons = input.map(i => {
        const r = /<x=(-?[0-9]+), y=(-?[0-9]+), z=(-?[0-9]+)>/.exec(i)!
        return [[Number(r[1]), Number(r[2]), Number(r[3])], [0,0,0]]
    })

    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < moons.length; i++) {
            for (let j = 0; j < moons.length; j++) {
                moons[i][1][0] -= Math.sign(moons[i][0][0] - moons[j][0][0])
                moons[i][1][1] -= Math.sign(moons[i][0][1] - moons[j][0][1])
                moons[i][1][2] -= Math.sign(moons[i][0][2] - moons[j][0][2])
            }
        }
        for (let i = 0; i < moons.length; i++) {
            moons[i][0][0] += moons[i][1][0]
            moons[i][0][1] += moons[i][1][1]
            moons[i][0][2] += moons[i][1][2]
        }
    }

    let c = 0;
    for (let i = 0; i < moons.length; i++) {
        const pot = Math.abs(moons[i][0][0])+Math.abs(moons[i][0][1])+Math.abs(moons[i][0][2])
        const kin = Math.abs(moons[i][1][0])+Math.abs(moons[i][1][1])+Math.abs(moons[i][1][2])
        c += pot*kin
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const moons = input.map(i => {
        const r = /<x=(-?[0-9]+), y=(-?[0-9]+), z=(-?[0-9]+)>/.exec(i)!
        return [[Number(r[1]), Number(r[2]), Number(r[3])], [0,0,0]]
    })

    let k = 0
    const previous = new Set<string>()
    let state = JSON.stringify(moons)
    let help = new Map<string, number>()
    while(!previous.has(state)) {
        previous.add(state)
        for (let i = 0; i < moons.length; i++) {
            for (let j = 0; j < moons.length; j++) {
                moons[i][1][0] -= Math.sign(moons[i][0][0] - moons[j][0][0])
                moons[i][1][1] -= Math.sign(moons[i][0][1] - moons[j][0][1])
                moons[i][1][2] -= Math.sign(moons[i][0][2] - moons[j][0][2])
            }
        }
        for (let i = 0; i < moons.length; i++) {
            moons[i][0][0] += moons[i][1][0]
            moons[i][0][1] += moons[i][1][1]
            moons[i][0][2] += moons[i][1][2]
            const h = JSON.stringify(moons[i]) + i
            if (help.has(h)) {
                console.log(h, k, help.get(h))
            } else {
                help.set(h,k)
            }
        }
        state = JSON.stringify(moons)
        k++
    }
    console.log(k)
}