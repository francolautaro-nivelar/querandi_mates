"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";

const menuItems = [
    { name: "Inicio", href: "/admin", icon: "🏠" },
    { name: "Hero", href: "/admin/hero", icon: "🖼️" },
    { name: "Nosotros", href: "/admin/nosotros", icon: "📖" },
    { name: "Productos", href: "/admin/productos", icon: "🧉" },
    { name: "Por qué elegirnos", href: "/admin/porque-elegirnos", icon: "⭐" },
    { name: "Marcas", href: "/admin/marcas", icon: "🏢" },
    { name: "Contacto", href: "/admin/contacto", icon: "✉️" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1A1A1A] text-white flex items-center justify-between px-4 z-30">
                <img src="/logo_querandi.png" alt="Querandi Admin" className="h-9 rounded-full" />
                <button onClick={() => setOpen(true)} aria-label="Abrir menú" className="p-2 -mr-2 text-white">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Backdrop (mobile only, while drawer is open) */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar drawer */}
            <div
                className={`w-64 bg-[#1A1A1A] text-white min-h-screen flex flex-col p-6 fixed left-0 top-0 z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div className="mb-10 px-2">
                    <div className="flex items-center justify-between">
                        <img src="/logo_querandi.png" alt="Querandi Admin" className="h-16 rounded-full" />
                        <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="md:hidden text-gray-400 hover:text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Panel de Contenido</p>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? "bg-[#8B5A2B] text-white shadow-lg shadow-[#8B5A2B]/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors text-sm">
                        <span>🌐</span>
                        Ver la web
                    </Link>
                    <form action={logout}>
                        <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-sm mt-2">
                            <span>🚪</span>
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
