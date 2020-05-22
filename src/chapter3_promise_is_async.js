// 【3.PromiseはPromise外の処理をブロックしない】
//
// ブロックしちゃったら、Promiseの存在価値なし

const p3 = new Promise((resolve, reject) => {
  console.log('Promise(p3)の中で非同期処理中。');
  setTimeout(() => {
    console.log('Promise(p3)の非同期処理終了');
    resolve('value3');
  }, 1000);
});

console.log('PromiseはPromise外のコード実行をブロックしない');

p3.then((value) => {
  console.log(`Promise(p3)の実行結果:${value}`);
});
