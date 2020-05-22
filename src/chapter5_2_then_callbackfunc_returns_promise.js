// 5.2 thenメソッドに指定したコールバック関数でPromiseを返すと、
// thenはコールバック関数の返値のPromiseの実行結果と同じ値・状態のPromiseを返す

const p52 = Promise.resolve('value52');
p52
  .then((value) => new Promise((resolve, reject) => {
    // thenメソッドに指定したコールバック関数でPromiseを返すと、
    // そのthenメソッドの返値は、コールバック関数が返したPromiseと同じ状態、同じ値のものが返る
    // このPromiseは、非同期実行後にrejectedなPromiseをかえす
    console.log('非同期処理を実行中。');
    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`${value}-rejected`);
    }, 2000);
  }))
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  }, (value) => {
    console.log(`前のPromiseはrejectされました 値:${value}`);
  });
