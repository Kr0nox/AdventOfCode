export async function taskOne(input: string[]): Promise<void> {
    const nums = input.map(i => i.split(' ').map(Number))

    let safe = 0
    for(const n of nums) {
        let inc = true
        for (let i = 1; i < n.length; i++) {
            if (n[i-1] >= n[i]) inc = false 
        }
        let dec = true
        for (let i = 1; i < n.length; i++) {
            if (n[i-1] <= n[i]) dec = false 
        }
        let maxDiff = 0
        for (let i = 1; i < n.length; i++) {
            let diff = Math.abs(n[i-1] - n[i])
            if (diff > maxDiff) maxDiff = diff
        }
    
        if ((inc||dec)&&maxDiff <= 3) {
            safe++
        }
    }
    console.log(safe)
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input.map(i => i.split(' ').map(Number))

    let safe = 0
    for(const n of nums) {
        let tSafe = false
        for (let ignore = 0; ignore < n.length; ignore++) {
            let start = ignore == 0 ? 2:1
            let end = ignore == n.length-1 ? n.length-1: n.length
            let inc = true
            for (let i = start; i < end; i++) {
                if (get(i, true) >=  get(i, false)) inc = false 
            }
            let dec = true
            for (let i = start; i < end; i++) {
                if (get(i, true) <=  get(i, false)) dec = false 
            }
            let maxDiff = 0
            for (let i = start; i < end; i++) {
                let diff = Math.abs(get(i, true) - get(i, false))
                if (diff > maxDiff) maxDiff = diff
            }
    
            if ((inc||dec)&&maxDiff <= 3) {
                tSafe = true
            }

            function get(i: number, minus1: boolean) {
                if (!minus1) {
                    if (i == ignore) return n[i+1]
                    return n[i]
                } else {
                    if (i -1 == ignore) return n[i-2]
                    return n[i-1]
                }
            }
        }
        if (tSafe) safe++
    }
    console.log(safe)
}

// input.map(Number)
// input[0].split('').map(Number)
// .reduce((a,b)=>a+b,0)