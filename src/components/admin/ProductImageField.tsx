"use client";

import { useCallback, useRef, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { uploadImage } from "@/app/admin/actions";

const ASPECT = 4 / 3;

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
        img.src = src;
    });
}

async function getCroppedBlob(imageSrc: string, area: Area): Promise<Blob> {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = area.width;
    canvas.height = area.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No se pudo procesar la imagen.");
    ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen."))), "image/jpeg", 0.9);
    });
}

export default function ProductImageField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (url: string) => void;
}) {
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function openCropperFromFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setError(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCropSrc(URL.createObjectURL(file));
    }

    function openCropperFromExisting() {
        if (!value) return;
        setError(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCropSrc(value);
    }

    const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    function closeCropper() {
        setCropSrc(null);
        if (inputRef.current) inputRef.current.value = "";
    }

    async function confirmCrop() {
        if (!cropSrc || !croppedAreaPixels) return;
        setUploading(true);
        setError(null);
        try {
            const blob = await getCroppedBlob(cropSrc, croppedAreaPixels);
            const fd = new FormData();
            fd.append("file", blob, "producto.jpg");
            const result = await uploadImage(fd);
            if (result.ok) {
                onChange(result.url);
                closeCropper();
            } else {
                setError(result.error);
            }
        } catch {
            setError("No se pudo procesar la imagen.");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <p className="text-xs text-gray-400 mb-3">
                Se recorta en formato 4:3 para que todos los productos se vean parejos en el catálogo.
            </p>

            <div className="flex items-start gap-4">
                <div className="w-32 aspect-[4/3] rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] text-center px-1">
                            Sin imagen
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={openCropperFromFile}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#8B5A2B]/10 file:text-[#8B5A2B] file:font-semibold hover:file:bg-[#8B5A2B]/20 disabled:opacity-50"
                    />
                    <div className="flex gap-4">
                        {value && (
                            <button type="button" onClick={openCropperFromExisting} className="text-xs font-semibold text-[#8B5A2B] hover:underline">
                                Editar recorte
                            </button>
                        )}
                        {value && (
                            <button type="button" onClick={() => onChange("")} className="text-xs font-semibold text-red-500 hover:underline">
                                Quitar imagen
                            </button>
                        )}
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </div>

            {cropSrc && (
                <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden">
                        <div className="relative w-full h-80 bg-gray-900">
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={ASPECT}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Zoom</label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={closeCropper} disabled={uploading} className="px-4 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 disabled:opacity-50">
                                    Cancelar
                                </button>
                                <button type="button" onClick={confirmCrop} disabled={uploading} className="px-6 py-2 rounded-lg bg-[#8B5A2B] text-white font-semibold hover:bg-[#6B4423] disabled:opacity-50">
                                    {uploading ? "Subiendo..." : "Usar esta imagen"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
