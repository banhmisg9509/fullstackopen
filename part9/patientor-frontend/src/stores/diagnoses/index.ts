import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Diagnosis } from "../../types";

const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/diagnoses",
});

export const useDiagnoses = () => {
  return useQuery({
    queryKey: ["diagnoses"],
    queryFn: async (): Promise<Diagnosis[]> => {
      const response = await httpClient.get("/");
      return response.data;
    },
    refetchOnMount: false,
  });
};
