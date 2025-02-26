import { z } from "zod";

export const patientDataSchema = z.object({
  patient_id: z.string(),
  device_id: z.string(),
  patient_name: z.string(),
  patient_age: z.string(),
  LB: z.string(),
  AC: z.string(),
  FM: z.string(),
  UC: z.string(),
  DL: z.string(),
  DS: z.string(),
  DP: z.string(),
  ASTV: z.string(),
  MSTV: z.string(),
  ALTV: z.string(),
  MLTV: z.string(),
  Width: z.string(),
  Min: z.string(),
  Max: z.string(),
  Nmax: z.string(),
  Nzeros: z.string(),
  Mode: z.string(),
  Mean: z.string(),
  Median: z.string(),
  Variance: z.string(),
  Tendency: z.string(),
  CLASS: z.string(),
  NSP: z.string(),
  timestamp: z.number()
});

export type PatientData = z.infer<typeof patientDataSchema>;
