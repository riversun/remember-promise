// 【6.Promiseをつかった直列実行】

// - 3つのAPIを順番に呼び出していく例を考える
// - 呼び出し順序に意味がある前提で、（その気になれば）前のAPIの呼び出し結果を次のAPIでも使えるようにする

// 実験用に、処理に時間のかかるAPI（スタブ）を3つつくる。Web API呼び出してるつもり。
// 3つは、それぞれ　足し算、引き算、かけ算 ができる

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
      reject("引き算APIでエラー発生");
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

// 6.1 Promiseで非同期APIの直列呼び出し
//
// - 前段の呼び出し結果を後段で活用できるようにする
// - async/awaitはのちほど、ここではPromiseでがんばる
// - ポイントはthenの中で呼び出しをネストさせないこと
// (ネストを深くしてしまうと、せっかくのPromiseがもったいない)

// 足し算→引き算→掛け算の順番に実行して、すべての結果を詰めるAPI
function webApi(a, b) {

  const container = {};
  return Promise.resolve(container)
    .then(container => {
      console.log('足し算APIを呼び出し中');
      return webApiAdd(a, b)
        .then((addResult) => {
          container.addResult = addResult;
          return container;
        })//rejectが発生しても、ここで .catchせずにreject状態のpromiseをそのまま返す仕様
    })
    .then((container) => {
      console.log('引き算APIを呼び出し中');
      return webApiSub(a, b)
        .then((subResult) => {
          container.subResult = subResult;
          return container;
        })
    })
    .then((container) => {
      console.log('かけ算APIを呼び出し中');
      return webApiMult(a, b)
        .then((multResult) => {
          container.multResult = multResult;
          return container;
        })
    });
}

webApi(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  })