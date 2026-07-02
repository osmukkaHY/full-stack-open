const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('Password required')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://osmukka:${password}@cluster0.j6trwin.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)


const personSchema = {
  id: String,
  name: String,
  number: String
}

const Person = mongoose.model('Person', personSchema)

function addPerson(name, number) {
  const person = new Person({
    name: name,
    number: number
  })
  mongoose.connect(url, { family: 4 })
  person
    .save()
    .then(result => console.log(` Added ${name} number ${number} to phonebook`))
    .catch(error => console.log('Failed saving to server.'))
    .finally(() => mongoose.connection.close())
}

function getPersons() {
  mongoose.connect(url, { family: 4 })
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
    .catch(error => console.log('Failed fetching from server.'))
    .finally(() => mongoose.connection.close())
}

if(process.argv.length === 3) {
  getPersons()
}
else if(process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  addPerson(name, number)
}
else {
  console.log('Invalid number of arguments:', process.argv.length)
  process.exit(1)
}


