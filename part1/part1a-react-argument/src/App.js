const Part = (props) => {
  console.log(props)
  return (
    <p>{props.name} {props.exercises} </p>

    )
  
}

const Header = (props) => {

  return (
    
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
    <h1>Hello World</h1>
    <Part exercises = {props.parts[0].exercises} name={props.parts[0].name} />
    <Part exercises = {props.parts[1].exercises} name={props.parts[1].name} />
    <Part exercises = {props.parts[2].exercises} name={props.parts[2].name} />
    </>  
  )
}

const Total = (props) => {
  const sum =  props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
  <p> Number of exercises {sum} </p>
  )

}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App