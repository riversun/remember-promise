// 【4-2. thenメソッドの引数となるコールバック関数を省略すると、thenメソッドは最後に実行されたPromiseの状態を受け継いだPromiseを生成して返す】

// 最初に登場するthenメソッドにはreject用のコールバック関数がない。
// その場合は、thenメソッドは最後のPromiseの状態を受け継いでいるPromiseを生成する。
// この例でいえば、thenメソッドは「値として"value42"もち、rejected状態」の新たなPromiseを生成する。
// この仕組みにより、ハンドリングされなかったPromiseがチェインされたthenメソッドで後段に受け継がれていくようなコードを書くことができる。

const p42 = Promise.reject('value42');
p42
  // p42はrejected状態だけど、このthenメソッドにはrejected処理用のコールバック関数の指定が無い
  // rejected処理用のコールバック関数がないので、このthenメソッドはp42と同じ状態のPromiseを返す
  .then((value) => {
    console.log(`Promise(p42)はresolveされました 値：${value}`);
  })
  // ↓チェインされたこちらのthenメソッドに指定されてるrejected用のコールバック関数が呼ばれる
  .then(null, (value) => {
    console.log(`Promise(p42)はrejectされました 値：${value}`);
  });
