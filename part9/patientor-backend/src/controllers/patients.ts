import { Request, Response, Router } from "express";
import data from "../data/patients";
import { PatientEntry, PatientWithoutSSN } from "../types";
import { omit } from "../utils";
import { extractPatientEntry } from "../middleware/patient";

const router = Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.status(200).json(data.map((patient) => omit(patient, ["ssn"])));
});

router.post(
  "/",
  extractPatientEntry,
  (req: Request<unknown, unknown, PatientEntry>, res: Response) => {
    const patientEntry = req.body;
    const newPatient = { id: crypto.randomUUID(), ...patientEntry };
    data.push(newPatient);

    res.status(201).json(newPatient);
  }
);

export default router;
