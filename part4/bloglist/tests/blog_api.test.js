const assert = require("node:assert");
const {test, after, beforeEach} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const {initialBlogs, storedBlogs, addBlog} = require("./test_helper.js");
const app = require("../app.js");
const Blog = require("../models/blog.js");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    for(const blog of initialBlogs) {
        const blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test("get request returns correct amount of blogs", async () => {
    const blogs = await storedBlogs();
    assert.strictEqual(blogs.length, initialBlogs.length);
});

test("id is set correctly", async () => {
    const blogs = await storedBlogs();
    assert.strictEqual(blogs[0].id, initialBlogs[0]._id);
    assert.strictEqual(blogs[0]._id, undefined);
})

test("post request creates a new blog", async () => {
    await addBlog({title: "Additional", author: "me", url: "rickroll", likes: 0});
    const blogs = await storedBlogs();
    assert.strictEqual(blogs.length, initialBlogs.length + 1);
})

test("likes are set to 0 if not explicitly passed", async () => {
    await addBlog({title: "Additional", author: "me", url: "rickroll"});
    const blogs = await storedBlogs();
    assert.strictEqual(blogs[6].likes, 0);

})

test("post is rejected if title or url is not set", async () => {
    await api
        .post("/api/blogs")
        .send({author: "me"})
        .expect(400);
})

after(async () => {
    mongoose.connection.close();
});