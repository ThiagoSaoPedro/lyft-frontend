"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Feedback {
  id: string;
  user_id: string;
  type: "bug" | "feature" | "general";
  title: string;
  description: string;
  email_sent: boolean;
  created_at: string;
}

export function useFeedbacks() {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      return await api.get<Feedback[]>("/feedback");
    },
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      type: "bug" | "feature" | "general";
      title: string;
      description: string;
    }) => {
      return await api.post<Feedback>("/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}
