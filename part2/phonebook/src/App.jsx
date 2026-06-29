import axios from 'axios'
import { useState, useEffect } from 'react'

const Person = ({ person }) => <li>{person.name} <b>{person.number}</b></li>

const PersonList = ({ persons, filter }) =>{
  if(persons.length === 0)
    return <></>
  const filteredPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
      {filteredPersons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const ContactForm = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName} /> <br />
          number: <input onChange={props.handleNumberChange} value={props.newNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in phonebook`)
      return
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm addPerson={addPerson}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange}
                    newName={newName}
                    newNumber={newNumber} />

      <h2>Numbers</h2>
      filter: <input onChange={handleFilterChange} />
      <PersonList persons={persons} filter={filter} />
    </div>
  )
}

export default App