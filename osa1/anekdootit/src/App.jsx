import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Votes = (props) => {
  if (props.points === 0) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    )
  } 
  else if (props.points === 1) {
    return (
    <div>
      <p>
        {props.anecdote} <br></br>
        has {props.points} point.
      </p>
    </div>
    )
  }
  return (
    <div>
      <p>
        {props.anecdote} <br></br>
        has {props.points} points.
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(8))
  const [selected, setSelected] = useState(0)
  const [winner, setWinner] = useState(0)

  const changeAnecdote = () => {
    let anecdoteIndex = Math.floor(Math.random() * anecdotes.length)

    // making sure each click results is a new anecdote.
    while (anecdoteIndex === selected) {
      anecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    }
    const updatedSelected = anecdoteIndex
    setSelected(updatedSelected)
  }

  const updateVotes = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)

    const updatedWinner = updatedPoints.indexOf(Math.max(...updatedPoints))
    setWinner(updatedWinner)
    
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}
        <br></br>
        has {points[selected]} points
      </p>
      
      <Button handleClick={changeAnecdote} text="next anectode"/>
      <Button handleClick={updateVotes} text="vote"/>
      <h2>Anecdote with most votes</h2>
      <Votes points={points[winner]} anecdote={anecdotes[winner]} />
    </div>
  )

}

export default App