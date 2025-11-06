import { Bell, Search } from "lucide-react";

export default function HeaderAdmin() {
    return (
        <header className="flex items-center justify-between bg-white border-b px-6 py-3">
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                </div>

                <button className="relative p-2 text-gray-500 hover:text-blue-600">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-2">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="admin avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm leading-tight">
                        <p className="font-medium text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@pdm.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
