
// 原型模式



// 构造器
// 当使用new来调用一个函数时，此时的函数就是一个构造器

// 创建一个构造函数（约定成俗大写开头）
function Person(name) {
    this.name = name;
}

// 赋予构造函数的原型一个方法
Person.prototype.getName = function() {
    return this.name;
}

// 用函数模拟用new来创建对象
var objectFactory = function() {
    // 创建一个对象
    var obj = new Object();
    // 
    console.log(arguments,'参数')
    // 删除arguments中的第一个元素，并且赋给Constructor（shift方法改为pop来玩了）
    Constructor = [].pop.call(arguments);
     // Constructor这玩意就是获取传进来的构造函数，但为什么不声明呢
    console.log(Constructor,'想看看你是啥') 
    // 手动将这原型赋值过去
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj,arguments);
    return typeof ret === 'object' ? ret:obj;
}

var a = objectFactory('1111','oopop',Person);
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

// 对象没有原型，但是对象的构造器有原型？？


// 对象有一个隐藏属性为_proto_,该属性默认指向它的构造器的原型对象，即{Counstrutor.prototype}


var b = new Object();
// console.log('__proto__是否默认指向构造器的原型？:',b.__proto__ === Object.prototype);



// 可以选选择性地将对象a的构造器的原型指向对象obj1
var obj1 = {name:'敏宝'};
var A = function() {};
A.prototype = obj;
var a = new A();
console.log(a.name); //敏宝