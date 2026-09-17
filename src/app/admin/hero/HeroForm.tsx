"use client";

import { useState } from "react";
import { saveHero } from "../actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { SiteContent } from "@/lib/content";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

export default function HeroForm({ initial }: { initial: SiteContent["hero"] }) {
    const [data, setData] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
        setData((d) => ({ ...d, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            const result = await saveHero(data);
            setStatus(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatus({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
                <label className={labelClass}>Etiqueta superior</label>
                <input value={data.badge} onChange={(e) => set("badge", e.target.value)} className={inputClass} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Título principal</label>
                    <input value={data.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Palabra destacada (dorado, va al final)</label>
                    <input value={data.titleHighlight} onChange={(e) => set("titleHighlight", e.target.value)} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Subtítulo</label>
                <textarea value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} rows={3} className={`${inputClass} resize-none`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Texto botón principal</label>
                    <input value={data.ctaPrimary} onChange={(e) => set("ctaPrimary", e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Texto botón secundario</label>
                    <input value={data.ctaSecondary} onChange={(e) => set("ctaSecondary", e.target.value)} className={inputClass} />
                </div>
            </div>

            <ImageUploadField label="Imagen de fondo" value={data.backgroundImage} onChange={(url) => set("backgroundImage", url)} />

            <div className="flex items-center gap-4 pt-2">
                <button type="submit" disabled={saving} className="bg-[#8B5A2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6B4423] transition-all disabled:opacity-50">
                    {saving ? "Guardando..." : "Guardar cambios"}
                </button>
                {status && (
                    <span className={status.type === "ok" ? "text-green-600 text-sm font-medium" : "text-red-500 text-sm font-medium"}>
                        {status.message}
                    </span>
                )}
            </div>
        </form>
    );
}
