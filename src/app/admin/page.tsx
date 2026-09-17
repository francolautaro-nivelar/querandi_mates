import Link from "next/link";

const sections = [
    { name: "Hero", href: "/admin/hero", icon: "🖼️", desc: "El bloque principal de la portada: título, subtítulo, botones e imagen de fondo." },
    { name: "Nosotros", href: "/admin/nosotros", icon: "📖", desc: "Historia de la marca, párrafos y características destacadas." },
    { name: "Productos", href: "/admin/productos", icon: "🧉", desc: "Catálogo de productos: fotos, nombres, etiquetas y descripciones." },
    { name: "Por qué elegirnos", href: "/admin/porque-elegirnos", icon: "⭐", desc: "Razones destacadas y estadísticas (100%, +500, etc)." },
    { name: "Marcas", href: "/admin/marcas", icon: "🏢", desc: "Logos de empresas que confían en Querandí." },
    { name: "Contacto", href: "/admin/contacto", icon: "✉️", desc: "WhatsApp, email, Instagram, banner de invitación y pie de página." },
];

export default function AdminHomePage() {
    return (
        <div className="animate-in fade-in duration-700">
            <p className="text-gray-600 mb-8">
                Elegí qué sección de la web querés editar. Los cambios se ven en la web apenas los guardás.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#8B5A2B]/30 transition-all"
                    >
                        <div className="w-12 h-12 rounded-lg bg-[#8B5A2B]/10 text-2xl flex items-center justify-center mb-4">
                            {section.icon}
                        </div>
                        <h3 className="text-gray-800 font-bold mb-2">{section.name}</h3>
                        <p className="text-gray-500 text-sm">{section.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
