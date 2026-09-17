import { getContent } from "@/lib/content";
import NosotrosForm from "./NosotrosForm";

export const dynamic = "force-dynamic";

export default async function NosotrosAdminPage() {
    const content = await getContent();
    return <NosotrosForm initial={content.nosotros} />;
}
