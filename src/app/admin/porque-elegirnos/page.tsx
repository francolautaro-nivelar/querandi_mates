import { getContent } from "@/lib/content";
import PorQueElegirnosForm from "./PorQueElegirnosForm";

export const dynamic = "force-dynamic";

export default async function PorQueElegirnosAdminPage() {
    const content = await getContent();
    return <PorQueElegirnosForm initial={content.porQueElegirnos} />;
}
