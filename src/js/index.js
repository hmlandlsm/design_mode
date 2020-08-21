// chapter 1 动态类型语言

var duck = {
    duckSing:function() {
        console.log('嘎嘎嘎')
    }
};
var chicken = {
    duckSing: function() {
        console.log('嘎嘎嘎')
    }
};

var choir = [];
var joinChoir = function(animal) {
    if(animal && typeof animal.duckSing === 'function') {
        choir.push(animal);
        console.log('加入合唱团成功',choir.length)
    }
}

joinChoir(duck);
joinChoir(chicken);


// 封装 
// 封装数据
// 封装实现
// 封装类型
// 封装变化

// js 通过作用域来实现封装

// 1. let的作用域 2.函数的作用域 3.Symbol创建私有属性

// 没有类的概念，类和对象：铸模和铸件 克隆就可以啦，不用铸模也可


// 构造函数都习惯大写开头

// 原型的克隆模式
var Plane = function() {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}
var plane = new Plane();

plane.blood = 500;
plane.attackLevel = 2;
plane.defenseLevel = 2;

// 克隆一架飞机
var clonePlane = Object.create(plane);
console.log(clonePlane); //和plane一样

// 有些浏览器不支持Object.create的方法
Object.create = Object.create || function(obj) {
    // F为构造函数
    var F = function() {};
    F.prototype = obj;
    return new F();
}

    
// 1.4.5 js的原型继承
// 通过原型链来实现对象之前的继承（克隆）


// 所有的数据都是对象
// 对象不是实例化，而是克隆
// 对象可以使用原型的方法等
// 对象自己找不到的东西，会去原型里面找

// TODO
// 基本类型:undefined、number、boolean、string、function、object????


// shift 和 unshift
// shift():删除数组的第一个元素，并返回第一个元素的值
var arr = ['aa','cc','ff',1,2,3];
var i = arr.shift();
console.log('第一个元素被删除，其值为:',i,',数组长度为：',arr.length); //aa 5

var arr1 = [];
var i1 = arr1.shift();
console.log('第一个元素被删除，其值为:',i1,',数组长度为：',arr1.length);//undefined 0

// ps：会改变原来数组长度

// pop
var arr_pop = ['aa','cc','ff',1,2,3];
var i2 = arr_pop.pop();
console.log('最后一个元素被删除，其值为:',i2,',数组长度为：',arr_pop.length) //3,5
// push


// 在new Date()前面直接添加+，可以输出13位的时间戳
function now() {
    return +new Date()
  }



//  浏览器和Web Worker里面，self也是指向顶层对象的
// Node环境里面，顶层对象是global

// 全局环境中，this返回的是顶层对象
// 在Node模块和ES6的模块中，this返回的是当前模块




// 1到100的递归求和实现

function add(num1,num2) {
    let num = num1 + num2;
    if(num2 + 1 > 100) {
        return num;
    }else {
        return add(num,num2+1);
    }
}

let num = add(1,2);
// (1+100)*50/2 == 5050;