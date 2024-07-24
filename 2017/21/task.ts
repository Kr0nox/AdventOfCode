export async function taskOne(input: string[]): Promise<void> {
    task(input, 5)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, 18)
}

function task(input: string[], ITERATIONS: number) {
    const book: Map<string, string> = new Map() 
    input.forEach(i => {
        const r = /([.#/]+) => ([.#/]+)/.exec(i)!
        const keys = getKeyList(r[1].split('/'))
        for (const k of keys) {
            book.set(k, r[2])
        }
    })
    let image = [
        '.#.', '..#', '###'
    ]

    for (let c = 0; c < ITERATIONS; c++) {
        const sideLength = image.length % 2 == 0 ? 2:3
        let newImage = Array.from({length: image.length / sideLength * (sideLength+1)}, () => '')
        for (let i = 0; i < image.length / sideLength; i++) {
            for (let j = 0; j < image.length / sideLength; j++) {
                let key = ''
                for (let k = 0; k < sideLength; k++) {
                    for (let l = 0; l < sideLength; l++) {
                        key += image[j*sideLength+l][i*sideLength+k]
                    }
                    if (k != sideLength-1) key += '/'
                }
                const newPart = book.get(key)
                if (!newPart) throw key
                const newParts = newPart.split('/')
                for (let k = 0; k <= sideLength; k++) {
                    newImage[j*(sideLength+1)+k] += newParts[k]
                }
            }
        }
        image = newImage
    }
    console.log(image.map(i => i.split('')).flat().filter(i => i == '#').length)

    function getKeyList(base: string[]) {
        const kbase = Array.from(base).join('/')
        const kf1 = Array.from(base).reverse().join('/')
        const kr180 = kf1.split('/').map(k => k.split('').reverse().join('')).join('/')
        const kr90 = Array.from(base).map((l, idx) => l.split('').map((_, jdx) => base[jdx].charAt(idx)).reverse().join('')).join('/')
        const kr270 = kr180.split('/').map((l, idx) => l.split('').map((_, jdx) => base[jdx].charAt(idx)).join('')).reverse().join('/')
        
        const keys = new Set<string>()
        for (const kr of [kbase, kr90, kr180, kr270]) {
            for (const k of getFlips(kr.split('/'))) {
                keys.add(k)
            }
        }
        return Array.from(keys)
    }

    function getFlips(base: string[]): string[] {
        const kf1 = Array.from(base).reverse().join('/')
        const kf2 = Array.from(base).map(k => k.split('').reverse().join('')).join('/')
        return [base.join('/'), kf1, kf2]
    }
}