* 函数与方法的区别： 定义在对象中作为属性值的函数称之为方法
* 原始类型都有其对应的包装对象，Number() , String() , Boolean()可以通过构造函数显式创建 var str = new Number('string')这时候我们就可以 str.toUpperCase() 调用它的属性方法。      这里有一个问题,如果我们定义一个字符串直接量 var str = 'string'      此时str为原始类型,但是我们常常会 str.toUpperCase() 调用属性方法,      str不是对象，为什么会有属性方法？ 其实这里javascript会隐式创建包装对象,通过包装对象来调用属性以及属性方法，一旦操作结束后，临时包装对象就会被销毁。
* 原始类型不可修改，对象类型的属性是可变的。  var str = 'string'  str.toUpperCase() 并不会改变'string'为'STRING',而是重新返回一个新的字符串。
同样，数字与布尔型的值更是无法改变,var num = 5 , 数值5无法改变，能够改变的只是变量num指向的值。
* 原始类型比较大小时候，会比较其值，var num1 = 5, num2 = 5 num1 == num2 -> true 对象类型比较其是否引用同一个基对象，

## 如何定义类
* 构造函数
* Object.create()
* Class
  
* prototype：是函数的一个属性（每个函数都有一个prototype属性），这个属性是一个指针，指向一个对象，即原型对象。__proto__：是一个对象拥有的内置属性（请注意：prototype是函数的内置属性，__proto__ 是对象的内置属性），是JS内部使用寻找原型链的属性。因为构造函数可以定义类，所以也可以理解类的prototype属性指向类的原型对象。__proto__指向实例对象继承的某个原型对象。
---
* Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
* Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
* Object.assign可以用来处理数组，但是会把数组视为对象。
* Object.assign方法实行的是浅拷贝，而不是深拷贝

* 为对象添加属性
```
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```
* 为对象添加方法

```
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```
* Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。
```
const obj = {
  foo: 122,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 122,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```
* Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。