const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
    // Solution 1 - read entire file, then write response in bulk
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.error(err)
    //     res.end(data)
    // })

    // Solution 2: Streams - read file in chunks, writing to server as it reads
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data', chunk => {
    //     res.write(chunk)
    // })
    // readable.on('end', () => {
    //     res.end()
    // })
    // readable.on('error', err => {
    //     console.error(err)
    //     res.statusCode = 500 // Server error status code
    //     res.end('File not found!')
    // })

    // Solution 3 - pipes output of the readable stream directly into the input of the writable stream
    // backpressure - when the server reads the file stream much faster then it can respond to the writable stream
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res) // readableSource.pipe(writableDestination) - solves the problem of backpressure issues from solution 2
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening...')
})