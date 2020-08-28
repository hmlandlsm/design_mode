<!-- 性能优化笔记总结 -->
参考链接：https://www.cnblogs.com/Renyi-Fan/p/10907525.html#_label33


总结：
1、http请求优化，减少cookie、减少http请求次数
2、使用预加载、延迟加载策略
3、css文件放在头部、js文件放在底部


Q1、js和css文件应该放在文件中还是文件外？
文件外；文件外首次访问虽然增加了http的请求个数，但是减少了html的面积，而且都可以在浏览器中被缓存起来


Q2、为什么减少cookie的体积？
cookie会在每一次客户端和服务端通讯时，通过http文件头都会带上该域名下的cookie，占带宽、影响响应速度


Q3、js放在底部、css放在头部的缘由？(todo)
浏览器会在下载完成css之后才会对页面进行渲染、加载js后则会立即执行函数


Q4、为什么在文件头设置Expires或者cache-control？
对于静态文件：Expires:"Never expire"(永不过期)
对于动态文件：Cache-Control文件头来帮助浏览器进行有条件的请求


Q5、减少http的请求实现
合并js文件

