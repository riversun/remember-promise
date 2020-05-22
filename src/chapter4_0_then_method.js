// 【4.thenメソッドは2つのコールバック関数を指定できる】
//
// Promiseがfulfilledかrejectedの状態になったとき、thenメソッドに指定されたコールバック関数が実行される
//
// thenメソッドは、then(成功したときのコールバック関数,失敗したときのコールバック関数)のように記述する。

// 【4-0.fulfilledなPromiseは、thenメソッドに指定した成功したときのコールバック関数が呼ばれる】

// p40は値value40を持つfulfilledな状態のPromiseとなる
const p40 = Promise.resolve('value40');
p40.then(
  (value) => {
    console.log(`Promise(p40)はresolveされました 値：${value}`);
  },
  (value) => {
    console.log(`Promise(p40)はrejectされました 値：${value}`);
  });
