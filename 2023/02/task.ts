export async function taskOne(input: string[]): Promise<void> {
    console.log(getGames(input).filter(validGame).reduce((acc, curr) => acc + curr.id, 0)) 
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(getGames(input).map(getMinSet).map(c => c.red * c.green * c.blue).reduce((acc, curr) => acc + curr, 0))
}

interface Game {
    id: number;
    colors: Color[]
}

interface Color {
    red: number;
    blue: number;
    green: number;
}

function validGame(game: Game) {
    return !game.colors.some(c => 
        c.red > 12 || c.green > 13 || c.blue > 14
    );
}

function getMinSet(game: Game) {
    const col = {red: 0, green: 0, blue: 0}
    for (const c of game.colors) {
        col.red = Math.max(col.red, c.red)
        col.green = Math.max(col.green, c.green)
        col.blue = Math.max(col.blue, c.blue)
    }
    return col
}

function getGames(input: string[]) {
    return input.map(getGame)
}

function getGame(gameString: string): Game {
    gameString = gameString.replace(' ', '');
    const parts = gameString.split(':')
    const gameIdParsed = RegExp('Game([0-9]+)').exec(parts[0])
    let id = -1;
    if (gameIdParsed) {
        id = parseInt(gameIdParsed[1])
    }
    const gameStrings = parts[1].split(";")
    const colors : Color[] = []

    for (const game of gameStrings) {
        let r = -1;
        let g = -1;
        let b = -1;
        for (const col of game.split(",")) {
            const red = RegExp('([0-9]+) red').exec(col)
            if (red) {
                r = parseInt(red[1])
                continue;
            }
            const green = RegExp('([0-9]+) green').exec(col)
            if (green) {
                g = parseInt(green[1])
                continue;
            }
            const blue = RegExp('([0-9]+) blue').exec(col)
            if (blue) {
                b = parseInt(blue[1])
                continue;
            }
        }
        colors.push({
            red: r,
            green: g,
            blue: b
        })
    }

    return {
        id: id,
        colors: colors
    }
 }