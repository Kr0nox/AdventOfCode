export async function taskOne(input: string[]): Promise<void> {
    const image = input[0].split('').map(Number)
    const W = 25
    const H = 6
    let zeros = Infinity
    let ones = 0
    let twos = 0
    let min = Infinity
    let val = 0
    for (let i = 0; i < image.length; i++) {
        if (i % (W*H) == 0) {
            if (zeros < min) {
                min = zeros
                val = ones * twos
            }
            zeros = 0
            ones = 0
            twos = 0
        }
        if(image[i] == 0) zeros++
        if(image[i] == 1) ones++
        if(image[i] == 2) twos++
    }
    if (zeros < min) {
        min = zeros
        val = ones * twos
    }
    console.log(val)

}

export async function taskTwo(input: string[]): Promise<void> {
    const image = input[0].split('').map(Number)
    const W = 25
    const H = 6
    const layers: number[][] = []
    
    for (let i = 0; i < image.length; i+=(W*H)) {
        const curLayer = [] as number[]
        for (let x = i; x < i+(W*H); x++) {
            curLayer.push(image[x])
        }
        layers.push(curLayer)
    }
    for (let y = 0; y < H; y++) {
        let row = ""
        for (let x = 0; x < W; x++) {
            for (let l = 0; l < layers.length; l++) {
                const p = layers[l][x+W*y]
                if (p == 0) {
                    row += ' '
                    break
                }
                if (p == 1) {
                    row += '#'
                    break
                }
            }
        }
        console.log(row)
    }
}