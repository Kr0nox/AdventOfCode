export async function taskOne(input: string[]): Promise<void> {
    const field: Record<string, boolean> = {}
    for (let x = 0; x < input[0].length; x++) {
        for (let y = 0; y < input.length; y++) {
            field[x+'-'+y] = (input[y][x] == '#')
        }
    }
    let x = Math.floor(input[0].length / 2)
    let y = Math.floor(input.length / 2)
    let dir = [0,-1]
    
    function get(x: number, y: number) {
        return field[x+'-'+y]??false
    }
    let active = 0;

    for (let i = 0; i < 10000; i++) {
        if (get(x,y)) {
            dir = [-dir[1], dir[0]]   
        } else {
            dir = [dir[1], -dir[0]] 
        }

        field[x+'-'+y] = !get(x,y)
        if (field[x+'-'+y]) {
            active++
            //console.log(x,y)
        }

        x += dir[0]
        y += dir[1]
    }

    console.log(active)
}

export async function taskTwo(input: string[]): Promise<void> {
    enum State {
        CLEAN, INFECTED, WEAKENED, FLAGGED
    }
    const field: Map<string, State> = new Map()
    for (let x = 0; x < input[0].length; x++) {
        for (let y = 0; y < input.length; y++) {
            field.set(x+'-'+y, (input[y][x] == '#' ? State.INFECTED : State.CLEAN))
        }
    }
    let x = Math.floor(input[0].length / 2)
    let y = Math.floor(input.length / 2)
    let dir = [0,-1]
    
    function get(x: number, y: number) {
        return field.get(x+'-'+y)??State.CLEAN
    }
    let active = 0;

    for (let i = 0; i < 10000000; i++) {
        const val = get(x,y)
        switch(val) {
            case State.CLEAN:
                dir = [dir[1], -dir[0]] 
                break;
            case State.INFECTED:
                dir = [-dir[1], dir[0]]   
                break;
            case State.FLAGGED:
                dir = [-dir[0], -dir[1]]
                break;
            case State.WEAKENED:
                break;
        }
        
        switch(val) {
            case State.CLEAN:
                field.set(x+'-'+y, State.WEAKENED)
                break;
            case State.INFECTED:
                field.set(x+'-'+y, State.FLAGGED)
                break;
            case State.FLAGGED:
                field.set(x+'-'+y, State.CLEAN)
                break;
            case State.WEAKENED:
                field.set(x+'-'+y, State.INFECTED)
                active++
                break;
        }

        x += dir[0]
        y += dir[1]
    }


    console.log(active)
}