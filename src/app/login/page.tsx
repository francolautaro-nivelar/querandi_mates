"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(login, undefined);

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#8B5A2B]"></div>

                <div className="text-center mb-10">
                    <img src="/logo_querandi.png" alt="Querandi" className="h-24 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-gray-800">Panel de Gestión</h1>
                    <p className="text-gray-500 text-sm mt-2">Ingresá la contraseña para administrar el contenido de Querandí Mates</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            required
                            autoFocus
                            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/20 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-sm text-red-500 font-medium">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full bg-[#8B5A2B] text-white py-4 rounded-lg font-bold shadow-lg shadow-[#8B5A2B]/20 hover:bg-[#6B4423] transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                    >
                        {pending ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-10">
                    Desarrollado exclusivamente para Querandí Mates &copy; 2026
                </p>
            </div>
        </div>
    );
}
