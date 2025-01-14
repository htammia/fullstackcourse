const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course.name}/>
      {course.parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
      <Total course={course}/>
    </div>
  )
}

const Total = ({course}) => {
  return (
    <p><b>
      Total exercises: {course.parts.reduce((sum,a) => sum + a.exercises, 0)}
    </b></p>
  )
}

export default Course