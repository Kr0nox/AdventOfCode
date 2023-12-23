export async function taskOne(input: string[]): Promise<void> {
    let sum = input[0]
    for (let i = 1; i < input.length; i++) {
        sum = add(sum, input[i])
    }
    console.log(magnitude(sum))
}

export async function taskTwo(input: string[]): Promise<void> {
    let max = 0
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            const mag = magnitude(add(input[i], input[j]))
            if (mag > max) {
                max = mag
            }
        }
    }
    console.log(max)
}

const NUMS = [0,1,2,3,4,5,6,7,8,9].map(i=>i.toString())

function add(a: string, b:string) {
    return reduce(`[${a},${b}]`)
}

function reduce(s: string) {
    let didAction = false
    let _i = 0
    do {
        let open = 0
        didAction = false
        for (let i = 0; i < s.length; i++) {
            if (s[i] == '[') open++
            if (s[i] == ']') open--
            if (open > 4) {
                const pairEnd =  s.indexOf(']', i+1)
                const toMuch = s.slice(i,pairEnd+1)
                const r = /\[([0-9]+),([0-9]+)\]/.exec(toMuch)
                if (r == null) throw toMuch
                for (let j = pairEnd+1; j < s.length; j++) {
                    if (NUMS.includes(s[j])) {
                        const st = j
                        let en = j
                        while(NUMS.includes(s[en])) {en++}
                        const goal = (parseInt(s.slice(st,en)) + parseInt(r[2])).toString()
                        s = s.slice(0, j) + goal  + s.slice(en)
                        break;
                    }
                }
                s = s.slice(0, i) + '0' +  s.slice(pairEnd+1)
                for (let j = i-1; j >= 0; j--) {
                    if (NUMS.includes(s[j])) {
                        const en = j + 1
                        let st = j
                        while(NUMS.includes(s[st])) {st--}
                        const goal = (parseInt(s.slice(st+1, en)) + parseInt(r[1])).toString()
                        s = s.slice(0, st+1) +goal+s.slice(en)
                        break;
                    }
                }
                didAction = true
                break
            } 
        }
        if (didAction) continue
        let j = 0
        while(j < s.length) {
            if (!NUMS.includes(s[j])) {
                j++
                continue
            }
            const st = j
            while(NUMS.includes(s[j])) {j++}
            const en = j
            if (en-st > 1) {
                const num = parseInt(s.slice(st,en))

                s = s.slice(0,st) +  '['+Math.floor(num/2).toString()+','+ Math.ceil(num/2).toString() + ']'+ s.slice(en)
                didAction = true
                break;
            }
        }
    } while(didAction)
    return s
}

function magnitude(num: string) {
    type Pair =number|[Pair,Pair]
    const snail = JSON.parse(num) as Pair
    function mag(p: Pair): number {
        if ((p as any[]).length != undefined) {
            const _p = p as [Pair, Pair]
            return 3*mag(_p[0]) + 2*mag(_p[1])
        } else {
            return p as number
        }
    }
    return mag(snail)
}