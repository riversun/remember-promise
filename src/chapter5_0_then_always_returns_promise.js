// 【5.thenメソッドは必ずPromiseを返却する】
//
// みてきたとおり、Promiseのthenメソッドには、Promiseが成功した(fulfilled状態)ときのコールバック関数と、
// 失敗(rejected状態)ときのコールバック関数を指定できる。
//
// コールバック関数がどんな値をreturnしようとも、
// thenメソッド自体は必ず Promise を返す。これを忘れない。
//
// - 以下は、値"value5"をもつfulfilled状態のPromiseを最初のthenの第1引数に指定したfulfilled用のコールバック関数内で処理している。
// - このコールバック関数で"value5-1"という値を返すと、thenメソッドは値"value5-1"を持ち、fulfilledなPromiseを返す

const p5 = Promise.resolve('value5');
p5.then((value) => { // ←このthenメソッドの返値は 値"value5-1"をもつfulfilledなPromiseとなる。つまり、Promise.resolve("value5-1")と同じ。
  console.log(`Promise(p5)はresolveされました 値:${value}`);

  // この「Promise(p5)がresolveされたとき用のコールバック関数」で
  // "value5-1"という値を返す。
  return 'value5-1';
})
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  });
