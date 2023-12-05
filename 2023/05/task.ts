export async function taskOne(input: string[]): Promise<void> {
  const seeds = getNumbers(input[0].split(":")[1]);
  const betterIn = input.slice(3).filter((s) => s != "");
  let i = 0;
  const maps: MyMap[] = [];
  while (i < betterIn.length) {
    const curMap: MyMap = [];
    while (/[0-9]+/.test(betterIn[i]) && i < betterIn.length) {
      const n = getNumbers(betterIn[i]);
      curMap.push({
        source: n[1],
        range: n[2],
        destination: n[0],
      });
      i++;
    }
    maps.push(curMap);
    i++;
  }
  console.log(Math.min(...seeds.map((x) => getEndValue(x, maps))));
}

export async function taskTwo(input: string[]): Promise<void> {
  const seedNums = getNumbers(input[0].split(":")[1]);
  const seeds: Range[] = [];
  for (let i = 0; i < seedNums.length; i += 2) {
    seeds.push({ start: seedNums[i], end: seedNums[i]+ seedNums[i + 1] });
  }
  const betterIn = input.slice(3).filter((s) => s != "");
  let i = 0;
  const maps: MapEntry2[][] = [];
  while (i < betterIn.length) {
    const curMap: MapEntry2[] = [];
    while (/[0-9]+/.test(betterIn[i]) && i < betterIn.length) {
      const n = getNumbers(betterIn[i]);
      curMap.push({
        start: n[1],
        end: n[1]+n[2],
        shift: n[1] - n[0],
      });
      i++;
    }
    curMap.sort((a, b) => a.start - b.start)
    maps.push(curMap);
    i++;
  }

  const resultRanges = mapSeedRanges(seeds, maps)
  const mins = resultRanges.map(x => x.start)
  console.log(Math.min(...mins))
}

interface MapEntry {
  source: number;
  range: number;
  destination: number;
}

type MyMap = MapEntry[];

function getMapValue(x: number, map: MyMap) {
  for (const m of map) {
    if (x >= m.source && x < m.source + m.range) {
      return m.destination + (x - m.source);
    }
  }
  return x;
}

function getEndValue(x: number, maps: MyMap[]) {
  let y = x;
  for (const map of maps) {
    y = getMapValue(y, map);
  }
  return y;
}

function getNumbers(s: string) {
  return s
    .split(" ")
    .filter((x) => x != "")
    .map((x) => parseInt(x.trim()));
}

interface Range {
  start: number;
  end: number;
}

interface MapEntry2 extends Range {
  shift: number;
}

function mapRange(r: Range, maps: MapEntry2[]): Range[] {
  let i = 0;
  let range = r
  const result: Range[] = []
  if (range.start < maps[0].start) {
    if (range.end <= maps[0].start) {
      return [range];
    }
    result.push({ start: range.start, end: maps[0].start })

  } else {
    while(i < maps.length) {
      if (range.start >= maps[i].start && range.start < maps[i].end) {
        if (range.end < maps[i].end) {
          return [{start: range.start - maps[i].shift, end: range.end - maps[i].shift}]
        }
        result.push({start: range.start - maps[i].shift, end: maps[i].end - maps[i].shift})
        i++
        break
      }
      i++
    }
  }
  
  while (i < maps.length) {
    if (range.end >= maps[i].end) {
      result.push({start: maps[i].start - maps[i].shift, end: maps[i].end - maps[i].shift})
    } else {
      result.push({start: maps[i].start - maps[i].shift, end: range.end - maps[i].shift})
      break
    }
    range.start = maps[i].end
    i++
  }
  if (range.end > maps[maps.length - 1].end) {
    result.push({start: range.start, end: range.end})
  }
  return result
}

function mapRanges(r: Range[], maps: MapEntry2[]) {
  return r.map((x) => mapRange(x, maps)).flat();
}

function mapSeedRanges(r: Range[], maps: MapEntry2[][]) {
  let ranges = r;
  for (const map of maps) {
    ranges = mapRanges(ranges, map);
  }
  return ranges
}
