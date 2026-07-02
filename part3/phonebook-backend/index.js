require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
}

morgan.token('postcontent', function(req, res) {return req.method === 'POST' ? JSON.stringify(req.body) : '-'})
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postcontent'))
app.use(express.json())


const password = process.argv[2]
console.log(password)


app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) res.json(person)
      else res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newName = body.name
  const newNumber = body.number

  const newPerson = new Person({
    name: newName,
    number: newNumber
  })

  newPerson
    .save()
    .then(result => {
      console.log(`Saved person ${result.name}:${result.number}`)
      res.json(newPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.put('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(!person) return res.status(404).end()
      person.number = req.body.number

      return person.save().then(updatedPerson => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
