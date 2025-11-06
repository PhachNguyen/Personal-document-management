import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X, LogIn } from "lucide-react";

export default function HeaderHome() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-white text-black shadow-md sticky top-0 z-50 transition-all duration-300">
            {/* === Logo === */}
            <Link
                to="/"
                className="text-2xl font-bold flex items-center gap-2 text-black hover:text-gray-900 transition"
            >
                <FileText className="w-6 h-6 text-black" />
                Quản lý giấy tờ cá nhân
            </Link>

            {/* === Desktop Menu === */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="features" className="hover:text-blue-400 transition">
                    Tính năng
                </a>
                <a href="guide" className="hover:text-blue-400 transition">
                    Hướng dẫn
                </a>
                <a href="contact" className="hover:text-blue-400 transition">
                    Liên hệ
                </a>

                <Link
                    to="/login"
                    className="flex items-center gap-1 bg-black hover:bg-gray-900 px-4 py-2 rounded-lg font-semibold transition text-white"
                >
                    <LogIn className="w-4 h-4" />
                    Đăng nhập
                </Link>
            </nav>

            {/* === Mobile Menu Button === */}
            <button
                className="md:hidden text-gray-200 hover:text-black transition"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* === Mobile Dropdown Menu === */}
            {menuOpen && (
                <nav className="absolute top-16 left-0 w-full bg-while border-t border-gray-800 flex flex-col items-center py-4 gap-4 text-sm font-medium shadow-lg animate-fadeIn">
                    <a
                        href="#features"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-blue-400 transition"
                    >
                        Tính năng
                    </a>
                    <a
                        href="#steps"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-blue-400 transition"
                    >
                        Hướng dẫn
                    </a>
                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-blue-400 transition"
                    >
                        Liên hệ
                    </a>
                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
                    >
                        <LogIn className="w-4 h-4" /> Đăng nhập
                    </Link>
                </nav>
            )}
        </header>
    );
}
