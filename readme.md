#设计模式的学习与总结




笔记：
1、如何中断ajax的请求？
设置请求超时时间、手动调用XML对象的abort()

2、事件委托或事件代理
将事件绑定到目标元素的父元素上，利用冒泡机制触发


3、substring、substr、slice
共处：都是截取字符串的长度
substring和substr：
substring和slice：后者不可接受负参数(首位置，尾位置)
slice：第二个参数指长度


4、字符串常用的方法：
slice、substring、substr、split、indexOf

5、数字的方法：
toString()、toFixed()、toPrecision()、valueOf()（数值返回数值）

6、switch语句使用的是恒等比较


7、if(a = 0) => 返回的是false


8、精度问题：(js中，浮点数的加、减、乘、除都可能会存在精度问题)
加法：0.1 + 0.2 == 0.30000000000000004;
乘法：6.22 * 10 == 62.199999999999996;
除法：62.3 / 10 == 6.2299999999999995;


由于精度问题，toFixed的方法结果不精确也是可能存在的


9、if (myObj !== null && typeof myObj !== "undefined") 
这个判断是有问题的
解析：如果myObj未定义，那么直接判断是否为null会抛出错误myObj未定义
但是使用 typeof myObj时，不会抛出异常


10、for (var i = 0; i < 10; i++) {
    // some code
}
return i;
返回的是10；
原因：在每个代码块中，javascript不会创建一个新的作用域，一般各个作用域都是全局的；



11、return语句只能放在function函数体内，如果不是会报错


12、校验email格式
    var x = '2523434304@qq.com';    
    var atpos=x.indexOf("@");
    var dotpos=x.lastIndexOf(".");
    console.log("email地址：" + x + ',@：位置'+ atpos + '，点的位置：'+ dotpos + '，email长度：' + x.length);
    if (atpos<1 || dotpos < atpos+2 || dotpos+2>=x.length){
        console.log('不是一个有效的 e-mail 地址');
    }else {
        console.log('格式正确');
}



13、call和apply的第一个参数说明：
if(第一个参数是null或者undefined) {
    严格模式下，第一个参数就是this的值
    非严格模式下，this指的是全局对象
}



14、局部变量和全局变量同名的情况下，赋值行为不会相互影响


15、Object.create()、Object.assign()都是浅拷贝：即引用数据类型会随着一方改动而影响所有。




16、Map数据类型





待处理问题：
1、CORS是什么？
2、参数是按值传递还是按引用传递？
基本类型：按值传递（函数内部更改参数不会影响初始值）
引用类型：按引用传递（函数内部更改会导致外层函数更改）