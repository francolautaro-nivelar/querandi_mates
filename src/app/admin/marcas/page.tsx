import { getContent } from "@/lib/content";
import MarcasForm from "./MarcasForm";

export const dynamic = "force-dynamic";

export default async function MarcasAdminPage() {
    const content = await getContent();
    return <MarcasForm initial={content.marcas} />;
}
