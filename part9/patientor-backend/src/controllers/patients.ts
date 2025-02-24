import { Request, Response, Router } from "express";
import data from "../data/patients";
import { Entry, Patient, PatientWithoutSSN } from "../types";
import { omit } from "../utils";
import { extractEntry, extractPatient } from "../middleware/patient";

const router = Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.status(200).json(data.map((patient) => omit(patient, ["ssn"])));
});

router.post("/", extractPatient, (req: Request, res: Response) => {
  const patientEntry = req.body as Patient;
  patientEntry.id = crypto.randomUUID();
  patientEntry.entries = [];

  data.push(patientEntry);

  res.status(201).json(patientEntry);
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = data.find((p) => p.id === id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }

  res.status(200).json(patient);
});

router.post("/:id/entries", extractEntry, (req, res) => {
  const { id } = req.params;

  const patient = data.find((patient) => patient.id === id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }

  const entry = req.body as Entry;
  entry.id = crypto.randomUUID();
  patient.entries.push(entry);

  res.status(201).json(entry);
});

export default router;
