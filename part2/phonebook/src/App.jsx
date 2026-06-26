import { useState } from 'react'

const Person = ({ person }) => <> {person.name} <b>{person.number}</b> <br /> </>

const NameList = ({ persons }) => {
  if(persons.length === 0)
    return <></>
  return (
    <>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in phonebook`)
    }

    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
    console.log(persons)
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
      <NameList persons={persons} />
    </div>
  )
}

export default App