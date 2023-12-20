function lcmArr(arr: number[]) {

  var multiple = Math.min(...arr);
  arr.forEach(function(n) {
      multiple = lcm(multiple, n);
  });

  return multiple;
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);   
}

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

export {lcmArr, lcm, gcd}