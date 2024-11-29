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

class ComplexNumber {

  public static i = ComplexNumber.fromImg(1)

  constructor(public rel: number, public img: number) {}

  public static fromRel(rel: number) {
    return new ComplexNumber(rel, 0)
  }

  public static fromImg(img: number) {
    return new ComplexNumber(0, img)
  }

  public add(b: ComplexNumber) {
    return new ComplexNumber(this.rel + b.rel, this.img + b.img)
  }

  public addEql(b: ComplexNumber) {
    this.eql(this.add(b))
  }

  public mul(b: ComplexNumber) {
    return new ComplexNumber(
      this.rel * b.rel - this.img * b.img,
      this.rel * b.img + this.img * b.rel
    )
  }

  public mulAdd(b: ComplexNumber) {
    this.eql(this.mul(b))
  }

  public conjucate() {
    return new ComplexNumber(this.rel, -this.img)
  }

  public conjucateEql() {
    this.eql(this.conjucate())
  }

  public inv() {
    const div = this.rel*this.rel + this.img*this.img
    return new ComplexNumber(this.rel / div, this.img / div)
  }

  public len(f: ((rel: number, img: number)=>number) = (rel: number, img: number) => Math.sqrt(rel*rel+img*img)) {
    return f(this.rel, this.img)
  }

  private eql(r: ComplexNumber) {
    this.rel = r.rel
    this.img = r.img
  }

}

export {lcmArr, lcm, gcd, ComplexNumber}