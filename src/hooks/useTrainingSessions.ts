"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AiAnalysisLog {
  id: string;
  exercise_id: string;
  accuracy_score: number;
  biomechanical_errors: string[];
  repetitions_completed: number;
}

export interface TrainingSession {
  id: string;
  student_id: string;
  workout_id: string;
  session_date: string;
  start_time?: string;
  end_time?: string;
  cardio_done: boolean;
  workout: Record<string, unknown>;
  logs: AiAnalysisLog[];
  created_at: string;
}

export function useTrainingSessions() {
  return useQuery({
    queryKey: ["training-sessions"],
    queryFn: async () => {
      return await api.get<TrainingSession[]>("/training-sessions");
    },
  });
}

export function useTrainingSession(id: string) {
  return useQuery({
    queryKey: ["training-sessions", id],
    queryFn: async () => {
      return await api.get<TrainingSession>(`/training-sessions/${id}`);
    },
  });
}

export function useCreateTrainingSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<TrainingSession>) => {
      return await api.post<TrainingSession>("/training-sessions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-sessions"] });
      // Also invalidate profile XP/strike
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}
