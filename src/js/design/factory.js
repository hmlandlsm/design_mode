// 工厂模式

// 构造函数
// 示例1
// function CreateStu(name,age,sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex;
//     this.sayName = () => {
//         console.log(this.name)
//     }
//     return this;
// }
// let obj1 = new CreateStu('罗','20','女');
// let obj2 = new CreateStu('luo','21','女');
// console.log(obj1)
// console.log(obj2)
// console.log(obj1.sayName())
// console.log(obj2.sayName())
// console.log(typeof obj1)
// console.log(obj1 instanceof Object)

// 示例2
function CreateStu(name,age,sex) {
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = () => {
        console.log(obj.name)
    }
    return obj;
}
let obj1 = new CreateStu('罗','20','女');
let obj2 = new CreateStu('luo','21','女');
console.log(obj1)
console.log(obj2)
console.log(obj1.sayName())
console.log(obj2.sayName())
console.log(typeof obj1)
console.log(obj1 instanceof Object)


// 示例1和示例2输出一样的结果

// 特点：可以无数次调用该构造函数
// 缺点：对象的类型不明确





// 复杂的工厂模式：(不太懂)
// https://juejin.im/entry/6844903469397049352
// 将成员对象的实例化推迟至子类中
// 子类可以重写父类的接口方法一遍创建的时候指定自己的对象类型

// 定义构造函数

function BicyleCleShop() {};

BicyleCleShop.prototype = {
    constructor:BicyleCleShop,
    sellBicycle:function(tpye) {
        let bicycle = this.createBicycle(type);
        // 再在此调用子方法
        bicycle.A();
        bicycle.B();
        return bicycle;
    },
    createBicycle(type) {
        console.log(type)
    }
}


// 抽象类的虚方法必须先被声明，但可以在其他方法中被调用
