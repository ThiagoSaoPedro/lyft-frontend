"use client"

//* Components imports
import { LoginForm } from "@/features/auth/components/login-form"

export default function Login() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] selection:bg-primary/30" id="login-page-root">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500/10 rounded-full blur-[128px] animate-pulse" id="login-blob-1" />
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-600/10 rounded-full blur-[128px] animate-pulse" id="login-blob-2" />

            <div className="relative w-full max-w-md px-6" id="login-content-wrapper">
                <LoginForm />

                <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-widest text-gray-600" id="login-copyright">
                    &copy; 2026 Lyft. Powered by Mediapipe ML.
                </p>
            </div>
        </div>
    )
}
