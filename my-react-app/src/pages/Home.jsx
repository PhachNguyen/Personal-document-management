import React from 'react';
import { Link } from 'react-router-dom';

// Trang Home — Giới thiệu và điều hướng
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <h1 className="text-xl font-bold text-gray-900">🗂️ Quản lý giấy tờ cá nhân</h1>
                <nav className="flex items-center gap-4 text-sm font-medium text-gray-700">
                    <Link to="/login" className="hover:text-gray-900 transition">Đăng nhập</Link>
                    <Link to="/dashboard" className="hover:text-gray-900 transition">Bảng điều khiển</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                    Lưu trữ & Quản lý <span className="text-gray-600">giấy tờ cá nhân</span> của bạn dễ dàng hơn
                </h2>
                <p className="max-w-2xl text-gray-600 text-lg mb-8">
                    Ứng dụng giúp bạn quản lý CCCD, hộ chiếu, bằng lái và các giấy tờ quan trọng — mọi lúc, mọi nơi, an toàn và tiện lợi.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/login"
                        className="rounded-xl bg-gray-900 text-white px-6 py-3 text-lg font-medium hover:bg-black transition"
                    >
                        Bắt đầu ngay
                    </Link>
                    <Link
                        to="/dashboard"
                        className="rounded-xl border border-gray-300 bg-white text-gray-800 px-6 py-3 text-lg font-medium hover:bg-gray-50 transition"
                    >
                        Xem bảng quản lý
                    </Link>
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-white py-12">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Feature icon="📄" title="Lưu trữ an toàn" desc="Lưu dữ liệu cục bộ hoặc trên cloud, bảo mật tối đa." />
                    <Feature icon="📷" title="Upload nhanh" desc="Tải ảnh giấy tờ, PDF, hoặc scan trực tiếp từ thiết bị." />
                    <Feature icon="⏰" title="Nhắc hạn sử dụng" desc="Tự động đánh dấu giấy tờ sắp hết hạn để bạn chủ động xử lý." />
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-gray-50 py-4 text-center text-sm text-gray-500">
                © 2025 Personal Document Manager. Made with ❤️ by Phách.
            </footer>
        </div>
    );
}

function Feature({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
        </div>
    );
}