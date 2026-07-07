const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
    console.log(await User.find({})[0]);
    const user = (await User.find({}))[0];
    console.log(user)
    if(!user) {
        return res.status(404).json({error: "No users found."});
    }

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    console.log(savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
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
