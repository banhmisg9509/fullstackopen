import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Entry,
  EntryFormValues,
  Patient,
  PatientFormValues,
} from "../../types";

const client = axios.create({
  baseURL: "http://localhost:3001/api/patients",
});

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: async (): Promise<Patient[]> => {
      const response = await client.get("/");
      return response.data;
    },
  });
};

export const usePatient = (id: string | undefined) => {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: async ({ queryKey }): Promise<Patient> => {
      const id = queryKey[1];
      const response = await client.get(`/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreatePatientEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPatientEntry"],
    mutationFn: async (newEntry: PatientFormValues): Promise<Patient> => {
      const response = await client.post("/", newEntry);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const useAddEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addEntry"],
    mutationFn: async (
      payload: EntryFormValues & { patientId: string }
    ): Promise<Entry> => {
      const { patientId, ...entry } = payload;
      const response = await client.post(`/${patientId}/entries`, entry);
      return response.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["patients", payload.patientId],
      });
    },
  });
};
