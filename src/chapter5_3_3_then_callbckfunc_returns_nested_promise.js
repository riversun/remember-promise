// 5.3.3 Promise内の非同期処理でrejectして、rejectedにする

const p53part3 = Promise.resolve('value53part3');
p53part3
  .then((value) => {
    // thenに指定したコールバック関数内でrejectedなPromiseを返す
    return new Promise((resolve, reject) => {
      console.log('非同期処理を実行中。');
      setTimeout(() => {
        // 何かのエラー発生
        reject("error53part3");// ←この処理によって値"error53part3"をもつrejectedなPromiseとなる
      }, 2000);
    });

  })
  .then(
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはresolveされました 値:${value}`);
    },
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはrejectされました 値:${value}`);
    });
