const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user.js");

usersRouter.post("/", async (req, res) => {
    const {name, username, password} = req.body;
    if(password.length < 3) {
        res.status(400).send({error: "Password must be at least 3 characters long"});
        return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = User({
        name,
        username,
        passwordHash
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = usersRouter;
