import { readContentJson, writeContentJson } from "./blob";

export type HeroContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
};

export type NosotrosContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  features: string[];
  image: string;
};

export type ProductoItem = {
  title: string;
  image: string;
  tag: string;
  description: string;
  featured?: boolean;
};

export type ProductosContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  items: ProductoItem[];
};

export type PorQueItem = { title: string; desc: string };
export type StatItem = { value: string; label: string };

export type PorQueElegirnosContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  items: PorQueItem[];
  stats: StatItem[];
};

export type MarcaItem = { name: string; image: string };

export type CtaContent = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export type ContactoContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  whatsapp: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
};

export type FooterContent = { copyright: string };

export type SiteContent = {
  hero: HeroContent;
  nosotros: NosotrosContent;
  productos: ProductosContent;
  porQueElegirnos: PorQueElegirnosContent;
  marcas: MarcaItem[];
  cta: CtaContent;
  contacto: ContactoContent;
  footer: FooterContent;
};

export const defaultContent: SiteContent = {
  hero: {
    badge: "Obsequios Empresariales Premium",
    title: "Elevá la imagen de tu empresa con cada",
    titleHighlight: "obsequio",
    subtitle:
      "Mates artesanales personalizados con grabado láser de alta precisión. Creamos piezas únicas que representan la identidad de tu marca.",
    ctaPrimary: "Ver Catálogo",
    ctaSecondary: "Solicitar Cotización",
    backgroundImage: "/images/hero_background.png",
  },
  nosotros: {
    badge: "Nuestra Historia",
    title: "Tradición argentina con",
    titleHighlight: "excelencia corporativa",
    paragraph1:
      "Querandí nace con el objetivo de convertirse en un emprendimiento especializado en obsequios empresariales, enfocado en ofrecer productos de alta calidad que representen de manera fiel la identidad de cada empresa.",
    paragraph2:
      "Desde sus inicios, la marca se distingue por su atención al detalle, la estética cuidada y la prolijidad en cada entrega, entendiendo que cada obsequio es una extensión de la imagen corporativa.",
    features: ["Grabado Láser de Precisión", "Materiales de Primera Calidad", "Presentación Impecable"],
    image: "/images/mates_black_group_new.png",
  },
  productos: {
    badge: "Catálogo",
    title: "Nuestros",
    titleHighlight: "Productos",
    subtitle:
      "Cada pieza puede ser personalizada con el logo de tu empresa mediante grabado láser de alta precisión.",
    items: [
      {
        title: "Mate Torpedo",
        image: "/images/mate_torpedo_new_v2.png",
        tag: "Personalizable",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Mate Imperial",
        image: "/images/mate_imperial_new.png",
        tag: "Premium",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Mate Criollo",
        image: "/images/mate_criollo_new.png",
        tag: "Best Seller",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Mate Ranchero",
        image: "/images/mate_ranchero_new.png",
        tag: "Novedad",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Mates de Algarrobo",
        image: "/images/mates_wood_group_new.png",
        tag: "Artesanal",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Bombillones Premium",
        image: "/images/bombillon_premium_new.png",
        tag: "Calidad Alpaca",
        description: "Grabado láser de alta precisión incluido.",
      },
      {
        title: "Sets Corporativos",
        image: "/images/comboblackquerandi.jpeg",
        tag: "Destacado",
        description: "Grabado láser de alta precisión incluido.",
        featured: true,
      },
    ],
  },
  porQueElegirnos: {
    badge: "¿Por qué Querandí?",
    title: "El obsequio perfecto para tu",
    titleHighlight: "empresa",
    items: [
      {
        title: "Personalización Total",
        desc: "Grabamos el logo de tu empresa con tecnología láser de alta precisión en cualquier producto.",
      },
      {
        title: "Presentación Premium",
        desc: "Cada obsequio se entrega con packaging especial que refuerza la imagen de tu marca.",
      },
      {
        title: "Pedidos Corporativos",
        desc: "Trabajamos con empresas de todos los tamaños. Precios especiales por volumen.",
      },
      {
        title: "Acompañamiento Integral",
        desc: "Te asesoramos desde la selección del producto hasta la entrega final.",
      },
    ],
    stats: [
      { value: "100%", label: "Personalizable" },
      { value: "+500", label: "Productos Entregados" },
      { value: "48hs", label: "Cotización Rápida" },
    ],
  },
  marcas: [
    { name: "Bayer", image: "/images/clients/logo_bayer.jpeg" },
    { name: "Camioneros", image: "/images/clients/logo_camioneros.jpeg" },
    { name: "Cimes", image: "/images/clients/logo_cimes.jpeg" },
    { name: "De Rosa", image: "/images/clients/logo_de_rosa.jpeg" },
    { name: "Facilitas", image: "/images/clients/logo_facilitas.jpeg" },
    { name: "Miller", image: "/images/clients/logo_miller.jpeg" },
    { name: "Tas", image: "/images/clients/logo_tas.jpeg" },
  ],
  cta: {
    title: "¿Listo para sorprender a tus clientes y colaboradores?",
    subtitle: "Contactanos hoy y recibí una cotización personalizada para tu empresa",
    buttonLabel: "Solicitar Cotización",
  },
  contacto: {
    badge: "Contacto",
    title: "Hablemos de tu",
    titleHighlight: "proyecto",
    subtitle:
      "Estamos listos para ayudarte a encontrar el obsequio perfecto para tu empresa. Completá el formulario o contactanos directamente.",
    whatsapp: "+54 9 11 5750-1643",
    email: "querandi.mates@gmail.com",
    instagramHandle: "@querandi.mates",
    instagramUrl: "https://www.instagram.com/querandi.mates/",
  },
  footer: {
    copyright: "© 2025 Querandí Mates. Todos los derechos reservados.",
  },
};

export async function getContent(): Promise<SiteContent> {
  try {
    const data = await readContentJson();
    if (!data || typeof data !== "object") return defaultContent;
    return { ...defaultContent, ...(data as Partial<SiteContent>) };
  } catch {
    return defaultContent;
  }
}

export async function saveSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K]
): Promise<void> {
  const current = await getContent();
  const updated: SiteContent = { ...current, [section]: value };
  await writeContentJson(updated);
}
