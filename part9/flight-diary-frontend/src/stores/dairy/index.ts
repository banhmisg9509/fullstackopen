import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "src/types";

const client = axios.create({
  baseURL: "/api/diaries",
});

export const useDairy = () => {
  return useQuery({
    queryKey: ["dairies"],
    queryFn: async (): Promise<NonSensitiveDiaryEntry[]> => {
      const response = await client.get("/");
      return response.data;
    },
    retry: false,
  });
};

export const useAddDairy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addDairy"],
    mutationFn: async (newDairyEntry: NewDiaryEntry): Promise<DiaryEntry> => {
      const response = await client.post("/", newDairyEntry);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dairies"] });
    },
  });
};
