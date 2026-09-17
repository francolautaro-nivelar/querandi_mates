import { getContent } from "@/lib/content";
import ContactoForm from "./ContactoForm";

export const dynamic = "force-dynamic";

export default async function ContactoAdminPage() {
    const content = await getContent();
    return <ContactoForm initialContacto={content.contacto} initialCta={content.cta} initialFooter={content.footer} />;
}
