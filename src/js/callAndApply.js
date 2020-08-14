Function.prototype.call();
Function.prototype.apply();

// 当函数不作为对象的属性被调用时，也就是普通函数的形式

// 作为对象的属性被调用
var obj = {
    a:'innerName',
    getName:function() {
        return this.a;
    }
}
obj.getName();
console.log('作为对象属性被调用',obj.getName());


// 作为普通函数被调用1
window.name = 'globalName';
var getName1 = function() {
    return this.name;
}
console.log('作为一般函数被调用1',getName1());

// 作为普通函数被调用2
var obj = {
    a:1,
    getName2:function() {
        return this.name;
    }
}
var getName3 = obj.getName2;
console.log('作为一般函数被调用2',getName3())

// 作为普通函数被调用31
window.id = 'window';
    document.getElementById('testId').onclick = function() {
    console.log('this.id',this.id);
    var callback = function() {
        console.log('回调里的this.id',this.id);
    }
    callback();
}
// 作为普通函数被调用32
// 回调中想让它指向div时
document.getElementById('testId').onclick = function() {
    let that = this;
    console.log('this.id',this.id);
    var callback = function() {
        console.log('回调里的this.id',that.id);
    }
    callback();
}

// 作为构造器被调用
// 除了内置函数，大多数的js函数都可以作为构造器使用
var Myclass = function() {
    this.name = 'myclass的名字';
}
var obj = new Myclass();
console.log(obj.name); //myClass的名字




// ps:当使用new调用构造器时，构造器若显示返回object类型的（其他的没干系）
// 那么运算结果最终会返回这个对象，而不是构造器里定义的字段

var Con = function() {
    this.name = '显示返回对象时，不会返回你的';
    return {
        name:'我是显示返回的'
    }
};
var obj = new Con();
console.log(obj.name);  //我是显示返回的


// 如果显示返回没有属性name,那就是undefined了
var Con1 = function() {
    this.name = '显示返回对象时，不会返回你的';
    return {
        test:'我是显示返回的'
    }
};
var obj = new Con1();
console.log(obj.name);  //我是显示返回的

// 返回非对象类型的话，那就没问题了
var Con2 = function() {
    this.name = '显示返回对象时，不会返回你的';
    return 'niyao'
};
var obj = new Con2();
console.log(obj.name);  //我是显示返回的


// 第四种
// call
var obj1 = {
    name:'luo',
    getName:function() {
        return this.name;
    }
};
var obj2 = {
    name:'shi'
};
console.log(obj1.getName()); // luo
// console.log(obj1.getName.prototype.call(obj2)); //shi
console.log(obj1.getName.call(obj2)) ; // shi

// apply
var obj3 = {
    name:'luo',
    getName:function() {
        return this.name;
    }
};
var obj4 = {
    name:'shi'
};
console.log(obj3.getName()); // luo
console.log(obj3.getName.apply(obj4)) ; // shi


// Page27
// 2.1.2 丢失的this

// var getId = document.getElementById;
// getId('testId');
// 报错原因:此时的this是指向document的，不能这么用了

// 匿名函数的自我执行
// TODO
document.getElementById = (function(func) {
    return function() {
        return func.apply(document,arguments);
    }
})(document.getElementById)
// document.getElementById(document.getElementById);
var getId = document.getElementById;
var Id = getId('testId');
console.log(Id.id); // testId



// aplly 参数格式为（类）数组
var func = function(a,b,c,d) {
    console.log([a,b,c,d])
};
// null:默认宿主对象 ，在浏览器中默认window
// 严格模式下，this指向null
func.apply(null,[1,2,3])


