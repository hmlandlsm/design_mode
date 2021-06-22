// 异步实现
// all 方法、race方法
// 属于宏任务

// 参考链接:https://blog.csdn.net/shan1991fei/article/details/78966297

// 1、
// 注意：new Promise的then才是异步，但new Promise还是会直接执行的
// let p1 = new Promise(function(relove,reject) {
//     console.log(222);
// })
// console.log(111)


// // setTimeout为宏任务
// let p2 = new Promise(function(reslove,reject) {
//     setTimeout(()=> {
//         console.log(333)
//     },0)
// })
// setTimeout(()=> {
//     console.log(444)
// },0)


// // then只是异步任务，非宏任务？？
// let p3 = new Promise(function(resolve,reject) {
//     resolve(666)
// }).then((res)=> {
//     console.log(res)
// })

// console.log(555)



//2、 catch方法和then里面的第二个参数是一样

// let p4 = new Promise(function(resolve,reject) {
//     let num = Math.ceil(Math.random() * 10);
//     if(num > 5) {
//         resolve(num + '随机数大于5')
//     }else {
//         reject(num + '随机数小于等于5');
//     }
// }).then((res) => {
//     console.log(res);
// },(res) => {
//     console.log(res);
// })

// let p5 = new Promise(function(resolve,reject) {
//     let num = Math.ceil(Math.random() * 10);
//     if(num > 5) {
//         resolve(num + '随机数大于5')
//     }else {
//         reject(num + '随机数小于等于5');
//     }
// }).then((res) => {
//     console.log(res);
// }).catch((res) => {
//     console.log(res);
// })


// 3、all的方法：所有异步操作执行完成后，才执行回调

function run1() {
    let p1 = new Promise(function(resolve,reject) {
        console.log('第一个异步')
        resolve('11')
    }).then((res) => {
        console.log(res);
        return new Promise(function(resolve,reject) {
            resolve('aaaaaaa')
        })
    })
    return p1;
}

function run2() {
    let p2 = new Promise(function(resolve,reject) {
        console.log('第二个异步')
        resolve('22')
    }).then((res) => {
        console.log(res);
        return new Promise(function(resolve,reject) {
            resolve('bbbbbb')
        })
    })
    return p2;
}

function run3() {
    let p3 = new Promise(function(resolve,reject) {
        console.log('第三个异步')
        resolve('33')
    }).then((res) => {
        console.log(res);
        return new Promise(function(resolve,reject) {
            resolve('ccccccc')
        })
    })
    return p3;
}

// Promise.all([run1(),run2(),run3()]).then((res) => {
//     console.log(res)
// })



// 4、race方法：(输出最快的那个，就是aaaa)
Promise.race([run1(),run2(),run3()]).then((res)=> {
    console.log(res)
})


