// 5.3 thenメソッドやcatchメソッドの返値としてrejectedなPromiseを返したい場合は、引数に指定したコールバック関数内で throw ErrorするかrejectedなPromiseを返すかどちらか

// 5.3.1 Errorをスローしてrejectedにする
// thenメソッドの引数に指定したコールバック関数内でErrorをスローすると、thenメソッドは「値にErrorをもつrejectedなPromise」を返す

const p53 = Promise.resolve('value53');
p53
  .then((value) => {
    // コールバック関数内で
    // Errorをスローすると、thenは値がErrorで、rejectedなPromiseを返す
    throw Error('error53');
  }).then((value) => {
    // よばれない
    console.log(`前のPromiseはresolveされました 値:${value}`);
  },
  (value) => {
    console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
    console.log(`前のPromiseはrejectされました 値:${value}`);
  });