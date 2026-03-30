"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await api.post<AuthResponse>("/login", credentials);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      role: string;
      personal_id?: string;
    }) => {
      return await api.post<AuthResponse>("/register", data);
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      return await api.post<void>("/logout", {});
    },
  });
}
