const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Footer = ({ parts }) => {
  const exerciseCounts = parts.map(part => part.exercises)
  return <p><b>total of {exerciseCounts.reduce(
    (a, c) => a + c
  )} exercises</b></p>
}

const Course = ({ course }) => {
  return (
    <div>
    <Header name={course.name} />
    {course.parts.map(part => <Part key={part.id} part={part} />)}
    <Footer parts={course.parts} />
    </div>
  )
}

export default Course
