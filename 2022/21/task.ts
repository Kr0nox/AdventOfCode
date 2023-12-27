export async function taskOne(input: string[]): Promise<void> {
    const map: Record<string, string> = {}
    input.forEach(i => {
        const s = i.replace(" ", "").split(":")
        map[s[0].trim()] = s[1]
    })

    function get(s: string): number {
        const m = map[s.trim()]
        if (s.trim() == 'humn') console.log('me')
        if (m.match(/[0-9]+/)) return parseInt(m.trim())

        const [a,b] = m.split(/\+|-|\/|\*/)
        if (m.includes('+')) return get(a) + get(b)
        if (m.includes('-')) return get(a) - get(b)
        if (m.includes('/')) return get(a) / get(b)
        if (m.includes('*')) return get(a) * get(b)

        throw [m, a, b]
    }

    console.log(get('root'))
}

export async function taskTwo(input: string[]): Promise<void> {
    const map: Record<string, string> = {}
    input.forEach(i => {
        const s = i.replace(" ", "").split(":")
        map[s[0].trim()] = s[1]
    })
    const nodes: Record<string, Node> = {}
    function build(s: string): Node {
        if (nodes[s] != undefined) return nodes[s]
        let val: Node
        if (s.trim() == 'humn') {
            val = new Human()
        } else {
            const m = map[s.trim()]
            if (m.match(/[0-9]+/)) {
                val = new Constant(parseInt(m.trim()))
            } else {
                const r = /(.{4}) (\+|-|\/|\*) (.{4})/.exec(m)
                if (r == null) throw "no regex match " + m
                val = new MathNode(build(r[1]), build(r[3]), r[2])
            }
        }
        nodes[s] = val 
        return val
    }
    const m = map['root'].split(/\+|-|\/|\*/)
    const l = build(m[0])
    const r = build(m[1])

    if (l.getCanCalculate()) {
        const g = l.calculate()
        console.log(r.evaluate(g))
    } else {
        const g = r.calculate()
        console.log(l.evaluate(g))
    }
}

abstract class Node {

    abstract getCanCalculate(): boolean

    abstract calculate(): number

    abstract evaluate(goal: number): number
}

class Constant extends Node {

    val: number

    constructor(val: number) {
        super()
        this.val = val
    }

    getCanCalculate() {
        return true
    }
    calculate() {
        return this.val
    }
    evaluate(goal: number): number {
        throw new Error("Method not implemented.")
    }
}

class MathNode extends Node {

    left: Node
    right: Node
    op: string
    canCalculate: boolean|undefined

    constructor(l: Node, r:Node, op:string) {
        super()
        this.left = l
        this.right = r
        this.op = op
    }

    getCanCalculate() {
        if (this.canCalculate != undefined) return this.canCalculate
        this.canCalculate = this.left.getCanCalculate() && this.right.getCanCalculate()
        return this.canCalculate
    }
    calculate() {
        switch(this.op.trim()) {
            case '+': return this.left.calculate() + this.right.calculate()
            case '-': return this.left.calculate() - this.right.calculate()
            case '*': return this.left.calculate() * this.right.calculate()
            case '/': return this.left.calculate() / this.right.calculate()
            default: throw 'Unknown op'
        }
    }
    evaluate(goal: number) {
        let newG = 0
        if (this.left.getCanCalculate()) {
            const calc = this.left.calculate()
            //console.log(goal+'='+calc+this.op+'?')
            switch(this.op.trim()) {
                case '+': newG = goal - calc; break
                case '-': newG = calc - goal; break
                case '*': newG = goal / calc; break
                case '/': newG = calc / goal; break
                default: throw 'Unknown op'
            }
            return this.right.evaluate(newG)
        } else {
            const calc = this.right.calculate()
           // console.log(goal+'=?'+this.op+calc)
            switch(this.op.trim()) {
                case '+': newG = goal - calc; break
                case '-': newG = calc + goal; break
                case '*': newG = goal / calc; break
                case '/': newG = calc * goal; break
                default: throw 'Unknown op'
            }
            return this.left.evaluate(newG)
        }
        
    }

}

class Human extends Node {
    getCanCalculate(): boolean {
        return false
    }
    calculate(): number {
        throw new Error("Method not implemented.")
    }
    evaluate(goal: number): number {
        return goal
    }

}