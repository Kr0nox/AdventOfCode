export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    list[1] = 12
    list[2] = 2

    console.log(run(list)[0])
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const copy = JSON.parse(JSON.stringify(list))
            copy[1] = i
            copy[2] = j
            if (run(copy)[0] == 19690720) {
                console.log(i * 100 + j)
                return
            }
        }
    }
}

function run(list: Record<number, number>) {
    let i = 0
    while(list[i] != 99) {
        if (list[i] == 1) {
            list[list[i+3]] = list[list[i+1]] + list[list[i+2]]
        } else if (list[i] == 2) {
            list[list[i+3]] = list[list[i+1]] * list[list[i+2]]
        } else {
            throw i
        }
        i+=4
    }
    return list
}