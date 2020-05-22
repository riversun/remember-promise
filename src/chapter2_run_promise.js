// 【2.Promiseは遅延実行じゃない、作ったらすぐ実行される】

// Promiseが生成されたら、(executor関数の)中に書いた処理はすぐ実行される
// Promiseのコンストラクタには引数を２つ(resolve,reject)とる関数をわたす。
const p2 = new Promise((resolve, reject) => {
  console.log('Promise(p2)のexecutor関数の中で2秒かかる非同期な処理中');
  setTimeout(() => {
    // 非同期処理をして、おわったらresolve
    console.log('非同期な処理終了！');
    // 非同期処理が成功ならresolve,失敗ならrejectを呼び出す。
    // 引数には、実行結果を入れる。これがthenで返却されるPromiseの値となる
    resolve('value2'); // resolveして成功とする
  }, 2000);
});
