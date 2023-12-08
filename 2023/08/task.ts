export async function taskOne(input: string[]): Promise<void> {
    const instructions = input[0].split("")

    const maps = getMap(input.slice(2))
    let position = 'AAA'
    let counter = 0
    let instructionSize = instructions.length
    while (position != 'ZZZ') {
        const step = maps.get(position)
        if (!step) throw "Unknown position"
        if (instructions[counter % instructionSize] == 'L') {
            position = step.l
        } else {
            position = step.r
        }
        counter++
    }
    console.log(counter)
}

export async function taskTwo(input: string[]): Promise<void> {
    const instructions = input[0].split("")

    const maps = getMap(input.slice(2))
    const positions = Array.from(maps.keys()).filter(s => s.endsWith("A"))
    let instructionSize = instructions.length
    let counter = 0
    let finish = positions.map(s => -1)
    while (finish.some(s => s < 0)) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].endsWith("Z") && finish[i] < 0 && counter % instructionSize == 0) {
                finish[i] = counter
            }

            const step = maps.get(positions[i])
            if (!step) throw "Unknown position"
            if (instructions[counter % instructionSize] == 'L') {
                positions[i] = step.l
            } else {
                positions[i] = step.r
            }
        
        }
        counter++
    }

    console.log(leastCommonMultiple(finish))
}

interface LR {
    l: string
    r: string
}

function getMap(mapsInput: string[]) {
    const maps: Map<string, LR> = new Map()
    mapsInput.forEach(s => {
        const r = RegExp(`([A-Z 0-9]{3}) = \\(([A-Z 0-9]{3}), ([A-Z 0-9]{3})\\)`).exec(s)
        if (r == null) {
            throw "Not matching"
        }
        maps.set(r[1], {l: r[2], r: r[3]})
    })
    return maps
}

function leastCommonMultiple(arr: number[]) {

    function gcd(a: number, b: number): number {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a: number, b: number) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = Math.min(...arr);
    arr.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}