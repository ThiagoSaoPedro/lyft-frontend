"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Exercise {
  id: string;
  name: string;
  sets_config: Array<{ type: string; count: number; reps: number }>;
  target_pose_data?: Record<string, unknown>;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  planned_day?: string;
  cardio_enabled: boolean;
  cardio_type?: string;
  cardio_duration_minutes?: number;
  cardio_calories?: number;
  student_id?: string;
  personal_id: string;
  exercises: Exercise[];
  created_at: string;
  updated_at: string;
}

export function useWorkouts() {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      return await api.get<Workout[]>("/workouts");
    },
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ["workouts", id],
    queryFn: async () => {
      return await api.get<Workout>(`/workouts/${id}`);
    },
  });
}

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Workout>) => {
      return await api.post<Workout>("/workouts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Workout> }) => {
      return await api.put<Workout>(`/workouts/${id}`, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.setQueryData(["workouts", data.id], data);
    },
  });
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/workouts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}
