const assert = require("node:assert");
const {describe, test, after, beforeEach} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const {initialUsers, usersInDB, addUser} = require("./user_api_test_helper.js");
const app = require("../app.js");
const User = require("../models/user.js");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    for(const user of initialUsers) {
        const userObject = User(user)
        await userObject.save();
    }
});

describe("Adding new users", async () => {
    test("addind existing username fails", async () => {
        await api
            .post("/api/users")
            .send({
                name: "Hello",
                username: initialUsers[0].username,
                password: "1234"
            })
            .expect(400);
        assert.strictEqual((await usersInDB()).length, initialUsers.length);
    });

    test("using too short username fails", async () => {
        await api
            .post("/api/users")
            .send({
                name: "Hello",
                username: "he",
                password: "1234"
            })
            .expect(400);
        assert.strictEqual((await usersInDB()).length, initialUsers.length);
    });
    test("using too short password fails", async () => {
        await api
            .post("/api/users")
            .send({
                name: "Hello",
                username: "hello",
                password: "12"
            })
            .expect(400);
        assert.strictEqual((await usersInDB()).length, initialUsers.length);
    });
    test("addind a valid user succeeds", async () => {
        await api
            .post("/api/users")
            .send({
                name: "Hello",
                username: "World",
                password: "1234"
            })
            .expect(201);
        assert.strictEqual((await usersInDB()).length, initialUsers.length + 1);
    });
});

after(() => {
    mongoose.connection.close();
});
