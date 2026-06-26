import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} /> <br />
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      filter: <input onChange={handleFilterChange} />

      <PersonList persons={persons} filter={filter} />
    </div>
  )
}

export default App