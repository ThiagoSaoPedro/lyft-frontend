"use client"

//* Libraries imports
import { Suspense } from "react"

//* Components imports
import { WorkoutForm } from "@/features/workouts/components/workout-form"

export default function NewWorkoutPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-20" id="loading-fallback">Carregando...</div>}>
            <div className="w-full" id="new-workout-page-root">
                <WorkoutForm />
            </div>
        </Suspense>
    )
}
