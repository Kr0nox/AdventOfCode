export async function taskOne(input: string[]): Promise<void> {
    let field = input.map(i => i.split(''))
    const yLen = field.length;
    const xLen = field[0].length

    let moved = false
    let i = 0
    do {
        moved = false
        const newField = field.map(i => i.map(j => j))
        for (let x = 0; x < xLen; x++) {
            for (let y = 0; y < yLen; y++) {
                if (field[y][x] == '>') {
                    if(field[y][(x+1)%xLen] == '.') {
                        newField[y][x] = '.'
                        newField[y][(x+1)%xLen] = '>'
                        moved = true
                    }
                }
            }
        }
        const newerField = newField.map(i => i.map(j => j))
        for (let x = 0; x < xLen; x++) {
            for (let y = 0; y < yLen; y++) {
                if (newField[y][x] == 'v') {
                    if(newField[(y+1)%yLen][x] == '.') {
                        newerField[y][x] = '.'
                        newerField[(y+1)%yLen][x] = 'v'
                        moved = true
                    } 
                }
            }
        }

        
        field = newerField
        i++
    } while(moved)
    console.log(i)
    
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}