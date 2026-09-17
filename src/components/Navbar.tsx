"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top:0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="relative">
                    <img
                        src="/logo_querandi.png"
                        alt="Querandí Mates"
                        className={`transition-all duration-300 ${scrolled ? "h-[75px]" : "h-[90px]"} w-auto`}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="#nosotros" className={`text-sm font-medium hover:text-[#8B5A2B] transition-colors ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>Nosotros</Link>
                    <Link href="#productos" className={`text-sm font-medium hover:text-[#8B5A2B] transition-colors ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>Productos</Link>
                    <Link href="#porque-elegirnos" className={`text-sm font-medium hover:text-[#8B5A2B] transition-colors ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>¿Por qué nosotros?</Link>
                    <Link href="#contacto" className="bg-[#8B5A2B] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#6B4423] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#8B5A2B]/20">
                        Contacto
                    </Link>
                </div>

                {/* Hamburger */}
                <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={`w-7 h-0.5 transition-all ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`w-7 h-0.5 transition-all ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`w-7 h-0.5 transition-all ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <Link href="#nosotros" onClick={() => setMenuOpen(false)} className="text-2xl font-heading text-white">Nosotros</Link>
                <Link href="#productos" onClick={() => setMenuOpen(false)} className="text-2xl font-heading text-white">Productos</Link>
                <Link href="#porque-elegirnos" onClick={() => setMenuOpen(false)} className="text-2xl font-heading text-white">¿Por qué nosotros?</Link>
                <Link href="#contacto" onClick={() => setMenuOpen(false)} className="bg-[#8B5A2B] text-white px-8 py-3 rounded-md text-lg font-semibold">Contacto</Link>
                <button className="absolute top-10 right-10 text-white" onClick={() => setMenuOpen(false)}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </nav>
    );
}
