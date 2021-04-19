const express = require('express')
const cors = require('cors')

require('./configs/dataBase')

const app = express();

const server = app.listen(8000)

console.log("Server is running on port 8000")

const socket = require('socket.io')
const io = socket(server,{
    cors:{
        origin: '*'
    }
})

module.exports = io

require('./socketsController/socketsController')


