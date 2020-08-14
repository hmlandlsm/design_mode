// 对象初始化


// 1、创建对象的方法:
// new Object();
// Object.create();
var obj = {}; //字面量创建


// 2、字符串转换成对象的方法
var a = 'foo';
typeof({a}); // "object"
{a}; // {a:'foo',__proto__:Object}


// 3、重复属性名会被覆盖,不管是字符串的值，还是函数
var obj = {
    a:'aaa',
    a:function() {
    console.log('woshiaa');
    }
    };
    obj.a;  // 输出的是function() {console.log('woshiaa')}


// 4、对象克隆方法：Object.assign();(不克隆原型)
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
// obj1.prototype.name = '原型中的名字';
var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };  //相同属性时，obj2的属性会覆盖obj1的属性
mergedObj;
// 请注意，Object.assign()会触发setter，而展开操作符则不会。

// 问题：深拷贝是否会拷贝原型中的方法和属性？展开运算符呢？

// 5、变更原型
// assert不太会用，先笨笨理解下
const assert = require('assert')
var obj1 = {};
assert(Object.getPrototypeOf(obj1) === Object.prototype);
var obj2 = { __proto__: null };
assert(Object.getPrototypeOf(obj2) === null);
var protoObj = {};
var obj3 = { "__proto__": protoObj };
assert(Object.getPrototypeOf(obj3) === protoObj);
var obj4 = { __proto__: "not an object or null" };
assert(Object.getPrototypeOf(obj4) === Object.prototype);
assert(!obj4.hasOwnProperty("__proto__"));


assert.equal(1,'1');
// 生成 AssertionError 以便稍后比较错误的消息：
const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
  });
  
  // 验证错误的输出：
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
  }
// var __proto__ = "variable";
// var obj1 = { __proto__ };
// assert(Object.getPrototypeOf(obj1) === Object.prototype);
// assert(obj1.hasOwnProperty("__proto__"));
// assert(obj1.__proto__ === "variable");
// var obj2 = { __proto__() { return "hello"; } };
// assert(obj2.__proto__() === "hello");
// var obj3 = { ["__prot" + "o__"]: 17 };
// assert(obj3.__proto__ === 17);


// var obj1 = {};
// console.log(Object.getPrototypeOf(obj1) === Object.prototype);  //true

// var obj2 = {__proto__:null};
// console.log(Object.getPrototypeOf(obj2) === null); // true

// var obj3 = {"__proto__":{}};
// console.log(Object.getPrototypeOf(obj3) === {}); //false

// var p_obj = {};
// var obj31 = {"__proto__":p_obj};
// console.log(Object.getPrototypeOf(obj31) === p_obj); //true

// var obj4 = {__proto__:"not an object or null"};
// console.log(Object.getPrototypeOf(obj4) == Object.prototype); //true
// console.log(!obj4.hasOwnProperty("__proto__")); //true

// // 不使用冒号标记的属性定义，不会变更对象的原型；而是和其他具有不同名字的属性一样是普通属性定义


// var __proto__ = "variable";
// var obj1 = { __proto__ };
// console.log(Object.getPrototypeOf(obj1) === Object.prototype);
// console.log(obj1.hasOwnProperty("__proto__"));
// console.log(obj1.__proto__ === "variable");

// var obj2 = { __proto__() { return "hello"; } };
// console.log(obj2.__proto__() === "hello");

// var obj3 = { ["__prot" + "o__"]: 17 };
// console.log(obj3.__proto__ === 17);



// 对象的对象冻结
var containsize = (obj) => {
  obj = Object.freeze(obj);
  Object.keys(obj).forEach((key,i) => {
    if(typeof obj[key] === 'object') {
      containsize(obj[key]);
    }
  }) 
}