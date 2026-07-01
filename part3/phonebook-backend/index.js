const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

morgan.token("postcontent", function(req, res) {return req.method === "POST" ? JSON.stringify(req.body) : "-"});
app.use(express.static("dist"));
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postcontent"));
app.use(express.json());


const password = process.argv[2];
console.log(password);
const url = `mongodb+srv://osmukka:${password}@cluster0.j6trwin.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, {family: 4});


const personSchema = {
    id: String,
    name: String,
    number: String
};

const Person = mongoose.model("Person", personSchema);

function generateId() {
    const MAX = 1_000_000_000;
    return String(Math.floor(Math.random() * MAX));
}

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(person => person.id === req.params.id);
    if(person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
});

app.post("/api/persons", (req, res) => {
    const newName = req.body.name;
    const newNumber = req.body.number;

    if(!newName || !newNumber) {
        res.status(400).send("Missing name or number");
        return;
    }
    else if(persons.find(person => person.name === newName)) {
        res.status(409).send("Name exists");
        return;
    }

    const newPerson = {
        id: generateId(),
        name: newName,
        number: newNumber
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
});
