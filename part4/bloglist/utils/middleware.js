const logger = require("./logger.js");

function requestLogger(req, res, next) {
    logger.info(`Method: ${req.method} | Path: ${req.path} | Body: ${req.body}`);
    next();
}

function unknownEndpoint(req, res) {
    response.status(404).send({error: "Unknown endpoint"});
}

function errorHandler(err, req, res, next) {
    logger.error(err);

    switch(err.name) {
        case "CastError":
            return response.status(400).send({error: "Malformatted id"});
        case "ValidationError":
            return response.status(400).send({error: err.message});
    };
    next(err);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
