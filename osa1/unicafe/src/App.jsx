import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick= {handleClick}>
      {text}
    </button>
  )
}

const StatisticValue = ({text, value}) => {
  if (text === "positive") {
    return (
          <tr>
      <td>{text}</td><td>{value} %</td>
    </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = ((props.good * 1) + (props.bad * -1)) / total

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticValue text="good" value={props.good}/>
          <StatisticValue text="neutral" value={props.neutral}/>
          <StatisticValue text="bad" value={props.bad}/>
          <StatisticValue text="all" value={total}/>
          <StatisticValue text="average" value={average}/>
          <StatisticValue text="positive" value={(props.good / total) * 100}/>
        </tbody>        
      </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBad = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }
  
  const handleNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGood} text ="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  ) 
}

export default App