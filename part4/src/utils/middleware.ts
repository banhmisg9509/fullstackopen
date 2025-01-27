import { ErrorRequestHandler, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "./logger";
import User from "../models/user";

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
  } else if (error.code === 11000) {
    response
      .status(400)
      .json({ error: `Duplicate ${Object.keys(error.keyValue)} entered` });
  } else if (error.name === "JsonWebTokenError") {
    response
      .status(401)
      .json({ error: "JSON Web Token is invalid. Try Again!!!" });
  } else if (error.name === "TokenExpiredError") {
    response
      .status(401)
      .json({ error: "JSON Web Token is expired. Try Again!!!" });
  }

  next(error);
};

const isAuthenticated: RequestHandler = async (request, response, next) => {
  const { token } = request.cookies;

  if (!token) {
    response.status(401).send({ error: "Login first to access this resource" });
    return;
  }

  const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
  (request as any).user = await User.findById((decoded as JwtPayload).id);

  next();
};

export { requestLogger, unknownEndpoint, errorHandler, isAuthenticated };
