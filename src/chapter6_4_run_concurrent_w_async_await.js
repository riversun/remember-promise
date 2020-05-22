// 6.4 async/awaitを使った並列実行

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


// 次は async/awaitを使った並列実行。といっても、並列実行自体はPromise.allにやらせる。
// Promise.allは実行結果をPromiseで返すので、そこでawaitによる待ちをいれているだけ。

async function webApi2Concurrent(a, b) {
  const results = await Promise.all([
    webApiAdd(a, b),
    webApiSub(a, b),
    webApiMult(a, b)]);
  const container = {};
  container.addResult = results[0];
  container.subResult = results[1];
  container.multResult = results[2];
  return container;
}

webApi2Concurrent(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  })