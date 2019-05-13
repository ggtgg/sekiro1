* 另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
```
for (let i = 0; i < 2; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
```
* let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
----

* 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
```
var tmp = 12;
if (true) {
  tmp = 'ab'; // ReferenceError
  let tmp;
}
```


*ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩
----
* 如果解构不成功，变量的值就等于undefined。
```
let [foo,,,bar,...tail]=[1,2,a,b,'h','b']
```
* let [x, y] = new Set(['a', 'b']);

* 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
```
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
```
----
* 如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
*  默认值生效的条件是，对象的属性值严格等于undefined。
* let [x = 1] = [undefined]; let [x = 1] = [null];
```
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
```
----

```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
* 参数变量是默认声明的，所以不能用let或const再次声明。
 ----
* 双重默认值
```
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
```
* 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的
----
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中 **注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。**
```
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}
add(2, 5);
```

* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

----
```
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}
```
```
function f(x, y) {
  return {x, y};
  <!-- return {x: x, y: y}; -->
}
``` 
```
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'b'] = 12;
```
```
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name
```
* 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
```
let obj = { foo: 12 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 12,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```
* ES6 一共有 5 种方法可以遍历对象的属性。
* for...in
* Object.keys(obj)
* Object.getOwnPropertyNames(obj)
* Object.getOwnPropertySymbols(obj)
* Reflect.ownKeys(obj)
* 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错.
关键字super，指向当前对象的原型对象。
* Object.is() ES5 比较两个值是否相等
* Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
Object.assign(target, source1, source2);

---
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
```
异步加载图片
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}

```
```
/ good
promise
  .then(function(data) { //
    // success
  })
  .catch(function(err) {
    // error
  });
```
* 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(12) }, 2000);
上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出12。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
```
----
```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
* 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
```
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
* 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
* 类和模块的内部，默认就是严格模式
* 类不存在变量提升（hoist），这一点与 ES5 完全不同。
* Generator 方法
```
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```
* new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
Object.getPrototypeOf(ColorPoint) === Point
```
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}


let b = new B();
```
* super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
* 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
* 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
* 多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
```
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
* 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。
```
    Boolean()
    Number()
    String()
    Array()
    Date()
    Function()
    RegExp()
    Error()
    Object()
```
---

```
const fs = require('fs');
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```


* async函数对 Generator 函数的改进，体现在以下四点。
* 内置执行器, Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
* 更好的语义。
* 更广的适用性。
* 返回值是 Promise。



```
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```
```
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```
```
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```
* async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
```
async function fn(args) {
  // ...
}
// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

* 有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```