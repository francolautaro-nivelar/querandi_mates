import { getContent } from "@/lib/content";
import HeroForm from "./HeroForm";

export const dynamic = "force-dynamic";

export default async function HeroAdminPage() {
    const content = await getContent();
    return <HeroForm initial={content.hero} />;
}
