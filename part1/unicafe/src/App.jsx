import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => good + neutral + bad

  const getAverage = () => (good - bad) / getAll()

  const getPositive = () => good / (getAll())

  if(getAll() === 0)
    return (
    <>
      <h1>Statistics</h1>
      <p>No feedback given.</p>
    </>
    )

  return (
  <>
    <h1>Statistics</h1>
    <p>
      Good: {good} <br/>
      Neutral: {neutral} <br/>
      Bad: {bad}
    </p>
    <p>
      All: {getAll()} <br/>
      Average: {getAverage()} <br/>
      Positive: {getPositive()}%
    </p>
  </>
  )
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
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodPress}>good</button>
      <button onClick={handleNeutralPress}>neutral</button>
      <button onClick={handleBadPress}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
