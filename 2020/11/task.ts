export async function taskOne(input: string[]): Promise<void> {
    const seats = input.map(i => i.split(''))
    let last = ''

    let v = JSON.stringify(seats)
    while(v != last) {
        last = v
        let copy = JSON.parse(v) as string[][]
        function get(x: number, y: number) {
            if (x < 0 || y < 0 || x >= copy[0].length || y >= copy.length) return '.'
            return copy[y][x]
        }

        for (let y = 0; y < seats.length; y ++) {
            for (let x = 0; x < seats[y].length; x++) {
                let o = 0
                for (const d of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
                    const s = get(x+d[0], y+d[1])
                    if (s == '#') o++
                }
                if (get(x,y) == 'L' && o == 0) seats[y][x] = '#'
                if (get(x,y) == '#' && o >= 4) seats[y][x] = 'L'
            }
        }
        v = JSON.stringify(seats)
    }
    console.log(seats.flat().map(i => (i == '#' ? 1:0) as number).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    const seats = input.map(i => i.split(''))
    let last = ''

    let v = JSON.stringify(seats)
    while(v != last) {
        last = v
        let copy = JSON.parse(v) as string[][]
        function get(x: number, y: number) {
            if (x < 0 || y < 0 || x >= copy[0].length || y >= copy.length) return ':'
            return copy[y][x]
        }

        for (let y = 0; y < seats.length; y ++) {
            for (let x = 0; x < seats[y].length; x++) {
                let o = 0
                for (const d of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
                    let c = 1
                    let s = ''
                    do {
                        s = get(x+c*d[0], y+c*d[1])
                        c++
                    } while(s=='.')
                    if (s == '#') o++
                }
                if (get(x,y) == 'L' && o == 0) seats[y][x] = '#'
                if (get(x,y) == '#' && o >= 5) seats[y][x] = 'L'
            }
        }
        v = JSON.stringify(seats)
    }
    console.log(seats.flat().map(i => (i == '#' ? 1:0) as number).reduce((a,b)=>a+b,0))
}