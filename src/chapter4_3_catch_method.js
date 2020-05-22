// 【4-3 catchメソッドはthen(null,(value)=>{})の短縮版】
//
// 上でもみたようにrejected状態のPromiseを処理する関数はthen(null,(value)=>{//rejectを処理する})のように
// thenメソッドの第2引数に指定するが、rejectedなPromiseだけを処理したい場合はthen(null,(value)=>{})は冗長なので、
// catchメソッドをつかう。

const p43 = Promise.reject('value43');
p43
  .then((value) => {
    console.log(`Promise(p43)はresolveされました 値：${value}`);
  })
  .catch((value) => {
    console.log(`Promise(p43)はrejectされました 値：${value}`);
  });

// ということで、catchメソッドは引数1つ。
// 引数にはPromiseが失敗したときのコールバック関数、つまりrejectedなPromiseを処理するための関数だけ指定する。
const p43part2 = Promise.reject('value43part2');
p43part2.catch((value) => {
  console.log(`Promise(p43part2)はrejectされました 値：${value}`);
});