const SIZE = 100;
const g = Array.from({length:101}, () => Array.from({length: SIZE + 2}, () => Array.from({length: SIZE + 2}, () => false)))

export async function taskOne(input: string[]): Promise<void> {
    parse(input)

    for (let s = 0; s < 100; s++) {
        for (let x = 1; x <= SIZE; x++) {
            for (let y = 1; y <= SIZE; y++) {
                step(x,y,s)
            }
        }
    }
    let c = 0
    for (let x = 1; x <= SIZE; x++) {
        for (let y = 1; y <= SIZE; y++) {
            if (g[100][x][y]) c++
        }
    }
    console.log(c)

    
    function step(x: number, y: number, t: number) {
        let c = 0
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue
                if(g[t][x+dx][y+dy]) c++
            }
        }
        g[t+1][x][y] = g[t][x][y] && (c==2 || c==3) || !g[t][x][y] && c==3
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    parse(input)
    
    for (let s = 0; s < 100; s++) {
        for (let x = 1; x <= SIZE; x++) {
            for (let y = 1; y <= SIZE; y++) {
                step(x,y,s)
            }
        }
    }
    let c = 0
    for (let x = 1; x <= SIZE; x++) {
        for (let y = 1; y <= SIZE; y++) {
            if (g[100][x][y]) c++
        }
    }
    console.log(c)

    
    function step(x: number, y: number, t: number) {
        if (x==1 || x == SIZE) {
            if(y == 1 || y == SIZE) {
                g[t+1][x][y] = true
                return
            }
        }
        let c = 0
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue
                if(g[t][x+dx][y+dy]) c++
            }
        }
        g[t+1][x][y] = g[t][x][y] && (c==2 || c==3) || !g[t][x][y] && c==3
    }
}

function parse(input: string[]) {
    for (let x = 1; x <= SIZE; x++) {
        for (let y = 1; y <= SIZE; y++) {
            g[0][x][y] = input[x-1][y-1] == '#'
        }
    }
}