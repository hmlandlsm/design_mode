// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
const { printName } = logger;
// printName(); // TypeError: Cannot read property 'print' of undefined
function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}

const loggers = selfish(new Logger());



// 数组扩展运算符...:
// 可以用于数组合并
var arr1 = [1,2,3];
var arr2 = [3,4];
var arr = [...arr1,...arr2];


// 利用扩展运算符将伪数组转换为真正的数组
var value = {number:10};
function multiple(x={...value}) {
    console.log(x.number*=2);
}

multiple();  //20
multiple();  //20
multiple(value);  //20
multiple(value);  //40





// 错误例子
var obj = {name:'罗诗敏',age:18};
for(const item of obj) {
    console.log(Object.keys(item));
}


// for(let ... of ...) 只能适用于数组（对象可能有不可枚举属性）

// for(let ... in ...) 适用于对象



// call、apply、bind
/*
fn.call(obj,a1,a2...) // 直接执行
fn.apply(obj,[a1,a2,...])  // 直接执行
fn.bind(obj,a1,a2...) //不会直接执行，而是需要再调用一次才会执行

*/