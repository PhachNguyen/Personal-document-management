import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#fafafa]">
            <SidebarAdmin />
            <div className="flex-1 flex flex-col">
                <HeaderAdmin />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
