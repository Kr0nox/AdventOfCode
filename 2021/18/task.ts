export async function taskOne(input: string[]): Promise<void> {
    let sum = input[0]
    for (let i = 1; i < input.length; i++) {
        sum = add(sum, input[i])
        console.log("sum" + sum)
        console.log(" ")
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

const NUMS = [0,1,2,3,4,5,6,7,8,9].map(i=>i.toString())

function add(a: string, b:string) {
    return reduce(`[${a},${b}]`)
}

function reduce(s: string) {
    let didAction = false
    let _i = 0
    do {
        console.log(s)
        _i++
        if (_i > 20 ) return ""
        let open = 0
        didAction = false
        for (let i = 0; i < s.length; i++) {
            if (s[i] == '[') open++
            if (s[i] == ']') open--
            if (open > 4) {
                console.log(1)
                const pairEnd =  s.indexOf(']', i+1)
                const toMuch = s.slice(i,pairEnd+1)
                //console.log(toMuch)
                const r = /\[([0-9]+),([0-9]+)\]/.exec(toMuch)
                if (r == null) throw toMuch
                for (let j = pairEnd+1; j < s.length; j++) {
                    if (NUMS.includes(s[j])) {
                        const goal = (parseInt(s[j]) + parseInt(r[2])).toString()
                        s = s.slice(0, j) + goal  + s.slice(j+1)
                        break;
                    }
                }
                s = s.slice(0, i) + '0' +  s.slice(pairEnd+1)
                for (let j = i-1; j >= 0; j--) {
                    if (NUMS.includes(s[j])) {
                        const goal = (parseInt(s[j]) + parseInt(r[1])).toString()
                        s = s.slice(0, j) +goal+s.slice(j+1)
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
                console.log(2)
                const num = parseInt(s.slice(st,en))

                //console.log(num, s.slice(0, st), s.slice(en))
                s = s.slice(0,st) +  '['+Math.floor(num/2).toString()+','+ Math.ceil(num/2).toString() + ']'+ s.slice(en)
                didAction = true
                break;
            }
        }
        //console.log("2", s)
    } while(didAction)
    return s
}



type Pair = {
    left: Pair|number
    right: Pair|number
    parent: Pair
    depth: number
}
/*
function add(a:Pair, b:Pair) {
    console.log("add")
    function increaseD(x: Pair) {
        x.depth++
        if ((x.left as Pair).depth != undefined) increaseD(x.left as Pair)
        if ((x.right as Pair).depth != undefined) increaseD(x.right as Pair)
    }
    const temp: Pair = {left:a,right:b, depth:0, parent: {} as Pair}
    a.parent = temp
    b.parent = temp
    console.log("added to: ", toString(temp))
    increaseD(a)
    increaseD(b)
    console.log("increased depth")

    function split(x: Pair): boolean {
        if((x.left as Pair).depth != undefined) {
            if (split(x.left as Pair)) return true
        } else if ((x.left as number) > 9) {
            const num = x.left as number
            x.left = {
                left: Math.floor(num/2),
                right: Math.ceil(num/2),
                parent: x,
                depth: x.depth + 1
            }
            return true
        }
        if((x.right as Pair).depth != undefined) {
            if (split(x.right as Pair)) return true
        } else if ((x.right as number) > 9) {
            const num = x.right as number
            x.left = {
                left: Math.floor(num/2),
                right: Math.ceil(num/2),
                parent: x,
                depth: x.depth + 1
            }
            return true
        }
        return false
    }
    function explode(x: Pair): boolean {
        if (x.depth >= 3) {
            if (x.parent?.left == x) {
                const newR = (x.parent.right as number) + (x.right as number)
                x.parent.right = newR

                if (x.parent.parent.left != x.parent) {
                    const newL = (x.parent.parent.left as number) + (x.left as number)
                    x.parent.parent.left = newL
                } else if (x.parent.parent.parent.left != x.parent.parent) {
                    const newL = (x.parent.parent.parent.left as number) + (x.left as number)
                    x.parent.parent.parent.left = newL
                } 
            } else {
                const newL = (x.parent.left as number) + (x.left as number)
                x.parent.left = newL

                if (x.parent.parent.right != x.parent) {
                    const newR = (x.parent.parent.right as number) + (x.right as number)
                    x.parent.parent.right = newR
                } else if (x.parent.parent.parent?.right != x.parent?.parent) {
                    const newR = (x.parent.right as number) + (x.right as number)
                    x.parent.parent.parent.right = newR
                }
            }
            return true
        }
        if ((x.left as Pair) != undefined) {
            if (explode(x.left as Pair)) {
                return true
            }
        }
        if ((x.right as Pair) != undefined) {
            if (explode(x.right as Pair)) {
                return true
            }
        }
        return false
    }
    let didAction = true
    while(didAction) {
        didAction = false
        if (explode(temp)) {
            didAction = true
            console.log("explode", toString(temp))
            break
        }
        if (split(temp)) {
            console.log("split")
            didAction = true
        } 
    }
    
    return temp
}

function parse(input: string) {
    type _P = [_P|number, _P|number]
    const inp = JSON.parse(input) as _P
    function par(x: _P, d: number, p?: Pair) {
        let left = x[0]
        let right = x[1]
        const temp = {
            depth: d,
            parent: p,
            left: undefined as unknown,
            right: undefined as unknown
        }

        if ((left as _P).length != undefined) {
            temp.left = par(left as _P, d+1, temp as Pair)
        } else {
            temp.left = left
        }
        if ((right as _P).length != undefined) {
            temp.right = par(right as _P, d+1, temp as Pair)
        } else {
            temp.right = right
        }
        return temp as Pair
    }
    return par(inp, 0, {} as Pair)
}

function toString(p: Pair): string {
    let temp = '['
    if ((p.left as Pair).left != undefined) {
        temp += toString(p.left as Pair)
    } else {
        temp += p.left
    }
    temp += ','
    if ((p.right as Pair).left != undefined) {
        temp += toString(p.right as Pair)
    } else {
        temp += p.right
    }
    temp += ']'
    return temp
}*/