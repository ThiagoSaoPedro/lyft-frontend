"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  level: string;
  rank: string;
  xp: number;
  strikeCount: number;
  safeDaysLeft: number;
  totalWorkouts: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      const response = await api.get<Profile>("/me");
      return response;
    },
  });
}

export function useBadges() {
  return useQuery({
    queryKey: ["profile", "badges"],
    queryFn: async () => {
      const response = await api.get<Badge[]>("/profile/badges");
      return response;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Profile>) => {
      return await api.put<Profile>("/profile", data);
    },
    onSuccess: (newProfile) => {
      queryClient.setQueryData(["profile", "me"], newProfile);
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Bypass-Tunnel-Reminder": "true",
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload avatar");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

export function useSafeDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await api.post<Profile>("/profile/use-safe-day", {});
    },
    onSuccess: (newProfile) => {
      queryClient.setQueryData(["profile", "me"], newProfile);
    },
  });
}
