"use client";

import { useState } from "react";
import { saveMarcas } from "../actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { MarcaItem, SiteContent } from "@/lib/content";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

const emptyItem: MarcaItem = { name: "", image: "" };

export default function MarcasForm({ initial }: { initial: SiteContent["marcas"] }) {
    const [items, setItems] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    function updateItem(i: number, patch: Partial<MarcaItem>) {
        const next = [...items];
        next[i] = { ...next[i], ...patch };
        setItems(next);
    }

    function removeItem(i: number) {
        setItems(items.filter((_, idx) => idx !== i));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            const result = await saveMarcas(items);
            setStatus(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatus({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
            <p className="text-gray-500 text-sm">
                Estos son los logos que aparecen en el carrusel &quot;Empresas que confían en nosotros&quot;.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4 relative">
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="absolute top-4 right-4 text-red-500 text-xs font-medium hover:underline"
                        >
                            Eliminar
                        </button>
                        <div>
                            <label className={labelClass}>Nombre de la empresa</label>
                            <input value={item.name} onChange={(e) => updateItem(i, { name: e.target.value })} className={inputClass} />
                        </div>
                        <ImageUploadField label="Logo" value={item.image} onChange={(url) => updateItem(i, { image: url })} variant="logo" />
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => setItems([...items, { ...emptyItem }])}
                className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-semibold hover:border-[#8B5A2B]/40 hover:text-[#8B5A2B] transition-all"
            >
                + Agregar empresa
            </button>

            <div className="flex items-center gap-4 sticky bottom-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-lg">
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
