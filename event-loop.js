const fs = require('fs')
setTimeout(() => console.log('Timer 1 finished'), 0) // executes before immediate in event loop
setImmediate(() => console.log('Immediate 1 finished'), 0)

fs.readFile('test-file.txt', () => {
    console.log('I/O finished')

    setTimeout(() => console.log('Timer 2 finished'), 0)
    setTimeout(() => console.log('Timer 3 finished'), 3000)
    setImmediate(() => console.log('Immediate 2 finished'), 0) // executes after immediate in event loop due to I/O polling

    process.nextTick(() =>console.log('Procces.nextTick')) // executes first in the event loop
})

console.log('Hello from the top-level code')