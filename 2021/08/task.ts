export async function taskOne(input: string[]): Promise<void> {
    console.log(input.map(i => i.split("| ")[1].split(" ").filter(s => s != "")).flat().map(s => s.length).filter(i => [2,3,4,7].includes(i)).length)
}

export async function taskTwo(input: string[]): Promise<void> {
    const numMap = input.map(i => i.split("| ")[0].split(" ").filter(s => s != "")).map(extractMap)
    const resultNums = input.map(i => i.split("| ")[1].split(" ").filter(s => s != "").map(s => s.split("").sort().join("")))

    let result = 0
    for(let i = 0; i < input.length; i++) {
        //let temp = 0
        const nums = resultNums[i].map(j => numMap[i][j])
        for (let j = 0; j < nums.length; j++) {
            result += 10**j * nums[nums.length-1-j]
        }
        //console.log(temp)
    }

    console.log(result)
}

function extractMap(input: string[]): Record<string, number> {
    const result: Record<string,number> = {}
    const one = input.filter(i => i.length == 2)[0].split("")
    const four = input.filter(i => i.length == 4)[0].split("")
    const seven = input.filter(i => i.length == 3)[0].split("")
    const eight = input.filter(i => i.length == 7)[0].split("")

    result[one.sort().join("")] = 1
    result[four.sort().join("")] = 4
    result[seven.sort().join("")] = 7
    result[eight.sort().join("")] = 8

    const zerosixNine = input.filter(i => i.length == 6).map(i => i.split(""))
    const twoThreeFive = input.filter(i => i.length == 5).map(i => i.split(""))

    const nine = zerosixNine.filter(i => i.filter(j => !four.includes(j)).length == 2)[0]
    result[nine.sort().join("")] = 9
    const six = zerosixNine.filter(i => i.filter(j => !one.includes(j)).length == 5)[0]
    result[six.sort().join("")] = 6
    result[
        zerosixNine.map(i => i.sort().join("")).filter(i => i != six.sort().join("") && i != nine.sort().join(""))[0]
    ] = 0

    //console.log(twoThreeFive.map(i => i.filter(j => !one.includes(j)).length))
    const three = twoThreeFive.filter(i => i.filter(j => !one.includes(j)).length == 3)[0]
    result[three.sort().join("")] = 3
    const two = twoThreeFive.filter(i => i.filter(j => !nine.includes(j)).length == 1)[0]
    result[two.sort().join("")] = 2
    result[
        twoThreeFive.map(i => i.sort().join("")).filter(i => i != two.sort().join("") && i != three.sort().join(""))[0]
    ] = 5

    return result
}

/*
 a
b c
 d
e f
 g
*/