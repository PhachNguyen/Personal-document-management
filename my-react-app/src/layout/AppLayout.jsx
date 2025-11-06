import Sidebar from "../components/Sidebar";
import HeaderUser from "../components/HeaderUser";

// Layout chính của ứng dụng

export default function AppLayout({ children }) {
    return (
        <div className="flex w-full min-h-screen bg-gray-50 text-gray-800">
            <Sidebar />
            <main className="flex-1 p-6">
                <HeaderUser />
                <div className="mt-6">{children}</div>
            </main>
        </div>
    );
}
