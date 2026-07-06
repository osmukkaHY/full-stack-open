const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
    const blog = new Blog(req.body);

    await blog.save();
    res.status(201).json(blog);
});

blogsRouter.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
})

module.exports = blogsRouter;
