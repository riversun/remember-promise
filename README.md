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

# 実際に動かしておもいだす

## 1.Promise.resolve()でfulfilled状態のPromiseを扱う

`Promise.resolve("value1")`を呼び出すと直接 fulfilled状態のPromiseが返値となる

すでに Promise.resolve("value1") はfullfilled状態なので、thenメソッドをつなげれば、すぐにthenメソッドに指定したコールバック関数に処理がうつる

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="gOaZjXE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル1">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/gOaZjXE">
  Promiseサンプル1</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 2.Promiseは遅延実行じゃない、作ったらすぐ実行される

Promiseが生成されたら、(executor関数の)中に書いた処理はすぐ実行される

```js
function test() {
  // Promiseのコンストラクタには引数を２つ(resolve,reject)とる関数をわたす。
  const p2 = new Promise((resolve, reject) => {
    console.log("Promise(p2)のexecutor関数の中で2秒かかる非同期な処理中");
    setTimeout(function () {
      // 非同期処理をして、おわったらresolve
      console.log("非同期な処理終了！");
      //非同期処理が成功ならresolve,失敗ならrejectを呼び出す。
      //引数には、実行結果を入れる。これがthenで返却されるPromiseの値となる
      resolve("value2"); // resolveして成功とする
    }, 2000);
  });
}

p2.then(() => {});

```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="NWGeOgB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル2">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/NWGeOgB">
  Promiseサンプル2</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 3.PromiseはPromise外の処理をブロックしない

ブロックしちゃったら、Promiseの存在価値なし

```js
function test() {
  const p3 = new Promise((resolve, reject) => {
    console.log("Promise(p3)の中で非同期処理中。");
    setTimeout(function () {
      console.log("Promise(p3)の非同期処理終了");
      resolve("value3");
    }, 1000);
  });

  console.log("PromiseはPromise外のコード実行をブロックしない");

  p3.then((value) => {
    console.log(`Promise(p3)の実行結果:${value}`);
  });
}

```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="rNOoqPV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル3">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/rNOoqPV">
  Promiseサンプル3</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 4.[thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)は2つのコールバック関数を指定できる

Promiseがfulfilledかrejectedの状態になったとき、[thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)に指定されたコールバック関数が実行される

thenメソッドは、`then(成功したときのコールバック関数,失敗したときのコールバック関数)`のように記述する。

### 4-0.fulfilledなPromiseは、[thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)に指定した**成功したときのコールバック関数**が呼ばれる

```js
// p40は値value40を持つfulfilledな状態のPromiseとなる
const p40 = Promise.resolve('value40');
p40.then(
  (value) => {
    console.log(`Promise(p40)はresolveされました 値：${value}`);
  },
  (value) => {
    console.log(`Promise(p40)はrejectされました 値：${value}`);
  });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="ExVGqEO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル40">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/ExVGqEO">
  Promiseサンプル40</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 4-1. rejectedなPromiseは、[thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)に指定した第二引数の**失敗したときのコールバック関数**が呼ばれる

```js
// p41は値value41を持つfulfilledな状態のPromiseとなる
const p41 = Promise.reject('value41');
p41.then(
  (value) => {
    console.log(`Promise(p41)はresolveされました 値：${value}`);
  },
  (value) => {
    console.log(`Promise(p41)はrejectされました 値：${value}`);
  });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="ZEbVgMR" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル41">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/ZEbVgMR">
  Promiseサンプル41</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 4-2. [thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)の引数となるコールバック関数を省略すると、[thenメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)は最後に実行されたPromiseの状態を受け継いだPromiseを生成して返す

```js
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
```

最初に登場するthenメソッドにはreject用のコールバック関数がない。その場合は、thenメソッドは最後のPromiseの状態を受け継いでいるPromiseを生成する。この例でいえば、thenメソッドは「値として"value42"もち、rejected状態」の新たなPromiseを生成する。
この仕組みにより、ハンドリングされなかったPromiseがチェインされたthenメソッドで後段に受け継がれていくようなコードを書くことができる。


<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="eYpbqXP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル42">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/eYpbqXP">
  Promiseサンプル42</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 4-3 [catchメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)はthen(null,(value)=>{})の短縮版

上でもみたようにrejected状態のPromiseを処理する関数は`then(null,(value)=>{//rejectを処理する})`のようにthenメソッドの第2引数に指定するが、rejectedなPromiseだけを処理したい場合は`then(null,(value)=>{})`は冗長なので、[catchメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)をつかう。

```js
const p43 = Promise.reject('value43');
p43
  .then((value) => {
      console.log(`Promise(p43)はresolveされました 値：${value}`);
    }
  )
  .catch((value) => {
    console.log(`Promise(p43)はrejectされました 値：${value}`);
  });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="MWaLgwz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル43">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/MWaLgwz">
  Promiseサンプル43</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


ということで、[catchメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)は引数1つ。引数にはPromiseが失敗したときのコールバック関数、つまりrejectedなPromiseを処理するための関数だけ指定する。

```js

const p43part2 = Promise.reject('value43part2');
p43part2.catch((value) => {
  console.log(`Promise(p43part2)はrejectされました 値：${value}`);
});
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="RwWvbro" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル43part2">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/RwWvbro">
  Promiseサンプル43part2</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# 5.thenメソッドは必ずPromiseを返却する

みてきたとおり、Promiseのthenメソッドには、Promiseが成功した(fulfilled状態)ときのコールバック関数と、失敗(rejected状態)ときのコールバック関数を指定できる。

コールバック関数がどんな値をreturnしようとも、**thenメソッド自体は必ず Promise を返す**。これを忘れない。

- 以下は、値"value5"をもつfulfilled状態のPromiseを最初のthenの第1引数に指定したfulfilled用のコールバック関数内で処理している。
- このコールバック関数で"value5-1"という値を返すと、thenメソッドは値"value5-1"を持ち、fulfilledなPromiseを返す

```js
const p5 = Promise.resolve('value5');
p5
  .then((value) => { // ←このthenメソッドの返値は 値"value5-1"をもつfulfilledなPromiseとなる。つまり、Promise.resolve("value5-1")と同じ。
    console.log(`Promise(p5)はresolveされました 値:${value}`);

    // この「Promise(p5)がresolveされたとき用のコールバック関数」で
    // "value5-1"という値を返す。
    return 'value5-1';
  })
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="eYpxOGw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル5">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/eYpxOGw">
  Promiseサンプル5</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 5.1 thenメソッドに指定したコールバック関数が何も返さないと、thenメソッドは"undefined"な値を持つPromiseが返す

```js
const p51 = Promise.resolve('value51');
p51
  //このthenの返値は Promise.resolve() とおなじく、値が"undefined"でfulfilled状態のPromise
  .then((value) => {
    // コールバック関数内でなにもreturnしない場合は
    // 値がundefinedでfulfilled状態のPromiseがこのthenの返値となる

    // なにも返さない
  })
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="zYveYRw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル6">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/zYveYRw">
  Promiseサンプル6</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 5.2 thenメソッドに指定したコールバック関数でPromiseを返すと、thenはコールバック関数の返値のPromiseの実行結果と同じ値・状態のPromiseを返す

```js

const p52 = Promise.resolve('value52');
p52
  .then((value) => {

    // thenメソッドに指定したコールバック関数でPromiseを返すと、
    // そのthenメソッドの返値は、コールバック関数が返したPromiseと同じ状態、同じ値のものが返る

    //このPromiseは、非同期実行後にrejectedなPromiseをかえす
    return new Promise((resolve, reject) => {
      console.log('非同期処理を実行中。');
      setTimeout(() => {
        reject(value + '-rejected');
      }, 2000);
    });
  })
  .then((value) => {
    console.log(`前のPromiseはresolveされました 値:${value}`);
  }, (value) => {
    console.log(`前のPromiseはrejectされました 値:${value}`);
  })

```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="eYpxmVr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル52">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/eYpxmVr">
  Promiseサンプル52</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 5.3 thenメソッドやcatchメソッドの返値としてrejectedなPromiseを返したい場合は、引数に指定したコールバック関数内で throw ErrorするかrejectedなPromiseを返すかどちらか

### 5.3.1 Errorをスローしてrejectedにする

thenメソッドの引数に指定したコールバック関数内でErrorをスローすると、thenメソッドは「値にErrorをもつrejectedなPromise」を返す

```js
const p53 = Promise.resolve('value53');
p53
  .then((value) => {
    // コールバック関数内で
    // Errorをスローすると、thenは値がErrorで、rejectedなPromiseを返す
    throw Error('error53');
  })
  .then((value) => {
      //よばれない
      console.log(`前のPromiseはresolveされました 値:${value}`);
    },
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはrejectされました 値:${value}`);
    });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="RwWvPVp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル53 part1">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/RwWvPVp">
  Promiseサンプル53 part1</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 5.3.2 Promise.reject()を返してrejectedにする

thenメソッドの引数に指定したコールバック関数でPromise.reject()を返すと、thenメソッドは「rejectの引数に指定した値にをもつrejectedなPromise」を返す

```js
const p53part2 = Promise.resolve('value53part2');
p53part2
  .then((value) => {

    // コールバック関数内で
    // rejectedなPromiseを返すと、thenはrejectedなPromiseを返す
    return Promise.reject('error53part2')

  })
  .then(
    (value) => {
      //よばれない
      console.log(`前のPromiseはresolveされました 値:${value}`);
    },
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはrejectされました 値:${value}`);
    });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="dyYaozp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル53part2">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/dyYaozp">
  Promiseサンプル53part2</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


### 5.3.3 Promise内の非同期処理でrejectして、rejectedにする

```js
const p53part3 = Promise.resolve('value53part3');
p53part3
  .then((value) => {

    // thenに指定したコールバック関数内でrejectedなPromiseを返す
    return new Promise((resolve, reject) => {
      console.log('非同期処理を実行中。');
      setTimeout(() => {
        // 何かのエラー発生
        reject("error53part3");// ←この処理によって値"error53part3"をもつrejectedなPromiseとなる
      }, 2000);
    });

  })
  .then(
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはresolveされました 値:${value}`);
    },
    (value) => {
      console.log(`前のPromiseはrejectされました 型:${Object.prototype.toString.call(value)}`);
      console.log(`前のPromiseはrejectされました 値:${value}`);
    });

```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="vYNbNoP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル53 part3">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/vYNbNoP">
  Promiseサンプル53 part3</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# 6.Promiseをつかった直列実行

- 3つのAPIを順番に呼び出していく例を考える
- 呼び出し順序に意味がある前提で、（その気になれば）前のAPIの呼び出し結果を次のAPIでも使えるようにする

実験用に、処理に時間のかかるAPI（スタブ）を3つつくる。Web API呼び出してるつもり。
3つは、それぞれ　足し算、引き算、かけ算 ができる

```js
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
```

### 6.1 Promiseで非同期APIの直列呼び出し

- 前段の呼び出し結果を後段で活用できるようにする
- async/awaitはのちほど、ここではPromiseでがんばる
- ポイントはthenの中で呼び出しをネストさせないこと  
(ネストを深くしてしまうと、せっかくのPromiseがもったいない)


```js:足し算→引き算→掛け算の順番に実行して、すべての結果を返す関数

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
```

呼び出しコードは

```js

webApi(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  })
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="zYveBKK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル61">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/zYveBKK">
  Promiseサンプル61</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


APIの順次呼び出し途中でエラーが発生した場合はどうなるか。

以下のように引き算API実行中にエラーが発生しまうことにする

```js

function webApiSub(a, b) {
  return new Promise((resolve, reject) => {
    // 処理に1秒かかる引き算APIをエミュレート
    setTimeout(() => {
      reject("引き算APIでエラー発生");
    }, 1000);
  });
};
```

この状態でさきほどのコード↓を再度呼び出す


```js

webApi(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  })
```

途中の引き算API呼び出しの失敗でrejectされる。

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="VwvgjzX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル61part2">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/VwvgjzX">
  Promiseサンプル61part2</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 6.2 Promiseで非同期APIの並列呼び出し

Promise.allをつかうと、Promiseの並列処理ができる

先ほどの処理をPromise.allで並列処理に書き換える。
直列にくらべて、シンプルになる。

```js
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
```

呼び出しコードはさきほど同様以下のとおり

```js
 webApiConcurrent(2, 3)
    .then((result) => {
      console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
    })
    .catch((result) => {
      console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
    });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="WNQPGjo" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル62">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/WNQPGjo">
  Promiseサンプル62</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 6.3 async/awaitを使った直列実行

Promiseついでに、async/awaitも書いておく

- [async](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)
  - "async"を関数の冒頭につけた、async functionを宣言すると、その関数は Promise を返すようになる
  - async function内で `return "value1";`とすると、`return Promise.resolve("value1");`　をしたのと同じこと

- [await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)
  - async functionの中で、awaitをつけたPromiseがfulfilledまたはrejectedになるまで実行を止める（待つ）


さきほどの非同期APIリクエストの直列実行をasyncとawaitをつかって書き直すと以下のようになる。同期呼び出しのようにシンプルになった。

```js
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
```

呼び出しコードは、

```js
 webApi2(2, 3)
    .then((result) => {
      console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
    })
    .catch((result) => {
      console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
    });
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="xxwMRyZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル63">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/xxwMRyZ">
  Promiseサンプル63</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 6.4 async/awaitを使った並列実行

次は async/awaitを使った並列実行。といっても、並列実行自体はPromise.allにやらせる。Promise.allは実行結果をPromiseで返すので、そこでawaitによる待ちをいれているだけ。

```js
async function webApi2Concurrent(a, b) {
  const results=await Promise.all([
    webApiAdd(a, b),
    webApiSub(a, b),
    webApiMult(a, b)]);
  const container = {};
  container.addResult = results[0];
  container.subResult = results[1];
  container.multResult = results[2];
  return container;
}
```

呼び出しは、以下のとおり

```js
webApi2Concurrent(2, 3)
  .then((result) => {
    console.log(`すべての処理に成功しました　結果:${JSON.stringify(result)}`);
  })
  .catch((result) => {
    console.log(`途中で処理に失敗しました 結果：${JSON.stringify(result)}`);
  })
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="riversun" data-slug-hash="LYpqbvx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Promiseサンプル64">
  <span>See the Pen <a href="https://codepen.io/riversun/pen/LYpqbvx">
  Promiseサンプル64</a> by Tom Misawa (<a href="https://codepen.io/riversun">@riversun</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# おまけ

Promiseつかってるとアロー関数「()=>{}」もよく出てくる。
記述量は少いが、そのぶんは人間の脳内補完（または思い出し）がたより

## Promiseでのアロー関数

```js
// 同じ意味。正解はLinter次第。

const p7 = new Promise((resolve, reject) => {
  resolve('value60');
});

const p7 = new Promise((resolve, reject) => resolve('value7'));

const p7 = new Promise(resolve => resolve('value7'));
```

## thenメソッドでのアロー関数

```js
// 以下は同じ意味
p7
  .then((value) => {
    return `${value}_edited`;
  })
  .then((value) => {
    console.log(value);
  });

p7
  .then((value) => `${value}_edited`) // returnは省略できる
  .then((value) => console.log(value)); //{}は省略できる
```

# まとめ

- Promiseもasync/await系の忘れやすい挙動をメモしました。
- 何か忘れたときに、また追加します。

# 関連記事
- 以前のPromise系投稿。[JavaでPromiseを使った非同期処理を記述したい　～ JavaScriptのPromiseライクな文法の試行～](https://qiita.com/riversun/items/66acf9dc9bd83dede76c)
