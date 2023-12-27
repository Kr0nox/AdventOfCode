export async function taskOne(input: string[]): Promise<void> {
  const pos = input.map(
    (i) => parseInt(i.replace(" ", "").split(":")[1].trim()) - 1
  );
  const score = input.map((i) => 0);
  let die = 0;
  let rollCount = 0;
  function roll() {
    die++;
    rollCount++;
    const temp = die;
    die %= 100;
    return temp;
  }
  let player = 0;
  while (!score.some((i) => i >= 1000)) {
    const r = roll() + roll() + roll();
    pos[player] = (pos[player] + r) % 10;
    score[player] += pos[player] + 1;
    player = (player + 1) % pos.length;
  }
  console.log(rollCount * Math.min(...score));
}

export async function taskTwo(input: string[]): Promise<void> {
  const pos = input.map(
    (i) => parseInt(i.replace(" ", "").split(":")[1].trim()) - 1
  );
  const dieOccurences = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];

  // [pos1][pos2][score1][score2]
  /*const memo = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () =>
      Array.from({ length: 21 }, () =>
        Array.from(
          { length: 21 },
          () => undefined as [number, number] | undefined
        )
      )
    )
  );*/
  function get(
    pos1: number,
    pos2: number,
    score1: number,
    score2: number,
    player: 0 | 1
  ) {
    if (score1 >= 21) return [1, 0];
    if (score2 >= 21) return [0, 1];
    //if (memo[pos1][pos2][score1][score2] != undefined)
      //return memo[pos1][pos2][score1][score2] as [number, number];
    let val: [number, number] = [0, 0];
    for (let roll = 3; roll <= 9; roll++) {
      let temp = [0, 0];
      if (player == 0) {
        const newPos = (pos1 + roll) % 10;
        const newScore = score1 + newPos + 1;
        temp = get(newPos, pos2, newScore, score2, 1);
      } else {
        const newPos = (pos2 + roll) % 10;
        const newScore = score2 + newPos + 1;
        temp = get(pos1, newPos, score1, newScore, 0);
      }
      val[0] += dieOccurences[roll] * temp[0];
      val[1] += dieOccurences[roll] * temp[1];
    }

    //memo[pos1][pos2][score1][score2] = val;
    return val;
  }

  console.log(Math.max(...get(pos[0], pos[1], 0, 0, 0)))
}
