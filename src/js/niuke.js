
// 1
// var color = "red";
// var testObj = {
// color:"blue",
// getColor:function() {
// var color = "green";
// console.log(this.color);
// }
// };
// ​
// var getColor = testObj.getColor;
// getColor(); //red
// testObj.getColor();  //blue


// // 2
// function Foo() {
//     var i=0;
//     console.log(i++);
//     return {
//         alert(i);
//     }
// }
// var a = 0, b = 0;
// function A (a) {
//   A = function (b) {
//     console.log(a + b++)
//   }
//   console.log(a++)
// }
// A(1)
// A(2)

var ss = Buffer.from('aaa')
console.log(ss)
