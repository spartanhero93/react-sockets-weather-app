const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')

const port = process.env.PORT || 9000
const index = require('./routes/index')
const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)
const keys = require('./apiKeys/keys')

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      `https://api.darksky.net/forecast/${keys.ApiKey}/43.7695,11.2558`
    )
    socket.emit('FromAPI', res.data)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

io.on('connection', socket => {
  console.log('New client connected')
  getApiAndEmit(socket)
  socket.on('disconnect', () => console.log('Client disconnected'))
})

server.listen(port, () => console.log(`Listening on port ${port}`))
