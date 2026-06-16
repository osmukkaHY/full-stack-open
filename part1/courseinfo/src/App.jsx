const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part_name} {props.part_exercise_count}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part_name={props.part_names[0]} part_exercise_count={props.part_exercise_counts[0]} />
      <Part part_name={props.part_names[1]} part_exercise_count={props.part_exercise_counts[1]} />
      <Part part_name={props.part_names[2]} part_exercise_count={props.part_exercise_counts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total_exercise_count}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />      
      <Content part_names={[part1, part2, part3]} part_exercise_counts={[exercises1, exercises2, exercises3]} />
      <Total total_exercise_count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
