import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  const { nosotros, productos, porQueElegirnos, marcas, cta, contacto, footer } = content;
  const marcasLoop = marcas.length > 0 ? [...marcas, ...marcas] : [];
  const whatsappDigits = contacto.whatsapp.replace(/[^\d]/g, "");

  return (
    <main>
      <Navbar />
      <Hero content={content.hero} />

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <span className="section-badge lowercase tracking-normal">{nosotros.badge}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-8">
              {nosotros.title} <span className="text-[#8B5A2B]">{nosotros.titleHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {nosotros.paragraph1}
            </p>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              {nosotros.paragraph2}
            </p>

            <div className="space-y-4">
              {nosotros.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 font-medium text-[#1A1A1A]">
                  <div className="w-6 h-6 rounded-full bg-[#8B5A2B]/10 text-[#8B5A2B] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-[#8B5A2B]/5 rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform"></div>
            <img
              src={nosotros.image}
              alt="Set Corporativo Querandí"
              className="relative rounded-xl shadow-2xl transition-transform group-hover:scale-[1.02] duration-500"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#C9A962]/20 bg-[#C9A962]/10 text-[#C9A962]">
              {productos.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-6">
              {productos.title} <span className="text-[#C9A962]">{productos.titleHighlight}</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {productos.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.items.map((p, i) => (
              <div key={i} className={`group relative bg-[#2D2D2D] rounded-xl overflow-hidden border border-white/5 hover:border-[#C9A962]/30 transition-all duration-500 ${p.featured ? "md:col-span-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-[#C9A962] text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider shadow-xl">
                    {p.tag}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-heading font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-white/50 text-sm">{p.description}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#8B5A2B]/20 to-[#8B5A2B]/5 rounded-xl border-2 border-dashed border-[#C9A962]/30 flex flex-col items-center justify-center p-12 text-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-3">Más Productos</h3>
              <p className="text-white/60 text-sm mb-6">Yerberas, Materas, Termos y más.</p>
              <a href="#contacto" className="text-[#C9A962] font-semibold text-sm hover:translate-x-1 transition-transform flex items-center gap-2">
                Solicitar Catálogo completo <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="porque-elegirnos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="section-badge lowercase tracking-normal">{porQueElegirnos.badge}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-12">
              {porQueElegirnos.title} <span className="text-[#8B5A2B]">{porQueElegirnos.titleHighlight}</span>
            </h2>

            <div className="space-y-8">
              {porQueElegirnos.items.map((item, i) => (
                <div key={i} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-3xl font-heading font-bold text-[#8B5A2B]/30 leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#8B5A2B] to-[#6B4423] rounded-3xl p-12 text-white shadow-2xl">
              <div className="grid grid-cols-1 gap-12 text-center divide-y divide-white/20">
                {porQueElegirnos.stats.map((stat, i) => (
                  <div key={i} className="py-12 first:pt-0 last:pb-0 border-b border-white/20 lg:border-none lg:py-0">
                    <span className="block text-5xl font-heading font-bold mb-2">{stat.value}</span>
                    <span className="text-white/80 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Carousel Section */}
      {marcasLoop.length > 0 && (
        <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-12">Empresas que confían en nosotros</h3>
            <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:after:from-white after:to-transparent">
              <div className="flex animate-infinite-scroll w-max gap-16 items-center grayscale opacity-50">
                {marcasLoop.map((marca, i) => (
                  <div key={i} className="flex-none px-8">
                    <img src={marca.image} alt={marca.name} className="h-10 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F0EBE3] to-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">{cta.title}</h2>
          <p className="text-xl text-gray-600 mb-10">{cta.subtitle}</p>
          <a href="#contacto" className="inline-block bg-[#8B5A2B] text-white px-10 py-4 rounded-md font-semibold hover:bg-[#6B4423] hover:shadow-lg transition-all transform hover:-translate-y-1">
            {cta.buttonLabel}
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <span className="section-badge lowercase tracking-normal">{contacto.badge}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6">
              {contacto.title} <span className="text-[#8B5A2B]">{contacto.titleHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-lg">
              {contacto.subtitle}
            </p>

            <div className="space-y-6">
              <a href={`https://wa.me/${whatsappDigits}`} target="_blank" className="flex items-center gap-6 p-6 bg-[#FAF7F2] rounded-xl hover:bg-white hover:shadow-lg hover:border-[#8B5A2B]/20 border border-transparent transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-lg text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">WhatsApp</span>
                  <span className="block text-[#1A1A1A] font-semibold text-lg">{contacto.whatsapp}</span>
                </div>
              </a>
              <a href={`mailto:${contacto.email}`} className="flex items-center gap-6 p-6 bg-[#FAF7F2] rounded-xl hover:bg-white hover:shadow-lg hover:border-[#8B5A2B]/20 border border-transparent transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8B5A2B] to-[#6B4423] rounded-lg text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Email</span>
                  <span className="block text-[#1A1A1A] font-semibold text-lg">{contacto.email}</span>
                </div>
              </a>
              <a href={contacto.instagramUrl} target="_blank" className="flex items-center gap-6 p-6 bg-[#FAF7F2] rounded-xl hover:bg-white hover:shadow-lg hover:border-[#8B5A2B]/20 border border-transparent transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Instagram</span>
                  <span className="block text-[#1A1A1A] font-semibold text-lg">{contacto.instagramHandle}</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-8 md:p-12 rounded-3xl border border-gray-100">
            <form className="flex flex-col gap-6" action="https://formsubmit.co/querandi.mates@gmail.com" method="POST">
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                <input type="text" id="company" name="company" placeholder="Nombre de tu empresa" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  <input type="text" id="name" name="name" placeholder="Tu nombre" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                  <input type="tel" id="phone" name="phone" placeholder="+54 9 11..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" id="email" name="email" placeholder="email@empresa.com" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all" />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">Cantidad estimada</label>
                <select id="quantity" name="quantity" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all bg-white">
                  <option value="">Seleccionar...</option>
                  <option value="1-50">1 - 50 unidades</option>
                  <option value="50-100">50 - 100 unidades</option>
                  <option value="100-500">100 - 500 unidades</option>
                  <option value="500+">500+ unidades</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea id="message" name="message" rows={4} placeholder="Contanos sobre tu proyecto..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]/20 focus:border-[#8B5A2B] transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#8B5A2B] text-white font-semibold py-4 rounded-lg hover:bg-[#6B4423] hover:shadow-lg transition-all transform hover:-translate-y-1">
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <img src="/logo_querandi.png" alt="Querandí" className="h-20 mx-auto mb-8" />
          <p className="text-gray-400 text-sm">{footer.copyright}</p>
        </div>
      </footer>

      <WhatsAppFloat whatsapp={contacto.whatsapp} />
    </main>
  );
}
