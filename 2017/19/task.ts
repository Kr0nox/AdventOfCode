export async function taskOne(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(''))
    const pos = [input[0].indexOf('|'), 0]
    let dir = [0, 1]
    let r = ''
    function get(y: number, x: number) {
        if (x < 0 || y < 0 || y >= input.length || x >= input[0].length) return ' '
        return input[y][x]
    }

    while (true) {
        if (get( pos[1], pos[0]).match(/[A-Za-z]/)){
            r += input[pos[1]][pos[0]]
        }

        if (!get(pos[1] + dir[1], pos[0] + dir[0]).match(/[A-Za-z|+-]/)) {
            const l = [-dir[1], dir[0]]
            const r = [dir[1], -dir[0]]

            if (get(pos[1] + l[1], pos[0] + l[0]).match(/[A-Za-z|+-]/)) {
                dir = l
            } else if (get(pos[1] + r[1], pos[0] + r[0]).match(/[A-Za-z|+-]/)) {
                dir = r
            } else {
                break
            }
        }
        pos[0] += dir[0]
        pos[1] += dir[1]
    }
    console.log(r)
}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(''))
    const pos = [input[0].indexOf('|'), 0]
    let dir = [0, 1]
    let r = 0
    function get(y: number, x: number) {
        if (x < 0 || y < 0 || y >= input.length || x >= input[0].length) return ' '
        return input[y][x]
    }

    while (true) {
        r++

        if (!get(pos[1] + dir[1], pos[0] + dir[0]).match(/[A-Za-z|+-]/)) {
            const l = [-dir[1], dir[0]]
            const r = [dir[1], -dir[0]]

            if (get(pos[1] + l[1], pos[0] + l[0]).match(/[A-Za-z|+-]/)) {
                dir = l
            } else if (get(pos[1] + r[1], pos[0] + r[0]).match(/[A-Za-z|+-]/)) {
                dir = r
            } else {
                break
            }
        }
        pos[0] += dir[0]
        pos[1] += dir[1]
    }
    console.log(r)
}