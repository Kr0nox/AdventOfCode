export async function taskOne(input: string[]): Promise<void> {
    const scanner: Scanner[] = []
    for (let i = 0; i < input.length; i++) {
        if (input[i].startsWith('--')) scanner.push({points: [], absoluteDistances: []})
        else if (input[i] == '') continue
        else {
            let point = input[i].split(',').map(Number)

            const j = scanner.length - 1
            for (const b of scanner[j].points) {
                let d = 0
                for (let k of [1,2,3]) {
                    d += Math.abs(b[k] - point[k])
                }
                scanner[j].absoluteDistances.push(d)
            }
            scanner[j].points.push(point)
        }
    }
    
    
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Scanner {
    points: number[][]
    absoluteDistances: number[]
}