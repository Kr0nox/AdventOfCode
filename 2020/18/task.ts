export async function taskOne(input: string[]): Promise<void> {
    console.log(input.map(i => {
        const p = tokenize(i)
        return parse(p,0,p.length-1).val()
    }).reduce((a,b)=>a+b,0))

    function parse(line: string[], start: number, end: number): Exp {
        if (line[end] == ')') {
            let i = end
            let closed = 0
            do {
                if (line[i] == ')') closed++
                if (line[i] == '(') closed--
                i--
            } while(closed != 0)
            const right = parse(line, i+2, end-1)
            if (start >= i) return right
            const left = parse(line, start, i - 1)
            switch (line[i]) {
                case '+': return new Sum(left, right)
                case '*': return new Mul(left, right)
                default: throw 'Unknown op'
            }
        } else if (line[end].match(/^[0-9]+$/)) {
            const right = new Con(Number(line[end]))
            if (start == end) return right
            const left = parse(line, start, end-2)
            switch (line[end-1]) {
                case '+': return new Sum(left, right)
                case '*': return new Mul(left, right)
                default: throw 'Unknown op'
            }
        } else {
            console.log(line, start, end, line[end])
            throw "line error"
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(input.map(i => {
        const p = tokenize(i)
        return parseTerm(p,0,p.length-1).val()
    }).reduce((a,b)=>a+b,0))

    function parseSymbol(line: string[], start:number, end:number, left:Exp): Exp {
        if (line[start] == '*') {
            return new Mul(left, parseTerm(line, start+1, end))
        } else if (line[start] == '+') {
            let right: Exp|undefined
            let newStart = 0
            if (line[start+1] == '(') {
                [right, newStart] = parseBrackets(line, start + 1)
            } else {
                right = new Con(Number(line[start+1]))
                newStart = start+2
            }
            if (newStart >= end) return new Sum(left, right)
            return parseSymbol(line, newStart, end, new Sum(left, right))
        } else {
            console.log(line, start, end, line[start])
            throw "unknown op"
        }
    }

    function parseBrackets(line: string[], start:number): [Exp, number] {
        let count = 0
        let i = start
        do {
            if (line[i] == '(') count++
            if (line[i] == ')') count--
            i++
        } while (count != 0);
        const nL =  parseTerm(line, start+1, i-2)
        return [nL, i]
    }

    function parseTerm(line:string[], start: number, end: number): Exp {
        if (line[start] == '(') {
            const [left, nS] = parseBrackets(line, start)
            if (nS >= end) return left
            return parseSymbol(line, nS, end, left)
        } else {
            if (start == end) return new Con(Number(line[start]))
            return parseSymbol(line, start+1, end, new Con(Number(line[start])))
        }
    }
}

function tokenize(line: string): string[] {
    const trimmed = line.replaceAll(' ', '')
    const parts: string[] = []
    let curPart = ''
    let i = 0
    while(i < trimmed.length) {
        if (trimmed[i].match(/[0-9]/)) {
            curPart += trimmed[i]
        } else {
            if (curPart.length > 0)
                parts.push(curPart)
            parts.push(trimmed[i])
            curPart = ''
        }
        i++
    }
    if (curPart.length > 0)
        parts.push(curPart)
    return parts
}



abstract class Exp {
    public abstract val():number;
}

class Con extends Exp {
    value: number
    constructor(_val: number) {super();this.value = _val}
    public val() {return this.value}
}

class Sum extends Exp {
    v1: Exp
    v2: Exp
    constructor(_v1: Exp, _v2: Exp) {
        super()
        this.v1 = _v1
        this.v2 = _v2
    }

    public val() {
        const a1 = this.v1.val()
        const a2 = this.v2.val()
        return a1 + a2
    }
}

class Mul extends Exp {
    v1: Exp
    v2: Exp
    constructor(_v1: Exp, _v2: Exp) {
        super()
        this.v1 = _v1
        this.v2 = _v2
    }

    public val() {
        const a1 = this.v1.val()
        const a2 = this.v2.val()
        return a1 * a2
    }
}