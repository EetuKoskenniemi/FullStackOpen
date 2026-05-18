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

const Stats = (props) => (
  <div>
    {props.text} {props.count}
  </div>
)

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
      <Stats text={"Good"} count={good}/>
      <Stats text={"Neutral"} count={neutral}/>
      <Stats text={"Bad"} count={bad}/>
      <Stats text={"All"} count={all.good + all.neutral + all.bad}/>
      <Stats text={"Average"} count={avg}/>
      <Stats text={"Positive"} count={`${positive} %`}/>
    </div>
  )
}

export default App