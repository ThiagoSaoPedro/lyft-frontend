"use client"

//* Libraries imports
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    CheckCircle2,
    AlertCircle,
    XCircle,
    Info,
    X
} from "lucide-react"

type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationOptions {
    title: string
    message: string
    type?: NotificationType
    confirmLabel?: string
    cancelLabel?: string
    onConfirm?: () => void
    onCancel?: () => void
    duration?: number
}

interface ToastItem extends NotificationOptions {
    id: string
}

interface NotificationContextType {
    notify: (options: NotificationOptions) => void
    confirm: (options: NotificationOptions) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    //* HOOKS * //
    const [dialogConfig, setDialogConfig] = useState<NotificationOptions | null>(null)
    const [toasts, setToasts] = useState<ToastItem[]>([])

    //* ACTIONS * //
    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const notify = useCallback((options: NotificationOptions) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newToast = { ...options, id, type: options.type || "info" }
        setToasts(prev => [...prev, newToast])

        const duration = options.duration || 4000
        setTimeout(() => {
            removeToast(id)
        }, duration)
    }, [])

    const confirm = useCallback((options: NotificationOptions) => {
        setDialogConfig({ ...options, type: options.type || "warning" })
    }, [])

    const closeDialog = () => {
        setDialogConfig(null)
    }

    const handleConfirm = () => {
        if (dialogConfig?.onConfirm) dialogConfig.onConfirm()
        closeDialog()
    }

    //* RENDERING HELPERS * //
    const getIcon = (type?: NotificationType, size: number = 24) => {
        switch (type) {
            case "success": return <CheckCircle2 size={size} className="text-green-500" />
            case "error": return <XCircle size={size} className="text-red-500" />
            case "warning": return <AlertCircle size={size} className="text-orange-500" />
            default: return <Info size={size} className="text-blue-500" />
        }
    }

    return (
        <NotificationContext.Provider value={{ notify, confirm }}>
            {children}

            {/* TOASTS CONTAINER */}
            <div className="fixed bottom-6 right-6 z-[110] flex flex-col-reverse gap-3 pointer-events-none w-full max-w-xs" id="toasts-container">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            id={`toast-${toast.id}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="pointer-events-auto w-full glass-card p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl flex items-center gap-4 shadow-2xl"
                        >
                            <div className="shrink-0" id={`toast-icon-${toast.id}`}>
                                {getIcon(toast.type, 20)}
                            </div>
                            <div className="flex-1 min-w-0" id={`toast-content-${toast.id}`}>
                                <h4 className="text-[11px] font-black uppercase tracking-wider text-white leading-none mb-1">{toast.title}</h4>
                                <p className="text-[10px] text-gray-500 font-medium truncate">{toast.message}</p>
                            </div>
                            <button id={`toast-close-${toast.id}`} onClick={() => removeToast(toast.id)} className="text-gray-600 hover:text-white transition-colors">
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* DIALOG CONTAINER */}
            <AnimatePresence>
                {dialogConfig && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-white" id="dialog-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDialog}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            id="dialog-backdrop"
                        />
                        <motion.div
                            id="dialog-content"
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", damping: 25, stiffness: 400 }
                            }}
                            exit={{
                                scale: 0.95,
                                opacity: 0,
                                y: 10,
                                transition: { duration: 0.2, ease: "easeIn" }
                            }}
                            className="relative w-full max-w-[320px] glass-card p-8 rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6" id="dialog-close-wrapper">
                                <button id="dialog-close-button" onClick={closeDialog} className="text-gray-600 hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-6" id="dialog-icon-wrapper">
                                    {getIcon(dialogConfig.type, 48)}
                                </div>
                                <h3 className="text-lg font-bold tracking-tight mb-2 uppercase italic" id="dialog-title">{dialogConfig.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-10 text-center px-4 font-medium" id="dialog-message">{dialogConfig.message}</p>

                                <div className="flex gap-3 w-full" id="dialog-actions-wrapper">
                                    <button
                                        id="dialog-cancel-button"
                                        onClick={closeDialog}
                                        className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/5 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                                    >
                                        {dialogConfig.cancelLabel || "Cancelar"}
                                    </button>
                                    <button
                                        id="dialog-confirm-button"
                                        onClick={handleConfirm}
                                        className={`flex-1 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all ${dialogConfig.type === 'error' ? 'bg-red-500 text-white shadow-[0_10px_20px_rgba(239,44,44,0.2)]' :
                                            dialogConfig.type === 'warning' ? 'bg-orange-500 text-white shadow-[0_10px_20px_rgba(249,115,22,0.2)]' :
                                                'bg-white text-black'
                                            }`}
                                    >
                                        {dialogConfig.confirmLabel || "Confirmar"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) throw new Error("useNotification must be used within NotificationProvider")
    return context
}
