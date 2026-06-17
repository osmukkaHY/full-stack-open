import { useState } from 'react'

const Button = ({onClick, text}) => {
  <div>
    <button onClick={onClick}>text</button>
  </div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodPress = () => {
    setGood(good + 1)
  }

  const handleNeutralPress = () => {
    setNeutral(neutral + 1)
  }

  const handleBadPress = () => {
    setBad(bad + 1)
  }

  const getAll = () => {
    return good + neutral + bad
  }

  const getAverage = () => {
    if(getAll() === 0)
      return 0
    return (good - bad) / getAll()
  }

  const getPositive = () => {
    if(getAll() === 0)
      return 0
    return good / (getAll())
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodPress}>good</button>
      <button onClick={handleNeutralPress}>neutral</button>
      <button onClick={handleBadPress}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositive()} %</p>
    </div>
  )
}

export default App
