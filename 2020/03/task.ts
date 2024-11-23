export async function taskOne(input: string[]): Promise<void> {
    console.log(check(input, 3, 1))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(check(input,1,1)*check(input,3,1)*check(input,5,1)*check(input,7,1)*check(input,1,2));
}

function check(input: string[], xD: number, yD: number) {
    const map = input.map(i => i.split(''))
    const W = map[0].length
    function get(x: number, y: number) {
        return map[y][x % W]
    }
    let y = 0
    let c = 0
    let x = 0
    while(y < map.length) {
        if (get(x,y) == '#') c++
        x += xD
        y += yD
    }
    return c
}