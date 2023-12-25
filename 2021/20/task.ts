export async function taskOne(input: string[]): Promise<void> {
    const map = input[0]
    let image: Image = {}

    function setPixel(x:number,y:number,v:boolean, i: Image) {
        if (i[x] == undefined) i[x] = {}
        i[x][y] = v
    }
    function getPixel(x:number,y:number,i: Image) {
        if (i[x] == undefined) return false
        if (i[x][y] == undefined) return false
        return i[x][y]
    }

    for (let i = 2; i<input.length; i++)
}

type Image: Record<number, Record<number, boolean>>

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}