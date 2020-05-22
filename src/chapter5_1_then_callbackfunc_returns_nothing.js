// 【5.1 thenメソッドに指定したコールバック関数が何も返さないと、
// thenメソッドは"undefined"な値を持つPromiseが返す】

const p51 = Promise.resolve('value51');
p51
  // このthenの返値は Promise.resolve() とおなじく、値が"undefined"でfulfilled状態のPromise
  .then((value) => {
    // コールバック関数内でなにもreturnしない場合は
    // 値がundefinedでfulfilled状態のPromiseがこのthenの返値となる

    // なにも返さない
  })
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  });