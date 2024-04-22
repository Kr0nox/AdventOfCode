export async function taskOne(input: string[]): Promise<void> {
    let p = 0
    for (const i of input) {
        const is = i.split(' ').map(i=>i.trim()).filter(i=>i!='').map(Number)
        if (is[0]+is[1]>is[2]&&is[0]+is[2]>is[1]&&is[1]+is[2]>is[0]) p++
    }
    console.log(p)
}

export async function taskTwo(input: string[]): Promise<void> {
    let p = 0
    for (let i = 0; i < input.length; i += 3) {
        const i1 = input[i].split(' ').map(i=>i.trim()).filter(i=>i!='').map(Number)
        const i2 = input[i+1].split(' ').map(i=>i.trim()).filter(i=>i!='').map(Number)
        const i3 = input[i+2].split(' ').map(i=>i.trim()).filter(i=>i!='').map(Number)
        for (let j = 0; j < 3; j++) {
            if (i1[j]+i2[j]>i3[j]&&i1[j]+i3[j]>i2[j]&&i2[j]+i3[j]>i1[j]) p++
        }
    }
    console.log(p)
}