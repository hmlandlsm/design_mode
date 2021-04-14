// 哈哈哈哈谁叫我喜欢数组呢
// 1、forEach
// forEach虽说是不改变原来数组，只是对数组进行操作，也是相当于对自己对象操作


var emptyArr = [];
var arr1 = [33, 44, 55, 66, 77, 88, 99, { aa: 11, bb: 22 }, { aa: 33, bb: 44 }, { cc: 1234 }];
// console.log(JSON.stringify(arr1));  
arr1.forEach((item, index) => {
    if (typeof (item) == 'number') {
        // item = item + 1;  //单单操作item是不会更改基本数据类型的
        arr1[index] = arr1[index] + 1; // 引用index，直接操作arr1[index]这种情况下就可以操作arr中的基本数据类型
    } else if (typeof (item) == 'object') {
        for (let key in item) {
            item[key] = item[key] * 2;
        }
    }
})
// console.log(JSON.stringify(arr1));
// 空数组不会执行，不会报错
emptyArr.forEach(item => {
    console.log('forEach函数不会执行空数组')
})



// 2、map
// map函数一定要return回去，不然数据为undefined;
var arr2 = [1, 2, 3, 4, 5, 6];
var res2 = arr2.map((item) => {
    if (item < 3) {
        return item + item;
    } else {
        return item;
    }
})
// console.log(res2)

var res2_1 = emptyArr.map(item => {
    console.log('map函数不会执行空数组')
})
// 3、filter


var products = [
    { name: "cucumber", type: "vegetable" },
    { name: "banana", type: "fruit" },
    { name: "celery", type: "vegetable" },
    { name: "orange", type: "fruit" }];
    var filteredArr = products.filter(item => {
        return item.type == 'fruit'
    })
    // console.log(filteredArr)

    // 过滤出两数组相同属性的值hhhhhh好像不可以，看错题目了
    // var products2 = [
    //     { name: "cucumber2", type: "vegetable" },
    //     { name: "banana2", type: "fruit" },
    //     { name: "celery2", type: "fruit" },
    //     { name: "orange2", type: "fruit" }];
    // var res2_filter = [];
    // var filter2  = products.filter(item => {
    //          res2_filter = products2.filter(el => {
    //             console.log(el.type,item.type );
    //             return el.type == item.type == 'vegetable';
    //         })
    //     })
    //     console.log(res2_filter);

// 4、find
// 手动实现数组array.find()的方法：
// 返回第一个符合要求的元素，并且不会继续执行
// 不会执行空数组,也不会判断空数组
// 如果没有符合条件的,返回undefined
// 没有改变原来的值
Array.prototype.find2 = function(callback) {
    if(this === null) {
        throw new Error(this + 'is null or not defined');
    }
    if(typeof callback !== 'function') {
        throw new Error('参数不是回调函数');
    }

    for(let i=0;i<this.length;i++) {
        if(callback(this[i])) {
            return this[i];
        }
    }
}
var findArr = [1,2,3,4,5,6];
console.log(findArr.find2(i => i == 2));

// 4.1 findIndex返回符合条件的数组第一个元素的位置
// 不会执行空数组
// 也不会改变原来的值

// 5、some

// 会依次执行数组的每一个元素
// 如果有一个元素满足条件,则表达式返回true,剩余的原色不会再执行检测
// 满足条件返回true，不满足条件返回false
// 不会执行空函数，不会改变原数组



// 6、every
// 7、reduce

var arr = [1,2,3,4,5];
arr.reduce((a,b) => {
console.log(a,b);
// return a+1;
})

// a,b分别代表的是第一、第二个需要比较的数
// 但是第一个数是需要return回去的，没有return回去的话是undefined



// 展开运算符：
const rrr = [1,2,3,4,5];
const [...h] = rrr;  // h:[1,2,3,4,5]
const [y] = arr;  //y:1




// 删除数组项的方法：
// 替换、删除
arr.splice(index,len,[item]);
/*
会改变原数组
包括开始索引，不包括结束索引
*/

delete arr[index];


// 不改变原数组
arr.slice();
arr.shift();
arr.pop();





// 数组去重的方法：



// 字符串去重的方法：



// 哪些数组方法会改变原数组的，哪些不会的，这个要统一一下



