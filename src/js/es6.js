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
