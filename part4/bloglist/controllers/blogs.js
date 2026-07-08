const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const getTokenFrom = req => {
    const authorization = req.get("authorization");
    if(authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
}

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if(!decodedToken.id) {
        return res.status(401).json({error: "token invalid"});
    }
    const user = (await User.findById(decodedToken.id));

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
