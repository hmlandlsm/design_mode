// map 数据类型


// 1、map数据类型可以接受任意参数类型作为键值
var map = new Map();
map.set(1,'数值类型');
map.set('字符串','字符串类型');
map.set(null,'null类型');
map.set(undefined,'undefined类型');
map.set(NaN,'NaN类型');
map.set(Symbol('symbol','symbl类型'));
map;


// 2、map.get() 比对的方法是使用 === 符号；
map.get();


// 3、map和object 的类型对比
/*
map可以接受任意类型的键名
object只接收两种类型的键名，String和Symbol，就算使用起来类型也会饮食转换为字符串类型


*/


// 4、for of  map类型是可迭代的，object尝试迭代会直接报错
for(const entry of map) {
    console.log(entry);
}