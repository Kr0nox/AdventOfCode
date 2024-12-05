export async function taskOne(input: string[]): Promise<void> {
  const before: Record<number, number[]> = {};
  let i = 0;
  while (input[i] != "") {
    const nums = input[i].split("|").map(Number);
    if (before[nums[0]] == undefined) before[nums[0]] = [];
    before[nums[0]].push(nums[1]);
    i++;
  }
  i++;
  let s = 0;
  while (i < input.length) {
    const nums = input[i].split(",").map(Number);
    let correct = true;
    for (let i = 0; i < nums.length - 1; i++) {
      if (before[nums[i]] == undefined) {
        correct = false;
        break;
      }
      for (let j = i + 1; j < nums.length; j++) {
        if (!before[nums[i]].includes(nums[j])) correct = false;
      }
    }
    if (correct) s += nums[Math.floor(nums.length / 2)];
    i++;
  }
  console.log(s);
}

export async function taskTwo(input: string[]): Promise<void> {
  const before: Record<number, number[]> = {};
  let i = 0;
  while (input[i] != "") {
    const nums = input[i].split("|").map(Number);
    if (before[nums[0]] == undefined) before[nums[0]] = [];
    before[nums[0]].push(nums[1]);
    i++;
  }
  i++;
  let s = 0;
  while (i < input.length) {
    let nums = input[i].split(",").map(Number);
    let correct = true;
    for (let i = 0; i < nums.length - 1; i++) {
      if (before[nums[i]] == undefined) {
        correct = false;
        break;
      }
      for (let j = i + 1; j < nums.length; j++) {
        if (!before[nums[i]].includes(nums[j])) correct = false;
      }
    }
    if (!correct) {
      nums = nums
        .map((n) => [
          n,
          (before[n] ?? []).filter((i) => nums.includes(i)).length,
        ])
        .sort((a, b) => b[1] - a[1])
        .map((n) => n[0]);
      s += nums[Math.floor(nums.length / 2)];
    }
    i++;
  }
  console.log(s);
}
