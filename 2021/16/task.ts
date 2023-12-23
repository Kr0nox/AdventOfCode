export async function taskOne(input: string[]): Promise<void> {
    const binary = input[0].split("").map(i => hexToBin[i].split("")).flat()
    const unit = parseUnit(binary)[0]
    let sum = 0
    function add(unit: Node) {
        sum += unit.version
        if ((unit as Operator).children != undefined) {
            for (const c of (unit as Operator).children) {
                add(c)
            }
        }
    }
    add(unit)
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const binary = input[0].split("").map(i => hexToBin[i].split("")).flat()
    const unit = parseUnit(binary)[0]
    function parse(unit: Node): number {
        if (unit.type == 4) return (unit as Literal).value
        const children = (unit as Operator).children.map(parse)
        switch(unit.type) {
            case 0: return children.reduce((a,b)=>a+b,0)
            case 1: return children.reduce((a,b)=>a*b,1)
            case 2: return Math.min(...children)
            case 3: return Math.max(...children)
            case 5: return children[0] > children[1] ? 1:0
            case 6: return children[0] < children[1] ? 1:0
            case 7: return children[0] == children[1] ? 1:0
        }
        throw "Unknown type " + unit.type
    }
    console.log(parse(unit))
}

function parseUnit(binary: string[]): [Node, number] {
    const version = parseInt(binary.slice(0,3).join(""), 2)
    const type = parseInt(binary.slice(3,6).join(""), 2)
    if (type == 4) {
        let i = 1
        const nums: string[] = []
        do {
            i += 5
            nums.push(...binary.slice(i+1,i+5))
        } while (binary[i] == '1')
        //while (i%4 != 0) i++
        return [{
            type: type,
            version: version,
            value: parseInt(nums.join(""), 2)
        } as Literal, i+5]
    } else {
        const indicator = binary[6]
        if (indicator == '0') {
            const length = parseInt(binary.slice(7, 22).join(""),2) + 22
            let i = 22
            const children: Node[] = []
            while(i<length) {
                const [_c,_i]  = parseUnit(binary.slice(i))
                children.push(_c)
                i += _i
            }
            return [{
                type: type,
                version: version,
                children: children
            } as Operator, i]
        } else {
            const count = parseInt(binary.slice(7, 18).join(""),2)
            let i = 18
            const children: Node[] = []
            for (let j = 0; j < count; j++) {
                const [_c,_i]  = parseUnit(binary.slice(i))
                children.push(_c)
                i += _i
            }
            return [{
                type: type,
                version: version,
                children: children
            } as Operator, i]
        }
    }
}

const hexToBin: Record<string, string> = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

interface Node {
    type: number
    version: number
}

interface Literal extends Node {
    value: number
}

interface Operator extends Node {
    children: Node[]
}