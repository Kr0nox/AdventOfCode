export async function taskOne(input: string[]): Promise<void> {
    const nums = getRow(input[0], ",")
    let boards = getBoards(input)

    for (const n of nums) {
        boards = boards.map(b => setNum(b,n))
        const winners = boards.filter(wins)
        if (winners.length > 0) {
            console.log(falseSum(winners[0])*n)
            return
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = getRow(input[0], ",")
    let boards = getBoards(input)

    for (const n of nums) {
        const newB = boards.map(b => setNum(b,n)).filter(b => !wins(b))
        if (newB.length == 0) {
            console.log(n)
            console.log(falseSum(boards[0])*n)
            return
        }
        boards = newB
    }
}

function falseSum(b: Board) {
    let sum = 0
    for (let i = 0; i < b[0].length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (!b[j][i][1]) sum += b[j][i][0] 
        }
    }
    return sum
}

function getBoards(input: string[]) {
    let boards: Board[] = []
    for (let i = 2; i < input.length; i += 6) {
        boards.push(
            [
                getBoardRow(input[i]),
                getBoardRow(input[i+1]),
                getBoardRow(input[i+2]),
                getBoardRow(input[i+3]),
                getBoardRow(input[i+4])
            ]
        )
    }
    return boards
}

function getBoardRow(r: string): Cell[] {
    return getRow(r, " ").map(i => [i, false])
}

function getRow(r: string, seperator: string) {
    return r.split(seperator).filter(i => i != "").map(i => parseInt(i.trim()))
}

type Cell = [number, boolean]
type Board = Cell[][]

function wins(b: Board) {
    for (let i = 0; i < b.length; i++) {
        if(b[i].map(c => c[1]).reduce((a,b)=>a&&b)) return true
    }
    for (let i = 0; i < b[0].length; i++) {
        let boo = true
        for (let j = 0; j < b.length; j++) {
            if (!b[j][i][1]) boo = false
        }
        if (boo) return true
    }
    return false
}

function setNum(b: Board, n: number) {
    for (let i = 0; i < b[0].length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (b[j][i][0] == n) b[j][i][1] = true
        }
    }
    return b
}