export async function taskOne(input: string[]): Promise<void> {
    const reactor: boolean[][][] = Array.from({length:101}, ()=>Array.from({length:101}, ()=>Array.from({length:101}, ()=>false)))
    input.forEach(i => {
        const r = /((?:on)|(?:off)) x=(-?[0-9]+)\.\.(-?[0-9]+),y=(-?[0-9]+)\.\.(-?[0-9]+),z=(-?[0-9]+)\.\.(-?[0-9]+)/.exec(i)
        if (r == null) throw i
        const b = r[1] == 'on'
        
        const nums0 = r.slice(2).map(j => parseInt(j.trim()) + 50)
        let inside = true
        for (let i = 0; i < nums0.length; i+=2) {
            if (nums0[i+1] < 0 || nums0[i]>100) inside = false
        }
        if (inside) {
        const nums = nums0.map(j=> Math.max(0, Math.min(100, j)))
        for (let x = nums[0]; x <= nums[1]; x++) {
            for (let y = nums[2]; y <= nums[3]; y++) {
                for (let z = nums[4]; z <= nums[5]; z++) {
                    reactor[x][y][z] = b
                }
            }
        }}
    })

    let sum = 0
    for (let x = 0; x <= 100; x++) {
        for (let y = 0; y <= 100; y++) {
            for (let z = 0; z <= 100; z++) {
                if (reactor[x][y][z]) sum++
            }
        }
    }
    console.log(sum)
}

export async function taskTwo(_input: string[]): Promise<void> {
    /*const input: [boolean, number[]][] = _input.map(i => {
        const r = /((?:on)|(?:off)) x=(-?[0-9]+)\.\.(-?[0-9]+),y=(-?[0-9]+)\.\.(-?[0-9]+),z=(-?[0-9]+)\.\.(-?[0-9]+)/.exec(i)
        if (r == null) throw i
        const b = r[1] == 'on'
        const nums = r.slice(2).map(j => parseInt(j.trim()))
        return [b, nums]
    })

    const reactor: [number, number, boolean][][][] = []*/

    const test = [1,2,3]
}