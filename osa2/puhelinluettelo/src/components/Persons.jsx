import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
    return (
      <div>
        Persons: {persons.map(person => 
          <Person 
            key={person.name} 
            person={person} 
            deletePerson={() => deletePerson(person.id, person.name)}
          />)}
      </div>
    )
  }

  export default Persons