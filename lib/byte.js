/**
 *
 * byte.js
 *
 */


/* バイトを表現するクラス */
class Byte {

  constructor(...bits) {

    // ビットが 8 個必要
    if (bits.length !== 8) {
      let emsg = "Byte must consists of 8 bits";
      throw Error(emsg);
    }

    // 全て Bit オブジェクトである必要がある
    bits.forEach(b => {
      if (!(b instanceof Bit)) {
        let emsg = "Invalid bit";
        throw Error(emsg);
      }
    });

    this.bits = bits;
  }

  // 文字列に変換する
  toString() { return this.bits.join(""); }

  // 演算を行う
  ope(byte, opeType) {

    // 演算の種類を制限する
    opeType = opeType.toLowerCase();
    let opeTypes = ["and", "or"];
    if (!opeTypes.includes(opeType)) {
      let emsg = "Invalid operation type";
      throw Error(emsg);
    }

    // 型チェック
    if (!(byte instanceof Byte)) {
      let emsg = "Argument is not \"Byte\"";
      throw Error(emsg);
    }

    console.dir(this[opeType.toLowerCase()]);
    return this[opeType.toLowerCase()](byte);
  }

  // AND 演算
  and(byte) {

    return this.bits.map((bit, i) => {
      return bit.and(byte.bits[i]) + "";
    }).join("");

  }

  // OR 演算
  or(byte) {

    return this.bits.map((bit, i) => {
      return bit.or(byte.bits[i]) + "";
    }).join("");

  }

}

/* 4 ビットのまとまり */
class HalfByte {

  constructor(...bits) {

    // ビットが 4 個必要
    if (bits.length !== 4) {
      let emsg = "Byte must consists of 4 bits";
      throw Error(emsg);
    }

    // 全て Bit オブジェクトである必要がある
    bits.forEach(b => {
      if (!(b instanceof Bit)) {
        let emsg = "Invalid bit";
        throw Error(emsg);
      }
    });

    this.bits = bits;
  }

  toString() { return this.bits.join(""); }

  // 10 進数に変換する
  toDec() {

    const N = 4;    // ビットの数
    const RADIX = 2;    // 基数
    let n = 0;
    for (let i = 0; i < N; i++) {

      // ビットのインデックス ( 小さい桁から )
      let bi = N - i - 1;

      // 2 の ( 右からの ) 桁数乗がビット個存在する
      n += Math.pow(RADIX, i) * this.bits[bi];

    }

    return n;
  }

  // 16 進数に変換する
  // 10 進数に変換した後→16に変換
  // 文字リストと対応させているだけ
  toHex(toUpper=false) {

    // ビット <=> 文字、の対応表
    let bit2char = {};
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
      .forEach((c, i) => {
        let char = c + "";
        if (toUpper) {
          char = char.toUpperCase();
        }
        bit2char[i] = char;
      });
    
    // 10 進数に変換
    let nd = this.toDec();

    // 16 進数に変換
    return bit2char[nd];
  }

}

let bits = [0, 0, 0, 0, 0, 0, 0, 1].map(b => new Bit(b));
// bits.forEach(b => console.dir(b));
let [b0, b1, b2, b3, b4, b5, b6, b7] = bits;
// console.log(bits.join(""));

let byte0 = new Byte(...bits);
// console.dir(byte0);
// console.log(byte0 + "");

/*
// 0 ( binary )
let bin0 = 
  new HalfByte(...[0, 0, 0, 0].map(bit => new Bit(bit)));
console.log(bin0 + "");

// 1 ( binary )
let bin1 =
  new HalfByte(...[0, 0, 0, 1].map(bit => new Bit(bit)));
console.log(bin1 + "");
*/

// 3 ( binary )
/*
let bin3 =
  new HalfByte(...[0, 0, 1, 1].map(bit => new Bit(bit)));
console.log(bin3 + "");
console.log(bin3.toDec() === 3);
console.log(bin3.toHex());
*/

/*
let hbs = [    // ※hbits とかの方が分かりやすい
  [0, 0, 0, 0],    // 0
  [0, 0, 0, 1],    // 1
  [0, 0, 1, 0],    // 2
  [0, 0, 1, 1],    // 3
  [0, 1, 0, 0],    // 4
  [0, 1, 0, 1],    // 5
  [0, 1, 1, 0],    // 6
  [0, 1, 1, 1],    // 7
  [1, 0, 0, 0],    // 8
  [1, 0, 0, 1],    // 9
  [1, 0, 1, 0],    // 10
  [1, 0, 1, 1],    // 11
  [1, 1, 0, 0],    // 12
  [1, 1, 0, 1],    // 13
  [1, 1, 1, 0],    // 14
  [1, 1, 1, 1],    // 15
];
hbs.forEach(hb => {
  let hbyte = new HalfByte(...hb.map(bit => new Bit(bit)));
  // console.log(hbyte + "");
  // console.log([hbyte.toDec(), hbyte.toHex()].join(", "));

  // 結論はたったこれだけ
  // console.log(hbyte + "");
  // console.log(parseInt(hbyte + "", 2).toString(16));
  // console.log(hbyte.toHex(false));
  console.log(
    hbyte.toHex() === parseInt(hbyte + "", 2).toString(16)
  );
});

// もう少し流暢に書くと
let halfBytes = hbs.map((hb) => {
  return new HalfByte(...hb.map(bit => new Bit(bit)));
});
let allIsEqual = halfBytes.every(hbyte => {
  return hbyte.toHex() === 
    parseInt(hbyte + "", 2).toString(16);
});
console.log(allIsEqual);
*/

// Byte どうしの AND OR がまだ ( 不要だけど )
let bitss = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
];
let bytes = bitss.map(bits => 
  new Byte(...bits.map(b => new Bit(b))));
// console.dir(bytes);
bytes.forEach(byte => console.log(byte + ""));
console.log(bytes[0].and(bytes[1]));
console.log(bytes[0].or(bytes[1]));
console.log(bytes[1].and(bytes[0]));
console.log(bytes[1].or(bytes[0]));