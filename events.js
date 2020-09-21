const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
    constructor() {
        super()
    }
}

const myEmitter = new Sales()

// Event listeners that observe the emitter and waits until the 'newSale' event is called
myEmitter.on('newSale', () => {
    console.log('There was a new sale!')
})
myEmitter.on('newSale', () => {
    console.log('Customer name: Alex')
})
myEmitter.on('newSale', stock => {
    console.log(`There now ${stock} items left in stock`)
})

// Emits the events
myEmitter.emit('newSale', 9)

////////////////////////////////////////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('Request recieved!')
    console.log(req.url) // request sent twice: one for the root @ / and another for the favicon.ico
    res.end('Request recieved')
})

server.on('request', (req, res) => {
    console.log('Another request :)')
})

server.on('close', (req, res) => {
    res.end('Server closed')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...')
})