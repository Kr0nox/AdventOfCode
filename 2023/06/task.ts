function getNumbers(s: string) {
  return s
    .split(" ")
    .filter((x) => x != "")
    .map((x) => parseInt(x.trim()));
}

export async function taskOne(input: string[]): Promise<void> {
  const time = getNumbers(input[0].split(":")[1]);
  const distance = getNumbers(input[1].split(":")[1]);
  let product = 1;
  for (let i = 0; i < time.length; i++) {
    product *= countWays(time[i], distance[i]);
  }
  console.log(product);
}

export async function taskTwo(input: string[]): Promise<void> {
  const time = parseInt(input[0].split(":")[1].split(" ").join(""));
  const distance = parseInt(input[1].split(":")[1].split(" ").join(""));
  console.log(countWays(time, distance));
}

function getDistance(totalTime: number, holdTime: number) {
  return holdTime * (totalTime - holdTime);
}

function countWays(time: number, distance: number) {
  let ways = 0;
  for (let i = 0; i < time; i++) {
    if (getDistance(time, i) > distance) {
      ways++;
    }
  }
  return ways;
}
