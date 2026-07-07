const logger = require("./logger.js");

function requestLogger(req, res, next) {
    logger.info(`Method: ${req.method} | Path: ${req.path} | Body: ${req.body}`);
    next();
}

function unknownEndpoint(req, res) {
    res.status(404).send({error: "Unknown endpoint"});
}

function errorHandler(err, req, res, next) {
    logger.error(err);

    switch(err.name) {
        case "CastError":
            return res.status(400).send({error: "Malformatted id"});
        case "ValidationError":
            return res.status(400).send({error: err.message});
        case "MongoServerError":
            if(err.message.includes("E11000 duplicate key error")) {
                return res.status(400).json({error: "Username has to be unique"});
            }
    };
    next(err);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
