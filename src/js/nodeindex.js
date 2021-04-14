// var n = 123;
// var a = 'hello';
// function f() {
// console.log(globalThis.a);
// }
// var obj = {
// a:2,
// f: f
// }
// var f2 = obj.f;
// f2();



/*
在代码块里面，不存在函数变量提升
*/

(function m() {
    console.log(a1);
    console.log(a2);
    console.log(b1);
    console.log(b2);
    // function b1() {}
    // function b2() {}
    if(false) {
        var a1 = 100;
        function b1() {}
    }

    if(true) {
       var a2 = 200;
       function b2() {}
    }

    console.log(a1);
    console.log(a2);
    console.log(b1);
    console.log(b2);
}())

