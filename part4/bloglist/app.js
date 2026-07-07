const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const middleWare = require("./utils/middleware.js");
const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");

const app = express();

mongoose
    .connect(config.MONGODB_URI, {family: 4})
    .then(() => logger.info("Connected to MongoDB."))
    .catch(err => logger.error("Couldn't connect to MongoDB:", err.message));

app.use(express.json());
app.use(middleWare.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);

module.exports = app;
