export async function taskOne(input: string[]): Promise<void> {
    let pos = 5
    let res = ""
    for(const i of input) {
        for (const j of i.split("")) {
            if (j == "U") 
                if (pos > 3) pos -= 3
            if (j == "D")
                if (pos < 7) pos += 3
            if (j == 'R')
                if (pos % 3 != 0) pos++    
            if (j == 'L')
                if (pos % 3 != 1) pos--   
        }
        res += pos.toString()
    }
    console.log(res)
}

export async function taskTwo(input: string[]): Promise<void> {
    const field =[
        ['', '', '1', '', ''],
        ['', '2', '3', '4', ''],
        ['5','6','7','8','9'],
        ['','A', 'B','C', ''],
        ['', '', 'D', '', '']
    ]
    let posX = 0
    let posY = 2
    let res = ""
    for(const i of input) {
        for (const j of i.split("")) {
            if (j == "U") 
                if (posY > 0 && field[posY-1][posX] != '') posY--
            if (j == "D")
                if (posY < 4 && field[posY+1][posX] != '') posY++
            if (j == 'R')
                if (posX < 4 && field[posY][posX+1] != '') posX++    
            if (j == 'L')
                if (posX > 0 && field[posY][posX-1] != '') posX-- 
            
            //console.log(field[posY][posX])  
        }
        //console.log('')
        res += field[posY][posX]
    }
    console.log(res)
}