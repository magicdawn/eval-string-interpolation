var inter = require('./index');
var Block = inter.Block

var name = "zhangsan"
var age = 18

var s = "name = #{name} , age = #{age}"

// console.log(s.fmt);
// console.log(eval(s.fmt));

console.log(eval(inter("name = #{name} , age = #{age}")));