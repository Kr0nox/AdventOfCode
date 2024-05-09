export async function taskOne(input: string[]): Promise<void> {
    let maxID = 0
    input.forEach(i => {
        let r = /value ([0-9]+) goes to bot ([0-9]+)/.exec(i)
        if (r) {
            maxID = Math.max(maxID, parseInt(r[2]))
            return
        }
        r = /bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)/.exec(i)
        if (r) {
            maxID = Math.max(maxID, parseInt(r[1]))
            if (r[2] == 'bot') maxID = Math.max(maxID, parseInt(r[3]))
            if (r[4] == 'bot') maxID = Math.max(maxID, parseInt(r[5]))
            return
        }
        throw i
    })
    const numbers: [number, number][] = Array.from({length: maxID+1}, () => [-1, -1])
    const ins: Instrcution[] = Array.from({length: maxID+1}, () => [(n)=>{}, (n)=>{}])
    input.forEach(i => {
        let r = /value ([0-9]+) goes to bot ([0-9]+)/.exec(i)
        if (r) {
            const rob = parseInt(r[2])
            addNum(rob, parseInt(r[1]))
            return
        }
        r = /bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)/.exec(i)
        if (r) {
            const rob = parseInt(r[1]) 
            const a = r[2]
            const b = parseInt(r[3])
            const c = r[4]
            const d = parseInt(r[5])
            if (a == 'bot') {
                ins[rob][0] = (n: number) => addNum(b, n)
            }
            if (c == 'bot') {
                ins[rob][1] = (n: number) => addNum(d, n)
            }
            return
        }
        throw i
    })

    function base(lower: number, higher: number) {
        if (lower == 17 && higher == 61) return true
        return false
    }
    function addNum(rob: number, v: number) {
        if(numbers[rob][0] < 0) {
            numbers[rob][0] = v
        } else {
            numbers[rob][1] = v
        }
    }

    let i = 0
    
    while(true) {
        if (i >= numbers.length) i = 0
        try {
            if (numbers[i][0] >= 0 && numbers[i][1] >= 0) {
                const min = Math.min(numbers[i][0], numbers[i][1])
                const max = Math.max(numbers[i][0], numbers[i][1])
                if (base(min, max)) {
                    console.log(i)
                    break;
                }
                ins[i][0](min)
                ins[i][1](max)
                numbers[i] = [-1,-1]
            }
        } catch(e) {
            console.log(i)
            throw e
        }
        
        i++
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let maxID = 0
    let maxOut = 0
    input.forEach(i => {
        let r = /value ([0-9]+) goes to bot ([0-9]+)/.exec(i)
        if (r) {
            maxID = Math.max(maxID, parseInt(r[2]))
            return
        }
        r = /bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)/.exec(i)
        if (r) {
            maxID = Math.max(maxID, parseInt(r[1]))
            if (r[2] == 'bot') maxID = Math.max(maxID, parseInt(r[3]))
            else maxOut = Math.max(maxOut, parseInt(r[3]))
            if (r[4] == 'bot') maxID = Math.max(maxID, parseInt(r[5]))
            else maxOut = Math.max(maxOut, parseInt(r[5]))
            return
        }
        throw i
    })
    const numbers: [number, number][] = Array.from({length: maxID+1}, () => [-1, -1])
    const ins: Instrcution[] = Array.from({length: maxID+1}, () => [(n)=>{}, (n)=>{}])
    const out: number[][] = Array.from({length: maxOut+1}, ()=>[])
    input.forEach(i => {
        let r = /value ([0-9]+) goes to bot ([0-9]+)/.exec(i)
        if (r) {
            const rob = parseInt(r[2])
            addNum(rob, parseInt(r[1]))
            return
        }
        r = /bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)/.exec(i)
        if (r) {
            const rob = parseInt(r[1]) 
            const a = r[2]
            const b = parseInt(r[3])
            const c = r[4]
            const d = parseInt(r[5])
            if (a == 'bot') {
                ins[rob][0] = (n: number) => addNum(b, n)
            } else {
                ins[rob][0] = (n: number) => out[b].push(n)
            }
            if (c == 'bot') {
                ins[rob][1] = (n: number) => addNum(d, n)
            } else {
                ins[rob][1] = (n: number) => out[d].push(n)
            }
            return
        }
        throw i
    })

    function addNum(rob: number, v: number) {
        if(numbers[rob][0] < 0) {
            numbers[rob][0] = v
        } else {
            numbers[rob][1] = v
        }
    }

    let i = 0
    
    while(true) {
        if (i >= numbers.length) i = 0
        if (numbers[i][0] >= 0 && numbers[i][1] >= 0) {
            const min = Math.min(numbers[i][0], numbers[i][1])
            const max = Math.max(numbers[i][0], numbers[i][1])
            ins[i][0](min)
            ins[i][1](max)
            numbers[i] = [-1,-1]
        }

        if (out[0].length > 0 && out[1].length > 0 && out[2].length > 0) {
            console.log(out[0][0]*out[1][0]*out[2][0])
            break
        }
        
        i++
    }
}

type F = (num: number) => void
type Instrcution = [F, F]
