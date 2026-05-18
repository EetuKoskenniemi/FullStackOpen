import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.good != 0 || props.neutral != 0 || props.bad != 0)
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={props.good}/>
            <StatisticLine text={"Neutral"} value={props.neutral}/>
            <StatisticLine text={"Bad"} value={props.bad}/>
            <StatisticLine text={"All"} value={props.all.good + props.all.neutral + props.all.bad}/>
            <StatisticLine text={"Average"} value={props.avg}/>
            <StatisticLine text={"Positive"} value={`${props.positive} %`}/>
          </tbody>
        </table>
      </div>
    )
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState({
      good: 0, neutral: 0, bad: 0
  })
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log("Setting good to", good + 1)
    const newCount = {
      good: all.good + 1,
      neutral: all.neutral,
      bad: all.bad
    }
    setAll(newCount)
    updateAvg(newCount)
    updatePositive(newCount)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log("Setting neutral to", neutral + 1)
    const newCount = {
      good: all.good,
      neutral: all.neutral + 1,
      bad: all.bad
    }
    setAll(newCount)
    updateAvg(newCount)
    updatePositive(newCount)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log("Setting bad to", bad + 1)
    const newCount = {
      good: all.good,
      neutral: all.neutral,
      bad: all.bad + 1
    }
    setAll(newCount)
    updateAvg(newCount)
    updatePositive(newCount)
  }

  const updateAvg = (count) => {
    const total = count.good + count.neutral + count.bad
    const newAvg = ((count.good * 1) + (count.neutral * 0) + (count.bad * -1)) / total
    setAvg(newAvg)
  }

  const updatePositive = (count) => {
    const total = count.good + count.neutral + count.bad
    const posiPercentage = (count.good / total) * 100
    setPositive(posiPercentage) 
  }

  return (
    <div>
      <Header title={"Give feedback"} />
      <Button onClick={() => handleGoodClick()} text="Good"/>
      <Button onClick={() => handleNeutralClick()} text="Neutral"/>
      <Button onClick={() => handleBadClick()} text="Bad"/>
      <Header title={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positive={positive}/>
    </div>
  )
}

export default App