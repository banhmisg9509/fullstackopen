import { Router } from "express";
import pingController from "./ping";
import diagnosesController from "./diagnoses";
import patientsController from "./patients";

const router = Router();

router.use("/ping", pingController);
router.use("/diagnoses", diagnosesController);
router.use("/patients", patientsController);

export default router;
