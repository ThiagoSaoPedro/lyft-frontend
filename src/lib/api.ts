"use client"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        })

        if (res.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                window.location.href = "/login"
            }
            throw new Error("Sesso expirada. Por favor, entre novamente.")
        }

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: "Erro desconhecido" }))
            throw new Error(error.message || "Falha na requisio")
        }

        if (res.status === 204) return {} as T

        return res.json()
    } catch (error: any) {
        console.error(`API Error [${options.method || "GET"} ${endpoint}]:`, error)
        throw error
    }
}

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, data?: any, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(data) }),

    put: <T>(endpoint: string, data?: any, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(data) }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: "DELETE" }),
}
