const User = require("../models/user.js");

const initialUsers = [
    {
        _id: "5a422ba71b54a676234d17fb",
        name: "root",
        username: "groot",
        passwordHash: "youllneverguess",
        __v: 0
    }
];

async function usersInDB() {
    const users = await User.find({});
    return users.map(user => user.toJSON);
}

async function addUser(userObject) {
    const user = new User(userObject);
    await user.save();
}

module.exports = {
    initialUsers,
    usersInDB,
    addUser
}
