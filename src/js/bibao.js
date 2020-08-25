// 1、仅仅将函数体赋值给bar，
// function foo() {
//     let title = 'luoluo';
//     console.log(title)
// };
// let bar = foo;
// bar();



// 2、将函数执行后再赋值给bar
// ps:bar其实得到的就是return 里面返回的函数体
// function foo() {
//     let title = 'luoluo';
//     return function() {
//         console.log(title)
//     }
// };
// let bar = foo();
// bar();


// 3、闭包的实际应用
// 实现计数器的闭包
// function counter() {
//     let count = 0;
//     return function() {
//         count +=1;
//         console.log(count)
//     }
// }
// let counter1 = counter();
// let counter2 = counter();
// counter1();
// counter2();


// 4、闭包实例2
// for 循环打印

// 4.1 正常打印for循环的
// for(let i=0;i<5;i++) {
//     console.log(i)
// };

for(var i=0;i<5;i++) {
    setTimeout(() => {console.log(i)},3000)
};



// 闭包的缺点：导致内存占用过多，因为变量没有得到释放
