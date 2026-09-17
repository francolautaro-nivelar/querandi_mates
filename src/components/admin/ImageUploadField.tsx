"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";

export default function ImageUploadField({
    label,
    value,
    onChange,
    variant = "square",
}: {
    label: string;
    value: string;
    onChange: (url: string) => void;
    /** "logo" previews un-cropped (object-contain) at a fixed height, matching how logos render on the site. */
    variant?: "square" | "logo";
}) {
    const previewBoxClass = variant === "logo" ? "w-32 h-14 bg-white" : "w-20 h-20";
    const previewImgClass = variant === "logo" ? "object-contain p-1" : "object-cover";
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const result = await uploadImage(fd);
            if (result.ok) {
                onChange(result.url);
            } else {
                setError(result.error);
            }
        } catch {
            setError("No se pudo subir la imagen.");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <div className="flex items-center gap-4">
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={value}
                        alt=""
                        className={`${previewBoxClass} ${previewImgClass} rounded-lg border border-gray-200 flex-shrink-0`}
                    />
                ) : (
                    <div className={`${previewBoxClass} flex-shrink-0 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-[10px] text-center px-1`}>
                        Sin imagen
                    </div>
                )}
                <div className="flex-1">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#8B5A2B]/10 file:text-[#8B5A2B] file:font-semibold hover:file:bg-[#8B5A2B]/20 disabled:opacity-50"
                    />
                    {uploading && <p className="text-xs text-gray-400 mt-1">Subiendo...</p>}
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
            </div>
        </div>
    );
}
