export async function taskOne(input: string[]): Promise<void> {
    let field = input.map(i => i.split(''))
    const yLen = field.length;
    const xLen = field[0].length

    let moved = false
    let i = 0
    do {
        moved = false
        const newField = field.map(i => i.map(j => '.'))
        for (let x = 0; x < xLen; x++) {
            for (let y = 0; y < yLen; y++) {
                if (field[y][x] == '>') {
                    if(field[y][(x+1)%xLen] == '.') {
                        newField[y][(x+1)%xLen] = '>'
                        moved = true
                    } else {
                        newField[y][x] = '>'
                    }
                } 
                if (field[y][x] == 'v') {
                    if(field[(y+1)%yLen][x] == '.') {
                        newField[(y+1)%yLen][x] = 'v'
                        moved = true
                    } else {
                        newField[y][x] = 'v'
                    }
                } 
            }
        }
        field = newField
        i++
        console.log(i)
    } while(moved)
    console.log(i)
    
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}