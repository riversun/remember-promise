// 【6.2 Promiseで非同期APIの並列呼び出し】
// Promise.allをつかうと、Promiseの並列処理ができる
//
// 先ほどの処理をPromise.allで並列処理に書き換える。
// 直列にくらべて、シンプルになる。


// 処理に時間がかかる足し算API
function webApiAdd(a, b) {
  return new Promise((resolve, reject) => {
    // 処理に1秒かかる足し算APIをエミュレート
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
};

// 処理に時間がかかる引き算API
function webApiSub(a, b) {
  return new Promise((resolve, reject) => {
    // 処理に1秒かかる引き算APIをエミュレート
    setTimeout(() => {
      resolve(a - b);
    }, 1000);
  });
};

// 処理に時間がかかるかけ算API
function webApiMult(a, b) {
  return new Promise((resolve, reject) => {
    // 処理に2秒かかるかけ算APIをエミュレート
    setTimeout(() => {
      resolve(a * b);
    }, 2000);
  });
};

function webApiConcurrent(a, b) {
  return Promise.all([
    webApiAdd(a, b),
    webApiSub(a, b),
    webApiMult(a, b)])
    .then((results) => {
      const container = {};
      container.addResult = results[0];
      container.subResult = results[1];
      container.multResult = results[2];
      return container;
    })
}

webApiConcurrent(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  });