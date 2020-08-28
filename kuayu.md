1、JSONP
2、CROS:资源共享
3、webpack的devServer配置proxy域名
4、



ajax:指的是XMLHttpRequest(XHR)对象，

jq的ajax就是对原生的XHR进行封装

缺点：本身针对MVC的编程，不符合现在的前端MVVM浪潮
基于XHR开发，XHR结构本身不清晰
jq太大了



axios：vue2.0之后，基于promise,用于浏览器+nodejs的http客户端，本质上也是对原生的XHR的封装，符合最新的ES6规范；

1、从浏览器创建XMLHttpRequest，
2、支持promise 的API；
3、客户端支持防止CSRF；
4、提供一些并发请求的接口；
5、从node.js创建http请求
6、拦截请求和响应
7、转换请求和响应数据
8、取消请求
9、自动转换JSON数据


CSRF:就是让你的每个请求都带一个cookie中拿key值，根据浏览器的同源策略，假冒的网站拿不到你的cookie的key值的，这样，后台就可以分辨当前请求是否是假冒网站的误导输入了



