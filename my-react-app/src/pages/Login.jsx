import { Link } from "react-router-dom";
import { FileText, Lock, Mail, ArrowLeft } from "lucide-react";

export default function Login() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* === LEFT: Banner === */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-gray-100 flex flex-col justify-center px-12 py-16">
                <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-7 h-7 text-blue-400" />
                    <h1 className="text-2xl font-bold">PDM System</h1>
                </div>

                <h2 className="text-4xl font-extrabold leading-tight mb-6">
                    Quản lý <span className="text-blue-400">giấy tờ cá nhân</span> dễ dàng hơn bao giờ hết
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Lưu trữ, quản lý và theo dõi tất cả giấy tờ quan trọng — CCCD, hộ chiếu, bằng lái, học bạ… trong một nền tảng an toàn, tiện lợi.
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                    <li>✅ Lưu trữ bảo mật</li>
                    <li>✅ Nhắc hạn tự động</li>
                    <li>✅ Quản lý trực quan</li>
                    <li>✅ Tìm kiếm nhanh chóng</li>
                </ul>
            </div>

            {/* === RIGHT: Form === */}
            <div className="flex items-center justify-center bg-gray-50 relative">
                {/* 🔹 Nút quay lại */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
                </Link>

                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng trở lại 👋</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Đăng nhập để tiếp tục quản lý giấy tờ của bạn
                    </p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Địa chỉ email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="email"
                                    placeholder="nhapemail@gmail.com"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-600" />
                                Ghi nhớ đăng nhập
                            </label>
                            <a href="#" className="text-blue-600 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
