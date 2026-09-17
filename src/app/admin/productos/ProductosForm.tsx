"use client";

import { useState } from "react";
import { saveProductos } from "../actions";
import ProductImageField from "@/components/admin/ProductImageField";
import type { ProductoItem, SiteContent } from "@/lib/content";

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

const emptyItem: ProductoItem = { title: "", image: "", tag: "", description: "" };

export default function ProductosForm({ initial }: { initial: SiteContent["productos"] }) {
    const [data, setData] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

    function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
        setData((d) => ({ ...d, [key]: value }));
    }

    function updateItem(i: number, patch: Partial<ProductoItem>) {
        const next = [...data.items];
        next[i] = { ...next[i], ...patch };
        set("items", next);
    }

    function removeItem(i: number) {
        set("items", data.items.filter((_, idx) => idx !== i));
    }

    function addItem() {
        set("items", [...data.items, { ...emptyItem }]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            const result = await saveProductos(data);
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
                <div>
                    <label className={labelClass}>Subtítulo</label>
                    <textarea value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Productos del catálogo</h2>
                {data.items.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4 relative">
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="absolute top-6 right-6 text-red-500 text-sm font-medium hover:underline"
                        >
                            Eliminar producto
                        </button>

                        <div className="grid md:grid-cols-2 gap-4 pr-32">
                            <div>
                                <label className={labelClass}>Nombre del producto</label>
                                <input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Etiqueta (ej: Premium, Novedad)</label>
                                <input value={item.tag} onChange={(e) => updateItem(i, { tag: e.target.value })} className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Descripción</label>
                            <input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} className={inputClass} />
                        </div>

                        <ProductImageField label="Foto del producto" value={item.image} onChange={(url) => updateItem(i, { image: url })} />

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={!!item.featured}
                                onChange={(e) => updateItem(i, { featured: e.target.checked })}
                                className="rounded text-[#8B5A2B] focus:ring-[#8B5A2B]"
                            />
                            Destacar (ocupa doble ancho en la grilla)
                        </label>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addItem}
                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-semibold hover:border-[#8B5A2B]/40 hover:text-[#8B5A2B] transition-all"
                >
                    + Agregar producto
                </button>
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
