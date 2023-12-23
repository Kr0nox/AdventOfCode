import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const blocks: [Coord, Coord][] = input.map(i => i.split('~').map(j => parseNumberList(j, ','))) as [Coord, Coord][]
    dropDown(blocks)

    // count removable
    console.log(removeBlocks(blocks)[0].size)
}

export async function taskTwo(input: string[]): Promise<void> {
    const blocks: [Coord, Coord][] = input.map(i => i.split('~').map(j => parseNumberList(j, ','))) as [Coord, Coord][]
    dropDown(blocks)
    const single = removeBlocks(blocks)[1]
    const blocksBelow = blocks.map((i, ind) => getSupportingBlocks(blocks, ind))
    let sum = 0
    for (const b of single) {
        const willBeRemoved = new Set([b])
        for (let i = b+1; i < blocks.length; i++) {
            if (blocksBelow[i].length == 0) continue
            if (blocksBelow[i].every(j => willBeRemoved.has(j))) {
                willBeRemoved.add(i)
            }
        }
        sum += willBeRemoved.size - 1
    }
    console.log(sum)
}

type Coord = [number, number, number]

function dropDown(blocks: [Coord, Coord][]) {
    blocks.sort((a,b) => minCoord(a) - minCoord(b))
    let i = 0
    while (i < blocks.length) {
        if (minCoord(blocks[i]) == 1) {
            i++
            continue
        }
        let canMoveDown = true
        for (let j = i-1; j >= 0; j--) {
            if (minCoord(blocks[i]) - maxCoord(blocks[j]) == 1) {
                if (isAbove(blocks[i], blocks[j])) {
                    canMoveDown = false
                    break
                }
            }
        }
        if (canMoveDown) {
            blocks[i][0][2]--
            blocks[i][1][2]--
        } else i++
    }
    blocks.sort((a,b) => minCoord(a) - minCoord(b))
}

function removeBlocks(blocks: [Coord, Coord][]) {
    const removable: Set<number> = new Set()
    const singleSupports: Set<number> = new Set()
    for (let j = 0; j < blocks.length; j++) {
        let hasBlockAbove = false
        for (let k = j+1; k < blocks.length; k++) {
            if (minCoord(blocks[k]) - maxCoord(blocks[j]) == 1) {
                if (isAbove(blocks[k], blocks[j])) {
                    hasBlockAbove = true
                    break
                }
            }
        }
        if (!hasBlockAbove) {
            removable.add(j)
        }
        const blocksBelow = getSupportingBlocks(blocks, j)
        if (blocksBelow.length > 1) {
            for (const b of blocksBelow) {
                removable.add(b)
            }
        } else if (blocksBelow.length == 1) {
            singleSupports.add(blocksBelow[0])
        }
    }
    // Remove blocks that support one block as single, but could be chosen for removal by others
    for (const b of singleSupports) {
        removable.delete(b)
    }
    return [removable, singleSupports]
}

function getSupportingBlocks(blocks: [Coord, Coord][], j: number) {
    const blocksBelow: number[] = []
    for (let k = j-1; k >= 0; k--) {
        if (minCoord(blocks[j]) - maxCoord(blocks[k]) == 1) {
            if (isAbove(blocks[k], blocks[j])) {
                blocksBelow.push(k)
            }
        }
    }
    return blocksBelow
}

function minCoord(b: [Coord, Coord], c = 2) {
    return Math.min(b[0][c], b[1][c])
}

function maxCoord(b: [Coord, Coord], c = 2) {
    return Math.max(b[0][c], b[1][c])
}

function isAbove(a: [Coord, Coord], b: [Coord, Coord]) {

    function ins(_a: number, _b: number, _c: number) {
        return _a <= _b && _b <= _c
    }

    const aMinX = minCoord(a, 0)
    const aMaxX = maxCoord(a, 0)
    const aMinY = minCoord(a, 1)
    const aMaxY = maxCoord(a, 1)

    const bMinX = minCoord(b, 0)
    const bMaxX = maxCoord(b, 0)
    const bMinY = minCoord(b, 1)
    const bMaxY = maxCoord(b, 1)

    const xInside = ins(bMinX, aMaxX, bMaxX) || ins(bMinX, aMinX, bMaxX) || ins(aMinX, bMaxX, aMaxX) || ins(aMinX, bMinX, aMaxX)
    const yInside = ins(bMinY, aMaxY, bMaxY) || ins(bMinY, aMinY, bMaxY) || ins(aMinY, bMaxY, aMaxY) || ins(aMinY, bMinY, aMaxY)
    return xInside && yInside
}
