import {lcmArr} from '../../base'

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

    const times: number[] = []
    for (const dimension of [0,1,2]) {
        let time = 0
        let k = s(dimension)
        const memo = new Set<string>()
        while (!memo.has(k)) {
            memo.add(k)
            for (let i = 0; i < moons.length; i++) {
                for (let j = 0; j < moons.length; j++) {
                    moons[i][1][dimension] -= Math.sign(moons[i][0][dimension] - moons[j][0][dimension])
                }
            }
            for (let i = 0; i < moons.length; i++) {
                moons[i][0][dimension] += moons[i][1][dimension]
            }
            time++
            k = s (dimension)
        }
        times.push(time)
    }
    console.log(lcmArr(times))

    function s(dim: number) {
        return JSON.stringify(
            moons.map(m =>
                [m[0][dim],m[1][dim]]
            )
        )
    }
}