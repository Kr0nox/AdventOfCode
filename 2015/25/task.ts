export async function taskOne(input: string[]): Promise<void> {
    const r = /To continue, please consult the code grid in the manual.  Enter the code at row ([0-9]+), column ([0-9]+)./.exec(input[0])
    if (!r) throw input[0]
    let colG = parseInt(r[1])
    let rowG = parseInt(r[2])
    let col = 1
    let row = 1
    let val = 20151125
    while(col != colG || row != rowG) {
        if (col == 0) {
            col = row
            row = 1
        }
        //console.log(col, row, val)
        val = (val * 252533) % 33554393
        col--
        row++
    }
    console.log(val)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}
