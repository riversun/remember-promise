// 【1.Promise.resolve()でfulfilled状態のPromiseを扱う】

// Promise.resolve("value1")を呼び出すと直接 fulfilled状態のPromiseが返値となる
//
// すでに Promise.resolve("value1") はfullfilled状態なので、thenメソッドをつなげれば、すぐにthenメソッドに指定したコールバック関数に処理がうつる
const p1 = Promise.resolve('value1'); // 値 value1でfulfilled状態のPromise(p1)
p1.then((value) => {
  console.log(value);
});
