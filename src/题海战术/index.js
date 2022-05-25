 // 1、手写bind函数
//  bindThis(fn, target) {
//     const args = Array.prototype.slice.call(arguments, 2)
//     return function () {
//         fn.apply(target, Array.prototype.slice.call(arguments).concat(args))
//     }
// }
// 2、使函数的this绑定指定的对象

// function bindTarget(fn, target) {
//     // coding
//     return fn.bind(target)
// }

// function bindTarget (fn, target) {
//     if (fn.bind) {
//         return fn.bind(target)
//     } else {
//         return function () {
//             return fn.apply(target, arguments)
//         }
//     }
// }

// function bindTarget (fn, target) {
//     if (fn.bind) {
//         return fn.bind(target)
//     } else {
//         return function () {
//             return fn.call(target, ...arguments)
//         }
//     }
// }


// 验证
// const testFn = function (a, b, c) {
//     return a + b + c + this.value
// }
// const res = bindTarget(testFn, {value: 5})(1,2,3) // 11


// 3、获取url的参数
// function getUrlParam(sUrl, sKey) {
//     if (!sUrl) return ''
//     const arr = sUrl.split('?')[1].split('#')[0].split('&')
//     const obj = {}
//     arr.forEach((item, index) => {
//         const key = item.split('=')[0]
//         const value = item.split('=')[1]
//         obj[key] = !obj[key] ? value : Array.isArray(obj[key]) ? obj[key].concat(value) : [obj[key], value]
//     })
//     if (!sKey) return obj
//     return obj[sKey] || ''
// }
// const sUrl = 'http://www.nowcoder.com?key=1&key=2&key=3&test1=4#hehe'

// 优化一点点
// getUrlParams() {
//     let path = window.location.href, params = {}
//     let paramsStr = path.substring(path.indexOf('?') + 1, path.indexOf('#') === -1 ? path.length : path.indexOf('#'))
//     paramsStr.split('&').forEach(d => {
//         let arr = d.split('=')
//         params[arr[0]] = arr[1]
//     })
//     return params
// }

// 还有正则，我不会写

// getUrlParam(sUrl, 'test1') // '4'


// 4、查找两个节点的最近的一个共同父节点，可以包括节点自身

function commonParentNode (oNode1, oNode2) {
    if (oNode1.contains(oNode2)) {
        return oNode1
    } else {
        return commonParentNode(oNode1.parentNode, oNode2)
    }
}

const x = 2 
const a = [...(x > 0 ? ['a'] : []), 'b']