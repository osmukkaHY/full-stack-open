require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person")
const app = express();

morgan.token("postcontent", function(req, res) {return req.method === "POST" ? JSON.stringify(req.body) : "-"});
app.use(express.static("dist"));
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postcontent"));
app.use(express.json());


const password = process.argv[2];
console.log(password);
const url = `mongodb+srv://osmukka:${password}@cluster0.j6trwin.mongodb.net/?appName=Cluster0`;


app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => res.json(person));
});

app.post("/api/persons", (req, res) => {
    console.log(req.body);
    const body = req.body;
    if(!body.name) {
        return res.status(400).json({error: "Missing name"});
    }

    const newName = body.name;
    const newNumber = body.number;

    const newPerson = new Person({
        name: newName,
        number: newNumber
    });

    newPerson
        .save()
        .then(result => {
            console.log(`Saved person ${result.name}:${result.number}`);
            res.json(newPerson);
        });
});

app.delete("/api/persons/:id", (req, res) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => console.log(`Failed deleting item: ${error}`));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
});
