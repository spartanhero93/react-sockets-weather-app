import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import './App.css'

class App extends Component {
  state = {
    response: false,
    endpoint: 'http://192.168.0.12:9000'
  }

  componentDidMount () {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('FromAPI', data => {
      console.log(data)
      this.setState({ response: data })
    })
  }
  render () {
    const { response } = this.state
    console.log(this.state.response)
    return (
      <div style={{ textAlign: 'center' }}>
        {response
          ? <p>
              The temperature in Florence is: {response} °F
            </p>
          : <p>Loading...</p>}
      </div>
    )
  }
}

export default App
