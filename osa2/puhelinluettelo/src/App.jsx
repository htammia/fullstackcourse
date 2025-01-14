import { useEffect, useState } from 'react'

import personService from './services/persons'
import Success from './components/Success'
import Error from './components/Error'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        initialPersons.forEach(person => {console.log(person)})
        setPersons(initialPersons)
      })
  }, [])

  // person
  const addPerson = (event) => {
    event.preventDefault()
    
    if ((persons.findIndex((n) => n.name === newName)) === -1) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          
          setSuccess(
            `${newName} was successfully added to the phonebook`
          )
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        })

      persons.forEach(person => {console.log(person)})
    }
    else {
      const personToChange = persons.find(n => n.name === newName)

      if (window.confirm(`${newName} id already in the phonebook. Do you want to update their number?`)) {
        updateNumber(personToChange.id, newNumber)
      }
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const deletePerson = (id, name) => {

    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setError(`${name} has already been deleted`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    } 
  }

  const updateNumber = (id, newNumber) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number : newNumber}

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setError(`Information of ${person.name} has already been removed from the server.`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const personsToShow = persons.filter(item => 
    item.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={success} />
      <Error message={error} />
      <Filter nameFilter={nameFilter} onChange={handleFilterChange}/>

      <h2>Add new</h2>
      <PersonForm onSubmit={addPerson} name={newName} onNameChange={handleNameChange}
        number={newNumber} onNumberChange={handleNumberChange} />
        
      <h2>Numbers</h2>
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App