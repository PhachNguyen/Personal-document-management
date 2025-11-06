import { Link } from "react-router-dom";
import { FileText, Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function Register() {
    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* === LEFT: Banner === */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-gray-100 flex flex-col justify-center px-12 py-16">
                <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-7 h-7 text-blue-400" />
                    <h1 className="text-2xl font-bold">PDM System</h1>
                </div>

                <h2 className="text-4xl font-extrabold leading-tight mb-6">
                    Bắt đầu quản lý <span className="text-blue-400">giấy tờ cá nhân</span> của bạn ngay hôm nay
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Tạo tài khoản để sử dụng hệ thống lưu trữ thông minh, giúp bạn quản lý tất cả tài liệu cá nhân an toàn và tiện lợi.
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                    <li>✅ Giao diện dễ dùng</li>
                    <li>✅ Lưu trữ đám mây an toàn</li>
                    <li>✅ Tự động nhắc hạn giấy tờ</li>
                    <li>✅ Dễ dàng tìm kiếm & chia sẻ</li>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Đăng ký để bắt đầu quản lý giấy tờ cá nhân
                    </p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Họ và tên</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="text"
                                    placeholder="Nguyễn Thế Phách"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
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
                            <label className="block text-sm font-medium mb-1 text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
                        >
                            Đăng ký
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
