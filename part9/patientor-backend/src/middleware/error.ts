import { ErrorRequestHandler } from "express";
import { z } from "zod";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
