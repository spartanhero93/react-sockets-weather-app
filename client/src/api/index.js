import openSocket from 'socket.io-client'
const socket = openSocket('http://192.168.0.12:9000')

export const subscribeToTimer = (interval, cb) => {
  socket.on('timer', timestamp => cb(null, timestamp))
  socket.emit('subscribeToTimer', interval)
}
