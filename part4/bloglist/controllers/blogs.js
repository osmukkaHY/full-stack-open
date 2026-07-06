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
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
    const {likes} = req.body;
    const blog = await Blog.findById(req.params.id);

    blog.likes = likes;
    await blog.save();
    res.json(blog);
});

module.exports = blogsRouter;
