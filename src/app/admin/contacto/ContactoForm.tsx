"use client";

import { useState } from "react";
import { saveContacto, saveCta, saveFooter } from "../actions";
import type { SiteContent } from "@/lib/content";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

function SaveStatus({ status }: { status: { type: "ok" | "error"; message: string } | null }) {
    if (!status) return null;
    return (
        <span className={status.type === "ok" ? "text-green-600 text-sm font-medium" : "text-red-500 text-sm font-medium"}>
            {status.message}
        </span>
    );
}

export default function ContactoForm({
    initialContacto,
    initialCta,
    initialFooter,
}: {
    initialContacto: SiteContent["contacto"];
    initialCta: SiteContent["cta"];
    initialFooter: SiteContent["footer"];
}) {
    const [contacto, setContacto] = useState(initialContacto);
    const [cta, setCta] = useState(initialCta);
    const [footer, setFooter] = useState(initialFooter);

    const [savingContacto, setSavingContacto] = useState(false);
    const [statusContacto, setStatusContacto] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    const [savingCta, setSavingCta] = useState(false);
    const [statusCta, setStatusCta] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    const [savingFooter, setSavingFooter] = useState(false);
    const [statusFooter, setStatusFooter] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    function setContactoField<K extends keyof typeof contacto>(key: K, value: (typeof contacto)[K]) {
        setContacto((d) => ({ ...d, [key]: value }));
    }

    function setCtaField<K extends keyof typeof cta>(key: K, value: (typeof cta)[K]) {
        setCta((d) => ({ ...d, [key]: value }));
    }

    async function handleSubmitContacto(e: React.FormEvent) {
        e.preventDefault();
        setSavingContacto(true);
        setStatusContacto(null);
        try {
            const result = await saveContacto(contacto);
            setStatusContacto(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatusContacto({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSavingContacto(false);
        }
    }

    async function handleSubmitCta(e: React.FormEvent) {
        e.preventDefault();
        setSavingCta(true);
        setStatusCta(null);
        try {
            const result = await saveCta(cta);
            setStatusCta(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatusCta({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSavingCta(false);
        }
    }

    async function handleSubmitFooter(e: React.FormEvent) {
        e.preventDefault();
        setSavingFooter(true);
        setStatusFooter(null);
        try {
            const result = await saveFooter(footer);
            setStatusFooter(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatusFooter({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSavingFooter(false);
        }
    }

    return (
        <div className="max-w-2xl space-y-10">
            <form onSubmit={handleSubmitContacto} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Sección de contacto</h2>

                <div>
                    <label className={labelClass}>Etiqueta superior</label>
                    <input value={contacto.badge} onChange={(e) => setContactoField("badge", e.target.value)} className={inputClass} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Título</label>
                        <input value={contacto.title} onChange={(e) => setContactoField("title", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Palabra destacada (dorado, va al final)</label>
                        <input value={contacto.titleHighlight} onChange={(e) => setContactoField("titleHighlight", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Subtítulo</label>
                    <textarea value={contacto.subtitle} onChange={(e) => setContactoField("subtitle", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>WhatsApp (con código de país)</label>
                    <input value={contacto.whatsapp} onChange={(e) => setContactoField("whatsapp", e.target.value)} placeholder="+54 9 11 5750-1643" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" value={contacto.email} onChange={(e) => setContactoField("email", e.target.value)} className={inputClass} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Usuario de Instagram (texto)</label>
                        <input value={contacto.instagramHandle} onChange={(e) => setContactoField("instagramHandle", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Link de Instagram</label>
                        <input value={contacto.instagramUrl} onChange={(e) => setContactoField("instagramUrl", e.target.value)} className={inputClass} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={savingContacto} className="bg-[#8B5A2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6B4423] transition-all disabled:opacity-50">
                        {savingContacto ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <SaveStatus status={statusContacto} />
                </div>
            </form>

            <form onSubmit={handleSubmitCta} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Banner de invitación (antes del formulario)</h2>

                <div>
                    <label className={labelClass}>Título</label>
                    <input value={cta.title} onChange={(e) => setCtaField("title", e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Subtítulo</label>
                    <input value={cta.subtitle} onChange={(e) => setCtaField("subtitle", e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Texto del botón</label>
                    <input value={cta.buttonLabel} onChange={(e) => setCtaField("buttonLabel", e.target.value)} className={inputClass} />
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={savingCta} className="bg-[#8B5A2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6B4423] transition-all disabled:opacity-50">
                        {savingCta ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <SaveStatus status={statusCta} />
                </div>
            </form>

            <form onSubmit={handleSubmitFooter} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Pie de página</h2>

                <div>
                    <label className={labelClass}>Texto de copyright</label>
                    <input value={footer.copyright} onChange={(e) => setFooter({ copyright: e.target.value })} className={inputClass} />
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={savingFooter} className="bg-[#8B5A2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6B4423] transition-all disabled:opacity-50">
                        {savingFooter ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <SaveStatus status={statusFooter} />
                </div>
            </form>
        </div>
    );
}
