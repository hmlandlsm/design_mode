// 提供代码组织为一个逻辑单元的手段
// 这个逻辑单元中的代码可以通过单一变量进行访问

// 优点：

// 1、可以用来划分命名空间，减少全局变量数量
// 2、代码组织地更为一致，使代码容易阅读和维护
// 3、可以被实例化，且实例化一次



function CreateDiv(html) {
    this.html = html;
    this.init();
}

// 创建div的方法
CreateDiv.prototype.init = function() {
    let div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = '11'
    div.innerText = '22'
    console.log(div)
}


// 代理实现单例模式
let ProxyMode = (function (){
    let instance;
    return function(html) {
        if(!instance) {
            instance = new CreateDiv()
        }
        return instance;
    }
})()

let a = new ProxyMode('aaaa');
let b = new ProxyMode('bbbb');
console.log(a);
console.log(b);
console.log(a===b)
