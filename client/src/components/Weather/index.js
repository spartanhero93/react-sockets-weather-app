import React from 'react'
import styled from 'styled-components'

const WeatherBox = props => (
  <Wrapper>
    <h1>This is the weather for</h1>
  </Wrapper>
)

// <=== Styling ===>//
const Wrapper = styled.div`
  margin: 0 8rem;
  padding-top: 2rem;
  text-align: center;
`

export default WeatherBox
