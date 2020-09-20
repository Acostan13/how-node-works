const fs = require("fs")
const crypto = require("crypto")

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 4 // Changes the thread pool size, where 4 is max for node.js

setTimeout(() => console.log("Timer 1 finished"), 0) // timeout executes before immediate in event loop
setImmediate(() => console.log("Immediate 1 finished"), 0)

fs.readFile("test-file.txt", () => {
  console.log("I/O finished")

  setTimeout(() => console.log("Timer 2 finished"), 0)
  setTimeout(() => console.log("Timer 3 finished"), 3000)
  setImmediate(() => console.log("Immediate 2 finished"), 0) // immediate executes after timeout in event loop due to I/O polling

  process.nextTick(() => console.log("Procces.nextTick")) // executes first in the event loop

  // Encryption takes place last in the event loop
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted")
  //   })
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted")
  //   })
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted")
  //   })
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted")
  //   })

  // Encryption takes place synchronously first in the event loop
  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
  console.log(Date.now() - start, "Password encrypted")

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
  console.log(Date.now() - start, "Password encrypted")

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
  console.log(Date.now() - start, "Password encrypted")

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
  console.log(Date.now() - start, "Password encrypted")
})

console.log("Hello from the top-level code")
