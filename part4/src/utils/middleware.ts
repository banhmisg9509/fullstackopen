import { ErrorRequestHandler, RequestHandler } from "express";
import logger from "./logger";

const requestLogger: RequestHandler = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint: RequestHandler = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
    return;
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
    return;
  }

  next(error);
};

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
