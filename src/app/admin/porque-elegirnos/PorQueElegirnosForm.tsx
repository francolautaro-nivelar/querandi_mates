"use client";

import { useState } from "react";
import { savePorQueElegirnos } from "../actions";
import type { PorQueItem, SiteContent, StatItem } from "@/lib/content";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

const emptyItem: PorQueItem = { title: "", desc: "" };

export default function PorQueElegirnosForm({ initial }: { initial: SiteContent["porQueElegirnos"] }) {
    const [data, setData] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
        setData((d) => ({ ...d, [key]: value }));
    }

    function updateItem(i: number, patch: Partial<PorQueItem>) {
        const next = [...data.items];
        next[i] = { ...next[i], ...patch };
        set("items", next);
    }

    function updateStat(i: number, patch: Partial<StatItem>) {
        const next = [...data.stats];
        next[i] = { ...next[i], ...patch };
        set("stats", next);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            const result = await savePorQueElegirnos(data);
            setStatus(result.ok ? { type: "ok", message: "Cambios guardados." } : { type: "error", message: result.error });
        } catch {
            setStatus({ type: "error", message: "No se pudo guardar." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                    <label className={labelClass}>Etiqueta superior</label>
                    <input value={data.badge} onChange={(e) => set("badge", e.target.value)} className={inputClass} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Título</label>
                        <input value={data.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Palabra destacada (dorado, va al final)</label>
                        <input value={data.titleHighlight} onChange={(e) => set("titleHighlight", e.target.value)} className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Razones (lista numerada)</h2>
                    <button
                        type="button"
                        onClick={() => set("items", [...data.items, { ...emptyItem }])}
                        className="text-sm font-semibold text-[#8B5A2B] hover:underline"
                    >
                        + Agregar razón
                    </button>
                </div>
                {data.items.map((item, i) => (
                    <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 space-y-3 relative">
                        <button
                            type="button"
                            onClick={() => set("items", data.items.filter((_, idx) => idx !== i))}
                            className="absolute top-0 right-0 text-red-500 text-xs font-medium hover:underline"
                        >
                            Eliminar
                        </button>
                        <div>
                            <label className={labelClass}>Título</label>
                            <input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Descripción</label>
                            <textarea value={item.desc} onChange={(e) => updateItem(i, { desc: e.target.value })} rows={2} className={`${inputClass} resize-none`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Estadísticas destacadas</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {data.stats.map((stat, i) => (
                        <div key={i} className="space-y-3">
                            <div>
                                <label className={labelClass}>Valor</label>
                                <input value={stat.value} onChange={(e) => updateStat(i, { value: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Etiqueta</label>
                                <input value={stat.label} onChange={(e) => updateStat(i, { label: e.target.value })} className={inputClass} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
