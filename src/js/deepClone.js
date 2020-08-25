// 实现引用类型函数的深拷贝

function deepClone(data) {
    //    if(data || typeof(data) ==='object' || typeof(data) === 'function') return;
       let res = Array.isArray(data) ? []:{};
       if(typeof(data) === 'object') {
        for(let key in data) {
            if(typeof(data[key]) === 'object') {
                res[key] = deepClone(data[key]); 
            }else {
                res[key] = data[key];
            }
        }
       }else if(typeof(data[key]) === 'function') {
           res[key] = new data().constructor;
       }
       return res;
    }
    let obj = {a:1,b:2,c:{cc:33,dd:44,ff:{fff:555,eee:{eeee:6666}}}};
    let newObj = deepClone(obj);
    // newObj[2][2].fff = 567;
    newObj.c.ff.fff = 678;
    
    let arr = [{aa:11,bb:22,cc:[{ddd:333,fff:["eeee","4444"]}]}]
    let newArr = deepClone(arr)
    newArr[0]['cc'][0][1] = 66666;
    let fun = {a:1,b:2,c:{aa:11,cc:()=> function() {console.log(44)}}}
    let newFun = deepClone(fun)
    newFun.c.cc = function() {console.log(55);}