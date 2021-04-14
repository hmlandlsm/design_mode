/**
 * 1、computed和watch的区别
 * 
 * 计算属性：computed是通过其他变量计算得来的一个属性，依赖于一个或多个属性变化
 * 计算属性具有缓存，计算属性是基于他们依赖进行缓存的，计算属性只有在它的相关依赖
 * 发生变化时，才会重新求值，只要他们依赖的属性没有发生变化，都会直接返回之前的计算
 * 结果，而不必再次执行函数。
 * 使用场景：如果一个数据需要经过复杂计算就用computed；
 * 监听属性：watch是只可以对一个变量进行监控
 * 使用场景：如果一个数据需要被监听并且对数据做一些操作就用watch
 */


// 2、vue中动态添加路由的方法

const router = new Router(routes:[]);
router.addRoutes([{path:'',name:'',component:()=> import('')}])

// 常规操作举例子
const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
        },
        {path: '/', redirect: '/home'},
    ]   
})
const router = new Router({
    routes: [
        {path: '/', redirect: '/home'},
    ]   
})

router.addRoutes([
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    }
])


// 3、实现引用类型数据的深拷贝
function deepClone(data) {
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


// 4、symbol是一种基本数据类型，Symbol()函数会返回symbol类型值，该类型具有静态属性和静态方法；

// 5、switch...case函数采用的是严格相等比较
var value = new String('a');
switch(value) {
    case 'a':{
console.log('aaa');
break;
    }
        default:{
console.log('ddd');
}
// ddd