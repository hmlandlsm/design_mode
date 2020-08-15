// 4、执行流：
// 函数声明会覆盖变量声明，但不会覆盖已经赋值的同名变量声明。
// function b(x, y, a) {
//     arguments[2] = 10;
//     alert(a);
// }
// b(1, 2, 3);

// a的值也会变为10，共享的，但是指向两个不同改的内存地址，使用Javascript引擎保持一致






// js是为单线程语言，同步执行的
// js可以通过事件循环实现异步


// 5、事件循环
// a、遇到同步任务直接执行，遇到异步任务分为宏任务和微任务。
// b、有微则微，无微则宏




// 以下方法涉及node.js的process.nextTick();
// node.js也是单线程的，同一时间只会处理一个事件
// process.nextTicks():定义一个动作，并且让这个动作在下一个事件轮询的时间点执行



console.log('1');  //最先执行同步任务
// 宏任务1
setTimeout(function() {
    console.log('5');
    process.nextTick(function() {
        console.log('9');
    })
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() { 
        console.log('11')  //异步
    })
})

process.nextTick(function() {
    console.log('3');
})

// 微任务
new Promise(function(resolve) {
    console.log('2');
    resolve();
}).then(function() {
    console.log('4')
})


// 宏任务2
setTimeout(function() {
    console.log('7');
    process.nextTick(function() {
        console.log('10');  //比同等的then先执行
    })
    new Promise(function(resolve) {
        console.log('8');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 宏任务队列：2,9

// 执行顺序:1、



// function asyncFake(data, callback) {  
//     console.log(1111);      
//         if(data === 'foo') {
//         callback(true);
//         console.log(2222);  
//         } 
//         else {
//         console.log(2222);  
//         callback(false);
//         console.log(3333);  }
//         }
    
//     asyncFake('bar', function(result) {
//     console.log(444444);
//         // this callback is actually called synchronously!
//     });

    // 1111
    // 3333
    // 444444