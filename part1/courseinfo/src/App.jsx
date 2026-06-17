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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />      
      <Content part_names={[part1.name, part2.name, part3.name]} part_exercise_counts={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total total_exercise_count={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
