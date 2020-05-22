# 概要
- [Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)、身近な割に挙動詳細をわすれやすいので、思い出すための呼び水メモです

# Promiseのポイント

## Promiseには3つの状態がある

- pending 初期状態
- fulfilled 成功状態
- rejected 失敗状態

## Promiseのコンストラクタにはexecutor関数をセットする
- executor関数とは↓なやつ

```js
 (resolve,reject)=>{} 
```

つまり↓な風にしてPromiseオブジェクトを作る

```js
new Promise((resolve,reject)=>{});
```

- このexecutor関数内で resolve(値) を呼び出すと、Promiseはpending状態からfulfilled状態になる。
- 逆にreject(値)を呼び出すと、Promiseはpending状態からrejected状態になる。


## Promiseにはthenメソッドがある
- Promise内(executor関数)の処理が終わると、Promiseはfulfilledかrejectedに状態が変化した後、thenメソッドに指定した関数が呼ばれる
- thenには2つの引数をとる。1つでもいい。
- 2つの引数にはPromiseが成功したときと失敗したときのコールバック関数

```js
.then(
//成功したときのコールバック関数
(value)=>{},
//失敗したときのコールバック関数
(value)=>{}
) 
```

- Promise内で resolve

- thenメソッドは**必ずPromiseを返却する**
- thenメソッドの引数に指定したコールバック関数内で何をreturnしようと、かならずthenメソッドの返値はPromiseになる。これ重要。
- thenメソッドは必ずPromiseが返却されるので、then().then() とチェインできる。thenはPromiseのメソッドなので。

## Promiseは値を持つ
- Promiseはfulfilled,rejectedの状態になるときに値ももつ(値はundefinedも可)
- Promiseの値はresolve(値)、reject(値)によってセットできthenメソッドのコールバック関数の引数に入って渡される
