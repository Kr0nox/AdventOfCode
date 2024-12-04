export async function taskOne(input: string[]): Promise<void> {
    let count = 0;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length-3; x++) {
            if (input[y][x] == 'X' && input[y][x+1] == 'M' && input[y][x+2] == 'A' && input[y][x+3] == 'S') count++
        }
    }
    for (let y = 0; y < input.length-3; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'X' && input[y+1][x] == 'M' && input[y+2][x] == 'A' && input[y+3][x] == 'S') count++
        }
    }
    for (let y = 0; y < input.length; y++) {
        for (let x = 3; x < input[y].length; x++) {
            if (input[y][x] == 'X' && input[y][x-1] == 'M' && input[y][x-2] == 'A' && input[y][x-3] == 'S') count++
        }
    }
    for (let y = 3; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'X' && input[y-1][x] == 'M' && input[y-2][x] == 'A' && input[y-3][x] == 'S') count++
        }
    }

    for (let y = 0; y < input.length - 3; y++) {
        for (let x = 0; x < input[y].length-3; x++) {
            if (input[y][x] == 'X' && input[y+1][x+1] == 'M' && input[y+2][x+2] == 'A' && input[y+3][x+3] == 'S') count++
        }
    }


    for (let y = 3; y < input.length; y++) {
        for (let x = 3; x < input[y].length; x++) {
            if (input[y][x] == 'X' && input[y-1][x-1] == 'M' && input[y-2][x-2] == 'A' && input[y-3][x-3] == 'S') count++
        }
    }

    for (let y = 0; y < input.length-3; y++) {
        for (let x = 3; x < input[y].length; x++) {
            if (input[y][x] == 'X' && input[y+1][x-1] == 'M' && input[y+2][x-2] == 'A' && input[y+3][x-3] == 'S') count++
        }
    }
    for (let y = 3; y < input.length; y++) {
        for (let x = 0; x < input[y].length-3; x++) {
            if (input[y][x] == 'X' && input[y-1][x+1] == 'M' && input[y-2][x+2] == 'A' && input[y-3][x+3] == 'S') count++
        }
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    const aPositions = new Set<string>()
    for (let y = 0; y < input.length - 2; y++) {
        for (let x = 0; x < input[y].length-2; x++) {
            if (input[y][x] == 'M' && input[y+1][x+1] == 'A' && input[y+2][x+2] == 'S') aPositions.add((x+1)+'-'+(y+1))
        }
    }


    for (let y = 2; y < input.length; y++) {
        for (let x = 2; x < input[y].length; x++) {
            if (input[y][x] == 'M' && input[y-1][x-1] == 'A' && input[y-2][x-2] == 'S') aPositions.add((x-1)+'-'+(y-1))
        }
    }
    let count = 0

    for (let y = 0; y < input.length-2; y++) {
        for (let x = 2; x < input[y].length; x++) {
            if (input[y][x] == 'M' && input[y+1][x-1] == 'A' && input[y+2][x-2] == 'S') {
                if (aPositions.has((x-1)+'-'+(y+1))) count++
            }
        }
    }
    for (let y = 2; y < input.length; y++) {
        for (let x = 0; x < input[y].length-2; x++) {
            if (input[y][x] == 'M' && input[y-1][x+1] == 'A' && input[y-2][x+2] == 'S') {
                if (aPositions.has((x+1)+'-'+(y-1))) count++
            }
        }
    }
    console.log(count)
}