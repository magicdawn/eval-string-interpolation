#eval-string-interpolation

Ruby style string-interpolation for nodejs with `eval` function

#Install
	$ npm i eval-string-interpolation --save
	
#Usage
`var inter = require('eval-string-interpolation');`

`eval(inter( use_interpolation_string_here ))`

Example
```js
var inter = require('eval-string-interpolation');

var name = "zhangsan"
var age = 18

console.log(eval(inter("name = #{name} , age = #{age}")));
// name = zhangsan , age = 18
```

## String#inter
By default,it will define the `inter` property,so example above sames to
`console.log(eval("name = #{name} , age = #{age}".inter));`


##@ support
`#{ @name }` -> `this.name`

`#{ @['content-type'] }` -> `this['content-type']`


#Other Implementations
- [Fomatto](https://github.com/BonsaiDen/Fomatto) use {} as placeholder
- [rssi](https://github.com/mvasilkov/rssi) 
- [string-interpolate](https://github.com/alexeyraspopov/string-interpolate)

Fomatto works like a formatter, rssi & string-interpolate looks like a template engine, it's not so lightweight.

Or maybe you are looking for  a simple function that can process like
```js
some_func("name = #{name} , age = #{age}")
```
no way... since I can't find a way to access the `current scope`

#License
the MIT License. Copyright 2014 `magicdawn<784876393@qq.com>`