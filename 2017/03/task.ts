export async function taskOne(input: string[]): Promise<void> {
    let goal = Number(input[0])
    let sideLength = 1;
    while(goal > sideLength*sideLength) {
        sideLength +=2
    }

    let corner1 = sideLength*sideLength
    let corner2 = corner1-sideLength+1
    while(corner2 > goal) {
        corner1 = corner2
        corner2 = corner1-sideLength+1
    }
    let middle = (corner2+corner1)/2
    let dist = (sideLength-1)/2+Math.abs(middle-goal)
    console.log(dist, sideLength, middle, corner1, corner2)
}

export async function taskTwo(input: string[]): Promise<void> {
    const pos: Record<string, number> = {'0:0':1}
    let goal = Number(input[0])

    function get(x: number, y: number) {
        const key = x+':'+y
        if (pos[key] != undefined) return pos[key]
        return 0
    }

    function calc(x: number, y: number) {
        let s = 0
        for (let xd = -1; xd <= 1; xd++) {
            for (let yd = -1; yd <= 1; yd++) {
                if (xd == 0 && yd == 0) continue;
                s += get(x + xd, y + yd)
            }
        }
        pos[x+":"+y] = s
        return s
    }

    let last = 1
    let sideMax = 0
    let d = [1,0]
    let x = 0
    let y = 0
    while(last <= goal) {
        x += d[0]
        y += d[1]
        if (x == sideMax + 1) {
            d = [0, 1]
            sideMax++
        } else if (x == sideMax  && y == -sideMax) {}
        else if (Math.abs(x) == sideMax && Math.abs(y) == sideMax) {
             if(d[1] == 0) {
                d[1] = d[0]
                d[0] = 0
             } else {
                d[0] = -d[1]
                d[1] = 0
             }
        }
        last = calc(x,y)
    }
    console.log(last)
}