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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

const BaseEntry = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntry = BaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntry = BaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntry = BaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const EntryRecord = z.discriminatedUnion("type", [
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
]);

export const PatientRecord = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type Entry = z.infer<typeof EntryRecord> & { id: string };
export type Patient = z.infer<typeof PatientRecord> & {
  id: string;
  entries: Entry[];
};
export type PatientWithoutSSN = Omit<Patient, "ssn" | "entries">;
