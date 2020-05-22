// 5.3.2 Promise.reject()を返してrejectedにする

// thenメソッドの引数に指定したコールバック関数でPromise.reject()を返すと、thenメソッドは「rejectの引数に指定した値にをもつrejectedなPromise」を返す

const p53part2 = Promise.resolve('value53part2');
p53part2
  .then((value) => {
    // コールバック関数内で
    // rejectedなPromiseを返すと、thenはrejectedなPromiseを返す
    return Promise.reject('error53part2')
  })
  .then(
    (value) => {
      // よばれない
      console.log(`前のPromiseはresolveされました 値:${value}`);
    },
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはrejectされました 値:${value}`);
    });