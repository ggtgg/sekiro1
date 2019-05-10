// function * outputGenerator(){
//     let ret1=yield 1;
//     console.log(`got ret1:${ret1}`)
//     let ret2=yield 2;
//     console.log(`got ret1:${ret2}`)

// }
// let iterator1=outputGenerator();
// console.log(iterator1.next());
// console.log("OK");
// console.log(iterator1.next());
// console.log("OK");
// console.log(iterator1.next());
function* add(n, m) {
    let y = yield n + m;
    console.log(y);
    return y
}
let x = add(1, 1);
console.log(x.next())
console.log("stop");
console.log(x.next())
for (let i of x) {
    console.log(i);
}

function* add1(x) {
    try {
        var y = yield x + 2;

    } catch (e) {
        console.log(e);
    }
    return y;
}
var g = add1(1);
g.next();
g.throw('error');
// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* foo() {
    var y = 2 * (yield(x + 1));
    var z = yield(y / 3);
    return (x + y + z);
}
var a = foo(5);
console.log(a.next());
console.log(a.next());
a.next();
var b = foo(5);
console.log(b.next());
console.log(b.next(12));
b.next(20)
// 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象
function* fibno() {
    let [prev, cur] = [1, 1];
    while (true) {
        yield cur;
        [prev, cur] = [cur, prev + cur];
    }
}
for (let n of fibno()) {
    if (n > 1000) break;
    console.log(n);
}

function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = {
    first: 'Jane',
    last: 'Doe'
};

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}

function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
}

// 扩展运算符
[...numbers()]
// Generator.prototype.throw()
// Generator.prototype.return()
// ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* foo1() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo1();
    yield 'y';
}
for (let v of bar()) {
    console.log(v);
}

let obj = {
    * myGeneratorMethod() {

    }
};
// Generator 函数也不能跟new命令一起用会报错.
// Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。

// function* F() {
//     this.a = 1;
//     yield this.b = 2;
//     yield this.c = 3;
//   }
//   var obj = {};
//   var f = F.call(obj);

//   f.next();  // Object {value: 2, done: false}
//   f.next();  // Object {value: 3, done: false}
//   f.next();  // Object {value: undefined, done: true}

//   obj.a // 1
//   obj.b // 2
//   obj.c // 3

var clock = function* () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};


function* gen() {
    yield 1;
    return 2;
}

let g1 = gen();

console.log(
    g1.next().value,
    g1.next().value,
    g1.next().value
)

// 异步操作的同步化表达
// function* loadUI() {
//   showLoadingScreen();
//   yield loadUIDataAsynchronously();
//   hideLoadingScreen();
// }
// var loader = loadUI();
// // 加载UI
// loader.next()

// // 卸载UI
// loader.next()


// function* main() {
//     var result = yield request("http://some.url");
//     var resp = JSON.parse(result);
//       console.log(resp.value);
//   }

//   function request(url) {
//     makeAjaxCall(url, function(response){
//       it.next(response);
//     });
//   }

//   var it = main();
//   it.next();

// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}

let myObj = {
    foo: 3,
    bar: 7
};

for (let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
}

/* 异步编程的方法，大概有下面四种。
回调函数
事件监听
发布/订阅
Promise 对象 */
