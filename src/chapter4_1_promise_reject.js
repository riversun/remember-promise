// 【4-1. rejectedなPromiseは、thenメソッドに指定した第二引数の失敗したときのコールバック関数が呼ばれる】

// p41は値value41を持つfulfilledな状態のPromiseとなる
const p41 = Promise.reject('value41');
p41.then(
  (value) => {
    console.log(`Promise(p41)はresolveされました 値：${value}`);
  },
  (value) => {
    console.log(`Promise(p41)はrejectされました 値：${value}`);
  });