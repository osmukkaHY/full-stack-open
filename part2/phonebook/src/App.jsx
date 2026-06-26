import { useState } from 'react'

const Name = ({ name }) => <> {name} <br /> </>

const NameList = ({ persons }) => {
  return (
    <>
      {persons.map(person => <Name key={person.name} name={person.name} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName
    }
    setPersons(persons.concat(nameObject))
    console.log(persons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
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