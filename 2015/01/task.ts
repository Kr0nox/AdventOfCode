export async function taskOne(input: string[]): Promise<void> {
    let count = 0;
    for (let i = 0; i < input[0].length; i++) {
        if (input[0][i] == '(') {
            count++;
        } else {
            count--
        }
    }
    console.log(count);
}

export async function taskTwo(input: string[]): Promise<void> {
    let count = 0
    for (let i = 0; i < input[0].length; i++) {
        if (input[0][i] == '(') {
            count++
        } else {
            count--
        }
        if (count == -1) {
            console.log(i+1);
            return;
        }
    }
}