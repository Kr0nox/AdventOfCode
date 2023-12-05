export async function taskOne(input: string[]): Promise<void> {
  console.log(
    input
      .map(parseCard)
      .map(getScore)
      .reduce((a, b) => a + b, 0)
  );
}

export async function taskTwo(input: string[]): Promise<void> {
  dpPart2 = new Array(input.length).fill(-1)
  cards = input.map(parseCard)
  let counter = 0
  for (let i = 0; i < input.length; i++) {
    counter += getCardScore(i)
  }
  console.log(counter)
}

interface Card {
  winningNumbers: number[];
  scratchedNumbers: number[];
  winCount: number;
}

function parseCard(input: string): Card {
  const numbers = input.split(":")[1];
  const [winningNumbers, scratchedNumbers] = numbers.split("|");
  const c = {
    winningNumbers: winningNumbers
      .trim()
      .split(" ")
      .filter((c) => c != "")
      .map((n) => parseInt(n.trim())),
    scratchedNumbers: scratchedNumbers
      .trim()
      .split(" ")
      .filter((c) => c != "")
      .map((n) => parseInt(n.trim())),
    winCount: 0,
  };
  c.winCount = c.winningNumbers.filter((n) =>
    c.scratchedNumbers.includes(n)
  ).length;
  return c;
}

function getScore(card: Card): number {
  if (card.winCount > 0) {
    return 2 ** (card.winCount - 1);
  }
  return 0;
}

let cards: Card[]
let dpPart2: number[];

function getCardScore(index: number) {
  if(dpPart2[index] >= 0) {
    return dpPart2[index]
  }
  if (cards[index].winCount == 0) {
    dpPart2[index] = 1
    return 1
  }
  let counter = 1;
  for (let i = index + 1; i <= index + cards[index].winCount; i++) {
    counter += getCardScore(i)
  }
  return counter
}