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
    
    interface Range<T> {
        min: number // inc
        max: number // inc
        val: T
    }

    class RangeManager<T> {
        public ranges: Range<T>[] = []

        constructor(min: number, max: number, def: T) {
            this.ranges.push({min,max, val:def})
        }

        public set(min: number, max: number, val: T) {
            let i = 0;
            while(this.ranges[i].min < min) {i++}
            if (this.ranges[i])
        }

        public get(min: number, max: number): Range<T>[] {
            const r: Range<T>[] = []

            let i = 0;
            while(this.ranges[i].min < min) {i++}
            if (this.ranges[i].max > max) {
                return [{min, max, val: this.ranges[i].val}]
            }
            r.push({min, max: this.ranges[i].max, val: this.ranges[i].val})
            i++
            while(this.ranges[i].max < max) {
                r.push(this.ranges[i])
                i++
            }
            r.push({min: this.ranges[i].min, max, val: this.ranges[i].val})

            return r
        }
    }
}