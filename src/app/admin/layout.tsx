import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10">
                <header className="mb-10 hidden md:block">
                    <h1 className="text-2xl font-bold text-gray-800">Panel de Contenido</h1>
                    <p className="text-gray-500 text-sm">Editá los textos e imágenes de la landing de Querandí</p>
                </header>
                {children}
            </main>
        </div>
    );
}
