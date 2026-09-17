import type { SiteContent } from "@/lib/content";

export default function Hero({ content }: { content: SiteContent["hero"] }) {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url('${content.backgroundImage}')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/85"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#C9A962]/20 border border-[#C9A962] text-[#C9A962] text-xs font-bold uppercase tracking-[0.2em] mb-8">
                    {content.badge}
                </div>

                <h1 className="text-4xl md:text-7xl font-heading font-semibold text-white leading-[1.1] mb-8">
                    {content.title} <span className="text-[#C9A962] italic">{content.titleHighlight}</span>
                </h1>

                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                    {content.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <a href="#productos" className="w-full sm:w-auto bg-gradient-to-r from-[#8B5A2B] to-[#6B4423] text-white px-10 py-4 rounded-md font-semibold hover:shadow-2xl hover:shadow-[#8B5A2B]/40 transition-all transform hover:-translate-y-1">
                        {content.ctaPrimary}
                    </a>
                    <a href="#contacto" className="w-full sm:w-auto border-2 border-white/50 text-white px-10 py-4 rounded-md font-semibold hover:bg-white hover:text-[#8B5A2B] transition-all transform hover:-translate-y-1">
                        {content.ctaSecondary}
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
