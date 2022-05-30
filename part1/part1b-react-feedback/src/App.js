import { useState } from 'react'


const MainDisplay = (props) => {
  return (
    <h1>
      {props.text}
    </h1>
  )

}

const StatisticsLine = ({text,value}) => {
  return(
    <>
    <td>{text}</td>
    <td> {Number(value).toFixed(2)}</td>
    </>
  )
}
const Statistics = ({good,neutral,bad,total,average,avgper}) => {
  if(total == 0){
    return (
      <p>No Review</p>
    )
  }
  return (
    <>
    <div>Bye World</div>
    <table>
      <tbody>
      <tr><StatisticsLine text="good" value={good}/></tr>
      <tr><StatisticsLine text="neutral" value={neutral}/></tr>
      <tr><StatisticsLine text="bad" value={bad}/></tr>
      <tr><StatisticsLine text="Average" value={average}/></tr>
      <tr><StatisticsLine text="Total" value={total}/></tr>
      <tr><StatisticsLine text="Positive %" value={avgper}/></tr>
      </tbody>
    </table>
    </>
  )

}

const Button = ({onClick, text}) =>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+neutral+bad
  const average = (good+(-1*bad))/total
  const avgper = (good/total)*100
  
  return (
    <>

    <div>
      <MainDisplay text="Feedback"/>
    </div>

    <div>
      <p>{good}</p>
    </div>

    <div>
      <Button onClick={()=> setGood(good+1)} text="Good"/>
      <Button onClick={()=> setNeutral(neutral+1)} text="Neutral"/>
      <Button onClick={()=> setBad(bad+1)} text="Bad"/>
    </div>

    <MainDisplay text="Statistics" />
    <Statistics total={total} good={good} neutral={neutral} bad= {bad} average={average} avgper={avgper}/>

    </>
    
  )
}

export default App