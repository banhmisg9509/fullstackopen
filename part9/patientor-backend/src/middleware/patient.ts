import { RequestHandler } from "express";
import { EntryRecord, PatientRecord } from "../types";

export const extractPatient: RequestHandler = (req, _res, next) => {
  try {
    PatientRecord.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const extractEntry: RequestHandler = (req, _res, next) => {
  try {
    EntryRecord.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
