import { z } from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().pipe(z.coerce.date()),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type PatientEntry = z.infer<typeof newPatientEntrySchema>;
export type Patient = PatientEntry & {
  id: string;
};

export type PatientWithoutSSN = Omit<Patient, "ssn">;
