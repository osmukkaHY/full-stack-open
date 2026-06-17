import { useState } from 'react'

const Button = ({text, callback}) => <button onClick={callback}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <>
      {text}: {value} <br/> 
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => good + neutral + bad

  const getAverage = () => (good - bad) / getAll()

  const getPositive = () => good / getAll()

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
      <StatisticLine text={'Good'} value={good} />
      <StatisticLine text={'Neutral'} value={neutral} />
      <StatisticLine text={'Bad'} value={bad} />
      <StatisticLine text={'All'} value={getAll()} />
      <StatisticLine text={'Average'} value={getAverage()} />
      <StatisticLine text={'Positive'} value={getPositive()} />
  </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodPress = () => setGood(good + 1)
  const handleNeutralPress = () => setNeutral(neutral + 1)
  const handleBadPress = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' callback={handleGoodPress} />
      <Button text='neutral' callback={handleNeutralPress} />
      <Button text='bad' callback={handleBadPress} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
