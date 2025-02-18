import { Response, Router } from "express";
import { Diagnosis } from "../types";
import data from "../data/diagnoses";

const router = Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.status(200).json(data);
});

export default router;
