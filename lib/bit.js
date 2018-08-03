/**
 *
 * bit.js
 *
 */


/* ビットを表現するクラス */
class Bit {

  constructor(b) {

    // 値が 0 または 1 であることをチェックする
    let validBits = [0, 1];
    if (!validBits.includes(b)) {
      let emsg = "Invalid bit passed";
      throw Error(emsg);
    }

    this.b = b;

  }

  // AND 演算を行う
  and(bit) {

    if (!(bit instanceof Bit)) {
      let emsg = "Argument is not \"Bit\"";
      throw Error(emsg);
    }

    let b = this.b & bit.b;
    return new Bit(b);
  }

  // OR 演算を行う
  or(bit) {

    if (!(bit instanceof Bit)) {
      let emsg = "Argument is not \"Bit\"";
      throw Error(emsg);
    }

    let b = this.b | bit.b;
    return new Bit(b);
  }

  // 文字列表現を定義する
  toString() { return this.b.toString(); }

}


/* ----- tests ----- */
// [0, 1].forEach(n => new Bit(n));
// [0, 1, 2].forEach(n => new Bit(n));

// let [b0, b1] = [0, 1].map(n => new Bit(n));
// b0.and(b1);
// [b0, b1].forEach(b => console.dir(b));
// b0.and({});

// console.log(0 & 1);
// console.log(0 & 0);
// console.log(1 & 0);
// console.log(1 & 1);

// console.log(b0.and(b1));
// console.log(b0.and(b0));
// console.log(b1.and(b0));
// console.log(b1.and(b1));

// console.log(b0.or(b0));
// console.log(b0.or(b1));
// console.log(b1.or(b0));
// console.log(b1.or(b1));

// console.log(b0 + "");
// console.log(b1 + "");
// console.log([b0, b1].join(""));