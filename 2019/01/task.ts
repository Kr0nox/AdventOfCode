export async function taskOne(input: string[]): Promise<void> {
    console.log(input.map(Number).map(i => Math.floor(i/3)-2).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(input.map(Number).map(calc).reduce((a,b)=>a+b,0))

    function calc(c: number) {
        let sum = 0
        let fuel = Math.floor(c/3)-2
        while(fuel > 0) {
            sum += fuel
            fuel = Math.floor(fuel/3)-2
        }
        return sum
    }
}