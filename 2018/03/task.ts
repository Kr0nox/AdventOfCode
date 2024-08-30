export async function taskOne(input: string[]): Promise<void> {
    const fabric = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0))
    for (const i of input) {
        const r = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/.exec(i)!
        const startX = Number(r[2])
        const startY = Number(r[3])
        const lenX = Number(r[4])
        const lenY = Number(r[5])
        for (let x = 0; x < lenX; x++) {
            for (let y = 0; y < lenY; y++) {
                fabric[startX + x][startY + y]++
            }
        }
    }
    
    let count = 0;
    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            if(fabric[x][y] > 1) count++
        }
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    const fabric = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0))
    for (const i of input) {
        const r = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/.exec(i)!
        const startX = Number(r[2])
        const startY = Number(r[3])
        const lenX = Number(r[4])
        const lenY = Number(r[5])
        for (let x = 0; x < lenX; x++) {
            for (let y = 0; y < lenY; y++) {
                fabric[startX + x][startY + y]++
            }
        }
    }

    for (const i of input) {
        const r = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/.exec(i)!
        const startX = Number(r[2])
        const startY = Number(r[3])
        const lenX = Number(r[4])
        const lenY = Number(r[5])
        let overlap = false
        for (let x = 0; x < lenX; x++) {
            for (let y = 0; y < lenY; y++) {
                if (fabric[startX + x][startY + y] > 1) {
                    overlap = true
                    break
                }
            }
            if (overlap) break
        }
        if (!overlap) {
            console.log(r[1])
            return
        }
    }
}