import { getContent } from "@/lib/content";
import ProductosForm from "./ProductosForm";

export const dynamic = "force-dynamic";

export default async function ProductosAdminPage() {
    const content = await getContent();
    return <ProductosForm initial={content.productos} />;
}
