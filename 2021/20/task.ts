export async function taskOne(input: string[]): Promise<void> {
    task(input, 2)
}


export async function taskTwo(input: string[]): Promise<void> {
    task(input, 50)
}

function task(input: string[], rounds: number) {
    const map = input[0]
    let image: Map<string, boolean> = new Map()
    let nonSpecifiedPixel = false
    let minY = 2
    let maxY = input.length - 1
    let minX = 0
    let maxX = input[2].length
    for (let y = 2; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            image.set(x+'-'+y, input[y][x] == '#')
        }
    }

    function get(x: number, y: number) {
        return image.get(x+'-'+y) ?? nonSpecifiedPixel
    }

    for (let i = 0; i < rounds; i++) {
        let newImage: Map<string, boolean> = new Map() 
        for (let x = minX-1; x <= maxX + 1; x++) {
            let mapping: boolean[] = [false, false, false, false, false, false, false, false, false]
            for (let y = minY-1; y <= maxY + 1; y++) {
                for (let yD = -1; yD <= 1; yD++) {
                    for (let xD= -1; xD <= 1; xD++) {
                        mapping[(xD+1)+3*(yD+1)] = get(x+xD,y+yD)
                    }
                }
                const val = mapping.map((v,i) => v ? 2**(8-i) : 0).reduce((a,b)=>a+b,0)
                newImage.set(x+'-'+y, map[val] == '#')
            }
        }
        minX--
        maxX++
        minY--
        maxY++
        image = newImage
        nonSpecifiedPixel = map[nonSpecifiedPixel ? 511:0] == '#'
    }
    let sum = 0;
    for (const p of image.values()) {
        if(p) sum++
    }
    console.log(sum)
}

function print(image: Map<string, boolean>, defaultBool: boolean) {
    let minY = Infinity
    let maxY = -Infinity
    let minX = Infinity
    let maxX = -Infinity

    for (const k of image.keys()) {
        const c = k.split('-').map(Number)
        if (c[0] > maxX) maxX = c[0]
        if (c[0] < minX) minX = c[0]
        if (c[1] > maxY) maxY = c[1]
        if (c[1] < minY) minY = c[1]
    }
    minY--
    maxY++
    minX--
    maxX++

    for (let y = minY; y <= maxY; y++) {
        let s = ''
        for (let x = minX; x <= maxX; x++) {
            s += get(x,y) ? '#':'.'
        }
        console.log(s)
    }

    function get(x: number, y: number) {
        return image.get(x+'-'+y) ?? defaultBool
    }
}