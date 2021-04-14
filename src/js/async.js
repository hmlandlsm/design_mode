// 异步操作

async function getData() {
    return await Promise.resolve('我自闭了~~');
}
const data = getData();
console.log(data);   // 返回的是一个Promise函数
