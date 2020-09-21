// Displays the inner function of node which shows that is is a wrapper function of js
// console.log(arguments) // Arguements array : exports, require, exports, module, file name, directory name
// console.log(require('module').wrapper) // displays the wrapper function

// module.exports
const C  = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2, 5))

// exports
const {add, multiply, divide} = require('./test-module-2')
console.log(add(2, 5))
console.log(multiply(2, 5))
console.log(divide(2, 5))

// caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()