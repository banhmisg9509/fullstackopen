import { RequestHandler } from "express";
import { newPatientEntrySchema } from "../types";

export const extractPatientEntry: RequestHandler = (req, _res, next) => {
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
