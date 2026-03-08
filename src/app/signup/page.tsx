"use client"

//* Components imports
import { SignupForm } from "@/features/auth/components/signup-form"

export default function Signup() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] selection:bg-primary/30 p-6" id="signup-page-root">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500/10 rounded-full blur-[128px] animate-pulse" id="signup-blob-1" />
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-600/10 rounded-full blur-[128px] animate-pulse" id="signup-blob-2" />

            <div className="relative w-full max-w-2xl" id="signup-form-wrapper">
                <SignupForm />
            </div>
        </div>
    )
}
