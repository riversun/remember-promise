// 【6.3 async/awaitを使った直列実行】
// Promiseついでに、async/awaitも書いておく

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


//
// - async
//
// "async"を関数の冒頭につけた、async functionを宣言すると、その関数は Promise を返すようになる
// async function内で return "value1";とすると、return Promise.resolve("value1");　をしたのと同じこと
//
// - await
//
// async functionの中で、awaitをつけたPromiseがfulfilledまたはrejectedになるまで実行を止める（待つ）

// さきほどの非同期APIリクエストの直列実行をasyncとawaitをつかって書き直すと以下のようになる。
// 同期呼び出しのようにシンプルになった。

async function webApi2(a, b) {
  const container = {};
  console.log('足し算APIを呼び出し中');
  container.addResult = await webApiAdd(a, b);

  console.log('引き算APIを呼び出し中');
  container.subResult = await webApiSub(a, b);

  console.log('かけ算APIを呼び出し中');
  container.multResult = await webApiMult(a, b)

  return container;
}

webApi2(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  });