const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')

const port = process.env.PORT || 9000
const index = require('./routes/index')
const key = require('./config/keys')

const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

let interval
io.on('connection', socket => {
  console.log('New client connected')
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000)
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      `https://api.darksky.net/forecast/${key}/43.7695,11.2558`
    )
    socket.emit('From API', res.data.currently.temperature)
  } catch (error) {
    console.error(`Error ${error}`)
  }
}

server.listen(port, () => console.log(`Listening on port ${port}`))
