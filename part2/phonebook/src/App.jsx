import Notification from './components/Notification.jsx'
import personService from './services/persons.js'
import { useState, useEffect } from 'react'

const Person = ({ person, deletePerson }) => <li>{person.name} <b>{person.number}</b> <button onClick={deletePerson}>delete</button></li>

const PersonList = ({ persons, filter, deletePerson }) =>{
  if(persons.length === 0)
    return <></>
  const filteredPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
      {filteredPersons.map(person => <Person key={person.name} person={person} deletePerson={() => deletePerson(person)} />)}
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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

  const displayNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updatePerson = () => {
    const changedPerson = { ...persons.find(person => person.name === newName), number: newNumber }
    personService
      .update(changedPerson.id, changedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        setNewName('')
        setNewNumber('')
        displayNotification(`Updated user ${updatedPerson.name}.`)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if(persons.map(person => person.name).includes(newName)) {
      if(confirm(`Do you want to update the number of ${newName}`)) {
        updatePerson()
      }
      return
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        displayNotification(`Created entry for ${newPerson.name}`)
      })

  }

  const deletePerson = (deletedPerson) => {
    if(confirm(`Do you really want to delete entry for ${deletedPerson.name}?`))
      personService
        .remove(deletedPerson.id)
        .then(() => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <ContactForm addPerson={addPerson}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange}
                    newName={newName}
                    newNumber={newNumber} />

      <h2>Numbers</h2>
      filter: <input onChange={handleFilterChange} />
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App