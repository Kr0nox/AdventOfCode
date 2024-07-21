const HEX = [
    '0', '1', '2', '3','4','5','6','7','8','9','a','b','c','d','e','f'
]

export async function taskOne(input: string[]): Promise<void> {
    const LENGTH = 256
    let list = Array.from({length: LENGTH}, (_, i: number) => i)
    let currentIndex = 0;
    let skipSize = 0;

    const instrcutions = input[0].split(',').map(Number)
    for (const i of instrcutions) {
        reverse(i)
        currentIndex += i + skipSize
        skipSize++
    }
    console.log(list[0] * list[1])

    function reverse(len: number) {
        for (let i = 0; i < len / 2; i++) {
            const temp = list[(currentIndex + i) % LENGTH]
            list[(currentIndex + i) % LENGTH] = list[(currentIndex + len - i - 1) % LENGTH]
            list[(currentIndex + len - i - 1) % LENGTH] = temp
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const LENGTH = 256
    let list = Array.from({length: LENGTH}, (_, i: number) => i)
    let currentIndex = 0;
    let skipSize = 0;

    const instrcutions = input[0].split('').map((s: string) => s.charCodeAt(0))
    instrcutions.push(...[17, 31, 73, 47, 23])
    for (let c = 0; c < 64; c++) {
        for (const i of instrcutions) {
            reverse(i)
            currentIndex += i + skipSize
            currentIndex %= LENGTH
            skipSize++
        }
    }

    let dense = Array.from({length: 16}, () => 0)
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            dense[i] = dense[i] ^ list[i * 16 + j]
        }
    }

    let result = ''
    for (const d of dense) {
        result += HEX[Math.floor(d/16)]
        result += HEX[d%16]
    }
    console.log(result)

    function reverse(len: number) {
        for (let i = 0; i < len / 2; i++) {
            const temp = list[(currentIndex + i) % LENGTH]
            list[(currentIndex + i) % LENGTH] = list[(currentIndex + len - i - 1) % LENGTH]
            list[(currentIndex + len - i - 1) % LENGTH] = temp
        }
    }
}